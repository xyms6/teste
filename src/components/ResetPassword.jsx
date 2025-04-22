import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../services/api';
import logo from '../assets/Logo.png';

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-weight: 700;
  color: #1B1F3B;
  margin-bottom: 8px;
  font-size: 32px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #6c757d;
  margin-bottom: 32px;
  font-size: 16px;
  text-align: center;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
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
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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

const SuccessMessage = styled.div`
  color: #28a745;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

const BackButton = styled(Link)`
  display: block;
  text-align: center;
  color: #5E9DF5;
  text-decoration: none;
  margin-top: 16px;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Link inválido ou expirado');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    try {
      setLoading(true);
      await api.post('/auth/reset-password', {
        token,
        password
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao redefinir senha');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Container>
        <Card>
          <Title>Link Inválido</Title>
          <Subtitle>O link de redefinição de senha é inválido ou expirou.</Subtitle>
          <BackButton to="/login">Voltar para o login</BackButton>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>Redefinir Senha</Title>
        <Subtitle>Digite sua nova senha</Subtitle>
        
        {success ? (
          <SuccessMessage>
            Senha redefinida com sucesso! Você será redirecionado para a página de login.
          </SuccessMessage>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
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
                placeholder="Confirmar nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <EyeButton
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeButton>
            </InputWrapper>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Redefinindo...' : 'Redefinir Senha'}
            </Button>
          </form>
        )}
        
        <BackButton to="/login">Voltar para o login</BackButton>
      </Card>
    </Container>
  );
};

export default ResetPassword; 