import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Reciepts from "./components/Reciepts";
import Search from "./components/Search";
import Favorites from "./components/Favorites";


function App() {
  // State initialization for various elements of the application
  const [searchTag, setSearchTag] = useState(""); // For storing search keyword
  const [recipes, setRecipes] = useState([]); // For storing fetched recipes
  const [reciept, setReciept] = useState([]); // For storing an individual receipt
  // Loading favorite receipts from local storage, or initialize with an empty array

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

  const API_KEY = import.meta.env.VITE_API_KEY; // API Key for fetching recipes

  // Function to fetch recipes based on the search tag
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

  // Function to handle search input
  const getSearch = (text) => {
    setSearchTag(text);
  };

  // Function to get an individual receipt
  const getReciept = (favReciept) => {
    setReciept(favReciept);
  };

  // Function to add a receipt to favorites if it doesn't exist already
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

  // Function to delete all favorite receipts
  const deleteAllFavorites = () => {
    setFavoriteReciepts([])
  }

  // Persisting favorite receipts in local storage
  useEffect(() => {
    localStorage.setItem("favoriteReciepts", JSON.stringify(favoriteReciepts));
  }, [favoriteReciepts]);

  // Main render of the application
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
            <Link to="/favorites" className="menuButton favoriteBtn">
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
            element={<Favorites favoriteReciepts={favoriteReciepts} deleteAllFavorites={deleteAllFavorites} API_KEY={API_KEY} />}
          />
        </Routes>
        <footer>Nikolai Lazovatskii, Pet Project - August 2023</footer>
      </Router>
    </div>
  );
}

export default App;
