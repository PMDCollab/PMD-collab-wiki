import { Meta } from '../generated/graphql'

export default function MetaInformations(props:{meta: Meta}){
    return <div style={{display:'flex', fontSize:'8px', gap: '10px', justifyContent:'center'}}>
    <p>Last update: {new Date(props.meta.assetsUpdateDate).toLocaleString()}</p>
    <p>Last Check for updates: {new Date(props.meta.updateCheckedDate).toLocaleString()}</p>
    <a target="_blank" href={`https://github.com/PMDCollab/SpriteCollab/commit/${props.meta.assetsCommit}`}>Last Commit</a>
  </div>
}