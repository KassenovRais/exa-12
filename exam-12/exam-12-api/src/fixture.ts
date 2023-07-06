import mongoose from "mongoose";
import User from "./models/User";
import Post from "./models/Post";
import {nanoid} from 'nanoid'

mongoose.connect('mongodb://localhost/post');


const db = mongoose.connection;


db.once('open', async () => {
       try {
         await db.dropCollection('users');
         await db.dropCollection('posts');
         
     
       } catch (e) {
         console.log('Collections were not present, skipping drop...');
       }
       const [userOne, userTwo , userThree] = await User.create({
              password:"123",
              userName:'John Doe',
              token:nanoid()
         }, {
              password:"123",
              userName:'Sam Duck',
              token:nanoid()
         },{
              password:"123",
              userName:'Jacket',
              token:nanoid()
         }
         );

       const [postOne , postTwo , photoThree] = await Post.create({
              title:'Japan',
              photo:'japan.jpg',
              user_id:userOne.id
       },{
              title:'Like Mike',
              photo:'skateboard.jpg',
              user_id:userTwo.id
       },{
              title:'Hotline Miami',
              photo:'Hotline.jpeg',
              user_id:userThree.id  
       })

     
       
       db.close();
     });