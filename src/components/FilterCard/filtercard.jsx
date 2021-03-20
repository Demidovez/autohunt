import React, { useState } from "react";
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
  IconButton,
} from "rsuite";
import "./styles.scss";
import { useDispatch } from "react-redux";
import {
  removeSavedFilterAction,
  updateSavedFilterAction,
} from "../../actions/creators/userActionCreators";

function FilterCard({ filter }) {
  const { name, color, isActive, isMute, tags } = filter;

  const dispatch = useDispatch();

  const [showModalRemoveFilter, setShowModalRemoveFilter] = useState(false);

  const toggleNotification = () => {
    dispatch(updateSavedFilterAction({ ...filter, isMute: !isMute }));

    !isMute
      ? Alert.success(`Уведомления по фильтру «${name}» включены!`)
      : Alert.error(`Уведомления по фильтру «${name}» отключены!`);
  };

  const stateFilter = (status) => {
    dispatch(updateSavedFilterAction({ ...filter, isActive: status }));

    status
      ? Alert.success(`Фильтр «${name}» включен!`)
      : Alert.error(`Фильтр «${name}» отключен!`);
  };

  const closeModal = () => setShowModalRemoveFilter(false);

  const openModal = () => setShowModalRemoveFilter(true);

  // TODO: Наверное нужно создать стейт для алерт, и использовать useEffect
  const confirmModal = () => {
    setShowModalRemoveFilter(false);
    Alert.error("Фильтр удален!");

    dispatch(removeSavedFilterAction(filter.id));
  };

  return (
    <Panel className={`filter-card-component ${!isActive ? "disabled" : ""}`}>
      <Container>
        <Header>
          <h4>{name}</h4>
        </Header>
        <Content>
          <div className="tags-wrapper">
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        </Content>
        <Footer>
          <FlexboxGrid align="bottom">
            <FlexboxGrid.Item colspan={16}>
              <IconButton
                icon={<Icon icon="search" />}
                color="blue"
                className="btn-more"
              >
                Подробнее
              </IconButton>
              <div className="count-adverts">
                <span>Найденно: 30</span>
                <Divider vertical />
                <span className="new-adverts">Новых: 3</span>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={8}>
              <div className="controls-wrapper">
                <Toggle checked={isActive} onChange={stateFilter} />
                <div className="is-mute-wrapper">
                  <Icon
                    icon={isMute ? "bell-o" : "bell-slash"}
                    size="lg"
                    onClick={toggleNotification}
                  />
                </div>
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
        <Modal.Body className="filter-card-modal">
          <Icon icon="remind" />
          Вы уверены, что хотите удалить фильтр {name}?
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
