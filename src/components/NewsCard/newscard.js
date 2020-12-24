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
import css from "./newscard.module.css";

class NewsCard extends React.Component {
  formatNumber = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  render() {
    const { news, className } = this.props;

    return (
      <Panel className={`${className} ${css.container}`}>
        <Container>
          {/* <Sidebar>
            <div className={css.img_wrapper}>
              <img src={advt.image} />
            </div>
          </Sidebar> */}
          <Container>
            <Header>
              <h3>{news.title}</h3>
            </Header>
            <Content>
              <div className={css.date}>
                <span>{news.date}</span>
              </div>
              <div className={css.content}>{news.content}</div>
            </Content>
            <Footer></Footer>
          </Container>
        </Container>
      </Panel>
    );
  }
}

export default NewsCard;
