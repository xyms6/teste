import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import GoogleLogin from './GoogleLogin';
import logo from '../assets/Logo.png';
import loginImage from '../assets/imagem login.png';

const TelaLogin = styled.div`
  width: 100%;
  max-width: 900px;
`;

const ModalWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
`;

const LoginContainer = styled.div`
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  min-height: 550px;
  max-height: 80vh;
  
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
    max-height: none;
  }
`;

const FormularioLogin = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  width: 50%;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 30px;
  }
  
  @media (max-width: 576px) {
    padding: 20px;
  }
`;

const ImagemContainer = styled.div`
  background: linear-gradient(180deg, #D7ECFF, #A8D8FF);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 50%;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
  
  img {
    max-width: 120px;
    height: auto;
  }
  
  @media (max-width: 576px) {
    top: 10px;
    right: 10px;
    
    img {
      max-width: 100px;
    }
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: #1B1F3B;
  margin-bottom: 8px;
  font-size: 32px;
  
  @media (max-width: 576px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  color: #6c757d;
  margin-bottom: 32px;
  font-size: 16px;
  
  @media (max-width: 576px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  
  @media (max-width: 576px) {
    margin-bottom: 16px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: white;
  transition: border-color 0.3s ease;
  padding: 0 40px 0 12px;
  color: #333;
  
  &:focus {
    border-color: #5E9DF5;
    box-shadow: 0 0 5px rgba(94, 157, 245, 0.5);
    outline: none;
  }

  &.is-invalid {
    border-color: #dc3545;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: #5E9DF5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 16px;
  
  &:hover {
    background-color: #4A85E0;
  }
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #6c757d;
  margin-bottom: 32px;
  font-size: 14px;
  
  &:hover {
    color: #5E9DF5;
  }
`;

const ForgotPassword = styled(Link)`
  color: #5E9DF5;
  text-decoration: none;
  text-align: right;
  display: block;
  margin: -8px 0 16px;
  font-size: 14px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #4A85E0;
    text-decoration: underline;
  }
`;

const OrText = styled.div`
  text-align: center;
  color: #6c757d;
  margin: 16px 0;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #ddd;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const RegisterText = styled.div`
  text-align: center;
  margin-top: 16px;
  color: #6c757d;
  font-size: 14px;
  
  a {
    color: #5E9DF5;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: #4A85E0;
    }
  }
`;

const ImagemLogin = styled.img`
  max-width: 90%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const EyeButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 8px;
  opacity: 0.7;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #333;
  
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

const ValidationMessage = styled.div`
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ValidationIcon = styled.span`
  color: #ff4d4f;
  font-size: 14px;
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Email ou senha inválidos');
      }
    } catch (err) {
      setError('Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (user) => {
    console.log('Login com Google realizado com sucesso:', user);
  };

  const handleGoogleError = (error) => {
    setError(error);
  };

  return (
    <TelaLogin>
      <ModalWrapper>
        <Logo>
          <img src={logo} alt="SENAI" />
        </Logo>
        <LoginContainer>
          <FormularioLogin onSubmit={handleSubmit}>
            <BackButton to="/">← Voltar</BackButton>
            <Title>Bem vindo(a)!</Title>
            <Subtitle>Por favor, insira seus dados.</Subtitle>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <InputWrapper>
              <Input
                type="email"
                placeholder="Email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                disabled={isLoading}
              />
            </InputWrapper>
            
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                disabled={isLoading}
              />
              <EyeButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeButton>
            </InputWrapper>
            
            <ForgotPassword to="/forgot-password">Esqueceu a senha?</ForgotPassword>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
            
            <OrText>Ou continue com</OrText>
            
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
            
            <RegisterText>
              Não possui uma conta? <Link to="/register">Cadastre-se</Link>
            </RegisterText>
          </FormularioLogin>
          
          <ImagemContainer>
            <ImagemLogin src={loginImage} alt="Decorative" />
          </ImagemContainer>
        </LoginContainer>
      </ModalWrapper>
    </TelaLogin>
  );
};

export default Login; 