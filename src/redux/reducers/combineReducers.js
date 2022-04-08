import { combineReducers } from 'redux';

import {
    documentListReducer,
    documentDetailsReducer,
    documentCreateReducer,
    documentUpdateReducer,
    documentDeleteReducer,
} from './documentReducers';

import {
    adminLoginReducer,
} from './adminReducers';

const reducer = combineReducers({
    documentList: documentListReducer,
    documentDetail: documentDetailsReducer,
    documentCreate: documentCreateReducer,
    documentUpdate: documentUpdateReducer,
    documentDelete: documentDeleteReducer,
    userLogin: adminLoginReducer,
});

export default reducer;