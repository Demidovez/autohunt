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
import "./styles.scss";
import { formatNumber } from "../../helpers";

function AdvertCard({ advert, className }) {
  return (
    <Panel className={`${className} advert-card-component`}>
      <Container>
        <Sidebar>
          <div className="img-wrapper">
            <img
              src={advert.image}
              alt={`${advert.model} ${advert.series} ${advert.generation}`}
            />
          </div>
        </Sidebar>
        <Container>
          <Header>
            <h4>
              {advert.model} {advert.series} {advert.generation}
            </h4>
          </Header>
          <Content>
            <div className="price">
              <span>{formatNumber(advert.price)} р.</span>{" "}
              <span>{formatNumber(advert.price_usd)} $</span>
            </div>
            <div className="mileage">
              Пробег: <span>{formatNumber(advert.mileage)} км. </span>
            </div>
            <div className="option">
              {advert.year} г., {advert.transmission}, {advert.volume_engine}{" "}
              л., {advert.fuel}, {advert.carcase}, {advert.gearing},{" "}
              {advert.color}
            </div>
          </Content>
          <Footer>
            <FlexboxGrid align="bottom">
              <FlexboxGrid.Item colspan={19}>
                <Button
                  appearance="primary"
                  href={`https://${advert.site}${advert.url}`}
                  target="_blank"
                >
                  Открыть на {advert.site}
                </Button>
                <Button appearance="ghost" href={advert.url}>
                  Подробнее
                </Button>
                <div className="city">
                  Город: <span>{advert.city}</span>
                </div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={5}>
                <div className="source">
                  <p>Источник</p>
                  <a
                    href={`https://${advert.site}${advert.url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={`/${advert.site}.png`} alt={`${advert.site}`} />
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

export default AdvertCard;
