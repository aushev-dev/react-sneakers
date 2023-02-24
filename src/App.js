import "./index.scss";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr=[
  {
    title:'Nike Blazer Mid Suede', price:12999,imageUrl:'/img/sneakers/1.jpg'},
    {title:'Nike Air Max 270', price:15600,imageUrl:'/img/sneakers/2.jpg'},
    {title:'Nike Blazer Mid Suede', price:12999,imageUrl:'/img/sneakers/3.jpg'},
    {title:'Nike Air Max 270', price:8999,imageUrl:'/img/sneakers/4.jpg'},
]

function App() {
  return (
    <div className="wrapper clear">
        <Drawer/>
        <Header/>

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Search..." />
          </div>
        </div>
        <div className="sneakers d-flex">
        {
            arr.map((obj)=>{
              return  <Card title={obj.title} 
              price={obj.price} 
              imageUrl={obj.imageUrl} onClick={()=>console.log(obj)}/> 
            })
        }

        </div>
      </div>
    </div>
  );
}

export default App;
