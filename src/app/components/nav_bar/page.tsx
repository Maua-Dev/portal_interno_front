import styles from "./nav_bar.module.css";
import {FaChevronDown} from "react-icons/fa"

export default function NavBar() {
    const linksList = [
        {
            id: 1,
            text: "Contatos",
            url: "contatos",
        },
        {
            id: 1,
            text: "Abrir denuncia",
            url: "Abrir denuncia",
        },
        {
            id: 1,
            text: "Planilha excel",
            url: "Planilha excel",
        },
    ]

    return (
        <div className={styles.main}>
            <div className={styles.logo}>
                <h1>D</h1>
                <div>
                    <h2>ev</h2>
                    <h3>community</h3>
                </div>
            </div>
            <div className={styles.links}>
                    {linksList.map((link) => {
                            return (
                                <button>
                                    <p className={styles.inside_button}>
                                        {link.text}
                                        <FaChevronDown className={styles.icon}/>
                                    </p>
                                </button>
                            );
                        })
                    }
            </div>
        </div>
    );
}

