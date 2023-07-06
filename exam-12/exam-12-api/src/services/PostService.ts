import { PostDto } from "@src/dto/Post.dto";
import User from "@src/models/User";
import { Router , Request , Response } from "express";
import {uploadPathPhoto} from '../../config'
import { nanoid } from "nanoid";
import path from "path";
import multer from 'multer'
import Post from "@src/models/Post";


const PostController:Router = Router()


const storage = multer.diskStorage({
       destination: (req , file , cb ) => {
              cb(null , uploadPathPhoto)
       },
       filename: (req, file , cb ) => {
              cb(null , nanoid() + path.extname(file.originalname))
       }
})

const upload = multer({storage})

PostController.post('/' ,  upload.single('photo'), async (req:Request , res:Response) => {

       const { title  } = req.body as Omit<PostDto , 'photo' | 'user_id'>

       const token = req.get('Authorization')

       if(!token){
              return res.status(401).send('token not found')
       }

       const user =  await User.findOne({token : token})  
       
       if(user && req.file && title) {

              const post = new PostDto(user.id, title ,req.file.filename)

              const responce = new Post(post)

              await responce.save()

              return res.send(responce)

       }

       res.status(404).send('Error')

})


PostController.get('/' ,async (req:Request , res:Response) => {

       try {

              const responce = await Post.find().populate({path: 'user_id' , select:'userName'})

              res.send(responce)

              
       } catch (error) {
              res.status(300).send('Error get all post')
       }

})

PostController.get('/:id' , async (req:Request , res:Response) => {

       const {id} = req.params

       try {
              const responce = await Post.find({user_id : id}).populate({path: 'user_id' , select:'userName'})

              res.send(responce)

       } catch (error) {
              res.status(300).send('Error get all post by id')
       }
})

PostController.delete('/' , async (req:Request , res:Response) => {

       const {id} = req.query

       const token = req.get('Authorization')
       

       if(!token){
              return res.status(401).send('token not found')
       }

       const user =  await User.findOne({token : token})  

       const post = await Post.find({_id: id ,user_id:user?.id})

       if(post) {

              const post = await Post.findByIdAndDelete(id)

              return res.send(post)
       }

       res.status(401).send('Error delete')
})

export default PostController