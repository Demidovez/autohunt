import React from "react";
import axios from "axios";
import {
  Container,
  Header,
  Content,
  Footer,
  Grid,
  Row,
  Col,
  Navbar,
  Nav,
  Icon,
  Dropdown,
} from "rsuite";
import AdvtCard from "./components/AdvtCard";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStart: false, advts: [], activeKey: null };
  }

  componentDidMount() {
    axios.get(`https://server.autohunt.by/all_advts`).then((res) => {
      const advts = res.data;
      this.setState({ advts });
    });
  }

  startStopParsing = () => {
    this.setState((state) => ({
      isStart: !state.isStart,
    }));
  };

  handleSelect = (eventKey) => {
    this.setState({
      activeKey: eventKey,
    });
  };

  render() {
    const { advts, activeKey } = this.state;

    return (
      <Container>
        <Header>
          <Navbar appearance="inverse">
            <Grid fluid>
              <Row>
                <Col xs={24} sm={24} md={4} lg={4}></Col>
                <Col xs={24} sm={24} md={16} lg={16}>
                  <Navbar.Header></Navbar.Header>
                  <Navbar.Body>
                    <Nav onSelect={this.handleSelect} activeKey={activeKey}>
                      <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
                        Home
                      </Nav.Item>
                      <Nav.Item eventKey="2">News</Nav.Item>
                      <Nav.Item eventKey="3">Products</Nav.Item>
                      <Dropdown title="About">
                        <Dropdown.Item eventKey="4">Company</Dropdown.Item>
                        <Dropdown.Item eventKey="5">Team</Dropdown.Item>
                        <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
                      </Dropdown>
                    </Nav>
                    <Nav pullRight>
                      <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
                    </Nav>
                  </Navbar.Body>
                </Col>
                <Col xs={24} sm={24} md={4} lg={4}></Col>
              </Row>
            </Grid>
          </Navbar>
        </Header>
        <Content>
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
              <Col xs={24} sm={24} md={16} lg={16}>
                <SearchBar className="search-bar" />
              </Col>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
              <Col xs={24} sm={24} md={4} lg={4}>
                <Filter className="filter" />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                {advts.map((advt, indx) => (
                  <AdvtCard key={indx} advt={advt} className="advt-item" />
                ))}
              </Col>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
            </Row>
          </Grid>
        </Content>
        <Footer>Footer</Footer>
      </Container>
    );
  }
}

export default App;
