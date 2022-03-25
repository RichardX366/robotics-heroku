import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/logo.png';
import Notification from '../components/Notification';

const links = [
  {
    to: 'https://github.com/RichardX366',
    component: ({
      to,
      children,
      className,
    }: {
      to: string;
      children: ReactNode;
      className?: string;
    }) => (
      <a href={to} className={className}>
        {children}
      </a>
    ),
    title: 'Github',
  },
  {
    to: '/cncModel',
    component: Link,
    title: 'Cardboard CNC Modeling',
  },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Notification />
      <div className='w-full absolute top-0 inset-x-0 bg-gray-800 text-white h-16 flex justify-between'>
        <Link to='/'>
          <div className='flex items-center text-2xl'>
            <img src={logo} className='h-12 m-2' alt='logo' />
            RX Robotics
          </div>
        </Link>
        <div className='flex gap-4 justify-end items-center mr-4 text-xl'>
          {links.map(({ component: Component, title, to }) => (
            <Component to={to} className='hover:text-gray-200' key={title}>
              {title}
            </Component>
          ))}
        </div>
      </div>
      <div className='bg-gradient-to-br from-cyan-500 to-blue-500 h-full py-12 sm:py-24 px-12 sm:px-32'>
        <div className='mt-16 bg-white p-5 rounded-lg flex flex-col gap-4'>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
