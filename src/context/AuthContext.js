import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [funcionario, setFuncionario] = useState(JSON.parse(localStorage.getItem('funcionario')) || null);

  const login = (funcionario) => {
    setFuncionario(funcionario);
  };

  const logout = () => {
    setFuncionario(null);
  };

  return (
    <AuthContext.Provider value={{ funcionario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
