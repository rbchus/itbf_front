// HotelForm.jsx
import { useEffect, useState } from 'react';

const HotelFormInput = ({  onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    ciudad: '',
    direccion: '',
    nit: '',
    h_total: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
   
      setFormData({
        nombre:  '',
        ciudad:  '',
        direccion:  '',
        nit:  '',
        h_total:  ''
      });
    
  }, []);

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
      {['nombre', 'ciudad', 'direccion', 'nit', 'h_total'].map((field) => (
        <div className="form-group" key={field}>
          <label>{field === 'h_total' ? 'Habitaciones' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type={field === 'h_total' ? 'number' : 'text'}
            name={field}
            onChange={handleChange}
          />
          {errors[field] && <span className="error">{errors[field]}</span>}
        </div>
      ))}

      <div className="modal-buttons">
        <button type="submit">Crear Hotel</button>
      </div>
    </form>
  );
};

export default HotelFormInput;
