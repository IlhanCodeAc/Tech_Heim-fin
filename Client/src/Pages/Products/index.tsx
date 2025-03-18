import Prods from './Parts/Products'
import {Sidebar} from '../../Components/Page_Components/SideFilter'

const Productspage = () => {
  return (
    <div>
      <Sidebar/>
        <div className="container">
        <Prods/>
        </div>
    </div>
  )
}

export default Productspage