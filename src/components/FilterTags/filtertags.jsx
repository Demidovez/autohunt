import React from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeTagAction } from "../../actions/creators/filterBarActionCreators";
import { Tag } from "rsuite";
import { addToTagsPreAndPostfixes } from "../../helpers";

function FilterTags({ hideField }) {
  const tags = useSelector((state) => state.filterBar.tags);
  const tagPostfixesPrefixes = useSelector(
    (state) => state.filterBar.tagPostfixesPrefixes
  );
  const dispatch = useDispatch();

  const onCloseTag = (tag) => {
    if (tag.type === "model") {
      if (tag.field === "models") {
        tags.forEach(
          (tagItem) =>
            tagItem.idModel === tag.idModel &&
            ["models", "series", "generations"].includes(tagItem.field) &&
            dispatch(closeTagAction(tagItem))
        );
      } else if (tag.field === "series") {
        tags.forEach(
          (tagItem) =>
            tagItem.idModel === tag.idModel &&
            ["series", "generations"].includes(tagItem.field) &&
            dispatch(closeTagAction(tagItem))
        );
      } else {
        dispatch(closeTagAction(tag));
      }
    } else {
      dispatch(closeTagAction(tag));
    }
  };

  return (
    <div className="filter-tags-component">
      {addToTagsPreAndPostfixes(tags, tagPostfixesPrefixes)
        .filter((tag) => tag.field !== hideField)
        .map((tag, index) => (
          <Tag closable onClick={() => onCloseTag(tag, index)} key={index}>
            {tag.value}
          </Tag>
        ))}
    </div>
  );
}

export default FilterTags;
