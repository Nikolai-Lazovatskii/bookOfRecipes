/* eslint-disable react/prop-types */
import "./Favorites.css";
import Modal from "react-modal";
import { useState } from "react";
import { useEffect } from "react";

const Favorites = ({ favoriteReciepts, deleteAllFavorites }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recieptId, setRecieptId] = useState(0);
  const [recieptData, setRecieptData] = useState([]);


  const API_KEY = "9265df2e52994c5ea5707dc3714479af";

  const recieptOpenHandler = (id) => {
    setRecieptId(id);
    setModalIsOpen(true);
  };

  useEffect(() => {
    const getRecieptInfo = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recieptId}/information?apiKey=${API_KEY}&includeNutrition=false`
      );
      const data = await response.json();
      setRecieptData(data);
    };

    if (recieptId) {
      getRecieptInfo();
    }
  }, [recieptId]);

  const deleteReciept = (id) => {
    for (let recieptIndex = 0; recieptIndex < favoriteReciepts.length; recieptIndex++) {
      if (favoriteReciepts[recieptIndex].id === id) {
        favoriteReciepts.splice(recieptIndex, 1)
        setModalIsOpen(false)
      }
    }
    localStorage.setItem("favoriteReciepts", JSON.stringify(favoriteReciepts));
  };

  return (
    <div>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="recieptContainer">
          <h1 className="modalTitle">{recieptData.title}</h1>
          <button onClick={() => deleteReciept(recieptData.id)} className="deleteBtn">
            Delete
          </button>
        </div>
        <p
          className="modalText"
          dangerouslySetInnerHTML={{ __html: recieptData.summary }}
        />
        <img className="modalImage" src={recieptData.image} alt="reciept img" />
        {recieptData.cuisines &&
          recieptData.cuisines.map((cuisine, index) => {
            return <p className="modalTag" key={index}>{`#${cuisine}`}</p>;
          })}
      </Modal>
      <button onClick={deleteAllFavorites} className="deleteBtn">
        Delete All!
      </button>
      <div className="favorites">
        {favoriteReciepts &&
          favoriteReciepts.length > 0 &&
          favoriteReciepts.map((reciept) => {
            if (reciept.id && reciept.title && reciept.image) {
              return (
                <div
                  className="recieptFav"
                  key={reciept.id}
                  onClick={() => recieptOpenHandler(reciept.id)}
                >
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
