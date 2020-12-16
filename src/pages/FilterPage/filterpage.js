import React from "react";
import { Content, Grid, Row, Col } from "rsuite";
import { observer } from "mobx-react";
import SearchBar from "../../components/SearchBar/searchbar";
import FilterBar from "../../components/FilterBar/filterbar";
import AdvtList from "../../components/AdvtList/advtlist";
import SortAdvts from "../../components/SortAdvts/sortadvts";
import filterStore from "../../stores/filterStore";
import css from "./filterpage.module.css";

const FilterPage = observer(
  class extends React.Component {
    render() {
      return (
        <Content>
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
              <Col xs={24} sm={24} md={16} lg={16}>
                <SearchBar className={css.searchbar} />
              </Col>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
              <Col xs={24} sm={24} md={4} lg={4}>
                <FilterBar
                  className="filter"
                  options={filterStore.filterOptions}
                  fetchInfo={filterStore.getInitInfo}
                  onEditFilter={filterStore.onEditFilter}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <SortAdvts listTags={filterStore.listTags} />
                <AdvtList
                  advts={filterStore.advts}
                  updateId={filterStore.updateId}
                  getMore={filterStore.moreGetAdvts}
                  allCount={filterStore.allCount}
                />
              </Col>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
            </Row>
          </Grid>
        </Content>
      );
    }
  }
);

export default FilterPage;
