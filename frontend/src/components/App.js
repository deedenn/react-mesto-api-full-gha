import '../index.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';
import Login from './Login';
import Register from './Register';
import { auth } from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [infoMessage, setInfoMessage] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    isLoggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
  }, [isLoggedIn]);

  const handleCardClick = (card) => {
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const onRegister = ({ email, password }) => {
    auth
      .register({ email, password })
      .then((res) => {
        handleShowInfoMessage({
          text: "Вы успешно зарегистрировались!",
          isSuccess: true,
        });
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        handleShowInfoMessage({
          text: err.message || "Что-то пошло не так! Попробуйте еще раз.",
          isSuccess: false,
        });
      });
  };

  const onLogin = ({ email, password }) => {
    auth
      .authorization({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          handleLogin();
          navigate("/", { replace: true });
        } 
      })
      .catch((err) => {
        handleShowInfoMessage({
          text: err.message || "Что-то пошло не так! Попробуйте еще раз.",
          isSuccess: false,
        });
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id));
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(userData) {
    api
      .editProfileInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  }

  function handleUpdateAvatar(userData) {
    api
      .changeAvatar(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardPopupOpen(false);
    setInfoMessage(null);
    setSelectedCard({ name: '', link: '' })
  };

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  function handleShowInfoMessage(message) {
    setInfoMessage(message);
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .getContent()
        .then((res) => {
          setEmail(res.email);
          navigate("/", { replace: true });
          handleLogin();
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Header title="Выйти" email={email} onLogout={handleLogout} />
                  <Main
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onLogout={handleLogout}
                    email={email}
                  />
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route path="/sign-in" element={<Login onLogin={onLogin} handleShowInfoMessage={handleShowInfoMessage} email={email} />} />
            <Route path="/sign-up" element={<Register onRegister={onRegister} handleShowInfoMessage={handleShowInfoMessage} />} />
            <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
          </Routes>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm
            title="Вы уверены?"
            name="submit"
            btnText="Да"
          >
          </PopupWithForm>
          <ImagePopup
            isOpen={isCardPopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <InfoToolTip
            message={infoMessage}
            onClose={closeAllPopups}
          />
        </div>

      </CurrentUserContext.Provider >
    </div >
  );
}

export default App;