import styled from 'styled-components/native';
import colors from '../../../styles/colors';

import { TextInputMask as InputMask } from 'react-native-masked-text';

export const TextInputMask = styled(InputMask)`
  font-size: 20px;
  color: ${colors.TITLE};
  flex: 1;
  padding-top: 11px;
  padding-bottom: 1px;
  padding-left: 20px;
  padding-right: 16px;
  min-width: 60px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
`;

export const InputBox = styled.View`
  min-width: 60px;
  margin-top: 4px;
  margin-bottom: 10px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: space-between;
  background: ${colors.INPUT.BACKGROUND};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-width: 1px;
  border-color: ${colors.INPUT.BORDER};
`;

export const CardCenter = styled.View`
  padding-top: 9px;
  align-items: center;
  justify-content: center;
`;

export const ContainerButton = styled.View`
  flex-direction: ${({ direction }) => (direction ? `${direction}` : 'column')};
  align-items: flex-end;
  padding-right: 28px;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: ${colors.BLACK_TRANSP(67)};
  text-align: center;
  font-style: italic;
`;

export const Separator = styled.Text`
  font-size: 16px;
  color: ${colors.BLACK_TRANSP(67)};
  text-align: center;
  padding-top: 15px;
  padding-right: 4px;
  padding-left: 4px;
`;

export const IntervalHours = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

export const ButtonModal = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  min-height: 36px;
  min-width: 44px;
  padding-right: 20px;
`;

export const TextButtonModal = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.PRIMARY};
`;
