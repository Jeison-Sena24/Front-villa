import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/Usuarios/Usuarios.module.css";
import DataContext from "../../context/DataProvider";
import Alerta from "../../components/Alerta";

const Usuarios = () => {
  const { usuarios, setUsuarios } = useContext(DataContext);
  const [alerta, setAlerta] = useState({});
  const token = localStorage.getItem("token");

  const eliminarUsuario = async (cedula) => {
    try {
      const response = await fetch(
        `https://backend-villa-6z1c.onrender.com/eliminar/usuario/${cedula}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setAlerta({ msg: "Usuario eliminado correctamente", error: false });
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((u) => u.cedula !== cedula)
        );
      } else {
        console.error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  const { msg } = alerta;

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Usuarios</h2>

      <div className={styles.headerButtons}>
        <Link to="/dashboard/crear-usuario">
          <button className={styles.crearButton}>Crear Usuario</button>
        </Link>
      </div>
      {msg && <Alerta alerta={alerta} />}
      <div className={styles.tableContainer}>
        <table className={styles.usuariosTable}>
          <thead>
            <tr>
              <th className={styles.blueHeader}>Nombre</th>
              <th className={styles.blueHeader}>Apellido</th>
              <th className={styles.blueHeader}>Teléfono</th>
              <th className={styles.blueHeader}>Rol</th>
              <th className={styles.blueHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={usuario.cedula}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.rol}</td>
                <td>
                  <Link to={`/dashboard/editar-usuario/${usuario.cedula}`}>
                    <button className={styles.volverBoton}>Editar</button>
                  </Link>
                  <button
                    className={styles.volverBoton}
                    onClick={() => eliminarUsuario(usuario.cedula)}
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

export default Usuarios;
