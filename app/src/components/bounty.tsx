import { MonsterBounty } from "../generated/graphql";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Bounty(props:{bounty:MonsterBounty}){
    
    if(props.bounty.exists || props.bounty.full || props.bounty.incomplete){
        return <div style={{display:'flex', justifyContent:'space-around', alignItems:'center',fontSize: '0.6em'}}>
        
        {props.bounty.exists ? <div style={{display:'flex', alignItems:'baseline', gap:'2px'}}>
            <p>{props.bounty.exists}</p>
            <FontAwesomeIcon icon={faCoins}/>
            <p>exists</p>
        </div>: null}

        {props.bounty.full ? <div style={{display:'flex', alignItems:'baseline', gap:'2px'}}>
            <p>{props.bounty.full}</p>
            <FontAwesomeIcon icon={faCoins}/>
            <p>full</p>
        </div>: null}

        {props.bounty.incomplete ? <div style={{display:'flex', alignItems:'baseline', gap:'2px'}}>
            <p>{props.bounty.incomplete}</p>
            <FontAwesomeIcon icon={faCoins}/>
            <p>incomplete</p>
        </div>: null}
        
    </div>
    }
    else{
        return null
    }

}