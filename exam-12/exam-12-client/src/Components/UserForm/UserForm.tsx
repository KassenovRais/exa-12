import React , {ChangeEvent, FormEvent, ReactNode} from 'react'
import { IUser } from '../../Interface/Interface'
import './UserForm.css'

interface UserProps {
       title:ReactNode
       onSubmit:(e:FormEvent<HTMLFormElement>) => void
       changeHandler:(e:ChangeEvent<HTMLInputElement>) => void
       value:Pick<IUser , 'userName' | 'password' >
}

const UserFrom = ({value , onSubmit , changeHandler , title}:UserProps) => {
       return (
              <div>
                     <form 
                            onSubmit={onSubmit}
                            className='formRegister'
                      >
                            <h2 className='regTitle' >{title}</h2>

                            <input
                                   className='userEnter'
                                   value={value.userName}
                                   onChange={changeHandler}
                                   placeholder='Enter login'
                                   name='userName'
                            />
                            <input
                                   type='password'
                                   className='userEnter'
                                   value={value.password}
                                   onChange={changeHandler}
                                   placeholder='Enter password'
                                   name='password'
                            />
                            <button
                                   className='regBtn'
                            >Click</button>
                     </form>
              </div>
       )
}

export default UserFrom