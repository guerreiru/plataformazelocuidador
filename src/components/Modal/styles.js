import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const View = styled.Modal``;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.65);
`;

export const Card = styled.View`
  width: 75%;
  background-color: ${colors.WHITE};
  border-radius: 5px;
  margin-bottom: 16px;
  shadow-opacity: 0.22;
  shadow-radius: 2.62px;
  elevation: 2;
`;

export const Header = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${colors.PRIMARY};
`;

export const Message = styled.Text`
  font-size: 16px;
  color: ${colors.ITEM.SUBDESCRIPTION};
`;

export const Content = styled.View`
  padding: 24px;
`;

export const Footer = styled.View`
  flex-direction: ${({ direction }) => direction || 'row'};
  padding: 0px 8px 8px 24px;
  justify-content: flex-end;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 36px;
  min-width: 44px;
  padding-right: 20px;
`;

export const TextButton = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.PRIMARY};
`;
