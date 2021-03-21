import React, { useState, useEffect } from "react";
import { Button, Container, Content, Loader } from "rsuite";
import "./styles.scss";
import FilterLabel from "../../../components/FilterLabel/filterlabel";
import AdvertCard from "../../../components/AdvertCard/advertcard";
import { formatNumber } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { getFoundAutoItemsAction } from "../../../actions/creators/userActionCreators";

function FoundAuto() {
  const [moreAdverts] = useState([]);
  // const [adverts] = useState([
  //   {
  //     id: 1,
  //     image: "https://avcdn.av.by/advertmedium/0000/1263/1274.jpeg",
  //     model: "Шкода",
  //     series: "Октавия",
  //     generation: "III",
  //     price: 6000,
  //     price_usd: 3000,
  //     mileage: 300000,
  //     year: 2010,
  //     transmission: "механика",
  //     volume_engine: 1.6,
  //     fuel: "бензин",
  //     carcase: "хэтчбек 5 дв.",
  //     gearing: "передний привод",
  //     color: "синий",
  //     site: "/cars.av.by",
  //     url: "mazda/323f/100140282",
  //     city: "Минск",
  //     filter: {
  //       title: "Автомат до 6000$",
  //       link: "/account/myfilters/scoda-octavia",
  //       color: "#16a085",
  //     },
  //   },
  //   {
  //     id: 2,
  //     image: "https://avcdn.av.by/advertmedium/0000/1263/1274.jpeg",
  //     model: "Шкода",
  //     series: "Октавия",
  //     generation: "III",
  //     price: 6000,
  //     price_usd: 3000,
  //     mileage: 300000,
  //     year: 2010,
  //     transmission: "механика",
  //     volume_engine: 1.6,
  //     fuel: "бензин",
  //     carcase: "хэтчбек 5 дв.",
  //     gearing: "передний привод",
  //     color: "синий",
  //     site: "/cars.av.by",
  //     url: "mazda/323f/100140282",
  //     city: "Минск",
  //     filter: {
  //       title: "Шкода Октавия",
  //       link: "/account/myfilters/scoda-octavia",
  //       color: "#2980b9",
  //     },
  //   },
  //   {
  //     id: 3,
  //     image: "https://avcdn.av.by/advertmedium/0000/1263/1274.jpeg",
  //     model: "Шкода",
  //     series: "Октавия",
  //     generation: "III",
  //     price: 6000,
  //     price_usd: 3000,
  //     mileage: 300000,
  //     year: 2010,
  //     transmission: "механика",
  //     volume_engine: 1.6,
  //     fuel: "бензин",
  //     carcase: "хэтчбек 5 дв.",
  //     gearing: "передний привод",
  //     color: "синий",
  //     site: "/cars.av.by",
  //     url: "mazda/323f/100140282",
  //     city: "Минск",
  //     filter: {
  //       title: "Недорогой хетчбек",
  //       link: "/account/myfilters/scoda-octavia",
  //       color: "#8e44ad",
  //     },
  //   },
  //   {
  //     id: 4,
  //     image: "https://avcdn.av.by/advertmedium/0000/1263/1274.jpeg",
  //     model: "Шкода",
  //     series: "Октавия",
  //     generation: "III",
  //     price: 6000,
  //     price_usd: 3000,
  //     mileage: 300000,
  //     year: 2010,
  //     transmission: "механика",
  //     volume_engine: 1.6,
  //     fuel: "бензин",
  //     carcase: "хэтчбек 5 дв.",
  //     gearing: "передний привод",
  //     color: "синий",
  //     site: "/cars.av.by",
  //     url: "mazda/323f/100140282",
  //     city: "Минск",
  //     filter: {
  //       title: "Шкода Октавия",
  //       link: "/account/myfilters/scoda-octavia",
  //       color: "#2980b9",
  //     },
  //   },
  // ]);

  const {
    userId,
    isFoundAutoLoading,
    foundAutoItems,
    foundAutoItemsCount,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getFoundAutoItemsAction(userId)), []);

  const getMoreAdverts = () => {};

  return (
    <Container className="found-auto-component">
      <Content className="cards">
        {isFoundAutoLoading && (
          <Loader className="loader" size="md" center content="Загрузка..." />
        )}
        {foundAutoItems.length > 0 &&
          [...foundAutoItems, ...moreAdverts].map((advert) => (
            <FilterLabel key={advert.id} filter={advert.filter}>
              <AdvertCard advert={advert} className="advert" />
            </FilterLabel>
          ))}
        {foundAutoItems.length > 0 &&
          foundAutoItems.length !== foundAutoItemsCount && (
            <div className="more">
              <Button appearance="default" onClick={getMoreAdverts}>
                Показать еще
              </Button>
              <span>
                {formatNumber(foundAutoItems.length + moreAdverts.length)} из{" "}
                {formatNumber(foundAutoItemsCount)}
              </span>
            </div>
          )}
      </Content>
    </Container>
  );
}

export default FoundAuto;
