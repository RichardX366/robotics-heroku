import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { socket } from '../socket';
import { globalInitialized, globalLoading } from '../socket/cardboardCNCTest';
import { error } from '../components/Notification';
import { useHookstate } from '@hookstate/core';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const CardboardCNCTest: React.FC = () => {
  const [distance, setDistance] = useState(0);
  const [steps, setSteps] = useState(0);
  const loading = useHookstate(globalLoading);
  const initialized = useHookstate(globalInitialized);
  const {
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript,
    listening,
    transcript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript) {
      const distance = +finalTranscript;
      if (isFinite(distance)) {
        socket.emit('move', distance);
      }
      resetTranscript();
    }
  }, [finalTranscript, resetTranscript]);
  return initialized.value ? (
    <>
      <Input
        value={distance}
        onChange={setDistance}
        type='number'
        min={0}
        label='Move (mm)'
        onEnter={() => {
          if (loading.value) error('The CNC is currently running');
          else socket.emit('move', distance);
        }}
        loading={loading.value}
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
  ) : (
    <>
      <h1 className='text-xl text-center font-medium'>Initialize</h1>
      <Input
        value={steps}
        onChange={setSteps}
        type='number'
        integerOnly
        label='Step'
        onEnter={() => {
          if (loading.value) error('The CNC is currently running');
          else socket.emit('step', steps);
        }}
        loading={loading.value}
      />
      <span className='relative z-0 grid grid-cols-2 shadow-sm rounded-md text-gray-700 text-lg'>
        <button
          onClick={() => {
            if (loading.value) error('The CNC is currently running');
            else socket.emit('setClosest');
          }}
          className='justify-center relative inline-flex items-center py-2 rounded-l-md border border-gray-300 bg-white font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500'
        >
          Set Closest
        </button>
        <button
          onClick={() => {
            if (loading.value) error('The CNC is currently running');
            else socket.emit('setFarthest');
          }}
          className='justify-center relative inline-flex items-center py-2 rounded-r-md border border-gray-300 bg-white font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500'
        >
          Set Farthest
        </button>
      </span>
    </>
  );
};

export default CardboardCNCTest;
