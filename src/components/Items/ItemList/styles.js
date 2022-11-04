import styled from 'styled-components/native';
import colors from '../../../styles/colors';

export const SubLabel = styled.Text`
  font-size: 14px;
  margin-left: 16px;
  color: ${colors.SUBTITLE};
`;

export const Label = styled.Text`
  font-size: 16px;
  margin-left: 16px;
  color: ${colors.PRIMARY};
`;

export const Divider = styled.View`
  width: 100%;
  margin-vertical: 15px;
  border: 1px solid rgba(0, 0, 0, 0.09);
`;
