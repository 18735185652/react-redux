import { createStore } from '../redux';
import rootReducer from './reducers'

function applyMiddleWare(middleware) {
    return function (createStore) {
        return function (reducer) {
            let store = createStore(reducer)
            let dispatch = middleware(store)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}


// 以后在创建仓库的时候 不需要传递默认状态了 ，reducer里面赋值
// let store = createStore(rootReducer)
// next指向的是原始的store.dispatch 只能接收普通的对象那个dispatch
// store.dispatch 是经过中间件包装处理过的 支持promise function 。。。
function logger({ getState }) {
    return function (next) {
        return function (action) {
            console.log('prev state', getState())
            next(action)
            console.log('next state', getState())
        }
    }
}

// 只要是中间件 格式是定死的 redux-thunk
function thunk(middlewareAPI) {
    return function (next) { // next => store.dispatch
        return function (action) {
            if (typeof action === 'function') {
                return action(middlewareAPI)
            }
            // 如果不是函数 则不需要自己处理，直接调下一个dispatch方法就行
            return next(action)
        }
    }
}

function promise(store) {
    return function (next) { // next => store.dispatch
        return function (action) {
            if (typeof action.then === 'function') {
                return action.then(newAction => store.dispatch(newAction))
            }
            return next(action);
        }
    }
}

function middleware(store) {
    return function (next) {
        return function (action) {
            console.log('prev state', store.getState())
            if (typeof action === 'function') {
                action({ dispatch: store.dispatch, getState: store.getState })
            } else if (typeof action.then === 'function') {
                action.then(newAction => store.dispatch(newAction))
            } else {
                next(action)
            }
            console.log('next state', store.getState())
        }
    }
}

function applyMiddleWare1(...middlewares) {
    return function (createStore) {
        return function (reducer) {
            let store = createStore(reducer);
            let dispatch;
            let middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
            }
            let chin = middlewares.map(middleware => middleware(middlewareAPI))
            let [promise, thunk, logger] = chin;
            dispatch = promise(thunk(logger(store.dispatch)))
            // dispatch = middleware(middlewareAPI)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }

}



// let store = applyMiddleWare(middleware)(createStore)(rootReducer)
let store = applyMiddleWare1(promise, thunk, logger)(createStore)(rootReducer)

export default store