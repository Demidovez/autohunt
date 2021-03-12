import React from "react";
import { SelectPicker } from "rsuite";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setOrderAdvertsAction } from "../../actions/creators/filterBarActionCreators";

function SortAdverts() {
  const { orderData } = useSelector((state) => state.filterBar);
  const dispatch = useDispatch();

  const onSort = (value) => dispatch(setOrderAdvertsAction(value));

  return (
    <div className="sort-adverts-component">
      <SelectPicker
        data={orderData}
        appearance="subtle"
        cleanable={false}
        searchable={false}
        placeholder={orderData[0].label}
        onSelect={onSort}
      />
    </div>
  );
}

export default SortAdverts;
