// Authentication System for Nyaya-Uday
import { getText, getCurrentLanguage } from "./language.js";

class Auth {
  static init() {
    this.bindAuthEvents();
    this.checkAutoLogin();
  }

  static bindAuthEvents() {
    // Guest Login
    document.getElementById("guestLoginBtn").addEventListener("click", () => {
      this.guestLogin();
    });

    // Email Login
    document.getElementById("emailLoginBtn").addEventListener("click", () => {
      this.emailLogin();
    });

    // Register Button
    document.getElementById("registerBtn").addEventListener("click", () => {
      this.register();
    });

    // Show Register Form
    document.getElementById("showRegister").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("registerForm").style.display = "block";
    });

    // Show Login Form
    document.getElementById("showLogin").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("registerForm").style.display = "none";
      document.getElementById("loginForm").style.display = "block";
    });

    // Forgot Password
    document.getElementById("forgotPassword").addEventListener("click", (e) => {
      e.preventDefault();
      this.forgotPassword();
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      this.logout();
    });
  }

  static checkAutoLogin() {
    const savedUser = JSON.parse(localStorage.getItem("nyaya_user") || "null");
    if (savedUser && savedUser.email) {
      // Auto-login with saved credentials
      this.showApp(savedUser);
    }
  }

  static guestLogin() {
    const guestUser = {
      id: "guest_" + Math.random().toString(36).substr(2, 9),
      name: "Guest User",
      email: null,
      isGuest: true,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("nyaya_user", JSON.stringify(guestUser));
    this.showApp(guestUser);

    const lang = getCurrentLanguage();
    this.showToast(getText(lang, "guestWelcome"));
  }

  static async emailLogin() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const lang = getCurrentLanguage();

    if (!email || !password) {
      this.showToast(getText(lang, "enterCredentials"));
      return;
    }

    // Simple validation
    if (!this.validateEmail(email)) {
      this.showToast(getText(lang, "invalidEmail"));
      return;
    }

    // Check if user exists in localStorage
    const savedUser = JSON.parse(localStorage.getItem("nyaya_user") || "null");

    if (savedUser && savedUser.email === email) {
      // Simple password check (in real app, use proper hashing)
      if (savedUser.password === btoa(password)) {
        // Base64 encoding for demo
        this.showApp(savedUser);
        this.showToast(getText(lang, "loginSuccess"));
        return;
      }
    }

    // Try Firebase if available
    try {
      if (window.firebase && firebase.auth) {
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        const user = {
          id: userCredential.user.uid,
          name: userCredential.user.displayName || email.split("@")[0],
          email: userCredential.user.email,
          isGuest: false,
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem("nyaya_user", JSON.stringify(user));
        this.showApp(user);
        this.showToast(getText(lang, "loginSuccess"));
        return;
      }
    } catch (error) {
      console.log("Firebase login failed:", error);
    }

    // If no account exists, create one
    this.showToast(getText(lang, "noAccount"));
    document.getElementById("showRegister").click();
  }

  static async register() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const confirmPassword = document
      .getElementById("registerConfirmPassword")
      .value.trim();
    const terms = document.getElementById("termsCheckbox").checked;
    const lang = getCurrentLanguage();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      this.showToast(getText(lang, "fillAllFields"));
      return;
    }

    if (!terms) {
      this.showToast(getText(lang, "acceptTerms"));
      return;
    }

    if (!this.validateEmail(email)) {
      this.showToast(getText(lang, "invalidEmail"));
      return;
    }

    if (password.length < 6) {
      this.showToast(getText(lang, "passwordLength"));
      return;
    }

    if (password !== confirmPassword) {
      this.showToast(getText(lang, "passwordMismatch"));
      return;
    }

    // Check if user already exists
    const savedUser = JSON.parse(localStorage.getItem("nyaya_user") || "null");
    if (savedUser && savedUser.email === email) {
      this.showToast(getText(lang, "userExists"));
      return;
    }

    // Create user object
    const user = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      password: btoa(password), // Base64 encoding for demo (use proper hashing in production)
      isGuest: false,
      createdAt: new Date().toISOString(),
    };

    // Try Firebase registration if available
    try {
      if (window.firebase && firebase.auth) {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({ displayName: name });

        user.id = userCredential.user.uid;
      }
    } catch (error) {
      console.log("Firebase registration failed:", error);
      // Continue with localStorage anyway
    }

    // Save to localStorage
    localStorage.setItem("nyaya_user", JSON.stringify(user));

    // Show app
    this.showApp(user);
    this.showToast(getText(lang, "registrationSuccess"));
  }

  static forgotPassword() {
    const email = prompt("Enter your email address to reset password:");
    if (email && this.validateEmail(email)) {
      // In a real app, send password reset email
      const lang = getCurrentLanguage();
      alert(getText(lang, "resetEmailSent"));
    }
  }

  static logout() {
    const lang = getCurrentLanguage();
    if (confirm(getText(lang, "confirmLogout"))) {
      localStorage.removeItem("nyaya_user");
      window.location.reload();
    }
  }

  static showApp(user) {
    // Hide login screen
    document.getElementById("loginScreen").style.display = "none";

    // Show app container
    document.getElementById("appContainer").style.display = "block";

    // Update user info in app
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email || "";

    // Update welcome message
    const lang = getCurrentLanguage();
    this.showToast(`${getText(lang, "welcome")}, ${user.name}!`);
  }

  // Utility Methods
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static showToast(message, duration = 3000) {
    const toast =
      document.getElementById("toast") ||
      (() => {
        const toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
        return toast;
      })();

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  }
}

