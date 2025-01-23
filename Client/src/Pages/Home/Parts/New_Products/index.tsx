import React from 'react'
import style from "./style.module.css"
import Phone from "../../../../assets/Images/16promax.png"
const Newproducts = () => {
  return (
    <div>
        <div className={style.NewTexts}>
            <h3 className='flex-shrink-0 self-stretch w-[217px] text-[#0C0C0C] font-inter text-[32px] font-medium leading-normal'>New Products</h3>
            <p className='text-center text-[#0C0C0C] font-inter text-[16px] font-normal leading-normal'>View all {'>'}</p>
        </div>
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
  )
}

export default Newproducts