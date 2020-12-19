import React from "react";
import { Button, Loader } from "rsuite";
import AdvtCard from "../AdvtCard/advtcard";
import css from "./advtlist.module.css";

class AdvtList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingMore: false,
      isLoading: true,
      advts: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.updateId !== this.props.updateId) {
      this.setState({ advts: [...this.props.advts], isLoading: false });
    }
  }

  formatNumber = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  showMore = () => {
    this.setState({ isLoadingMore: true });

    this.props.getMore().then((advts) =>
      this.setState({
        advts: [...this.state.advts, ...advts],
        isLoadingMore: false,
      })
    );
  };

  render() {
    const { allCount } = this.props;
    const { isLoading, isLoadingMore, advts } = this.state;

    return (
      <div>
        {isLoading && (
          <Loader
            className={css.loader}
            size="md"
            center
            content="Загрузка..."
          />
        )}
        {isLoading === false &&
          advts.map((advt) => (
            <AdvtCard key={advt.id} advt={advt} className={css.advt} />
          ))}
        {isLoading === false && advts.length !== allCount && (
          <div className={css.more}>
            <Button
              appearance="default"
              loading={isLoadingMore}
              onClick={this.showMore}
            >
              Показать еще
            </Button>
            <span>
              {this.formatNumber(advts.length)} из {this.formatNumber(allCount)}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default AdvtList;
