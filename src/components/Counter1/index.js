import React from 'react';
import actions from '../../store/actions/counter1';
import {useDispatch,useSelector} from '../../react-redux'

const Counter1 = () =>{
    const state = useSelector(state=>state.counter1) 
    const dispatch = useDispatch(); // store.dispatch
    return (
        <div>
            <p>{state.number}</p>

            <button onClick={() => {dispatch({type:'ADD1',payload:1})}}> + </button>
            <button onClick={() => {dispatch({type:'MINUS1',payload:1})}}> - </button>
        </div>
    )
}


export default Counter1