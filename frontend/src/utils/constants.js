// конфигурация для валидации

export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-submit',
    deactiveButtonClass: 'popup__btn-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    spanErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
};

export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const profileAddBtn = document.querySelector('.profile__add-btn');
export const profileAvatarBtn = document.querySelector('.profile__avatar-btn');
export const elementBtnDel = document.querySelector('.element__btn-del');
export const formEditElement = document.querySelector('.form_edit');
export const formAddElement = document.querySelector('.form_add');
export const formAvatarElement = document.querySelector('.form_new-avatar');
export const cradsContainer = document.querySelector(".elements");