import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  api_url,
  corporate_customer_get_profile,
  corporate_customer_profile_image_upload,
  corporate_customer_profile_picture_update,
  corporate_customer_profile_update,
  img_url,
} from "../constants/constant";
const Profile = () => {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    designation: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { user, login, setUser } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(t("please_select_an_image_file"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("image_size_should_be_less_than"));
      return;
    }

    setProfileImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadResponse = await axios.post(
        `${api_url}${corporate_customer_profile_image_upload}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (uploadResponse.data.status !== 1) {
        toast.error(uploadResponse.data.message || t("image_upload_failed"));
        return;
      }

      const uploadedPath = uploadResponse.data.result;

      const updateResponse = await axios.post(
        `${api_url}${corporate_customer_profile_picture_update}`,
        {
          id: user.id,
          profile_picture: uploadedPath,
        },
      );

      if (updateResponse.data.status === 1) {
        toast.success(t("profile_picture_updated_successfully"));

        setUser((prev) => ({
          ...prev,
          profile_picture: uploadedPath,
        }));
      } else {
        toast.error(
          updateResponse.data.message || t("failed_to_update_profile_picture"),
        );
      }
    } catch (error) {
      toast.error(t("something_went_wrong"));
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("first_name", profileData.first_name || "");
      formData.append("last_name", profileData.last_name || "");
      formData.append("email", profileData.email || "");
      formData.append("phone_number", profileData.phone_number || "");
      if (profileData.newPassword) {
        formData.append("password", profileData.newPassword);
      }

      const response = await axios.post(
        `${api_url}${corporate_customer_profile_update}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.status === 1) {
        toast.success(t("profile_updated_successfully"));

        const updatedUser = {
          ...user,
          ...response.data.result,
        };

        login(updatedUser);
      } else {
        toast.error(response.data.message || t("failed_to_update_profile"));
      }
    } catch (error) {
      toast.error(t("something_went_wrong"));
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.post(
          `${api_url}${corporate_customer_get_profile}`,
          { corporate_customer_id: user.id },
        );

        if (response.data.status === 1 && response.data.result) {
          const data = response.data.result;
          setProfileData(data);

          if (data.profile_picture) {
            setImagePreview(`${img_url}${data.profile_picture}`);
          }
        } else {
          toast.error(t("profile_fetch_failed"));
        }
      } catch (error) {}
    };

    fetchProfile();
  }, [user]);
  return (
    <div className="flex-1 space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 mt-2 md:mt-6 lg:mt-4">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
          {t("profile")}
        </h1>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
          {t("manage_your_personal_information_and_security")}
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        {/* Personal Details */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {t("personal_details")}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              {t("update_your_personal_information")}
            </p>
          </div>
          <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-[#1EC51D] to-green-400 flex items-center justify-center text-white text-lg sm:text-xl font-semibold overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    profileData.first_name?.[0] || "U"
                  )}
                </div>

                <div className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full xs:w-auto">
                <button
                  onClick={triggerFileInput}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] active:scale-95 text-xs sm:text-sm w-full xs:w-auto cursor-pointer"
                >
                  <i className="fas fa-upload text-xs sm:text-sm"></i>
                  {imagePreview ? "Change Photo" : "Upload Photo"}
                </button>
              </div>
            </div>

            {/* Image upload info */}
            {!imagePreview && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <i className="fas fa-info-circle text-blue-500 text-sm mt-0.5"></i>
                  <div>
                    <p className="text-xs text-blue-800 font-medium">
                      {t("profile_photo")}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      {t("upload_a_profile_photo")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* First Name */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="first-name"
                  className="text-xs sm:text-sm font-medium text-gray-900"
                >
                  {t("first_name")}
                </label>
                <input
                  id="first-name"
                  type="text"
                  value={profileData.first_name || ""}
                  onChange={(e) =>
                    handleInputChange("first_name", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="last-name"
                  className="text-xs sm:text-sm font-medium text-gray-900"
                >
                  {t("last_name")}
                </label>
                <input
                  id="last-name"
                  type="text"
                  value={profileData.last_name || ""}
                  onChange={(e) =>
                    handleInputChange("last_name", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-medium text-gray-900"
                >
                  {t("email")}
                </label>
                <input
                  id="email"
                  type="email"
                  value={profileData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="phone"
                  className="text-xs sm:text-sm font-medium text-gray-900"
                >
                  {t("phone")}
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={profileData.phone_number || ""}
                  onChange={(e) =>
                    handleInputChange("phone_number", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D] cursor-not-allowed"
                  disabled
                />
              </div>

              {/* Role */}
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="role"
                  className="text-xs sm:text-sm font-medium text-gray-900"
                >
                  {t("role")}
                </label>
                <input
                  id="role"
                  type="text"
                  value={profileData.designation || "Administrator"}
                  disabled
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md 
                     bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {t("change_password")}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              {t("update_your_account_password")}
            </p>
          </div>
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="new-password"
                className="text-xs sm:text-sm font-medium text-gray-900"
              >
                {t("new_password")}
              </label>
              <input
                id="new-password"
                type="password"
                value={profileData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
              />
            </div>
            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="confirm-password"
                className="text-xs sm:text-sm font-medium text-gray-900"
              >
                {t("confirm_password")}
              </label>
              <input
                id="confirm-password"
                type="password"
                value={profileData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:border-[#1EC51D]"
              />
            </div>
          </div>
        </div>

        {/* Save Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
          <button
            onClick={handleSaveChanges}
            className="px-4 sm:px-6 py-2 bg-[#1EC51D] text-white rounded-md hover:bg-[#17a517] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EC51D] focus:ring-offset-2 active:scale-95 text-xs sm:text-sm cursor-pointer"
          >
            {t("save_changes")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
