import React from "react";
import { Button, Loader } from "rsuite";
import { observer } from "mobx-react";
import filterAdvtsStore from "../../stores/filterAdvtsStore";
import AdvtCard from "../AdvtCard/advtcard";
import css from "./advtlist.module.css";

// TODO: Observer вынести родителю
const AdvtList = observer(
  class extends React.Component {
    formatNumber = (num) =>
      num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") : num;

    render() {
      const { count, advts, getMoreAdvts, moreAdvts } = filterAdvtsStore;

      return (
        <div>
          {advts.length === 0 && (
            <Loader
              className={css.loader}
              size="md"
              center
              content="Загрузка..."
            />
          )}
          {advts.length > 0 &&
            [...advts, ...moreAdvts].map((advt) => (
              <AdvtCard key={advt.id} advt={advt} className={css.advt} />
            ))}
          {advts.length > 0 && advts.length !== count && (
            <div className={css.more}>
              <Button appearance="default" onClick={getMoreAdvts}>
                Показать еще
              </Button>
              <span>
                {this.formatNumber(advts.length + moreAdvts.length)} из{" "}
                {this.formatNumber(count)}
              </span>
            </div>
          )}
        </div>
      );
    }
  }
);

export default AdvtList;
