import React from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeTagAction } from "../../actions/creators/filterBarActionCreators";
import { Tag } from "rsuite";

function FilterTags({ hideField }) {
  const tags = useSelector((state) => state.filterBar.tags);
  const preAndPostfixes = useSelector(
    (state) => state.filterBar.tagPostfixesPrefixes
  );
  const dispatch = useDispatch();

  const addPreAndPostfixes = (tag) => {
    const { pre, post } = preAndPostfixes[tag.field] || { pre: "", post: "" };
    let newValue = tag.value;

    if (pre && post) {
      newValue = pre + " " + tag.value + " " + post;
    } else if (pre) {
      newValue = pre + " " + tag.value;
    } else if (post) {
      newValue = tag.value + " " + post;
    }

    return { ...tag, value: newValue };
  };

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
      {tags
        .filter((tag) => tag.field !== hideField)
        .map((tag, index) => (
          <Tag closable onClick={() => onCloseTag(tag, index)} key={index}>
            {addPreAndPostfixes(tag).value}
          </Tag>
        ))}
    </div>
  );
}

export default FilterTags;
