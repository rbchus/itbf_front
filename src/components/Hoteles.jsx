import { Trash2 } from 'lucide-react'; // Si usas Lucide (instálalo con `npm install lucide-react`)
import { useState } from "react";
import { useHoteles } from "../hooks/useHoteles";

import "./Hoteles.css";

import Habitaciones from "./Habitaciones";
import HabitacionForm from "./HabitacionForm";
import HotelForm from "./HotelForm";
import HotelFormInput from "./HotelFormInput";
import Loading from "./Loading";

function Hoteles() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [activeSection, setActiveSection] = useState("Editar");

  const {
    hoteles,
    loading,
    error,
    handleHotelUpdate,
    handleHotelcreate,
    mensaje,
    status,
    flag,
    handlecreateHabitacion,
    handleremoveHabitacion,
    handleHoteldelete
  } = useHoteles();


  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  if (!hoteles || hoteles.status !== "success") {
    return <p>No hay datos disponibles o ocurrió un error.</p>;
  }


  const handleOpenModal = (hotel) => {
    setSelectedHotel(hotel);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
    setModalVisible(false);
  };

    const confirmarEliminacionhHotel = (id) => {
      console.log (" id ", id)
    const confirmado = window.confirm('¿Está seguro que desea eliminar este registro?', id);
    if (confirmado) {
      handleHoteldelete(id); // Envia al componente padre
      handleCloseModal();
    }
  };

  const handleFormSubmit = (formData) => {
    console.log("Datos a enviar desde el modal:", formData);
    handleHotelUpdate(formData); // Envia al componente padre
    handleCloseModal();
  };

  const handleFormSubmitInput = (formData) => {
    console.log("Datos a enviar desde el modal:", formData);
    handleHotelcreate(formData); // Envia al componente padre
    handleCloseModal();
  };

   const handleFormHabitacion = (formData) => {
    console.log("Datos a enviar desde el modal FormHabitacion :", formData);
     handlecreateHabitacion(formData); // Envia al componente padre
     handleCloseModal();
  };

   const handleEliminarHabitacion = (id) => {
    console.log("Datos a enviar desde el modal handleEliminarHabitacion :", id);
     handleremoveHabitacion(id); // Envia al componente padre
     handleCloseModal();
  };
  

  return (
    <div className="hoteles-container">
      <div className={`titulo ${flag ? hoteles.status : status}`}>
        {flag ? hoteles.mensaje : `${mensaje}`}
      </div>
      <div className="card-container">
        {hoteles.datos.map((hotel) => (
          <div key={hotel.id} className="card">
            <div className="txt-container titulo">{hotel.nombre}</div>

            <div className="txt-container txt">
              <strong>Ciudad:</strong> {hotel.ciudad}
            </div>
            <div className="txt-container txt">
              <strong>Dirección:</strong> {hotel.direccion}
            </div>
            <div className="txt-container txt">
              <strong>Total Habitaciones:</strong> {hotel.h_total}
            </div>
            <div className="txt-container txt">
              <strong>Asignadas:</strong> {hotel.habitaciones_asignadas}
            </div>
            <div className="txt-container txt">
              <strong>Faltan:</strong> {hotel.habitaciones_disponibles}
            </div>
            <div className="btn-container">
              <button onClick={() => handleOpenModal(hotel)}>
                + Detalles 
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-tabs">
              
              <button onClick={() => setActiveSection("Editar")}>
                Datos Hotel (editar)
              </button>
              <button onClick={() => setActiveSection("habitaciones")}>
                Detalle Habitaciones
              </button>
            </div>

            {activeSection === "Editar" && (
              <>
                <div className="detail-container ">  
                <h3>Datos Hotel</h3>
                <button className="btn btn-success" onClick={() => setActiveSection("Agregar")}>
                Agregar Hotel
              </button>
              <div>
                   <Trash2
                    size={20}
                    color="red"
                    style={{ cursor: 'pointer' }}
                    onClick={() => confirmarEliminacionhHotel(selectedHotel.id)}
                    title="Eliminar habitación"
                  />
                </div>

              </div>

                <HotelForm values={selectedHotel} onSubmit={handleFormSubmit} />
              </>
            )}

            {activeSection === "Agregar" && (
              <div>
                <h3>Agregar Hotel</h3>
                
                <HotelFormInput onSubmit={handleFormSubmitInput} />
              </div>
            )}

            {activeSection === "habitaciones" && (
              <div>
                <Habitaciones hotel={selectedHotel}  EliminarHabitacion={handleEliminarHabitacion}  /><br/>
               <HabitacionForm hotelId={selectedHotel.id} onSubmit={handleFormHabitacion}  />
              </div>
            )}
            <button className="modal-close" onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hoteles;
