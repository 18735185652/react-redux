import React from 'react';
import { createStore ,bindActionCreators} from '../../redux';

const ADD = 'ADD';
const MINUS = 'MINUS';


// reducer是一个纯函数 
function reducer(oldState = { number: 0 }, action) {
    switch (action.type) { // 判断动作的类型
        case ADD:
            return { number: oldState.number + action.payload };
        case MINUS:
            return { number: oldState.number - action.payload };
        default:
            return oldState;
    }
}


let store = createStore(reducer, { number: 0 })
function add(payload){
    return {type:ADD,payload}
}
function minus(payload){
    return {type:MINUS,payload}
}
// 创建一个actionCreator对象
const actions ={add,minus}
// 绑定actionCreator
const boundActions = bindActionCreators(actions,store.dispatch)
class Counter1 extends React.Component {
    state = { number: store.getState().number }

    // 加载完成后 订阅this.state，react自带状态更新会触发render渲染
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ number: store.getState().number })
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        console.log('  store', store.getState());
        return (
            <div>
                <p>{this.state.number}</p>

                {/* <button onClick={() => { store.dispatch({ type: ADD, payload: 1 }) }}> + </button>
                <button onClick={() => { store.dispatch({ type: MINUS, payload: 1 }) }}> - </button> */}
                {/* <button onClick={() => {store.dispatch(add(1))}}> + </button>
                <button onClick={() => { store.dispatch(minus(1))}}> - </button> */}
                <button onClick={() => {boundActions.add(1)}}> + </button>
                <button onClick={() => {boundActions.minus(1)}}> - </button>
            </div>
        )
    }
}

export default Counter1