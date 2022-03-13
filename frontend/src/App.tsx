import React from 'react';
import { useTest } from './socket';

const App: React.FC = () => {
  return <div className='text-green-500'>Hi there {useTest()}</div>;
};

export default App;
