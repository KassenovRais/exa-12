import express , {Express} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import UserService from './services/UserService'
import PostController from './services/PostService'

dotenv.config()

const PORT  = process.env.PORT || 9000

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost'

const pathStatic = process.env.PATH_STATIC || 'public/uploads'

const dbName = process.env.DB_NAME || '/post'

const app: Express = express()



const run  = async() => {
  await mongoose.connect(`${mongodbUrl}${dbName}`)

  

  app.listen(PORT ,() => console.log(`PORT start on ${PORT}`))

  process.on('exit' , () => {
    console.log('disconnect');
    
    mongoose.disconnect()

  })

}

app.use(cors())

app.use(express.static(`${pathStatic}`));

app.use(express.json())

app.use('/users' , UserService)
app.use('/posts' , PostController)




run().catch((e) => console.log(e))


