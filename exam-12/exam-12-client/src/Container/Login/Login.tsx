import React, { ChangeEvent, FormEvent, useState } from 'react'
import { IUser } from '../../Interface/Interface'
import UserFrom from '../../Components/UserForm/UserForm'
import {  useSessionsUserMutation } from '../../Store/Services/User.store'
import { useNavigate } from 'react-router-dom'
import '../Register/Register.css'


const Login = () => {
       const navigate = useNavigate()

       const [addUser ] = useSessionsUserMutation()

       const [userValue , setUser] = useState<Pick<IUser , 'userName' | 'password'>>({
              userName:'',
              password:''
       })

       const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
              e.preventDefault()

              const userValid:number = userValue.userName.trim().split(' ').join('').length

              const passwordValid:number = userValue.password.trim().split(' ').join('').length

              if(userValid !== 0 && passwordValid !== 0) {
                     const data = await addUser(userValue)
                     if(data ) {
                            setUser({
                              userName: '',
                              password: ''
                            })
                            return navigate('/');
                     }
                     
                     
                     
                     return 
              }
              
              return 
       }

       const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
              const {name , value} = e.target

              setUser({...userValue , [name] : value})
       }

       return (
              <div className='registerblock' >
                     
                     <UserFrom
                            onSubmit={submitHandler}
                            changeHandler={changeHandler}
                            title='Log in'
                            value={userValue}
                     />  
              </div>
       )
}

export default Login