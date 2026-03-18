import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { api_url, get_faqs } from "../constants/constant";

const HelpModal = ({ isOpen, onClose }) => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [faqItems, setFaqItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { language, changeLanguage, toggleLanguage } = useLanguage();

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      if (!isOpen) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${api_url}${get_faqs}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lang: language,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 1 && data.result) {
          const transformedFAQs = data.result.map((faq, index) => ({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            status: faq.status,
          }));
          setFaqItems(transformedFAQs);
        } else {
          setError(data.message || "Failed to load FAQs");
        }
      } catch (err) {
        setError("Failed to load FAQs. Please try again later.");
        setFaqItems([
          {
            question: "What should I include in a policy?",
            answer:
              "Include clear objectives, scope, guidelines, responsibilities, and compliance requirements. Make sure it's easily understandable by all employees.",
          },
          {
            question: "Who can view these policies?",
            answer:
              "Currently, policies are visible to administrators and managers with access to this dashboard.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [isOpen, language]);

  useEffect(() => {
    if (isOpen) {
      fetchFAQs();
    }
  }, [language]);

  const fetchFAQs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${api_url}${get_faqs}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang: language || "en",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 1 && data.result) {
        const transformedFAQs = data.result.map((faq, index) => ({
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          status: faq.status,
        }));
        setFaqItems(transformedFAQs);
      } else {
        setError(data.message || "Failed to load FAQs");
      }
    } catch (err) {
      setError("Failed to load FAQs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="relative inline-block w-full max-w-4xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                <i className="fas fa-question-circle text-blue-600 text-lg"></i>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {t("need_help_with_policies")}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {t("find_answers_to_common_questions_below")}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          <div className="space-y-6">
            {/* FAQ Accordion Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <i className="fas fa-list-alt text-[#1EC51D]"></i>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("frequently_asked_questions")}
                </h3>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1EC51D]"></div>
                  <span className="ml-3 text-gray-600">
                    {t("loading_faqs")}...
                  </span>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
                    <span className="text-red-700">{error}</span>
                  </div>
                  <button
                    onClick={fetchFAQs}
                    className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    {t("retry")}
                  </button>
                </div>
              ) : faqItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-inbox text-3xl mb-3 opacity-50"></i>
                  <p>{t("no_faqs_available_at_the_moment")}.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {faqItems.map((faq, index) => (
                    <div
                      key={faq.id || index}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="flex items-center justify-between w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1EC51D]/10 flex-shrink-0">
                            <span className="text-xs font-semibold text-[#1EC51D]">
                              {index + 1}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                        </div>
                        <i
                          className={`fas fa-chevron-${
                            openFAQ === index ? "up" : "down"
                          } text-gray-400 text-sm transition-transform duration-200`}
                        ></i>
                      </button>

                      {openFAQ === index && (
                        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                          <div className="pl-9">
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
