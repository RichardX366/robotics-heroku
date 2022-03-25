import { useHookstate } from '@hookstate/core';
import React from 'react';
import StepperPage from './pages/Stepper';
import { globalConfiguration } from './socket';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import { Link } from 'react-router-dom';
import CNCModelPage from './pages/CNCModel';

const App: React.FC = () => {
  const configuration = useHookstate(globalConfiguration);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={(() => {
            switch (configuration.value) {
              case 'stepper':
                return <StepperPage />;
              default:
                return (
                  <Layout>
                    <div className='flex flex-col items-center gap-2 text-lg'>
                      <h1 className='text-3xl'>
                        There are currently no projects actively running
                      </h1>
                      Feel free to check in later or check out an offline
                      project at the top
                    </div>
                  </Layout>
                );
            }
          })()}
        />
        <Route path='/cncModel' element={<CNCModelPage />} />
        <Route
          path='*'
          element={
            <Layout>
              <div className='flex flex-col items-center gap-2 text-lg'>
                <h1 className='text-3xl'>
                  The page you are looking for does not exist
                </h1>
                <p>
                  Click{' '}
                  <Link to='/' className='underline'>
                    here
                  </Link>{' '}
                  to be redirected to the homepage
                </p>
              </div>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
