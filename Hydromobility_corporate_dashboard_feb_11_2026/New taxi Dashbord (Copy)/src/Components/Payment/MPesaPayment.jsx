import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { api_url } from "../../constants/constant";
import { useAuth } from "../../context/AuthContext";

const MpesaPayment = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("mpesa");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { user, appSettings } = useAuth();

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardName, setCardName] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const predefinedAmounts = [100, 500, 1000, 2000, 5000];

  const handleAmountSelect = (amt) => {
    setAmount(amt.toString());
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? "/" + v.slice(2, 4) : "");
    }
    return v;
  };

  const handleMpesaPayment = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast.error(t("please_enter_valid_amount"));
      return;
    }

    if (!phoneNumber || phoneNumber.length < 12) {
      toast.error(t("please_enter_valid_phone_number"));
      return;
    }

    setLoading(true);
    setPaymentStatus("processing");

    try {
      const response = await axios.post(`${api_url}payment/mpesa/stk-push`, {
        amount: parseFloat(amount),
        phone: user.phone_number,
        account_reference: `HYDRO${user?.id}`,
        transaction_desc: "Hydromobility EV Credits",
        customer_id: user?.id,
        customer_name: user?.name || user?.email,
      });

      if (response.data?.success) {
        const checkInterval = setInterval(async () => {
          try {
            const statusResponse = await axios.post(
              `${api_url}payment/mpesa/check-status`,
              {
                checkout_request_id: response.data.checkout_request_id,
              },
            );

            if (statusResponse.data?.success) {
              clearInterval(checkInterval);

              if (statusResponse.data.status === "Paid") {
                setPaymentStatus("success");
                setLoading(false);

                await updateBalance(parseFloat(amount));

                onSuccess({
                  amount: amount,
                  phoneNumber: phoneNumber,
                  timestamp: new Date().toISOString(),
                  transactionId: statusResponse.data.transaction_id,
                  method: "mpesa",
                });

                toast.success(t("payment_confirmed"));
                setTimeout(() => onClose(), 2000);
              }
            }
          } catch (error) {}
        }, 3000);

        setTimeout(() => {
          clearInterval(checkInterval);
          if (paymentStatus !== "success") {
            setPaymentStatus("timeout");
            toast.warning(t("payment_timeout"));
          }
        }, 120000);
      } else {
        throw new Error(response.data?.message || "Payment initiation failed");
      }
    } catch (error) {
      setPaymentStatus("failed");
      toast.error(error.response?.data?.message || t("payment_failed"));
      setLoading(false);
    }
  };

  const handleCardPayment = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast.error(t("please_enter_valid_amount"));
      return;
    }

    if (!validateCardDetails()) {
      return;
    }

    setLoading(true);
    setPaymentStatus("processing");

    try {
      const response = await axios.post(`${api_url}payment/card/process`, {
        amount: parseFloat(amount),
        card_number: cardNumber.replace(/\s/g, ""),
        card_expiry: cardExpiry,
        card_cvv: cardCVV,
        card_name: cardName,
        customer_id: user?.id,
        customer_email: user?.email,
        save_card: saveCard,
      });

      if (response.data?.success) {
        setPaymentStatus("success");

        await updateBalance(parseFloat(amount));

        if (saveCard && response.data.saved_card) {
          saveCardToProfile(response.data.saved_card);
        }

        onSuccess({
          amount: amount,
          method: "card",
          timestamp: new Date().toISOString(),
          transactionId: response.data.transaction_id,
          cardLast4: cardNumber.slice(-4),
        });

        toast.success(t("payment_successful"));
        setTimeout(() => onClose(), 2000);
      } else {
        throw new Error(response.data?.message || "Card payment failed");
      }
    } catch (error) {
      setPaymentStatus("failed");
      toast.error(error.response?.data?.message || t("card_payment_failed"));
    } finally {
      setLoading(false);
    }
  };

  const validateCardDetails = () => {
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error(t("invalid_card_number"));
      return false;
    }

    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      toast.error(t("invalid_expiry_date"));
      return false;
    }

    if (cardCVV.length !== 3) {
      toast.error(t("invalid_cvv"));
      return false;
    }

    if (!cardName.trim()) {
      toast.error(t("enter_cardholder_name"));
      return false;
    }

    return true;
  };

  const updateBalance = async (amount) => {
    try {
      await axios.post(`${api_url}corporate_customer/update_balance`, {
        corporate_customer_id: user?.id,
        amount: amount,
        transaction_type: "topup",
      });
    } catch (error) {}
  };

  const saveCardToProfile = (cardData) => {};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black/20 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {t("top_up_account")}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              disabled={loading}
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          {/* Payment Method Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("mpesa")}
              className={`flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === "mpesa"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              disabled={loading}
            >
              <i className="fas fa-mobile-alt mr-2"></i>
              M-PESA
            </button>
            <button
              onClick={() => setActiveTab("card")}
              className={`flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === "card"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              disabled={loading}
            >
              <i className="fas fa-credit-card mr-2"></i>
              Card
            </button>
          </div>

          {/* Amount Selection (Common for both) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t("select_amount")} {appSettings?.default_currency_symbol || "₹"}
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {predefinedAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountSelect(amt)}
                  className={`py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                    amount === amt.toString()
                      ? "bg-green-100 border-green-300 text-green-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  disabled={loading}
                >
                  {appSettings?.default_currency_symbol || "₹"}
                  {amt}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t("enter_custom_amount")}
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                disabled={loading}
              />
              <i className="fas fa-money-bill absolute left-3 top-2.5 text-gray-400 text-sm"></i>
            </div>
          </div>

          {/* Payment Forms */}
          {activeTab === "mpesa" ? (
            <form onSubmit={handleMpesaPayment}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("phone_number")}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="07XX XXX XXX"
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    disabled={loading}
                  />
                  <i className="fas fa-phone absolute left-3 top-2.5 text-gray-400 text-sm"></i>
                  <div className="absolute right-3 top-2.5 text-xs text-gray-500">
                    +254
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t("enter_mpesa_registered_number")}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !amount || !phoneNumber}
                className="w-full bg-green-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    {t("processing")}...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    {t("pay_with_mpesa")}{" "}
                    {appSettings?.default_currency_symbol || "₹"}
                    {amount || "0"}
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCardPayment}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("card_number")}
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("expiry_date")}
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) =>
                        setCardExpiry(formatExpiry(e.target.value))
                      }
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardCVV}
                      onChange={(e) =>
                        setCardCVV(e.target.value.replace(/\D/, ""))
                      }
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("cardholder_name")}
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder={t("enter_card_holder_name")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    disabled={loading}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="rounded border-gray-300 focus:ring-blue-500 text-blue-600"
                    disabled={loading}
                  />
                  <span className="text-sm text-gray-700">
                    {t("save_card_for_future_payments")}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !amount}
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    {t("processing")}...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i>
                    {t("pay_with_card")}{" "}
                    {appSettings?.default_currency_symbol || "₹"}
                    {amount || "0"}
                  </>
                )}
              </button>
            </form>
          )}

          {/* Payment Status */}
          {paymentStatus && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm ${
                paymentStatus === "success"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : paymentStatus === "processing"
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {paymentStatus === "success" && (
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  {t("payment_successful")}
                </div>
              )}
              {paymentStatus === "processing" && (
                <div className="flex items-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  {t("processing_payment")}...
                </div>
              )}
              {paymentStatus === "failed" && (
                <div className="flex items-center gap-2">
                  <i className="fas fa-exclamation-circle"></i>
                  {t("payment_failed_try_again")}
                </div>
              )}
            </div>
          )}

          {/* Security Note */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <i className="fas fa-lock mt-0.5"></i>
              <p>
                {t("all_payments_are_secured_with_ssl_encryption")}.
                {t("we_do_not_store_your_card_details")}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MpesaPayment;
