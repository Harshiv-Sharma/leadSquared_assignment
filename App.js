import React, { useState } from 'react';
import EasySolution from './components/EasySolution';
import MediumSolution from './components/MediumSolution';
import HardSolution from './components/HardSolution';

function App() {
  const [solution, setSolution] = useState('easy');

  return (
    <div className="App">
      <h1>Cat Image Gallery Solutions</h1>
      <div>
        <button onClick={() => setSolution('easy')}>Easy Solution</button>
        <button onClick={() => setSolution('medium')}>Medium Solution</button>
        <button onClick={() => setSolution('hard')}>Hard Solution</button>
      </div>
      
      {solution === 'easy' && <EasySolution />}
      {solution === 'medium' && <MediumSolution />}
      {solution === 'hard' && <HardSolution />}
    </div>
  );
}

export default App;
