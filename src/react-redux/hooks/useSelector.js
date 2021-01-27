import React, { useReducer, useEffect } from 'react';
import ReactReduxContext from '../ReactReduxContext'


function useSelectorWithStore(selector, store) {
    let state = store.getState(); // 获取总状态
    let selectedState = selector(state); // 获取分状态
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    useEffect(() => {
        return store.subscribe(forceUpdate) // 订阅
    })
    return selectedState
}

function useSelector(selector) {
    const { store } = React.useContext(ReactReduxContext)
    const selectedState = useSelectorWithStore(selector, store)
    return selectedState;
}

export default useSelector;