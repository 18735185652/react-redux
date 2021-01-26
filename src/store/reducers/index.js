import { combineReducers} from '../../redux';

import counter1 from './counter1'
import counter2 from './counter2'

let reducers = {
    counter1,
    counter2
}
// 把一个对象变成了一个reducer
let rootReducer = combineReducers(reducers)

export default rootReducer