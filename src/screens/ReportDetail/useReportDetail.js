import { useState } from "react";
import { fetcher, postData } from "../../api/fetcher";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const useReportDetail = () => {
    const [timeDetail, setTimeDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const getReportTerm = async (report) => {
        if (!report || !report.termId) {
            setError("Không có thông tin termId");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetcher(`Term/${report.termId}`);
            if(response){
                setTimeDetail(response);
            } else {
                setError("Không thể tải dữ liệu");
            }
        } catch (error) {
            console.log("Error fetching report detail:", error);
            setError("Có lỗi xảy ra khi tải dữ liệu");
        } finally {
            setLoading(false);
        }
    }

    const sendReport = async (report) => {
        try {
            const response = await postData("Report", report)
            if(response){
                Alert.alert("Thành công", "Báo cáo đã được tạo thành công.", [
                    {
                      text: "OK",
                      onPress: () => navigation.navigate("ReportHistory"),
                    },
                  ]);
            } else {
                setError("Không thể gửi báo cáo");
            }
        } catch (error) {
            console.log("Error sending report:", error);
        }
    }

    return {
        timeDetail,
        loading,
        error,
        getReportTerm,
        sendReport
    }
}