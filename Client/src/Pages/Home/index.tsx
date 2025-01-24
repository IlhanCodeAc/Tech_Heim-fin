import HomeMain from './Parts/Main'
import HomeCats from './Parts/Product_Categories'
import Newproducts from './Parts/New_Products'
import Timedeal from './Parts/TimeDeal'

const Home = () => {
  return (
    <div className='container'>
        <HomeMain/>
        <HomeCats/>
        <Newproducts/>
        <Timedeal/>
    </div>
  )
}

export default Home