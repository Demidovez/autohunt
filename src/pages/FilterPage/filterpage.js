import React from "react";
import { Content, Grid, Row, Col } from "rsuite";
import { observer } from "mobx-react";
import SearchBar from "../../components/SearchBar/searchbar";
import FilterAdvtsBar from "../../components/FilterAdvtsBar/filteradvtsbar";
import AdvtList from "../../components/AdvtList/advtlist";
import SortAdvts from "../../components/SortAdvts/sortadvts";
import filterAdvtsStore from "../../stores/filterAdvtsStore";
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
                <FilterAdvtsBar
                  className="filter"
                  options={filterAdvtsStore.filterOptions}
                  count={filterAdvtsStore.count}
                  isChanged={filterAdvtsStore.isChanged}
                  fetchInfo={filterAdvtsStore.getInitInfo}
                  onEdit={filterAdvtsStore.onEditFilter}
                  onReset={filterAdvtsStore.onResetFilter}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <SortAdvts
                  tags={filterAdvtsStore.tags}
                  orderValue={filterAdvtsStore.orderValue}
                  orderData={filterAdvtsStore.orderData}
                  onSort={filterAdvtsStore.onSort}
                  onCloseTag={filterAdvtsStore.onCloseTag}
                />
                <AdvtList
                  advts={filterAdvtsStore.advts}
                  count={filterAdvtsStore.count}
                  updateId={filterAdvtsStore.updateId}
                  getMore={filterAdvtsStore.getMoreAdvts}
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
