import React from 'react'
import { AppContext } from '../App'

export const Info = ({title,image,description}) => {
const{setCartOpened}=React.useContext(AppContext)

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
    <img className="mb-20" width={120} src={image} alt="" />
    <h3>{title}</h3>
    <p className="opacity-6"> {description} </p>
    <button onClick={()=>setCartOpened(false)} className="greenButton">
    <img src="/img/arrow.svg" alt="Arrow"  /> Вернуться назад
    </button>
    </div>
  )
}

