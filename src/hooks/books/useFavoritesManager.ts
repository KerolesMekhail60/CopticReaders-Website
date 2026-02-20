'use client';

import { useRef } from 'react';

import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthContext';

import { BookType, PaginatedBooksResponse } from '@/types';

import {
  addToFavoritesApi,
  removeFromFavoritesApi,
} from '@/services/books-api';

interface UseFavoritesManagerOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onLoginRequired?: () => void;
}

export function useFavoritesManager(options?: UseFavoritesManagerOptions) {
  const { token, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const t = useTranslations('bookCard');
  const pendingMutations = useRef<Set<string>>(new Set());

  // Helper function to update book in books query cache
  const updateBookInCache = (bookId: string, isFavorite: boolean) => {
    // Update all books queries
    queryClient.setQueriesData<PaginatedBooksResponse>(
      { queryKey: ['books'] },
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          result: oldData.result?.map((book) =>
            book.id === bookId || book.bookId === bookId
              ? { ...book, isFavorite }
              : book,
          ),
        };
      },
    );

    // Also update individual book queries if they exist
    queryClient.setQueriesData<BookType>(
      { queryKey: ['book', bookId] },
      (oldData) => {
        if (!oldData) return oldData;
        return { ...oldData, isFavorite };
      },
    );

    // Store favorite status in a separate cache entry for easy lookup
    // This helps components that don't use React Query queries
    queryClient.setQueryData(['bookFavorite', bookId], isFavorite);
  };

  // Add to favorites mutation
  const addToFavoritesMutation = useMutation({
    mutationFn: (bookId: string) => addToFavoritesApi(bookId, token!),
    onMutate: async (bookId: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['books'] });
      await queryClient.cancelQueries({ queryKey: ['favorites'] });

      // Snapshot the previous value
      const previousBooks = queryClient.getQueriesData({ queryKey: ['books'] });
      const previousFavorites = queryClient.getQueryData(['favorites']);

      // Optimistically update the UI
      updateBookInCache(bookId, true);

      // Return context with the snapshotted value
      return { previousBooks, previousFavorites };
    },
    onSuccess: () => {
      toast.success(t('addedToFavorites'));
      // Invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      options?.onSuccess?.();
    },
    onError: (error: Error, bookId, context) => {
      // Rollback on error
      if (context?.previousBooks) {
        context.previousBooks.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
      // Rollback the optimistic update
      updateBookInCache(bookId, false);
      // Rollback bookFavorite cache
      queryClient.setQueryData(['bookFavorite', bookId], false);
      toast.error(t('errorAddingToFavorites'));
      options?.onError?.(error);
    },
    onSettled: (_, __, bookId) => {
      pendingMutations.current.delete(bookId);
    },
  });

  // Remove from favorites mutation
  const removeFromFavoritesMutation = useMutation({
    mutationFn: (bookId: string) => removeFromFavoritesApi(bookId, token!),
    onMutate: async (bookId: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['books'] });
      await queryClient.cancelQueries({ queryKey: ['favorites'] });

      // Snapshot the previous value
      const previousBooks = queryClient.getQueriesData({ queryKey: ['books'] });
      const previousFavorites = queryClient.getQueryData(['favorites']);

      // Optimistically update the UI
      updateBookInCache(bookId, false);

      // Return context with the snapshotted value
      return { previousBooks, previousFavorites };
    },
    onSuccess: () => {
      toast.success(t('removedFromFavorites'));
      // Invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      options?.onSuccess?.();
    },
    onError: (error: Error, bookId, context) => {
      // Rollback on error
      if (context?.previousBooks) {
        context.previousBooks.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
      // Rollback the optimistic update
      updateBookInCache(bookId, true);
      // Rollback bookFavorite cache
      queryClient.setQueryData(['bookFavorite', bookId], true);
      toast.error(t('errorRemovingFromFavorites'));
      options?.onError?.(error);
    },
    onSettled: (_, __, bookId) => {
      pendingMutations.current.delete(bookId);
    },
  });

  const toggleFavorite = (bookId: string, isCurrentlyFavorite: boolean) => {
    if (!isAuthenticated || !token) {
      toast.error(t('loginRequired'));
      options?.onLoginRequired?.();
      return;
    }

    // Prevent double-clicks: check if mutation is already pending for this book
    if (pendingMutations.current.has(bookId)) {
      return;
    }

    // Mark as pending
    pendingMutations.current.add(bookId);

    if (isCurrentlyFavorite) {
      removeFromFavoritesMutation.mutate(bookId);
    } else {
      addToFavoritesMutation.mutate(bookId);
    }
  };

  const isLoading =
    addToFavoritesMutation.isPending || removeFromFavoritesMutation.isPending;

  return {
    toggleFavorite,
    isLoading,
    canFavorite: isAuthenticated && !!token,
  };
}
