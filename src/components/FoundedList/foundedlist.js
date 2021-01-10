import React from "react";
import { Button, Loader } from "rsuite";
import AdvtCard from "../AdvtCard/advtcard";
import FilterLabel from "../FilterLabel/filterlabel";
import css from "./foundedlist.module.css";

class FoundedList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 300,
      advts: [
        {
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
            link: "/account/myfiltres/scoda-octavia",
            color: "#16a085",
          },
        },
        {
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
            link: "/account/myfiltres/scoda-octavia",
            color: "#2980b9",
          },
        },
        {
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
            link: "/account/myfiltres/scoda-octavia",
            color: "#8e44ad",
          },
        },
        {
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
            link: "/account/myfiltres/scoda-octavia",
            color: "#2980b9",
          },
        },
      ],
      moreAdvts: [],
    };
  }

  getMoreAdvts = () => {};

  formatNumber = (num) =>
    num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") : num;

  render() {
    const { count, advts, moreAdvts } = this.state;

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
            <FilterLabel key={advt.id} filter={advt.filter}>
              <AdvtCard advt={advt} className={css.advt} />
            </FilterLabel>
          ))}
        {advts.length > 0 && advts.length !== count && (
          <div className={css.more}>
            <Button appearance="default" onClick={this.getMoreAdvts}>
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

export default FoundedList;
