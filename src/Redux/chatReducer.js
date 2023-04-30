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
            return {
                ...state,
                chats: [action.message, ...state.chats]
            }
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