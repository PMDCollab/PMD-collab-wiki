import './style/app.css'
import "nes.css/css/nes.min.css"
import PokemonCarousel from './components/pokemon-carousel'
import Search from './components/search'
import { useState } from 'react'
import Buttons from './components/buttons'
import {RankMethod } from './types/enum'
import DisplayParameters from './components/display-parameters'

export default function Home(props:{ids: number[]}) {
    const [currentText, setCurrentText] = useState('')
    const [rankBy, setRankBy] = useState<RankMethod>(RankMethod.POKEDEX_NUMBER)
    const [showPortraitAuthor, setPortraitAuthor] = useState<boolean>(false)
    const [showSpriteAuthor, setSpriteAuthor] = useState<boolean>(false)
    const [showIndex, setShowIndex] = useState<boolean>(false)
    const [showLastModification, setShowLastModification] = useState<boolean>(false)
    const [showPortraitBounty, setShowPortraitBounty] = useState<boolean>(false)
    const [showSpriteBounty, setShowSpriteBounty] = useState<boolean>(false)
    return (
        <div className="App">
            <Buttons/>
            <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.85)', display:'flex', flexFlow:'column', alignItems:'center'}}>
                <div style={{display:'flex', width:'100%', alignContent:'center', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap'}}>
                  <DisplayParameters 
                    setSpriteAuthor={setSpriteAuthor}
                    setPortraitAuthor={setPortraitAuthor}
                    setShowIndex={setShowIndex}
                    setShowLastModification={setShowLastModification}
                    setShowPortraitBounty={setShowPortraitBounty}
                    setShowSpriteBounty={setShowSpriteBounty}
                    showPortraitAuthor={showPortraitAuthor}
                    showSpriteAuthor={showSpriteAuthor}
                    showIndex={showIndex}
                    showLastModification={showLastModification}
                    showPortraitBounty={showPortraitBounty}
                    showSpriteBounty={showSpriteBounty}
                    />

                  <Search 
                    currentText={currentText} 
                    setCurrentText={setCurrentText}/>
                  <div className="nes-select is-inline" style={{display:'flex', alignItems:'center', width:'initial'}}>
                  <p style={{fontSize:'0.7em'}}>Rank by</p>
                  <select style={{borderWidth:'2px', height:'40px', fontSize:'0.7em'}} value={rankBy} id="default_select" onChange={e=>{
                      const rankMethod = e.target.value as RankMethod
                      switch (rankMethod) {
                            case RankMethod.LAST_MODIFICATION:
                                setShowLastModification(true)
                                break
                        
                            case RankMethod.POKEDEX_NUMBER:
                                setShowIndex(true)
                                break

                            case RankMethod.PORTRAIT_AUTHOR:
                                setPortraitAuthor(true)
                                break
                        
                            case RankMethod.SPRITE_AUTHOR:
                                setSpriteAuthor(true)
                                break

                            case RankMethod.PORTRAIT_BOUNTY:
                                setShowPortraitBounty(true)
                                break
                        
                            case RankMethod.SPRITE_BOUNTY:
                                setShowSpriteBounty(true)
                                break

                            default:
                                break
                      }
                      setRankBy(rankMethod)
                      }}>
                      {(Object.values(RankMethod) as RankMethod[]).map(r=><option style={{fontSize:'1.5em', fontFamily: "Press Start 2P"}} key={r} value={r}>{r}</option>)}
                  </select>
                  </div>
                </div>
                <PokemonCarousel 
                    currentText={currentText}
                    rankBy={rankBy}
                    showPortraitAuthor={showPortraitAuthor}
                    showSpriteAuthor={showSpriteAuthor}
                    showIndex={showIndex}
                    showLastModification={showLastModification}
                    showPortraitBounty={showPortraitBounty}
                    showSpriteBounty={showSpriteBounty}
                    ids={props.ids}
                />
            </div>
        </div>
      )
}
