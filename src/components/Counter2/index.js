import React from 'react';
import store from '../../store';
import {bindActionCreators} from '../../redux'
import actions from '../../store/actions/counter2';


// 绑定actionCreator,可以让你简写diapatch
const boundActions = bindActionCreators(actions,store.dispatch)
class Counter2 extends React.Component {
    state = { number: store.getState().counter2.number }

    // 加载完成后 订阅this.state，react自带状态更新会触发render渲染
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ number: store.getState().counter2.number })
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>

                {/* <button onClick={() => { store.dispatch({ type: ADD, payload: 1 }) }}> + </button>
                <button onClick={() => { store.dispatch({ type: MINUS, payload: 1 }) }}> - </button> */}
               
                {/* <button onClick={() => {store.dispatch(add(1))}}> + </button>
                <button onClick={() => { store.dispatch(minus(1))}}> - </button> */}

                <button onClick={() => {boundActions.add2(1)}}> + </button>
                <button onClick={() => {boundActions.minus2(1)}}> - </button>
            </div>
        )
    }
}

export default Counter2