import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header.js';

const Register = ({ onRegister }) => {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/", { replace: true })
    }
  }, [navigate]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(formValue);
  }

  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__link">Регистрация</Link>
      </Header>
      <main className="page">
        <section className="auth">
          <div className="auth__container">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
              <input className="popup__input auth__input" type="email" name="email" placeholder="Email" minLength="2" autoComplete="off" value={formValue.email} onChange={handleChange} required />
              <span className="popup__input-error popup__input-error_active"></span>
              <input className="popup__input auth__input" type="password" name="password" placeholder="Пароль" minLength="2" autoComplete="off" value={formValue.password} onChange={handleChange} required />
              <span className="popup__input-error popup__input-error_active"></span>
              <button type="submit" className="popup__btn-submit popup__btn-submit_auth">
                Зарегистрироваться
              </button>
              <p className="auth__text">
                Уже зарегистрированы?{" "}
                <Link to="/sign-in" className="auth__text_link">
                  Войти
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );

}

export default Register;