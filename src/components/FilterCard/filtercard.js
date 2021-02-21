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

  // TODO: Наверное нужно сосздать стейт для алерт, и использова useEffect
  const confirmModal = () => {
    setShowModalRemoveFilter(false);
    Alert.error("Фильтр удален!");
  };

  return (
    <Panel className={`${css.container} ${!enabledFilter && css.disabled}`}>
      <Container>
        <Header>
          <h4>{titleFilter}</h4>
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
                  className={css.remove_icon}
                />
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Footer>
      </Container>

      {/* TODO: Может модалы вынести в отдельный компонент? */}
      <Modal show={showModalRemoveFilter} onHide={closeModal} size="xs">
        <Modal.Body className={css.modal}>
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
