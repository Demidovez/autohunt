import React from "react";
import { Button, Icon, Loader } from "rsuite";
import AdvertCard from "../AdvertCard/advertcard";
import {
  getMoreAdvertsAction,
  onResetFilterAction,
} from "../../actions/creators/filterBarActionCreators";
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
    isLoadingAdverts,
  } = useSelector((state) => state.filterBar);
  const dispatch = useDispatch();

  const getMoreAdverts = () =>
    dispatch(getMoreAdvertsAction(filterOptions, offset));

  const onResetFilter = () => dispatch(onResetFilterAction());

  return (
    <div className="advert-list-component">
      {isLoadingAdverts && (
        <Loader className="loader" size="md" center content="Загрузка..." />
      )}
      {!isLoadingAdverts && adverts.length === 0 && (
        <div className="not-found-adverts">
          <p>К сожалению, объявлений не найдено :(</p>
          <Button onClick={onResetFilter}>
            <Icon icon="reload" /> Сбросить фильтр
          </Button>
        </div>
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
