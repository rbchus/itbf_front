import axios from 'axios';
const api = import.meta.env.VITE_API_BASE_URL;

export async function getHotelesDetalle() {
  try {
    const { data } = await axios.get(`${api}/hoteles/habitaciones/detalle`);
    console.log('Respuesta de getHotelesDetalle:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener hoteles:', error.response?.data || error.message);
    return []; 
  }
}

export async function updateHotel(id, hotel) {
  try {
    const { data } = await axios.put(`${api}/hoteles/${id}`, hotel);
    console.log('Respuesta de updateHotel:', data);
    return data;
  } catch (error) {
    console.error('Error al actualizar hotel:', error.response?.data || error.message);
     const errData = error.response?.data || { message: error.message };
    return errData; // en caso de error
  }
}


export async function createHotel(hotel) {
  try {
    const { data } = await axios.post(`${api}/hoteles`, hotel);
    console.log('Respuesta de addHotel:', data);
    return data;
  } catch (error) {
    console.error('Error al crear hotel:', error.response?.data || error.message);
     const errData = error.response?.data || { message: error.message };
    return errData; // en caso de error
  }
}


export async function deleteHotel(id) {
  try {
    const { data } = await axios.delete(`${api}/hoteles/${id}`);
    console.log('Respuesta de deleteHotel:', data);
    return data;
  } catch (error) {
    console.error('Error al borrar hotel:', error.response?.data || error.message);
     const errData = error.response?.data || { message: error.message };
    return errData; // en caso de error
  }
}


export async function addHabitacion(hotelId, habitacion) {
  const { data } = await axios.post(`${api}/api/hoteles/${hotelId}/habitaciones`, habitacion);
  return data;
}

export async function updateHabitacion(hotelId, habitacionId, habitacion) {
  const { data } = await axios.put(`${api}/api/hoteles/${hotelId}/habitaciones/${habitacionId}`, habitacion);
  return data;
}

export async function deleteHabitacion(hotelId, habitacionId) {
  const { data } = await axios.delete(`${api}/api/hoteles/${hotelId}/habitaciones/${habitacionId}`);
  return data;
}

export { addHabitacion as createHabitacion };

