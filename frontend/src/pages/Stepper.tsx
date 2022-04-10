import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { socket } from '../socket';
import { globalStepperLoading, globalPins } from '../socket/stepper';
import { error } from '../components/Notification';
import { useHookstate } from '@hookstate/core';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const StepperPage: React.FC = () => {
  const [steps, setSteps] = useState(0);
  const pins = useHookstate(globalPins);
  const stepperLoading = useHookstate(globalStepperLoading);
  const {
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript,
    listening,
    transcript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript) {
      console.log(finalTranscript);
      const steps = parseInt(
        finalTranscript.replaceAll('thousand', '000').replaceAll(' ', ''),
      );
      if (isFinite(steps)) {
        socket.emit('step', steps);
      }
      resetTranscript();
    }
  }, [finalTranscript, resetTranscript]);
  return (
    <>
      <Input
        value={pins.value}
        onChange={pins.set}
        label='Pins'
        description='Swap the first and last pins'
        onEnter={() => {
          if (stepperLoading.value)
            error('The stepper motor is currently running');
          else socket.emit('pins', pins.value);
        }}
        loading={stepperLoading.value}
      />
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
      {browserSupportsSpeechRecognition ? (
        <div className='flex flex-col items-center'>
          {listening && 'Listening...'}
          <p>{transcript}</p>
          <button
            onClick={() =>
              SpeechRecognition.startListening({ continuous: true })
            }
            className='text-green-600'
          >
            Start Speech
          </button>
          <button
            onClick={SpeechRecognition.stopListening}
            className='text-red-600'
          >
            Stop Speech
          </button>
        </div>
      ) : null}
    </>
  );
};

export default StepperPage;
