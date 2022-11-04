import styled from 'styled-components/native';
import colors from '../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const setColor = ({ isActive }) => (isActive ? colors.PRIMARY : colors.TITLE);

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  ${({ showBorders }) => {
    if (showBorders) {
      return `border-top-width: 1px;
              border-top-color: ${colors.LIGHT_GRAY}`;
    }
  }}
  ${({ paddingLeft }) => {
    if (paddingLeft) {
      return `paddingLeft: ${paddingLeft}px`;
    }
  }}
`;
export const ContainerIcon = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SubContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const ContainerDescription = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const Icon = styled(MaterialIcon)`
  color: ${setColor};
  font-size: 24px;
  margin: 22px 27px;
`;

export const Arrows = styled(MaterialIcon)`
  color: ${colors.CHECKBOX};
  font-size: 24px;
  margin: 22px 27px;
`;

export const ImageIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin: 22px 27px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${setColor};
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${colors.ITEM.DESCRIPTION};
`;

export const IconError = styled(MaterialIcon)`
  color: ${colors.ERROR};
  font-size: 20px;
  margin-top: 22px;
`;

export const IconAntDesign = styled(AntDesign)`
  color: ${setColor};
  font-size: 24px;
  margin: 22px 27px;
`;
