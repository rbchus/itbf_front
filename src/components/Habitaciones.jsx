import { Trash2 } from 'lucide-react';


const Habitaciones = ({ hotel, EliminarHabitacion }) => {
  const confirmarEliminacion = (id) => {
    const confirmado = window.confirm('¿Está seguro que desea eliminar este registro?');
    if (confirmado) {
      EliminarHabitacion(id);
    }
  };

  return (
    <>
      <div className="detail-container">
        <h3>DETALLE HABITACIONES {hotel.nombre}</h3>
      </div>

      <div className="detail-container">
        <div className="txt-container txt">
          <strong>Total Habitaciones:</strong> {hotel.h_total}
        </div>
        <div className="txt-container txt">
          <strong>Asignadas:</strong> {hotel.habitaciones_asignadas}
        </div>
        <div className="txt-container txt">
          <strong>Faltan:</strong> {hotel.habitaciones_disponibles}
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Acomodación</th>
              <th>Cantidad</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            {hotel.detalle_habitaciones.map((detalle, index) => (
              <tr key={index}>
                <td>{detalle.tipo_habitacion}</td>
                <td>{detalle.acomodacion}</td>
                <td>{detalle.cantidad}</td>
                <td>
                   <Trash2
                    size={20}
                    color="red"
                    style={{ cursor: 'pointer' }}
                    onClick={() => confirmarEliminacion(detalle.id)}
                    title="Eliminar habitación"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Habitaciones;
