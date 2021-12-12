import React, { useState } from "react";
import Input from '../components/Input';
import { Link } from "react-router-dom";
import Button from '../components/Button';
import { emailValidator, passwordLengthValidator, passwordMatcher, validateUserName } from "../services/validators";

const SignUp = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [goToMain, setGoToMain] = useState(false);
  const [disableSignUp, setDisableSignUp] = useState(true);

  const nameProps = {
    id: 'nomeCompleto',
    name: 'Nome Completo',
    fieldValue: fullName,
    setFieldValue: setFullName,
  };

  const emailProps = {
    id: "email",
    name: "Email",
    fieldValue: email,
    setFieldValue: setEmail,
    type: "email",
  };

  const passwordInputProps = {
    id: "Senha",
    name: "Senha",
    fieldValue: passwordInput,
    setFieldValue: setPasswordInput,
    type: "password",
  };

  const confirmPasswordProps = {
    id: "ConfirmarSenha",
    name: "Confirmar Senha",
    fieldValue: confirmPassword,
    setFieldValue: setConfirmPassword,
    type: "password",
  };

  const signUpButtonProps = {
    id: "Cadastrar",
    name: "Cadastrar",
    onClick: () => {
      userRegistration(fullName, passwordInput, email);
      setGoToMain(true);
    },
    disabled: disableSignUp,
    className: disableSignUp ? 'submitLoginDisabled' : 'submitLoginEnabled',
  };

  const alreadySingnedUp = <pre className="noAccount">
    Já possui um cadastro? <Link to="/">Login</Link>
  </pre>;

  const nameWarning = <div className="warningText warningPadding">
  O nome deve conter apenas letras!
  </div>;

  const emailWarning = <div className="warningText warningPadding">
  O email deve ter o formato correto.
  </div>;

  const passwordLengthWarning = <div className="warningText warningPadding">
  A senha deve ter pelo menos oito caracteres.
  </div>;

  const differentPasswordsWarning = <div className="warningText warningPadding">
  As senhas devem ser iguais.
  </div>;

  return(
    <div>
      <h1 className="welcomeText">Cadastre-se</h1>
      <Input {...nameProps} />
      {(!validateUserName(fullName) && fullName !== '') && nameWarning}
      <Input {...emailProps} />
      {(!emailValidator(email) && email !== '') && emailWarning}
      <Input {...passwordInputProps} />
      {(!passwordLengthValidator(passwordInput) && passwordInput !== '') && passwordLengthWarning}
      <Input {...confirmPasswordProps} />
      {!passwordMatcher(passwordInput, confirmPassword) && differentPasswordsWarning}
      <div>{alreadySingnedUp}</div>
      <Button {...signUpButtonProps} />
    </div>
  )
};

export default SignUp;
