import React from "react";
import {
  Panel,
  Sidebar,
  Container,
  Header,
  Footer,
  Content,
  Button,
  FlexboxGrid,
} from "rsuite";
import css from "./advtcard.module.css";

class AdvtCard extends React.Component {
  formatNumber = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  render() {
    const { advt, className } = this.props;

    return (
      <Panel className={`${className} ${css.container}`}>
        <Container>
          <Sidebar>
            <div className={css.img_wrapper}>
              <img
                src={advt.image}
                alt={`${advt.model} ${advt.series} ${advt.generation}`}
              />
            </div>
          </Sidebar>
          <Container>
            <Header>
              <h4>
                {advt.model} {advt.series} {advt.generation}
              </h4>
            </Header>
            <Content>
              <div className={css.price}>
                <span>{this.formatNumber(advt.price)} р.</span>{" "}
                <span>{this.formatNumber(advt.price_usd)} $</span>
              </div>
              <div className={css.mileage}>
                Пробег: <span>{this.formatNumber(advt.mileage)} км. </span>
              </div>
              <div className={css.option}>
                {advt.year} г., {advt.transmission}, {advt.volume_engine} л.,{" "}
                {advt.fuel}, {advt.carcase}, {advt.gearing}, {advt.color}
              </div>
            </Content>
            <Footer>
              <FlexboxGrid align="bottom">
                <FlexboxGrid.Item colspan={16}>
                  <Button
                    appearance="primary"
                    href={`https://${advt.site}${advt.url}`}
                    target="_blank"
                  >
                    Источник
                  </Button>
                  <Button appearance="ghost" href={advt.url}>
                    Подробнее
                  </Button>
                  <div className={css.city}>
                    Город: <span>{advt.city}</span>
                  </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={8}>
                  <div className={css.source}>
                    <p>Источник</p>
                    <a
                      href={`https://${advt.site}${advt.url}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={`${advt.site}.png`} alt={`${advt.site}`} />
                    </a>
                  </div>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Footer>
          </Container>
        </Container>
      </Panel>
    );
  }
}

export default AdvtCard;
