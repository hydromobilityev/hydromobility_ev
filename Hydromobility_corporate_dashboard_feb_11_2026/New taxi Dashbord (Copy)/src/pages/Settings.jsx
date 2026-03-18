import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  api_url,
  corporate_customer_update_company,
  get_term_conditions,
} from "../constants/constant";

const Settings = () => {
  const { user, setUser } = useAuth();
  const { t } = useTranslation();
  const { language, changeLanguage, toggleLanguage } = useLanguage();

  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    registrationNumber: "",
    vatNumber: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(
    user?.show_invoice_details || false,
  );
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState([]);
  const [isLoadingTerms, setIsLoadingTerms] = useState(false);
  const [termsError, setTermsError] = useState(null);

  useEffect(() => {
    if (user) {
      const userData = {
        companyName: user.company_name || "",
        address: user.address || "",
        registrationNumber: user.registration_number || "",
        vatNumber: user.vat_number || "",
      };
      setFormData(userData);
      setOriginalData(userData);

      if (user.show_invoice_details !== undefined) {
        setShowInvoiceDetails(user.show_invoice_details);
      }
    }
  }, [user]);

  const fetchTermsAndConditions = async () => {
    setIsLoadingTerms(true);
    setTermsError(null);

    try {
      const response = await axios.post(
        `${api_url}${get_term_conditions}`,
        {
          lang: language,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.status === 1 && response.data.result) {
        setTermsAndConditions(response.data.result);
      } else {
        setTermsError(response.data.message || t("failed_to_load_terms"));
        toast.error(t("failed_to_load_terms"));
      }
    } catch (error) {
      setTermsError(t("network_error"));
      toast.error(t("network_error"));
    } finally {
      setIsLoadingTerms(false);
    }
  };

  const openTermsModal = async () => {
    setIsTermsModalOpen(true);

    if (termsAndConditions.length === 0 || termsError) {
      await fetchTermsAndConditions();
    }
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const handleLanguageChange = async (lang) => {
    changeLanguage(lang);

    if (isTermsModalOpen) {
      await fetchTermsAndConditions();
    }
  };

  const handleLanguageToggle = async () => {
    const newLang = language === "en" ? "sw" : "en";
    toggleLanguage();

    if (isTermsModalOpen) {
      await fetchTermsAndConditions();
    }
  };

  const handleInvoiceDetailsToggle = () => {
    const newState = !showInvoiceDetails;
    setShowInvoiceDetails(newState);

    if (setUser) {
      setUser((prev) => ({
        ...prev,
        show_invoice_details: newState,
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const payload = { id: user.id };
      if (formData.companyName !== originalData.companyName)
        payload.company_name = formData.companyName;
      if (formData.address !== originalData.address)
        payload.address = formData.address;
      if (formData.registrationNumber !== originalData.registrationNumber)
        payload.registration_number = formData.registrationNumber;
      if (formData.vatNumber !== originalData.vatNumber)
        payload.vat_number = formData.vatNumber;

      const response = await axios.post(
        `${api_url}${corporate_customer_update_company}`,
        payload,
      );

      if (response.data.status === 1) {
        toast.success(" " + response.data.message);
        const updatedData = response.data.data;

        const refreshedData = {
          companyName: updatedData.company_name || "",
          address: updatedData.address || "",
          registrationNumber: updatedData.registration_number || "",
          vatNumber: updatedData.vat_number || "",
        };

        setFormData(refreshedData);
        setOriginalData(refreshedData);

        if (setUser) {
          setUser((prev) => ({
            ...prev,
            company_name: updatedData.company_name,
            address: updatedData.address,
            registration_number: updatedData.registration_number,
            vat_number: updatedData.vat_number,
          }));
        }
      } else {
        toast.error("⚠️ " + (response.data.message || t("save_failed")));
      }
    } catch (error) {
      toast.error(t("save_failed"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
      {/* Header with Language Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            {t("settings_title")}
          </h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
            {t("settings_subtitle")}
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all cursor-pointer ${
                language === "en"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("english")}
            </button>
            <button
              onClick={() => handleLanguageChange("sw")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all cursor-pointer ${
                language === "sw"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("swahili")}
            </button>
          </div>

          {/* Language Toggle Icon */}
          <button
            onClick={handleLanguageToggle}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            title={t("toggle_language")}
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {/* Invoice Details View Toggle Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {t("invoice_details_view")}
            </h3>
          </div>

          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm sm:text-base font-medium text-gray-900">
                  {t("show_invoice_details")}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  {t("toggle_invoice_description")}
                </p>
              </div>

              <button
                type="button"
                onClick={handleInvoiceDetailsToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:ring-offset-2 ${
                  showInvoiceDetails ? "bg-[#1EC51D]" : "bg-gray-200"
                }`}
                aria-pressed={showInvoiceDetails}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showInvoiceDetails ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {t("legal_information")}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              {t("review_terms")}
            </p>
          </div>

          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm sm:text-base font-medium text-gray-900">
                  {t("terms_conditions")}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">
                  {t("review_service_terms")}
                </p>
              </div>

              <button
                onClick={openTermsModal}
                className="text-[#1EC51D] hover:text-[#17a517] text-xs sm:text-sm font-medium underline focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:ring-offset-2 rounded px-2 py-1 cursor-pointer"
                disabled={isLoadingTerms}
              >
                {isLoadingTerms ? t("loading") : t("view_terms_button")}
              </button>
            </div>
          </div>
        </div>

        {/* Company Details Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {t("company_details")}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              {t("manage_company_info")}
            </p>
          </div>

          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            {/* Company Name */}
            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="company-name"
                className="text-xs sm:text-sm font-medium text-gray-900"
              >
                {t("legal_company_name")}
              </label>
              <input
                id="company-name"
                type="text"
                placeholder={t("enter_company_name")}
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
              />
            </div>

            {/* Address */}
            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="address"
                className="text-xs sm:text-sm font-medium text-gray-900"
              >
                {t("legal_invoice_address")}
              </label>
              <textarea
                id="address"
                placeholder={t("enter_complete_address")}
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows="3"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] resize-none"
              />
            </div>

            {/* Registration & VAT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="registration"
                  className="text-xs sm:text-sm font-medium text-gray-900"
                >
                  {t("business_registration")}
                </label>
                <input
                  id="registration"
                  type="text"
                  placeholder={t("enter_registration_number")}
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    handleInputChange("registrationNumber", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="vat"
                  className="text-xs sm:text-sm font-medium text-gray-900"
                >
                  {t("vat_number")}
                </label>
                <input
                  id="vat"
                  type="text"
                  placeholder={t("enter_vat_number")}
                  value={formData.vatNumber}
                  onChange={(e) =>
                    handleInputChange("vatNumber", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save & Cancel Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
          <button
            disabled={isSaving}
            onClick={() => setFormData(originalData)}
            className="px-4 sm:px-6 py-2 border border-gray-300 rounded-md 
              hover:bg-gray-50 transition-colors focus:outline-none 
              focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] 
              active:scale-95 text-xs sm:text-sm cursor-pointer"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#1EC51D] hover:bg-[#17a517] text-white focus:ring-[#1EC51D]"
            }`}
          >
            {isSaving ? t("saving") : t("save")}
          </button>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={closeTermsModal}
          />

          <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {t("terms_title")}
                </h3>
                <button
                  onClick={closeTermsModal}
                  className="text-gray-400 hover:text-gray-500 text-xl focus:outline-none focus:ring-2 focus:ring-[#1EC51D] rounded-full p-1"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {isLoadingTerms ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1EC51D]"></div>
                </div>
              ) : termsError ? (
                <div className="text-center py-8">
                  <p className="text-red-600 mb-4">{termsError}</p>
                  <button
                    onClick={fetchTermsAndConditions}
                    className="px-4 py-2 bg-[#1EC51D] text-white rounded-md hover:bg-[#17a517]"
                  >
                    {t("retry")}
                  </button>
                </div>
              ) : termsAndConditions.length > 0 ? (
                <div className="space-y-6">
                  {termsAndConditions.map((term) => (
                    <div key={term.id} className="space-y-3">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                        {term.title}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {term.terms}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">{t("no_terms_available")}</p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 sm:px-6">
              <div className="flex justify-end items-center">
                <button
                  onClick={closeTermsModal}
                  className="px-4 py-2 bg-[#1EC51D] text-white text-xs sm:text-sm font-medium rounded-md hover:bg-[#17a517] focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:ring-offset-2"
                >
                  {t("i_understand")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
