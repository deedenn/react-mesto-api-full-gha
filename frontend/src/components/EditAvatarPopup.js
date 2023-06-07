import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="new-avatar"
            btnText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input id="inputAvatar" name="link" className="popup__input popup__input_avatar_src"
                placeholder="Ссылка на аватар" type="url" ref={avatarRef} required />
            <span className="inputAvatar-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;