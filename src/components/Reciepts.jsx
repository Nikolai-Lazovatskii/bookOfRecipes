/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import "./Reciepts.css";

const Reciepts = ({ recipes, API_KEY, getReciept }) => {
  // State variables to handle modal and receipt information
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recieptId, setRecieptId] = useState(0);
  const [recieptData, setRecieptData] = useState([]);

  // Handler to open receipt modal with the given ID
  const recieptOpenHandler = (id) => {
    setRecieptId(id);
    setModalIsOpen(true);
  };

  // Fetch receipt information based on receipt ID
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

  // Function to add the receipt to favorites
  const addToFavorites = () => {
    getReciept(recieptData);
  };

  return (
    <div className="reciepts">
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="recieptContainer">
          <h1 className="modalTitle">{recieptData.title}</h1>
          <button onClick={addToFavorites} className="favBtn">
            Add to favorites
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
      {recipes.map((reciept) => {
        return (
          <div
            className="reciept"
            key={reciept.id}
            onClick={() => recieptOpenHandler(reciept.id)}
          >
            <p className="recieptText">{reciept.title}</p>
            <img
              className="recieptImage"
              src={reciept.image}
              alt="reciept img"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Reciepts;
