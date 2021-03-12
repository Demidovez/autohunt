import React, { useState, useEffect, useRef } from "react";
import { InputGroup, Input, Icon } from "rsuite";
import "./styles.scss";
import { useDispatch } from "react-redux";
import {
  goClearSearchBarAction,
  goSearchByCityAction,
  goSearchByDollarsAction,
  goSearchByMileageAction,
  goSearchByNameAction,
  goSearchByOtherAction,
  goSearchByRublesAction,
} from "../../actions/creators/searchActionCreators";
import SearchResult from "../SearchResult/searchresult";

function SearchBar() {
  const [searchStr, setSearchStr] = useState("");
  const [timeoutSearchId, setTimeoutSearchId] = useState();
  const [isPopupMode, setIsPopupMode] = useState(false);
  const searchRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchStr) {
      timeoutSearchId && clearTimeout(timeoutSearchId);

      // TODO: Можно ли так использовать диспатч?
      const timeoutId = setTimeout(() => {
        dispatch(goSearchByNameAction(searchStr));
        dispatch(goSearchByRublesAction(searchStr));
        dispatch(goSearchByDollarsAction(searchStr));
        dispatch(goSearchByMileageAction(searchStr));
        dispatch(goSearchByCityAction(searchStr));
        dispatch(goSearchByOtherAction(searchStr));
      }, 300);

      setTimeoutSearchId(timeoutId);
    } else {
      timeoutSearchId && clearTimeout(timeoutSearchId);
      dispatch(goClearSearchBarAction());
    }

    setIsPopupMode(!!searchStr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr]);

  // TODO: Наверное можно упростить проверку
  const onClosePopup = (event) => {
    if ([...event.target.classList].includes("search-bar-component")) {
      setIsPopupMode(false);
    }
  };

  const onFocusSearch = () => setIsPopupMode(!!searchStr);

  const onResetSearch = () => {
    setSearchStr("");
    setIsPopupMode(!!searchStr);
  };

  return (
    <div
      className={`search-bar-component ${isPopupMode && "popup-show"} popup`}
      onClick={onClosePopup}
    >
      <InputGroup size="lg" inside>
        <InputGroup.Button className="input-btn-left" classPrefix="">
          <Icon icon="search" />
        </InputGroup.Button>
        <Input
          placeholder="Поиск..."
          value={searchStr}
          onChange={setSearchStr}
          spellCheck="false"
          onFocus={onFocusSearch}
          className={searchStr && "with-value"}
          ref={searchRef}
          classPrefix=""
        />
        {searchStr && (
          <InputGroup.Button
            className="input-btn-right"
            classPrefix=""
            onClick={onResetSearch}
          >
            <Icon icon="close" />
          </InputGroup.Button>
        )}
      </InputGroup>
      <SearchResult show={isPopupMode} />
    </div>
  );
}

export default SearchBar;
