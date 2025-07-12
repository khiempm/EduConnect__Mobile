import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetcherWithParams } from "../../../api/fetcher";
import { useState } from "react";

export const useReportHistory = () => {
    const [listReports, setListReports] = useState([]);

    const getListReport = async () => {
        const classId = await AsyncStorage.getItem("classInfo");
        try {
            const response = await fetcherWithParams("Report", {
                classId: classId,
            })
            setListReports(response);
        } catch (error) {
            console.log(error);
        }
    }
    return {
        listReports,
        getListReport,
    }
}