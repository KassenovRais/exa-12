import {Router , Request , Response} from 'express'
import { UserDto } from '@src/dto/User.dto'
import User from '@src/models/User'


const UserController: Router = Router()

UserController.post('/sessions' ,async (req:Request , res:Response) => {

       const {userName , password} = req.body       

       const user = await User.findOne({userName : userName})       

       if(!user) {              
              return res.status(404).send({error:'User not found'})    
       }
       if(password) {              
                            
              const checkPass = await user.checkPassword(password)
                            
              if(!checkPass){
                     
                     return res.status(404).send({error:'Password not wrong'})    
              }

              await user.generateToken()

              await user.save()
              
              res.send(user)
              
       }else{
              res.status(404).send('FAQ')  
       }

})

UserController.post('/' ,async (req:Request , res:Response) => {

       const {userName , password} = req.body as UserDto

       try {
              const userDto = new UserDto(userName , password)

              const responce = new User(userDto)
              
              responce.generateToken()

              await responce.save()

              res.send(responce)
       } catch (error) {
              res.status(404).send('FAQ')      
       }

})

UserController.delete('/logout' , async(req:Request ,res:Response) => {
       const token = req.get('Authorization')

       const user = await User.findOne({token :token})
       
       if(user) {
              user.generateToken()

              await user.save()

              return res.send({
                     message:'Logout succsess'
              })
       }

       return res.status(404).send({error:'Faq'})
})


export default UserController