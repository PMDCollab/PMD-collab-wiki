import { XMLParser } from "fast-xml-parser";
import { useCallback, useState } from "react";
import { CDN_URL, IPMDCollab } from "../types/enum";
import GameContainer from "./phaser/game-container";


export default function SpritePreview(props:{infoKey: string, action: string}) {
    const [initialized, setInitialized] = useState<boolean>(false);

    const container = useCallback((node: HTMLDivElement) =>{
        async function initialize(){

            const xmlData =  await (await fetch(`${CDN_URL}/sprite/${props.infoKey}/AnimData.xml`)).text();
            const parser = new XMLParser();
            const data = parser.parse(xmlData) as IPMDCollab;
            new GameContainer(node as HTMLDivElement, props.infoKey, props.action, data.AnimData);
        }

        if(node !== null && !initialized){
            setInitialized(true);
            initialize();
        }
    }, [initialized, setInitialized, props.infoKey, props.action]);

    return <div className='my-container nes-container' style={{display:'flex', alignItems:'center', flexFlow:'column', margin:'10px'}}>
            <div id={`action-${props.action}`} ref={container}></div>
            <p style={{fontSize: '0.6em', margin: '0px'}}>{props.action}</p>
        </div>
}

