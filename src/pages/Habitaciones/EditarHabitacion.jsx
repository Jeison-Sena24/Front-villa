import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../../css/Usuarios/EdiarUsuario.module.css";
import Alerta from "../../components/Alerta";

//Formulario para editar una habitacion
const EditarHabitacion = () => {
  const { numero } = useParams();
  const [formData, setFormData] = useState({
    numero: "",
    tipo: "",
    nivel: "",
    precio: "",
  });
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://backend-villa-6z1c.onrender.com/habitacion/${numero}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const habitacionData = await response.json();
          setFormData({
            numero: habitacionData.habitacion.numero || "",
            tipo: habitacionData.habitacion.tipo || "",
            nivel: habitacionData.habitacion.nivel || "",
            precio: habitacionData.habitacion.precio || "",
          });
        } else {
          console.error("Error al obtener la información de la habitación");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchData();
  }, [numero]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://backend-villa-6z1c.onrender.com/actualizar/habitacion/${numero}`,
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
          navigate("/dashboard/habitaciones"); // Redirigir al dashboard
        }, 3000);
      } else {
        console.error("Error al actualizar la habitación");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  const { msg } = alerta;

  return (
    <div className={styles.content}>
      <h1>Editar Habitación</h1>
      <Link to="/dashboard/habitaciones">
        <button className={styles.volverBoton}>Volver</button>
      </Link>
      {msg && <Alerta alerta={alerta} />}
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Información de la Habitación</h2>
          <div className={styles.formGroup}>
            <label>
              Número
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Tipo
              <input
                type="text"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Nivel
              <input
                type="text"
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Precio
              <input
                type="text"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.ContainerButton}>
            <button type="submit" className={styles.submitButton}>
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarHabitacion;
