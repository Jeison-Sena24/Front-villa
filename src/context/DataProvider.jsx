// DataProvider.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [huespedes, setHuespedes] = useState([]);
  const [reservaciones, setReservaciones] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      obtenerInfoUsuarios();
      obtenerInfoHabitaciones();
      obtenerInfoHuespedes();
      obtenerInfoReservaciones();
    }
  }, [token]);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return null;
    }
  };

  const obtenerInfoUsuarios = async () => {
    const data = await fetchData(
      "https://backend-villa-6z1c.onrender.com/usuarios"
    );
    if (data) setUsuarios(data.usuarios || []);
  };

  const obtenerInfoHabitaciones = async () => {
    const data = await fetchData(
      "https://backend-villa-6z1c.onrender.com/habitaciones"
    );
    if (data) setHabitaciones(data.habitaciones || []);
  };

  const obtenerInfoHuespedes = async () => {
    const data = await fetchData(
      "https://backend-villa-6z1c.onrender.com/huespedes"
    );
    if (data) setHuespedes(data.huespedes || []);
  };

  const obtenerInfoReservaciones = async () => {
    const data = await fetchData(
      "https://backend-villa-6z1c.onrender.com/reservas"
    );
    if (data) setReservaciones(data.reservaciones || []);
  };

  return (
    <DataContext.Provider
      value={{
        usuarios,
        setUsuarios,
        habitaciones,
        setHabitaciones,
        huespedes,
        setHuespedes,
        reservaciones,
        setReservaciones,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
