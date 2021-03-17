import React from "react";
import "./styles.scss";
import ResultSearchAdvertCard from "../ResultSearchAdvertCard/resultsearchadvertcard";
import { Button, Icon } from "rsuite";
import { formatNumber } from "../../helpers";

function ResultSearchAdvertList({ tab, getMore, onToFilter }) {
  const { adverts, count, moreAdverts } = tab;

  return (
    <div className="result-search-advert-list-component">
      {[...adverts, ...moreAdverts].map((advert) => (
        <ResultSearchAdvertCard key={advert.id} advert={advert} />
      ))}
      <div className="controls-wrapper">
        <div>
          {adverts.length > 0 && adverts.length !== count && (
            <div className="more">
              <Button appearance="default" onClick={getMore}>
                Показать еще
              </Button>
              <span>
                {formatNumber(adverts.length + moreAdverts.length) +
                  " из " +
                  formatNumber(count)}
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
