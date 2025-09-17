import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

import {
  EventClickArg,
  EventDropArg,
  EventInput,
} from '@fullcalendar/core/index.js';
import {
  DateClickArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction/index.js';

type InitialStateProps = {
  reservations: EventInput[];
  currentReservation: EventInput | null;
  currentReservationsOfDay: EventInput[] | [];
  modalState: boolean;
  modalStateReservations: boolean;
};

const initialState: InitialStateProps = {
  reservations: [],
  currentReservation: null,
  currentReservationsOfDay: [],
  modalState: false,
  modalStateReservations: false,
};

type CalendarContextProps = {
  state: InitialStateProps;
  dispatch: React.Dispatch<CalendarAction>;
  handleAddReservation: (data: EventInput) => void;
  handleEditReservation: (data: EventInput) => void;
  handleInitReservations: (data: EventInput[]) => void;
  handleReservationDrop: (data: EventDropArg) => void;
  handleDeleteReservation: (id: string) => void;
  handleDateClick: (data: DateClickArg) => void;
  handleReservationClick: (data: EventClickArg) => void;
  handleModalActionState: (state: boolean) => void;
  handleModalReservationsActionState: (state: boolean) => void;
  handleReservationResize: (data: EventResizeDoneArg) => void;
  handleClickLink: (data: any) => void;
  handleReservationClickId: (id: string) => void;
};

type CalendarAction =
  | { type: 'ADD_RESERVATION'; payload: { reservation: EventInput } }
  | { type: 'INIT_RESERVATION'; payload: { reservations: EventInput[] } }
  | { type: 'EDIT_RESERVATION'; payload: { currentReservation: EventInput } }
  | { type: 'DELETE_RESERVATION'; payload: { id: string } }
  | { type: 'DROP_RESERVATION'; payload: { reservation: EventDropArg } }
  | { type: 'DATE_RESERVATION'; payload: { currentReservation: EventInput } }
  | { type: 'CLICK_RESERVATION'; payload: { id: string } }
  | { type: 'OPEN_MODAL'; payload: boolean }
  | { type: 'OPEN_MODAL_RESERVATION'; payload: boolean }
  | { type: 'LINK_CLICK'; payload: { currentReservationOfDate: EventInput[] } }
  | {
      type: 'RESIZE_RESERVATION';
      payload: { id: string; end: string };
    };

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined,
);

function calendarReducer(state: InitialStateProps, action: CalendarAction) {
  switch (action.type) {
    case 'ADD_RESERVATION':
      return {
        ...state,
        reservations: [
          ...state.reservations,
          { ...action.payload.reservation },
        ],
        currentReservation: null,
        currentReservationsOfDay: [],
      };
    case 'INIT_RESERVATION':
      return {
        ...state,
        reservations: action.payload.reservations,
        currentReservation: null,
        currentReservationsOfDay: [],
      };

    case 'EDIT_RESERVATION':
      return {
        ...state,
        reservations: state.reservations.map((reservation) => {
          if (reservation.id === action.payload.currentReservation.id) {
            return { ...reservation, ...action.payload.currentReservation };
          }
          return reservation;
        }),
        currentReservation: null,
        currentReservationsOfDay: [],
      };

    case 'DELETE_RESERVATION':
      return {
        ...state,
        events: state.reservations.filter(
          (reservation) => reservation.id !== action.payload.id,
        ),
        currentReservation: null,
        currentReservationsOfDay: [],
      };

    case 'DROP_RESERVATION':
      return {
        ...state,
        reservations: state.reservations?.map((reservation) =>
          reservation.id === action.payload.reservation.event.id
            ? {
                ...reservation,
                start: action.payload.reservation.event.startStr,
                end: action.payload.reservation.event.endStr,
                date: action.payload.reservation.event.startStr,
              }
            : reservation,
        ),
      };

    case 'DATE_RESERVATION':
      return {
        ...state,
        currentReservation: { ...action.payload.currentReservation },
        currentReservationsOfDay: state.reservations?.filter(
          (reservation) =>
            reservation.date == action.payload.currentReservation.dateStr,
        ),
      };

    case 'CLICK_RESERVATION':
      return {
        ...state,
        currentReservation:
          state.reservations.find(
            (reservation) => reservation.id == action.payload.id,
          ) || state.currentReservation,
      };

    case 'OPEN_MODAL':
      return {
        ...state,
        modalState: action.payload,
      };

    case 'OPEN_MODAL_RESERVATION':
      return {
        ...state,
        modalStateReservations: action.payload,
      };

    case 'RESIZE_RESERVATION':
      return {
        ...state,
        reservations: state.reservations.map((reservation) => {
          if (reservation.id == action.payload.id) {
            return { ...reservation, end: action.payload.end };
          }
          return reservation;
        }),

        currentReservation: null,
        currentReservationsOfDay: [],
      };

    case 'LINK_CLICK':
      return {
        ...state,
        currentReservationsOfDay: action.payload.currentReservationOfDate,
      };

    default:
      return state;
  }
}

