import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Reciepts from "./components/Reciepts";
import Search from "./components/Search";


function App() {
  const [searchTag, setSearchTag] = useState("");
  const [recipes, setRecipes] = useState([]);

  const API_KEY = "9265df2e52994c5ea5707dc3714479af" 


  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchTag}`
      )
      const data = await response.json()
      setRecipes(data.results)
    }

    if (searchTag) {
      getRecipes();
    }

  }, [searchTag])

  const getSearch = (text) => {
    setSearchTag(text);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="appTitle">Book of Recipes</h1>
      </header>
      <div className="main">
        <Search getSearch={getSearch} />
        <Reciepts recipes={recipes} API_KEY={API_KEY} />
      </div>
      <footer>Nikolai Lazovatskii, Pet Project - August 2023</footer>
    </div>
  );
}

export default App;
