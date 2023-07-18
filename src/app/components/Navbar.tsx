import styles from './navbar.module.css'
import { url } from 'inspector'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'

export default function NavBar() {
  const linksList = [
    {
      id: 1,
      text: 'Contatos',
      url: ''
    },
    {
      id: 2,
      text: 'Abrir denuncia',
      url: ''
    },
    {
      id: 3,
      text: 'Planilha excel',
      url: ''
    },
    {
      id: 4,
      text: 'Projetos',
      url: ''
    }
  ]

  const iconsList = [
    {
      id: 1,
      icon_name: <NotificationsNoneIcon className={styles.bell} />,
      url: ''
    },
    {
      id: 2,
      icon_name: <HelpOutlineIcon className={styles.question} />,
      url: ''
    },
    {
      id: 3,
      icon_name: <AccountCircleIcon className={styles.bigger} />,
      url: ''
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
        {linksList.map((link, index) => {
          return (
            <button key={index}>
              <p className={styles.inside_button}>
                {link.text}
                <IconButton key={index} className="bg-transparent">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </p>
            </button>
          )
        })}
      </div>
      <div className={styles.right_side}>
        {iconsList.map((icon, index) => {
          return <IconButton key={index}>{icon.icon_name}</IconButton>
        })}
      </div>
    </div>
  )
}
