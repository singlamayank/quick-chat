import axios from "axios";

export const getUsers = () => (dispatch, getState) => {
  return axios
    .get("https://dummyjson.com/users")
    .then((res) => {
      return dispatch({
        type: "SET_USERS",
        payload: res.data.users,
      });
    })
    .catch((e) => console.log(e));
};

export const setSelectedUser = (user) => (dispatch, getState) => {
  const { chats } = getState();
  const newChatsObject = chats?.map((chat) => {
    if (chat.receiver_id === user.id) {
      return { ...chat, seen: true };
    }
    return chat;
  });
  return dispatch({
    type: "SET_SELECTED_USER",
    payload: user,
    chats: newChatsObject,
  });
};

const updateChatWithUsers = (user_id, message) => {
  return {
    type: "UPDATE_CHAT_WITH_USER",
    user_id,
    message,
  };
};

export const sendChatMessage = (message) => (dispatch, getState) => {
  const { selectedUser } = getState();
  return dispatch(updateChatWithUsers(selectedUser.id, message));
};

export const setCurrentUser = (user) => (dispatch, getState) => {
  const { users } = getState();
  return dispatch({
    type: "SET_CURRENT_USER",
    payload: user || users[0],
  });
};

const updateChats = (message) => {
  return {
    type: "UPDATE_CHAT_WITH_USER",
    message,
  };
};

export const updateChatInState =
  (sender_id, receiver_id, message) => (dispatch, getState) => {
    const message_object = {
      sender_id,
      receiver_id,
      message,
      timestamp: new Date(),
      seen: false,
    };
    return dispatch(updateChats(message_object));
  };
