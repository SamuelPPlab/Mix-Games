import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { emailValidator, passwordLengthValidator } from '../services/validators';

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
  }, [email, passwordInput]);

  const emailInputProps = {
    id: "mix-email",
    name: "Email",
    fieldValue: email,
    setFieldValue: setEmail,
    type: "email",
  };

  const passwordInputProps = {
    id: "mix-password",
    name: "Password",
    fieldValue: passwordInput,
    setFieldValue: setPasswordInput,
    type: "password",
  };

  const loginButtonProps = {
    name: "Entrar",
    id: "mix-submitLogin",
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
    <div>
      <Input {...emailInputProps} />
      {(!emailValidator(email) && email !== '') && emailWarning}
      <Input {...passwordInputProps} />
      {(!passwordLengthValidator(passwordInput) && passwordInput !== '') && passwordLengthWarning}
      {notRegistered && notRegisteredWarning}
      <Button {...loginButtonProps} />
      {noAccount}
    </div>
  );
};

export default Login;