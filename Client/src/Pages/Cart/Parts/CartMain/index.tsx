import React, { useState } from 'react'
import style from "./style.module.css"
import { Minus, Plus, Trash2 } from "lucide-react"
import Iphone from "../../../../assets/Images/16promax.png"
import Delivery from "../../../../assets/SVGs/truck.svg"
import Varranty from "../../../../assets/SVGs/verify.svg"

const CartMain = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className='container'>
            <div className={style.CartContainer}>
            <div className={style.Left}>
                <div className={style.CartCards}>
                    <div className={style.CartCard}>
                        <div className={style.CardLeft}>
                            <img src={Iphone} alt="" />
                        </div>
                        <div className={style.CardMid}>
                            <div className={style.MidTop}>
                                <h3>Iphone 16 PRO MAX 256GB</h3>
                            </div>
                            <div className={style.MidMid}>
                                <div className={style.Delivery}>
                                    <img src={Delivery} alt="" />
                                    <p>Free Delivery</p>
                                </div>
                                <div className={style.Varranty}>
                                    <img src={Varranty} alt="" />
                                    <p>Guaranteed</p>
                                </div>
                            </div>
                            <div className={style.MidBottom}>
                                <div className={style.BottomLeft}>
                                    <p>{900 * quantity}$</p>
                                </div>
                                <div className={style.BottomRight}>
                                    <button className={style.btn} onClick={handleDecrease}>
                                        <Minus size={16} />
                                    </button>
                                    <p>{quantity}</p>
                                    <button className={style.btn} onClick={handleIncrease}>
                                        <Plus size={16} />
                                    </button>
                                    <button className={style.trashBtn}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.Right}>
                <div className={style.CheckoutCard}>
                    <div className={style.cardTop}>
                        <h3>Payment Details</h3>
                    </div>
                    <div className={style.cardMain}>
                            <div className={style.Subtotal}>
                                <p>Subtotal</p>
                                <p>900$</p>
                            </div>
                            <div className={style.Shipment}>
                                <p>Shipment cost</p>
                                <p>0$</p>
                            </div>
                    </div>
                    <div className={style.cardFoot}>
                        <div className={style.GrandTotal}>
                        <p>Grand Total</p>
                        <p>900$</p>
                        </div>
                        <button className={style.ToCheckout}>Proceed To Checkout</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default CartMain
