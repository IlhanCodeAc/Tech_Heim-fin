import HomeMain from './Parts/Main'
import HomeCats from './Parts/Product_Categories'
import Newproducts from './Parts/New_Products'
import Timedeal from './Parts/TimeDeal'
import Swiping from './Parts/Swiping'
import Watch from './Parts/Watch'

const Home = () => {
  return (
    <div className='container'>
        <HomeMain/>
        <HomeCats/>
        <Newproducts/>
        <Timedeal/>
        <Swiping/>
        <Watch/>
    </div>
  )
}

export default Home