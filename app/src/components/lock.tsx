import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

export default function Lock(props:{locked: boolean}){
    if(props.locked){
        return <FontAwesomeIcon icon={faLock} color='#e76e55' title='This is locked and requires special permissions to be updated'/>
    }
    else{
        return <FontAwesomeIcon icon={faLockOpen} color='#92cc41' title='This is unlocked, update do not require special permissions'/>
    }
}