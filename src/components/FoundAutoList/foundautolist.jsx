import React, { useState } from "react";
import { Button, Loader } from "rsuite";
import AdvertCard from "../AdvertCard/advertcard";
import FilterLabel from "../FilterLabel/filterlabel";
import "./styles.scss";
import { formatNumber } from "../../helpers";

function FoundAutoList() {
  const [countFound] = useState(300);
  const [moreAdverts] = useState([]);
  const [adverts] = useState([
    {
      id: 1,
      image: "https://avcdn.av.by/advertmedium/0000/1263/1274.jpeg",
      model: "Шкода",
      series: "Октавия",
      generation: "III",
      price: 6000,
      price_usd: 3000,
      mileage: 300000,
      year: 2010,
      transmission: "механика",
      volume_engine: 1.6,
      fuel: "бензин",
      carcase: "хэтчбек 5 дв.",
      gearing: "передний привод",
      color: "синий",
      site: "/cars.av.by",
      url: "mazda/323f/100140282",
      city: "Минск",
      filter: {
        title: "Автомат до 6000$",
        link: "/account/myfilters/scoda-octavia",
        color: "#16a085",
      },
    },
    {
      id: 2,
      image: "https://avcdn.av.by/advertmedium/0000/1263/1274.jpeg",
      model: "Шкода",
      series: "Октавия",
      generation: "III",
      price: 6000,
      price_usd: 3000,
      mileage: 300000,
      year: 2010,
      transmission: "механика",
      volume_engine: 1.6,
      fuel: "бензин",
      carcase: "хэтчбек 5 дв.",
      gearing: "передний привод",
      color: "синий",
      site: "/cars.av.by",
      url: "mazda/323f/100140282",
      city: "Минск",
      filter: {
        title: "Шкода Октавия",
        link: "/account/myfilters/scoda-octavia",
        color: "#2980b9",
      },
    },
    {
      id: 3,
      image: "https://avcdn.av.by/advertmedium/0000/1263/1274.jpeg",
      model: "Шкода",
      series: "Октавия",
      generation: "III",
      price: 6000,
      price_usd: 3000,
      mileage: 300000,
      year: 2010,
      transmission: "механика",
      volume_engine: 1.6,
      fuel: "бензин",
      carcase: "хэтчбек 5 дв.",
      gearing: "передний привод",
      color: "синий",
      site: "/cars.av.by",
      url: "mazda/323f/100140282",
      city: "Минск",
      filter: {
        title: "Недорогой хетчбек",
        link: "/account/myfilters/scoda-octavia",
        color: "#8e44ad",
      },
    },
    {
      id: 4,
      image: "https://avcdn.av.by/advertmedium/0000/1263/1274.jpeg",
      model: "Шкода",
      series: "Октавия",
      generation: "III",
      price: 6000,
      price_usd: 3000,
      mileage: 300000,
      year: 2010,
      transmission: "механика",
      volume_engine: 1.6,
      fuel: "бензин",
      carcase: "хэтчбек 5 дв.",
      gearing: "передний привод",
      color: "синий",
      site: "/cars.av.by",
      url: "mazda/323f/100140282",
      city: "Минск",
      filter: {
        title: "Шкода Октавия",
        link: "/account/myfilters/scoda-octavia",
        color: "#2980b9",
      },
    },
  ]);

  const getMoreAdverts = () => {};

  return (
    <div className="found-auto-list-component">
      {adverts.length === 0 && (
        <Loader className="loader" size="md" center content="Загрузка..." />
      )}
      {adverts.length > 0 &&
        [...adverts, ...moreAdverts].map((advert) => (
          <FilterLabel key={advert.id} filter={advert.filter}>
            <AdvertCard advert={advert} className="advert" />
          </FilterLabel>
        ))}
      {adverts.length > 0 && adverts.length !== countFound && (
        <div className="more">
          <Button appearance="default" onClick={getMoreAdverts}>
            Показать еще
          </Button>
          <span>
            {formatNumber(adverts.length + moreAdverts.length)} из{" "}
            {formatNumber(countFound)}
          </span>
        </div>
      )}
    </div>
  );
}

export default FoundAutoList;
