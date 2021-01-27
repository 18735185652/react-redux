
/**
 * 把一个reducers对象变成一个reducer函数
 * @param {*} reducers \
 * let reducers = {counter1,counter2}
 */
function combineReducers(reducers) {
    // 这个返回的函数就是我们最终的根reducer
    let rootReducer = (state = {}, action) => {
        let nextState = {}; // 先声明一个空对象 用来保存最终的状态
        for (let key in reducers) {
            // key counter1 counter2
            const reducer = reducers[key];
            const previousState = state[key];
            nextState[key] = reducer(previousState, action)
        }
        console.log('nextState: ', nextState);
        return nextState
       
    }
    return rootReducer;
}


export default combineReducers