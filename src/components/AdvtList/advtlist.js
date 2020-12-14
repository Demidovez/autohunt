import React from "react";
import { Button } from "rsuite";
import AdvtCard from "../AdvtCard/advtcard";
import css from "./advtlist.module.css";

class AdvtList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      advts: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.updateId !== this.props.updateId) {
      this.setState({ advts: [...this.props.advts] });
    }
  }

  formatNumber = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  showMore = () => {
    this.setState({ isLoading: true });

    this.props.getMore().then((advts) =>
      this.setState({
        advts: [...this.state.advts, ...advts],
        isLoading: false,
      })
    );
  };

  render() {
    const { allCount } = this.props;
    const { isLoading, advts } = this.state;

    return (
      <div>
        {advts.map((advt) => (
          <AdvtCard key={advt.id} advt={advt} className={css.advt} />
        ))}
        {advts.length !== allCount && (
          <div className={css.more}>
            <Button
              appearance="default"
              loading={isLoading}
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
