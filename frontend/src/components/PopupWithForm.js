import React from "react";

function PopupWithForm({ isOpen, onClose, name, title, btnText, children, onSubmit }) {
    return (
        <div className={`popup popup_${name} ${isOpen ? "popup_opened" : " "}`}>

            <div className="popup__container">
                <button className="popup__btn-close" type="button" onClick={onClose}></button>
                <h3 className="popup__name">{`${title}`}</h3>
                <form className="form" name={`${name}_form`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__btn-submit">{`${btnText}`}</button>
                </form>
            </div>
        </div>

    )
}

export default PopupWithForm;