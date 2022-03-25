import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import React, { ReactNode } from 'react';
import { useState } from 'react';
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
      onClick,
    }: {
      to: string;
      children: ReactNode;
      className?: string;
      onClick?: () => any;
    }) => (
      <a href={to} className={className} onClick={onClick}>
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
  const [showLinks, setShowLinks] = useState(false);
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
        <div className='hidden sm:flex gap-4 justify-end items-center mr-4 text-xl'>
          {links.map(({ component: Component, title, to }) => (
            <Component to={to} className='hover:text-gray-200' key={title}>
              {title}
            </Component>
          ))}
        </div>
        <div className='flex items-center mr-4 sm:hidden'>
          <MenuIcon
            className='text-white h-6'
            onClick={() => setShowLinks(true)}
          />
        </div>
      </div>
      <div className='bg-gradient-to-br from-cyan-500 to-blue-500 h-full overflow-y-scroll py-12 sm:py-24 px-12 sm:px-32'>
        <div className='mt-16 bg-white p-5 rounded-lg flex flex-col gap-4'>
          {children}
        </div>
      </div>
      <Transition.Root show={showLinks} as={React.Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 overflow-hidden'
          onClose={setShowLinks}
        >
          <div className='absolute inset-0 overflow-hidden'>
            <Dialog.Overlay className='absolute inset-0' />

            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={React.Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <div className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                    <div className='px-4 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          Links
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
                            onClick={() => setShowLinks(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 sm:px-6 flex flex-col underline'>
                      {links.map(({ component: Component, title, to }) => (
                        <Component
                          to={to}
                          className='hover:text-gray-200'
                          key={title}
                          onClick={() => setShowLinks(false)}
                        >
                          {title}
                        </Component>
                      ))}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Layout;
