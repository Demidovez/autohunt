import React from "react";
import { Panel, Container, Header, Footer, Content } from "rsuite";
import css from "./newscard.module.css";

function NewsCard(props) {
  const { news, className } = props;

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

export default NewsCard;
