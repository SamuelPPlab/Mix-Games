import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { emailValidator, passwordLengthValidator } from '../services/validators';
import LoginImage from '../images/LoginImage.jpg';
import '../css/styles.css';
import { login } from '../apiIntegration/api';

const Login = () => {

  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [notRegistered, setNotRegistered] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const isEmailValid = emailValidator(email);
    const isPasswordValid = passwordLengthValidator(passwordInput);
    if(isEmailValid && isPasswordValid) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  }, [email, passwordInput]);

  useEffect(() => {
    if (response.token) {
      localStorage.setItem('mixToken', JSON.stringify(response.token));
      return setRedirect(true);
    }

    if (response.message) {
      return setNotRegistered(true);
    }
  }, [response]);

  const emailInputProps = {
    id: "mix-email",
    name: 'Email:',
    placeholder: "Digite seu e-mail",
    fieldValue: email,
    setFieldValue: setEmail,
    type: "email",
    placeholderClass: email === '' ? 'placeholderSpan' : 'placeholderSpanFocus loginPlaceholder',
  };

  const passwordInputProps = {
    id: "mix-password",
    name: 'Senha:',
    placeholder: "Digite sua senha",
    fieldValue: passwordInput,
    setFieldValue: setPasswordInput,
    type: "password",
    placeholderClass: passwordInput === '' ? 'placeholderSpan' : 'placeholderSpanFocus loginPlaceholder',
  };

  const loginButtonProps = {
    name: "Entrar",
    id: "mix-submit-login",
    onClick: () => {
      login(email, passwordInput).then((r) => setResponse(r));
    },
    disabled:  isDisabled,
    className: 'mix-left-form-submit',
  };

  const emailWarning = <div className="warningText">O email deve ter o formato correto.</div>;
  const passwordLengthWarning = <div className="warningText">A senha deve ter pelo menos oito caracteres.</div>;
  const notRegisteredWarning = <div className="warningText">Usuário não registrado ou senha inválida!</div>;
  const noAccount = <pre id="loginNav" className="nav-link">
    Ainda não possui cadastro? <Link to="/signup">Cadastre-se</Link>
  </pre>;

  if(redirect) return <Navigate to="/main" />;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <img className="backgroundImage" src={LoginImage} alt="Background" />
      <div id='login-form-container'>
        <h1 id="welcome">Mix Games</h1>
        <div className='loginInputContainer loginInput'>
          <Input {...emailInputProps} />
          {(!emailValidator(email) && email !== '') && emailWarning}
        </div>
        <div className='loginInputContainer loginInput'>
          <Input {...passwordInputProps} />
          {(!passwordLengthValidator(passwordInput) && passwordInput !== '') && passwordLengthWarning}
        </div>
        {notRegistered && notRegisteredWarning}
        <Button {...loginButtonProps} />
        {noAccount}
      </div>
    </div>
  );
};

export default Login;