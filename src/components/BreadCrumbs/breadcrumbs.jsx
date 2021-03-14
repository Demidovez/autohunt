import React, { useState, useEffect } from "react";
import { Breadcrumb } from "rsuite";
import "./styles.scss";
import { Link, useLocation } from "react-router-dom";
import { getLabelBreadCrumbByPath } from "../../helpers";

function BreadCrumbs() {
  const location = useLocation();
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const pathList = location.pathname.split("/");

    const paths = [
      { to: "/", label: "Главная" },
      ...pathList
        .filter((p) => p)
        .map((path) => ({ to: path, label: getLabelBreadCrumbByPath(path) })),
    ];

    setPaths(paths);
  }, [location.pathname]);

  return (
    <div className="bread-crumbs-component">
      {paths.length > 1 && (
        <div className="breadcrumb">
          <Breadcrumb>
            {paths.map((path, index) =>
              index === paths.length - 1 ? (
                <Breadcrumb.Item key={path.to} active>
                  {path.label}
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item
                  key={path.to}
                  componentClass={Link}
                  to={path.to}
                >
                  {path.label}
                </Breadcrumb.Item>
              )
            )}
          </Breadcrumb>
        </div>
      )}
    </div>
  );
}

export default BreadCrumbs;
