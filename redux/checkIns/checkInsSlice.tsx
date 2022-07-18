import {
  configureStore,
  createSlice,
  PayloadAction,
  combineReducers,
} from "@reduxjs/toolkit";
import { DEFAULT_CHECK_INS, DEMO_ENTRIES, DEMO_LATEST_CHECKIN_ORDER, DEMO_LATEST_ENTRY_IDS } from "../fixtures";
import { selectRecentItemsInRange } from "../selectors";

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
  checkInOrder: DEMO_LATEST_CHECKIN_ORDER
}

export const checkInsSlice = createSlice({
  name: "checkIns",
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

/**
 *
 * SELECTORS
 */

export const selectCheckInsState = (state) => {
  return state.checkIns
}

export const selectRecentCheckInsWithinRange = (range) => (state) => {
  let {checkIns, checkInOrder} = selectCheckInsState(state)
  let recentCheckIns = selectRecentItemsInRange(range, checkIns, checkInOrder)
};

export const selectAllCheckInAfterDate = (date) => (state) => {
  let {checkInOrder} = selectCheckInsState(state)
  if(checkInOrder.length > 1) {
    let filteredCheckIns = checkInOrder.reverse()
    let mostRecentEntry = filteredCheckIns.findIndex(({date}) => date < date )
    return filteredCheckIns.slice(0, mostRecentEntry - 1)
  } else {
    return state.journalEntries.checkIns
  }
};

export const selectMostRecentCheckIn = (state) => {
  let {checkIns, checkInOrder} = selectCheckInsState(state)
  return checkIns[checkInOrder.at(-1).id]
}

export const selectCheckInTypesAggregatedByEmotion = (state) => {
  let checkIns = selectRecentCheckInsWithinRange(state, 10);
  let clusters = Object.keys(EmojiCluster);
  checkIns.map((checkIn) => {
    return [];
  });
};