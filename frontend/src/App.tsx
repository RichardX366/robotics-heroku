import { useHookstate } from '@hookstate/core';
import React from 'react';
import StepperPage from './pages/Stepper';
import { globalConfiguration } from './socket';

const App: React.FC = () => {
  const configuration = useHookstate(globalConfiguration);
  if (configuration.value === 'stepper') return <StepperPage />;
  else
    return (
      <main
        className='min-h-full bg-cover bg-center'
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
        }}
      >
        <div className='max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8 py-48'>
          <h1 className='mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl'>
            There are currently no robotics projects running.
          </h1>
          <h1 className='mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl'>
            Check again later!
          </h1>
        </div>
      </main>
    );
};

export default App;
