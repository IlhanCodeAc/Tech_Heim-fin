import React from 'react'
import style from "./style.module.css"
import Computer from "../../../../assets/Images/Frame 26086938.png"

const HomeMain = () => {
  return (
    <div>
        <div className={style.HomeContainer}>
            <div className={style.Left}>
                <h3 className="text-[64px] font-sans font-semibold leading-none text-[#042352] pt-[56px]">Tech Heim</h3>
                <div className="flex mt-[50px]"><p className='flex mx-[5px] text-[32px] font-sans font-medium leading-none text-[#042352]'>"Join the</p><p className='text-[32px] font-sans font-medium leading-none text-[#F45E0C]'>digital revolution</p><p className='flex mx-[5px] text-[32px] font-sans font-medium leading-none text-[#042352]'>"</p></div>
                <button className='mt-[128px] flex w-[288px] h-[56px] p-[8px_16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] bg-[#F45E0C] text-white text-center text-[16px] font-sans font-normal leading-none'>Explore More</button>
            </div>
            <div className={style.Right}><img src={Computer} alt="" /></div>
        </div>
    </div>
  )
}

export default HomeMain