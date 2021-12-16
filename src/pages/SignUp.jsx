import React, { useEffect, useState } from "react";
import Input from '../components/Input';
import { Link, Navigate } from "react-router-dom";
import Button from '../components/Button';
import { emailValidator, passwordLengthValidator, passwordMatcher, validateUserName } from "../services/validators";
import SignupImage from '../images/SignupImage.jpg';
import '../css/styles.css';
import { postUser } from "../apiIntegration/api";

const SignUp = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [goToMain, setGoToMain] = useState(false);
  const [disableSignUp, setDisableSignUp] = useState(true);

  useEffect(() => {
    const isUsernameValid = validateUserName(fullName);
    const isEmailValid = emailValidator(email);
    const isPasswordValid = passwordLengthValidator(passwordInput);
    const doPasswordsMatch = passwordMatcher(passwordInput, confirmPassword);
    if(isEmailValid && isUsernameValid && isPasswordValid && doPasswordsMatch) {
      return setDisableSignUp(false);
    }
    setDisableSignUp(true);
  }, [fullName, email, passwordInput, confirmPassword]);


  const nameProps = {
    id: 'mix-nome-completo-signup',
    name: 'Nome Completo',
    fieldValue: fullName,
    setFieldValue: setFullName,
    placeholder: 'Qual seu nome?',
    placeholderClass: fullName === '' ? 'placeholderSpan' : 'placeholderSpanFocus  signupPlaceholder',
  };

  const emailProps = {
    id: "mix-email-signup",
    name: "Email",
    fieldValue: email,
    setFieldValue: setEmail,
    type: "email",
    placeholder: 'Digite seu email',
    placeholderClass: email === '' ? 'placeholderSpan' : 'placeholderSpanFocus signupPlaceholder',
  };

  const passwordInputProps = {
    id: "mix-senha",
    name: "Senha",
    fieldValue: passwordInput,
    setFieldValue: setPasswordInput,
    type: "password",
    placeholder: 'Escolha sua senha',
    placeholderClass: passwordInput === '' ? 'placeholderSpan' : 'placeholderSpanFocus signupPlaceholder',
  };

  const confirmPasswordProps = {
    id: "mix-confirmar-senha",
    name: "Confirmar Senha",
    fieldValue: confirmPassword,
    setFieldValue: setConfirmPassword,
    type: "password",
    placeholder: 'Confirme sua senha',
    placeholderClass: confirmPassword === '' ? 'placeholderSpan' : 'placeholderSpanFocus signupPlaceholder',
  };

  const signUpButtonProps = {
    id: "mix-cadastrar",
    name: "Cadastrar",
    onClick: () => {
      postUser(fullName, email, passwordInput);
    },
    disabled: disableSignUp,
    className: 'mix-left-form-submit',
  };

  const alreadySingnedUp = <pre id="navsignup" className="nav-link">
    Já possui um cadastro? <Link to="/">Login</Link>
  </pre>;

  const nameWarning = <div className="warningText">
  O nome deve conter apenas letras!
  </div>;

  const emailWarning = <div className="warningText">
  O email deve ter o formato correto.
  </div>;

  const passwordLengthWarning = <div className="warningText">
  A senha deve ter pelo menos oito caracteres.
  </div>;

  const differentPasswordsWarning = <div className="warningText">
  As senhas devem ser iguais.
  </div>;

  if(goToMain) return <Navigate to="/main" />;

  return(
    <div style={{ width: '100vw', height: '100vh' }}>
      <img className="backgroundImage" src={SignupImage} alt="Background" />
      <div className="leftSideForm">
        <h1 id="signup-title">Crie sua conta</h1>
        <div className="halfScreenWidth">
          <Input {...nameProps} />
          {(!validateUserName(fullName) && fullName !== '') && nameWarning}
        </div>
        <div className="halfScreenWidth">
          <Input {...emailProps} />
          {(!emailValidator(email) && email !== '') && emailWarning}
        </div>
        <div className="halfScreenWidth">
          <Input {...passwordInputProps} />
          {(!passwordLengthValidator(passwordInput) && passwordInput !== '') && passwordLengthWarning}
        </div>
        <div className="halfScreenWidth">
          <Input {...confirmPasswordProps} />
          {!passwordMatcher(passwordInput, confirmPassword) && differentPasswordsWarning}
        </div>
        <div>{alreadySingnedUp}</div>
        <Button {...signUpButtonProps} />
      </div>
    </div>
  )
};

export default SignUp;
