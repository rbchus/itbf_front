import { useEffect, useState } from "react";
import { createHabitacion, getCombinacionesValidada, removeHabitacion } from "../services/habitacionesService";
import { createHotel, deleteHotel, getHotelesDetalle, updateHotel } from "../services/hotelesService";

export function useHoteles() {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(true);
  const [status, setStatus] = useState(true);
  const [flag, setFlag] = useState(true);
  const [tipos, setTipos] = useState([]);
  const [combinaciones, setCombinaciones] = useState([]);

  const fetchHoteles = async () => {
    setLoading(true);
    try {
      const data = await getHotelesDetalle();
      setHoteles(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Error cargando hoteles");
    } finally {
      setLoading(false);
    }
  };

    const handleHotelUpdate = async (updatedHotel) => {
    setLoading(true);
    try {
      const data = await updateHotel(updatedHotel.id, updatedHotel);
      console.log ("mensaje" , data.mensaje)
      console.log ("status" , data.status)
      setMensaje(data.mensaje)
      setStatus(data.status)
      setFlag(false)
      await fetchHoteles();
      setError(null);
    } catch (err) {
     const errData = err.response?.data || { message: error.message };
   
    } finally {
      setLoading(false);
    }
  };


  const  handleHotelcreate = async (hotel) => {
    setLoading(true);
    try {
      const data = await createHotel(hotel);
      console.log ("mensaje" , data.mensaje)
      console.log ("status" , data.status)
      setMensaje(data.mensaje)
      setStatus(data.status)
      setFlag(false)
      await fetchHoteles();
      setError(null);
    } catch (err) {
     const errData = err.response?.data || { message: error.message };
   
    } finally {
      setLoading(false);
    }
  }


   const handleHoteldelete = async (id) => {
    setLoading(true);
    try {
      const data = await deleteHotel(id);
      console.log ("mensaje" , data.mensaje)
      console.log ("status" , data.status)
      setMensaje(data.mensaje)
      setStatus(data.status)
      setFlag(false)
      await fetchHoteles();
      setError(null);
    } catch (err) {
     const errData = err.response?.data || { message: error.message };
   
    } finally {
      setLoading(false);
    }
  }

// habitaciones 
const fetchCombinacionesValidadas = async () => {
    setLoading(true);
    try {
      const data = await getCombinacionesValidada();
      setCombinaciones(data);
        const tiposUnicos = [...new Map(data.map(item => [item.h_id, item.tipo])).entries()];
        setTipos(tiposUnicos.map(([id, tipo]) => ({ id, tipo })));
        setError(null);
    } catch (err) {
      setError(err.message || "Error cargando habitaciones");
    } finally {
      setLoading(false);
    }
  };


  const  handlecreateHabitacion = async (habitacion) => {
      
      setLoading(true);
      try {
        const data = await createHabitacion(habitacion);
        console.log ("mensaje" , data.mensaje)
        console.log ("status" , data.status)
        setMensaje(data.mensaje)
        setStatus(data.status)
        setFlag(false)
        await fetchHoteles();
        setError(null);
      } catch (err) {
       const errData = err.response?.data || { message: error.message };
     
      } finally {
        setLoading(false);
      }
    }


    const  handleremoveHabitacion = async (id) => {
      
      setLoading(true);
      try {
        const data = await removeHabitacion(id);
        console.log ("mensaje" , data.mensaje)
        console.log ("status" , data.status)
        setMensaje(data.mensaje)
        setStatus(data.status)
        setFlag(false)
        await fetchHoteles();
        setError(null);
      } catch (err) {
       const errData = err.response?.data || { message: error.message };
     
      } finally {
        setLoading(false);
      }
    }


  useEffect(() => {
    fetchHoteles();
    fetchCombinacionesValidadas();
  }, []);

  return { hoteles, loading, error, mensaje, status, flag, tipos, combinaciones,  handleHotelcreate, handleHoteldelete, fetchHoteles, handleHotelUpdate , handlecreateHabitacion, handleremoveHabitacion};
}
