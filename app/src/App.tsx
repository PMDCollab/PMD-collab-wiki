import './App.css';
import "nes.css/css/nes.min.css";
import PokemonCarousel from './components/pokemon-carousel';
import Search from './components/search';
import { useState } from 'react';

export default function App() {
    const [currentText, setCurrentText] = useState('');
  return (
    <div className="App">
        <div style={{display:'flex'}}>
            <button className='my-btn nes-btn is-primary'>Home</button>
            <button className='my-btn nes-btn'>Join Discord</button>
            <button className='my-btn nes-btn'>About</button>
        </div>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.7)', display:'flex', flexFlow:'column', alignItems:'center'}}>
            <Search currentText={currentText} setCurrentText={setCurrentText}/>
            <PokemonCarousel currentText={currentText}/>
        </div>
    </div>
  );
}
