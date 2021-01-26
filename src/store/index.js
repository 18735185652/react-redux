import { createStore } from '../redux';
import  rootReducer from './reducers'


// 以后在创建仓库的时候 不需要传递默认状态了 ，reducer里面赋值
let store = createStore(rootReducer)

export default store