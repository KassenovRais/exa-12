import mongoose, { Schema } from "mongoose";

const PostModel = new Schema({
       user_id:{
              type:Schema.Types.ObjectId,
              ref:'User',
              required :true,
       },
       title:{
              type:String,
              required:true,
       },
       photo:{
              type:String,
              required:true,
       }
})

const Post = mongoose.model('Post' , PostModel )

export default Post