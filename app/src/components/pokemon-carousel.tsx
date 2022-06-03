/* eslint-disable no-case-declarations */
import { useEffect, useState } from 'react'
import { Monster, useCarrouselQuery } from '../generated/graphql'
import { RankMethod } from '../types/enum'
import PokemonThumbnail from './pokemon-thumbnail'


export default function PokemonCarousel(props:{
        currentText:string,
        rankBy: RankMethod,
        showIndex: boolean,
        showPortraitAuthor: boolean,
        showSpriteAuthor: boolean,
        showLastModification: boolean,
        ids: number[]
    }){
    const [index, setIndex] = useState<number>(0)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {loading, error, data, refetch, fetchMore} = useCarrouselQuery({
        variables:{
            ids:props.ids.slice(index, index + 10)
        }
    })

    useEffect(()=>{
        if(data && data.monster && index <= props.ids.length){
            setIndex(index + 10)
            fetchMore({
                variables:{
                    ids:props.ids.slice(index, index + 10)
                }
            })
        }
    }, [data, index, props.ids, fetchMore])

    if(loading) return <p>loading...</p>
    if(error) return <p>Error</p>

    const lowerCaseText = props.currentText.toLowerCase()
    return <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', overflowY:'scroll', overflowX:'hidden'}}>
        {
        data?.monster
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

        default:
            result = 0
            break
        }
    const r = result ? result : 0
    return r
}