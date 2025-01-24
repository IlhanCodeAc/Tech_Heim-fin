import React from 'react'
import style from "./style.module.css"
import Watchs from "../../../../assets/Images/Frame 26086945.png"

const Watch = () => {
  return (
    <div className={style.WatchCont}>
        <div className={style.Left}>
            <h1 className='text-white font-inter text-[44px] font-medium leading-normal'>SMART WATCH</h1>
            <p className='text-white font-inter text-[24px] font-light leading-normal'>Various designs and brands</p>
            <button className='inline-flex px-4 py-2 justify-center items-center rounded-lg bg-[#FF6951]'>View All</button>
        </div>
        <div className={style.Right}><img src={Watchs} alt="" /></div>
    </div>
  )
}

export default Watch