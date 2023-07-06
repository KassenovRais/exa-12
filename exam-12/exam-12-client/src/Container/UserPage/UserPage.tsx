import React, { FormEvent, useState  , DragEvent, ChangeEvent} from 'react'
import { useParams } from 'react-router-dom'
import Backdrop from '../../Components/BackDrop/Backdrop'
import Modal from '../../Components/Modal/Modal'
import PostItem from '../../Components/PostItem/PostItem'
import { IPost } from '../../Interface/Interface'
import { useAppSelector } from '../../Store/hooks'
import { useAddNewPostMutation, useDeletePostMutation, useGetPostbyIdQuery } from '../../Store/Services/Post.store'
import './UserPage.css'

const UserPage = () => {

       const user = useAppSelector((state) => state.auth.user);

       const params = useParams()

       const {data:arrPost = []} = useGetPostbyIdQuery(`${params.id}`)
       
       const [deletePost] = useDeletePostMutation()

       const [modal, setModal] = useState<boolean>()

       const [dragEvent , setDrag] = useState<boolean>(false)

       const [addPost] = useAddNewPostMutation()

       const [show , setShow] = useState<boolean>(false)

       const [currentPhoto , setPhoto] = useState<string>('')

       const [value , setValue] = useState<Pick<IPost , 'photo' | 'title'>>({
              photo:'',
              title : ''
       })
       const submitHandler = (e:FormEvent<HTMLFormElement>) => {
              e.preventDefault()

              const titleValided = !!value.title.trim().split(' ').join('') 
              
              if(titleValided && value.photo){
                     const formData = new FormData();
                     
                     for(let key in value) {
                       formData.append(key, value[key as keyof typeof value]);
                     }
                     
                     addPost(formData)

                     return setModal(!modal)

              }

       }
       
       const fileChangeHandler = (e: DragEvent<HTMLDivElement>, name :string) => {
              e.preventDefault()

              
              if(e.dataTransfer.files) {
                const file = e.dataTransfer.files[0];
                
                setValue(prevState => ({
                  ...prevState,
                     [name]: file
                }))
                
              }

              
              setDrag(false)

       }
    
       const dragStartHandler = (e:DragEvent) => {
              e.preventDefault()
              setDrag(true)

       }


       return (
              <div>
                     
                     <h2>{params.user}</h2>

                     
                     {
                            
                            
                            
                            arrPost.map((val) => {
                                   return <div
                                                 key={val._id}
                                          >
                                                 <PostItem
                                                        
                                                        props={val}
                                                        onCLick={() => {
                                                               setPhoto(val.photo)
                                                               setShow(true)
                                                        }}
                                                        children={user?._id === val.user_id._id ? 
                                                               <button
                                                                      onClick={() => deletePost(val._id)}
                                                                      className='BTN'
                                                               >
                                                                      DELETE
                                                               </button>
                                                               :
                                                               null
                                                                      
                                                               
                                                        }
                                                 />


                                                 
                                   </div>
                            })       
                               
                     }  
                     {
                            user?._id === params.id ? 
                            <button
                                   onClick={() => setModal(true)}
                                   className='BTN add'
                            >
                                   ADD 
                            </button>
                            :
                            null
                     }
                     {
                            modal &&
                            <Backdrop
                                   onClick={() => setModal(!modal)}
                            >
                                   <Modal

                                   >
                                          <form
                                                 onSubmit={submitHandler}
                                          >
                                                 <input
                                                        className='enterClient'
                                                        value={value.title}
                                                        onChange={(e) => setValue({...value , title:e.target.value})}
                                                 />
                                                 
                                                 <div
                                                        className='dragBlock'
                                                        onDrop={(e) => fileChangeHandler(e ,'photo')}
                                                        onDragStart={(e) => dragStartHandler(e)}
                                                        onDragLeave={(e) => {
                                                               e.preventDefault()
                                                               setDrag(false)
                                                        }}
                                                        onDragOver={(e) => dragStartHandler(e)}
                                                        >
                                                               {
                                                                      dragEvent? 'DROP' : 'PULL FILE'
                                                               }
                                                               
                                                 </div>
                                                 <button
                                                        className='BTN formBtn'
                                                 >
                                                        ADD
                                                 </button>
                                          </form>
                                   </Modal>
                            </Backdrop>
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

export default UserPage