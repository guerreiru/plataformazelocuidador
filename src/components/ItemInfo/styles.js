import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex-direction: column;
  border-top-width: 1px;
  border-color: ${colors.ITEM.BORDER};
`;
export const Label = styled.Text`
  font-size: 16px;
  margin-left: 16px;
  color: ${colors.PRIMARY};
  margin-top: 14px;
`;

export const Description = styled.Text`
  margin-left: 16px;
  font-size: 14px;
  margin-top: 3px;
  margin-bottom: 14px;
  color: ${colors.ITEM.SUBDESCRIPTION};
`;
