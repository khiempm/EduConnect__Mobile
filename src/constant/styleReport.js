import styled from "styled-components/native";
import { Colors } from "./color";
import Constants from "expo-constants";

const {primary, secondary, tertiary, darkLight, brand, background, active,} = Colors;
const StatusBarHeight = Constants.statusBarHeight;

export const ReportContainer = styled.View`
  flex: 1;
  background-color: ${background};
  padding: 20px;
  margin-top: ${StatusBarHeight}px;
`;

export const ReportHeader = styled.View`
  background-color: ${primary};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ReportTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${tertiary};
  text-align: center;
  margin-bottom: 10px;
`;

export const ReportSubtitle = styled.Text`
  font-size: 16px;
  color: ${darkLight};
  text-align: center;
  line-height: 22px;
`;

export const ReportTypeContainer = styled.View`
  background-color: ${primary};
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ReportTypeTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${tertiary};
  margin-bottom: 15px;
`;

export const ReportTypeGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ReportTypeCard = styled.TouchableOpacity`
  width: 48%;
  background-color: ${(props) => (props.selected ? active : secondary)};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 3;
`;

export const ReportTypeIcon = styled.View`
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.selected ? primary : brand)};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const ReportTypeText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.selected ? primary : tertiary)};
  text-align: center;
`;

export const DatePickerContainer = styled.View`
  background-color: ${primary};
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const DatePickerTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${tertiary};
  margin-bottom: 15px;
`;

export const DatePickerButton = styled.TouchableOpacity`
  background-color: ${secondary};
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DatePickerText = styled.Text`
  font-size: 16px;
  color: ${tertiary};
`;

export const TimeContainer = styled.View`
  background-color: ${primary};
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const TimeTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${tertiary};
  margin-bottom: 15px;
`;

export const TimePicker = styled.TouchableOpacity`
  background-color: ${secondary};
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TimeText = styled.Text`
  font-size: 16px;
  color: ${tertiary};
`;

export const GenerateButton = styled.TouchableOpacity`
  background-color: ${brand};
  padding: 18px;
  border-radius: 12px;
  align-items: center;
  margin-top: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const GenerateButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${primary};
`;

export const InfoText = styled.Text`
  font-size: 14px;
  color: ${darkLight};
  text-align: center;
  margin-top: 10px;
  line-height: 20px;
`;

export const YearPickerModal = styled.View`
  background-color: ${primary};
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.22);
`;

export const ModalContent = styled.View`
  background-color: ${primary};
  border-radius: 15px;
  padding: 20px;
  width: 80%;
  max-height: 60%;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${tertiary};
  margin-bottom: 20px;
  text-align: center;
`

export const ModalItem = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${secondary};
  background-color: transparent;
`;

export const ModalItemText = styled.Text`
  font-size: 16px;
  color: ${tertiary};
  font-weight: 600;
`

export const ModalItemSubText = styled.Text`
  font-size: 12px;
  color: ${brand}; 
  margin-top: 2px;
`

export const ModalCloseButton = styled.TouchableOpacity`
  padding: 15px;
  margin-top: 10px;
`

export const ModalCloseButtonText = styled.Text`
  font-size: 16px;
  color: ${brand};
  text-align: center;
`