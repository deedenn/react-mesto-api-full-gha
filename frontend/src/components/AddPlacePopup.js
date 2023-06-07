import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleChangeNameCard(evt) {
        setName(evt.target.value);
    }
    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: name,
            link: link,
        });
    }

    React.useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);


    return (

        <PopupWithForm
            title="Новое место"
            name="add"
            btnText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" id="inputTitle" name="name" className="popup__input popup__input_el_title"
                placeholder="Название" minLength="2" maxLength="30" required value={name} onChange={handleChangeNameCard} />
            <span className="inputTitle-error popup__input-error"></span>
            <input type="url" id="inputLink" name="link" className="popup__input popup__input_el_link"
                placeholder="Ссылка на картинку" required value={link} onChange={handleChangeLink} />
            <span className="inputLink-error popup__input-error"></span>

        </PopupWithForm>

    )

}

export default AddPlacePopup;