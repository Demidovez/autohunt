import React from "react";
import { SelectPicker } from "rsuite";
import css from "./sortadvts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setOrderAdvertsAction } from "../../actions/creators/filterBarActionCreators";

function SortAdvts() {
  const { orderData, orderValue } = useSelector((state) => state.filterBar);
  const dispatch = useDispatch();

  const onSort = (value) => dispatch(setOrderAdvertsAction(value));

  return (
    <div className={`sortadvts-overwrite ${css.container}`}>
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

export default SortAdvts;
