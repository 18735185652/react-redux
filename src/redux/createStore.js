
/**
 * 
 * @param {*} reducer 处理器
 * @param {*} preloadedState 仓库的初始状态 
 */
function createStore(reducer, preloadedState) {
    // 定义一个状态变量 并且赋上默认值
    let state = preloadedState;
    let listeners = []
    // 返回最新的状态
    function getState() {
        return state
    }
    // 订阅函数 返回一个取消订阅的函数
    function subscribe(listener) {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(item => item !== listener);
        }
    }
    // 派发action 
    function dispatch(action) {
        // 接收reducer，计算新的state，通知新的订阅函数执行
        state = reducer(state, action)
        console.log('state: ', state);
        // 挨个通知订阅的函数执行
        listeners.forEach(l => l())
        return action
    }
    const store = {
        getState,
        subscribe,
        dispatch
    }
    return store
}

export default createStore