import React from "react";
import { Button, Loader } from "rsuite";
import AdvtCard from "../AdvtCard/advtcard";
import { getMoreAdvertsAction } from "../../actions/creators/filterBarActionCreators";
import { formatNumber } from "../../helpers";
import css from "./advtlist.module.css";
import { useDispatch, useSelector } from "react-redux";

function AdvtList() {
  const {
    countAllAdverts,
    adverts,
    moreAdverts,
    filterOptions,
    offset,
  } = useSelector((state) => state.filterBar);
  const dispatch = useDispatch();

  const getMoreAdverts = () =>
    dispatch(getMoreAdvertsAction(filterOptions, offset));

  return (
    <div>
      {adverts.length === 0 && (
        <Loader className={css.loader} size="md" center content="Загрузка..." />
      )}
      {adverts.length > 0 &&
        [...adverts, ...moreAdverts].map((advt) => (
          <AdvtCard key={advt.id} advt={advt} className={css.advt} />
        ))}
      {adverts.length > 0 && adverts.length !== countAllAdverts && (
        <div className={css.more}>
          <Button appearance="default" onClick={getMoreAdverts}>
            Показать еще
          </Button>
          <span>
            {formatNumber(adverts.length + moreAdverts.length) +
              " из " +
              formatNumber(countAllAdverts)}
          </span>
        </div>
      )}
    </div>
  );
}

export default AdvtList;
