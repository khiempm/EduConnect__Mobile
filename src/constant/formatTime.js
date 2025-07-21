export const compareDate = (schedule, date) => {
    return schedule.filter(item => {
        const scheduleDate = new Date(item.rawStartTime);
        const selectedDate = new Date(date);
        return (
            scheduleDate.getFullYear() === selectedDate.getFullYear() &&
            scheduleDate.getMonth() === selectedDate.getMonth() &&
            scheduleDate.getDate() === selectedDate.getDate()
        );
    })
}
export const formatMonth = (date) => {
    return date.toLocaleDateString("vi-VN", {
      month: "long",
      year: "numeric",
    });
  };

export const formatDate = (time) => {
    const selectedDate = new Date(time);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return selectedDate.toLocaleDateString(undefined, options);
}

export const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = hours >= 12 ? "CH" : "SA";
    hours = hours % 12;
    if(hours === 0 && time === "CH"){
        hours = 12;
    }
    return `${hours}:${minutes} ${time}`;
  };

export const sortByStartTimeDesc = (schedule) => {
    return schedule.sort((a, b) => {
        const dateA = new Date(a.rawStartTime);
        const dateB = new Date(b.rawStartTime);
        return dateB - dateA; 
    });
};

export const sortByStartTimeAsc = (schedule) => {
    return schedule.sort((a, b) => {
        const dateA = new Date(a.rawStartTime);
        const dateB = new Date(b.rawStartTime);
        return dateA - dateB; 
    });
};

export const sortByCreatedTimeDesc = (reports) => {
    return reports.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA; 
    });
};
