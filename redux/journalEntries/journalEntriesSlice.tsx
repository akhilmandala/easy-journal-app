import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { DEMO_ENTRIES, DEMO_LATEST_ENTRY_IDS } from "../fixtures";
import { selectRecentItemsInRange } from "../selectors";

export interface JournalEntry {
  /* Unique id of the entry */
  id: string;
  /** Associated emoji, unicode */
  emotion: string;
  /* Title of the entry */
  title: string;
  /* Main content of the entry */
  content: string;
  /* Unix date of journal entry */
  date: number;
  /* The order of the entry in journal */
  order: number;
}

const initialState = {
  journalEntries: DEMO_ENTRIES,
  journalEntryOrder: DEMO_LATEST_ENTRY_IDS,
};

export const journalEntriesSlice = createSlice({
  name: "journalEntries",
  initialState,
  reducers: {
    addEntry(
      state,
      action: PayloadAction<{
        entry: JournalEntry;
      }>
    ) {
      let { entry } = action.payload;
      return {
        ...state,
        entries: {
          ...state.entries,
          [entry.id]: entry,
        },
        entryOrder: [...state.entryOrder, {id: entry.id, date: entry.date}],
      };
    },
    removeEntry(
      state,
      action: PayloadAction<{
        entryId: string;
      }>
    ) {
      let { entryId } = action.payload;

      let { entries } = state;
      // check if entry is in recentEntries
      let recentEntries = state.entryOrder;

      const { [entryId]: elementWithEntryId, ...filteredEntries } = entries;
      return {
        ...state,
        entries: filteredEntries,
        entryOrder: recentEntries.filter(({id}) => id !== entryId),
      };
    },
    editEntry(
      state,
      action: PayloadAction<{
        entryId: string;
        newEntry: JournalEntry;
      }>
    ) {
      let { entryId, newEntry } = action.payload;
      return {
        ...state,
        entries: {
          ...state.entries,
          [entryId]: newEntry,
        },
      };
    },
  },
});

export const { addEntry, removeEntry, editEntry } = journalEntriesSlice.actions;

export const selectJournalEntriesState = (state) => {
  return state.journalEntries;
}

export const selectMostRecentJournalEntry = (state) => {
  let { journalEntries, journalEntryOrder } = selectJournalEntriesState(state)
  return journalEntries[journalEntryOrder.at(-1).id]
}

export const selectRecentEntriesWithinRange = (range) => (state) => {
  let entries = state.journalEntries.entries;
  let entryOrder = state.journalEntries.entryOrder;
  let recentEntries = selectRecentItemsInRange(range, entries, entryOrder)
  return recentEntries;
};

const selectMostRecentEntry = state => {
  return state.checkIns
}