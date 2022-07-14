import {
  configureStore,
  createSlice,
  PayloadAction,
  combineReducers,
} from "@reduxjs/toolkit";
import entries from "../fixture/entries";

export const DEMO_ENTRIES = {
    "6d969f39-2a30-4045-8e92-e02748774a54": {
        id: "6d969f39-2a30-4045-8e92-e02748774a54",
        title: "Day 3",
        content: "Feeling thankful!",
        emotion: "1F970",
        date: 1657213192,
        order: 3
    },
    "88570707-5e20-4a0c-91cf-c0fd7753583b": {
        id: "88570707-5e20-4a0c-91cf-c0fd7753583b",
        title: "Day 2",
        content: "Continuing to write more and more. But this is a demo, and I need to fill up the space, so Nunc pulvinar tempor lacus eget porttitor. Aliquam mi mauris, aliquam eget erat vitae, feugiat convallis purus. Nullam sed est at odio dapibus laoreet in sit amet tortor. Aenean enim lacus, laoreet consequat gravida a, scelerisque in magna. Pellentesque luctus purus quis sem cursus egestas. Nulla non placerat risus. In hac habitasse platea dictumst. Nullam euismod nisl a hendrerit placerat. Sed justo erat, fringilla in turpis sit amet, sagittis consectetur ex. Nullam mattis urna eget sapien rutrum volutpat. Etiam a tincidunt lorem, in tempus enim. Duis malesuada dolor purus, rutrum sagittis sem euismod sit amet. Nam nisl erat, faucibus quis sem nec, tincidunt malesuada massa. Mauris imperdiet, neque id mattis tincidunt, sapien nisi tristique quam, rhoncus posuere nibh sapien nec lacus. Phasellus scelerisque velit non lorem efficitur suscipit. ",
        emotion: "1F929",
        date: 1657227592,
        order: 2
    },
    "ef29985a-0d4f-491a-a1ce-397916b96305": {
        id: "ef29985a-0d4f-491a-a1ce-397916b96305",
        title: "New start!",
        content: "Ready to start writing! I'm gonna try to do this often, consistency is key to making it work",
        emotion: "1F973",
        date: 1657231192,
        order: 1
    }
}

// Earliest - Latest
export const DEMO_LATEST_ENTRY_IDS = [
    "ef29985a-0d4f-491a-a1ce-397916b96305",
    "88570707-5e20-4a0c-91cf-c0fd7753583b",
    "6d969f39-2a30-4045-8e92-e02748774a54"
]

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

export interface CheckIn {
  /* Unique id of the entry */
  id: string;
  /** Associated emoji, unicode */
  emotion: string;
  /* Unix date of journal entry */
  date: number;
  /* The order of the entry in journal */
  order: number;
}

const initialState = {
  checkIns: {},
  entries: DEMO_ENTRIES,
  entryOrder: DEMO_LATEST_ENTRY_IDS,
  latestCheckInIds: [],
};

const journalEntriesSlice = createSlice({
  name: "journalEntries",
  initialState,
  reducers: {
    addEntry(
      state,
      action: PayloadAction<{
        entry: JournalEntry;
      }>
    ) {
      console.log(entry)
      let { entry } = action.payload;
      return {
        ...state,
        entries: {
          ...state.entries,
          [entry.id]: entry,
        },
        entryOrder: [
          ...state.entryOrder,
          entry.id
        ]
      };
    },
    removeEntry(
      state,
      action: PayloadAction<{
        entryId: string;
      }>
    ) {
      let { entryId } = action.payload;
      console.log(entryId)
      let { entries } = state;
      // check if entry is in recentEntries
      let recentEntries = state.entryOrder;
      console.log(recentEntries.indexOf(entryId))
      const {[entryId]: elementWithEntryId, ...filteredEntries} = entries
      return {
        ...state,
        entries: filteredEntries,
        entryOrder: recentEntries.filter(id => id !== entryId)
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
    addCheckIn(
      state,
      action: PayloadAction<{
        checkInId: string;
        newCheckIn: CheckIn;
      }>
    ) {
      let { checkInId, newCheckIn } = action.payload;
      return {
        ...state,
        checkIns: {
          ...state.checkIns,
          [checkInId]: newCheckIn,
        },
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

export const { addEntry, removeEntry, addCheckIn, removeCheckIn, editEntry, editCheckIn} = journalEntriesSlice.actions

enum ACTIONS {
  ADD_CHECK_IN,
  REMOVE_CHECK_IN,
  EDIT_CHECK_IN,
  ADD_ENTRY,
  REMOVE_ENTRY,
  EDIT_ENTRY,
}


export const rootReducer = combineReducers({
  journalEntries: journalEntriesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default journalEntriesSlice.reducer;
