import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_showimg ${props.isOpen ? "popup_opened" : " "}`}>
      <div className="big-popup">
        <button className="popup__btn-close" type="button" onClick={props.onClose}></button>
        <div className="big-popup__container">
          <img className="big-popup__image" src={`${props.card.link}`} alt={`${props.card.alt}`} />
          <h2 className="big-popup__name">{props.card.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;