import { SHOW_USER_DATA,
        SET_LOCATION_LANG,
        ADD_TO_SHORTLIST_IN_CLIENT
      } from '../actions/types';

export default function(state = [], action){
  switch(action.type){
      case SHOW_USER_DATA:
    return action.payload
      case ADD_TO_SHORTLIST_IN_CLIENT:
          var newState = Object.assign([], state)
            newState.map(user =>{
                if (user.id === action.githubId){
                    return user.shortlist = true
                }
            })
            return newState

    return
  }
  return state;
}
