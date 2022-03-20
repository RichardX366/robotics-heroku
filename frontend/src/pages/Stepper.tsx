import React, { useState } from 'react';
import Layout from './Layout';
import Input from '../components/Input';
import { socket, globalStepperLoading } from '../socket';
import Notification, { error } from '../components/Notification';
import { useHookstate } from '@hookstate/core';

const StepperPage: React.FC = () => {
  const [steps, setSteps] = useState(0);
  const stepperLoading = useHookstate(globalStepperLoading);
  return (
    <Layout>
      <Notification />
      <Input
        value={steps}
        onChange={setSteps}
        type='number'
        integerOnly
        label='Step'
        onEnter={() => {
          if (stepperLoading.value)
            error('The stepper motor is currently running');
          else socket.emit('step', steps);
        }}
        loading={stepperLoading.value}
      />
    </Layout>
  );
};

export default StepperPage;
