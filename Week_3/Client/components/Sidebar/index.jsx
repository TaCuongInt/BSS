import { SidebarItem } from "../common/SidebarItem";
import { UserInfo } from "..";
import styles from "./Sidebar.module.scss";

export const Sidebar = ({ sidebarModel = [] }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src="images/devices.png" alt="" />
        <span className={styles.heading}>Device Manager</span>
      </div>
      <div className={styles.account}>
        <UserInfo />
      </div>
      <div className={styles.menu}>
        {sidebarModel.map((item) => {
          return (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              href={item.href}
            />
          );
        })}
      </div>
    </div>
  );
};
