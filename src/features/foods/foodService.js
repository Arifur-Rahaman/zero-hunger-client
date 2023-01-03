import axios from "axios"
const URL = process.env.REACT_APP_API_URL + '/api/foods'

const createFood = async (foodData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(URL, foodData, config)
    return res.data
}

const getFood = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL, config)
    return res.data
}
const getUserFoods = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL+'/my', config)
    return res.data
}

export const foodService = {
    createFood,
    getFood,
    getUserFoods,
}