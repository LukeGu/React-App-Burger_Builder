import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import styles from "./SideDrawer.css";

const sideDrawer = props => {
    let swithSideDrawer = [styles.SideDrawer, styles.Close];
    if (props.open) {
        swithSideDrawer = [styles.SideDrawer, styles.Open];
    }
  return (
    <Aux>
        <BackDrop show={props.open} clicked={props.closed}></BackDrop>
    <div className={swithSideDrawer.join(' ')}>
      <div className={styles.Logo}>
        <Logo />
      </div>

      <nav>
        <NavigationItems />
      </nav>
    </div>
    </Aux>

  );
};

export default sideDrawer;
