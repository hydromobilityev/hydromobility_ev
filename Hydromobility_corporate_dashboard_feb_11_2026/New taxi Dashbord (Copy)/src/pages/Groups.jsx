import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_url,
  corporate_customer_admin_list,
  corporate_customer_delete_group,
  corporate_customer_get_group,
  corporate_customer_group_create,
  corporate_customer_group_update,
  corporate_customer_list_group,
  corporate_customer_list_policy,
} from "../constants/constant";
import HelpModal from "./HelpModal";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingGroup, setDeletingGroup] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [newGroup, setNewGroup] = useState({
    title: "",
    description: "",
    reviewer_id: "",
    policy_id: "",
    reviewer_name: "",
    policy_title: "",
  });
  const [availableMembers, setAvailableMembers] = useState([]);
  const [membersData, setMembersData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [loadingPolicies, setLoadingPolicies] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const membersPerPage = 8;

  const fetchAdmins = async () => {
    try {
      setLoadingAdmins(true);
      const response = await axios.post(
        `${api_url}${corporate_customer_admin_list}`,
        { parent_id: user.id },
      );

      if (response.data.status === 1) {
        const mappedAdmins = response.data.result.map((admin) => ({
          id: admin.id,
          name: `${admin.first_name} ${admin.last_name}`,
          phone: admin.phone_number,
          username: admin.username,
          status: admin.status === 1 ? "active" : "inactive",
        }));
        setAdmins(mappedAdmins);
      } else {
        setAdmins([]);
      }
    } catch (err) {
      toast.error(t("failed_to_fetch_admins"));
      setAdmins([]);
    } finally {
      setLoadingAdmins(false);
    }
  };

  // Fetch policies
  const fetchPolicies = async () => {
    if (!user?.id) return;
    setLoadingPolicies(true);
    try {
      const response = await axios.post(
        `${api_url}${corporate_customer_list_policy}`,
        { corporate_customer_id: user.id, lang: "en" },
      );
      if (response.data?.result) {
        const mappedPolicies = response.data.result.map((policy) => ({
          id: policy.id,
          title: policy.title,
          short_description: policy.short_description,
          status: policy.status,
        }));
        setPolicies(mappedPolicies);
      } else {
        setPolicies([]);
      }
    } catch (err) {
      toast.error(t("failed_to_fetch_policies"));
      setPolicies([]);
    } finally {
      setLoadingPolicies(false);
    }
  };

  // Fetch groups
  const getGroups = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${api_url}${corporate_customer_get_group}`,
        { corporate_customer_id: user.id, lang: "en" },
      );

      if (response.data.status === 1 && response.data.result) {
        const groupList = response.data.result.map((item) => ({
          id: item.id,
          title: item.group_name,
          description: item.group_description,
          reviewer_id: item.parent_id || "",
          reviewer_name: item.parent_name || "",
          policy_id: item.policy_id || "",
          policy_title: item.policy_name || "",
          corporate_customer_id: item.corporate_customer_id,
          members: 0,
          status: item.status,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));

        setGroups(groupList);

        groupList.forEach((group) => {
          fetchGroupMembersCount(group.id);
        });
      } else {
        setGroups([]);
      }
    } catch (error) {
      toast.error(t("failed_to_fetch_groups"));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGroupMembers = async (groupId) => {
    if (!user?.id) return;

    try {
      const response = await axios.post(
        `${api_url}${corporate_customer_list_group}`,
        {
          group_id: groupId,
          corporate_customer_id: user.id,
          lang: language,
        },
      );

      if (response.data.status === 1 && response.data.result) {
        const members = response.data.result.map((m) => ({
          id: m.id,
          name: `${m.first_name} ${m.last_name}`,
          email: m.email,
          phone: m.phone_number,
          role: "Member",
          status: "Active",
          joinDate: m.created_at
            ? m.created_at.split(" ")[0]
            : new Date().toISOString().split("T")[0],
        }));
        setMembersData((prev) => ({ ...prev, [groupId]: members }));

        setGroups((prev) =>
          prev.map((g) =>
            g.id === groupId ? { ...g, members: members.length } : g,
          ),
        );
      }
    } catch (error) {
      toast.error(t("failed_to_fetch_group_members"));
    }
  };

  const fetchGroupMembersCount = async (groupId) => {
    if (!user?.id) return;

    try {
      const response = await axios.post(
        `${api_url}${corporate_customer_list_group}`,
        {
          group_id: groupId,
          corporate_customer_id: user.id,
        },
      );

      if (response.data.status === 1 && response.data.result) {
        const count = response.data.result.length;
        setGroups((prev) =>
          prev.map((g) => (g.id === groupId ? { ...g, members: count } : g)),
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (user?.id) {
      getGroups();
      fetchAdmins();
      fetchPolicies();
    }
  }, [user]);

  const filteredGroups = groups.filter(
    (group) =>
      group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (group.reviewer_name &&
        group.reviewer_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (group.policy_title &&
        group.policy_title.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setMemberSearchTerm("");
    setCurrentPage(1);
    if (!membersData[group.id]) {
      fetchGroupMembers(group.id);
    }
  };

  const closeModal = () => {
    setSelectedGroup(null);
    setMemberSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const getStatusColor = (status) =>
    status === "Active" || status === 1
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200";

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Member":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const openAddGroupModal = () => {
    setShowAddGroupModal(true);
    setNewGroup({
      title: "",
      description: "",
      reviewer_id: "",
      policy_id: "",
      reviewer_name: "",
      policy_title: "",
    });
  };

  const openEditGroupModal = (group) => {
    setEditingGroup(group);

    const currentReviewer = admins.find(
      (a) => String(a.id) === String(group.reviewer_id),
    );
    const currentPolicy = policies.find(
      (p) => String(p.id) === String(group.policy_id),
    );

    setNewGroup({
      title: group.title,
      description: group.description,
      reviewer_id: group.reviewer_id || "",
      policy_id: group.policy_id || "",
      reviewer_name: currentReviewer?.name || group.reviewer_name || "",
      policy_title: currentPolicy?.title || group.policy_title || "",
    });
    setShowEditGroupModal(true);
  };

  const closeAddGroupModal = () => {
    setShowAddGroupModal(false);
    setNewGroup({
      title: "",
      description: "",
      reviewer_id: "",
      policy_id: "",
      reviewer_name: "",
      policy_title: "",
    });
  };

  const closeEditGroupModal = () => {
    setShowEditGroupModal(false);
    setEditingGroup(null);
    setNewGroup({
      title: "",
      description: "",
      reviewer_id: "",
      policy_id: "",
      reviewer_name: "",
      policy_title: "",
    });
  };

  const handleNewGroupChange = (field, value) => {
    setNewGroup((prev) => ({ ...prev, [field]: value }));

    if (field === "reviewer_id") {
      const selectedReviewer = admins.find(
        (a) => String(a.id) === String(value),
      );
      setNewGroup((prev) => ({
        ...prev,
        reviewer_name: selectedReviewer?.name || "",
      }));
    }

    if (field === "policy_id") {
      const selectedPolicy = policies.find(
        (p) => String(p.id) === String(value),
      );
      setNewGroup((prev) => ({
        ...prev,
        policy_title: selectedPolicy?.title || "",
      }));
    }
  };

  const openDeleteModal = (group) => {
    setDeletingGroup(group);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingGroup(null);
    setIsDeleting(false);
  };

  const openHelpModal = () => {
    setShowHelpModal(true);
  };

  const closeHelpModal = () => {
    setShowHelpModal(false);
  };

  const handleSubmit = async () => {
    if (!newGroup.title.trim()) {
      toast.error(t("please_enter_a_group_title"));
      return;
    }

    if (!user?.id) {
      toast.error(t("user_not_found"));
      return;
    }

    try {
      setIsLoading(true);

      if (showEditGroupModal && editingGroup) {
        await handleEditGroup();
      } else {
        await handleAddGroup();
      }
    } catch (error) {
      toast.error(t("failed_to_process_group"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGroup = async () => {
    try {
      const response = await axios.post(
        `${api_url}${corporate_customer_group_create}`,
        {
          group_name: newGroup.title,
          group_description: newGroup.description,
          parent_id: newGroup.reviewer_id || null,
          policy_id: newGroup.policy_id || null,
          corporate_customer_id: user.id,
        },
      );

      if (response.data.status === 1) {
        const reviewerName = newGroup.reviewer_id
          ? admins.find((a) => String(a.id) === String(newGroup.reviewer_id))
              ?.name || ""
          : "";
        const policyTitle = newGroup.policy_id
          ? policies.find((p) => String(p.id) === String(newGroup.policy_id))
              ?.title || ""
          : "";

        const newGroupData = {
          id: response.data.result?.id || Date.now(),
          title: newGroup.title,
          description: newGroup.description,
          reviewer_id: newGroup.reviewer_id,
          reviewer_name: reviewerName,
          policy_id: newGroup.policy_id,
          policy_title: policyTitle,
          corporate_customer_id: user.id,
          members: 0,
          status: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setGroups((prev) => [...prev, newGroupData]);
        closeAddGroupModal();
        toast.success(response.data.message || t("group_created_successfully"));

        getGroups();
      } else {
        toast.error(response.data.message || t("failed_to_create_group"));
      }
    } catch (error) {
      toast.error(t("failed_to_create_group"));
    }
  };

  const handleEditGroup = async () => {
    try {
      const payload = {
        group_id: editingGroup.id,
      };

      if (newGroup.title !== editingGroup.title) {
        payload.group_name = newGroup.title;
      }

      if (newGroup.description !== editingGroup.description) {
        payload.group_description = newGroup.description;
      }

      if (String(newGroup.reviewer_id) !== String(editingGroup.reviewer_id)) {
        payload.reviewer_id = newGroup.reviewer_id || null;
      }

      if (String(newGroup.policy_id) !== String(editingGroup.policy_id)) {
        payload.policy_id = newGroup.policy_id || null;
      }

      if (Object.keys(payload).length === 1) {
        toast.info(t("no_changes_detected"));
        return;
      }

      const response = await axios.post(
        `${api_url}${corporate_customer_group_update}`,
        payload,
      );

      if (response.data.status === 1) {
        const reviewerName = newGroup.reviewer_id
          ? admins.find((a) => String(a.id) === String(newGroup.reviewer_id))
              ?.name || newGroup.reviewer_name
          : "";
        const policyTitle = newGroup.policy_id
          ? policies.find((p) => String(p.id) === String(newGroup.policy_id))
              ?.title || newGroup.policy_title
          : "";

        const updatedGroupData = {
          ...editingGroup,
          title: newGroup.title,
          description: newGroup.description,
          reviewer_id: newGroup.reviewer_id,
          reviewer_name: reviewerName,
          policy_id: newGroup.policy_id,
          policy_title: policyTitle,
          updated_at: new Date().toISOString(),
        };

        setGroups((prev) =>
          prev.map((g) => (g.id === editingGroup.id ? updatedGroupData : g)),
        );

        closeEditGroupModal();
        toast.success(response.data.message || t("group_updated_successfully"));
      } else {
        toast.error(response.data.message || "Failed to update group");
      }
    } catch (error) {
      toast.error(t("failed_to_update_group"));
    }
  };

  const handleDeleteGroup = async () => {
    if (!deletingGroup) return;

    try {
      setIsDeleting(true);
      const response = await axios.post(
        `${api_url}${corporate_customer_delete_group}`,
        {
          group_id: deletingGroup.id,
        },
      );

      if (response.data.status === 1) {
        setGroups((prev) => prev.filter((g) => g.id !== deletingGroup.id));

        setMembersData((prev) => {
          const newData = { ...prev };
          delete newData[deletingGroup.id];
          return newData;
        });

        closeDeleteModal();
        toast.success(response.data.message || t("group_deleted_successfully"));

        if (selectedGroup && selectedGroup.id === deletingGroup.id) {
          closeModal();
        }
      } else {
        toast.error(response.data.message || t("failed_to_delete_group"));
        setIsDeleting(false);
      }
    } catch (error) {
      toast.error(t("failed_to_delete_group"));
      setIsDeleting(false);
    }
  };

  const filteredMembers = selectedGroup
    ? membersData[selectedGroup.id]?.filter(
        (member) =>
          member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
          (member.role &&
            member.role.toLowerCase().includes(memberSearchTerm.toLowerCase())),
      ) || []
    : [];

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember,
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const renderGroupModal = (isEdit = false) => {
    const modalTitle = isEdit
      ? t("edit_group_department")
      : t("create_new_group_department");
    const buttonText = isEdit ? t("update") : t("create_new_group_department");
    const onClose = isEdit ? closeEditGroupModal : closeAddGroupModal;

    const currentReviewerExists = admins.some(
      (a) => String(a.id) === String(newGroup.reviewer_id),
    );

    const currentPolicyExists = policies.some(
      (p) => String(p.id) === String(newGroup.policy_id),
    );

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-black/20 transition-opacity"
            onClick={onClose}
          ></div>
          <div className="relative inline-block w-full max-w-2xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {modalTitle}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("group_title")} *
                </label>
                <input
                  type="text"
                  value={newGroup.title}
                  onChange={(e) =>
                    handleNewGroupChange("title", e.target.value)
                  }
                  placeholder={t("enter_group_title")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("description")}
                </label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) =>
                    handleNewGroupChange("description", e.target.value)
                  }
                  placeholder={t("enter_group_description")}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm resize-none"
                />
              </div>

              {/* Reviewer Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("reviewer")}
                </label>
                <select
                  value={newGroup.reviewer_id}
                  onChange={(e) =>
                    handleNewGroupChange("reviewer_id", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                  disabled={loadingAdmins}
                >
                  <option value="">{t("select_reviewer")}</option>

                  {isEdit && newGroup.reviewer_id && !currentReviewerExists && (
                    <option value={newGroup.reviewer_id} selected>
                      {newGroup.reviewer_name} (Current)
                    </option>
                  )}

                  {admins.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
                {loadingAdmins && (
                  <p className="text-xs text-gray-500 mt-1">
                    {t("loading_reviewers")}...
                  </p>
                )}
                {isEdit && newGroup.reviewer_id && !currentReviewerExists && (
                  <p className="text-xs text-yellow-600 mt-1">
                    {t("current_reviewer_not_found_in_active_list")}
                  </p>
                )}
              </div>

              {/* Policy Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("policy")}
                </label>
                <select
                  value={newGroup.policy_id}
                  onChange={(e) =>
                    handleNewGroupChange("policy_id", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] text-sm"
                  disabled={loadingPolicies}
                >
                  <option value="">{t("select_policy")}</option>

                  {isEdit && newGroup.policy_id && !currentPolicyExists && (
                    <option value={newGroup.policy_id} selected>
                      {newGroup.policy_title} (Current)
                    </option>
                  )}

                  {policies.map((policy) => (
                    <option key={policy.id} value={policy.id}>
                      {policy.title}
                    </option>
                  ))}
                </select>
                {loadingPolicies && (
                  <p className="text-xs text-gray-500 mt-1">
                    {t("loading_policies")}...
                  </p>
                )}
                {isEdit && newGroup.policy_id && !currentPolicyExists && (
                  <p className="text-xs text-yellow-600 mt-1">
                    {t("current_reviewer_not_found_in_active_list")}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer"
              >
                {t("cancel")}
              </button>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 py-2 bg-[#1EC51D] text-white rounded-lg hover:bg-[#17a517] transition-colors text-sm font-medium disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>{isEdit ? t("updating") : t("creating")}...</span>
                  </>
                ) : (
                  buttonText
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDeleteModal = () => {
    if (!deletingGroup) return null;

    return (
      <div className="fixed inset-0 z-[60] overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-black/20 transition-opacity"
            onClick={closeDeleteModal}
          ></div>
          <div className="relative inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {t("delete_group")}
              </h2>
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-50"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Warning Icon and Message */}
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("are_you_sure")}?
              </h3>

              <p className="text-gray-600 mb-4">
                {t("you_are_about_to_delete_the_group")}
                {t("this_action_cannot_be_undone")}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer"
              >
                {t("cancel")}
              </button>

              <button
                onClick={handleDeleteGroup}
                disabled={isDeleting}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>{t("deleting")}...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-trash"></i>
                    {t("delete_group")}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            {t("groups_departments")}
          </h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
            {t("organize_users_into_groups")}
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
            onClick={openAddGroupModal}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#1EC51D] text-white rounded-md hover:bg-[#17a517] transition-colors active:scale-95 w-full sm:w-auto text-xs sm:text-sm cursor-pointer"
          >
            <i className="fas fa-plus text-xs sm:text-sm"></i>
            {t("add")} {t("groups_departments")}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-full sm:max-w-md">
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm"></i>
        <input
          type="text"
          placeholder={t("search_groups")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
        />
      </div>

      {/* Loading State */}
      {isLoading && groups.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1EC51D]"></div>
          <p className="mt-2 text-gray-600">{t("loading_groups")}...</p>
        </div>
      )}

      {/* Groups Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#1EC51D]/30"
            >
              <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                      {group.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                      {group.description}
                    </p>

                    {/* Reviewer and Policy Info */}
                    <div className="mt-2 space-y-1">
                      {group.reviewer_name && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <i className="fas fa-user-check text-xs text-blue-500"></i>
                          <span className="truncate">
                            {t("reviewer")}: {group.reviewer_name}
                          </span>
                        </div>
                      )}
                      {group.policy_title && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <i className="fas fa-file-contract text-xs text-green-500"></i>
                          <span className="truncate">
                            {t("policy")}: {group.policy_title}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const menu = document.getElementById(
                          `menu-${group.id}`,
                        );
                        if (menu) {
                          menu.classList.toggle("hidden");
                        }
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                    <div
                      id={`menu-${group.id}`}
                      className="hidden absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGroupClick(group);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <i className="fas fa-eye mr-2"></i> {t("view")}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditGroupModal(group);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <i className="fas fa-edit mr-2"></i> {t("edit")}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(group);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer"
                      >
                        <i className="fas fa-trash mr-2"></i> {t("delete")}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <i className="fas fa-users"></i>
                    <span>
                      {group.members} {t("members")}
                    </span>
                  </div>
                  <button
                    onClick={() => handleGroupClick(group)}
                    className="text-xs text-[#1EC51D] hover:text-[#17a517] font-medium cursor-pointer"
                  >
                    {t("view_details")} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredGroups.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <i className="fas fa-users text-gray-300 text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
          <p className="text-gray-500 text-sm sm:text-lg">
            {searchTerm
              ? t("no_groups_found_matching_search")
              : t("no_groups_found")}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            {searchTerm
              ? t("try_adjusting_your_search_criteria")
              : t("create_your_first_group_to_get_started")}
          </p>
          {!searchTerm && (
            <button
              onClick={openAddGroupModal}
              className="mt-4 px-4 py-2 bg-[#1EC51D] text-white rounded-md hover:bg-[#17a517] transition-colors text-sm cursor-pointer"
            >
              {t("create_your_first_group")}
            </button>
          )}
        </div>
      )}

      {/* Add Group Modal */}
      {showAddGroupModal && renderGroupModal(false)}

      {/* Edit Group Modal */}
      {showEditGroupModal && renderGroupModal(true)}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && renderDeleteModal()}

      {/* Help Modal Component */}
      <HelpModal isOpen={showHelpModal} onClose={closeHelpModal} />

      {/* Group Details Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeModal}
            ></div>

            {/* Modal panel */}
            <div className="relative inline-block w-full max-w-4xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {selectedGroup.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedGroup.description}
                  </p>

                  {/* Reviewer and Policy Info */}
                  <div className="mt-2 space-y-1">
                    {selectedGroup.reviewer_name && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="font-medium">{t("reviewer")}:</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {selectedGroup.reviewer_name}
                        </span>
                      </div>
                    )}
                    {selectedGroup.policy_title && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="font-medium">{t("policy")}:</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {selectedGroup.policy_title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              {/* Group Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg sm:text-xl font-bold text-purple-600">
                    {membersData[selectedGroup.id]?.length || 0}
                  </div>
                  <div className="text-xs text-gray-600">
                    {t("total_members")}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg sm:text-xl font-bold text-green-600">
                    {membersData[selectedGroup.id]?.filter(
                      (m) => m.status === "Active",
                    ).length || 0}
                  </div>
                  <div className="text-xs text-gray-600">{t("active")}</div>
                </div>
              </div>

              {/* Member Search */}
              <div className="relative mb-4">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  type="text"
                  placeholder={t("search_members_by_name_email_or_role")}
                  value={memberSearchTerm}
                  onChange={(e) => {
                    setMemberSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                />
              </div>

              {/* Members Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("member")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("email")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("phone")}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("status")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentMembers.map((member) => (
                        <tr
                          key={member.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {member.name}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {member.email}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {member.phone}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                                member.status,
                              )}`}
                            >
                              {member.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-2 p-2">
                  {currentMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {member.name}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {member.email}
                          </p>
                          <p className="text-xs text-gray-600">
                            {member.phone}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            member.status,
                          )}`}
                        >
                          {member.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {t("joined")}:{" "}
                        {new Date(member.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {currentMembers.length === 0 && (
                  <div className="text-center py-8">
                    <i className="fas fa-users text-gray-300 text-3xl mb-3"></i>
                    <p className="text-gray-500 text-sm">
                      {t("no_members_found")}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {memberSearchTerm
                        ? t("try_adjusting_your_search_criteria")
                        : t("no_members_in_this_group")}
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredMembers.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {t("showing")}{" "}
                    <span className="font-medium">
                      {indexOfFirstMember + 1}
                    </span>{" "}
                    {t("to")}{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastMember, filteredMembers.length)}
                    </span>{" "}
                    {t("of")}{" "}
                    <span className="font-medium">
                      {filteredMembers.length}
                    </span>{" "}
                    {t("results")}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs cursor-pointer"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 flex items-center justify-center border rounded-md text-xs font-medium cursor-pointer ${
                            currentPage === page
                              ? "bg-[#1EC51D] text-white border-[#1EC51D]"
                              : "border-gray-300 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs cursor-pointer"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
