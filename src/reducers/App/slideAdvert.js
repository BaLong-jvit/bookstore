import * as types from '../../constants/ActionTypes';



var unitState = [];
var slideReducer = (state = unitState, actions) => {
    switch (actions.type) {
        case types.LIST_ADVERTS:
            state = actions.adverts
            return state;
        default:
            return state;
    }
}
export default slideReducer;