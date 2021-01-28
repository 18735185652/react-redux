import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './react-redux'
import Counter1 from './components/Counter1'
import Counter2 from './components/Counter2'
import store from './store'
// console.log('store: ', store);

store.subscribe(() => console.log('store', store.getState()));

// redux-promise

store.dispatch(new Promise((resolve)=>{
    setTimeout(()=>{
        resolve({
          type:'ADD1',
          payload:1
        })
    })
}))


// retux-thunx
// console.log('store',store);
// store.dispatch(({dispatch}) => {
//   setTimeout(() => {
//     dispatch({ type: 'MINUS1', payload: 1 })
//   })
// })



//Provider 的原理就是context
ReactDOM.render(
  <Provider store={store}>
    <Counter1 />
    <Counter2 />
  </Provider>,
  document.getElementById('root')
);


