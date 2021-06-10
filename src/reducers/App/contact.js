import * as types from '../../constants/ActionTypes';


var contactReducer = (state = {}, actions) => {
    switch (actions.type) {
        case types.CONTACT_GET:
            state = actions.contact
            return state;
        default:
            return state;
    }
}
export default contactReducer;