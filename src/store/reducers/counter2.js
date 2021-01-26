import {ADD2,MINUS2} from '../action-types'
let initialState = {number:10}

function reducer(oldState = initialState, action) {
    switch (action.type) { // 判断动作的类型
        case ADD2:
            return { number: oldState.number + action.payload };
        case MINUS2:
            return { number: oldState.number - action.payload };
        default:
            return oldState;
    }
}

export default reducer