import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const actFetchUsersRequest = () => {
    return dispatch => {
        return callApi('users', 'GET', null).then(res => {
            dispatch(actFetchUsers(res.data));
        });
    };
}

export const actFetchUsers = (users) => {
    return {
        type : Types.FETCH_USERS,
        users
    }
}

export const actDeleteUserRequest = (id) => {
    return dispatch => {
        return callApi(`users/${id}`, 'DELETE', null).then(res =>{
            dispatch(actDeleteUser(id));
        })
    }
}

export const actDeleteUser = (id) => {
    return {
        type : Types.DELETE_USER,
        id
    }
}

export const actAddUserRequest = (user) => {
    return dispatch => {
        return callApi('users', 'POST', user).then(res => {
            dispatch(actAddUser(res.data));
        });
    }
}

export const actAddUser = (user) => {
    return {
        type : Types.ADD_USER,
        user
    }
}

export const actGetUserRequest = (id) => {
    return dispatch => {
        return callApi(`users/${id}`, 'GET', null).then(res => {
            dispatch(actGetUser(res.data));
        });
    }
}

export const actGetUser = (user) => {
    return {
        type : Types.EDIT_USER,
        user
    }
}

export const actUpdateUserRequest = (user) => {
    return dispatch => {
        return callApi(`users/${user.id}`, 'PUT', user).then(res => {
            dispatch(actUpdateUser(res.data));
        });
    }
}

export const actUpdateUser = (user) => {
    return {
        type : Types.UPDATE_USER,
        user
    }
}
