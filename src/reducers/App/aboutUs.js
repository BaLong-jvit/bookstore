import * as types from '../../constants/ActionTypes';


var aboutReducer = (state = [], actions) => {
    switch (actions.type) {
        case types.ABOUT_US_GET:
            state = actions.about
            return state;
        default:
            return state;
    }
}
export default aboutReducer;