import { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../context/DataProvider";
import styles from "../../css/Usuarios/Usuarios.module.css";

const Huespedes = () => {
  const { huespedes, setHuespedes } = useContext(DataContext);

  const eliminarHuesped = async (id) => {
    try {
      const response = await fetch(
        `https://backend-villa-6z1c.onrender.com/eliminar/huesped/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        console.log("Huésped eliminado exitosamente");
        setHuespedes((prev) => prev.filter((huesped) => huesped.id !== id));
      } else {
        console.error("Error al eliminar el huésped");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Huéspedes</h2>
      <div className={styles.headerButtons}>
        <Link to="/dashboard/registrar-huesped">
          <button className={styles.crearButton}>Crear Huésped</button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.usuariosTable}>
          <thead>
            <tr>
              <th className={styles.blueHeader}>Nombre</th>
              <th className={styles.blueHeader}>Apellido</th>
              <th className={styles.blueHeader}>Teléfono</th>
              <th className={styles.blueHeader}>Correo</th>
              <th className={styles.blueHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {huespedes.map((huesped, index) => (
              <tr
                key={huesped.id}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{huesped.nombre}</td>
                <td>{huesped.apellido}</td>
                <td>{huesped.telefono}</td>
                <td>{huesped.correo}</td>
                <td>
                  {/* Puedes agregar enlaces para editar o eliminar huéspedes aquí */}
                  <Link to={`/dashboard/editar-huesped/${huesped.id}`}>
                    <button className={styles.volverBoton}>Editar</button>
                  </Link>
                  <button
                    className={styles.volverBoton}
                    onClick={() => eliminarHuesped(huesped.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Huespedes;
