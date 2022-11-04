import { combineReducers, createStore, compose } from 'redux';

import AppReducer from './AppReducer';
import AuthReducer from './AuthReducer';
import SeniorReducer from './SeniorReducer';
import IntercurrenceReducer from './IntercurrenceReducer';
import TeamReducer from './TeamReducer';
import CarePlanReducer from './CarePlanReducer';
import MedicineReducer from './MedicineReducer';
import NetReducer from './NetReducer';
import TaskReducer from './TaskReducer';
import IconeWarningReducer from './IconeWarningReducer';
import ChatReducer from './ChatReducer';
import 'configs/reactotron';

const isJestRunning = process.env.JEST_WORKER_ID !== undefined;

const enhancer =
  __DEV__ && !isJestRunning ? compose(console.tron.createEnhancer()) : {};

export const Store = createStore(
  combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    senior: SeniorReducer,
    intercurrence: IntercurrenceReducer,
    team: TeamReducer,
    careplan: CarePlanReducer,
    medicine: MedicineReducer,
    net: NetReducer,
    task: TaskReducer,
    iconeWarning: IconeWarningReducer,
    chat: ChatReducer,
  }),
  enhancer,
);
