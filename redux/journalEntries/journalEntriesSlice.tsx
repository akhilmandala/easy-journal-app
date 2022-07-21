import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import entries from "../../fixture/entries";
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
  /** Labels */
  labels: string[];
}

const initialState = {
  entries: DEMO_ENTRIES,
  entryOrder: DEMO_LATEST_ENTRY_IDS,
  labels: ["important", "goal"],
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
      let newLabels = entry.labels.filter(label => !state.labels.includes(label))
      return {
        ...state,
        entries: {
          ...state.entries,
          [entry.id]: entry,
        },
        entryOrder: [...state.entryOrder, { id: entry.id, date: entry.date }],
        labels: [...state.labels, ...newLabels]
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
        entryOrder: recentEntries.filter(({ id }) => id !== entryId),
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

export const selectJournalEntriesState = (state) => state.journalEntries;
export const selectJournalEntries = (state) => state.journalEntries.entries;
export const selectJournalEntryOrder = (state) =>
  state.journalEntries.entryOrder;
export const selectAllJournalEntryLabels = (state) => state.journalEntries.labels

export const selectRecentEntriesWithinRange = createSelector(
  [selectJournalEntryOrder, selectJournalEntries, (state, range) => range],
  (entryOrder: [], entries: {}, range) => {
    if (entryOrder.length > range) {
      entryOrder = entryOrder.slice(entryOrder.length - range);
    }
    let sortedEntries = entryOrder.map(({ id }) => entries[id]);
    return sortedEntries;
  }
);

export const selectMostRecentJournalEntry = createSelector(
  [selectJournalEntryOrder, selectJournalEntries],
  (entryOrder: [], entries: {}) => {
    console.log(entries);
    console.log(entryOrder);
    return entries[entryOrder[entryOrder.length - 1].id];
  }
);

export interface EntrySearchFilter {
  ascending: boolean;
  labels: string[];
  dateRange: [number, number];
  searchTerm: string;
}

const hasLabel = (entry: JournalEntry, labels: string[]) =>
  entry.labels.some((label) => labels.includes(label));
const hasSearchTerm = (entry: JournalEntry, searchTerm: string) => {
  searchTerm = searchTerm.toLowerCase();
  return searchTerm !== ""
    ? entry.title.toLowerCase().includes(searchTerm) ||
        entry.content.toLowerCase().includes(searchTerm)
    : entry;
};
const withinDateRange = (entry: JournalEntry, dateRange: Number[]) => {
  /**
   * [0, X] means all entries up till X
   * [X, 0] means all entries after X
   * [X, Y] means all entries between X and Y
   */
  if (dateRange[0] == 0) {
    return entry.date < dateRange[1];
  }
  if (dateRange[1] == 0) {
    return entry.date > dateRange[0];
  }
  return entry.date > dateRange[0] && entry.date < dateRange[1];
};

export const selectEntriesWithFilter = createSelector(
  [
    selectJournalEntryOrder,
    selectJournalEntries,
    (state, filter: EntrySearchFilter) => filter,
  ],
  (
    entryOrder: [],
    entries: { string: JournalEntry },
    { ascending, labels, dateRange, searchTerm }
  ) => {
    if (ascending) {
      entryOrder.reverse();
    }

    let filteredEntries = Object.values(entries).filter(
      (entry) =>
        hasLabel(entry, labels) &&
        hasSearchTerm(entry, searchTerm) &&
        withinDateRange(entry, dateRange)
    );
    let remainingEntryIds = filteredEntries.map((entry) => entry.id);

    let sortedFilteredEntries = entryOrder
      .filter((id) => remainingEntryIds.includes(id))
      .map((id) => filteredEntries[id]);

    return sortedFilteredEntries;
  }
);

export const { addEntry, removeEntry, editEntry } = journalEntriesSlice.actions;
