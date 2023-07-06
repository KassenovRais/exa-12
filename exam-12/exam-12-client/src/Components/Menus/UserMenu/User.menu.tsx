import React from 'react'
import { useAppSelector } from '../../../Store/hooks'
import { useLogoutUserMutation } from '../../../Store/Services/User.store'
import Link from '../../Link/Link'

const UserMenu = () => {

       const user = useAppSelector(state => state.auth.user)

       const [logoutFun] = useLogoutUserMutation()

       return (
              <div className='navBar' >
                     <Link
                            to={`/user/${user._id}/${user.userName}`}
                            children={`Hi ${user.userName}`}
                     />
                     <button
                            className='BTN'
                            onClick={() => logoutFun()}
                     >
                            Logout
                     </button>
                     
              </div>
       )
}

export default UserMenu