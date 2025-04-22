import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = ({ onSuccess, onError }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await api.post('/auth/google', {
          access_token: tokenResponse.access_token
        });
        
        const { user, token } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        
        if (onSuccess) {
          onSuccess(user);
        }
        
        navigate('/dashboard');
      } catch (error) {
        console.error('Erro no login com Google:', error);
        if (onError) {
          onError(error.response?.data?.message || 'Erro ao fazer login com Google');
        }
      }
    },
    onError: (error) => {
      console.error('Erro no login com Google:', error);
      if (onError) {
        onError('Erro ao fazer login com Google');
      }
    },
    flow: 'implicit',
    scope: 'email profile',
    prompt: 'consent'
  });

  return (
    <button
      onClick={() => login()}
      style={{
        width: '100%',
        height: '45px',
        backgroundColor: 'white',
        color: '#666',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'background-color 0.3s ease'
      }}
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        style={{ width: '20px', height: '20px' }}
      />
      Continuar com Google
    </button>
  );
};

export default GoogleLogin; 