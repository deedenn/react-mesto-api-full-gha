import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleName(evt) {
        setName(evt.target.value);
    }

    function handleDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="edit"
            btnText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" id="inputName" name="name"
                className="popup__input popup__input_el_name" minLength="2" maxLength="40" required onChange={handleName} value={name || ""} />
            <span className="inputName-error popup__input-error"></span>
            <input type="text" id="inputDescription" name="about"
                className="popup__input popup__input_el_description" required minLength="2" maxLength="200" onChange={handleDescription} value={description || ""} />
            <span className="inputDescription-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;

