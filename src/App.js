import "./index.scss";
import {Route,Routes} from 'react-router-dom'

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useState,useEffect } from "react";
import axios from 'axios'
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
  
function App() {
const [items,setItems]=useState([])
const [cartItems,setCartItems]=useState([])
const [favorites,setFavorites]=useState([])
const [searchValue,setSearchValue]=useState('')
const [cartOpened,setCartOpened]=useState(false)

  useEffect(()=>{

    // fetch('https://6408c5242f01352a8a9cfe5a.mockapi.io/items').then(res=>res.json()).then(json=>setItems(json))

    axios.get('https://6408c5242f01352a8a9cfe5a.mockapi.io/items').then(res=>{setItems(res.data)})

    axios.get('https://6408c5242f01352a8a9cfe5a.mockapi.io/cart').then(res=>{setCartItems(res.data)})
    axios.get('https://6411dcd1f9fe8122ae1620ab.mockapi.io/favorites').then(res=>{setFavorites(res.data)})

  },[])

  const onAddToCart=(obj)=>{
    axios.post('https://6408c5242f01352a8a9cfe5a.mockapi.io/cart',obj)

  setCartItems(prev=>[...prev,obj])
  }
  const onAddToFavorite=async (obj)=>{
    try {
      if(favorites.find(Favobj=>Favobj.id===obj.id))
    {axios.delete(`https://6411dcd1f9fe8122ae1620ab.mockapi.io/favorites/${obj.id}`)
  //  setFavorites((prev)=>prev.filter((item)=>item.id!==obj.id))
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
    console.log(id)
    axios.delete(`https://6408c5242f01352a8a9cfe5a.mockapi.io/cart/${id}`)
    setCartItems(prev=>prev.filter(item=>item.id!==id))
  }

  const onChangeSearchInput=(event)=>{
  setSearchValue(event.target.value)
  }
  
  return (
    <div className="wrapper clear"> 
    
        {cartOpened?<Drawer items={cartItems} onClose={()=>setCartOpened(false)} onRemove={onRemoveItem} />:null}
        <Header onClickCart={()=>setCartOpened(true)}  />

           <Routes>
           
          <Route element={<Home items={items} searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearchInput={onChangeSearchInput} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} />} path="/" exact> 
          

          </Route> 
          </Routes>

           <Routes>
           
          <Route element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>} path="/favorites" exact> 
        
          </Route> 
          </Routes>
      
    

     
    </div>
  );
}

export default App;
