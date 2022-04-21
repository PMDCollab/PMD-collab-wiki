import './style/app.css';
import "nes.css/css/nes.min.css";
import PokemonCarousel from './components/pokemon-carousel';
import Search from './components/search';
import { useState } from 'react';
import Buttons from './components/buttons';
import { ITracker } from './types/ITracker';

export default function Home(props:{metadata: {[key: string]: ITracker}}) {
    const [currentText, setCurrentText] = useState('');

    return (
      <div className="App">
          <Buttons/>
          <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.85)', display:'flex', flexFlow:'column', alignItems:'center'}}>
              <Search currentText={currentText} setCurrentText={setCurrentText}/>
              <PokemonCarousel currentText={currentText} metadata={props.metadata}/>
          </div>
      </div>
    );
}
