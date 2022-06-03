import Buttons from "./buttons"
import PokemonInformations from "./pokemon-informations"
import { ReactElement } from "react"
import 'react-tabs/style/react-tabs.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Link } from "react-router-dom"
import { MonsterForm, usePokemonQuery } from "../generated/graphql"

export default function PokemonPage(props:{
        infoKey: number,
        prevIndex: number | undefined,
        nextIndex: number | undefined
    }){

    const {loading, error, data} = usePokemonQuery({})

    const tablist = new Array<ReactElement>()
    const tabPanelList = new Array<ReactElement>()
    const prevIndex = props.infoKey - 1
    const nextIndex = props.infoKey - 1

    const prevLink = props.prevIndex ? <Link to={`/${prevIndex}`}><p className="nes-text is-primary" style={{fontSize:'0.6em', position:'absolute', left:'20px'}}>{'<'} {prevIndex}</p></Link> : null
    const nextLink = props.nextIndex ? <Link to={`/${nextIndex}`}><p className="nes-text is-primary" style={{fontSize:'0.6em', position:'absolute', right:'20px'}}>{nextIndex} {'>'}</p></Link> : null

    
    data?.monster[0]?.forms.forEach(form=>{
        tablist.push(<Tab key={form.path}><p style={{fontSize:'0.6em'}} className={tablist.length%2 === 0 ? 'nes-pointer nes-text is-primary': 'nes-pointer'}>{form.name}</p></Tab>)
        tabPanelList.push(<TabPanel key={`${props.infoKey}`}>
            <PokemonInformations
                info={form as MonsterForm}
                infoKey={props.infoKey}
            />
        </TabPanel>)
    })

    if(loading) return <p>loading...</p>
    if(error) return <p>Error</p>
    
    return <div className="App">
        <Buttons/>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.9)', display:'flex', flexFlow:'column', overflowY:'scroll'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                {prevLink}
                <h1 style={{fontSize:'1.3em'}}>{data?.monster[0].name} {props.infoKey}</h1>
                {nextLink}
            </div>
            <Tabs>
                <TabList>
                    {tablist}
                </TabList>
                {tabPanelList}
            </Tabs>
        </div>
    </div>
}