import './App.css';
import "nes.css/css/nes.min.css";
import PokemonCarousel from './components/pokemon-carousel';
import Search from './components/search';

export default function App() {
  return (
    <div className="App">
        <div className='nes-container' style={{height:'100%', overflowY:'scroll', overflowX:'hidden', backgroundColor:'rgba(255,255,255,0.7)', display:'flex', flexFlow:'column', alignItems:'center'}}>
            <Search/>
            <PokemonCarousel/>
        </div>
    </div>
  );
}
