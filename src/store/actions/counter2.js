import {ADD2,MINUS2} from '../action-types'

const actions = {
    add2(payload) {
        return { type:ADD2, payload }
    },
    minus2(payload) {
        return { type: MINUS2, payload }
    }
}

export default actions