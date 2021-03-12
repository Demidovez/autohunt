import React from "react";
import { Panel, Container, Header, Content } from "rsuite";
import "./styles.scss";

function NewsCard({ news, className }) {
  return (
    <Panel className={`${className} news-card-component`}>
      <Container>
        <Container>
          <Header>
            <h3>{news.title}</h3>
          </Header>
          <Content>
            <div className="date">
              <span>{news.date}</span>
            </div>
            <div className="content">{news.content}</div>
          </Content>
        </Container>
      </Container>
    </Panel>
  );
}

export default NewsCard;
