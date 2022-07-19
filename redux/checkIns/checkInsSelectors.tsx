import { selectRecentItemsInRange } from "../selectors";
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