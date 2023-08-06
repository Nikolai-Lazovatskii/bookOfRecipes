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
  const [reciept, setReciept] = useState([]);
  const [favoriteReciepts, setFavoriteReciepts] = useState(() => {
    try {
      const savedFavorite = localStorage.getItem("favoriteReciepts");
      if (savedFavorite) {
        return JSON.parse(savedFavorite);
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  });

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
    setReciept(favReciept);
  };

  useEffect(() => {
    if (!reciept) return;
    setFavoriteReciepts((prevReciepts) => {
      if (
        !prevReciepts.some(
          (existingReciept) => existingReciept.id === reciept.id
        )
      ) {
        return [...prevReciepts, reciept];
      }
      return prevReciepts;
    });
  }, [reciept]);

  const deleteAllFavorites = () => {
    setFavoriteReciepts([])
  }

  useEffect(() => {
    localStorage.setItem("favoriteReciepts", JSON.stringify(favoriteReciepts));
  }, [favoriteReciepts]);

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
                <Reciepts
                  recipes={recipes}
                  API_KEY={API_KEY}
                  getReciept={getReciept}
                />
              </div>
            }
          />
          <Route
            path="/favorites"
            element={<Favorites favoriteReciepts={favoriteReciepts} deleteAllFavorites={deleteAllFavorites} />}
          />
        </Routes>
        <footer>Nikolai Lazovatskii, Pet Project - August 2023</footer>
      </Router>
    </div>
  );
}

export default App;
