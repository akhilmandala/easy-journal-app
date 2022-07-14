/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

 export type NO_PARAMS = undefined
 export type RootStackParamList = {
   Root: NO_PARAMS
   NotFound: NO_PARAMS
 }
 
 export type MainStackParamList = {
   Main: NO_PARAMS
   CompletedScreen: NO_PARAMS
 }
 
 export type BottomTabParamList = {
   Home: NO_PARAMS
   Journal: NO_PARAMS
   Stats: NO_PARAMS
 }

 export type JournalTabParamList = {
    JournalScreen: NO_PARAMS,
    EditScreen: NO_PARAMS
 }
 
 export type HomeParamList = {
   HomeScreen: NO_PARAMS
   JournalScreen: NO_PARAMS
 }
 
 export type StatsParamList = {
   StatsScreen: NO_PARAMS
 }
 