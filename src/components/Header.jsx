import { Link } from "react-router-dom";
import styles from "../css/modules/Header.module.css"; // Asegúrate de usar la ruta correcta
import logo from "../assets/icon.png";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { auth, cerrarSesion } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/dashboard" className={styles.logo}>
          <div className={styles.logoContainer}>
            {/* Logo de la pagina */}
            <img src={logo} alt="Logo" className={styles.logoImage} />
            <h2>Villa Fanny</h2>
          </div>
        </Link>
        {/* Nombre del usuario con su rol */}
        <div className={styles.userInfo}>
          {auth.nombre && (
            <p className={styles.userName}>
              {auth.nombre} {auth.apellido}
              <span className={styles.roleBadge}>{auth.rol}</span>{" "}
            </p>
          )}
        </div>
        {/* Boton de cerrar sesion */}
        <nav className={styles.nav}>
          <button
            type="button"
            className={styles.logout}
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
