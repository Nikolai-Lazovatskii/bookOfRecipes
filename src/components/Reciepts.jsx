/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import "./Reciepts.css";

const Reciepts = ({ recipes, API_KEY }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recieptId, setRecieptId] = useState(0);
  const [recieptData, setRecieptData] = useState([[]]);

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
      console.log(data);
      setRecieptData(data);
    };

    if (recieptId) {
      getRecieptInfo();
    }
  }, [recieptId]);

  return (
    <div className="reciepts">
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h1 className="modalTitle">{recieptData.title}</h1>
        <p className="modalText" dangerouslySetInnerHTML={{ __html: recieptData.summary }} />
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
