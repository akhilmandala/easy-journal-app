import {
  configureStore,
  createSlice,
  PayloadAction,
  combineReducers,
  createSelector,
} from "@reduxjs/toolkit";
import {
  DEFAULT_CHECK_INS,
  DEMO_ENTRIES,
  DEMO_LATEST_CHECKIN_ORDER,
  DEMO_LATEST_ENTRY_IDS,
} from "../fixtures";

export interface CheckIn {
  /* Unique id of the entry */
  id: string;
  /** Associated emoji, unicode */
  emotion: string;
  /* Unix date of journal entry */
  date: number;
  /* The order of the entry in journal */
  order: number;
  /** Unique name of reaction (for when different icon packs are used) */
  iconName: string;
}

let initialState = {
  checkIns: DEFAULT_CHECK_INS,
  checkInOrder: DEMO_LATEST_CHECKIN_ORDER,
};

export const checkInsSlice = createSlice({
  name: "checkInsSlice",
  initialState,
  reducers: {
    addCheckIn(
      state,
      action: PayloadAction<{
        newCheckIn: CheckIn;
      }>
    ) {
      let { newCheckIn } = action.payload;
      let { id } = newCheckIn;
      console.log(newCheckIn);
      return {
        ...state,
        checkIns: {
          ...state.checkIns,
          [id]: newCheckIn,
        },
        checkInOrder: [...state.checkInOrder, { id, date: newCheckIn.date }],
      };
    },
    removeCheckIn(
      state,
      action: PayloadAction<{
        checkInId: string;
      }>
    ) {
      let { checkInId } = action.payload;
      return {
        ...state,
        checkIns: state.checkIns
          .keys()
          .filter((id) => id !== checkInId)
          .reduce((res, key) => ((res[key] = state.checkIns[key]), res), {}),
      };
    },
    editCheckIn(
      state,
      action: PayloadAction<{
        checkInId: string;
        editedCheckIn: CheckIn;
      }>
    ) {
      let { checkInId, editedCheckIn } = action.payload;
      return {
        ...state,
        checkIns: {
          ...state.entries,
          [checkInId]: editedCheckIn,
        },
      };
    },
  },
});

export const selectCheckInsState = (state) => state.checkInEntries;
export const selectCheckIns = (state) => state.checkInEntries.checkIns;
export const selectCheckInOrder = (state) => state.checkInEntries.checkInOrder;

export const selectCheckinsWithinRange = createSelector(
  [selectCheckInOrder, selectCheckIns, (state, range) => range],
  (checkInOrder, checkIns, range) => {
    if (checkInOrder.length > range) {
      checkInOrder.splice(range - 1);
    }
    let sortedEntries = checkInOrder.map(({ id }) => checkIns[id]);
    return sortedEntries;
  }
);

export const { addCheckIn, removeCheckIn } = checkInsSlice.actions;
