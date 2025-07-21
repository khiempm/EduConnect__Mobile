import { useState } from "react";
import { fetcher } from "../../api/fetcher";

export const useReportDetail = () => {
    const [timeDetail, setTimeDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return {
        timeDetail,
        loading,
        error,
        getReportTerm,
    }
}