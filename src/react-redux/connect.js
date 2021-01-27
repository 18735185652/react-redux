import React, { useContext, useReducer } from 'react';
import ReactReduxContext from './ReactReduxContext';
import { bindActionCreators } from '../redux'
/**
 * 把组件和仓库进行关联
 * @param {*} mapStateToProps 把仓库的状态映射为属性
 * @param {*} mapDispatchToProps 把store.dispatch方法映射为属性
 */

// 函数组件的实现
function connect(mapStateToProps, mapDispatchToProps) {
    // HOC 接收一个组件返回一个组件
    return function (OldComponent) {
        return function (props) { // ReactDom.render的时候渲染这个
            const { store } = useContext(ReactReduxContext)
            const state = store.getState(); //获取仓库中的总状态
            const [, forceUpdate] = useReducer(x => x + 1, 0) // fourceUpdate 强行让组件更新
            //里面可以编写一个订阅 订阅仓库中状态变化事件 仓库中的状态发生变化后可以调用fourceUpdate渲染组件
            React.useEffect(() => {
                return store.subscribe(forceUpdate)
            }, [store])
            // let mapStateToProps = state => state.counter1;
            const stateProps = mapStateToProps(state) //把返回的对象当成了OldComponent组件的属性
            let dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);

            return <OldComponent {...props} {...stateProps} {...dispatchProps} />
        }
    }
}

// 类组件的实现
function connect2(mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return class extends React.Component {
            static contextType = ReactReduxContext;

            componentDidMount() {
                this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate())
            }
            componentWillUnmount() {
                this.unsubscribe();
            }

            render() {
                const { store } = this.context;
                const state = store.getState();
                const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);

                const newState = mapStateToProps(state, dispatchProps)
                return <OldComponent {...this.props} {...newState} {...dispatchProps} />
            }
        }
    }
}

export default connect2