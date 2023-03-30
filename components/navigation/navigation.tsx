import React, { useState } from 'react';
import { Navbar, ActiveLink } from 'nextjs-navbar-active-link';
import Link from 'next/link';
import NavItem from './NavItem';
import { Container } from '@mui/material';
import styles from '../../styles/navigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBars, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'next/router';

library.add(faXmark, faBars, faAngleDoubleRight)

const MENU_LIST = [
  { text: "home-2", href: "/" },
  { text: "camera-lens", href: "/portfolio" },
  { text: "instagram", href: "/gallery" },
  { text: "at", href: "/about" },
];
export default function Navigation() {
  const [navActive, setNavActive] = useState(false);

  const router = useRouter();

  console.log('router', router.pathname);

  return (
    <header className={`${styles.nav_header} navigation`}>
      <nav className={`${styles.nav_section}`}>
        {/* <Link href={"/"}>
          <div className={`${styles.nav__link} ${styles.logo}`}>
            <FontAwesomeIcon icon={faAngleDoubleRight} size="3x" />
            <i className="ri-arrow-right-s-line 3xl"></i>
          </div>
        </Link> */}
        <ul className={`${styles.menu_list} ${navActive ? styles.show : ''}`}>
            {MENU_LIST.map((menu, idx) => (
            <li
                onClick={() => {
                  setNavActive(false);
                }}
                key={idx}
            >
                <NavItem text={menu.text} href={menu.href} activePath={router.pathname} />
            </li>
            ))}
        </ul>
      </nav>
    </header>
  )
}