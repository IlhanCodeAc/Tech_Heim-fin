import React from 'react'
import style from "./style.module.css"
import call from "../../../assets/SVGs/call-calling.svg"
import mail from "../../../assets/SVGs/sms-edit.svg"
import Youtube from "../../../assets/SVGs/Youtube.svg"
import Instagram from "../../../assets/SVGs/Group.svg"

const Footer = () => {
  return (
    <div className={style.Footer}>
        <div className='container'>
            <div className={style.FooterContainer}>
            <div className={style.Left}>
             <h3 className='text-white font-inter text-[16px] font-medium leading-normal'>Tech Heim</h3>
             <div className={style.LeftInfo}>
                <p className='text-[#CBCBCB] font-inter text-[16px] font-light leading-[24px]'>About us</p>
                <p className='text-[#CBCBCB] font-inter text-[16px] font-light leading-[24px]'>Products</p>
                <p className='text-[#CBCBCB] font-inter text-[16px] font-light leading-[24px]'>All rights are reserved</p>
             </div>
            </div>
            <div className={style.Mid}>
                <h3 className='text-white font-inter text-[16px] font-medium leading-normal'>Contact us</h3>
                <div className={style.MidInfo}>
                    <p className='text-[#CBCBCB] font-inter text-[16px] font-light leading-[24px] flex'><img src={call} alt="" />+994-55-270-78-07</p>
                    <p className='text-[#CBCBCB] font-inter text-[16px] font-light leading-[24px] flex'><img src={mail} alt="" />ilhanma@code.edu.az</p>
                </div>
            </div>
            <div className={style.right}>
                    <h3 className='text-white font-inter text-[16px] font-medium leading-normal'>Follow Our Socials</h3>
                <div className={style.Logos}>
                    <img src={Instagram} alt="" />
                    <img src={Youtube} alt="" />
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Footer
