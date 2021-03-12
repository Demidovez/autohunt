import React from "react";
import { Link } from "react-router-dom";
import { FlexboxGrid, Icon } from "rsuite";
import "./styles.scss";

function Notification() {
  const close = () => {};

  return (
    <FlexboxGrid align="middle" className="notification-component">
      <FlexboxGrid.Item
        colspan={22}
        componentClass={Link}
        to="/account/auto/scoda-oktavia"
      >
        <h4>Новое объявление!</h4>
        <p>Шкода Октавия 2010г.</p>
        <Link to="/accout/myfilters/scoda-oktavia">фильтр: Шкода Октавия</Link>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={2} className="close-icon" onClick={close}>
        <Icon icon="close" />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}

export default Notification;
