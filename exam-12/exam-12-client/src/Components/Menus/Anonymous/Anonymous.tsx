import React from 'react'
import Link from '../../Link/Link'
import './Anonymous.css'

const Anonymous = () => {
       return (
              <div 
                     className='navBar'
              >
                   <Link
                     to='/register'
                     children='REGISTER'
                   />
                   <Link
                     to='/login'
                     children='LOGIN'
                   />  
              </div>
       )
}

export default Anonymous