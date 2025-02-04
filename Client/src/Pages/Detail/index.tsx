import React from 'react'
import Detailmain from './Parts/DetailMain'
import Comments from './Parts/DetailComments'

const Detailpage = () => {
  return (
    <div className='container mt-[80px] mb-[80px]'>
        <Detailmain/>
        <Comments/>
    </div>
  )
}

export default Detailpage