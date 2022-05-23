import { ITracker, MinPath } from "../types/ITracker";
import Buttons from "./buttons";
import PokemonInformations from "./pokemon-informations";
import trackerFile from '../tracker.json'
import { ReactElement } from "react";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from "react-router-dom";

const tracker = trackerFile as unknown as {[key: string]: ITracker}

export default function PokemonPage(props:{
        infoKey: string,
        info: ITracker
    }){

    const tablist = new Array<ReactElement>();
    const tabPanelList = new Array<ReactElement>();
    const prevIndex = (parseInt(props.infoKey) - 1).toString().padStart(4,'0')
    const nextIndex = (parseInt(props.infoKey) + 1).toString().padStart(4,'0')

    props.info[MinPath.RELATED].forEach(infoKey=>{
        tablist.push(<Tab key={infoKey}><p style={{fontSize:'0.6em'}} className={tablist.length%2 === 0 ? 'nes-pointer nes-text is-primary': 'nes-pointer'}>{`${tracker[infoKey][MinPath.NAME]}`}</p></Tab>);
        tabPanelList.push(<TabPanel key={`${infoKey}`}>
            <PokemonInformations
                portraitCredit={tracker[infoKey][MinPath.PORTRAIT_CREDIT]}
                portraitFiles={tracker[infoKey][MinPath.PORTRAIT_FILES]}
                spriteCredit={tracker[infoKey][MinPath.SPRITE_CREDIT]}
                spriteFiles={tracker[infoKey][MinPath.SPRITE_FILES]}
                spriteModified={tracker[infoKey][MinPath.SPRITE_MODIFIED]}
                portraitModified={tracker[infoKey][MinPath.PORTRAIT_MODIFIED]}
                spriteLink={tracker[infoKey][MinPath.SPRITE_LINK]}
                spriteRecolorLink={tracker[infoKey][MinPath.SPRITE_RECOLOR_LINK]}
                portraitLink={tracker[infoKey][MinPath.PORTRAIT_LINK]}
                portraitRecolorLink={tracker[infoKey][MinPath.PORTRAIT_RECOLOR_LINK]}
                infoKey={`${infoKey}`}
            />
        </TabPanel>);
    })
    
    return <div className="App">
        <Buttons/>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.9)', display:'flex', flexFlow:'column', overflowY:'scroll'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <Link to={`/${prevIndex}`}>
                    <p className="nes-text is-primary" style={{fontSize:'0.6em'}}>{'<'} {tracker[prevIndex][MinPath.NAME]} {prevIndex}</p>
                </Link>
                <h1 style={{fontSize:'1.3em'}}>{props.info[MinPath.NAME]} {props.infoKey}</h1>
                <Link to={`/${nextIndex}`}><p className="nes-text is-primary" style={{fontSize:'0.6em'}}>{nextIndex} {tracker[nextIndex][MinPath.NAME]} {'>'}</p></Link>
            </div>
            <Tabs>
                <TabList>
                    {tablist}
                </TabList>
                {tabPanelList}
            </Tabs>
        </div>
    </div>
}