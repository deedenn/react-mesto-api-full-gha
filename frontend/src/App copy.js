import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <body className="root">
        <Header />
        <main className="main">


          <section className="profile">
            <div className="profile__container">
              <button className="profile__avatar-btn" type="button"></button>
              <img className="profile__avatar" src="<%=require('./images/avatar.jpg')%>" alt="Аватар" />
              <div className="profile__info">
                <div className="profile__wrap">
                  <h1 className="profile__name">Жак-Ив Кусто</h1>
                  <button className="profile__edit-btn" type="button"></button>
                </div>
                <p className="profile__description">Исследователь океана</p>
              </div>
            </div>
            <button className="profile__add-btn" type="button"></button>
          </section>

          <div className="elements">
          </div>

          <footer className="footer">
            <p className="footer__text" lang="en">&copy; 2020 Mesto Russia</p>
          </footer>
        </main>

        <div className="popup popup_edit">
          <div className="popup__container">
            <button className="popup__btn-close" type="button"></button>
            <h3 className="popup__name">Редактировать профиль</h3>
            <form className="form form_edit" name="edit_form" novalidate>
              <input type="text" id="inputName" name="name" value=""
                className="popup__input popup__input_el_name" minlength="2" maxlength="40" required />
              <span className="inputName-error popup__input-error"></span>
              <input type="text" id="inputDescription" name="about" value=""
                className="popup__input popup__input_el_description" required minlength="2" maxlength="200" />
              <span className="inputDescription-error popup__input-error"></span>
              <button type="submit" className="popup__btn-submit">Сохранить</button>
            </form>
          </div>
        </div>

        <div className="popup popup_add">
          <div className="popup__container">
            <button className="popup__btn-close" type="button"></button>
            <h3 className="popup__name">Новое место</h3>
            <form className="form form_add" name="add_form" novalidate>
              <input type="text" id="inputTitle" name="name" className="popup__input popup__input_el_title"
                placeholder="Название" minlength="2" maxlength="30" required />
              <span className="inputTitle-error popup__input-error"></span>
              <input type="url" id="inputLink" name="link" className="popup__input popup__input_el_link"
                placeholder="Ссылка на картинку" required />
              <span className="inputLink-error popup__input-error"></span>
              <button type="submit" className="popup__btn-submit">Создать</button>
            </form>
          </div>
        </div>

        <div className="popup popup_showimg">
          <div className="big-popup">
            <button className="popup__btn-close" type="button"></button>
            <div className="big-popup__container">
              <img className="big-popup__image" />
              <h2 className="big-popup__name"></h2>
            </div>
          </div>
        </div>

        <div className="popup popup_submit">
          <div className="popup__container popup__container_submit">
            <button className="popup__btn-close" type="button"></button>
            <h3 className="popup__name">Вы уверены?</h3>
            <form className="form form_submit">
              <button type="submit" className="popup__btn-submit popup__btn-submit_yes">Да</button>
            </form>
          </div>
        </div>

        <div className="popup popup_new-avatar">
          <div className="popup__container popup__container_new-avatar">
            <button className="popup__btn-close" type="button"></button>
            <h3 className="popup__name">Обновить аватар</h3>
            <form className="form form_new-avatar" name="avatar-data" novalidate>
              <input id="inputAvatar" name="link" className="popup__input popup__input_avatar_src"
                placeholder="Ссылка на аватар" type="url" required />
              <span className="inputAvatar-error popup__input-error"></span>
              <button type="submit" className="popup__btn-submit popup__btn-submit_new-avatar" disabled>Сохранить</button>
            </form>
          </div>
        </div>

        <template id="element-template">
          <article className="element">
            <img className="element__image" src=" " alt=" " />
            <button className="element__btn-del" type="button"></button>
            <div className="element__description">
              <h2 className="element__name"></h2>
              <div className="element__likes">
                <button className="element__btn-like" type="button"></button>
                <p className="element__like_counter">0</p>
              </div>
            </div>
          </article>
        </template>

      </body>
    </div>
  );
}

export default App;
