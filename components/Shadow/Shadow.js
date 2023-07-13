import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";

const Shadow = () => {

    const {shadow} = useContext(ThemeContext);
  return (shadow ? <div className="fixed inset-0 bg-black opacity-50 z-40"></div> : null);
};

export default Shadow;