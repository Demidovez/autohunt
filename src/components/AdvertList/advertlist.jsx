import React from "react";
import { Button, Loader } from "rsuite";
import AdvertCard from "../AdvertCard/advertcard";
import { getMoreAdvertsAction } from "../../actions/creators/filterBarActionCreators";
import { formatNumber } from "../../helpers";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";

function AdvertList() {
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
    <div className="advert-list-component">
      {adverts.length === 0 && (
        <Loader className="loader" size="md" center content="Загрузка..." />
      )}
      {adverts.length > 0 &&
        [...adverts, ...moreAdverts].map((advert) => (
          <AdvertCard key={advert.id} advert={advert} className="advert-card" />
        ))}
      {adverts.length > 0 && adverts.length !== countAllAdverts && (
        <div className="more">
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

export default AdvertList;
