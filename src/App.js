import React,{useEffect,useState} from "react";
import './App.css';
import Recipe from './Recipe';


const App=()=>{

  const APP_ID = 'ce39f83a';
  const APP_KEY = '7cf0573ec837467fe07687228b460755';
  const[recipies, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const[query,setQuery]=useState('chicken');

  useEffect(()=>{
    getRecipes();   
  },[query]);

  const getRecipes = async ()=>{
    const response= await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

    const updateSearch =e=>{
      setSearch(e.target.value);
    };
    const getSearch =e=>{
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }
  return(
  <div className="APP">
    <form onSubmit={getSearch} className="search-form">
      <h1>PSBK</h1>
      <input className="search-bar" type="text" value={search} onChange={ updateSearch}/>
      <button className="search-button" type="submit">Search</button>
    </form>
    <div className="recipes">
    {recipies.map(recipe=>(
      <Recipe 
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories} 
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}/>
    ))}
    </div>
  </div>
  );
};
export default App;
