import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetcher, fetcherWithParams } from "../../api/fetcher";
import { useState } from "react";

export const useReportHistory = () => {
    const [listReports, setListReports] = useState([]);

    const getListReport = async () => {
        const classId = await AsyncStorage.getItem("classInfo");
        try {
            const response = await fetcherWithParams("Report", {classId: classId})
            const reportCreated = await Promise.all(
                response.map(async (report) => {
                    const term = await fetcher(`Term/${report.termId}`);
                    return {
                        ...report,
                        createdAt: term.createdAt
                    }
                })
            )
            setListReports(reportCreated);
        } catch (error) {
            console.log(error);
        }
    }
    return {
        listReports,
        getListReport,
    }
}