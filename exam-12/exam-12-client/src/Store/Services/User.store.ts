import { IUser } from '../../Interface/Interface'
import {api} from './index'


export const userAuth = api.injectEndpoints({


       endpoints:(builder) => ({
              postNewUser:builder.mutation<Omit<IUser , 'password'> , Omit<IUser , '_id' | 'token'>>({
                     query:(body) => ({
                            url:'/users',
                            method:'post',
                            body:body
                     }),
                     invalidatesTags:['Users']
              }),
              sessionsUser:builder.mutation<Omit<IUser , 'password'> , Omit<IUser , '_id' | 'token' >>({
                     query:(body) =>({
                            url:'/users/sessions',
                            method:'post',
                            body:body
                     }),
                     invalidatesTags:['Users']
              }),
              logoutUser:builder.mutation< void , void>({
                     query:() => ({
                            url:'/users/logout',
                            method:'delete'
                     }),
                     invalidatesTags:['Users']
              })
       }),
       overrideExisting: false,



})

export const {usePostNewUserMutation , useSessionsUserMutation , useLogoutUserMutation} = userAuth