const initialState = {
    users: [],
    chats: [],
    selectedUser: null,
    currentUser: null,
}

const chatReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USERS':
            return {...state, users: action.payload};
        case 'UPDATE_CHAT_WITH_USER':
            if(!action.user_id || !action.message){
                return {...state};
            }
            const currentUserIndex = state.users.find((user) => user.id === action.user_id);
            let newUsersObject = [...state.users];
            newUsersObject[currentUserIndex].timestamp = new Date();
            newUsersObject = newUsersObject.sort((a, b) => new Date(b.timestamp || null) - new Date(a.timestamp || null))
            return {
              ...state,
              chats: {
                ...state.chats,
                [action.user_id]: {
                  messages: [
                    action.message,
                    ...(state?.action?.user_id?.messages || []),
                  ],
                },
              },
              users: newUsersObject,
            };
        case 'SET_SELECTED_USER':
            return {
                ...state,
                selectedUser: action.payload,
            }
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload,
            }
        default:
            return {...state};
    }
}
 export default chatReducer;