import {useState} from 'react';
import styles from './navBar.module.css';

const NavBar: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className={styles.navRoot}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <span className={styles.appName}>BookFinder</span>
                </div>

                <button
                    className={styles.burger}
                    aria-label="Toggle navigation"
                    aria-expanded={open}
                    onClick={() => setOpen(o => !o)}
                >
                    <span/>
                    <span/>
                    <span/>
                </button>

                <ul className={`${styles.links} ${open ? styles.open : ''}`}>
                    <li><a className={styles.link} href="/">Inicio</a></li>
                    <li><a className={styles.link} href="/biblioteca">Biblioteca</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;