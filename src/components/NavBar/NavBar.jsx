import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = ({ menuItems = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarHeading}>
        <div className={styles.siteName}>GetRevised</div>
        <div className={styles.authButtons}>
          <button className={styles.authButton}>Sign In</button>
        </div>
      </div>
      <button
        className={styles.hamburgerIcon}
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-controls="menu"
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>
      {menuOpen && (
        <div id="menu" className={styles.menuOptions}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={styles.menuLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default React.memo(NavBar);