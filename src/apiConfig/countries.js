import axios from 'axios'

// https://restcountries.com/v3.1/all

export default axios.create({
    baseURL: 'https://restcountries.com/v3.1/name/'
})