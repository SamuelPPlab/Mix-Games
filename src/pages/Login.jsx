import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { emailValidator, passwordLengthValidator } from '../services/validators';
import LoginImage from '../images/LoginImage.jpg';
import '../css/styles.css';

const Login = () => {

  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [notRegistered, setNotRegistered] = useState(false);

  useEffect(() => {
    const isEmailValid = emailValidator(email);
    const isPasswordValid = passwordLengthValidator(passwordInput);
    if(isEmailValid && isPasswordValid) {
      setIsDisabled(false);
    }
    setIsDisabled(true);
  }, [email, passwordInput]);


  const emailInputProps = {
    id: "mix-email",
    name: 'Email:',
    placeholder: "Digite seu e-mail",
    fieldValue: email,
    setFieldValue: setEmail,
    type: "email",
  };

  const passwordInputProps = {
    id: "mix-password",
    name: 'Senha:',
    placeholder: "Digite sua senha",
    fieldValue: passwordInput,
    setFieldValue: setPasswordInput,
    type: "password",
  };

  const loginButtonProps = {
    name: "Entrar",
    id: "mix-submit-login",
    onClick: () => {
      return setRedirect(true);
    },
    disabled:  isDisabled,
  };

  const emailWarning = <div className="warningText">O email deve ter o formato correto.</div>;
  const passwordLengthWarning = <div className="warningText">A senha deve ter pelo menos oito caracteres.</div>;
  const notRegisteredWarning = <div className="warningText">Usuário não registrado ou senha inválida!</div>;
  const noAccount = <pre className="noAccount">Ainda não possui cadastro? <Link to="/signup">Cadastre-se</Link></pre>;

  if(redirect) return <Navigate to="/main" />;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <img id="loginImage" src={LoginImage} alt="Prophet do Crysis 2" />
      <div style={{ display: 'flex', flexDirection: 'column', width: '50vw', justifyContent: 'space-around', background: 'transparent', height: '100vh', marginLeft: '42vw', position: 'absolute' }}>
        <h1 id="welcome">Mix Games</h1>
        <div className='loginInputContainer'>
          <Input {...emailInputProps} />
          {(!emailValidator(email) && email !== '') && emailWarning}
        </div>
        <div className='loginInputContainer'>
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