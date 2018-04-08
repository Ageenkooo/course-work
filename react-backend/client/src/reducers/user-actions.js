import { CHANGE_STATE, FILM_SELECTED, SESSION_SELECTED} from '../constants/actionTypes'

export  function Actions(state = {}, action) {
  switch (action.type) {
    case CHANGE_STATE:
      return action.payload;
      break;
    default:
      return state;
  }
}

export function Active(state = {}, action){
  switch (action.type){
    case FILM_SELECTED:
      return action.payload;
      break;
    default:
      return state;
  }
}
export function ActiveSess(state = {}, action){
  switch (action.type){
    case SESSION_SELECTED:
      return action.payload;
      break;
    default:
      return state;
  }
}

