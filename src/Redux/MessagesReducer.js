import firebase from "firebase";
import {deleteInterlocutor} from "./AuthReducer";
import {userAuth} from "../components/api/api";

let ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
let TO_LEAVE_A_MESSAGES = 'TO_LEAVE_A_MESSAGES'
let SET_MY_MESSAGES = 'SET_MY_MESSAGES'
let SET_TALK_USER_MESSAGES = 'SET_TALK_USER_MESSAGES'
let SET_VIEW_MESSAGES = 'SET_VIEW_MESSAGES'
let CHANGE_MESSAGE = 'CHANGE_MESSAGE'
// let DELETE_MESSAGE = 'DELETE_MESSAGE'

let initialState = {
    myMessages: [],
    viewMessages: [],
    talkUserMessages: [],
}

const MessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_MESSAGE: {

            let newMessage = {
                id: state.viewMessages.length + 1,
                userId: action.myId,
                message: action.message,
                date: action.date
            }

            let objMessages = [...state.myMessages, newMessage]

            let mes = {...objMessages}
debugger
            setUpdateMessage(action.myId, mes, action.talkUserId)

            return {
                ...state,
                // myMessages: [...state.myMessages, newMessage],
                viewMessages: [...state.viewMessages, newMessage]
            }
        }
        case TO_LEAVE_A_MESSAGES: {
            return {
                ...state,
                myMessages: [],
                viewMessages: [],
                talkUserMessages: []
            }
        }
        case SET_MY_MESSAGES: {
            return {
                ...state,
                myMessages: action.myMessages
            }
        }
        case SET_TALK_USER_MESSAGES: {
            return {
                ...state,
                talkUserMessages: action.userMessages
            }
        }
        case SET_VIEW_MESSAGES: {

            let messages = [...action.myMessages, ...action.userMessages]
            messages.sort((prev, next) => prev.id - next.id)

            return {
                ...state,
                viewMessages: messages
            }
        }
        case CHANGE_MESSAGE: {

            let newMessage = state.myMessages.map(el =>{
                if(el.id === action.messageId){
                    return {...el, message: action.message}
                }
                return el
            })

            let newViewMessages = state.viewMessages.map(el =>{
                if(el.id === action.messageId){
                    return {...el, message: action.message}
                }
                return el
            })

            let mes = {...newMessage}

            setUpdateMessage(action.myId, mes, action.talkUserId)

            return {
                ...state,
                viewMessages: newViewMessages
            }
        }
        // case DELETE_MESSAGE:{
        //     let delegateMessagesId = null
        //
        //     state.myMessages.forEach((el, i) =>{
        //         if(el.id === action.messageId){
        //             delegateMessagesId = i
        //         }
        //     })
        //
        //     let newMessage = state.myMessages.filter(el=> el.id !== action.messageId)
        //     debugger
        //     // let newViewMessage = state.viewMessages.filter(el=> el.id !== action.messageId)
        //
        //     newMessage = newMessage.map((el, i) =>{
        //         return {...el, id: i + 1}
        //     })
        //
        //     firebase.database().ref(`${action.myId}/messages/${action.talkUserId}/${delegateMessagesId}`).remove()
        //         .then(() =>{
        //             debugger
        //             let mes = {...newMessage}
        //             setUpdateMessage(action.myId, mes, action.talkUserId)
        //         })
        //
        //     return {
        //         ...state,
        //         myMessages: newMessage
        //     }
        // }
        default:
            return state
    }
}

const setUpdateMessage = (id, obj, talkUserId) => {
    firebase.database().ref(`${id}/messages/${talkUserId}`).update(obj)
}

export const addNewMessage = (message) => {
    return (dispatch, getState) => {
        let myId = getState().authR.myId
        let talkUserId = getState().authR.talkUserId
        let date = new Date().toLocaleTimeString().slice(0, 5)
        dispatch({type: ADD_NEW_MESSAGE, message, myId, talkUserId, date})
    }
}

export const changeMessage = (message, messageId) => {
    return (dispatch, getState) => {
        let myId = getState().authR.myId
        let talkUserId = getState().authR.talkUserId
        dispatch({type: CHANGE_MESSAGE, message, myId, messageId, talkUserId})
    }
}
//
// export const deleteMessage = (messageId) => {
//     return (dispatch, getState) => {
//         let myId = getState().authR.myId
//         let talkUserId = getState().authR.talkUserId
//         dispatch({type: DELETE_MESSAGE, myId, messageId, talkUserId})
//     }
// }


export const checkNewMessage = () => {
    return (dispatch, getState) => {
        let myId = getState().authR.myId
        let talkUserId = getState().authR.talkUserId

        if (talkUserId !== null) {

            userAuth.findUser(myId, talkUserId)
                .then(data => {
                    let myMessages = data.val()
                    if (myMessages === null) {
                        myMessages = []
                    }

                    userAuth.findUser(talkUserId, myId)
                        .then(data => {
                            let userMessages = data.val()
                            if (userMessages === null) {
                                userMessages = []
                            }
                            let oldMyMessages = getState().messagesR.myMessages
                            let oldUserMessages = getState().messagesR.talkUserMessages
                            dispatch(checkNewMessage())
                            if (myMessages.length === oldMyMessages.length && userMessages.length === oldUserMessages.length) {
                                return
                            }
                            let fetching = getState().authR.isFetchingMessage
                            if (fetching) {
                                return
                            }
                            dispatch({type: SET_VIEW_MESSAGES, myMessages, userMessages})
                            dispatch({type: SET_MY_MESSAGES, myMessages})
                            dispatch({type: SET_TALK_USER_MESSAGES, userMessages})
                        })
                })
        }
    }
}

export const changeInterlocutor = () => {
    return {type: TO_LEAVE_A_MESSAGES}
}

export const toLeaveAMessages = () => {
    return (dispatch) => {
        dispatch(changeInterlocutor())
        dispatch(deleteInterlocutor())
    }
}

export default MessagesReducer