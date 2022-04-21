import { CDN_URL, ICreditNames } from "../types/enum";
import { ITracker } from "../types/ITracker";
import Buttons from "./buttons";
import DataFrame from 'dataframe-js';
import { ReactElement, useState } from "react";
import PokemonInformations from "./pokemon-informations";
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function PokemonPage(props:{infoKey: string, info: ITracker}){
    const [df, setDf] = useState<ICreditNames>();
    const [initialized, setInitialized] = useState<boolean>(false);
    if(!initialized){
        setInitialized(true);
        DataFrame.fromText(`${CDN_URL}/credit_names.txt`,'\t',true)
        .then(df=>{setDf(df.toDict())});
    }

    const tablist = new Array<ReactElement>();
    const tabPanelList = new Array<ReactElement>();

    if(props.info.subgroups){
        Object.keys(props.info.subgroups).forEach(k=>{
            const s = props.info.subgroups[k];
            const name = s.name ? s.name : '';
            if(s.name){
                tablist.push(<Tab key={k}><p className={tablist.length%2 === 0 ? 'nes-pointer nes-text is-primary': 'nes-pointer'}>{`${props.info.name} ${name}`}</p></Tab>);
                tabPanelList.push(<TabPanel key={k}>
                    <PokemonInformations
                        portraitCredit={s.portrait_credit}
                        portraitFiles={s.portrait_files}
                        spriteCredit={s.sprite_credit}
                        spriteFiles={s.sprite_files as { [key: string]: boolean; }}
                        infoKey={`${props.infoKey}/${k}`}
                        df={df}
                    />
                </TabPanel>);
            }
            if(s.subgroups){
                Object.keys(s.subgroups).forEach(kk=>{
                    const ss = s.subgroups[kk];
                    if(ss.name){
                        tablist.push(<Tab key={`${k}-${kk}`}><p className={tablist.length%2 === 0 ? 'nes-pointer nes-text is-primary': 'nes-pointer'}>{`${props.info.name} ${name} ${ss.name}`}</p></Tab>);
                        tabPanelList.push(<TabPanel key={`${k}-${kk}`}>
                            <PokemonInformations
                                portraitCredit={ss.portrait_credit}
                                portraitFiles={ss.portrait_files}
                                spriteCredit={ss.sprite_credit}
                                spriteFiles={ss.sprite_files as { [key: string]: boolean; }}
                                infoKey={`${props.infoKey}/${k}/${kk}`}
                                df={df}
                            />
                        </TabPanel>);
                    }
                });
            }
        })
    }

    return <div className="App">
        <Buttons/>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.85)', display:'flex', flexFlow:'column', overflowY:'scroll'}}>
            <h1>{props.info.name} ({props.infoKey})</h1>
            <Tabs>
                <TabList>
                    <Tab>{props.info.name}</Tab>
                    {tablist}
                </TabList>
                <TabPanel>
                    <PokemonInformations 
                        portraitCredit={props.info.portrait_credit}
                        portraitFiles={props.info.portrait_files}
                        spriteCredit={props.info.sprite_credit}
                        spriteFiles={props.info.sprite_files}
                        infoKey={props.infoKey}
                        df={df}
                    />
                </TabPanel>
                {tabPanelList}
            </Tabs>
        </div>
    </div>
}