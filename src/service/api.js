import axios from 'axios'

const URL='https://new-api.spottroop.com'

export const getAllSensors=async()=>{
     const res=await axios.get(`${URL}/sensor/getAllSensors`)
     return res.data;
}
export const addNewSensor=async(sensor)=>{
     const res=await axios.post(`${URL}/sensor`,sensor)
    console.log(res.data)
}
