import  { useState, useEffect } from "react";
import style from "./style.module.css";
import Phones from "../../../../assets/Images/image 187.png";
import { Link } from "react-router-dom";

const Timedeal = () => {
  const targetTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link to="/products/67aafcff11b2d6ee90496054">
    <div className={style.TimeCont}>
      <div className={style.TimeContainer}>
        <div className={style.Left}>
          <h3 className="text-[#FFF] font-inter text-[24px] font-medium leading-normal">
            Iphone 16 Series
          </h3>
          <img src={Phones} alt="" />
        </div>
        <div className={style.Right}>
          <div className={style.TimerContainer}>
            <div className={style.Timer}>
              <p>{timeLeft.days}</p> <p>Days</p>
            </div>
            <div className={style.Timer}>
              <p>{timeLeft.hours}</p> <p>Hours</p>
            </div>
            <div className={style.Timer}>
              <p>{timeLeft.minutes}</p> <p>Minutes</p>
            </div>
            <div className={style.Timer}>
              <p>{timeLeft.seconds}</p> <p>Seconds</p>
            </div>
          </div>
          <div className={style.DealInfo}>
            <div className={style.InfoHeader}>
              <h3 className="text-[#0C0C0C] mb-[20px] font-inter text-[20px] font-medium leading-normal">
                It feels good to be the first
              </h3>
            </div>
            <div className={style.Info}>
              <p className="text-[#2D2D2D] font-inter text-[16px] font-light leading-[24px] w-[248px]">
                Get ready for the future of smartphones. Experience innovation like never before. Stay tuned for the big iPhone 15 pre-sale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Timedeal;
