import styled from 'styled-components/native';
import colors from 'styles/colors';

export const ContainerButtonModal = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
  padding-left: 15px;
  padding-right: 30px;
`;

export const ContainerTerms = styled.View`
  flex-direction: row;
  margin-bottom: 32px;
`;

export const TextTerms = styled.Text`
  color: black;
  font-size: 16px;
  margin: 0 0 0 10px;
  width: 80%;
`;

export const LinkTerms = styled.Text`
  color: ${colors.PRIMARY};
  text-decoration: underline;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.TITLE};
  margin-bottom: 8px;
  font-weight: 600;
`;
