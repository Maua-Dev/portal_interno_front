import styles from "./nav_bar.module.css";

export default function NavBar() {
    return (
        <div className={styles.main}>
            <div className={styles.logo}>
                <h1>D</h1>
                <div>
                    <h2>ev</h2>
                    <h3>community</h3>
                </div>
                
            </div>
        </div>
    );
}