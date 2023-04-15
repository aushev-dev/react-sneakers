import { useState } from "react"
import { Info } from "./Info"
import { useCart } from "./hooks/useCart"
import React from "react"
import axios from "axios"


const delay=()=>new Promise((resolve)=>setTimeout(resolve,1000))

function Drawer ({id,onClose,onCloseCart,onRemove,items=[],opened}){
const {cartItems,setCartItems,totalPrice}=useCart()
const [isOrderComplete,setIsOrderComplete]=useState(false)
const [isLoading,setIsLoading]=useState(false)
const [orderId,setOrderId]=useState(null)

const onClickOrder=async ()=>{

  try{
    setIsLoading(true)
    const {data}=await axios.post('https://6411dcd1f9fe8122ae1620ab.mockapi.io/orders',
    {items:cartItems})
   
  setOrderId(data.id)
  setIsOrderComplete(true)
  setCartItems([])
  
  for (let i=0;i<cartItems.length;i++){
    const item=cartItems[i]
    await axios.delete('https://6408c5242f01352a8a9cfe5a.mockapi.io/cart'+item.id)
    await delay()
  }}

  catch (error){
  alert('Wait')
  }
  setIsLoading(false)
}

    return (
        <div className="overlay">
        <div className="drawer">
        <h2 className="mb-30 d-flex justify-between ">Корзина <img onClick={onClose} className="removeBtn cu-p"src="/img/btn-remove.svg " alt="Close"></img></h2>

          {items.length>0?  
          <div className="d-flex flex-column flex">
           <div className="items">
      {items.map((obj)=>(
      <div key={obj.id} className="cartItem d-flex align-center mb-20 ">
        <div
          style={{ backgroundImage: `url(${obj.imageUrl})` }}
          className="cartItemImg"
        ></div>
        <div className="mr-20 flex  ">
          <p className="mb-5">{obj.title}</p>
          <b>{obj.price} руб</b>
        </div>
        <img onClick={()=>onRemove(obj.id)} className="removeBtn"src="/img/btn-remove.svg" alt="Remove"
        />
      </div>
      ))}
  </div>

  <div className="cartTotalBlock">
        <ul className="">
          <li className="d-flex">
            <span>Итого</span>
            <div></div>
            <b>{totalPrice} руб.</b>
          </li>
          <li className="d-flex">
            <span>Налог 5%</span>
            <div></div>
            <b>{totalPrice/100*5} руб.</b>
          </li>
        </ul>
        <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
        </div>
        </div>
  :  <Info title={isOrderComplete?"Заказ оформлен!":"Корзина пустая"} 
      description={
        isOrderComplete
        ?`Ваш заказ #${orderId} скоро будет передан курьерской доставке`:`Добавьте хотя бы одну пару кроссовок,чтобы сделать заказ`}
      image={isOrderComplete?"/img/completed-order.jpg":"/img/empty-cart.jpg"}/>
  }
      </div>
       </div>
    )
}

export default Drawer