// Add language text for auth
const AuthText = {
  en: {
    guestWelcome: "Welcome Guest! Your progress will be saved locally.",
    enterCredentials: "Please enter email and password",
    invalidEmail: "Please enter a valid email address",
    loginSuccess: "Login successful!",
    noAccount: "No account found. Please register.",
    fillAllFields: "Please fill all fields",
    acceptTerms: "Please accept terms and conditions",
    passwordLength: "Password must be at least 6 characters",
    passwordMismatch: "Passwords do not match",
    userExists: "User already exists. Please login.",
    registrationSuccess: "Registration successful!",
    resetEmailSent: "Password reset email sent (simulated)",
    confirmLogout: "Are you sure you want to logout?",
  },
  hi: {
    guestWelcome: "अतिथि का स्वागत है! आपकी प्रगति स्थानीय रूप से सहेजी जाएगी।",
    enterCredentials: "कृपया ईमेल और पासवर्ड दर्ज करें",
    invalidEmail: "कृपया एक मान्य ईमेल पता दर्ज करें",
    loginSuccess: "लॉगिन सफल!",
    noAccount: "कोई खाता नहीं मिला। कृपया पंजीकरण करें।",
    fillAllFields: "कृपया सभी फ़ील्ड भरें",
    acceptTerms: "कृपया नियम और शर्तें स्वीकार करें",
    passwordLength: "पासवर्ड कम से कम 6 वर्णों का होना चाहिए",
    passwordMismatch: "पासवर्ड मेल नहीं खाते",
    userExists: "उपयोगकर्ता पहले से मौजूद है। कृपया लॉगिन करें।",
    registrationSuccess: "पंजीकरण सफल!",
    resetEmailSent: "पासवर्ड रीसेट ईमेल भेजा गया (सिम्युलेटेड)",
    confirmLogout: "क्या आप लॉगआउट करना चाहते हैं?",
  },
  mr: {
    guestWelcome:
      "पाहुण्यांचे स्वागत आहे! तुमची प्रगती स्थानिकरित्या जतन केली जाईल.",
    enterCredentials: "कृपया ईमेल आणि पासवर्ड प्रविष्ट करा",
    invalidEmail: "कृपया वैध ईमेल पत्ता प्रविष्ट करा",
    loginSuccess: "लॉगिन यशस्वी!",
    noAccount: "कोणतेही खाते सापडले नाही. कृपया नोंदणी करा.",
    fillAllFields: "कृपया सर्व फील्ड भरा",
    acceptTerms: "कृपया नियम आणि अटी स्वीकारा",
    passwordLength: "पासवर्ड किमान ६ वर्णांचा असणे आवश्यक आहे",
    passwordMismatch: "पासवर्ड जुळत नाहीत",
    userExists: "वापरकर्ता आधीपासून अस्तित्वात आहे. कृपया लॉगिन करा.",
    registrationSuccess: "नोंदणी यशस्वी!",
    resetEmailSent: "पासवर्ड रीसेट ईमेल पाठवला (सिम्युलेटेड)",
    confirmLogout: "तुम्हाला लॉगआउट करायचे आहे का?",
  },
};

// Merge auth text with language data
document.addEventListener("DOMContentLoaded", () => {
  // Initialize auth when DOM is loaded
  Auth.init();
});

export { Auth };
