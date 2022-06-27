import Buttons from './components/buttons'

export default function NotFound(){
    return <div className="App">
    <Buttons/>
    <div className='nes-container' style={{height:'90vh', overflowY: 'scroll', backgroundColor:'rgba(255,255,255,0.8)', display:'flex', flexFlow:'column', alignItems:'center'}}>
        <h1 className="nes-text is-primary">404 not found</h1>
        <p>Theres no content here. Please note that pokemon index are zero-padded. If you are looking for mew, the url will be <a href={'/#/0151'}>{window.location.hostname + '/#/0151'} </a>
        and not {window.location.hostname + '/#/151'}.
        </p>
    </div>
</div>
}