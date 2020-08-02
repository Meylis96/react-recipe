import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const APP_ID = '107cd4ad';
  const APP_KEY = '11e5bebc631c8b8a55f85332aec3a35f';
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect( () => {
      getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSeacrh = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return(
    <div className="App">
      <form
      onSubmit={getSeacrh}
      className="search-form">
        <input
        className="search-bar"
        type="text"
        value={search}
        onChange={updateSearch}/>
        <button
          className="search-button"
          type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipes => (
          <Recipe
          key={recipes.recipe.label}
          title={recipes.recipe.label}
          calories={recipes.recipe.calories}
          image={recipes.recipe.image}
          ingredients={recipes.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
};

export default App;
