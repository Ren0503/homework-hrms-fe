import * as types from '../constants/adminConstants'

export const adminLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ADMIN_LOGIN_REQUEST:
            return { loading: true };
        case types.ADMIN_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case types.ADMIN_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case types.ADMIN_LOGOUT:
            return {};
        default:
            return state;
    };
};