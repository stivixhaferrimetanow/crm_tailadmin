'use client'

import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const MyContextProvider = ({ children }) => {
  const [value, setValue] = useState('test');
  const [newProdcution , setNewProduction] = useState(false)



  return (
    <MyContext.Provider value={{ value, setValue, newProdcution, setNewProduction }}>
    {children}
    </MyContext.Provider>
  );
};

export default MyContext;