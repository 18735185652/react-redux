import {ADD1,MINUS1} from '../action-types'

const actions = {
    add1(payload) {
        return { type: ADD1, payload }
    },
    minus1(payload) {
        return { type: MINUS1, payload }
    }
}

export default actions