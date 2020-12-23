import {userAuth} from "../components/api/api";
import firebase from "firebase";
import {setUsers} from "./DialogsReducer";
import {changeInterlocutor, checkNewMessage} from "./MessagesReducer";

let CHANGE_IS_REG = 'CHANGE_IS_REG'
let SET_AUTH_USER = 'SET_AUTH_USER'
let SET_FETCHING = 'SET_FETCHING'
let UN_LOGIN_USER = 'UN_LOGIN_USER'
let SET_INTERLOCUTOR = 'SET_INTERLOCUTOR'
let DELETE_INTERLOCUTOR = 'DELETE_INTERLOCUTOR'
let SET_FETCHING_MESSAGE = 'SET_FETCHING_MESSAGE'
let SET_MY_PHOTO = 'SET_MY_PHOTO'
let IS_STATUS_CHANGE = 'IS_STATUS_CHANGE'
let NEW_STATUS = 'NEW_STATUS'
let ADD_NEW_POST = 'ADD_NEW_POST'

let initialState = {
    myId: null,
    myName: null,
    myPhoto: null,
    myStatus: null,
    myPosts: [],

    talkUserId: null,
    talkUserName: null,
    talkUserPhoto: null,
    talkUserStatus: null,
    talkUserPosts: [],

    isReg: false,
    isAuth: false,
    isFetching: false,
    isFetchingMessage: false,
    isStatusChange: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_IS_REG: {
            return {
                ...state,
                isReg: action.bool
            }
        }
        case SET_AUTH_USER: {
            return {
                ...state,
                isAuth: true,
                myId: action.id,
                myName: action.name,
                myPhoto: action.photo,
                myStatus: action.status === undefined ? 'Изменить статус' : action.status,
                myPosts: action.posts === undefined ? [] : action.posts,
            }
        }
        case SET_FETCHING: {
            return {
                ...state,
                isFetching: action.bool
            }
        }
        case SET_FETCHING_MESSAGE: {
            return {
                ...state,
                isFetchingMessage: action.bool
            }
        }
        case UN_LOGIN_USER: {
            return {
                ...state,
                isAuth: false,
                myId: null,
                talkUserId: null,
                myName: null,
                myPhoto: null
            }
        }
        case SET_INTERLOCUTOR: {
            return {
                ...state,
                talkUserId: action.id,
                talkUserPhoto: action.photo,
                talkUserName: action.name,
                talkUserStatus: action.status === undefined ? 'Изменить статус' : action.status,
                talkUserPosts: action.posts === undefined ? [] : action.posts,
            }
        }
        case DELETE_INTERLOCUTOR: {
            return {
                ...state,
                talkUserId: null,
                talkUserName: null,
                talkUserPhoto: null,
                talkUserStatus: null,
            }
        }
        case SET_MY_PHOTO: {
            return {
                ...state,
                myPhoto: action.photo
            }
        }
        case IS_STATUS_CHANGE:{
            if(!action.bool){
                let objProfile = {userId: state.myId, name: state.myName, photo: state.myPhoto, status: state.myStatus}
                firebase.database().ref(`${state.myId}/profile`).update(objProfile)
            }
            return {
                ...state,
                isStatusChange: action.bool
            }
        }
        case NEW_STATUS:{
            return {
                ...state,
                myStatus: action.text
            }
        }

        case ADD_NEW_POST:{
            let newPosts = [action.post, ...state.myPosts]
            let objProfile = {userId: state.myId, name: state.myName, photo: state.myPhoto, status: state.myStatus, posts: newPosts}
            firebase.database().ref(`${state.myId}/profile`).update(objProfile)
            return {
                ...state,
                myPosts: [action.post, ...state.myPosts]
            }
        }
        default:
            return state
    }
}


export const addNewPost = (post) =>{
    return {type: ADD_NEW_POST, post}
}

