import React from 'react';
import ReactReduxContext from './ReactReduxContext';

function Provider(props){
    const value = props.store;
    
    // Provider 的下层组件都可以通过ReactReduxContext获取value值
    return (
        <ReactReduxContext.Provider value={{store:value}}>
            {props.children}
        </ReactReduxContext.Provider>
    )
}

export default Provider;