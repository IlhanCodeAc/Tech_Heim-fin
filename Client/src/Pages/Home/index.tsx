import React from 'react'
import Navbar from '../../Components/Page_Components/Navbar/Navbar'
import HomeMain from './Parts/Main'
import HomeCats from './Parts/Product_Categories'

const Home = () => {
  return (
    <div className='container'>
        <HomeMain/>
        <HomeCats/>
    </div>
  )
}

export default Home