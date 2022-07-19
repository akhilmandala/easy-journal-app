import { selectRecentItemsInRange } from "../selectors";

export const selectJournalEntriesState = (state) => {
  return state.journalEntries;
};

export const selectMostRecentJournalEntry = (state) => {
  let { journalEntries, journalEntryOrder } = selectJournalEntriesState(state);
  return journalEntries[journalEntryOrder.at(-1).id];
};

export const selectRecentEntriesWithinRange = (range) => (state) => {
  let entries = state.journalEntries.entries;
  let entryOrder = state.journalEntries.entryOrder;
  let recentEntries = selectRecentItemsInRange(range, entries, entryOrder);
  return recentEntries;
};

const selectMostRecentEntry = (state) => {
  return state.checkIns;
};
