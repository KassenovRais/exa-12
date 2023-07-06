import { IPost } from "../../Interface/Interface";
import { api } from "./index";


const PostPath = api.injectEndpoints({
       endpoints:(builder) => ({
              getArrPost:builder.query<IPost[] , void>({
                     query:() => '/posts',
                     providesTags:['Post']
              }),
              addNewPost:builder.mutation<IPost , FormData>({
                     query:(body) => ({
                            url:'/posts',
                            method:'post',
                            body:body
                     }),
                     invalidatesTags:['Post']
              }),
              deletePost:builder.mutation<IPost[] , string>({
                     query:(id) => ({
                            url:`/posts?id=${id}`,
                            method:'delete'
                     }),
                     invalidatesTags:['Post']
              }),
              getPostbyId:builder.query<IPost[] , string >({
                     query:(id) => `/posts/${id}`,
                     providesTags:['Post']
              })

       })
})


export const {
       useGetArrPostQuery , 
       useGetPostbyIdQuery , 
       useDeletePostMutation , 
       useAddNewPostMutation
} = PostPath