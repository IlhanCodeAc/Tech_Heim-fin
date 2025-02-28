import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Sony from '../../../../assets/SVGs/Vector.svg';
import Apple from '../../../../assets/SVGs/Frame.svg';
import Lenovo from '../../../../assets/SVGs/Lenova.svg';
import Canon from '../../../../assets/SVGs/Canon.svg';
import Samsung from '../../../../assets/SVGs/Samsung.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import style from "./style.module.css"
import { Link } from 'react-router-dom';
const Swiping = () => {
  return (
    <div>
    <div className={style.TopBrand}>
      <h3 className='text-black font-medium text-[32px] font-inter'>Top Brands</h3>
    </div>
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      style={{
        width: '80%',
        margin: '0 auto',
      }}
    >
      <SwiperSlide>
        <Link to="/products?brand=67aa37a81e0582342cc67003">
        <div style={styles.slideContainer}>
          <img src={Sony} alt="Sony" style={styles.image as React.CSSProperties} />
        </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
       <Link to="/products?brand=67aa37951e0582342cc66ffa"> <div style={styles.slideContainer}>
          <img src={Apple} alt="Apple" style={styles.image as React.CSSProperties} />
        </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <div style={styles.slideContainer}>
          <img src={Lenovo} alt="Lenovo" style={styles.image as React.CSSProperties} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div style={styles.slideContainer}>
          <img src={Canon} alt="Canon" style={styles.image as React.CSSProperties} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="http://localhost:5173/products?brand=67aa379d1e0582342cc66ffd">
        <div style={styles.slideContainer}>
          <img src={Samsung} alt="Samsung" style={styles.image as React.CSSProperties} />
        </div>
        </Link>
      </SwiperSlide>
    </Swiper>
    </div>
  );
};

const styles = {
  slideContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    // boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  image: {
    maxWidth: '70%',
    maxHeight: '100%',
    objectFit: 'contain' as 'contain',
  },
};

export default Swiping;
