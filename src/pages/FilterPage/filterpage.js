import React from "react";
import { Grid, Row, Col } from "rsuite";
import SearchBar from "../../components/SearchBar/searchbar";
import FilterAdvertsBar from "../../components/FilterAdvertsBar/filterAdvertsBar";
import AdvtList from "../../components/AdvtList/advtlist";
import SortAdvts from "../../components/SortAdvts/sortadvts";
import css from "./filterpage.module.css";
import FilterTags from "../../components/FilterTags/filtertags";

function FilterPage() {
  return (
    <div>
      <SearchBar className={css.searchbar} />
      <Grid fluid>
        <Row>
          <Col xs={24} sm={24} md={4} lg={6}>
            <FilterAdvertsBar className={css.filter} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={18}>
            <Row>
              <Col xs={18} sm={18} md={18} lg={18}>
                <FilterTags />
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <SortAdvts />
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <AdvtList />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default FilterPage;
