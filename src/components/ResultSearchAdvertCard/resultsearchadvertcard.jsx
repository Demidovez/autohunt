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
  Divider,
} from "rsuite";
import "./styles.scss";
import { formatNumber } from "../../helpers";

function ResultSearchAdvertCard({ advert }) {
  return (
    <Panel className="result-search-advert-card-component">
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
          <Header className="header">
            <div className="model-city">
              <h4>
                {advert.model} {advert.series} {advert.generation}
              </h4>
              <div className="city">{advert.city}</div>
            </div>
            <div className="links-more">
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
            </div>
          </Header>
          <Content>
            <div className="price-mileage">
              <div className="price">
                <span>{formatNumber(advert.price)} р.</span>{" "}
                <span>{formatNumber(advert.price_usd)} $</span>
              </div>
              <Divider vertical />
              <div className="mileage">
                Пробег: <span>{formatNumber(advert.mileage)} км. </span>
              </div>
            </div>
            <div className="option">
              {advert.year} г., {advert.transmission}, {advert.volume_engine}{" "}
              л., {advert.fuel}, {advert.carcase}, {advert.gearing},{" "}
              {advert.color}
            </div>
          </Content>
          <Footer>
            <FlexboxGrid align="bottom">
              <FlexboxGrid.Item colspan={16}></FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={8}>
                <div className="source">
                  <a
                    href={`https://${advert.site}${advert.url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={`${advert.site}.png`} alt={`${advert.site}`} />
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

export default ResultSearchAdvertCard;
