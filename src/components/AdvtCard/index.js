import React from "react";
import { Item, Label, Segment, Header } from "semantic-ui-react";

class AdvtCard extends React.Component {
  render() {
    const { advt } = this.props;

    return (
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image src={advt.image} size="medium" rounded />
            <Item.Content>
              <Header className="header-advt" size="large">
                {advt.model} {advt.series} {advt.generation}
              </Header>
              <Item.Meta>
                <Label color="blue">
                  {advt.price}
                  <Label.Detail>{advt.price_usd}</Label.Detail>
                </Label>
                {"  "}
                <span>{advt.year}</span>
              </Item.Meta>
              <Item.Meta>
                <Label>{advt.date}</Label>
                <Label>{advt.engcapacity}</Label>
                <Label>{advt.mileage}</Label>
              </Item.Meta>
              <Item.Description>
                {advt.model} {advt.series} {advt.generation} {advt.price}{" "}
                {advt.priceusd} {advt.year} {advt.date} {advt.engcapacity}{" "}
                {advt.mileage}
              </Item.Description>
              <Item.Extra>
                <Label>{advt.engtype}</Label>
                <Label icon="globe" content={advt.fueltype} />
              </Item.Extra>
              <Label
                attached="bottom right"
                icon="linkify"
                as="a"
                href={advt.urlad}
                target="_blank"
              >
                {advt.urlad}
              </Label>
            </Item.Content>
            <div>
              <Label color="orange" ribbon="right">
                {advt.location}
              </Label>
            </div>
          </Item>
        </Item.Group>
      </Segment>
    );
  }
}

export default AdvtCard;
