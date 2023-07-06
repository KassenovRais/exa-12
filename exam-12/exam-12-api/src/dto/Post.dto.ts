export class PostDto {
       user_id:string
       title:string
       photo:string
       constructor(user_id:string,
              title:string,
              photo:string) {
              this.photo = photo
              this.title = title
              this.user_id = user_id
       }
}