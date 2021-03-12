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
import "./styles.scss";

function FilterCard() {
  const [isEnableNotification, setIsEnableNotification] = React.useState(false);
  const [titleFilter] = React.useState("Шкода Октавия");
  const [showModalRemoveFilter, setShowModalRemoveFilter] = React.useState(
    false
  );
  const [enabledFilter, setEnabledFilter] = React.useState(true);

  const toggleNotification = () => {
    setIsEnableNotification(!isEnableNotification);

    Alert.success(
      `Уведомления по фильтру ${titleFilter} ${
        isEnableNotification ? "включены" : "отключены"
      }!`
    );
  };

  const stateFilter = (status) => {
    setEnabledFilter(status);

    enabledFilter
      ? Alert.success(`Фильтр ${titleFilter} включен!`)
      : Alert.error(`Фильтр ${titleFilter} отключен!`);
  };

  const closeModal = () => setShowModalRemoveFilter(false);

  const openModal = () => setShowModalRemoveFilter(true);

  // TODO: Наверное нужно создать стейт для алерт, и использовать useEffect
  const confirmModal = () => {
    setShowModalRemoveFilter(false);
    Alert.error("Фильтр удален!");
  };

  return (
    <Panel className={`filter-card-component ${!enabledFilter && "disabled"}`}>
      <Container>
        <Header>
          <h4>{titleFilter}</h4>
        </Header>
        <Content>
          <div className="tags-wrapper">
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
              <div className="count-adverts">
                <span>Найденно: 30</span>
                <Divider vertical />
                <span className="new-adverts">Новых: 3</span>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={8}>
              <div className="controls-wrapper">
                <Toggle checked={enabledFilter} onChange={stateFilter} />
                <Icon
                  icon={isEnableNotification ? "bell-o" : "bell-slash"}
                  size="lg"
                  onClick={toggleNotification}
                />
                <Icon
                  icon="trash-o"
                  size="lg"
                  onClick={openModal}
                  className="remove-icon"
                />
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Footer>
      </Container>

      {/* TODO: Может модалы вынести в отдельный компонент? */}
      <Modal show={showModalRemoveFilter} onHide={closeModal} size="xs">
        <Modal.Body className="modal">
          <Icon icon="remind" />
          Вы уверены, что хотите удалить фильтр {titleFilter}?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirmModal} appearance="primary">
            Да
          </Button>
          <Button onClick={closeModal} appearance="subtle">
            Нет
          </Button>
        </Modal.Footer>
      </Modal>
    </Panel>
  );
}

export default FilterCard;
