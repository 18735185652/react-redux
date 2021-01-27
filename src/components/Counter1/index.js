import React from 'react';
import actions from '../../store/actions/counter1';
import {connect} from '../../react-redux'

class Counter1 extends React.Component {
    
    render() {
        const {number} = this.props;
        return (
            <div>
                <p>{number}</p>

                <button onClick={() => {this.props.add1(1)}}> + </button>
                <button onClick={() => {this.props.minus1(1)}}> - </button>
            </div>
        )
    }
}
//这是一个映射函数 可以把仓库的状态进行映射出来分状态，分状态会成为组件的属性对象
let mapStateToProps = state => state.counter1;
// actions也会进行绑定 成为当前组件的属性对象
export default connect(mapStateToProps,actions)(Counter1);

/**
 * connect 负责把仓库和组件进行关联
 * 通过context获取store 
 */