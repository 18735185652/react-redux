

function boundActionCreator(actionCreator,dispatch){
    return function(...args){
        // store.dispatch({type:ADD})
        console.log('this',this);
        dispatch(actionCreator.apply(this,args))
    }
}
/**
 * 
 * @param {*} actionCretors const actions={add,minus}
 * @param {*} dispatch  store.dispatch
 */
function bindActionCreators(actionCretors,dispatch){
    const boundActionCreators = {};
    for(const key in actionCretors){
        const actionCreator = actionCretors[key]; // add minus函数
        boundActionCreators[key] = boundActionCreator(actionCreator,dispatch)

    }
    return boundActionCreators
}

export default bindActionCreators;