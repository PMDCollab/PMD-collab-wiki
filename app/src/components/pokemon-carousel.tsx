import { CreditInformation, RankMethod } from '../types/enum';
import { ITracker } from '../types/ITracker';
import PokemonThumbnail from './pokemon-thumbnail';


export default function PokemonCarousel(props:{currentText:string, metadata: {[key: string]: ITracker}, rankBy: RankMethod, showIndex: boolean, showPortraitAuthor: boolean, showSpriteAuthor: boolean, showLastModification: boolean, mappedCredits: Map<string, CreditInformation>}){

    return <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', overflowY:'scroll', overflowX:'hidden'}}>
        {Object.keys(props.metadata)
        .filter(k=>props.metadata[k].name.toLowerCase().includes(props.currentText.toLowerCase()))
        .sort((a,b) => rankFunction(props.rankBy, a, b, props.metadata[a], props.metadata[b], props.mappedCredits))
        .map(k=><PokemonThumbnail
            key={k}
            infoKey={k}
            info={props.metadata[k]}
            showIndex={props.showIndex}
            showPortraitAuthor={props.showPortraitAuthor}
            showSpriteAuthor={props.showSpriteAuthor}
            showLastModification={props.showLastModification}
            mappedCredits={props.mappedCredits}
            />
        )}
    </div>
}

function rankFunction(rankBy: RankMethod, ka: string, kb: string, a: ITracker, b: ITracker, mappedCredits: Map<string, CreditInformation>){
    switch (rankBy) {
        case RankMethod.POKEDEX_NUMBER:
            return parseInt(ka) - parseInt(kb);

        case RankMethod.LAST_MODIFICATION:
            const dap = new Date(a.portrait_modified);
            const dbp = new Date(b.portrait_modified);
            const das = new Date(a.sprite_modified);
            const dbs = new Date(b.sprite_modified);
            return Math.max(dbp.getTime(), dbs.getTime()) - Math.max(dap.getTime(), das.getTime());

        case RankMethod.NAME:
            return a.name.localeCompare(b.name);

        case RankMethod.PORTRAIT_AUTHOR:
            const anp = mappedCredits.get(a.portrait_credit.primary)?.name ? mappedCredits.get(a.portrait_credit.primary)!.name : '';
            const bnp = mappedCredits.get(b.portrait_credit.primary)? mappedCredits.get(b.portrait_credit.primary)!.name : '';
            return anp.localeCompare(bnp)

        case RankMethod.SPRITE_AUTHOR:
            const ans = mappedCredits.get(a.sprite_credit.primary)?.name ? mappedCredits.get(a.sprite_credit.primary)!.name : '';
            const bns = mappedCredits.get(b.sprite_credit.primary)? mappedCredits.get(b.sprite_credit.primary)!.name : '';
            return ans.localeCompare(bns)
    
        default:
            return 0;
    }
}