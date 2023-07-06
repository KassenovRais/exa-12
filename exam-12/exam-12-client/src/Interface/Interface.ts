export interface IUser{
       _id:string
       userName:string
       password:string
       token:string
       
}

export interface IPost {
       _id:string
       user_id: Omit<IUser , 'password' | 'token'>
       photo :string
       title: string
}





