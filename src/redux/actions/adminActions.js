import API from '../../apis';
import * as types from '../constants/adminConstants';

export const login = (name, password) => async (dispatch) => {
    try {
        dispatch({ type: types.ADMIN_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await API.post(
            `/api/admin/login`,
            { name, password },
            config,
        );

        dispatch({
            type: types.ADMIN_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: types.ADMIN_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const loginForUser = (tokenId) => async (dispatch) => {
    try {
        dispatch({ type: types.ADMIN_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await API.post(
            `/api/user/login`,
            { tokenId },
            config,
        );

        dispatch({
            type: types.ADMIN_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: types.ADMIN_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: types.ADMIN_LOGOUT });
    document.location.href = '/login';
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: types.USER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await API.get(`/api/users`, config);

        dispatch({
            type: types.USER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.USER_LIST_FAIL,
            payload: message,
        });
    };
};
