import { CreditInformation } from "../types/enum";
import { ITracker } from "../types/ITracker";
import Buttons from "./buttons";
import { ReactElement } from "react";
import PokemonInformations from "./pokemon-informations";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function PokemonPage(props:{infoKey: string, info: ITracker, mappedCredits: Map<string, CreditInformation>}){

    const tablist = new Array<ReactElement>();
    const tabPanelList = new Array<ReactElement>();


    function buildTab(info: ITracker, infoKey: string){
        if(info.name){
            tablist.push(<Tab key={infoKey}><p style={{fontSize:'0.6em'}} className={tablist.length%2 === 0 ? 'nes-pointer nes-text is-primary': 'nes-pointer'}>{`${info.name}`}</p></Tab>);
            tabPanelList.push(<TabPanel key={`${infoKey}`}>
                <PokemonInformations
                    portraitCredit={info.portrait_credit}
                    portraitFiles={info.portrait_files}
                    spriteCredit={info.sprite_credit}
                    spriteFiles={info.sprite_files}
                    spriteModified={info.sprite_modified}
                    portraitModified={info.portrait_modified}
                    infoKey={`${infoKey}`}
                    mappedCredits={props.mappedCredits}
                />
            </TabPanel>);
        }
        if(info.subgroups){
            Object.keys(info.subgroups).forEach(k=>{
                buildTab(info.subgroups[k], `${infoKey}/${k}`);
            })
        }
    }

    buildTab(props.info, props.infoKey);

    return <div className="App">
        <Buttons/>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.85)', display:'flex', flexFlow:'column', overflowY:'scroll'}}>
            <h1 style={{fontSize:'1.5em'}}>{props.info.name} ({props.infoKey})</h1>
            <Tabs>
                <TabList>
                    {tablist}
                </TabList>
                {tabPanelList}
            </Tabs>
        </div>
    </div>
}