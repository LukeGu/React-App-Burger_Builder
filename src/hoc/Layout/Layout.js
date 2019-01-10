import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import styles from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSiderDrawer: false
  };

  sideDrawerTogglenHandler = () => {
    this.setState({ showSiderDrawer: true });
  };

  sideDrawerCloseHandler = () => {
    this.setState(prevState => {
      return { showSiderDrawer: !prevState.showSiderDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar sideDrawerToggled={this.sideDrawerTogglenHandler} />
        <SideDrawer
          open={this.state.showSiderDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
