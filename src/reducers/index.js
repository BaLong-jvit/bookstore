import { combineReducers } from 'redux';
import contact from './App/contact';
import switchControl from './App/switchControl';
import aboutUs from './App/aboutUs';
import slideAdvert from './App/slideAdvert';

const myReducer = combineReducers({
    contact,
    switchControl,
    aboutUs,
    slideAdvert
});
export default myReducer;