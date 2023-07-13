import React, { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const Spinner = () => {
  const { spinner } = useContext(ThemeContext);

  return (
    <>
      {spinner ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : null}
    </>
  );
};

export default Spinner;