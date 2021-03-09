// Pretty view of numbers
import { closeTagAction } from "../actions/creators/filterBarActionCreators";

export const formatNumber = (num) =>
  num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") : num;

// Add or update list of tags on filter page by one value
export const updateListOfTagsByOne = (
  listOfTags,
  fieldForCheck,
  valueForCheck
) => {
  let newListOfTags = listOfTags;

  const indexTagInList = newListOfTags.findIndex(
    (tag) => tag.field === fieldForCheck
  );

  if (indexTagInList === -1) {
    newListOfTags = [
      ...newListOfTags,
      {
        field: fieldForCheck,
        value: valueForCheck,
      },
    ];
  } else {
    if (valueForCheck) {
      newListOfTags = newListOfTags.map((tag, index) =>
        index === indexTagInList ? { ...tag, value: valueForCheck } : tag
      );
    } else {
      newListOfTags = newListOfTags.filter(
        (_, index) => index !== indexTagInList
      );
    }
  }

  return newListOfTags;
};

// Add or update list of tags on filter page by array of values
export const updateListOfTagsByArray = (
  listOfTags,
  fieldForCheck,
  valuesForCheck
) => {
  // Get all tags except which of value not includes in valuesForCheck
  let newListOfTags = listOfTags.filter(
    (tag) =>
      !(tag.field === fieldForCheck && !valuesForCheck.includes(tag.value))
  );

  // Add tag to list if not includes in current tags
  valuesForCheck.forEach((valueForCheck) => {
    const tagInList = newListOfTags.find(
      (tag) => tag.field === fieldForCheck && tag.value === valueForCheck
    );

    if (!tagInList) {
      newListOfTags = [
        ...newListOfTags,
        {
          field: fieldForCheck,
          value: valueForCheck,
          type: "field",
        },
      ];
    }
  });

  return newListOfTags;
};

// Add or update list of tags on filter page by model auto
export const updateListOfTagsByModel = (listOfTags, model) => {
  let newListOfTags = listOfTags;

  const modelFields = {
    model: "models",
    series: "series",
    generation: "generations",
  };

  for (let modelOption in modelFields) {
    if (model[modelOption]) {
      const indexTagInList = newListOfTags.findIndex(
        (tag) =>
          tag.field === modelFields[modelOption] && tag.idModel === model.id
      );

      if (indexTagInList === -1) {
        newListOfTags = [
          ...newListOfTags,
          {
            field: modelFields[modelOption],
            value: model[modelOption],
            type: "model",
            idModel: model.id,
          },
        ];
      } else {
        newListOfTags = newListOfTags.map((tag, index) =>
          index === indexTagInList ? { ...tag, value: model[modelOption] } : tag
        );
      }
    } else {
      if (modelFields[modelOption] === "models") {
        newListOfTags = newListOfTags.filter(
          (tag) =>
            !(
              tag.idModel === model.id &&
              ["models", "series", "generations"].includes(tag.field)
            )
        );
      } else if (modelFields[modelOption] === "series") {
        newListOfTags = newListOfTags.filter(
          (tag) =>
            !(
              tag.idModel === model.id &&
              ["series", "generations"].includes(tag.field)
            )
        );
      } else {
        newListOfTags = newListOfTags.filter(
          (tag) =>
            !(
              tag.idModel === model.id && tag.field === modelFields[modelOption]
            )
        );
      }

      return newListOfTags;
    }
  }

  return newListOfTags;
};

// Reset value of filter option to default, when user closed tag in filter page
export const resetFieldOfFilterOptions = (
  defaultFilterOptions,
  filterOptions,
  closedTag
) => {
  const defaultFieldValueByTag = defaultFilterOptions[closedTag.field];
  let newFieldValue;

  if (Array.isArray(defaultFieldValueByTag)) {
    if (closedTag.type === "model") {
      newFieldValue = filterOptions[closedTag.field].map((value) =>
        value.id === closedTag.idModel ? { ...value, name: null } : value
      );
    } else {
      newFieldValue = filterOptions[closedTag.field].filter(
        (value) => value !== closedTag.value
      );
    }
  } else {
    newFieldValue = defaultFieldValueByTag;
  }

  return newFieldValue;
};

// Add element to array if it not exist or remove if array has this element
export const addOrRemoveItemInArray = (arrayOfItems, item) => {
  let newArray = [...arrayOfItems];

  if (newArray.includes(item)) {
    newArray = newArray.filter((i) => i !== item);
  } else {
    newArray.push(item);
  }

  return newArray;
};
