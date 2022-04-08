import * as types from '../constants/documentConstants';

export const documentListReducer = (state = { documents: [] }, action) => {
    switch (action.type) {
        case types.DOCUMENT_LIST_REQUEST:
            return { loading: true, documents: [] };
        case types.DOCUMENT_LIST_SUCCESS:
            return {
                loading: false,
                documents: action.payload.documents,
                pages: action.payload.pages,
                page: action.payload.page,
                count: action.payload.count,
            };
        case types.DOCUMENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const documentDetailsReducer = (
    state = { document: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case types.DOCUMENT_DETAILS_REQUEST:
            return { ...state, loading: true };
        case types.DOCUMENT_DETAILS_SUCCESS:
            return { loading: false, document: action.payload };
        case types.DOCUMENT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const documentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case types.DOCUMENT_DELETE_REQUEST:
            return { loading: true };
        case types.DOCUMENT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case types.DOCUMENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const documentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.DOCUMENT_CREATE_REQUEST:
            return { loading: true };
        case types.DOCUMENT_CREATE_SUCCESS:
            return { loading: false, success: true, document: action.payload };
        case types.DOCUMENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case types.DOCUMENT_CREATE_RESET:
            return {};
        default:
            return state;
    };
};

export const documentUpdateReducer = (state = { document: {} }, action) => {
    switch (action.type) {
        case types.DOCUMENT_UPDATE_REQUEST:
            return { loading: true };
        case types.DOCUMENT_UPDATE_SUCCESS:
            return { loading: false, success: true, document: action.payload };
        case types.DOCUMENT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case types.DOCUMENT_UPDATE_RESET:
            return { document: {} };
        default:
            return state;
    };
};