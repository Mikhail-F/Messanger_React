let SET_ALL_USERS = 'SET_ALL_USERS'

let initialState = {
    allUsers: []
}

const DialogsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_ALL_USERS:{
            let users = Object.values(action.users)
            users = users.filter(el => el.profile.userId !== action.myId)
            return {
                ...state,
                allUsers: users
            }
        }
        default: return state
    }
}

export const setUsers = (users) =>{
    return (dispatch, getState) =>{
        let myId = getState().authR.myId
        dispatch({type: SET_ALL_USERS, users, myId})
    }
}

export default DialogsReducer