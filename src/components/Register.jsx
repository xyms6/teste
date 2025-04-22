import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
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

const FormularioLogin = styled.form`
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

const LoginText = styled.div`
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

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasSpecialChar,
      errors: {
        minLength: !hasMinLength,
        upperCase: !hasUpperCase,
        lowerCase: !hasLowerCase,
        specialChar: !hasSpecialChar
      }
    };
  };

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

    if (!formData.name) {
      setError('Por favor, insira seu nome');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      const errors = [];
      if (passwordValidation.errors.minLength) errors.push('mínimo 8 caracteres');
      if (passwordValidation.errors.upperCase) errors.push('uma letra maiúscula');
      if (passwordValidation.errors.lowerCase) errors.push('uma letra minúscula');
      if (passwordValidation.errors.specialChar) errors.push('um caractere especial');
      setError(`A senha deve conter: ${errors.join(', ')}`);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Iniciando cadastro com os dados:', {
        name: formData.name,
        email: formData.email,
        password: '***'
      });

      const result = await register(formData.name, formData.email, formData.password);
      console.log('Resultado do cadastro:', result);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Erro ao cadastrar');
      }
    } catch (err) {
      console.error('Erro detalhado no cadastro:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || 'Ocorreu um erro ao cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (user) => {
    try {
      setIsLoading(true);
      const result = await register(user.name, user.email, null, true);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Erro ao cadastrar com Google');
      }
    } catch (err) {
      console.error('Erro no cadastro com Google:', err);
      setError(err.response?.data?.message || 'Ocorreu um erro ao cadastrar com Google. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Erro no Google:', error);
    setError('Erro ao tentar cadastrar com Google. Tente novamente.');
  };

  return (
    <TelaLogin>
      <ModalWrapper>
        <Logo>
          <img src={logo} alt="SENAI" />
        </Logo>
        <LoginContainer>
          <FormularioLogin onSubmit={handleSubmit}>
            <BackButton to="/login">
              <FaArrowLeft style={{ marginRight: '8px' }} />
              Voltar para o login
            </BackButton>
            <Title>Criar conta</Title>
            <Subtitle>Por favor, preencha seus dados.</Subtitle>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <InputWrapper>
              <Input
                type="text"
                placeholder="Nome completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </InputWrapper>
            
            <InputWrapper>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                required
                disabled={isLoading}
              />
              <EyeButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeButton>
            </InputWrapper>
            
            <InputWrapper>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar senha"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <EyeButton
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeButton>
            </InputWrapper>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
            
            <OrText>Ou continue com</OrText>
            
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
            
            <LoginText>
              Já possui uma conta? <Link to="/login">Faça login</Link>
            </LoginText>
          </FormularioLogin>
          
          <ImagemContainer>
            <ImagemLogin src={loginImage} alt="Decorative" />
          </ImagemContainer>
        </LoginContainer>
      </ModalWrapper>
    </TelaLogin>
  );
};

export default Register;