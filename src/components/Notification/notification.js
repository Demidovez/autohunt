import React from "react";
import { Link } from "react-router-dom";
import { FlexboxGrid, Icon } from "rsuite";
import css from "./notification.module.css";

class Notification extends React.Component {
  close = () => {};

  render() {
    return (
      <FlexboxGrid align="middle" className={css.container}>
        <FlexboxGrid.Item
          colspan={22}
          componentClass={Link}
          to="/account/auto/scoda-oktavia"
        >
          <h4>Новое объявление!</h4>
          <p>Шкода Октавия 2010г.</p>
          <Link to="/accout/myfiltres/scoda-oktavia">
            фильтр: Шкода Октавия
          </Link>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={2}
          className={css.close_icon}
          onClick={this.close}
        >
          <Icon icon="close" />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
}

export default Notification;
