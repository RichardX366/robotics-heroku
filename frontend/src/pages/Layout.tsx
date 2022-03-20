import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='bg-gradient-to-br from-cyan-500 to-blue-500 h-full py-12 sm:py-24 px-12 sm:px-32'>
      <div className='bg-white p-5 rounded-lg'>{children}</div>
    </div>
  );
};

export default Layout;