export const setUpdateProfileTrunk = (newPhoto) => {
    return (dispatch, getState) =>{

        let myId = getState().authR.myId
        let myName = getState().authR.myName

        firebase.storage().ref().child(`${myId}/myPhoto`).put(newPhoto) // Загрузка фото на сервер
            .then(() => {
                firebase.storage().ref().child(`${myId}/myPhoto`).getDownloadURL() // Запрос на firebase за URL картинки
                    .then(photo => {
                        let objProfile = {userId: myId, name: myName, photo: photo}
                        firebase.database().ref(`${myId}/profile`).update(objProfile)
                        let photoObj = {photoURL: photo}
                        firebase.auth().currentUser.updateProfile(photoObj) // замена фото

                        dispatch(saveMyPhoto(photo))
                    })
            })
    }
}

const changeIsReg = (bool) => {
    return {type: CHANGE_IS_REG, bool}
}

const setFetchingMessage = (bool) => {
    return {type: SET_FETCHING_MESSAGE, bool}
}

const setAuthUser = (id, name, photo, status, posts) => {
    return {type: SET_AUTH_USER, id, name, photo, status, posts}
}

const setFetching = (bool) => {
    return {type: SET_FETCHING, bool}
}

const outUser = () => {
    return {type: UN_LOGIN_USER}
}

export const saveMyPhoto = (photo) => {
    return {type: SET_MY_PHOTO, photo}
}

export const setStatusChange = (bool) =>{
    return {type: IS_STATUS_CHANGE, bool}
}

export const setNewStatus = (text) =>{
    return {type: NEW_STATUS, text}
}

export const setInterlocutor = (id, name, photo = null, status, posts) => {
    return (dispatch, getState) => {
        let talkUserIdOld = getState().authR.talkUserId

        if (talkUserIdOld === id) {
            return
        }
        dispatch(setFetchingMessage(true))
        dispatch(changeInterlocutor())
        dispatch({type: SET_INTERLOCUTOR, id, name, photo, status, posts})
        dispatch(checkNewMessage())
        setTimeout(() => {
            dispatch(setFetchingMessage(false))
        }, 400)
        // setTimeout(() =>{
        //     let messages = document.getElementById('messages')
        //     messages.scrollTo(0, messages.clientHeight)
        // },900)
    }
}

export const deleteInterlocutor = () => {
    return {type: DELETE_INTERLOCUTOR}
}

const setData = (id, obj) => {
    firebase.database().ref(id).set(obj)
}

export const Auth = () => {
    return (dispatch) => {
        dispatch(setFetching(true))
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database().ref().once('value')
                    .then(data => {
                        let allUsers = data.val()
                        let currentUser = data.val()[user.uid]
                        let photo = currentUser.profile.photo === undefined ? null : currentUser.profile.photo
                        dispatch(setAuthUser(currentUser.profile.userId, currentUser.profile.name, photo, currentUser.profile.status, currentUser.profile.posts))
                        dispatch(setUsers(allUsers))
                        dispatch(setFetching(false))
                    })
            }
            else{
                dispatch(setFetching(false))
            }
        })
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        userAuth.loginUser(email, password)
            .then(data => {
                dispatch(Auth())
            })
    }
}

export const registrationNewUser = (email, password, userName) => {
    return (dispatch) => {
        dispatch(changeIsReg(true))
        userAuth.registrationUser(email, password, userName)
            .then(() => {
                firebase.auth().currentUser.updateProfile({displayName: userName})
                    .then(data => {
                        dispatch(changeIsReg(false))
                    })
                let id = firebase.auth().currentUser.uid
                let userId = {userId: id, name: userName}
                setData(id, {profile: userId})
            })
    }
}

export const unLoginUser = () => {
    return (dispatch) => {
        userAuth.out()
            .then(() => {
                dispatch(outUser())
            })
    }
}

export const ForgotPasswordThunk = (email) => {
    return () => {
        userAuth.forgetPassword(email)
            .catch(err => {
                if (err.code === 'auth/user-not-found') {
                    alert('Такой Email не зарегистрирован')
                }
            })
    }
}

export default AuthReducer