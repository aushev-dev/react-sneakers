import axios from "axios"
import Card from "../components/Card"
import React, { useState } from "react"
import { AppContext } from "../App"


function Orders (){
const {onAddToFavorite,onAddToCart}=React.useContext(AppContext)
  const [orders,setOrders]=useState([])
  const [isLoading,setIsLoading]=useState(true)

React.useEffect(()=>{
  (async()=>{
    try {
      const {data}= await axios.get('https://6411dcd1f9fe8122ae1620ab.mockapi.io/orders')
    setOrders(data.reduce((prev,obj)=>[...prev,...obj.items],[]))
    setIsLoading(false)
      
    } catch (error) {
      alert('Error')
    }
  })()
},[])

    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1> Мои заказы  </h1>    
        </div>

        <div className="sneakers d-flex flex-wrap ">
        {
          (
            isLoading
            ?[...Array(12)]
            :orders).map((item,index)=>{
              return  <Card key={index}
              loading={isLoading}
              {...item}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
             
              /> 
            })
        }

        </div>
      </div>
    )
}


export default Orders


