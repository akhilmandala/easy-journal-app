import {
  configureStore,
  createSlice,
  PayloadAction,
  combineReducers,
} from "@reduxjs/toolkit";
import entries from "../fixture/entries";
import { checkInsSlice } from "./checkIns/checkInsSlice";
import { selectRecentItemsInRange } from "./selectors";
import { journalEntriesSlice } from "./journalEntries/journalEntriesSlice";

export const rootReducer = combineReducers({
  journalEntries: journalEntriesSlice.reducer,
  checkInEntries: checkInsSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
});