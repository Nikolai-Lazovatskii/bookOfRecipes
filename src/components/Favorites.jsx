/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Favorites = ({ newFavReciept }) => {
  const [favoriteReciepts, setFavoriteReciepts] = useState([]);
  const recieptsRef = useRef(favoriteReciepts);

  useEffect(() => {
    if (!recieptsRef.current.some(reciept => reciept.id === newFavReciept.id)) {
        recieptsRef.current = [...recieptsRef.current, newFavReciept];
        setFavoriteReciepts(recieptsRef.current);
      }
  }, [newFavReciept]);

  return (
    <div className="favorites">
      {favoriteReciepts.map((reciept) => {
        return <p key={reciept.id}>Hello {reciept.title}</p>;
      })}
    </div>
  );
};

export default Favorites;
