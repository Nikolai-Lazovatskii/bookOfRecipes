import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Reciepts from "./components/Reciepts";
import Search from "./components/Search";
import Favorites from "./components/Favorites";

function App() {
  const [searchTag, setSearchTag] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [reciept, setReciept] = useState([])

  const API_KEY = "9265df2e52994c5ea5707dc3714479af";

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchTag}`
      );
      const data = await response.json();
      setRecipes(data.results);
    };

    if (searchTag) {
      getRecipes();
    }
  }, [searchTag]);

  const getSearch = (text) => {
    setSearchTag(text);
  };

  const getReciept = (favReciept) => {
    setReciept(favReciept)
    console.log(favReciept);
  }

  return (
    <div className="app">
      <Router>
        <header className="header">
          <h1 className="appTitle">Book of Recipes</h1>
          <h2>
            <Link to="/" className="menuButton">
              Search
            </Link>
          </h2>
          <h2>
            <Link to="/favorites" className="menuButton">
              Favorites
            </Link>
          </h2>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <div className="main">
                <Search getSearch={getSearch} />
                <Reciepts recipes={recipes} API_KEY={API_KEY} getReciept={getReciept} />
              </div>
            }
          />
          <Route path="/favorites" element={<Favorites newFavReciept={reciept} />} />
        </Routes>
        <footer>Nikolai Lazovatskii, Pet Project - August 2023</footer>
      </Router>
    </div>
  );
}

export default App;
