import Topcats from './Parts/Topcats'
import Prods from './Parts/Products'
import {Sidebar} from '../../Components/Page_Components/SideFilter'

const Productspage = () => {
  return (
    <div>
      <Sidebar/>
        <div className="container">
        <Topcats/>
        <Prods/>
        </div>
    </div>
  )
}

export default Productspage