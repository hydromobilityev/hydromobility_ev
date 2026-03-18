import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logos/Fab-icon logo.webp";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import {
  api_url,
  corporate_customer_forgot_password,
  corporate_customer_login,
  corporate_customer_reset_password,
} from "../constants/constant";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [activeForm, setActiveForm] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [forgotPhone, setForgotPhone] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const { t } = useTranslation();
  const { language, changeLanguage, toggleLanguage, isSwahili, isEnglish } =
    useLanguage();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${api_url}${corporate_customer_login}`,
        {
          username: formData.username,
          password: formData.password,
        },
      );

      if (response.data.status === 1) {
        const userType = response.data.user_type;
        const userData = response.data.result;

        if (userType !== "corporate_customer") {
          toast.error(
            t(
              "this_portal_is_for_corporate_customers_only_agents_should_use_the_ride_booking_portal",
            ),
          );
          setIsLoading(false);
          return;
        }

        const authData = {
          ...userData,
          user_type: userType,
          token: response.data.token || "corporate_customer_auth_token",
        };

        login(authData, () => {
          toast.success(t("login_successful"));
          navigate("/");
        });
      } else {
        toast.error(
          response.data.message || t("login_failed_check_credentials"),
        );
      }
    } catch (error) {
      toast.error(t("something_went_wrong_please_try_again"));
    } finally {
      setIsLoading(false);
    }
  };

  const showForgotForm = () => setActiveForm("forgot");

  const sendVerificationCode = async (e) => {
    e.preventDefault();

    const phoneWithCode = formData.phone.startsWith("+")
      ? formData.phone
      : `+${formData.phone}`;

    setForgotPhone(phoneWithCode);

    const payload = { phone_with_code: phoneWithCode };

    try {
      const response = await axios.post(
        `${api_url}${corporate_customer_forgot_password}`,
        payload,
      );

      if (response.data.status === 1) {
        const { otp, type } = response.data.result;

        setServerOtp(otp.toString());

        if (type === "customer") {
          toast.success(t("otp_sent_to_customer_number"));
        } else if (type === "agent") {
          toast.success(t("OTP imetumwa kwa nambari ya wakala!"));
        }

        setActiveForm("otp");
      } else {
        toast.error(response.data.message || t("failed_to_send_otp"));
      }
    } catch (error) {
      toast.error(t("network_error_try_again"));
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setFormData({ ...formData, otp: value });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if (formData.otp.length !== 4) {
      toast.error(t("please_enter_4_digit_otp"));
      return;
    }

    if (formData.otp !== serverOtp) {
      toast.error(t("invalid_otp_please_try_again"));
      return;
    }

    toast.success(t("otp_verified_successfully"));
    setActiveForm("reset");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(t("passwords_dont_match"));
      return;
    }

    const payload = {
      phone_with_code: forgotPhone,
      password: formData.newPassword,
    };

    try {
      const response = await axios.post(
        `${api_url}${corporate_customer_reset_password}`,
        payload,
      );

      if (response.data.status === 1) {
        toast.success(t("password_reset_successful"));
        setActiveForm("login");
        setFormData({
          username: "",
          password: "",
          phone: "",
          otp: "",
          newPassword: "",
          confirmPassword: "",
        });
        setServerOtp("");
      } else {
        toast.error(response.data.message || t("failed_to_reset_password"));
      }
    } catch (error) {
      toast.error(t("network_error_try_again"));
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleLanguageChange = (lang) => {
    if (lang === "en" || lang === "sw") {
      changeLanguage(lang);
    } else {
      changeLanguage("en");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Language Toggle - Top Right Corner */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
          <button
            onClick={() => handleLanguageChange("en")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
              isEnglish()
                ? "bg-[#1EC51D] text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <i className="fas fa-flag-usa mr-1.5"></i>
            EN
          </button>
          <button
            onClick={() => handleLanguageChange("sw")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
              isSwahili()
                ? "bg-[#1EC51D] text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <i className="fas fa-flag mr-1.5"></i>
            SW
          </button>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
            title={isEnglish() ? "Switch to Swahili" : "Switch to English"}
          >
            <i className="fas fa-globe text-lg"></i>
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side */}
          <div className="lg:w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 relative">
            <div className="h-64 lg:h-full bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <img
                  src={logoIcon}
                  alt="Hydromobility"
                  className="h-24 w-40 object-contain mx-auto mb-4"
                />
                <h1 className="text-4xl font-bold mb-4">Hydromobility EV</h1>
                <p className="text-xl opacity-90 mb-8">
                  Hydromobility EV {t("business")}
                </p>
                <div className="mt-8 flex justify-center space-x-6 text-sm opacity-80">
                  <div className="text-center">
                    <i className="fas fa-building text-[#1EC51D] mb-1"></i>
                    <div>{t("corporate")}</div>
                  </div>
                  <div className="text-center">
                    <i className="fas fa-chart-line text-[#1EC51D] mb-1"></i>
                    <div>{t("analytics")}</div>
                  </div>
                  <div className="text-center">
                    <i className="fas fa-users text-[#1EC51D] mb-1"></i>
                    <div>{t("management")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            {/* Language Toggle   */}
            <div className="lg:hidden mb-6">
              <div className="flex justify-center">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                      isEnglish()
                        ? "bg-[#1EC51D] text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <i className="fas fa-flag-usa mr-1.5 text-sm"></i>
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange("sw")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                      isSwahili()
                        ? "bg-[#1EC51D] text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <i className="fas fa-flag mr-1.5 text-sm"></i>
                    SW
                  </button>
                  <button
                    onClick={toggleLanguage}
                    className="px-3 py-1.5 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
                    title={
                      isEnglish() ? "Switch to Swahili" : "Switch to English"
                    }
                  >
                    <i className="fas fa-globe"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* LOGIN FORM */}
            {activeForm === "login" && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Hydromobility EV {t("business")}
                  </h2>
                  <p className="text-white/70 mb-6">
                    {t("sign_in_to_manage_your_corporate_account")}
                  </p>

                  {/* Register link section */}
                  <div className="flex items-center justify-center mb-6">
                    <p className="text-white/70 mr-2">
                      {t("new_to")} Hydromobility EV {t("business")}?
                    </p>
                  </div>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="relative">
                    <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg"></i>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder={t("user_name") || "Username"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#1EC51D] focus:bg-white/10 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="relative">
                    <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg"></i>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={t("password") || "Password"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[#1EC51D] focus:bg-white/10 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={showForgotForm}
                      className="text-[#1EC51D] hover:text-[#1aff1a] text-sm transition-colors duration-300 cursor-pointer"
                    >
                      {t("forgot_password")}?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#1EC51D] to-[#17a916] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-[#1aff1a] hover:to-[#1EC51D] disabled:opacity-50 cursor-pointer"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    {isLoading ? t("logging_in") : t("continue")}
                  </button>

                  {/* Language selector in login form footer */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm flex items-center">
                        <i className="fas fa-language mr-2"></i>
                        {isEnglish() ? "Language" : "Lugha"}:
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLanguageChange("en")}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                            isEnglish()
                              ? "bg-[#1EC51D] text-white"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          English
                        </button>
                        <button
                          onClick={() => handleLanguageChange("sw")}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                            isSwahili()
                              ? "bg-[#1EC51D] text-white"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          Swahili
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* FORGOT PASSWORD */}
            {activeForm === "forgot" && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <i className="fas fa-lock-open text-4xl text-[#1EC51D] mb-4"></i>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {t("reset_corporate_password")}
                  </h2>
                  <p className="text-white/70">
                    {t("enter_your_registered_phone_number")}
                  </p>
                </div>
                <form onSubmit={sendVerificationCode} className="space-y-6">
                  <PhoneInput
                    country={"ke"}
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone })}
                    inputProps={{
                      name: "phone",
                      required: true,
                      placeholder:
                        t("corporate_phone_number") || "Corporate Phone Number",
                    }}
                    containerStyle={{ width: "100%" }}
                    inputStyle={{
                      width: "100%",
                      paddingLeft: "60px",
                      paddingRight: "12px",
                      height: "50px",
                      borderRadius: "12px",
                      fontSize: "16px",
                      background: "rgba(255,255,255,0.05)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1EC51D] to-[#17a916] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-[#1aff1a] hover:to-[#1EC51D] cursor-pointer"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>{" "}
                    {t("send_verification_code")}
                  </button>
                </form>
                <div className="text-center mt-6">
                  <button
                    onClick={() => setActiveForm("login")}
                    className="text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>{" "}
                    {t("back_to_login")}
                  </button>
                </div>
              </div>
            )}

            {/* OTP FORM - UPDATED FOR 4-DIGIT VERIFICATION */}
            {activeForm === "otp" && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <i className="fas fa-shield-alt text-4xl text-[#1EC51D] mb-4"></i>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {t("security_verification")}
                  </h2>
                  <p className="text-white/70">
                    {t("enter_the_4_digit_code_sent_to_your_device")}
                  </p>
                </div>
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <input
                    type="text"
                    value={formData.otp}
                    onChange={handleOtpChange}
                    maxLength="4"
                    placeholder={t("enter_4_digit_otp") || "Enter 4-digit OTP"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#1EC51D] focus:bg-white/10 text-center text-2xl tracking-widest"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1EC51D] to-[#17a916] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-[#1aff1a] hover:to-[#1EC51D] cursor-pointer"
                  >
                    <i className="fas fa-check-circle mr-2"></i>{" "}
                    {t("verify_continue")}
                  </button>
                </form>
                <div className="text-center mt-6">
                  <button
                    onClick={() => setActiveForm("forgot")}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm cursor-pointer"
                  >
                    <i className="fas fa-arrow-left mr-1"></i>{" "}
                    {t("use_different_number")}
                  </button>
                </div>
              </div>
            )}

            {/* RESET PASSWORD */}
            {activeForm === "reset" && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <i className="fas fa-key text-4xl text-[#1EC51D] mb-4"></i>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {t("create_new_password")}
                  </h2>
                  <p className="text-white/70">
                    {t("set_a_strong_password_for_your_corporate_account")}
                  </p>
                </div>
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder={
                        t("new_corporate_password") || "New Corporate Password"
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[#1EC51D] focus:bg-white/10 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleNewPasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      <i
                        className={`fas ${
                          showNewPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder={
                        t("confirm_new_password") || "Confirm New Password"
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[#1EC51D] focus:bg-white/10 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      <i
                        className={`fas ${
                          showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1EC51D] to-[#17a916] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-[#1aff1a] hover:to-[#1EC51D] cursor-pointer"
                  >
                    <i className="fas fa-save mr-2"></i> {t("update_password")}
                  </button>
                </form>
                <div className="text-center mt-6">
                  <button
                    onClick={() => setActiveForm("login")}
                    className="text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>{" "}
                    {t("back_to_login")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
