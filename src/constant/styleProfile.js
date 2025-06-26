import styled from "styled-components/native";
import { Colors } from "./color";

const { background, primary, black, secondary, brand, darkLight} = Colors;

export const ContainerProfile = styled.View`
    flex: 1;
    background-color: ${primary};
`;

export const Header = styled.View`
    background-color: ${brand};
    padding-top: 50px;
    padding-bottom: 20px;
    padding-horizontal: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: ${primary};
`;

export const ProfileContainer = styled.View`
    flex: 1;
    padding-horizontal: 15px;
    padding-top: 20px;
`;

export const ProfileHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
`;

export const ProfileTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${black};
    margin-left: 8px;
`; 

export const ProfileEditContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

export const ProfileEdit = styled.Text`
    font-size: 16px;
    color: ${black};
    margin-left: 8px;
`; 

export const ProfileContent = styled.View`
    flex-direction: column;
    gap: 10px;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
`;

export const IconContainer = styled.View`
    width: 32px;
    align-items: center;
    justify-content: center;
`;

export const Separator = styled.View`
    height: 1px;
    background-color: #e0e0e0;
    margin-vertical: 10px;
`;

export const ClassItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding-vertical: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #e0e0e0;
    background-color: ${secondary};
    border-radius: 7px;
    margin-bottom: 7px;
`;

export const ClassColorBar = styled.View`
    width: 4px;
    height: 50px;
    border-radius: 2px;
    margin-right: 10px;
    background-color: ${props => props.color || brand};
`;

export const ClassName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${black};
    margin-bottom: 5px;
`;

export const ClassItemContainer = styled.View`
    flex-direction: column;
    align-items: flex-start;
`;

export const ClassTerm = styled.Text`
    font-size: 14px;
    color: ${brand};
`;