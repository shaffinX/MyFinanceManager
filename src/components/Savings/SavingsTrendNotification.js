import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifySavingsTrend = (savingsTrend) => {
  if (typeof savingsTrend?.isPositive !== "boolean") return;

  toast.info(
    savingsTrend.isPositive
      ? `🎉 Positive Trend! Your savings increased by ${savingsTrend.percentage}% compared to last month.`
      : `⚠️ Negative Trend! Your savings decreased by ${savingsTrend.percentage}% compared to last month.`,
    {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};

const SavingsTrendNotification = ({ savingsTrend }) => {
  useEffect(() => {
    if (savingsTrend) {
      notifySavingsTrend(savingsTrend);
    }
  }, [savingsTrend]);

  return <ToastContainer />;
};

export default SavingsTrendNotification;