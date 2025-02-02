import React from 'react'
import Card from '../../../../Components/Page_Components/Card'
import style from "./style.module.css"
import Phone from "../../../../assets/Images/16promax.png"

const Prods = () => {
  return (
    <div>
        <div>
        
        <div className={style.NewProducts}>
            <div className={style.NewProd}>
                <div className={style.ProdImage}>
                    <img src={Phone} alt="" />
                </div>
                <div className={style.ProdDetail}>
                    <p className='flex mt-[16px] mb-[16px] flex-col justify-center flex-1 self-stretch overflow-hidden text-[#0C0C0C] text-ellipsis whitespace-nowrap font-inter text-[16px] font-heavy leading-[24px]'>Iphone 16 PRO MAX 256 GB</p>
                    <p className='text-[#0C0C0C] font-inter text-[18px] font-heavy leading-normal mt-[40px]'>$930</p>
                </div>
            </div>
            <div className={style.NewProd}>
                <div className={style.ProdImage}>
                    <img src={Phone} alt="" />
                </div>
                <div className={style.ProdDetail}>
                    <p className='flex mt-[16px] mb-[16px] flex-col justify-center flex-1 self-stretch overflow-hidden text-[#0C0C0C] text-ellipsis whitespace-nowrap font-inter text-[16px] font-heavy leading-[24px]'>Iphone 16 PRO MAX 256 GB</p>
                    <p className='text-[#0C0C0C] font-inter text-[18px] font-heavy leading-normal mt-[40px]'>$930</p>
                </div>
            </div>
            <div className={style.NewProd}>
                <div className={style.ProdImage}>
                    <img src={Phone} alt="" />
                </div>
                <div className={style.ProdDetail}>
                    <p className='flex mt-[16px] mb-[16px] flex-col justify-center flex-1 self-stretch overflow-hidden text-[#0C0C0C] text-ellipsis whitespace-nowrap font-inter text-[16px] font-heavy leading-[24px]'>Iphone 16 PRO MAX 256 GB</p>
                    <p className='text-[#0C0C0C] font-inter text-[18px] font-heavy leading-normal mt-[40px]'>$930</p>
                </div>
            </div>
            <div className={style.NewProd}>
                <div className={style.ProdImage}>
                    <img src={Phone} alt="" />
                </div>
                <div className={style.ProdDetail}>
                    <p className='flex mt-[16px] mb-[16px] flex-col justify-center flex-1 self-stretch overflow-hidden text-[#0C0C0C] text-ellipsis whitespace-nowrap font-inter text-[16px] font-heavy leading-[24px]'>Iphone 16 PRO MAX 256 GB</p>
                    <p className='text-[#0C0C0C] font-inter text-[18px] font-heavy leading-normal mt-[40px]'>$930</p>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Prods