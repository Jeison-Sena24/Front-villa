import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../css/Usuarios/CrearUsuario.module.css";
import Alerta from "../../components/Alerta";

//Formulario para editar una reservacion
const ActualizarReserva = () => {
  const { id } = useParams(); // Obtén el ID de la reserva desde los parámetros de la URL
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    huesped_id: "",
    habitacion_id: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  const [huespedes, setHuespedes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await fetch(
          `https://backend-villa-6z1c.onrender.com/reserva/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFormData({
            huesped_id: data.reserva.huesped_id || "",
            habitacion_id: data.reserva.habitacion_id || "",
            fecha_inicio: data.reserva.fecha_inicio.split("T")[0] || "", // Solo la fecha
            fecha_fin: data.reserva.fecha_fin.split("T")[0] || "", // Solo la fecha
          });
        } else {
          console.error("Error al obtener la reserva");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    const fetchHuespedes = async () => {
      try {
        const response = await fetch(
          "https://backend-villa-6z1c.onrender.com/huespedes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setHuespedes(data.huespedes || []);
      } catch (error) {
        console.error("Error al obtener información de los huéspedes:", error);
      }
    };

    const fetchHabitaciones = async () => {
      try {
        const response = await fetch(
          "https://backend-villa-6z1c.onrender.com/habitaciones",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setHabitaciones(data.habitaciones || []);
      } catch (error) {
        console.error(
          "Error al obtener información de las habitaciones:",
          error
        );
      }
    };

    fetchReserva();
    fetchHuespedes();
    fetchHabitaciones();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://backend-villa-6z1c.onrender.com/actualizar/reserva/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setAlerta({
          msg: "Habitacion actualizada correctamente",
          error: false,
        });
        setTimeout(() => {
          navigate("/dashboard/reservas");
        }, 3000);
      } else {
        const responseData = await response.json();
        console.error("Error al actualizar la reserva:", responseData.error);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  const { msg } = alerta;

  return (
    <div className={styles.content}>
      <h1>Actualizar Reserva</h1>
      <Link to="/dashboard/reservas">
        <button className={styles.volverBoton}>Volver</button>
      </Link>
      {msg && <Alerta alerta={alerta} />}
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Información de la Reserva</h2>
          <div className={styles.formGroup}>
            <label>
              Huésped
              <select
                name="huesped_id"
                value={formData.huesped_id}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Seleccione un huésped
                </option>
                {huespedes.map((huesped) => (
                  <option key={huesped.id} value={huesped.id}>
                    {huesped.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Habitación
              <select
                name="habitacion_id"
                value={formData.habitacion_id}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Seleccione una habitación
                </option>
                {habitaciones.map((habitacion) => (
                  <option key={habitacion.numero} value={habitacion.numero}>
                    Numero: {habitacion.numero} - {habitacion.nivel}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Fecha de Inicio
              <input
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Fecha de Fin
              <input
                type="date"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.ContainerButton}>
            <button type="submit" className={styles.submitButton}>
              Actualizar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarReserva;
