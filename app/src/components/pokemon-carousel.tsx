import { RankMethod } from '../types/enum';
import { IFlattenTracker } from '../types/ITracker';
import PokemonThumbnail from './pokemon-thumbnail';


export default function PokemonCarousel(props:{
        currentText:string,
        metadata: {[key: string]: IFlattenTracker},
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
        .filter(k=>props.metadata[k].name.toLowerCase().includes(lowerCaseText) 
        || props.metadata[k].portrait_credit.primary.toLowerCase().includes(lowerCaseText)
        || props.metadata[k].sprite_credit.primary.toLowerCase().includes(lowerCaseText)
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
        a: IFlattenTracker,
        b: IFlattenTracker
        ){
    switch (rankBy) {
        case RankMethod.POKEDEX_NUMBER:
            return parseInt(ka) - parseInt(kb);

        case RankMethod.LAST_MODIFICATION:
            const dap = new Date(a.portrait_modified)
            const dbp = new Date(b.portrait_modified)
            const das = new Date(a.sprite_modified)
            const dbs = new Date(b.sprite_modified)
            return Math.max(dbp.getTime(), dbs.getTime()) - Math.max(dap.getTime(), das.getTime())

        case RankMethod.NAME:
            return a.name.localeCompare(b.name);

        case RankMethod.PORTRAIT_AUTHOR:
            return a.portrait_credit.primary.localeCompare(b.portrait_credit.primary)
    
        case RankMethod.SPRITE_AUTHOR:
            return a.sprite_credit.primary.localeCompare(b.sprite_credit.primary)

        default:
            return 0;
    }
}