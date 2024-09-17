import Map from "../../components/Map/Map";
import SideBar from "../../components/Sidebar/SideBar";
import User from "../../components/User/User";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
