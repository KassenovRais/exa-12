import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Backdrop from '../../Components/BackDrop/Backdrop'
import PostItem from '../../Components/PostItem/PostItem'
import { useGetArrPostQuery } from '../../Store/Services/Post.store'
import './MainPage.css'

const MainPage = () => {

       const {data: posts = []} = useGetArrPostQuery()

       const [show , setShow] = useState<boolean>(false)

       const [currentPhoto , setPhoto] = useState<string>('')
       
       const navigate = useNavigate()

       return (
              <div className='mainBlock' >
                     {
                            posts.map((val) => {
                                   return <PostItem
                                          key={val._id}
                                          props={val}
                                          onCLick={() => {
                                                 setPhoto(val.photo)
                                                 setShow(true)
                                          }}
                                          clickByName={() => navigate(`/user/${val.user_id._id}/${val.user_id.userName}`)}
                                   />
                            })
                     }
                     {
                            show &&
                            <Backdrop
                                   onClick={() => setShow(false)}
                            >
                                   <img
                                          src={`http://localhost:9000/posts/${currentPhoto}`}
                                          style={{width:'80%' , maxHeight:'80%' , objectFit:'contain'}}
                                   />
                            </Backdrop>
                     }
                     
              </div>
       )
}

export default MainPage