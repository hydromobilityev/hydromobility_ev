import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  api_url,
  base_url,
  corporate_customer_corporate_monthly_settlement,
  corporate_customer_promo_codes,
  mpesa_check_status,
  payment_statement_download,
  quick_mpesa,
  trip_invoice_download,
} from "../constants/constant";
import HelpModal from "./HelpModal";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const navigate = useNavigate();
  const {
    user,
    appSettings,
    appliedPromoIds,
    saveAppliedPromoId,
    removeAppliedPromoId,
  } = useAuth();

  useEffect(() => {
    if (user?.user_type !== "corporate_customer") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState("statements");
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { t } = useTranslation();
  const { language } = useLanguage();

  const [paymentsData, setPaymentsData] = useState([]);
  const [promotionsData, setPromotionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [error, setError] = useState("");
  const [promoError, setPromoError] = useState("");
  const [applyingPromo, setApplyingPromo] = useState(null);

  const [pendingBills, setPendingBills] = useState([]);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);

  // Statement Modal
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);
  const [downloadingTripPdf, setDownloadingTripPdf] = useState(false);
  const [downloadingTripExcel, setDownloadingTripExcel] = useState(false);

  // M-Pesa Payment
  const [mpesaAmount, setMpesaAmount] = useState("");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [checkoutRequestID, setCheckoutRequestID] = useState("");
  const [merchantRequestID, setMerchantRequestID] = useState("");
  const [isProcessingMpesa, setIsProcessingMpesa] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [paymentForBill, setPaymentForBill] = useState(null);
  const statusCheckIntervalRef = useRef(null);
  const paymentTimeoutRef = useRef(null);

  const openHelpModal = () => setShowHelpModal(true);
  const closeHelpModal = () => setShowHelpModal(false);

  // M-PESA modal
  const openMpesaModal = (bill = null) => {
    if (bill) {
      const roundedAmount = parseFloat(bill.total).toFixed(2);
      setMpesaAmount(roundedAmount);
      setMpesaPhone(
        user?.phone_with_code ? user.phone_with_code.replace("+", "") : "",
      );
      setPaymentForBill(bill);
    } else {
      setMpesaAmount("");
      setMpesaPhone(
        user?.phone_with_code ? user.phone_with_code.replace("+", "") : "",
      );
      setPaymentForBill(null);
    }
    setPaymentStatus("");
    setCheckoutRequestID("");
    setMerchantRequestID("");
    setIsProcessingMpesa(false);
    setIsCheckingStatus(false);
    setShowMpesaModal(true);
  };

  const closeMpesaModal = () => {
    if (statusCheckIntervalRef.current) {
      clearInterval(statusCheckIntervalRef.current);
      statusCheckIntervalRef.current = null;
    }
    if (paymentTimeoutRef.current) {
      clearTimeout(paymentTimeoutRef.current);
      paymentTimeoutRef.current = null;
    }

    setShowMpesaModal(false);
    setMpesaAmount("");
    setMpesaPhone("");
    setCheckoutRequestID("");
    setMerchantRequestID("");
    setPaymentForBill(null);
    setPaymentStatus("");
    setIsProcessingMpesa(false);
    setIsCheckingStatus(false);
  };

  useEffect(() => {
    if (paymentsData.length > 0) {
      const pending = paymentsData.filter(
        (payment) => payment.status === "Initiated",
      );
      setPendingBills(pending);
      setTotalPendingAmount(
        pending.reduce((sum, bill) => sum + parseFloat(bill.total || 0), 0),
      );
    }
  }, [paymentsData]);

  const handleMpesaPayment = async () => {
    if (!user?.id) {
      toast.error(t("user_not_found"));
      return;
    }

    if (!mpesaAmount || parseFloat(mpesaAmount) <= 0) {
      toast.error(t("please_enter_valid_amount"));
      return;
    }

    if (!mpesaPhone.trim()) {
      toast.error(t("please_enter_phone_number"));
      return;
    }

    try {
      setPaymentStatus("initiating");
      setIsProcessingMpesa(true);

      const paymentStatementId = paymentForBill?.payment_statement_id;

      const amount = parseFloat(mpesaAmount);
      const roundedAmount = Math.round(amount);

      if (!paymentStatementId) {
        throw new Error(t("invalid_bill_selected"));
      }

      if (roundedAmount <= 0) {
        throw new Error(t("amount_must_be_at_least_1_shilling"));
      }

      const apiUrl = `${base_url}${quick_mpesa}${mpesaPhone}/${roundedAmount}/${paymentStatementId}`;

      const response = await axios.get(apiUrl, {
        timeout: 30000, // 30 second timeout
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data?.ResponseCode === "0") {
        const checkoutRequestId = response.data.CheckoutRequestID;
        const merchantRequestId = response.data.MerchantRequestID;

        setCheckoutRequestID(checkoutRequestId);
        setMerchantRequestID(merchantRequestId);
        setPaymentStatus("processing");

        toast.success(t("mpesa_payment_initiated"));

        startPaymentStatusCheck(checkoutRequestId);

        paymentTimeoutRef.current = setTimeout(() => {
          if (paymentStatus === "processing") {
            setPaymentStatus("expired");
            toast.error(t("payment_expired_please_try_again"));

            if (statusCheckIntervalRef.current) {
              clearInterval(statusCheckIntervalRef.current);
              statusCheckIntervalRef.current = null;
            }

            setIsProcessingMpesa(false);
            setIsCheckingStatus(false);
          }
        }, 120000);
      } else {
        const errorMessage =
          response.data?.ResponseDescription || t("payment_initiation_failed");
        throw new Error(errorMessage);
      }
    } catch (error) {
      let errorMsg = t("payment_initiation_failed");

      if (error.response?.data?.ResponseDescription) {
        errorMsg = error.response.data.ResponseDescription;
      } else if (error.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }

      toast.error(errorMsg);
      setPaymentStatus("failed");
      setIsProcessingMpesa(false);
    }
  };

  const checkPaymentStatus = async (checkoutRequestId) => {
    try {
      setIsCheckingStatus(true);

      const response = await axios.post(
        `${api_url}${mpesa_check_status}`,
        {
          payment_id: checkoutRequestId,
        },
        {
          timeout: 15000,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (response.data?.status === 1) {
        clearInterval(statusCheckIntervalRef.current);
        statusCheckIntervalRef.current = null;

        if (paymentTimeoutRef.current) {
          clearTimeout(paymentTimeoutRef.current);
          paymentTimeoutRef.current = null;
        }

        if (paymentForBill) {
          setPaymentsData((prev) =>
            prev.map((payment) =>
              payment.payment_statement_id ===
              paymentForBill.payment_statement_id
                ? { ...payment, status: "Approved" }
                : payment,
            ),
          );

          setPaymentForBill((prev) =>
            prev ? { ...prev, status: "Approved" } : null,
          );

          if (
            showStatementModal &&
            selectedStatement?.payment_statement_id ===
              paymentForBill.payment_statement_id
          ) {
            setSelectedStatement((prev) =>
              prev ? { ...prev, status: "Approved" } : null,
            );
          }
        }

        setPaymentStatus("success");
        setIsProcessingMpesa(false);
        setIsCheckingStatus(false);

        toast.success(
          `${t("payment_successful")}! ${t("amount")} ${
            appSettings?.default_currency_symbol
          }${mpesaAmount} ${t("paid_for")} ${
            paymentForBill?.payment_period || t("bill")
          }`,
        );

        setTimeout(() => {
          closeMpesaModal();
        }, 3000);

        return true;
      } else if (response.data?.status === 0) {
        return false;
      } else if (response.data?.status === -1 || response.data?.status === 2) {
        throw new Error(response.data?.message || t("payment_failed"));
      } else {
        return false;
      }
    } catch (error) {
      return false;
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const startPaymentStatusCheck = (checkoutRequestId) => {
    if (statusCheckIntervalRef.current) {
      clearInterval(statusCheckIntervalRef.current);
      statusCheckIntervalRef.current = null;
    }

    checkPaymentStatus(checkoutRequestId);

    statusCheckIntervalRef.current = setInterval(async () => {
      const isComplete = await checkPaymentStatus(checkoutRequestId);
      if (isComplete) {
        clearInterval(statusCheckIntervalRef.current);
        statusCheckIntervalRef.current = null;
      }
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (statusCheckIntervalRef.current) {
        clearInterval(statusCheckIntervalRef.current);
      }
      if (paymentTimeoutRef.current) {
        clearTimeout(paymentTimeoutRef.current);
      }
    };
  }, []);

  const handlePayNow = (statement) => {
    openMpesaModal(statement);
  };

  const fetchSettlements = async () => {
    if (user?.user_type !== "corporate_customer") return;

    let isMounted = true;
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${api_url}${corporate_customer_corporate_monthly_settlement}`,
        { corporate_customer_id: user?.id },
        {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (isMounted) {
        if (
          response.data?.status === true &&
          Array.isArray(response.data?.data)
        ) {
          setPaymentsData(response.data.data);
        } else {
          setPaymentsData([]);
          if (response.data?.data?.length === 0) {
            setError("No data available");
          } else {
            setError("Failed to load data");
          }
        }
      }
    } catch (err) {
      if (isMounted) {
        setPaymentsData([]);
        setError("Failed to load settlements. Please try again.");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (activeTab !== "statements" || user?.user_type !== "corporate_customer")
      return;

    fetchSettlements();
  }, [activeTab, user?.id, user?.user_type]);

  useEffect(() => {
    if (paymentStatus === "success") {
      setTimeout(() => {
        fetchSettlements();
      }, 2000);
    }
  }, [paymentStatus]);

  const handleViewStatement = (statement) => {
    setSelectedStatement(statement);
    setShowStatementModal(true);
  };

  const closeStatementModal = () => {
    setShowStatementModal(false);
    setSelectedStatement(null);
  };

  useEffect(() => {
    if (activeTab !== "promotions" || user?.user_type !== "corporate_customer")
      return;

    let isMounted = true;
    const fetchPromotions = async () => {
      try {
        setPromoLoading(true);
        setPromoError("");

        const response = await axios.post(
          `${api_url}${corporate_customer_promo_codes}`,
          {
            corporate_customer_id: user?.corporate_customer_id || user?.id,
            lang: language || "en",
          },
          {
            timeout: 30000,
          },
        );

        if (isMounted) {
          if (
            response.data?.status === 1 &&
            Array.isArray(response.data?.result)
          ) {
            const promotions = response.data.result;
            const updatedPromotions = promotions.map((promo) => ({
              ...promo,
              isApplied: appliedPromoIds.includes(promo.id),
            }));
            setPromotionsData(updatedPromotions);
          } else {
            setPromotionsData([]);
            setPromoError("No promotions available");
          }
        }
      } catch (err) {
        if (isMounted) {
          setPromotionsData([]);
          setPromoError("Failed to load promotions");
        }
      } finally {
        if (isMounted) {
          setPromoLoading(false);
        }
      }
    };

    fetchPromotions();
    return () => {
      isMounted = false;
    };
  }, [
    activeTab,
    user?.corporate_customer_id,
    user?.id,
    language,
    user?.user_type,
    appliedPromoIds,
  ]);

  const handlePromoAction = async (promo) => {
    try {
      setApplyingPromo(promo.id);

      const isAlreadyApplied = appliedPromoIds.includes(promo.id);

      if (isAlreadyApplied) {
        const removed = removeAppliedPromoId(promo.id);
        if (removed) {
          toast.success(`${t("promo_removed")}: ${promo.promo_code}`);
          setPromotionsData((prev) =>
            prev.map((p) =>
              p.id === promo.id ? { ...p, isApplied: false } : p,
            ),
          );
        }
      } else {
        const saved = saveAppliedPromoId(promo.id);
        if (saved) {
          toast.success(
            `${t("promo_applied_successfully")}: ${promo.promo_code}`,
          );
          setPromotionsData((prev) =>
            prev.map((p) =>
              p.id === promo.id ? { ...p, isApplied: true } : p,
            ),
          );
        } else {
          toast.error(t("failed_to_apply_promo"));
        }
      }
    } catch (error) {
      toast.error(t("failed_to_process_promo"));
    } finally {
      setApplyingPromo(null);
    }
  };

  const handleDownloadPDF = async () => {
    if (!user?.id) {
      toast.error(t("user_not_found"));
      return;
    }

    if (!fromDate || !toDate) {
      toast.error(t("please_select_both_dates"));
      return;
    }

    try {
      setIsGeneratingPDF(true);

      const apiUrl = `${api_url}${trip_invoice_download}/${user.id}/${fromDate}/${toDate}`;

      const response = await axios.get(apiUrl, {
        responseType: "blob",
        timeout: 60000,
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const filename = `trip_invoice_${fromDate}_to_${toDate}.pdf`;

      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`${t("pdf_download_started")}: ${filename}`);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(t("no_invoices_found_for_selected_period"));
      } else if (error.response?.status === 400) {
        toast.error(t("invalid_date_range_selected"));
      } else {
        toast.error(t("failed_to_download_pdf"));
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadExcel = async () => {
    if (!user?.id) {
      toast.error(t("user_not_found"));
      return;
    }

    if (!fromDate || !toDate) {
      toast.error(t("please_select_both_dates"));
      return;
    }

    try {
      setIsGeneratingExcel(true);

      const apiUrl = `${api_url}${trip_invoice_download}/${user.id}/${fromDate}/${toDate}`;

      const response = await axios.get(apiUrl, {
        responseType: "blob",
        timeout: 60000,
      });

      const blob = new Blob([response.data], {
        type:
          response.headers["content-type"] ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const filename = `trip_invoice_${fromDate}_to_${toDate}.xlsx`;

      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`${t("excel_download_started")}: ${filename}`);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(t("no_invoices_found_for_selected_period"));
      } else if (error.response?.status === 400) {
        toast.error(t("invalid_date_range_selected"));
      } else {
        toast.error(t("failed_to_download_excel"));
      }
    } finally {
      setIsGeneratingExcel(false);
    }
  };

  const handleDownloadInvoice = async (statement) => {
    try {
      setDownloadingInvoice(true);

      const apiUrl = `${api_url}${payment_statement_download}${statement.payment_statement_id}`;

      const response = await axios.get(apiUrl, {
        responseType: "blob",
        timeout: 30000,
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const period = statement.payment_period || "statement";
      const safePeriod = period.replace(/[^a-zA-Z0-9]/g, "_");
      const filename = `Invoice_${safePeriod}.pdf`;

      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`${t("invoice_downloaded")}: ${filename}`);
    } catch (error) {
      toast.error(t("failed_to_download_invoice"));
    } finally {
      setDownloadingInvoice(false);
    }
  };

  const handleDownloadTripsSummary = async (statement) => {
    try {
      setDownloadingTripPdf(true);

      const apiUrl = `${base_url}corporate/statement/${statement.payment_statement_id}`;

      const response = await axios.get(apiUrl, {
        responseType: "blob",
        timeout: 60000,
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const period = statement.payment_period || "trips_summary";
      const safePeriod = period.replace(/[^a-zA-Z0-9]/g, "_");
      const filename = `Monthly_Trips_Summary_${safePeriod}.pdf`;

      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`${t("trips_summary_downloaded")}: ${filename}`);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(t("no_trips_data_found_for_this_period"));
      } else if (error.response?.status === 400) {
        toast.error(t("invalid_statement_id"));
      } else {
        toast.error(t("failed_to_download_trips_summary"));
      }
    } finally {
      setDownloadingTripPdf(false);
    }
  };

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const today = getCurrentDate();
    const firstDay = new Date();
    firstDay.setDate(1);
    const year = firstDay.getFullYear();
    const month = String(firstDay.getMonth() + 1).padStart(2, "0");
    const day = String(firstDay.getDate()).padStart(2, "0");
    const firstDayStr = `${year}-${month}-${day}`;

    setFromDate(firstDayStr);
    setToDate(today);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    return `${
      appSettings?.default_currency_symbol || "Ksh"
    }${parseFloat(amount || 0).toFixed(2)}`;
  };

  const getStatusInfo = (status) => {
    const statusLower = status?.toLowerCase();

    if (statusLower === "approved") {
      return {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: "fa-check-circle",
        text: status,
      };
    } else if (statusLower === "initiated") {
      return {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: "fa-clock",
        text: status,
      };
    } else {
      return {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: "fa-question-circle",
        text: status || "Pending",
      };
    }
  };

  const MpesaPaymentModal = () => {
    const [phoneNumber, setPhoneNumber] = useState(mpesaPhone);
    const [amount, setAmount] = useState(mpesaAmount);

    const handleAmountChange = (e) => {
      const value = e.target.value;
      setAmount(value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      await handleMpesaPayment();
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-black/50 transition-opacity"></div>

          <div className="relative inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {t("pay_bill_with_mpesa")}
                </h2>
                {paymentForBill && (
                  <p className="text-sm text-gray-500 mt-1">
                    {paymentForBill.payment_period} •{" "}
                    {appSettings.default_currency_symbol}
                    {paymentForBill.total}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Status Indicators */}
            {paymentStatus === "initiating" && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <i className="fas fa-spinner fa-spin text-blue-500"></i>
                  <p className="text-blue-700 font-medium">
                    {t("initiating_payment")}...
                  </p>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  <i className="fas fa-info-circle mr-1"></i>
                  {t("sending_payment_request_to_mpesa")}
                </p>
              </div>
            )}

            {paymentStatus === "processing" && (
              <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-3">
                  <i className="fas fa-spinner fa-spin text-yellow-500"></i>
                  <p className="text-yellow-700 font-medium">
                    {t("processing_payment")}...
                  </p>
                </div>
                <p className="text-sm text-yellow-600 mt-2">
                  {t("please_complete_payment_on_your_phone")}
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  <i className="fas fa-sync-alt mr-1"></i>
                  {t("checking_payment_status_every_10_seconds")}
                </p>
                {checkoutRequestID && (
                  <p className="text-xs text-yellow-600 mt-1">
                    <i className="fas fa-id-card mr-1"></i>
                    {t("transaction_id")}: {checkoutRequestID.substring(0, 20)}
                    ...
                  </p>
                )}
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <p className="text-green-700 font-medium">
                    {t("payment_successful")}!
                  </p>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  {t("bill_payment_completed_successfully")}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  <i className="fas fa-info-circle mr-1"></i>
                  {t("modal_will_close_automatically")}
                </p>
              </div>
            )}

            {paymentStatus === "failed" && (
              <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-3">
                  <i className="fas fa-exclamation-circle text-red-500"></i>
                  <p className="text-red-700 font-medium">
                    {t("payment_failed")}
                  </p>
                </div>
                <p className="text-sm text-red-600 mt-2">
                  {t("please_try_again_or_contact_support")}
                </p>
                {error.response?.data?.ResponseDescription && (
                  <p className="text-xs text-red-600 mt-1">
                    <i className="fas fa-info-circle mr-1"></i>
                    {error.response.data.ResponseDescription}
                  </p>
                )}
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setPaymentStatus("");
                      setIsProcessingMpesa(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    {t("try_again")}
                  </button>
                </div>
              </div>
            )}

            {paymentStatus === "expired" && (
              <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-3">
                  <i className="fas fa-clock text-red-500"></i>
                  <p className="text-red-700 font-medium">
                    {t("payment_expired")}
                  </p>
                </div>
                <p className="text-sm text-red-600 mt-2">
                  {t("payment_took_too_long_to_complete_please_try_again")}
                </p>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setPaymentStatus("");
                      setIsProcessingMpesa(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    {t("try_again")}
                  </button>
                </div>
              </div>
            )}

            {/* Show form only when not processing */}
            {!paymentStatus && (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Payment Info */}
                  {paymentForBill && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-700">
                            {t("bill_details")}
                          </p>
                          <p className="text-lg font-semibold text-blue-900">
                            {paymentForBill.payment_period}
                          </p>
                          <p className="text-xs text-blue-600">
                            ID: {paymentForBill.payment_statement_id}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-blue-700">
                            {t("total_amount")}
                          </p>
                          <p className="text-xl font-bold text-blue-900">
                            {appSettings.default_currency_symbol}
                            {paymentForBill.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("phone_number")} *
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(e.target.value.replace("+", ""))
                      }
                      placeholder="254712345678"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      disabled={isProcessingMpesa}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t("enter_mobile_money_registered_phone_number")}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("amount")} (
                      {appSettings?.default_currency_symbol || "Ksh"}) *
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      disabled={isProcessingMpesa || paymentForBill}
                      required
                    />
                    {paymentForBill && (
                      <p className="text-xs text-gray-500 mt-1">
                        {t("paying_full_bill_amount")} (
                        {appSettings.default_currency_symbol}
                        {paymentForBill.total})
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {t("amount_will_be_rounded_to_nearest_whole_number")} (
                      {t("mpesa_accepts_whole_shillings_only")})
                    </p>
                    {paymentForBill && (
                      <p className="text-xs text-yellow-600 mt-1">
                        <i className="fas fa-exclamation-triangle mr-1"></i>
                        {t("actual_payment")}:{" "}
                        {appSettings?.default_currency_symbol || "Ksh"}
                        {Math.round(parseFloat(paymentForBill.total))}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessingMpesa}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-lg transition-colors ${
                      isProcessingMpesa
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    }`}
                  >
                    {isProcessingMpesa ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>{t("processing")}...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-file-invoice-dollar"></i>
                        <span>{t("pay_bill_with_mpesa")}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Status Check Info */}
            {paymentStatus === "processing" && (
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  <i className="fas fa-sync-alt mr-1"></i>
                  {t("checking_payment_status_every_10_seconds")}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <i className="fas fa-clock mr-1"></i>
                  {t("payment_will_expire_in_2_minutes_if_not_completed")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Memoized tab content rendering
  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "statements":
        return (
          <div className="space-y-4">
            {/* Header */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {t("monthly_settlement_bills")}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    {t("view_and_pay_your_monthly_bills_directly_with_mpesa")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-3 sm:p-4 border-b border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {t("payment_statements")}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  {t("view_your_monthly_payment_statements")}
                </p>
              </div>

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="text-center text-gray-500 py-12 text-sm">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    {t("loading_statements")}...
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500 py-12 text-sm">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    {error}
                  </div>
                ) : paymentsData.length === 0 ? (
                  <div className="text-center text-gray-500 py-12 text-sm">
                    <i className="fas fa-file-invoice text-gray-300 text-3xl mb-3"></i>
                    <p className="text-gray-500">{t("no_statements_found")}</p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                    {/* Table Header */}
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
                        >
                          {t("period")}
                        </th>
                        <th
                          scope="col"
                          className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
                        >
                          {t("service_fee")}
                        </th>
                        <th
                          scope="col"
                          className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
                        >
                          {t("subtotal")}
                        </th>
                        <th
                          scope="col"
                          className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
                        >
                          {t("tax")}
                        </th>
                        <th
                          scope="col"
                          className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
                        >
                          {t("total")}
                        </th>
                        <th
                          scope="col"
                          className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
                        >
                          {t("status")}
                        </th>
                        <th
                          scope="col"
                          className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {t("actions")}
                        </th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paymentsData.map((payment, idx) => {
                        const statusInfo = getStatusInfo(payment.status);
                        const statusLower = payment.status?.toLowerCase();
                        const isApproved = statusLower === "approved";
                        const isInitiated = statusLower === "initiated";

                        return (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            {/* Period */}
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap border-r border-gray-200">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
                                  <i className="fas fa-calendar-alt text-blue-600"></i>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {payment.payment_period}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    ID: {payment.payment_statement_id}
                                  </div>
                                  {payment.created_at && (
                                    <div className="text-xs text-gray-500">
                                      Created: {formatDate(payment.created_at)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Service Fee */}
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap border-r border-gray-200">
                              <div className="text-center">
                                <div className="text-lg font-semibold text-gray-900">
                                  {appSettings.default_currency_symbol}
                                  {payment.service_fee || "N/A"}
                                </div>
                              </div>
                            </td>

                            {/* Subtotal */}
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap border-r border-gray-200">
                              <div className="text-sm font-semibold text-gray-900">
                                {appSettings.default_currency_symbol}
                                {payment.sub_total}
                              </div>
                              {payment.service_fee && (
                                <div className="text-xs text-gray-500">
                                  {t("service_fee")}:{" "}
                                  {appSettings.default_currency_symbol}
                                  {payment.service_fee}
                                </div>
                              )}
                            </td>

                            {/* Tax */}
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap border-r border-gray-200">
                              <div className="text-sm font-semibold text-gray-900">
                                {appSettings.default_currency_symbol}
                                {payment.tax}
                              </div>
                            </td>

                            {/* Total */}
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap border-r border-gray-200">
                              <div className="text-lg font-bold text-gray-900">
                                {appSettings.default_currency_symbol}
                                {payment.total}
                              </div>
                            </td>

                            {/* Status */}
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap border-r border-gray-200">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}
                              >
                                <i
                                  className={`fas ${statusInfo.icon} mr-2`}
                                ></i>
                                {statusInfo.text}
                              </span>
                              {isApproved && payment.updated_at && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {t("paid_on")}:{" "}
                                  {formatDate(payment.updated_at)}
                                </div>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                {/* View Details Button */}
                                <button
                                  onClick={() => handleViewStatement(payment)}
                                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded border border-blue-200 transition-colors cursor-pointer"
                                  title={t("view_details")}
                                >
                                  <i className="fas fa-eye text-xs"></i>
                                  <span className="text-xs">{t("view")}</span>
                                </button>

                                {/* Show Pay Bill button for Initiated status */}
                                {isInitiated && (
                                  <button
                                    onClick={() => handlePayNow(payment)}
                                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded border border-blue-700 transition-colors cursor-pointer"
                                    title={t("pay_with_mpesa")}
                                  >
                                    <i className="fas fa-file-invoice-dollar text-xs"></i>
                                    <span className="text-xs">
                                      {t("pay_now")}
                                    </span>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        );

      case "promotions":
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-3 sm:p-4 border-b border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {t("promotions")}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  {t("available_promo_codes_and_discounts")}
                </p>
              </div>
              <div className="p-3 sm:p-4">
                {promoLoading ? (
                  <div className="text-center text-gray-500 py-6 text-sm">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    {t("loading_promotions")}...
                  </div>
                ) : promoError ? (
                  <div className="text-center text-red-500 py-6 text-sm">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    {promoError}
                  </div>
                ) : promotionsData.length === 0 ? (
                  <div className="text-center text-gray-500 py-6 text-sm">
                    <i className="fas fa-tag text-gray-300 text-2xl mb-2"></i>
                    <p className="text-gray-500">
                      {t("no_promotions_available")}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {promotionsData.map((promo) => (
                      <div
                        key={promo.id}
                        className={`bg-gradient-to-r rounded-xl p-4 border ${
                          promo.isApplied
                            ? "from-green-50 to-white border-green-300"
                            : "from-blue-50 to-white border-blue-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <i
                            className={`fas ${
                              promo.isApplied
                                ? "fa-check-circle text-green-500"
                                : "fa-tag text-blue-500"
                            } text-sm`}
                          ></i>
                          <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                            {promo.promo_name}
                            {promo.isApplied && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded border border-green-200">
                                {t("applied")}
                              </span>
                            )}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded border border-blue-200">
                            <i className="fas fa-ticket-alt mr-1"></i>
                            {promo.promo_code}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded border border-green-200">
                            <i className="fas fa-money-bill-wave mr-1"></i>
                            {appSettings?.default_currency_symbol || "Ksh"}
                            {promo.discount} {t("off")}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3">
                          {promo.description}
                        </p>
                        <button
                          onClick={() => handlePromoAction(promo)}
                          disabled={applyingPromo === promo.id}
                          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                            promo.isApplied
                              ? "bg-red-100 text-red-700 hover:bg-red-200 border-red-300"
                              : "bg-[#1EC51D] text-white hover:bg-[#17a517] border-[#17a517]"
                          } ${
                            applyingPromo === promo.id
                              ? "opacity-70 cursor-wait"
                              : "cursor-pointer"
                          }`}
                        >
                          {applyingPromo === promo.id ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i>
                              {t("processing")}...
                            </>
                          ) : promo.isApplied ? (
                            <>
                              <i className="fas fa-times"></i>
                              {t("remove_promo")}
                            </>
                          ) : (
                            <>
                              <i className="fas fa-check-circle"></i>
                              {t("apply_promo")}
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "reconciliations":
        return (
          <div className="space-y-6">
            {/* Simple PDF Download Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("create_reconciliation_of_account")}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {t(
                    "generate_pdf_report_of_all_trip_invoices_for_selected_period",
                  )}
                </p>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("start_date")}
                    </label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("end_date")}
                    </label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      min={fromDate}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                    />
                  </div>
                </div>

                {/* Selected Date Range */}
                {fromDate && toDate && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm font-medium text-blue-700">
                      {t("selected_period")}:
                    </p>
                    <p className="text-lg font-semibold text-blue-900 mt-1">
                      {new Date(fromDate).toLocaleDateString()} -{" "}
                      {new Date(toDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* Download Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF || !fromDate || !toDate}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-lg border ${
                      isGeneratingPDF || !fromDate || !toDate
                        ? "bg-gray-400 border-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 border-blue-700 cursor-pointer"
                    }`}
                  >
                    {isGeneratingPDF ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>{t("generating_pdf")}...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-file-pdf"></i>
                        <span>{t("download_pdf")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [
    activeTab,
    t,
    appSettings,
    loading,
    error,
    paymentsData,
    promoLoading,
    promoError,
    promotionsData,
    applyingPromo,
    handlePromoAction,
    fromDate,
    toDate,
    isGeneratingPDF,
    isGeneratingExcel,
    handleDownloadPDF,
    handleDownloadExcel,
    downloadingInvoice,
    user?.phone_with_code,
    handlePayNow,
    pendingBills,
    totalPendingAmount,
    formatCurrency,
    formatDate,
    handleDownloadInvoice,
    handleViewStatement,
  ]);

  // Render Statement Details Modal
  const renderStatementModal = () => {
    if (!showStatementModal || !selectedStatement) return null;

    const currentStatement =
      paymentsData.find(
        (payment) =>
          payment.payment_statement_id ===
          selectedStatement.payment_statement_id,
      ) || selectedStatement;

    const statusInfo = getStatusInfo(currentStatement.status);
    const statusLower = currentStatement.status?.toLowerCase();
    const isApproved = statusLower === "approved";
    const isInitiated = statusLower === "initiated";

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={closeStatementModal}
          ></div>

          <div className="relative inline-block w-full max-w-6xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {t("statement_details")}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {currentStatement.payment_period} • ID:{" "}
                  {currentStatement.payment_statement_id}
                </p>
                {currentStatement.status !== selectedStatement.status && (
                  <p className="text-xs text-green-600 mt-1">
                    <i className="fas fa-sync-alt mr-1"></i>
                    Status updated: {selectedStatement.status} →{" "}
                    {currentStatement.status}
                  </p>
                )}
              </div>
              <button
                onClick={closeStatementModal}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* Status Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusInfo.color}`}
                  >
                    <i className={`fas ${statusInfo.icon} mr-2`}></i>
                    {statusInfo.text}
                  </span>

                  {/* Refresh button */}
                  <button
                    onClick={() => {
                      const updatedStatement = paymentsData.find(
                        (p) =>
                          p.payment_statement_id ===
                          selectedStatement.payment_statement_id,
                      );
                      if (updatedStatement) {
                        setSelectedStatement(updatedStatement);
                        toast.info(t("status_refreshed"));
                      }
                    }}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 cursor-pointer"
                    title={t("refresh_status")}
                  >
                    <i className="fas fa-sync-alt"></i>
                    {t("refresh")}
                  </button>

                  {isApproved && currentStatement.updated_at && (
                    <span className="text-sm text-gray-600">
                      {t("paid_on")}: {formatDate(currentStatement.updated_at)}
                    </span>
                  )}
                  {currentStatement.created_at && (
                    <span className="text-sm text-gray-600">
                      {t("created_on")}:{" "}
                      {formatDate(currentStatement.created_at)}
                    </span>
                  )}
                </div>

                {/* Show download buttons ONLY for "approved" status */}
                {isApproved && (
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleDownloadInvoice(currentStatement)}
                      disabled={downloadingInvoice}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 border border-green-700 cursor-pointer"
                    >
                      {downloadingInvoice ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fas fa-file-invoice"></i>
                      )}
                      {t("download_invoice")}
                    </button>

                    <button
                      onClick={() =>
                        handleDownloadTripsSummary(currentStatement)
                      }
                      disabled={downloadingTripPdf}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 border border-blue-700 cursor-pointer"
                      title={t("download_monthly_trips_summary")}
                    >
                      {downloadingTripPdf ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fas fa-file-pdf"></i>
                      )}
                      {t("monthly_trips_summary")}
                    </button>
                  </div>
                )}
              </div>

              {/* Download Documents Section - Only for approved status */}
              {isApproved && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t("download_documents")}
                    </h3>

                    {/* Document 1: Services Invoice */}
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">
                            {t("services_invoice")}{" "}
                            {currentStatement.payment_period}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {t(
                              "invoice_includes_transportation_services_service_fee_delivery_fee",
                            )}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() =>
                              handleDownloadInvoice(currentStatement)
                            }
                            disabled={downloadingInvoice}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 border border-blue-700 cursor-pointer whitespace-nowrap"
                          >
                            {downloadingInvoice ? (
                              <>
                                <i className="fas fa-spinner fa-spin"></i>
                                <span>{t("downloading")}...</span>
                              </>
                            ) : (
                              <>
                                <i className="fas fa-file-pdf"></i>
                                <span>{t("download")}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Document 2: Monthly Trips Summary */}
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">
                            {t("monthly_trips_summary")}{" "}
                            {currentStatement.payment_period}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {t(
                              "report_contains_all_info_about_every_order_placed_with_bolt_app",
                            )}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() =>
                              handleDownloadTripsSummary(currentStatement)
                            }
                            disabled={downloadingTripPdf}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 border border-green-700 cursor-pointer whitespace-nowrap"
                          >
                            {downloadingTripPdf ? (
                              <>
                                <i className="fas fa-spinner fa-spin"></i>
                                <span>{t("downloading")}...</span>
                              </>
                            ) : (
                              <>
                                <i className="fas fa-file-pdf"></i>
                                <span>{t("download")}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Summary Table */}
                    <div className="mt-6 overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                              {t("date")}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                              {t("amount")}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t("amount_in_usd")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200">
                              <div className="text-sm font-medium text-gray-900">
                                {currentStatement.payment_period}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200">
                              <div className="text-sm font-medium text-gray-900">
                                {appSettings.default_currency_symbol}
                                {currentStatement.total}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                $0.00
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Initiated Status Info */}
              {isInitiated && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {t("payment_initiated")}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {t("complete_payment_to_download_documents")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{t("amount_due")}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {appSettings.default_currency_symbol}
                        {currentStatement.total}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Section */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("statement_summary")}
                </h3>

                {/* Summary Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          {t("description")}
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("amount")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Subtotal */}
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200">
                          <div className="text-sm font-medium text-gray-900">
                            {t("subtotal")}
                          </div>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-lg font-semibold text-gray-900">
                            {appSettings.default_currency_symbol}
                            {currentStatement.sub_total}
                          </div>
                        </td>
                      </tr>

                      {/* Service Fee */}
                      {currentStatement.service_fee && (
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200">
                            <div className="text-sm font-medium text-gray-900">
                              {t("service_fee")}
                            </div>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {appSettings.default_currency_symbol}
                              {currentStatement.service_fee}
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Tax */}
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200">
                          <div className="text-sm font-medium text-gray-900">
                            {t("tax")}
                          </div>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-lg font-semibold text-gray-900">
                            {appSettings.default_currency_symbol}
                            {currentStatement.tax}
                          </div>
                        </td>
                      </tr>

                      {/* Total Amount */}
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200">
                          <div className="text-sm font-bold text-gray-900">
                            {t("total_amount")}
                          </div>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-2xl font-bold text-gray-900 border-t-2 border-[#1EC51D] pt-2">
                            {appSettings.default_currency_symbol}
                            {currentStatement.total}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={closeStatementModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {t("close")}
                </button>

                {/* Show download button only for approved status */}
                {isApproved && (
                  <button
                    onClick={() => handleDownloadInvoice(currentStatement)}
                    disabled={downloadingInvoice}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors flex items-center gap-2 border border-green-700 cursor-pointer disabled:opacity-50"
                  >
                    {downloadingInvoice ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <i className="fas fa-file-invoice"></i>
                    )}
                    {t("download_monthly_invoice")}
                  </button>
                )}

                {/* Show pay now button only for initiated status */}
                {isInitiated && (
                  <button
                    onClick={() => {
                      closeStatementModal();
                      handlePayNow(currentStatement);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center gap-2 border border-blue-700 cursor-pointer"
                  >
                    <i className="fas fa-file-invoice-dollar"></i>
                    {t("pay_with_mpesa")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (user?.user_type !== "corporate_customer") {
    return (
      <div className="flex-1 space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
        <div className="text-center py-12">
          <i className="fas fa-lock text-gray-400 text-6xl mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("access_denied")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("this_page_is_only_accessible_to_corporate_customers")}
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#1EC51D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#17a517] transition-colors border border-[#17a517] cursor-pointer"
          >
            {t("go_to_dashboard")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            {t("billing")}
          </h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
            {t("manage_payments_and_view_statements")}
          </p>
        </div>
        <button
          onClick={openHelpModal}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] active:scale-95 text-xs sm:text-sm cursor-pointer"
        >
          <i className="fas fa-question-circle text-xs sm:text-sm"></i>
          <span className="text-xs sm:text-sm">{t("need_help")}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("statements")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "statements"
                ? "border-[#1EC51D] text-[#1EC51D]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("monthly_settlement")}
          </button>
          <button
            onClick={() => setActiveTab("reconciliations")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "reconciliations"
                ? "border-[#1EC51D] text-[#1EC51D]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("reconciliations")}
          </button>
          <button
            onClick={() => setActiveTab("promotions")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "promotions"
                ? "border-[#1EC51D] text-[#1EC51D]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("promotions")}
          </button>
        </div>

        {/* Tab Content */}
        {renderTabContent}
      </div>

      {/* Help Modal Component */}
      <HelpModal isOpen={showHelpModal} onClose={closeHelpModal} />

      {/*  M-PESA Payment Modal */}
      {showMpesaModal && <MpesaPaymentModal />}

      {/* Statement Details Modal */}
      {renderStatementModal()}
    </div>
  );
};

export default Billing;
