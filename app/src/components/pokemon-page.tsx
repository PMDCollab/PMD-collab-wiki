import { IFlattenTracker } from "../types/ITracker";
import Buttons from "./buttons";
import PokemonInformations from "./pokemon-informations";
import trackerFile from '../tracker.json'
import { ReactElement } from "react";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const tracker = trackerFile as unknown as {[key: string]: IFlattenTracker}

export default function PokemonPage(props:{
        infoKey: string,
        info: IFlattenTracker
    }){

    const tablist = new Array<ReactElement>();
    const tabPanelList = new Array<ReactElement>();

    props.info.related.forEach(infoKey=>{
        tablist.push(<Tab key={infoKey}><p style={{fontSize:'0.6em'}} className={tablist.length%2 === 0 ? 'nes-pointer nes-text is-primary': 'nes-pointer'}>{`${tracker[infoKey].name}`}</p></Tab>);
        tabPanelList.push(<TabPanel key={`${infoKey}`}>
            <PokemonInformations
                portraitCredit={tracker[infoKey].portrait_credit}
                portraitFiles={tracker[infoKey].portrait_files}
                spriteCredit={tracker[infoKey].sprite_credit}
                spriteFiles={tracker[infoKey].sprite_files}
                spriteModified={tracker[infoKey].sprite_modified}
                portraitModified={tracker[infoKey].portrait_modified}
                infoKey={`${infoKey}`}
            />
        </TabPanel>);
    })
    
    return <div className="App">
        <Buttons/>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.85)', display:'flex', flexFlow:'column', overflowY:'scroll'}}>
            <h1 style={{fontSize:'1.4em'}}>{props.info.name} {props.infoKey}</h1>
            <Tabs>
                <TabList>
                    {tablist}
                </TabList>
                {tabPanelList}
            </Tabs>
        </div>
    </div>
}
