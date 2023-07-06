import React, { ReactNode } from 'react'
import { IPost } from '../../Interface/Interface'
import './PostItem.css'

interface IPostItem {
       props :IPost
       onCLick:() => void
       clickByName?:() => void
       children?:ReactNode
}

const PostItem = ({props , onCLick , clickByName , children = null}:IPostItem) => {
       return (
              <div className='postItem' >
                     <img
                            src={`http://localhost:9000/posts/${props.photo}`}
                            className='photo'
                            onClick={onCLick}
                     />
                     <h2>{props.title}</h2>
                     <h3
                            onClick={clickByName}
                     > By {props.user_id.userName}</h3>
                     {
                            children ?
                            children 
                            : null
                     }
              </div>
       )
}

export default PostItem