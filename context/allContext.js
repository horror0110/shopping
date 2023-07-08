"use client";

import { createContext, useState } from "react";

export const allContext = createContext();

export const allProvider = ({ children }) => {
  return (
    <allContext.Provider>
      <div>{children}</div>
    </allContext.Provider>
  );
};
