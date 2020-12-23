import React, {useState} from 'react'
import c from './Posts.module.css'
import face from "../../../../assets/imgs/face.jpg";

const Posts = (props) =>{

    let [newPost, setNewPost] = useState('')

    let sendNewPost = () =>{
        if(newPost.trim() === ''){
            return
        }
        props.addNewPost(newPost)
        setNewPost('')
    }

    return(
        <div>
            {props.myId === props.url && <div className={c.addNewPost}><input value={newPost} type="text" className={c.inpNewPost} onChange={e => setNewPost(e.target.value)} placeholder={'Что у вас нового ?'}/><button onClick={sendNewPost}>Сохранить</button></div>}
            <div className={c.posts}>
                {props.posts.length !== 0 ? props.posts.map((el, i) =>{
                    return <div key={i} className={c.post}>
                        <div className={c.sandPostName}>
                            <img className={c.face} src={props.photo === null ? face : props.photo} alt=""/>
                            <span>{props.name}</span>
                        </div>
                        {el}
                    </div>
                }) : <div className={c.post}>Нет постов</div>}
            </div>
        </div>
    )
}

export default Posts