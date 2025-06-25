import Constants from "expo-constants";
import styled from "styled-components/native";
import { Colors } from "./color";

const { primary, darkLight, backgroundBrand, brand, black } = Colors;
const StatusBarHeight = Constants.statusBarHeight;

export const ContainerNote = styled.ScrollView`
  flex: 1;
  padding: 20px;
  padding-top: ${StatusBarHeight + 5}px;
  background-color: ${primary};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 10px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  flex: 0.8;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Star = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${darkLight};
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 10px;
`;

export const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
`;

export const Tag = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${backgroundBrand};
  margin: 4px;
`;

export const TagText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${brand};
`;

export const TagSelected = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${brand};
  padding: 16px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const SubmitButtonText = styled.Text`
  color: ${primary};
  font-size: 18px;
  font-weight: bold;
`;

export const Textarea = styled.TextInput`
  border-width: 1px;
  border-color: ${darkLight};
  border-radius: 12px;
  padding: 16px;
  min-height: 300px;
  font-size: 16px;
  margin-bottom: 24px;
  margin-top: 8px;
  color: ${black};
  background-color: ${backgroundBrand};
  text-align-vertical: top;
`;
