"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
 


 const [data , setData] = useState([]);



  return (
    <ThemeContext.Provider value={{ setData , data}}>
     <div>{children}</div>
    </ThemeContext.Provider>
  );
};