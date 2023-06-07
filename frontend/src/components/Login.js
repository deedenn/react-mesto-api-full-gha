import React from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [formValue, setFormValue] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(formValue);
    };

    return (
        <>
            <Header>
                <Link to="/sign-in" className="header__link">Войти</Link>
            </Header>
            <main className="content">
                <section className="auth">
                    <div className="auth__container">
                        <h2 className="auth__title">Вход</h2>
                        <form className="auth__form" onSubmit={handleSubmit}>
                            <input className="popup__input auth__input" type="email" name="email" placeholder="Email" minLength="2" autoComplete="off" value={formValue.email} onChange={handleChange} required />
                            <span className="popup__input-error popup__input-error_active"></span>
                            <input className="popup__input auth__input" type="password" name="password" placeholder="Пароль" minLength="2" autoComplete="off" value={formValue.password} onChange={handleChange} required />
                            <span className="popup__input-error popup__input-error_active"></span>
                            <button type="submit" className="popup__btn-submit popup__btn-submit_auth">
                                Войти
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )

};

export default Login;