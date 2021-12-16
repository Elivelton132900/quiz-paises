/* eslint-disable import/no-anonymous-default-export */
export default (state = [], action) => {
    switch (action.type) {
        case 'INFORMACOES_COMPLEMENTARES':
            return action.payload
        default:
            return state
    }
}