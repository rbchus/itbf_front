
import axios from 'axios';
const api = import.meta.env.VITE_API_BASE_URL;


export async function getCombinacionesValidada() {
  try {
    const { data } = await axios.get(`${api}/habitaciones/combinaciones-validas`);
    console.log('Respuesta de combinaciones validas:', data);
    return data;
  } catch (error) {
    console.error('Error en combinaciones validas:', error.response?.data || error.message);
    return []; 
  }
}

export async function createHabitacion(habitacion) {
  console.log ("service" ,habitacion )
  try {
    const { data } = await axios.post(`${api}/habitaciones`, habitacion);
    console.log('Respuesta de addHotel:', data);
    return data;
  } catch (error) {
    console.error('Error al crear habitacion:', error.response?.data || error.message);
     const errData = error.response?.data || { message: error.message };
    return errData; // en caso de error
  }
}

export async function removeHabitacion(id) {
  console.log ("service" ,id )
  try {
    const { data } = await axios.delete(`${api}/habitaciones/${id}`);
    console.log('Respuesta de removeHabitacion:', data);
    return data;
  } catch (error) {
    console.error('Error al elimniar habitacion:', error.response?.data || error.message);
     const errData = error.response?.data || { message: error.message };
    return errData; // en caso de error
  }
}


export async function getHabitaciones() {
  const res = await fetch(`${api}/habitaciones`);
  if (!res.ok) throw new Error("No se pudo obtener habitaciones");
  return await res.json();
}



export async function updateHabitacion(id, habitacion) {
  const res = await fetch(`${api}/habitaciones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habitacion),
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.mensaje || "Error actualizando habitación");
  }
  return await res.json();
}

export async function deleteHabitacion(id) {
  const res = await fetch(`${api}}/habitaciones/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.mensaje || "Error eliminando habitación");
  }
  return true;
}
