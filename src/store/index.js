import { createStore } from '../redux';
import  rootReducer from './reducers'

function applyMiddleWare(logger){
    return function (createStore){
        return function(reducer){
            let store = createStore(reducer)
            let dispatch = logger(store)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}


// 以后在创建仓库的时候 不需要传递默认状态了 ，reducer里面赋值
// let store = createStore(rootReducer)

function logger({getState}){
    return function(next){
       return function(action){
            console.log('prev state', getState())
            next(action)
            console.log('next state',getState())
       }
    }
}

let store = applyMiddleWare(logger)(createStore)(rootReducer)
export default store