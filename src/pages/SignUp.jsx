import React, { useEffect, useState } from "react";
import Input from '../components/Input';
import { Link, Navigate } from "react-router-dom";
import Button from '../components/Button';
import { emailValidator, passwordLengthValidator, passwordMatcher, validateUserName } from "../services/validators";

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
  };

  const emailProps = {
    id: "mix-email-signup",
    name: "Email",
    fieldValue: email,
    setFieldValue: setEmail,
    type: "email",
  };

  const passwordInputProps = {
    id: "mix-senha",
    name: "Senha",
    fieldValue: passwordInput,
    setFieldValue: setPasswordInput,
    type: "password",
  };

  const confirmPasswordProps = {
    id: "mix-confirmar-senha",
    name: "Confirmar Senha",
    fieldValue: confirmPassword,
    setFieldValue: setConfirmPassword,
    type: "password",
  };

  const signUpButtonProps = {
    id: "mix-cadastrar",
    name: "Cadastrar",
    onClick: () => {
      setGoToMain(true);
    },
    disabled: disableSignUp,
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

  if(goToMain) return <Navigate to="/main" />;

  return(
    <div>
      <h1>Cadastre-se</h1>
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
