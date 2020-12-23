import React, {useEffect, useState} from 'react'
import face from '../../../assets/imgs/face.jpg'
import c from './Profile.module.css'
import Status from "./Status";
import PostsContainer from "./Posts/PostsContainer";

const Profile = (props) => {

    let url = props.match.url.slice(9)

    useEffect(() => {
        if (url !== props.myId) {
            props.allUsers.map(el => {
                if (el.profile.userId === url) {
                    props.setInterlocutor(el.profile.userId, el.profile.name, el.profile.photo, el.profile.status, el.profile.posts)
                }
            })
        }
    }, [])

    let onLoadImg = (e) => {
        debugger
        // let url = URL.createObjectURL() // Превращение загруженного фото в url ссылку
        if(e.target.files.length === 0){
            return
        }
        props.setUpdateProfileTrunk(e.target.files[0])
    }

    let setMyStatus = (e) => {
        if(e.target.value.trim() === ''){
            return
        }
        props.setNewStatus(e.target.value)
    }

    let name = url === props.myId ? props.myName : props.talkUserName
    let photo = url === props.myId ? props.myPhoto : props.talkUserPhoto
    let status = url === props.myId ? props.myStatus : props.talkUserStatus
    let posts = url === props.myId ? props.myPosts : props.talkUserPosts

    let [hoverImg, setHoverImg] = useState(false)

    return (
        <div className={c.profile}>
            <div className={c.photo}>
                <div className={c.photoContainer}>
                    <img src={photo === null ? face : photo} alt="" className={c.myPhoto} onMouseEnter={() => setHoverImg(true)} onMouseLeave={() => setHoverImg(false)}/>
                    {props.myId === url && <div className={hoverImg ? c.hoverImg : c.selectFileContainer} onMouseEnter={() => setHoverImg(true)} onMouseLeave={() => setHoverImg(false)}>
                        <input type="file" name="file" id="file" onChange={onLoadImg} className={c.selectFile}/>
                        <label htmlFor="file" className={c.selectFileLabel} >Загрузить файл</label>
                    </div>}
                </div>
            </div>
            <div className={c.profileInfo}>
                <div className={c.nameAndStatus}>
                    <div className={c.name}>{name}</div>
                    <Status {...props} setMyStatus={setMyStatus} status={status} url={url}/>
                </div>
                <PostsContainer {...props} url={url} posts={posts} name={name} photo={photo}/>
            </div>

        </div>
    )
}

export default Profile