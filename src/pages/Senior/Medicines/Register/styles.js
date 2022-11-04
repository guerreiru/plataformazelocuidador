import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import colors from 'styles/colors';

export const Title = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.67);
  margin: 16px;
`;

export const FlatList = styled.FlatList`
  background-color: ${colors.WHITE};
`;

export const Divider = styled.View`
  width: 100%;
  margin-bottom: 8px;
  border: 1px solid rgba(0, 0, 0, 0.07);
`;

export const Container = styled.View`
  margin-horizontal: 16px;
`;

export const FilterButton = styled.TouchableOpacity`
  padding-right: 20px;
`;

export const FilterText = styled.Text`
  font-size: 14px;
  color: ${colors.WHITE};
`;

export const FilterTitle = styled.Text`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.67);
`;

export const FilterDisplay = styled.View`
  background: rgba(106, 75, 176, 0.27);
  border-radius: 32px;
  padding: 6px 2px 6px 12px;
  flex-direction: row;
`;

export const FilterLabel = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.67);
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

export const Footer = styled.View`
  height: 20px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: ${colors.PRIMARY};
  margin-bottom: 16px;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.67);
`;

export const FilterClose = styled.TouchableOpacity`
  height: 18px;
  width: 18px;
  background: rgba(0, 0, 0, 0.67);
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  margin-horizontal: 8px;
`;

export const FilterIconClose = styled(MIcon)`
  color: ${colors.WHITE};
  font-size: 15px;
`;
