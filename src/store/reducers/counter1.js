import {ADD1,MINUS1} from '../action-types'

// 这个是Counter1组件对应的reducer
let initialState = {number:5}
function reducer(oldState = initialState, action) {
    switch (action.type) { // 判断动作的类型
        case ADD1:
            return { number: oldState.number + action.payload };
        case MINUS1:
            return { number: oldState.number - action.payload };
        default:
            return oldState;
    }
}

export default reducer