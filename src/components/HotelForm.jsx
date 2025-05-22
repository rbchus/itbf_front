// HotelForm.jsx
import { useEffect, useState } from 'react';

const HotelForm = ({ values, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    ciudad: '',
    direccion: '',
    nit: '',
    h_total: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (values) {
      setFormData({
        id: values.id || '',
        nombre: values.nombre || '',
        ciudad: values.ciudad || '',
        direccion: values.direccion || '',
        nit: values.nit || '',
        h_total: values.h_total || ''
      });
    }
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      if (!val.toString().trim()) {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={formData.id} />
      {['nombre', 'ciudad', 'direccion', 'nit', 'h_total'].map((field) => (
        <div className="form-group" key={field}>
          <label>{field === 'h_total' ? 'Habitaciones' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type={field === 'h_total' ? 'number' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
          {errors[field] && <span className="error">{errors[field]}</span>}
        </div>
      ))}

      <div className="modal-buttons">
        <button type="submit">Guardar Cambios</button>
      </div>
    </form>
  );
};

export default HotelForm;
