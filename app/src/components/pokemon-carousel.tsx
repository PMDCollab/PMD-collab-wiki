import { RankMethod } from '../types/enum';
import { ITracker, MinPath } from '../types/ITracker'
import PokemonThumbnail from './pokemon-thumbnail';


export default function PokemonCarousel(props:{
        currentText:string,
        metadata: {[key: string]: ITracker},
        rankBy: RankMethod,
        showIndex: boolean,
        showPortraitAuthor: boolean,
        showSpriteAuthor: boolean,
        showLastModification: boolean,
    }){

    const lowerCaseText = props.currentText.toLowerCase()
    return <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', overflowY:'scroll', overflowX:'hidden'}}>
        {Object.keys(props.metadata)
        .filter(k=>k.split('/').length < 2)
        .filter(k=>props.metadata[k][MinPath.NAME].toLowerCase().includes(lowerCaseText) 
        || props.metadata[k][MinPath.PORTRAIT_CREDIT][MinPath.PRIMARY].toLowerCase().includes(lowerCaseText)
        || props.metadata[k][MinPath.SPRITE_CREDIT][MinPath.PRIMARY].toLowerCase().includes(lowerCaseText)
        || k.includes(lowerCaseText))
        .sort((a,b) => rankFunction(props.rankBy, a, b, props.metadata[a], props.metadata[b]))
        .map(k=><PokemonThumbnail
            key={k}
            infoKey={k}
            info={props.metadata[k]}
            showIndex={props.showIndex}
            showPortraitAuthor={props.showPortraitAuthor}
            showSpriteAuthor={props.showSpriteAuthor}
            showLastModification={props.showLastModification}
            />
        )}
    </div>
}

function rankFunction(
        rankBy: RankMethod,
        ka: string,
        kb: string,
        a: ITracker,
        b: ITracker
        ){
    switch (rankBy) {
        case RankMethod.POKEDEX_NUMBER:
            return parseInt(ka) - parseInt(kb);

        case RankMethod.LAST_MODIFICATION:
            const dap = new Date(a[MinPath.PORTRAIT_MODIFIED])
            const dbp = new Date(b[MinPath.PORTRAIT_MODIFIED])
            const das = new Date(a[MinPath.SPRITE_MODIFIED])
            const dbs = new Date(b[MinPath.SPRITE_MODIFIED])
            return Math.max(dbp.getTime(), dbs.getTime()) - Math.max(dap.getTime(), das.getTime())

        case RankMethod.NAME:
            return a[MinPath.NAME].localeCompare(b[MinPath.NAME]);

        case RankMethod.PORTRAIT_AUTHOR:
            return a[MinPath.PORTRAIT_CREDIT][MinPath.PRIMARY].localeCompare(b[MinPath.PORTRAIT_CREDIT][MinPath.PRIMARY])
    
        case RankMethod.SPRITE_AUTHOR:
            return a[MinPath.SPRITE_CREDIT][MinPath.PRIMARY].localeCompare(b[MinPath.SPRITE_CREDIT][MinPath.PRIMARY])

        default:
            return 0;
    }
}