import React from 'react'
import style from "./style.module.css"
import HalfRating from './stars'
import user from "../../../../assets/SVGs/user.svg"
import { Star } from 'lucide-react'

const Comments = () => {
  return (
    <div className={style.CommentContainer}>
      <div className={style.Left}>
        <h3>Comments</h3>
        <p>leave your comments here for other customers</p>
        <input type="text" placeholder='Share your thoughts about this product here' />
        <div className={style.Commenting}>
        <button>Comment</button>
        <HalfRating/>
        </div>
      </div>
      <div className={style.Right}>
        <div className={style.Comments}>
          <div className={style.Comment}>
          <div className={style.CommentTop}>
              <div className={style.CommentTopLeft}>
                <img src={user} alt="" className='w-[30px] h-[30px]' />
                <div className={style.CommentUser}>
                  <h3>Ilhan</h3>
                  <p>December 5, 2024</p>
                </div>
              </div>
              <div className={style.CommentTopRight}>
                <div className={style.Rating}>
                  <Star fill='white' /> 5.0
                </div>
              </div>
            </div>
            <div className={style.CommentContent}>
              <p>
              I needed a fast, efficient laptop for on the go use. Battery life is amazing. Build quality is fantastic. Perfect fit for my needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments