import axios from "axios"
const URL = process.env.REACT_APP_API_URL + '/api/requests'

const getRequest = async (foodId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(URL+`/${foodId}`)
    const res = await axios.get(URL+`/${foodId}`, config)
    return res.data
}

const makeRequest = async (requestData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(URL,requestData, config)
    return res.data
}

export const requestService = {
    getRequest,
    makeRequest
}