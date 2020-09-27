import {combineReducers} from 'redux'
import getUser from '../utils/storageUtils'

let initUser = getUser.getUser()


const user = (state = initUser,action)=>{
   
    switch(action.type){
      case 'set_login':
        return action.data
      case 'delete_login':
        return {}
      default:
        return state
    }
}



export default combineReducers({
    user

})