import { useState, useEffect } from "react";
import styles from "../css/Contabilidad.module.css";

const Contabilidad = () => {
  const [ingresos, setIngresos] = useState([]);
  const token = localStorage.getItem("token");

  const obtenerIngresosTotales = async () => {
    try {
      if (!token) {
        throw new Error("Token no disponible");
      }

      const response = await fetch(
        "https://backend-villa-6z1c.onrender.com/obtener-ingresos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los ingresos");
      }

      const data = await response.json();
      setIngresos(data.ingresos);
    } catch (error) {
      console.error("Error al obtener ingresos totales:", error);
    }
  };

  useEffect(() => {
    obtenerIngresosTotales();
  }, [token]);

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Ingresos Totales</h2>

      <div className={styles.tableContainer}>
        <table className={styles.ingresosTable}>
          <thead>
            <tr>
              <th className={styles.blueHeader}>Fecha</th>
              <th className={styles.blueHeader}>Total Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {ingresos.map((ingreso, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{new Date(ingreso.fecha).toLocaleDateString()}</td>
                <td>{ingreso.ingreso_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contabilidad;
