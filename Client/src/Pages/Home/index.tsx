import HomeMain from './Parts/Main'
import HomeCats from './Parts/Product_Categories'
import Newproducts from './Parts/New_Products'

const Home = () => {
  return (
    <div className='container'>
        <HomeMain/>
        <HomeCats/>
        <Newproducts/>
    </div>
  )
}

export default Home