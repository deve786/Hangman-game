


import './App.css';
import Hangman from './Hangman';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing';

function App() {
  return (

    <div className='App '>

      <Routes>
        <Route path={'/'} element={<Landing/>}></Route>
        <Route path={'/game'} element={<Hangman/>}></Route>
      </Routes>



    </div>
  );
}

export default App;
