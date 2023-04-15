import "./index.scss";
import {Route,Routes} from 'react-router-dom'
import React from "react";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useState,useEffect } from "react";
import axios from 'axios'
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";


export const AppContext=React.createContext({})
  
function App() {
const [items,setItems]=useState([])
const [cartItems,setCartItems]=useState([])
const [favorites,setFavorites]=useState([])
const [searchValue,setSearchValue]=useState('')
const [cartOpened,setCartOpened]=useState(false)
const [isLoading,setIsLoading]=useState(true)

  useEffect(()=>{
    async function fetchData(){
    
     try {
       const cartResponse=await axios.get('https://6408c5242f01352a8a9cfe5a.mockapi.io/cart')
      const favoritesResponse=await axios.get('https://6411dcd1f9fe8122ae1620ab.mockapi.io/favorites')
      const itemsResponse=await axios.get('https://6408c5242f01352a8a9cfe5a.mockapi.io/items')

      setIsLoading(false)

      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)
      
     } catch (error) {
      alert('Oшибка приз запросе данных')
     }
    }
    fetchData()
  },[])

  const onAddToCart= async (obj)=>{
  try {
    const findItem=cartItems.find((item)=>Number(item.parentId)===Number(obj.id))

    if(findItem)
    { setCartItems((prev)=>prev.filter((item)=>Number(item.parentId)!==Number(obj.id)))
      await axios.delete(`https://6408c5242f01352a8a9cfe5a.mockapi.io/cart/${findItem.id}`)
      }
    else{ 
      
   axios.post('https://6408c5242f01352a8a9cfe5a.mockapi.io/cart',obj)
   setCartItems((prev)=>[...prev,obj])
    

    }
  } catch (error) {
  }
  }


  const onAddToFavorite=async (obj)=>{
    try {
      if(favorites.find(Favobj=>Number(Favobj.id)===Number(obj.id)))
    {axios.delete(`https://6411dcd1f9fe8122ae1620ab.mockapi.io/favorites/${obj.id}`)
   setFavorites((prev)=>prev.filter((item)=>Number(item.id)!==Number(obj.id)))
    }
    else{
      const {data}=await axios.post('https://6411dcd1f9fe8122ae1620ab.mockapi.io/favorites',obj)
    
      setFavorites(prev=>[...prev,data])
    }
    } catch (error) {
      alert('Dont add in favorites')
    }
  }

  const onRemoveItem=(id)=>{
    axios.delete(`https://6408c5242f01352a8a9cfe5a.mockapi.io/cart/${id}`)
    setCartItems(prev=>prev.filter(item=>Number(item.id)!==Number(id)))
  }

  const onChangeSearchInput=(event)=>{
  setSearchValue(event.target.value)
  }

  const isItemAdded=(id)=>{
    return cartItems.some((obj)=>Number(obj.parentId)===Number(id))
  }
  
  return (
    <AppContext.Provider value={{items,cartItems,favorites,isItemAdded,onAddToFavorite,setCartOpened,setCartItems,onAddToCart}}>
      <div className="wrapper clear"> 
      {cartOpened&&<Drawer items={cartItems} onClose={()=>setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />}
    <Header onClickCart={()=>setCartOpened(true)}  />
       <Routes>
      <Route element={<Home 
      items={items} 
      cartItems={cartItems}
      searchValue={searchValue} 
      setSearchValue={setSearchValue} 
      onChangeSearchInput={onChangeSearchInput}
      onAddToCart={onAddToCart} 
      onAddToFavorite={onAddToFavorite} 
      isLoading={isLoading}
      />} path="/" exact> 
      </Route> 
      </Routes>
       <Routes>
      <Route element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />} path="/favorites" exact> 
      </Route> 
      </Routes>
      <Routes>
      <Route element={<Orders />} path="/orders" exact> 
      </Route> 
      </Routes>
</div>
    </AppContext.Provider>
  );
}

export default App;


