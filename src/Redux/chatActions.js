import axios from 'axios';

export const getUsers = () => (dispatch, getState) => {
    return axios.get('https://dummyjson.com/users').then((res) => {
        return dispatch({
            type: 'SET_USERS',
            payload: res.data.users,
        })
    }).catch(e => console.log(e));
}

export const setSelectedUser = (user) => (dispatch) => {
    return dispatch({
        type: 'SET_SELECTED_USER',
        payload: user,
    })
}

const updateChatWithUsers = (user_id, message) => {
    return {
        type: 'UPDATE_CHAT_WITH_USER',
        user_id,
        message
    }
}

export const sendChatMessage = (message) => (dispatch, getState) => {
    const {selectedUser} = getState();
    return dispatch(updateChatWithUsers(selectedUser.id, message));
}

export const setCurrentUser = (user) => (dispatch, getState) => {
    const {users} = getState();
    return dispatch({
        type: 'SET_CURRENT_USER',
        payload: user || users[0],
    })
}