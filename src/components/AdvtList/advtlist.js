import React from "react";
import AdvtCard from "../AdvtCard/advtcard";
import css from "./advtlist.module.css";

class AdvtList extends React.Component {
  render() {
    const { advts } = this.props;

    return (
      <div>
        {advts.map((advt) => (
          <AdvtCard key={advt.id} advt={advt} className={css.advt} />
        ))}
      </div>
    );
  }
}

export default AdvtList;