export const CalendarProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  function handleModalActionState(state: boolean) {
    dispatch({ payload: state, type: 'OPEN_MODAL' });
  }

  function handleModalReservationsActionState(state: boolean) {
    dispatch({ payload: state, type: 'OPEN_MODAL_RESERVATION' });
  }

  function handleAddReservation(data: EventInput) {
    if (!state.modalState) {
      handleModalActionState(true);
    }

    dispatch({
      type: 'ADD_RESERVATION',
      payload: { reservation: { ...data } },
    });

    handleModalActionState(false);
  }

  function handleInitReservations(data: EventInput[]) {
    dispatch({
      type: 'INIT_RESERVATION',
      payload: { reservations: data },
    });
  }

  function handleEditReservation(data: EventInput) {
    if (!state.modalState) {
      handleModalActionState(true);
    }

    dispatch({
      payload: { currentReservation: { ...data } },
      type: 'EDIT_RESERVATION',
    });

    handleModalActionState(false);
  }

  function handleDeleteReservation(id: string) {
    dispatch({ payload: { id }, type: 'DELETE_RESERVATION' });
  }

  function handleDateClick(data: DateClickArg) {
    const currentReservation = {
      start: data.dateStr,
      date: data.dateStr,
      allDay: data.allDay,
      id: new Date().getTime().toString(),
    };

    dispatch({
      type: 'DATE_RESERVATION',
      payload: { currentReservation: { ...currentReservation } },
    });

    handleModalActionState(true);
  }

  async function handleReservationClick(data: EventClickArg) {
    dispatch({ payload: { id: data.event.id }, type: 'CLICK_RESERVATION' });
    handleModalActionState(true);
  }
  async function handleReservationClickId(id: string) {
    dispatch({ payload: { id }, type: 'CLICK_RESERVATION' });
    handleModalActionState(true);
    handleModalReservationsActionState(false);
  }

  const handleReservationDrop = (data: EventDropArg) => {
    dispatch({
      payload: { reservation: { ...data } },
      type: 'DROP_RESERVATION',
    });
  };

  const handleReservationResize = (data: EventResizeDoneArg) => {
    dispatch({
      type: 'RESIZE_RESERVATION',
      payload: {
        end: data.event.endStr,
        id: data.oldEvent.id,
      },
    });
  };
  function handleClickLink(data: any) {
    dispatch({
      type: 'LINK_CLICK',
      payload: { currentReservationOfDate: [...data.allSegs] },
    });

    handleModalReservationsActionState(true);
    data.jsEvent.isTrusted = false;
  }

  return (
    <CalendarContext.Provider
      value={{
        state,
        handleDateClick,
        dispatch,
        handleReservationClick,
        handleDeleteReservation,
        handleEditReservation,
        handleAddReservation,
        handleReservationDrop,
        handleModalActionState,
        handleReservationResize,
        handleClickLink,
        handleModalReservationsActionState,
        handleReservationClickId,
        handleInitReservations,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = (): CalendarContextProps => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider',
    );
  }
  return context;
};
