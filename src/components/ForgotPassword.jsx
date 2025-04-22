import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #5E9DF5, #4A85E0);
  border-radius: 50%;
  margin: 0 auto 24px;
  
  svg {
    color: white;
    font-size: 32px;
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 0;
`;

const SuccessIcon = styled(FaCheckCircle)`
  color: #28a745;
  font-size: 64px;
  margin-bottom: 24px;
  animation: scaleIn 0.5s ease-out;
  
  @keyframes scaleIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const SuccessTitle = styled.h2`
  color: #28a745;
  font-size: 28px;
  margin-bottom: 16px;
  font-weight: 600;
`;

const SuccessSubtitle = styled.p`
  color: #6c757d;
  font-size: 16px;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.5;
`;

const EmailIcon = styled(FaEnvelope)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: white;
  transition: all 0.3s ease;
  padding: 0 12px 0 40px;
  color: #333;
  
  &:focus {
    border-color: #5E9DF5;
    box-shadow: 0 0 5px rgba(94, 157, 245, 0.5);
    outline: none;
  }
  
  &::placeholder {
    color: #6c757d;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  background: linear-gradient(135deg, #5E9DF5, #4A85E0);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(94, 157, 245, 0.3);
  }
  
  &:active {
    transform: translateY(0);
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

const ImagemLogin = styled.img`
  max-width: 90%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #28a745;
  font-size: 16px;
  margin-bottom: 20px;
`;

const RegisterText = styled.p`
  color: #6c757d;
  font-size: 14px;
  text-align: center;
  margin-top: 16px;
  
  a {
    color: #5E9DF5;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Ocorreu um erro ao enviar o email. Tente novamente.');
    } finally {
      setLoading(false);
    }
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
              <FaArrowLeft /> Voltar
            </BackButton>
            
            {!success ? (
              <>
                <IconWrapper>
                  <FaEnvelope />
                </IconWrapper>
                <Title>Esqueceu sua senha?</Title>
                <Subtitle>Digite seu email para receber instruções de recuperação.</Subtitle>
                
                {error && <ErrorMessage>{error}</ErrorMessage>}
                
                <InputWrapper>
                  <EmailIcon />
                  <Input
                    type="email"
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    disabled={loading}
                  />
                </InputWrapper>
                
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <FaEnvelope />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FaEnvelope />
                      Enviar instruções
                    </>
                  )}
                </Button>
              </>
            ) : (
              <SuccessContainer>
                <SuccessIcon />
                <SuccessTitle>Email enviado!</SuccessTitle>
                <SuccessSubtitle>
                  As instruções de recuperação de senha foram enviadas para seu email.
                  Por favor, verifique sua caixa de entrada e clique no link para redefinir sua senha.
                </SuccessSubtitle>
                <Button as={Link} to="/login">
                  Voltar para o login
                </Button>
              </SuccessContainer>
            )}
            
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

export default ForgotPassword; 