/* eslint-disable no-case-declarations */
import { useEffect, useState } from 'react'
import { Monster, useCarrouselQuery } from '../generated/graphql'
import { RankMethod, REQUEST_ITEMS_SIZE } from '../types/enum'
import PokemonThumbnail from './pokemon-thumbnail'

export default function PokemonCarousel(props:{
        currentText:string,
        rankBy: RankMethod,
        showIndex: boolean,
        showPortraitAuthor: boolean,
        showSpriteAuthor: boolean,
        showLastModification: boolean,
        showBounty: boolean,
        ids: number[]
    }){
    const [index, setIndex] = useState<number>(0)
    const [monsters, setMonsters] = useState<Monster[]>([])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {loading, error, data, refetch, fetchMore} = useCarrouselQuery({
        variables:{
            ids:props.ids.slice(index, index + REQUEST_ITEMS_SIZE)
        }
    })

    useEffect(()=>{
        if(data && data.monster.length > 0){
            const ms = [...monsters];
            (data?.monster as Monster[]).forEach(m=>ms.push(m))
            setMonsters(ms)
        }

        if(data && data.monster && index <= props.ids.length){
            setIndex(index + REQUEST_ITEMS_SIZE)
            fetchMore({
                variables:{
                    ids:props.ids.slice(index, index + REQUEST_ITEMS_SIZE)
                }
            })
        }
    }, [data, index, props.ids, fetchMore])

    if(loading && monsters.length == 0) return <p>loading...</p>
    if(error) return <p>Error</p>

    const lowerCaseText = props.currentText.toLowerCase()
    return <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', overflowY:'scroll', overflowX:'hidden'}}>
        {
        monsters
        .filter(k=>k?.name?.toLowerCase().includes(lowerCaseText) 
        || k?.manual?.portraits?.creditPrimary?.name?.toLowerCase().includes(lowerCaseText)
        || k?.manual?.portraits?.creditPrimary?.name?.toLowerCase().includes(lowerCaseText)
        || k?.id.toString().includes(lowerCaseText))
        .sort((a,b) => rankFunction(props.rankBy, a as Monster, b as Monster))
        .map(k=><PokemonThumbnail
            key={k!.id}
            infoKey={k!.id}
            info={k! as Monster}
            showIndex={props.showIndex}
            showPortraitAuthor={props.showPortraitAuthor}
            showSpriteAuthor={props.showSpriteAuthor}
            showLastModification={props.showLastModification}
            showBounty={props.showBounty}
            />
        )}
    </div>
}

function rankFunction(
        rankBy: RankMethod,
        a: Monster,
        b: Monster
        ): number{
    let result: number | undefined = 0

    switch (rankBy) {
        case RankMethod.POKEDEX_NUMBER:
            result = a.id - b.id
            break

        case RankMethod.LAST_MODIFICATION:
            const dap = new Date(a.manual?.portraits.modifiedDate)
            const dbp = new Date(b.manual?.portraits.modifiedDate)
            const das = new Date(a.manual?.sprites.modifiedDate)
            const dbs = new Date(b.manual?.sprites.modifiedDate)
            result = Math.max(dbp.getTime(), dbs.getTime()) - Math.max(dap.getTime(), das.getTime())
            break

        case RankMethod.NAME:
            result = a.name?.localeCompare(b.name!)
            break

        case RankMethod.PORTRAIT_AUTHOR:
            result = a.manual?.portraits?.creditPrimary?.name?.localeCompare(b.manual?.portraits?.creditPrimary?.name ? b.manual?.portraits?.creditPrimary?.name : '')
            break
    
        case RankMethod.SPRITE_AUTHOR:
            result = a.manual?.sprites?.creditPrimary?.name?.localeCompare(b.manual?.sprites?.creditPrimary?.name ? b.manual?.sprites?.creditPrimary?.name: '')
            break

        case RankMethod.BOUNTY:
            result = 
            Math.max(b.manual?.portraits.bounty.exists ? b.manual?.portraits.bounty.exists: 0,
                b.manual?.portraits.bounty.full ? b.manual?.portraits.bounty.full: 0,
                b.manual?.portraits.bounty.incomplete ? b.manual?.portraits.bounty.incomplete: 0,
                b.manual?.sprites.bounty.exists ? b.manual?.sprites.bounty.exists: 0,
                b.manual?.sprites.bounty.full ? b.manual?.sprites.bounty.full: 0,
                b.manual?.sprites.bounty.incomplete ? b.manual?.sprites.bounty.incomplete: 0)
            -
            Math.max(a.manual?.portraits.bounty.exists ? a.manual?.portraits.bounty.exists: 0,
                a.manual?.portraits.bounty.full ? a.manual?.portraits.bounty.full: 0,
                a.manual?.portraits.bounty.incomplete ? a.manual?.portraits.bounty.incomplete: 0,
                a.manual?.sprites.bounty.exists ? a.manual?.sprites.bounty.exists: 0,
                a.manual?.sprites.bounty.full ? a.manual?.sprites.bounty.full: 0,
                a.manual?.sprites.bounty.incomplete ? a.manual?.sprites.bounty.incomplete: 0)
                break
        default:
            result = 0
            break
        }
    const r = result ? result : 0
    return r
}