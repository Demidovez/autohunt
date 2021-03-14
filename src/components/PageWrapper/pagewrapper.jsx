import React from "react";
import { Content } from "rsuite";
import "./styles.scss";

function PageWrapper({ children }) {
  return (
    <Content className="page-wrapper-component">
      <div className="page">{children}</div>
    </Content>
  );
}

export default PageWrapper;
