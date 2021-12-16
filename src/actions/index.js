import countries from "../apiConfig/countries"
import _ from 'lodash'

export const paisesAuxiliares = (pais) => async (dispatch) => {
    _paisesAuxiliares(pais, dispatch)
}

const _paisesAuxiliares = _.memoize(async(pais, dispatch) => {
    let informacoes = []
    for (let i = 0; i < pais.length; i++) {
        const response = await countries.get(pais[i])
        informacoes.push(response)
    }
    dispatch({type:'INFORMACOES_COMPLEMENTARES', payload: informacoes})
})