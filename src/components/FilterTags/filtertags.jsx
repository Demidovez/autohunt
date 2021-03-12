import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeTagAction } from "../../actions/creators/filterBarActionCreators";
import { Tag } from "rsuite";

function FilterTags() {
  const rawTags = useSelector((state) => state.filterBar.tags);
  const preAndPostfixes = useSelector(
    (state) => state.filterBar.tagPostfixesPrefixes
  );
  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);

  useEffect(() => {
    let tags = rawTags.map((tag) =>
      preAndPostfixes[tag.field]
        ? {
            ...tag,
            value:
              preAndPostfixes[tag.field].pre +
              " " +
              tag.value +
              " " +
              preAndPostfixes[tag.field].post,
          }
        : tag
    );

    setTags(tags);
  }, [rawTags, preAndPostfixes]);

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
      {tags.map((tag, index) => (
        <Tag closable onClick={() => onCloseTag(tag, index)} key={index}>
          {tag.value}
        </Tag>
      ))}
    </div>
  );
}

export default FilterTags;
