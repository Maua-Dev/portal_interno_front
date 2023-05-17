import styles from "./nav_bar.module.css";
import {FaChevronDown, FaRegBell, FaRegQuestionCircle, FaRegUser} from "react-icons/fa"
import { url } from "inspector";

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

    const iconsList = [
        {
            id: 1,
            icon_name: <FaRegBell className={styles.bell} />,
            url: "",
        },
        {
            id: 2,
            icon_name: <FaRegQuestionCircle className={styles.question} />,
            url: "",
        },
        {
            id: 3,
            icon_name: <FaRegUser className={styles.bigger}/>,
            url: "",
        }
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
                                        <FaChevronDown className={styles.arrow_down}/>
                                    </p>
                                </button>
                    );})}
            </div>
            <div className={styles.right_side}>
                {iconsList.map((icon) => {
                    return (
                        <>{icon.icon_name}</>
                    );
                })}
            </div>
        </div>
    );
}

