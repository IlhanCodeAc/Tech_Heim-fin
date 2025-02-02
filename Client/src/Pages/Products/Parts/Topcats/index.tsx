import React, { useState } from 'react';
import Mobile from "../../../../assets/SVGs/mobile.svg";
import style from "./style.module.css";

const Topcats = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div>
        <div className={style.Topcats}>
          <div 
            className={`${style.Topcat} ${activeIndex === 0 ? style.active : ''}`}
            onClick={() => setActiveIndex(0)}
          >
            <div className={style.Catimg}>
              <img src={Mobile} alt="" />
            </div>
            <div className={style.Catbot}>
              <p className={style.Cattext}>Mobile</p>
            </div>
          </div>
          <div 
            className={`${style.Topcat} ${activeIndex === 1 ? style.active : ''}`}
            onClick={() => setActiveIndex(1)}
          >
            <div className={style.Catimg}>
              <img src={Mobile} alt="" />
            </div>
            <div className={style.Catbot}>
              <p className={style.Cattext}>Mobile</p>
            </div>
          </div>
          <div 
            className={`${style.Topcat} ${activeIndex === 2 ? style.active : ''}`}
            onClick={() => setActiveIndex(2)}
          >
            <div className={style.Catimg}>
              <img src={Mobile} alt="" />
            </div>
            <div className={style.Catbot}>
              <p className={style.Cattext}>Mobile</p>
            </div>
          </div>
          <div 
            className={`${style.Topcat} ${activeIndex === 3 ? style.active : ''}`}
            onClick={() => setActiveIndex(3)}
          >
            <div className={style.Catimg}>
              <img src={Mobile} alt="" />
            </div>
            <div className={style.Catbot}>
              <p className={style.Cattext}>Mobile</p>
            </div>
          </div>
          <div 
            className={`${style.Topcat} ${activeIndex === 4 ? style.active : ''}`}
            onClick={() => setActiveIndex(4)}
          >
            <div className={style.Catimg}>
              <img src={Mobile} alt="" />
            </div>
            <div className={style.Catbot}>
              <p className={style.Cattext}>Mobile</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Topcats;
