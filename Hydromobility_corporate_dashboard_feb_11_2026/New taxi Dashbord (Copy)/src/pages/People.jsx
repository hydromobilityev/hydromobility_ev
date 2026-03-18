import { useState, useEffect } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  api_url,
  corporate_agent_list,
  corporate_agent_register,
  corporate_customer_admin_list,
  corporate_customer_get_group,
  corporate_customer_list,
  corporate_customer_register,
  customer_delete,
  customer_excel_import,
  customer_excel_upload,
  customer_profile_update,
  customer_register,
} from "../constants/constant";
import * as XLSX from "xlsx";
import HelpModal from "./HelpModal";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const People = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("users");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkManageModal, setShowBulkManageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // New states for modals
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showViewAdminModal, setShowViewAdminModal] = useState(false);
  const [showViewAgentModal, setShowViewAgentModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isConvertingToAdmin, setIsConvertingToAdmin] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isConvertingModalOpen, setIsConvertingModalOpen] = useState(false);
  const [userToConvert, setUserToConvert] = useState(null);

  // New state for delete functionality
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const itemsPerPage = 5;
  const { t } = useTranslation();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "254",
    password: "",
    username: "",
    userId: "",
    group: "",
    type: "user",
    companyName: "",
    designation: "",
    address: "",
    phone_with_code: "",
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await handleAddUser();
    } catch (error) {
      toast.error(t("error_adding_user"));
    } finally {
      setIsLoading(false);
    }
  };

  const openHelpModal = () => {
    setShowHelpModal(true);
  };
  const closeHelpModal = () => {
    setShowHelpModal(false);
  };

  useEffect(() => {
    if (activeTab === "users" && user?.id) {
      axios
        .post(`${api_url}${corporate_customer_get_group}`, {
          corporate_customer_id: user.id,
          lang: "en",
        })
        .then((res) => {
          if (res.data && res.data.status === 1 && res.data.result) {
            setGroups(res.data.result);
          }
        })
        .catch((err) => {});
    }
  }, [activeTab, user?.id]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${api_url}${corporate_customer_list}`,
        {
          corporate_customer_id: user.id,
        },
      );

      if (response.data.status === 1) {
        const mappedUsers = response.data.result.map((u) => ({
          id: u.id,
          name: u.first_name,
          firstName: u.first_name,
          lastName: u.last_name,
          phone: u.phone_number,
          phone_with_code: u.phone_with_code,
          country_code: u.country_code || `+254`,
          email: u.email,
          group: u.group_name || "-",
          group_name: u.group_name || "-",
          group_id: u.group_id,
          spent: u.wallet || 0,
          status: u.status === 1 ? "active" : "inactive",
          password: "",
          originalData: u,
        }));
        setUsers(mappedUsers);
      }
    } catch (error) {
      toast.error(t("failed_to_fetch_users"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.post(
        `${api_url}${corporate_customer_admin_list}`,
        { parent_id: user.id },
      );

      if (response.data.status === 1) {
        const mappedAdmins = response.data.result.map((admin) => ({
          id: admin.id,
          name: admin.first_name,
          firstName: admin.first_name,
          lastName: admin.last_name,
          phone: admin.phone_number,
          phone_with_code: admin.phone_with_code,
          email: admin.email,
          username: admin.username,
          companyName: admin.company_name,
          designation: admin.designation,
          address: admin.address,
          status: admin.status === 1 ? "active" : "inactive",
          originalData: admin,
        }));
        setAdmins(mappedAdmins);
      } else {
        setAdmins([]);
      }
    } catch (err) {
      toast.error(t("failed_to_fetch_admins"));
      setAdmins([]);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.post(`${api_url}${corporate_agent_list}`, {
        corporate_customer_id: user.id,
      });

      if (response.data.status === 1) {
        const mappedAgents = response.data.result.map((agent) => ({
          id: agent.id,
          name: agent.first_name,
          firstName: agent.first_name,
          lastName: agent.last_name,
          username: agent.username,
          phone: agent.phone_number,
          phone_with_code: agent.phone_with_code,
          email: agent.email,
          address: agent.address,
          status: agent.status === 1 ? "active" : "inactive",
          originalData: agent,
        }));
        setAgents(mappedAgents);
      }
    } catch (error) {
      toast.error(t("error_fetching_agents"));
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const filteredData = (() => {
    let data = [];
    if (activeTab === "admins") data = admins;
    else if (activeTab === "users") data = users;
    else if (activeTab === "agents") data = agents;

    return data.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone?.includes(searchTerm);
      const matchesStatus =
        statusFilter === "all" ? true : item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  })();

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusColor = (status) =>
    status === "active"
      ? "border-green-500 text-green-600"
      : "border-red-500 text-red-600";

  const handleInputChange = (field, value) => {
    setNewUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditUser = async (userData) => {
    try {
      setIsUpdatingUser(true);

      let phoneNumber = userData.phone;
      if (phoneNumber && !phoneNumber.startsWith("+")) {
        phoneNumber = `+${phoneNumber}`;
      }

      const updatePayload = {
        id: userData.id,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone_number: phoneNumber,
        group_id: userData.group_id,
        status: userData.status === "active" ? 1 : 0,
      };

      const response = await axios.post(
        `${api_url}${customer_profile_update}`,
        updatePayload,
      );

      if (response.data && response.data.status === 1) {
        toast.success(t("user_updated_successfully"));
        fetchUsers();
        setShowEditUserModal(false);
      } else {
        toast.error(response.data?.message || t("failed_to_update_user"));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t("failed_to_update_user"));
    } finally {
      setIsUpdatingUser(false);
    }
  };

  const handleConvertToAdmin = (userData) => {
    try {
      const phoneWithCode = userData.phone_with_code || `+254${userData.phone}`;
      const phoneNumber = userData.phone || userData.phone_number || "";

      setNewUser({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: phoneNumber.replace(/^\+?254/, "") || "",
        countryCode: "254",
        password: "",
        username: userData.email?.split("@")[0] || "",
        userId: userData.id,
        companyName: user?.company_name || "",
        designation: "Administrator",
        address: "",
        group: "",
        type: "admins",
        phone_with_code: phoneWithCode,
      });

      setUserToConvert(userData);

      setShowEditUserModal(false);
      setIsConvertingModalOpen(true);
      setShowAddModal(true);
      setActiveTab("admins");

      toast.info(t("please_complete_the_administrator_details"));
    } catch (error) {
      toast.error(t("failed_to_prepare_user_data_for_conversion"));
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setIsDeletingUser(true);

      const response = await axios.post(`${api_url}${customer_delete}`, {
        customer_id: userToDelete.id,
      });

      if (response.data && response.data.status === 1) {
        toast.success(response.data.message || t("user_deleted_successfully"));

        setShowDeleteConfirm(false);
        setShowEditUserModal(false);

        setUserToDelete(null);
        setSelectedUser(null);

        fetchUsers();
      } else {
        toast.error(response.data?.message || t("failed_to_delete_user"));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t("failed_to_delete_user"));
    } finally {
      setIsDeletingUser(false);
    }
  };

  const openDeleteConfirm = (userData) => {
    setUserToDelete(userData);
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const validateAdminFields = (data) => {
    const errors = [];

    if (!data.firstName?.trim()) errors.push(t("first_name"));
    if (!data.lastName?.trim()) errors.push(t("last_name"));
    if (!data.email?.trim()) errors.push(t("email_address"));
    if (!data.username?.trim()) errors.push(t("user_name"));
    if (!data.password?.trim()) errors.push(t("password"));
    if (!data.phone?.trim()) errors.push(t("phone_number"));
    if (!data.companyName?.trim()) errors.push(t("company_name"));
    if (!data.designation?.trim()) errors.push(t("designation"));
    if (!data.address?.trim()) errors.push(t("address"));

    return errors;
  };

  const handleAddUser = async () => {
    try {
      if (activeTab === "admins") {
        const validationErrors = validateAdminFields(newUser);

        if (validationErrors.length > 0) {
          toast.error(
            `${t("please_fill_all_required_fields")}: ${validationErrors.join(", ")}`,
          );
          return;
        }

        let rawPhone = newUser.phone.replace(/^0+/, "").replace(/\D/g, "");

        if (rawPhone.startsWith(newUser.countryCode)) {
          rawPhone = rawPhone.slice(newUser.countryCode.length);
        }

        if (!rawPhone) {
          toast.error(t("please_enter_a_valid_phone_number"));
          return;
        }

        const phoneWithCode =
          newUser.phone_with_code || `+${newUser.countryCode}${rawPhone}`;

        const adminPayload = {
          first_name: newUser.firstName.trim(),
          last_name: newUser.lastName.trim(),
          email: newUser.email.trim(),
          username: newUser.username.trim(),
          password: newUser.password,
          phone_number: rawPhone,
          phone_with_code: phoneWithCode,
          company_name: newUser.companyName.trim(),
          designation: newUser.designation.trim(),
          address: newUser.address.trim(),
          parent_id: user?.id || 0,
        };

        const response = await axios.post(
          `${api_url}${corporate_customer_register}`,
          adminPayload,
        );

        if (response.data && response.data.status === 1) {
          toast.success(t("administrator_added_successfully"));

          if (isConvertingModalOpen && userToConvert) {
            toast.success(t("user_successfully_converted_to_administrator"), {
              description: `${userToConvert.name} now has administrator privileges`,
            });
          }

          fetchAdmins();

          if (!isConvertingModalOpen) {
            fetchUsers();
          }

          setShowAddModal(false);
          setIsConvertingModalOpen(false);
          setUserToConvert(null);

          resetNewUserForm();
        } else {
          toast.error(
            response.data?.message || t("failed_to_add_administrator"),
          );
          return;
        }
      } else if (activeTab === "users") {
        if (
          !newUser.firstName ||
          !newUser.lastName ||
          !newUser.email ||
          !newUser.phone ||
          !newUser.password ||
          !newUser.group
        ) {
          toast.error(t("please_fill_all_required_fields_for_user"));
          return;
        }

        let rawPhone = newUser.phone.replace(/^0+/, "").replace(/\D/g, "");

        if (rawPhone.startsWith(newUser.countryCode)) {
          rawPhone = rawPhone.slice(newUser.countryCode.length);
        }

        const phoneWithCode = `+${newUser.countryCode}${rawPhone}`;

        const userPayload = {
          first_name: newUser.firstName,
          last_name: newUser.lastName,
          password: newUser.password,
          phone_with_code: phoneWithCode,
          phone_number: rawPhone,
          country_code: `+${newUser.countryCode}`,
          fcm_token: "123456",
          email: newUser.email,
          referral_code: "0",
          corporate_customer_id: user?.id || 0,
          group_id: newUser.group,
        };

        await axios.post(`${api_url}${customer_register}`, userPayload);
        toast.success(t("user_added_successfully"));

        setShowAddModal(false);
        fetchUsers();
        resetNewUserForm();
      } else if (activeTab === "agents") {
        if (
          !newUser.firstName ||
          !newUser.lastName ||
          !newUser.email ||
          !newUser.phone ||
          !newUser.username ||
          !newUser.password ||
          !newUser.address
        ) {
          toast.error(t("please_fill_all_required_fields_for_agent"));
          return;
        }

        let rawPhone = newUser.phone.replace(/^0+/, "").replace(/\D/g, "");

        if (rawPhone.startsWith(newUser.countryCode)) {
          rawPhone = rawPhone.slice(newUser.countryCode.length);
        }

        const phoneWithCode = `+${newUser.countryCode}${rawPhone}`;

        const agentPayload = {
          corporate_customer_id: user?.id || 0,
          first_name: newUser.firstName,
          last_name: newUser.lastName,
          phone_number: rawPhone,
          phone_with_code: phoneWithCode,
          email: newUser.email,
          username: newUser.username,
          password: newUser.password,
          address: newUser.address,
        };

        await axios.post(`${api_url}${corporate_agent_register}`, agentPayload);
        toast.success(t("ride_booker_agent_added_successfully"));

        setShowAddModal(false);
        fetchAgents();
        resetNewUserForm();
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || t("failed_to_add_please_try_again"),
      );
    }
  };

  const resetNewUserForm = () => {
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: "",
      userId: "",
      countryCode: "254",
      companyName: "",
      designation: "",
      address: "",
      group: activeTab === "agents" ? "Agents" : "",
      type: activeTab,
      phone_with_code: "",
      password: "",
    });
  };

  const closeModal = () => {
    setShowAddModal(false);
    setIsConvertingModalOpen(false);
    setUserToConvert(null);
    resetNewUserForm();
  };

  const closeBulkManageModal = () => {
    setShowBulkManageModal(false);
    setSelectedFile(null);
  };

  const closeEditUserModal = () => {
    setShowEditUserModal(false);
    setSelectedUser(null);
  };

  const closeViewAdminModal = () => {
    setShowViewAdminModal(false);
    setSelectedAdmin(null);
  };

  const closeViewAgentModal = () => {
    setShowViewAgentModal(false);
    setSelectedAgent(null);
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case "users":
        return t("add_person");
      case "admins":
        return isConvertingModalOpen
          ? t("convert_to_admin")
          : t("add_administrator");
      case "agents":
        return t("add_super_administrators");
      default:
        return t("add_person");
    }
  };

  const exportToExcel = async () => {
    setExportLoading(true);
    try {
      const exportData = users.map((user) => ({
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        country_code: user.country_code || "+254",
        phone_number: user.phone || "",
        phone_with_code: user.phone_with_code || "",
        password: "",
        status: user.status || "active",
        group_name: user.group_name || "-",
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const columnWidths = [
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 },
        { wch: 15 },
        { wch: 10 },
        { wch: 20 },
      ];
      worksheet["!cols"] = columnWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

      const timestamp = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");
      XLSX.writeFile(workbook, `users_export_${timestamp}.xlsx`);

      toast.success(t("users_exported_successfully"));
    } catch (error) {
      toast.error(t("failed_to_export_users"));
    } finally {
      setExportLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".ods")
      ) {
        setSelectedFile(file);
        toast.success(t("file_selected"));
      } else {
        toast.error(t("please_select_a_valid_excel_file"));
      }
    }
  };

  const uploadExcelFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${api_url}${customer_excel_upload}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data && response.data.status === 1) {
        return response.data.result;
      } else {
        throw new Error(response.data?.message || t("upload_failed"));
      }
    } catch (error) {
      throw error;
    }
  };

  const importCustomersFromFile = async (filePath) => {
    try {
      const response = await axios.post(`${api_url}${customer_excel_import}`, {
        file_path: filePath,
        corporate_customer_id: user?.id || 0,
      });

      if (response.data && response.data.status === 1) {
        return response.data;
      } else {
        throw new Error(response.data?.message || "Import failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const importFromExcel = async () => {
    if (!selectedFile) {
      toast.error(t("please_select_a_file_to_import"));
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const headers = Object.keys(jsonData[0] || {});
        const requiredHeaders = [
          "first_name",
          "last_name",
          "country_code",
          "phone_number",
          "phone_with_code",
          "password",
          "status",
          "group_name",
        ];

        const missingHeaders = requiredHeaders.filter(
          (header) => !headers.includes(header),
        );

        if (missingHeaders.length > 0) {
          toast.error(
            `${t("missing_required_columns")}: ${missingHeaders.join(", ")}`,
          );
          setImportLoading(false);
          return;
        }

        const invalidRows = jsonData.filter(
          (row) =>
            !row.first_name ||
            !row.last_name ||
            !row.phone_number ||
            !row.phone_with_code ||
            !row.country_code ||
            !row.password ||
            !row.status ||
            !row.group_name,
        );

        if (invalidRows.length > 0) {
          toast.error(
            t("found_rows_with_missing_data", { count: invalidRows.length }),
          );
          setImportLoading(false);
          return;
        }

        setImportLoading(true);
        try {
          toast.info(t("uploading_file"));
          const filePath = await uploadExcelFile(selectedFile);

          toast.info(t("importing_users"));
          const importResult = await importCustomersFromFile(filePath);

          if (importResult.status === 1) {
            toast.success(
              importResult.message || t("users_imported_successfully"),
            );

            setTimeout(() => {
              fetchUsers();
              closeBulkManageModal();
            }, 1500);
          }
        } catch (error) {
          toast.error(error.message || t("failed_to_import_users"));
        } finally {
          setImportLoading(false);
        }
      };

      reader.readAsBinaryString(selectedFile);
    } catch (error) {
      toast.error(t("error_reading_file_please_check_the_format"));
      setImportLoading(false);
    }
  };

  const downloadTemplate = () => {
    try {
      const templateData = [
        {
          first_name: "John",
          last_name: "Doe",
          country_code: "+254",
          phone_number: "712345678",
          phone_with_code: "+254712345678",
          password: "password123",
          status: "active",
          group_name: "Default Group",
        },
      ];

      const worksheet = XLSX.utils.json_to_sheet(templateData);
      const columnWidths = [
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 },
        { wch: 15 },
        { wch: 10 },
        { wch: 20 },
      ];
      worksheet["!cols"] = columnWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

      XLSX.writeFile(workbook, "users_import_template.xlsx");
      toast.success(t("template_downloaded_successfully"));
    } catch (error) {
      toast.error(t("failed_to_download_template"));
    }
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
            <div className="flex flex-row xs:flex-row gap-2 sm:gap-3">
              <div className="relative flex-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm"></i>
                <input
                  type="text"
                  placeholder={t("search_people")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full xs:w-32 sm:w-40 h-9 sm:h-10 px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
              >
                <option value="all">{t("all_status")}</option>
                <option value="active">{t("active")}</option>
                <option value="inactive">{t("inactive")}</option>
              </select>
            </div>

            {/* Table */}
            <div className="rounded-md border border-gray-200 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t("name")}
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t("phone")}
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t("group")}
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t("status")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditUserModal(true);
                        }}
                      >
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                          {user.phone_with_code}
                        </td>
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                          {user.group}
                        </td>
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              user.status,
                            )}`}
                          >
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-2 p-2">
                {paginatedData.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditUserModal(true);
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </h3>
                        <p className="text-xs text-gray-600">{user.phone}</p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          user.status,
                        )}`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-500">{t("group")}</p>
                        <p className="font-medium text-gray-900 truncate">
                          {user.group}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">{t("spent")}</p>
                        <p className="font-medium text-gray-900">
                          {user.spent}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {paginatedData.length === 0 && !loading && (
              <div className="text-center py-8 sm:py-12">
                <i className="fas fa-users text-gray-300 text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
                <p className="text-gray-500 text-sm sm:text-lg">
                  {t("no_users_found")}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  {t("try_adjusting_your_search_criteria")}
                </p>
              </div>
            )}

            {loading && (
              <div className="text-center py-8 sm:py-12 text-gray-500">
                {t("loading_users")}...
              </div>
            )}
          </div>
        );

      case "admins":
        return (
          <div className="mt-3 sm:mt-4">
            <div className="flex flex-row xs:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="relative flex-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm"></i>
                <input
                  type="text"
                  placeholder={t("search_administrators")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full xs:w-32 sm:w-40 h-9 sm:h-10 px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
              >
                <option value="all">{t("all_status")}</option>
                <option value="active">{t("active")}</option>
                <option value="inactive">{t("inactive")}</option>
              </select>
            </div>

            {paginatedData.length > 0 ? (
              <div className="rounded-md border border-gray-200 overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("name")}
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("phone")}
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("user_name")}
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("status")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedData.map((admin) => (
                        <tr
                          key={admin.id}
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedAdmin(admin);
                            setShowViewAdminModal(true);
                          }}
                        >
                          <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                            {admin.name}
                          </td>
                          <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {admin.phone}
                          </td>
                          <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {admin.username}
                          </td>
                          <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                admin.status,
                              )}`}
                            >
                              {admin.status.charAt(0).toUpperCase() +
                                admin.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-2 p-2">
                  {paginatedData.map((admin) => (
                    <div
                      key={admin.id}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        setSelectedAdmin(admin);
                        setShowViewAdminModal(true);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {admin.name}
                          </h3>
                          <p className="text-xs text-gray-600">{admin.phone}</p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            admin.status,
                          )}`}
                        >
                          {admin.status.charAt(0).toUpperCase() +
                            admin.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs">
                        <p className="text-gray-500">{t("user_name")}</p>
                        <p className="font-medium text-gray-900">
                          {admin.username}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500">
                <i className="fas fa-user-shield text-gray-300 text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
                <p className="text-sm sm:text-lg">
                  {t("no_administrators_found")}
                </p>
                <p className="text-xs sm:text-sm mt-1">
                  {t("add_your_first_admin_to_get_started")}
                </p>
              </div>
            )}
          </div>
        );

      case "agents":
        return (
          <div className="mt-3 sm:mt-4">
            <div className="flex flex-row xs:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="relative flex-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm"></i>
                <input
                  type="text"
                  placeholder={t("search_ride_booker_agents")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full xs:w-32 sm:w-40 h-9 sm:h-10 px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
              >
                <option value="all">{t("all_status")}</option>
                <option value="active">{t("active")}</option>
                <option value="inactive">{t("inactive")}</option>
              </select>
            </div>

            {paginatedData.length > 0 ? (
              <div className="rounded-md border border-gray-200 overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("name")}
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("user_name")}
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t("status")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedData.map((agent) => (
                        <tr
                          key={agent.id}
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedAgent(agent);
                            setShowViewAgentModal(true);
                          }}
                        >
                          <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                            <div>
                              <div>{agent.name}</div>
                              <div className="text-xs text-gray-500">
                                {agent.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {agent.username}
                          </td>
                          <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                agent.status,
                              )}`}
                            >
                              {agent.status.charAt(0).toUpperCase() +
                                agent.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-2 p-2">
                  {paginatedData.map((agent) => (
                    <div
                      key={agent.id}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        setSelectedAgent(agent);
                        setShowViewAgentModal(true);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {agent.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            @{agent.username}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            agent.status,
                          )}`}
                        >
                          {agent.status.charAt(0).toUpperCase() +
                            agent.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{agent.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500">
                <i className="fas fa-user-tie text-gray-300 text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
                <p className="text-sm sm:text-lg">
                  {t("no_ride_booker_agents_found")}
                </p>
                <p className="text-xs sm:text-sm mt-1">
                  {t("add_your_first_agent_to_get_started")}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            {t("people")}
          </h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
            {t("manage_users_administrators_and_agents")}
          </p>
        </div>
        <div className="flex flex-row xs:flex-row gap-2 w-full sm:w-auto">
          {activeTab === "users" && (
            <button
              onClick={openHelpModal}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              <i className="fas fa-question-circle text-xs sm:text-sm"></i>
              {t("need_help")}
            </button>
          )}
          {activeTab === "users" && (
            <button
              onClick={() => setShowBulkManageModal(true)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              <i className="fas fa-cog text-xs sm:text-sm"></i>
              {t("bulk_manage")}
            </button>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#1EC51D] text-white rounded-md hover:bg-[#17a517] transition-colors active:scale-95 text-xs sm:text-sm cursor-pointer"
          >
            <i className="fas fa-plus text-xs sm:text-sm"></i>
            {getAddButtonText()}
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-3 sm:p-4 md:p-6">
          {/* Tabs */}
          <div className="w-full">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab("users")}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === "users"
                    ? "border-[#1EC51D] text-[#1EC51D]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t("users")}
              </button>
              <button
                onClick={() => setActiveTab("admins")}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === "admins"
                    ? "border-[#1EC51D] text-[#1EC51D]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t("administrators")}
              </button>
              <button
                onClick={() => setActiveTab("agents")}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === "agents"
                    ? "border-[#1EC51D] text-[#1EC51D]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t("super_administrators")}
              </button>
            </div>

            {/* Tab Content */}
            {getTabContent()}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mt-3">
        <p className="text-xs sm:text-sm text-gray-600">
          {t("showing")} <span className="font-medium">{startIndex + 1}</span>{" "}
          {t("to")}{" "}
          <span className="font-medium">
            {Math.min(startIndex + itemsPerPage, filteredData.length)}
          </span>{" "}
          {t("of")} <span className="font-medium">{filteredData.length}</span>{" "}
          {t("results")}
        </p>

        <div className="flex items-center gap-1">
          <button
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs active:scale-95 cursor-pointer"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium cursor-pointer ${
                currentPage === i + 1
                  ? "bg-[#1EC51D] text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs active:scale-95 cursor-pointer"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p=0">
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeEditUserModal}
            ></div>

            <div className="relative inline-block w-full max-w-lg px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p=6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t("edit_user")}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {t("view_and_edit_user_details")}
                  </p>
                </div>
                <button
                  onClick={closeEditUserModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-user-shield text-blue-600 text-lg"></i>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {t("enable_company_dashboard_access")}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {t("make_this_user_an_administrator")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleConvertToAdmin(selectedUser)}
                    disabled={isConvertingToAdmin}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isConvertingToAdmin ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("processing")}...
                      </span>
                    ) : (
                      t("convert_to_admin")
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("first_name")}
                    </label>
                    <input
                      type="text"
                      value={selectedUser.firstName}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("last_name")}
                    </label>
                    <input
                      type="text"
                      value={selectedUser.lastName}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t("email_address")}
                  </label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t("phone_number")}
                  </label>
                  <PhoneInput
                    country={"ke"}
                    value={selectedUser.phone_with_code}
                    onChange={(val) =>
                      setSelectedUser({ ...selectedUser, phone: val })
                    }
                    enableSearch
                    inputClass="w-full py-2 pl-14 pr-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D]"
                    inputStyle={{
                      width: "100%",
                      paddingLeft: "58px",
                      height: "44px",
                      fontSize: "15px",
                    }}
                    containerClass="!w-full"
                    buttonStyle={{
                      border: "none",
                      background: "transparent",
                      marginLeft: "8px",
                      paddingLeft: "10px",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t("group")}
                  </label>
                  <select
                    value={selectedUser.group_id || ""}
                    onChange={(e) => {
                      const selectedGroupId = e.target.value;
                      const selectedGroup = groups.find(
                        (group) => group.id === parseInt(selectedGroupId),
                      );
                      setSelectedUser({
                        ...selectedUser,
                        group_id: selectedGroupId,
                        group: selectedGroup
                          ? selectedGroup.group_name
                          : selectedUser.group,
                      });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                  >
                    <option value="">{t("select_a_group")}</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.group_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {t("status")}
                  </label>
                  <select
                    value={selectedUser.status}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                  >
                    <option value="active">{t("active")}</option>
                    <option value="inactive">{t("inactive")}</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => openDeleteConfirm(selectedUser)}
                  disabled={isUpdatingUser}
                  className="flex-1 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fas fa-trash-alt"></i>
                  {t("delete_user")}
                </button>

                <button
                  onClick={closeEditUserModal}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  {t("cancel")}
                </button>

                <button
                  onClick={() => handleEditUser(selectedUser)}
                  disabled={isUpdatingUser}
                  className="flex-1 py-3 bg-[#1EC51D] text-white rounded-lg hover:bg-[#17a517] transition-colors text-sm font-medium disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isUpdatingUser ? (
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
                      <span>{t("saving")}...</span>
                    </>
                  ) : (
                    t("save_changes")
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && userToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p=0">
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeDeleteConfirm}
            ></div>

            <div className="relative inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p=6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t("delete_user")}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {t("confirm_user_deletion")}
                  </p>
                </div>
                <button
                  onClick={closeDeleteConfirm}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="text-center p-4 mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-exclamation-triangle text-red-600 text-3xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t("delete_user_question")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("are_you_sure_you_want_to_delete")}{" "}
                  <span className="font-semibold">{userToDelete.name}</span>?{" "}
                  {t("this_action_cannot_be_undone")}.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeDeleteConfirm}
                  disabled={isDeletingUser}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer"
                >
                  {t("cancel")}
                </button>

                <button
                  onClick={handleDeleteUser}
                  disabled={isDeletingUser}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isDeletingUser ? (
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
                      <i className="fas fa-trash-alt"></i>
                      {t("delete_user")}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Admin Modal */}
      {showViewAdminModal && selectedAdmin && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p=0">
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeViewAdminModal}
            ></div>

            <div className="relative inline-block w-full max-w-lg px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p=6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t("administrator_details")}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {t("view_administrator_information")}
                  </p>
                </div>
                <button
                  onClick={closeViewAdminModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-user-shield text-blue-600 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedAdmin.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      @{selectedAdmin.username}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs font-medium border ${getStatusColor(
                        selectedAdmin.status,
                      )}`}
                    >
                      {selectedAdmin.status.charAt(0).toUpperCase() +
                        selectedAdmin.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">{t("email")}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedAdmin.email}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">{t("phone")}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedAdmin.phone}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">{t("company_name")}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedAdmin.companyName || "-"}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">{t("designation")}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedAdmin.designation || "-"}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">{t("address")}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedAdmin.address || "-"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeViewAdminModal}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Agent Modal */}
      {showViewAgentModal && selectedAgent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p=0">
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeViewAgentModal}
            ></div>

            <div className="relative inline-block w-full max-w-lg px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p=6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t("agent_details")}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {t("view_ride_booker_agent_information")}
                  </p>
                </div>
                <button
                  onClick={closeViewAgentModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-user-tie text-green-600 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedAgent.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      @{selectedAgent.username}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs font-medium border ${getStatusColor(
                        selectedAgent.status,
                      )}`}
                    >
                      {selectedAgent.status.charAt(0).toUpperCase() +
                        selectedAgent.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">{t("email")}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedAgent.email}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">{t("phone")}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedAgent.phone}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">{t("username")}</p>
                    <p className="text-sm font-medium text-gray-900">
                      @{selectedAgent.username}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">{t("address")}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedAgent.address || "-"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeViewAgentModal}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                >
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Person Modal  */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p=0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeModal}
            ></div>

            {/* Modal panel */}
            <div className="relative inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p=6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isConvertingModalOpen
                      ? t("convert_user_to_admin")
                      : activeTab === "users"
                        ? t("add_new_person")
                        : activeTab === "admins"
                          ? t("add_new_administrator")
                          : t("add_new_super_administrators")}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {isConvertingModalOpen
                      ? t("complete_admin_details_for_user") +
                        " " +
                        newUser.firstName +
                        " " +
                        newUser.lastName
                      : t("fill_in_the_details_to_add_a_new") +
                        " " +
                        (activeTab === "users"
                          ? "person"
                          : activeTab === "admins"
                            ? "administrator"
                            : "ride booker agent")}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Fields for Users & Admins */}
                {(activeTab === "users" || activeTab === "admins") && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {t("first_name")} *
                        </label>
                        <input
                          type="text"
                          placeholder={t("enter_first_name")}
                          value={newUser.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                          readOnly={isConvertingModalOpen}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {t("last_name")} *
                        </label>
                        <input
                          type="text"
                          placeholder={t("enter_last_name")}
                          value={newUser.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                          readOnly={isConvertingModalOpen}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("email_address")} *
                      </label>
                      <input
                        type="email"
                        placeholder={t("enter_email_address")}
                        value={newUser.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                        readOnly={isConvertingModalOpen}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("phone_number")} *
                      </label>
                      <PhoneInput
                        country={"ke"}
                        value={
                          isConvertingModalOpen && newUser.phone_with_code
                            ? newUser.phone_with_code
                            : newUser.phone
                        }
                        onChange={(val, data) => {
                          handleInputChange("phone", val.replace(/\D/g, ""));
                          handleInputChange("countryCode", data.dialCode);
                        }}
                        enableSearch
                        inputClass="w-full py-2 pl-14 pr-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D]"
                        inputStyle={{
                          width: "100%",
                          paddingLeft: "58px",
                          height: "44px",
                          fontSize: "15px",
                        }}
                        containerClass="!w-full"
                        buttonStyle={{
                          border: "none",
                          background: "transparent",
                          marginLeft: "8px",
                          paddingLeft: "10px",
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("password")} *
                      </label>
                      <input
                        type="password"
                        placeholder={t("enter_password")}
                        value={newUser.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                      />
                    </div>
                  </>
                )}

                {/* Admin */}
                {activeTab === "admins" && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("user_name")} *
                      </label>
                      <input
                        type="text"
                        placeholder={t("enter_username")}
                        value={newUser.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("company_name")} *
                      </label>
                      <input
                        type="text"
                        placeholder={t("enter_company_name")}
                        value={newUser.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("designation")} *
                      </label>
                      <input
                        type="text"
                        placeholder={t("enter_designation")}
                        value={newUser.designation}
                        onChange={(e) =>
                          handleInputChange("designation", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("address")} *
                      </label>
                      <input
                        type="text"
                        placeholder={t("enter_address")}
                        value={newUser.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                      />
                    </div>
                  </>
                )}

                {/* Group selection  */}
                {activeTab === "users" && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("group")} *
                    </label>
                    <select
                      value={newUser.group}
                      onChange={(e) => {
                        const selectedGroupId = e.target.value;
                        const selectedGroup = groups.find(
                          (group) => group.id === parseInt(selectedGroupId),
                        );
                        setNewUser({
                          ...newUser,
                          group: selectedGroupId,
                          group_name: selectedGroup
                            ? selectedGroup.group_name
                            : "",
                        });
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                    >
                      <option value="">{t("select_a_group")}</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.group_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Agent  */}
                {activeTab === "agents" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {t("first_name")} *
                        </label>
                        <input
                          type="text"
                          placeholder={t("enter_first_name")}
                          value={newUser.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {t("last_name")} *
                        </label>
                        <input
                          type="text"
                          placeholder={t("enter_last_name")}
                          value={newUser.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("email")} *
                      </label>
                      <input
                        type="email"
                        placeholder={t("enter_email")}
                        value={newUser.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("phone_number")} *
                      </label>
                      <PhoneInput
                        country={"ke"}
                        value={newUser.phone}
                        onChange={(val, data) => {
                          handleInputChange("phone", val.replace(/\D/g, ""));
                          handleInputChange("countryCode", data.dialCode);
                        }}
                        enableSearch
                        inputClass="w-full py-2 pl-14 pr-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1EC51D]"
                        inputStyle={{
                          width: "100%",
                          paddingLeft: "58px",
                          height: "44px",
                          fontSize: "15px",
                        }}
                        containerClass="!w-full"
                        buttonStyle={{
                          border: "none",
                          background: "transparent",
                          marginLeft: "8px",
                          paddingLeft: "10px",
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("user_name")} *
                      </label>
                      <input
                        type="text"
                        placeholder={t("enter_username")}
                        value={newUser.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("password")} *
                      </label>
                      <input
                        type="password"
                        placeholder={t("enter_password")}
                        value={newUser.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("address")} *
                      </label>
                      <input
                        type="text"
                        placeholder={t("enter_address")}
                        value={newUser.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  disabled={isLoading}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer"
                >
                  {t("cancel")}
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 py-3 bg-[#1EC51D] text-white rounded-lg hover:bg-[#17a517] transition-colors text-sm font-medium disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
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
                      <span>
                        {isConvertingModalOpen
                          ? t("converting")
                          : t("processing")}
                        ...
                      </span>
                    </>
                  ) : (
                    <>
                      {isConvertingModalOpen
                        ? t("convert_to_admin")
                        : activeTab === "users"
                          ? t("add_person")
                          : activeTab === "admins"
                            ? t("add_administrator")
                            : t("add_super_administrators")}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal Component */}
      <HelpModal isOpen={showHelpModal} onClose={closeHelpModal} />

      {/* Bulk Manage Modal */}
      {showBulkManageModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p=0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black/20 transition-opacity"
              onClick={closeBulkManageModal}
            ></div>

            {/* Modal panel */}
            <div className="relative inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p=6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t("bulk_manage_users")}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {t("export_or_import_users_in_bulk")}
                  </p>
                </div>
                <button
                  onClick={closeBulkManageModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              {/* Export Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {t("export_people")}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {users.length} {t("users")}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {t(
                    "download_user_data_in_excel_format_with_required_columns",
                  )}
                  <br />
                  <span className="text-xs text-gray-500">
                    {t(
                      "columns_first_name_last_name_country_code_phone_number_phone_with_code_password_status_group_name",
                    )}
                  </span>
                </p>
                <button
                  onClick={exportToExcel}
                  disabled={exportLoading || users.length === 0}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {exportLoading ? (
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
                      <span>{t("exporting")}...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-file-export"></i>
                      {t("export_users")}
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">{t("or")}</span>
                </div>
              </div>

              {/* Import Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {t("import_users")}
                  </h3>
                  <button
                    onClick={downloadTemplate}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium hover:bg-green-200 transition-colors cursor-pointer"
                  >
                    <i className="fas fa-download mr-1"></i>
                    {t("download_template")}
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {t("upload_an_excel_file_with_the_following_columns")}
                  <br />
                  <span className="text-xs text-gray-500 font-medium">
                    {t(
                      "columns_first_name_last_name_country_code_phone_number_phone_with_code_password_status_group_name",
                    )}
                  </span>
                  <br />
                  <span className="text-xs text-red-500">
                    * {t("all_fields_are_required")}
                  </span>
                </p>

                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 cursor-pointer transition-colors ${
                    selectedFile
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <input
                    type="file"
                    id="file-input"
                    className="hidden"
                    accept=".xlsx,.xls,.ods"
                    onChange={handleFileSelect}
                  />
                  {selectedFile ? (
                    <div className="text-green-600">
                      <i className="fas fa-file-excel text-3xl mb-2"></i>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-green-500 mt-1">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        {t("file_ready_for_upload")}
                      </p>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <i className="fas fa-cloud-upload-alt text-3xl mb-2"></i>
                      <p className="font-medium">
                        {t("click_to_upload_excel_file")}
                      </p>
                      <p className="text-xs mt-1">
                        {t("supports_xlsx_xls_ods_files_only")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Import Button */}
                <button
                  onClick={importFromExcel}
                  disabled={importLoading || !selectedFile}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {importLoading ? (
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
                      <span>{t("importing")}...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-file-import"></i>
                      {t("import_users_from_file")}
                    </>
                  )}
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={closeBulkManageModal}
                className="w-full mt-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
