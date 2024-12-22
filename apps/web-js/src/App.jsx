import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import Title from './Title';
// import DirectSample from '@repo/react-lib-direct/Sample'; // This will not work here as the source needs TypeScript
import { Sample as TsupSample } from '@repo/react-lib-with-tsup';
import { Sample as ViteSample } from '@repo/react-lib-with-vite';

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Title />
      <div className="columns">
        {/* <DirectSample /> */}
        <TsupSample />
        <ViteSample />
      </div>
    </>
  );
}

export default App;
