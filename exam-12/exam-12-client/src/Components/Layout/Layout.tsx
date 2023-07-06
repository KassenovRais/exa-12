import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { IUser } from '../../Interface/Interface'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { RootState } from '../../Store/store'
import Link from '../Link/Link'
import Anonymous from '../Menus/Anonymous/Anonymous'
import UserMenu from '../Menus/UserMenu/User.menu'
import './Layout.css'

const Layout = () => {

       const user = useAppSelector(state => state.auth.user)
       return (
              <div>

                     <div className='layout' >
                            <Link
                                   to='/'
                                   children='GALLERY'
                            />
                            <div>
                                   {
                                          !user ?
                                          <Anonymous/>
                                          :
                                          <UserMenu/>
                                   }

                            </div>
                     </div>
                     <Outlet/>
              </div>
       )
}

export default Layout