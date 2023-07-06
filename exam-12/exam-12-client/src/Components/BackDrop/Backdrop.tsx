import React, { ReactNode } from 'react'
import './Backdrop.css'

interface IBackdrop {
       children:ReactNode
       onClick:() => void
}

const Backdrop = ({children , onClick}:IBackdrop) => {
       return (
              <div 
                     onClick={onClick}
                     className='Backdrop'
              >
                     {children}
              </div>
       )
}

export default Backdrop