import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from 'styles/colors';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0px 16px 0px 16px;
`;

export const Content = styled.View`
  padding: 16px;
`;

export const Divider = styled.View`
  width: 100%;
  margin-top: 16px;
  border: 1px solid rgba(0, 0, 0, 0.07);
`;

export const ContainerDate = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled(MIcon)``;

export const TitleDate = styled.Text`
  font-size: 12px;
  margin-left: 8px;
  color: ${colors.PRIMARY};
  text-align-vertical: center;
`;

export const Description = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.PRIMARY};
`;

export const Title = styled.Text`
  margin-top: 5px;
  font-size: 16px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${colors.SUBTITLE};
`;

export const CardContent = styled.View`
  padding: 16px;
  justify-content: flex-start;
`;

export const Area = styled.View`
  margin-top: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.67);
`;

export const Text = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.67);
`;
