

import { useState } from 'react';
import { useHoteles } from "../hooks/useHoteles";

export default function HabitacionForm({ hotelId, onSubmit }) {
 console.log ("hotelId" , hotelId)
const [acomodaciones, setAcomodaciones] = useState([]);
const [form, setForm] = useState({ hotel_id: hotelId, h_id:'',a_id:'',cantidad:'' });

 const {
    tipos, 
    combinaciones, 
    loading, 
    error,
  } = useHoteles();



  const handleTipoChange = (e) => {
    const h_id = e.target.value;
    setForm(prev => ({ ...prev, h_id, a_id: '' }));
    const acoms = combinaciones.filter(c => c.h_id == h_id);
    setAcomodaciones(acoms.map(c => ({ id: c.a_id, descripcion: c.acomodacion })));
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      onSubmit({ ...form, hotel_id: hotelId, h_id: parseInt(form.h_id), a_id: parseInt(form.a_id), cantidad: parseInt(form.cantidad) });
  };

  return (
    <form onSubmit={handleSubmit}>
        <input type="hidden" name="hotel_id" value={hotelId} />
      <select name="h_id" value={form.h_id} onChange={handleTipoChange} required>
        <option value="">Seleccione tipo de habitación</option>
        {tipos.map(t => <option key={t.id} value={t.id}>{t.tipo}</option>)}
      </select>

      <select name="a_id" value={form.a_id} onChange={handleChange} required disabled={!form.h_id}>
        <option value="">Seleccione acomodación</option>
        {acomodaciones.map(a => <option key={a.id} value={a.id}>{a.descripcion}</option>)}
      </select>

      <input type="number" name="cantidad" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} required />

      <button type="submit" className="btn btn-success">Guardar habitación</button>
    </form>
  );
}
