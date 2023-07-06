import React, { ChangeEvent, FormEvent, useState } from 'react'
import { IUser } from '../../Interface/Interface'
import UserFrom from '../../Components/UserForm/UserForm'
import { usePostNewUserMutation } from '../../Store/Services/User.store'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import { useAppSelector } from '../../Store/hooks'

const Register = () => {
       
       const users = useAppSelector(state => state)

       const navigate = useNavigate()

       const [addUser ] = usePostNewUserMutation()



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
                     if(!(data as {error: object}).error) {
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
                            title='Register'
                            value={userValue}
                     />  
              </div>
       )
}

export default Register