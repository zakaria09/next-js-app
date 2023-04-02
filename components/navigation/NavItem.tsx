import Link from "next/link";
import styles from '../../styles/navigation.module.scss';

const NavItem = ({ text, href, isActive }: any) => {
  return (
    <Link href={href}>
      <div
        className={`${styles[`nav__link`]} ${
          isActive
            ? "bg-cyan-800 text-slate-200"
            : "bg-slate-200 text-cyan-800 "
        }`}
      >
        <i className={`ri-${text}-${isActive ? "fill" : "line"} ri-lg`}></i>
      </div>
    </Link>
  );
};

export default NavItem;