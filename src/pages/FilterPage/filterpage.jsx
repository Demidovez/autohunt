import React from "react";
import { Grid, Row, Col } from "rsuite";
import Searchbar from "../../components/SearchBar/searchbar";
import FilterAdvertsBar from "../../components/FilterAdvertsBar/filteradvertsbar";
import AdvertList from "../../components/AdvertList/advertlist";
import SortAdverts from "../../components/SortAdverts/sortadverts";
import FilterTags from "../../components/FilterTags/filtertags";

function FilterPage() {
  return (
    <div className="filter-page-component">
      <Searchbar />
      <Grid fluid>
        <Row>
          <Col xs={24} sm={24} md={4} lg={6}>
            <FilterAdvertsBar />
          </Col>
          <Col xs={24} sm={24} md={12} lg={18}>
            <Row>
              <Col xs={18} sm={18} md={18} lg={18}>
                <FilterTags />
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <SortAdverts />
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <AdvertList />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default FilterPage;
