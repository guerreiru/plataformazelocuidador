import styled from 'styled-components/native';
import colors from 'styles/colors';

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.TITLE};
`;

export const ContainerButton = styled.View``;

export const TextButton = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.PRIMARY};
`;

export const ContainerTitle = styled.View`
  padding-horizontal: 16px;
`;

export const Divider = styled.View`
  width: 100%;
  margin-vertical: 15px;
  border: 1px solid rgba(0, 0, 0, 0.09);
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${({ primary }) => (primary ? colors.PRIMARY : colors.SUBTITLE)};
`;

export const Row = styled.View`
  flex-direction: row;
`;
