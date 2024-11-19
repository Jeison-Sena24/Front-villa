import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../css/Usuarios/CrearUsuario.module.css";
import Alerta from "../../components/Alerta";

//Formulario para registrar un huesped
const CrearHuesped = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
  });
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://backend-villa-6z1c.onrender.com/registrar/huesped",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setAlerta({ msg: "Huesped creado correctamente", error: false });
        setTimeout(() => {
          navigate("/dashboard/huespedes");
        }, 3000);
      } else {
        console.error("Error al registrar al huésped");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  const { msg } = alerta;

  return (
    <div className={styles.content}>
      <h1>Registrar Huésped</h1>
      <Link to="/dashboard/huespedes">
        <button className={styles.volverBoton}>Volver</button>
      </Link>
      {msg && <Alerta alerta={alerta} />}
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Información del Huésped</h2>
          <div className={styles.formGroup}>
            <label>
              Nombre
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Apellido
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Teléfono
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Correo
              <input
                type="text"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.ContainerButton}>
            <button type="submit" className={styles.submitButton}>
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearHuesped;
