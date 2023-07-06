import React, { ReactNode } from 'react'
import { IPost } from '../../Interface/Interface'
import './Modal.css'

interface IModal {
      children:ReactNode
}

const Modal = ({children ,}:IModal) => {
       return (
              <div
                     onClick={(e) => e.stopPropagation()}
                     className='modal'
              >
                     {
                            children
                     }
              </div>
       )
}

export default Modal