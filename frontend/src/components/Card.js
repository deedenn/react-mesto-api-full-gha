import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = props.card.likes.some((item) => item === currentUser._id);
  const isOwn = props.card.owner === currentUser._id;

  const cardLikeButtonClassName = (`element__btn-like ${isLiked ? 'element__btn-like_active': ''}`);
  const cardDeleteButtonClassName = (`element__btn-del ${isOwn ? "" : 'element__btn-del_none'}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteCard() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <article className="element" key={props.card._id} >
      <img className="element__image" src={props.card.link} alt={props.card.alt} onClick={handleClick} />
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteCard}></button>
      <div className="element__description">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__likes">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__like_counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;