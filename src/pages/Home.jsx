import Card from "../components/Card"
function Home ({items,searchValue,setSearchValue,onChangeSearchInput,onAddToCart,onAddToFavorite}){
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue?`Поиск за запросу:"${searchValue}"`:`All sneakers`} </h1> 

          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue&&<img onClick={()=>setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
          </div>
        </div>
        <div className="sneakers d-flex flex-wrap ">
        {
            items.filter(item=>item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item,index)=>{
              return  <Card 
              key={index}
              title={item.title} 
              price={item.price} 
              imageUrl={item.imageUrl} 
              onFavorite={(obj)=>onAddToFavorite(obj)}
              onPlus={(obj)=>onAddToCart(obj)}/> 
            })
        }

        </div>
      </div>
    )
}

export default Home