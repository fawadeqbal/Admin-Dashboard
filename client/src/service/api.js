import axios from 'axios'

// const URL='https://api-spottroop.onrender.com'
const URL='https://new-api.spottroop.com'

export const getAllSensors=async()=>{
     // const res=await axios.get(`${URL}/sensor`)
     const res=await axios.get(`${URL}/sensor/getAllSensors`)
     return res.data;
}
export const addNewSensor=async(sensor)=>{
     // const res=await axios.post(`${URL}/sensor`,sensor)
     const res=await axios.post(`${URL}/sensor/postSensor`,sensor)
    console.log(res.data)
}
// export const deleteSensor = async (id)=>{
//      const res= await axios.delete(`${URL}/sensor/${id}`)
//      console.log(res.data)
// }

export const updateSensor = async (sensor)=>{
     const res= await axios.put(`${URL}/sensor/updateSensors/${sensor._id}`,sensor)
     console.log(res.data)
}

export const updateSensorStatus = async (id,newStatus)=>{
     
     const res=await axios.put(`${URL}/sensor/updateSensorStatus/${id}`,newStatus)
     console.log(res.data)
}
