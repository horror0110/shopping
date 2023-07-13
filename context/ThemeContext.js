"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
 


 const [data , setData] = useState([]);
 const [openSuccess , setOpenSuccess] = useState(false);
 const [shadow , setShadow] = useState(false);
 const [spinner , setSpinner] = useState(false);
  
 const [addCart, setAddcard] = useState(false);

 const handleAddToCart = () => {
  setAddcard(true);
  setShadow(true);
 
 };

 const closeAddcard =()=>{
  setAddcard(false);
  setShadow(false);
 }


 const closeSuccess = ()=> {
  setOpenSuccess(false)
  setShadow(false);
}

const openSuccessModal = ()=> {
  setOpenSuccess(true);
  setShadow(true);
}



  return (
    <ThemeContext.Provider value={{ setData , data , openSuccessModal ,openSuccess, closeSuccess , shadow , spinner , setSpinner , addCart , handleAddToCart , closeAddcard}}>
     <div>{children}</div>
    </ThemeContext.Provider>
  );
};