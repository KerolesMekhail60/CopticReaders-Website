import { getLocale } from 'next-intl/server';

import FavoritesClient from './_components/FavoritesClient';

async function Favorites() {
  const locale = await getLocale();

  return <FavoritesClient locale={locale} />;
}

export default Favorites;

