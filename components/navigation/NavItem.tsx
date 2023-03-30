import Link from "next/link";
import styles from '../../styles/navigation.module.scss';

const NavItem = ({ text, href, activePath }: any) => {
  return (
    <Link href={href}>
      <div
        className={`${styles[`nav__link`]} ${
          activePath === href && "bg-cyan-800 text-slate-200"
        }`}
      >
        <i
          className={`ri-${text}-${
            activePath === href ? "fill" : "line"
          } ri-lg`}
        ></i>
      </div>
    </Link>
  );
};

export default NavItem;