import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  api_url,
  corporate_customer_delete_policy,
  corporate_customer_list_policy,
  corporate_customer_policy,
  corporate_customer_update_policy,
} from "../constants/constant";
import HelpModal from "./HelpModal";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const Policies = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showAddPolicyModal, setShowAddPolicyModal] = useState(false);
  const [showEditPolicyModal, setShowEditPolicyModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    title: "",
    description: "",
    detailedDescription: "",
  });
  const [editPolicy, setEditPolicy] = useState({
    id: "",
    title: "",
    description: "",
    detailedDescription: "",
  });
  const [policyToDelete, setPolicyToDelete] = useState(null);

  const [policiesData, setPoliciesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();
  const { language, changeLanguage, toggleLanguage } = useLanguage();

  const fetchPolicies = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${api_url}${corporate_customer_list_policy}`,
        { corporate_customer_id: user.id, lang: language },
      );
      if (response.data?.result) {
        setPoliciesData(response.data.result);
      } else {
        setPoliciesData([]);
      }
    } catch (err) {
      setPoliciesData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [user]);

  const filteredPolicies = policiesData.filter((policy) => {
    const title = policy.title?.toLowerCase() || "";
    const description = policy.short_description?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    return title.includes(term) || description.includes(term);
  });

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
  };

  const closeModal = () => setSelectedPolicy(null);

  const openAddPolicyModal = () => {
    setShowAddPolicyModal(true);
    setNewPolicy({
      title: "",
      description: "",
      detailedDescription: "",
    });
  };

  const closeAddPolicyModal = () => {
    setShowAddPolicyModal(false);
    setNewPolicy({
      title: "",
      description: "",
      detailedDescription: "",
    });
  };

  const openEditPolicyModal = (policy) => {
    setEditPolicy({
      id: policy.id,
      title: policy.title,
      description: policy.short_description || "",
      detailedDescription: policy.long_description || "",
    });
    setShowEditPolicyModal(true);
  };

  const closeEditPolicyModal = () => {
    setShowEditPolicyModal(false);
    setEditPolicy({
      id: "",
      title: "",
      description: "",
      detailedDescription: "",
    });
  };

  const openDeleteConfirmModal = (policy) => {
    setPolicyToDelete(policy);
    setShowDeleteConfirmModal(true);
  };

  const closeDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
    setPolicyToDelete(null);
  };

  const openHelpModal = () => {
    setShowHelpModal(true);
  };

  const closeHelpModal = () => {
    setShowHelpModal(false);
  };

  const handleNewPolicyChange = (field, value) => {
    setNewPolicy((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditPolicyChange = (field, value) => {
    setEditPolicy((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add policy
  const handleAddPolicy = async () => {
    if (!newPolicy.title.trim())
      return toast.error(t("please_enter_a_policy_title"));
    if (!newPolicy.description.trim())
      return toast.error(t("please_enter_a_policy_description"));
    if (!newPolicy.detailedDescription.trim())
      return toast.error(t("please_enter_a_detailed_description"));

    setActionLoading(true);
    try {
      const payload = {
        title: newPolicy.title,
        short_description: newPolicy.description,
        long_description: newPolicy.detailedDescription,
        corporate_customer_id: user.id,
      };

      const response = await axios.post(
        `${api_url}${corporate_customer_policy}`,
        payload,
      );

      if (response.data?.status === 1) {
        toast.success(t("policy_added_successfully"));
        closeAddPolicyModal();
        fetchPolicies();
      } else {
        toast.error(t("failed_to_add_policy"));
      }
    } catch (err) {
      toast.error(t("failed_to_add_policy"));
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditPolicy = async () => {
    if (!editPolicy.title.trim())
      return toast.error(t("please_enter_a_policy_title"));
    if (!editPolicy.description.trim())
      return toast.error(t("please_enter_a_policy_description"));
    if (!editPolicy.detailedDescription.trim())
      return toast.error(t("please_enter_a_detailed_description"));

    setActionLoading(true);
    try {
      const payload = {
        policy_id: editPolicy.id,
        title: editPolicy.title,
        short_description: editPolicy.description,
        long_description: editPolicy.detailedDescription,
      };

      const response = await axios.post(
        `${api_url}${corporate_customer_update_policy}`,
        payload,
      );

      if (response.data?.status === 1) {
        toast.success(t("policy_updated_successfully"));
        closeEditPolicyModal();
        fetchPolicies();
        if (selectedPolicy?.id === editPolicy.id) {
          setSelectedPolicy(response.data.result);
        }
      } else {
        toast.error(t("failed_to_update_policy"));
      }
    } catch (err) {
      toast.error("Failed to update policy.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete policy
  const handleDeletePolicy = async () => {
    if (!policyToDelete) return;

    setActionLoading(true);
    try {
      const payload = {
        policy_id: policyToDelete.id,
      };

      const response = await axios.post(
        `${api_url}${corporate_customer_delete_policy}`,
        payload,
      );

      if (response.data?.status === 1) {
        toast.success(t("policy_deleted_successfully"));
        closeDeleteConfirmModal();
        fetchPolicies();
        if (selectedPolicy?.id === policyToDelete.id) {
          closeModal();
        }
      } else {
        toast.error(t("failed_to_delete_policy"));
      }
    } catch (err) {
      toast.error(t("failed_to_delete_policy"));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            {t("policies")}
          </h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
            {t("manage_company_policies_and_guidelines")}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={openHelpModal}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors active:scale-95 w-full sm:w-auto text-xs sm:text-sm cursor-pointer"
          >
            <i className="fas fa-question-circle text-xs sm:text-sm"></i>
            {t("need_help")}
          </button>

          <button
            onClick={openAddPolicyModal}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#1EC51D] text-white rounded-md hover:bg-[#17a517] transition-colors active:scale-95 w-full sm:w-auto text-xs sm:text-sm cursor-pointer"
          >
            <i className="fas fa-plus text-xs sm:text-sm"></i>
            {t("add_policy")}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-full sm:max-w-md">
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm"></i>
        <input
          type="text"
          placeholder={t("search_policies")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
        />
      </div>

      {/* Policies Grid */}
      {loading ? (
        <div className="text-center py-6 text-gray-500">
          {t("loading_policies")}...
        </div>
      ) : filteredPolicies.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredPolicies.map((policy) => (
            <div
              key={policy.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#1EC51D]/30"
            >
              <div
                className="p-3 sm:p-4 cursor-pointer"
                onClick={() => handlePolicyClick(policy)}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-[#1EC51D]/10 flex-shrink-0">
                    <i className="fas fa-file-alt text-[#1EC51D] text-sm sm:text-lg"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {policy.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                      {policy.short_description || "No description available"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 px-3 sm:px-4 py-2 flex justify-end gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditPolicyModal(policy);
                  }}
                  className="flex items-center justify-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <i className="fas fa-edit text-xs"></i>
                  {t("edit")}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteConfirmModal(policy);
                  }}
                  className="flex items-center justify-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <i className="fas fa-trash-alt text-xs"></i>
                  {t("delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="text-center py-8 sm:py-12 md:py-16">
            <i className="fas fa-file-alt text-gray-300 text-4xl sm:text-5xl mb-3 sm:mb-4"></i>
            <p className="text-gray-500 text-sm sm:text-lg mb-2">
              {t("no_policies_found")}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 px-4">
              {t("try_adjusting_your_search_criteria_or_create_a_new_policy")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={openHelpModal}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors active:scale-95 text-xs sm:text-sm cursor-pointer"
              >
                <i className="fas fa-question-circle text-xs sm:text-sm"></i>
                {t("need_help")}
              </button>

              <button
                onClick={openAddPolicyModal}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#1EC51D] text-white rounded-md hover:bg-[#17a517] transition-colors active:scale-95 text-xs sm:text-sm cursor-pointer"
              >
                <i className="fas fa-plus text-xs sm:text-sm"></i>
                {t("create_first_policy")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal Component */}
      <HelpModal isOpen={showHelpModal} onClose={closeHelpModal} />

      {/* Add Policy Modal */}
      {showAddPolicyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeAddPolicyModal}
            ></div>
            <div className="relative inline-block w-full max-w-2xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {t("add_new_policy")}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {t("create_a_new_policy_for_your_organization")}
                  </p>
                </div>
                <button
                  onClick={closeAddPolicyModal}
                  className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                  disabled={actionLoading}
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("policy_title")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newPolicy.title}
                    onChange={(e) =>
                      handleNewPolicyChange("title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                    placeholder={t("enter_policy_title")}
                    disabled={actionLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("short_description")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newPolicy.description}
                    onChange={(e) =>
                      handleNewPolicyChange("description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                    placeholder={t("enter_a_brief_description")}
                    rows="3"
                    disabled={actionLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("detailed_description")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newPolicy.detailedDescription}
                    onChange={(e) =>
                      handleNewPolicyChange(
                        "detailedDescription",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                    placeholder={t("enter_detailed_policy_content")}
                    rows="6"
                    disabled={actionLoading}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeAddPolicyModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={actionLoading}
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleAddPolicy}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1EC51D] rounded-md hover:bg-[#17a517] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      {t("adding")}...
                    </>
                  ) : (
                    t("add_policy")
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Policy Modal */}
      {showEditPolicyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeEditPolicyModal}
            ></div>
            <div className="relative inline-block w-full max-w-2xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {t("edit_policy")}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {t("update_policy_details")}
                  </p>
                </div>
                <button
                  onClick={closeEditPolicyModal}
                  className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                  disabled={actionLoading}
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("policy_title")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editPolicy.title}
                    onChange={(e) =>
                      handleEditPolicyChange("title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                    placeholder={t("enter_policy_title")}
                    disabled={actionLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("short_description")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={editPolicy.description}
                    onChange={(e) =>
                      handleEditPolicyChange("description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                    placeholder={t("enter_a_brief_description")}
                    rows="3"
                    disabled={actionLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("detailed_description")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={editPolicy.detailedDescription}
                    onChange={(e) =>
                      handleEditPolicyChange(
                        "detailedDescription",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                    placeholder={t("enter_detailed_policy_content")}
                    rows="6"
                    disabled={actionLoading}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeEditPolicyModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={actionLoading}
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleEditPolicy}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1EC51D] rounded-md hover:bg-[#17a517] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      {t("updating")}...
                    </>
                  ) : (
                    t("update_policy")
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeDeleteConfirmModal}
            ></div>
            <div className="relative inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                  <i className="fas fa-exclamation-triangle text-red-600 text-lg"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("delete_policy")}
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  {t("are_you_sure_you_want_to_delete")} "
                  <span className="font-medium">{policyToDelete?.title}</span>"?{" "}
                  {t("this_action_cannot_be_undone")}.
                </p>

                <div className="flex justify-center gap-3 w-full">
                  <button
                    onClick={closeDeleteConfirmModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors w-24 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={actionLoading}
                  >
                    {t("cancel")}
                  </button>
                  <button
                    onClick={handleDeletePolicy}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors w-24 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        ...
                      </>
                    ) : (
                      t("delete")
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy Details Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeModal}
            ></div>
            <div className="relative inline-block w-full max-w-2xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1EC51D]/10">
                    <i className="fas fa-file-alt text-[#1EC51D] text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {selectedPolicy.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {t("policy_details")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditPolicyModal(selectedPolicy);
                      closeModal();
                    }}
                    className="flex items-center justify-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <i className="fas fa-edit text-sm"></i>
                    {t("edit")}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteConfirmModal(selectedPolicy);
                      closeModal();
                    }}
                    className="flex items-center justify-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <i className="fas fa-trash-alt text-sm"></i>
                    {t("delete")}
                  </button>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                  >
                    <i className="fas fa-times text-lg"></i>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Short Description */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {t("overview")}
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 text-sm">
                      {selectedPolicy.short_description ||
                        "No description available"}
                    </p>
                  </div>
                </div>

                {/* Long/Detailed Description */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {t("detailed_policy")}
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <p className="text-gray-600 text-sm whitespace-pre-line">
                      {selectedPolicy.long_description ||
                        "No detailed description available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1EC51D] rounded-md hover:bg-[#17a517] transition-colors"
                >
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Policies;
