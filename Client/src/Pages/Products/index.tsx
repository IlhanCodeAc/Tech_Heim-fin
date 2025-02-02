import React from 'react'
import Topcats from './Parts/Topcats'
import { Sidebar } from '../../Components/Page_Components/SideFilter'
import Prods from './Parts/Products'

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