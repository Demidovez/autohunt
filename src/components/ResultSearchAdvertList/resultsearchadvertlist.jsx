import React from "react";
import "./styles.scss";
import ResultSearchAdvertCard from "../ResultSearchAdvertCard/resultsearchadvertcard";
import { Button, Icon } from "rsuite";
import { formatNumber } from "../../helpers";

function ResultSearchAdvertList({ adverts, countAll, onToFilter }) {
  const getMoreAdverts = () => {};

  const moreAdverts = [];

  return (
    <div className="result-search-advert-list-component">
      {adverts.map((advert) => (
        <ResultSearchAdvertCard key={advert.id} advert={advert} />
      ))}
      <div className="controls-wrapper">
        <div>
          {adverts.length > 0 && adverts.length !== countAll && (
            <div className="more">
              <Button appearance="default" onClick={getMoreAdverts}>
                Показать еще
              </Button>
              <span>
                {formatNumber(adverts.length + moreAdverts.length) +
                  " из " +
                  formatNumber(countAll)}
              </span>
            </div>
          )}
        </div>
        <Button
          appearance="link"
          onClick={onToFilter}
          className="link-advanced-search"
        >
          <Icon icon="search" />
          <span>Расширенный поиск</span>
        </Button>
      </div>
    </div>
  );
}

export default ResultSearchAdvertList;
