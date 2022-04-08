import API from '../../apis';
import { logout } from './adminActions';
import * as types from '../constants/documentConstants';

export const listDocuments = (pageNumber = '') => async (dispatch, getState) => {
    try {
        dispatch({ type: types.DOCUMENT_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await API.get(
            `/api/document?pageNumber=${pageNumber}`,
            config
        );

        dispatch({
            type: types.DOCUMENT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.DOCUMENT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const detailDocument = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.DOCUMENT_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await API.get(`/api/document/${id}`, config);

        dispatch({
            type: types.DOCUMENT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.DOCUMENT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const createDocument = (url) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.DOCUMENT_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await API.post(`/api/document`, url, config);

        dispatch({
            type: types.DOCUMENT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.DOCUMENT_CREATE_FAIL,
            payload: message,
        });
    };
};

export const updateDocument = (document) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.DOCUMENT_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await API.put(
            `/api/document/${document._id}`,
            document,
            config
        );

        dispatch({
            type: types.DOCUMENT_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.DOCUMENT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.DOCUMENT_UPDATE_FAIL,
            payload: message,
        });
    };
};

export const deleteDocument = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.DOCUMENT_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await API.delete(`/api/document/${id}`, config);

        dispatch({
            type: types.DOCUMENT_DELETE_SUCCESS,
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
            type: types.DOCUMENT_DELETE_FAIL,
            payload: message,
        });
    };
};