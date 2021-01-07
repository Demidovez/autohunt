import React from "react";
import { Grid, Row, Col } from "rsuite";
import SearchBar from "../../components/SearchBar/searchbar";
import FilterAdvtsBar from "../../components/FilterAdvtsBar/filteradvtsbar";
import AdvtList from "../../components/AdvtList/advtlist";
import SortAdvts from "../../components/SortAdvts/sortadvts";
import css from "./filterpage.module.css";

class FilterPage extends React.Component {
  render() {
    return (
      <div>
        <SearchBar className={css.searchbar} />
        <Grid fluid>
          <Row>
            <Col xs={24} sm={24} md={4} lg={6}>
              <FilterAdvtsBar className={css.filter} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={18}>
              <SortAdvts />
              <AdvtList />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default FilterPage;
