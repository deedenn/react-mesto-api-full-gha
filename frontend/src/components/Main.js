import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__container">
                    <button className="profile__avatar-btn" type="button" onClick={props.onEditAvatar}></button>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                    <div className="profile__info">
                        <div className="profile__wrap">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {props.cards.map((item) => {
                    return (
                        <Card
                            card={item}
                            key={item._id}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    );
                }
                )}
            </section>
        </main>
    );
}

export default Main;