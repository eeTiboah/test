import axios from 'axios'

const url = "https://api.mocki.io/v1/370a6768"

export const fetchCompanies = async() => {
    const {data} = await axios.get(url)
    // console.log(data)
    return data
}