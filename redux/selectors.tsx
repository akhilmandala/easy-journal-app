import { selectCheckInsState, selectMostRecentCheckIn } from "./checkIns/checkInsSlice";
import { selectJournalEntriesState, selectMostRecentJournalEntry } from "./journalEntries/journalEntriesSlice";

export const selectRecentItemsInRange =
  (range, items, itemOrder) => (state) => {
    let recentItemsIds;
    if (itemOrder.length > range) {
      recentItemsIds = itemOrder.slice(-range);
    } else {
      recentItemsIds = itemOrder;
    }
    let recentItems = recentItemsIds.map(({ id }) => items[id]);
    recentItems.reverse();
    return recentItems;
  };

export const selectLatestOrder = (state) =>
  state.journalEntries.journalEntries.length > 0 ||
  state.checkIns.checkIns.length > 0
    ? Math.max(
        selectMostRecentJournalEntry(state).order,
        selectMostRecentCheckIn(state).order
      )
    : 0;


export const selectAllUserInputsOrdered = (state) => {
  let { checkIns, checkInOrder } = selectCheckInsState(state)
  let { journalEntries, journalEntryOrder } = selectJournalEntriesState(state)

  
  
  return collatedEntries.reverse();
};
