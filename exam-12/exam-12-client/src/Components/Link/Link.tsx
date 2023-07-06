import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import './Link.css'

interface ILink {
       to:string
       children:ReactNode
}

const Link = ({children , to}:ILink) => {
       return (
             <NavLink
                     className={({isActive}) => isActive? 'actine link' : 'deactine link'}
                     to={to}
                     children={children}
             />
       )
}

export default Link