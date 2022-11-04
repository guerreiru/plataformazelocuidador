import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  ContainerLink,
  ContainerBlock,
  Link,
  LabelLink,
  Left,
  Right,
  Icon,
  IconText,
  LinkChat,
} from './styles';
import ContainerItem from 'components/ContainerItem';
import ProfileHeader from 'components/ProfileHeader';
import useSenior from 'hooks/useSenior';

import IconGray from '../../../../assets/messagegrey.png';
import IconOrange from '../../../../assets/mode_commentorange.png';
import { useSelector } from 'react-redux';

const Item = ({ onPress, seniorId, ...rest }) => {
  const { getSenior } = useSenior();
  const { navigate } = useNavigation();

  const counter = useSelector((state) =>
    state.chat.data[seniorId] ? state.chat.data[seniorId].unreadCount : 0,
  );

  const setNavigate = async (routeName) => {
    await getSenior(seniorId);
    navigate(routeName);
  };

  const linksInfo = [
    {
      label: 'ROTINA',
      onPress: () => setNavigate('CarePlan'),
    },
    {
      label: 'MEDICAMENTOS',
      onPress: () => setNavigate('Medicines'),
    },
  ];

  const renderIconChat = () => {
    return (
      <LinkChat onPress={() => setNavigate('Teams')}>
        <Icon source={counter > 0 ? IconOrange : IconGray} resizeMode="cover">
          {counter > 0 && <IconText>{counter}</IconText>}
        </Icon>
      </LinkChat>
    );
  };

  const renderItem = (item, index) => {
    return (
      <Link
        key={index}
        onPress={() => {
          item.onPress();
        }}>
        <LabelLink> {item.label} </LabelLink>
      </Link>
    );
  };

  return (
    <ContainerItem onPress={onPress}>
      <ContainerBlock>
        <Left>
          <ProfileHeader {...rest} />
          <ContainerLink>
            {linksInfo.map((item, index) => renderItem(item, index))}
          </ContainerLink>
        </Left>
        <Right>{renderIconChat()}</Right>
      </ContainerBlock>
    </ContainerItem>
  );
};

export default Item;
