/* eslint-disable react/prop-types */
import "./Favorites.css";

const Favorites = ({ favoriteReciepts, deleteAllFavorites }) => {



  return (
    <div>
      <button onClick={deleteAllFavorites} className="deleteBtn">Delete All!</button>
      <div className="favorites">
        {favoriteReciepts &&
          favoriteReciepts.length > 0 &&
          favoriteReciepts.map((reciept) => {
            if (reciept.id && reciept.title && reciept.image) {
              return (
                <div className="recieptFav" key={reciept.id}>
                  <p className="recieptTextFav">{reciept.title}</p>
                  <img
                    className="recieptImageFav"
                    src={reciept.image}
                    alt="reciept img"
                  />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Favorites;
