import React, { useEffect } from "react";
import { Container, Content } from "rsuite";
import FilterCard from "../../../components/FilterCard/filtercard";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { getFiltersAction } from "../../../actions/creators/userActionCreators";

function MyFilters() {
  const { filters, userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getFiltersAction(userId)), []);

  return (
    <Container className="my-filters-component">
      <Content className="cards">
        {filters.map((filter) => (
          <FilterCard filter={filter} key={filter.id} />
        ))}
      </Content>
    </Container>
  );
}

export default MyFilters;
