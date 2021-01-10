import React from "react";
import {
  Panel,
  Container,
  Content,
  Divider,
  Footer,
  Header,
  FlexboxGrid,
  Button,
  Icon,
  Alert,
  Modal,
  Tag,
  Toggle,
} from "rsuite";
import css from "./filtercard.module.css";

class FilterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnableNotification: false,
      title: "Шкода Октавия",
      showModal: false,
      enabled: true,
    };
  }

  formatNumber = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  toggleNotification = () => {
    this.setState(
      { isEnableNotification: !this.state.isEnableNotification },
      () =>
        Alert.success(
          `Уведомления по фильтру ${this.state.title} ${
            this.state.isEnableNotification ? "включены" : "отключены"
          }!`
        )
    );
  };

  stateFilter = (status) => {
    this.setState({ enabled: status }, () => {
      this.state.enabled
        ? Alert.success(`Фильтр ${this.state.title} включен!`)
        : Alert.error(`Фильтр ${this.state.title} отключен!`);
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  confirmModal = () => {
    this.setState({ showModal: false }, () => Alert.error("Фильтр удален!"));
  };

  render() {
    const { isEnableNotification, title, showModal, enabled } = this.state;

    return (
      <Panel className={`${css.container} ${!enabled && css.disabled}`}>
        <Container>
          <Header>
            <h4>{title}</h4>
          </Header>
          <Content>
            <div className={css.tagswrap}>
              <Tag>Шкода</Tag>
              <Tag>Октавия</Tag>
              <Tag>2015</Tag>
              <Tag>1.6</Tag>
              <Tag>130 000км</Tag>
              <Tag>до 10 000$</Tag>
              <Tag>Шкода</Tag>
              <Tag>Октавия</Tag>
              <Tag>2015</Tag>
              <Tag>1.6</Tag>
              <Tag>130 000км</Tag>
              <Tag>до 10 000$</Tag>
              <Tag>Шкода</Tag>
              <Tag>Октавия</Tag>
              <Tag>2015</Tag>
              <Tag>1.6</Tag>
              <Tag>130 000км</Tag>
              <Tag>до 10 000$</Tag>
            </div>
          </Content>
          <Footer>
            <FlexboxGrid align="bottom">
              <FlexboxGrid.Item colspan={16}>
                <Button appearance="primary" href={`asdasdasd`} target="_blank">
                  Подробнее
                </Button>
                <div className={css.count_advts}>
                  <span>Найденно: 30</span>
                  <Divider vertical />
                  <span className={css.new_advts}>Новых: 3</span>
                </div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={8}>
                <div className={css.controls_wrapper}>
                  <Toggle checked={enabled} onChange={this.stateFilter} />
                  <Icon
                    icon={isEnableNotification ? "bell-o" : "bell-slash"}
                    size="lg"
                    onClick={this.toggleNotification}
                  />
                  <Icon
                    icon="trash-o"
                    size="lg"
                    onClick={this.openModal}
                    className={css.remove_icon}
                  />
                </div>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Footer>
        </Container>

        {/* TODO: Может модалы вынести в отдельный компонент? */}
        <Modal show={showModal} onHide={this.closeModal} size="xs">
          <Modal.Body className={css.modal}>
            <Icon icon="remind" />
            Вы уверены, что хотите удалить фильтр {title}?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.confirmModal} appearance="primary">
              Да
            </Button>
            <Button onClick={this.closeModal} appearance="subtle">
              Нет
            </Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    );
  }
}

export default FilterCard;
