// Nyaya-Uday - Judicial Career Discovery App
// Main Application Script with Multilingual Support

// Import language functions
import {
  getText,
  getCurrentLanguage,
  setLanguage,
  getAvailableLanguages,
} from "./language.js";

// ============================================
// Firebase Configuration (Free Tier)
// ============================================
const firebaseConfig = {
  apiKey: "AIzaSyCgwRsvpAUg8dXZZfywf0Dd_YpI0II-Gfk",
  authDomain: "nyaya-uday.firebaseapp.com",
  projectId: "nyaya-uday",
  storageBucket: "nyaya-uday.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
};

// Initialize Firebase
let db;
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  console.log("Firebase initialized");
} catch (error) {
  console.log("Firebase initialization failed, using localStorage only");
  db = null;
}

// ============================================
// App State
// ============================================
const AppState = {
  currentUser: {
    id: null,
    name: "Aspiring Judge",
    state: "",
    education: "",
    score: 0,
    casesSolved: 0,
    badges: [],
    createdAt: new Date().toISOString(),
  },
  currentCase: null,
  currentLanguage: "en",
};

// ============================================
// Case Scenarios Database (Multilingual)
// ============================================
const CaseDatabase = {
  en: [
    {
      id: 1,
      title: "The Rent Dispute",
      facts:
        "Landlord Mr. Sharma claims tenant Mr. Verma hasn't paid rent for 3 months. Tenant says the roof was leaking throughout monsoon and repair requests were ignored.",
      evidence: [
        "WhatsApp messages showing repair requests",
        "Photos of water leakage damage",
        "No written rent agreement",
        "One neighbor as witness",
      ],
      options: [
        {
          text: "Order tenant to pay 2 months' rent (deducting 1 month for repairs)",
          score: 40,
          feedback:
            "Excellent! You balanced both parties' interests and considered the evidence properly.",
        },
        {
          text: "Dismiss case due to lack of written agreement",
          score: 20,
          feedback:
            "While procedurally correct, this ignores the practical realities of the situation.",
        },
        {
          text: "Side with landlord because he seems trustworthy",
          score: 10,
          feedback:
            "Judges must avoid emotional biases and decide based on evidence, not appearances.",
        },
        {
          text: "Order mediation between parties before deciding",
          score: 30,
          feedback:
            "Good approach for dispute resolution, but sometimes immediate decisions are needed.",
        },
      ],
    },
    {
      id: 2,
      title: "The Stolen Bicycle",
      facts:
        "Rohan claims Sohan took his bicycle without permission. Sohan says Rohan promised to lend it for a week. No witnesses. Value: ₹5,000.",
      evidence: [
        "Both are college friends",
        "No written lending agreement",
        "Bicycle was returned after 10 days",
        "Minor scratches on bicycle",
      ],
      options: [
        {
          text: "Return bicycle to Rohan, no compensation needed",
          score: 35,
          feedback:
            "Reasonable decision based on friendship and minor nature of dispute.",
        },
        {
          text: "Order Sohan to pay ₹500 for scratches and delay",
          score: 45,
          feedback:
            "Excellent! You considered both the property damage and the breach of trust.",
        },
        {
          text: "Jail Sohan for 1 day as punishment",
          score: 5,
          feedback:
            "Disproportionate punishment for a civil dispute between friends.",
        },
        {
          text: "Dismiss case as trivial",
          score: 15,
          feedback:
            "All disputes deserve judicial attention, regardless of value.",
        },
      ],
    },
    {
      id: 3,
      title: "The Business Partnership",
      facts:
        "Two friends started a small shop. Partner A invested ₹50,000, Partner B managed daily operations. After 6 months, they disagree on profit sharing.",
      evidence: [
        "Bank transfer of ₹50,000",
        "No written partnership agreement",
        "Mixed accounts for personal and business",
        "Sales records maintained by Partner B",
      ],
      options: [
        {
          text: "Split profits 50-50 as equal partners",
          score: 25,
          feedback:
            "Fair in spirit, but doesn't account for different contributions.",
        },
        {
          text: "Give 60% to investor, 40% to manager",
          score: 40,
          feedback:
            "Good balance considering both capital and labor contributions.",
        },
        {
          text: "Dissolve partnership and return only initial investment",
          score: 20,
          feedback:
            "Too harsh, doesn't reward the labor put into the business.",
        },
        {
          text: "Appoint an accountant to audit and then decide",
          score: 35,
          feedback: "Prudent approach when financial records are unclear.",
        },
      ],
    },
  ],
  hi: [
    {
      id: 1,
      title: "किराया विवाद",
      facts:
        "मकान मालिक श्री शर्मा का दावा है कि किरायेदार श्री वर्मा ने 3 महीने का किराया नहीं दिया है। किरायेदार का कहना है कि मानसून के दौरान छत लीक हो रही थी और मरम्मत के अनुरोधों को नजरअंदाज किया गया।",
      evidence: [
        "मरम्मत के अनुरोध दिखाने वाले व्हाट्सएप संदेश",
        "पानी के रिसाव की क्षति के फोटो",
        "कोई लिखित किराया समझौता नहीं",
        "एक पड़ोसी गवाह के रूप में",
      ],
      options: [
        {
          text: "किरायेदार को 2 महीने का किराया देने का आदेश दें (1 महीना मरम्मत के लिए काटकर)",
          score: 40,
          feedback:
            "उत्कृष्ट! आपने दोनों पक्षों के हितों को संतुलित किया और साक्ष्य पर ठीक से विचार किया।",
        },
        {
          text: "लिखित समझौते की कमी के कारण मामला खारिज करें",
          score: 20,
          feedback:
            "यद्यपि प्रक्रियात्मक रूप से सही है, यह स्थिति की व्यावहारिक वास्तविकताओं को नजरअंदाज करता है।",
        },
        {
          text: "मकान मालिक का पक्ष लें क्योंकि वह विश्वसनीय लगता है",
          score: 10,
          feedback:
            "न्यायाधीशों को भावनात्मक पूर्वाग्रहों से बचना चाहिए और दिखावे के आधार पर नहीं, बल्कि साक्ष्य के आधार पर निर्णय लेना चाहिए।",
        },
        {
          text: "निर्णय लेने से पहले पक्षों के बीच मध्यस्थता का आदेश दें",
          score: 30,
          feedback:
            "विवाद समाधान के लिए अच्छा दृष्टिकोण है, लेकिन कभी-कभी तत्काल निर्णय की आवश्यकता होती है।",
        },
      ],
    },
  ],
  mr: [
    {
      id: 1,
      title: "भाडेाचा वाद",
      facts:
        "हॉउस मालक श्री शर्मा यांचा दावा आहे की भाडेकरू श्री वर्मा यांनी 3 महिन्यांचे भाडे दिले नाही. भाडेकरू म्हणतात की पावसाळ्यात छत गळत होती आणि दुरुस्तीच्या विनंत्यांकडे दुर्लक्ष केले गेले.",
      evidence: [
        "दुरुस्तीच्या विनंत्यांचे व्हाट्सएप संदेश",
        "पाण्याच्या गळतीच्या नुकसानीची फोटो",
        "लिखित भाडे करार नाही",
        "एक शेजारी साक्षीदार म्हणून",
      ],
      options: [
        {
          text: "भाडेकरूला 2 महिन्यांचे भाडे देण्याचा आदेश द्या (1 महिना दुरुस्तीसाठी वजा करून)",
          score: 40,
          feedback:
            "उत्तम! तुम्ही दोन्ही पक्षांचे हित संतुलित केले आणि पुराव्याचा योग्य विचार केला.",
        },
        {
          text: "लिखित कराराच्या अभावी खटला डिसमिस करा",
          score: 20,
          feedback:
            "प्रक्रियात्मकदृष्ट्या बरोबर असले तरी, यामुळे परिस्थितीच्या व्यावहारिक वास्तविकतेकडे दुर्लक्ष केले जाते.",
        },
        {
          text: "मालकाचा पक्ष घ्या कारण ते विश्वसनीय वाटतात",
          score: 10,
          feedback:
            "न्यायाधीशांनी भावनिक पूर्वग्रहांपासून दूर राहावे आणि देखाव्यावर नव्हे तर पुराव्यावर आधारित निर्णय घ्यावेत.",
        },
        {
          text: "निर्णय घेण्यापूर्वी पक्षांमध्ये मध्यस्थीचा आदेश द्या",
          score: 30,
          feedback:
            "वादमुक्तीचा चांगला दृष्टीकोन आहे, पण कधीकधी त्वरित निर्णयांची गरज असते.",
        },
      ],
    },
  ],
};

// ============================================
// Roadmap Database (Multilingual)
// ============================================
const RoadmapDatabase = {
  up: {
    10: {
      en: [
        {
          step: "Complete Class 12",
          icon: "📚",
          details: "Focus on scoring well",
        },
        {
          step: "Prepare for CLAT/AILET",
          icon: "📝",
          details: "National law entrance exams",
        },
        {
          step: "Enroll in 5-year LLB",
          icon: "⚖️",
          details: "Integrated law program",
        },
        {
          step: "Register with Bar Council",
          icon: "📋",
          details: "During final year of LLB",
        },
        {
          step: "Prepare for UP PCS-J",
          icon: "🎯",
          details: "Uttar Pradesh Judicial Services",
        },
        {
          step: "Age: 22-35 years",
          icon: "🎂",
          details: "Relaxation for reserved categories",
        },
        {
          step: "Judicial Training",
          icon: "🏫",
          details: "1 year at Judicial Academy",
        },
      ],
      hi: [
        {
          step: "कक्षा 12 पूरी करें",
          icon: "📚",
          details: "अच्छे अंक लाने पर ध्यान दें",
        },
        {
          step: "CLAT/AILET की तैयारी करें",
          icon: "📝",
          details: "राष्ट्रीय कानून प्रवेश परीक्षाएं",
        },
        {
          step: "5-वर्षीय LLB में दाखिला लें",
          icon: "⚖️",
          details: "एकीकृत कानून कार्यक्रम",
        },
        {
          step: "बार काउंसिल में पंजीकरण करें",
          icon: "📋",
          details: "LLB के अंतिम वर्ष के दौरान",
        },
        {
          step: "UP PCS-J की तैयारी करें",
          icon: "🎯",
          details: "उत्तर प्रदेश न्यायिक सेवाएं",
        },
        {
          step: "आयु: 22-35 वर्ष",
          icon: "🎂",
          details: "आरक्षित श्रेणियों के लिए छूट",
        },
        {
          step: "न्यायिक प्रशिक्षण",
          icon: "🏫",
          details: "न्यायिक अकादमी में 1 वर्ष",
        },
      ],
      mr: [
        {
          step: "इयत्ता 12 पूर्ण करा",
          icon: "📚",
          details: "चांगले गुण मिळवण्यावर लक्ष केंद्रित करा",
        },
        {
          step: "CLAT/AILET साठी तयारी करा",
          icon: "📝",
          details: "राष्ट्रीय कायदा प्रवेश परीक्षा",
        },
        {
          step: "5-वर्षाच्या LLB मध्ये प्रवेश घ्या",
          icon: "⚖️",
          details: "एकीकृत कायदा कार्यक्रम",
        },
        {
          step: "बार कौन्सिलमध्ये नोंदणी करा",
          icon: "📋",
          details: "LLB च्या शेवटच्या वर्षात",
        },
        {
          step: "UP PCS-J साठी तयारी करा",
          icon: "🎯",
          details: "उत्तर प्रदेश न्यायिक सेवा",
        },
        {
          step: "वय: 22-35 वर्षे",
          icon: "🎂",
          details: "आरक्षित श्रेण्यांसाठी सवलत",
        },
        {
          step: "न्यायिक प्रशिक्षण",
          icon: "🏫",
          details: "न्यायिक अकादमीत 1 वर्ष",
        },
      ],
    },
    12: {
      en: [
        {
          step: "Apply for 5-year LLB",
          icon: "📝",
          details: "Through CLAT or state CET",
        },
        {
          step: "Complete BA/BBA/BCom LLB",
          icon: "⚖️",
          details: "5-year integrated course",
        },
        {
          step: "Bar Council Registration",
          icon: "📋",
          details: "Mandatory for practice",
        },
        {
          step: "UP PCS-J Examination",
          icon: "🎯",
          details: "Prelims, Mains, Interview",
        },
        {
          step: "Optional: Practice Law",
          icon: "💼",
          details: "Gain court experience",
        },
        {
          step: "Judicial Appointment",
          icon: "👨‍⚖️",
          details: "Civil Judge (Junior Division)",
        },
      ],
      hi: [
        {
          step: "5-वर्षीय LLB के लिए आवेदन करें",
          icon: "📝",
          details: "CLAT या राज्य CET के माध्यम से",
        },
        {
          step: "BA/BBA/BCom LLB पूरी करें",
          icon: "⚖️",
          details: "5-वर्षीय एकीकृत पाठ्यक्रम",
        },
        {
          step: "बार काउंसिल पंजीकरण",
          icon: "📋",
          details: "अभ्यास के लिए अनिवार्य",
        },
        {
          step: "UP PCS-J परीक्षा",
          icon: "🎯",
          details: "प्रारंभिक, मुख्य, साक्षात्कार",
        },
        {
          step: "वैकल्पिक: कानून का अभ्यास",
          icon: "💼",
          details: "अदालत का अनुभव प्राप्त करें",
        },
        {
          step: "न्यायिक नियुक्ति",
          icon: "👨‍⚖️",
          details: "सिविल जज (जूनियर डिवीजन)",
        },
      ],
      mr: [
        {
          step: "5-वर्षाच्या LLB साठी अर्ज करा",
          icon: "📝",
          details: "CLAT किंवा राज्य CET मार्गे",
        },
        {
          step: "BA/BBA/BCom LLB पूर्ण करा",
          icon: "⚖️",
          details: "5-वर्षाचा एकात्मिक अभ्यासक्रम",
        },
        {
          step: "बार कौन्सिल नोंदणी",
          icon: "📋",
          details: "सरावासाठी अनिवार्य",
        },
        {
          step: "UP PCS-J परीक्षा",
          icon: "🎯",
          details: "प्राथमिक, मुख्य, मुलाखत",
        },
        {
          step: "पर्यायी: कायद्याचा सराव",
          icon: "💼",
          details: "कोर्ट अनुभव मिळवा",
        },
        {
          step: "न्यायिक नियुक्ती",
          icon: "👨‍⚖️",
          details: "सिव्हिल जज (ज्युनियर डिव्हिजन)",
        },
      ],
    },
    grad: {
      en: [
        {
          step: "Enroll in 3-year LLB",
          icon: "⚖️",
          details: "After graduation",
        },
        { step: "Complete LLB degree", icon: "🎓", details: "3-year program" },
        {
          step: "Bar Council Registration",
          icon: "📋",
          details: "After LLB completion",
        },
        {
          step: "Prepare for UP PCS-J",
          icon: "📚",
          details: "State judicial exam",
        },
        { step: "Appear for Exam", icon: "🎯", details: "When eligible" },
        { step: "Judicial Training", icon: "🏫", details: "After selection" },
      ],
      hi: [
        {
          step: "3-वर्षीय LLB में दाखिला लें",
          icon: "⚖️",
          details: "स्नातक के बाद",
        },
        {
          step: "LLB डिग्री पूरी करें",
          icon: "🎓",
          details: "3-वर्षीय कार्यक्रम",
        },
        {
          step: "बार काउंसिल पंजीकरण",
          icon: "📋",
          details: "LLB पूरा होने के बाद",
        },
        {
          step: "UP PCS-J की तैयारी करें",
          icon: "📚",
          details: "राज्य न्यायिक परीक्षा",
        },
        {
          step: "परीक्षा में उपस्थित हों",
          icon: "🎯",
          details: "योग्य होने पर",
        },
        { step: "न्यायिक प्रशिक्षण", icon: "🏫", details: "चयन के बाद" },
      ],
      mr: [
        {
          step: "3-वर्षाच्या LLB मध्ये प्रवेश घ्या",
          icon: "⚖️",
          details: "पदवीनंतर",
        },
        {
          step: "LLB पदवी पूर्ण करा",
          icon: "🎓",
          details: "3-वर्षाचा कार्यक्रम",
        },
        {
          step: "बार कौन्सिल नोंदणी",
          icon: "📋",
          details: "LLB पूर्ण झाल्यानंतर",
        },
        {
          step: "UP PCS-J साठी तयारी करा",
          icon: "📚",
          details: "राज्य न्यायिक परीक्षा",
        },
        {
          step: "परीक्षेसाठी उपस्थित राहा",
          icon: "🎯",
          details: "पात्र झाल्यावर",
        },
        { step: "न्यायिक प्रशिक्षण", icon: "🏫", details: "निवडीनंतर" },
      ],
    },
  },
};

// ============================================
// Badges System (Multilingual)
// ============================================
const Badges = {
  en: {
    first_case: {
      id: "first_case",
      name: "First Judgment",
      icon: "⚖️",
      threshold: 1,
    },
    logical_thinker: {
      id: "logical_thinker",
      name: "Logical Thinker",
      icon: "🧠",
      threshold: 50,
    },
    fair_minded: {
      id: "fair_minded",
      name: "Fair Minded",
      icon: "⭐",
      threshold: 75,
    },
    consistent: {
      id: "consistent",
      name: "Consistent",
      icon: "📊",
      threshold: 5,
    },
    rapid_decider: {
      id: "rapid_decider",
      name: "Rapid Decider",
      icon: "⚡",
      threshold: 10,
    },
  },
  hi: {
    first_case: {
      id: "first_case",
      name: "पहला निर्णय",
      icon: "⚖️",
      threshold: 1,
    },
    logical_thinker: {
      id: "logical_thinker",
      name: "तार्किक विचारक",
      icon: "🧠",
      threshold: 50,
    },
    fair_minded: {
      id: "fair_minded",
      name: "निष्पक्ष मन",
      icon: "⭐",
      threshold: 75,
    },
    consistent: { id: "consistent", name: "निरंतर", icon: "📊", threshold: 5 },
    rapid_decider: {
      id: "rapid_decider",
      name: "त्वरित निर्णायक",
      icon: "⚡",
      threshold: 10,
    },
  },
  mr: {
    first_case: {
      id: "first_case",
      name: "पहिला निर्णय",
      icon: "⚖️",
      threshold: 1,
    },
    logical_thinker: {
      id: "logical_thinker",
      name: "तार्किक विचारवंत",
      icon: "🧠",
      threshold: 50,
    },
    fair_minded: {
      id: "fair_minded",
      name: "निष्पक्ष मन",
      icon: "⭐",
      threshold: 75,
    },
    consistent: {
      id: "consistent",
      name: "सातत्यशील",
      icon: "📊",
      threshold: 5,
    },
    rapid_decider: {
      id: "rapid_decider",
      name: "त्वरित निर्णायक",
      icon: "⚡",
      threshold: 10,
    },
  },
};

// ============================================
// DOM Elements
// ============================================
const DOM = {
  sections: {
    home: document.getElementById("home"),
    roadmap: document.getElementById("roadmap"),
    simulation: document.getElementById("simulation"),
    leaderboard: document.getElementById("leaderboard"),
    profile: document.getElementById("profile"),
  },
  buttons: {
    generate: document.getElementById("generateBtn"),
    startSim: document.getElementById("startSimulationBtn"),
    backHome: document.getElementById("backToHome"),
    refreshLB: document.getElementById("refreshLeaderboard"),
    reset: document.getElementById("resetProgress"),
    save: document.getElementById("saveProfile"),
  },
  inputs: {
    state: document.getElementById("stateSelect"),
    education: document.getElementById("educationSelect"),
    stateFilter: document.getElementById("stateFilter"),
    language: document.getElementById("languageSelect"),
  },
  displays: {
    currentScore: document.getElementById("currentScore"),
    totalScore: document.getElementById("totalScoreDisplay"),
    casesSolved: document.getElementById("casesSolved"),
    badgeCount: document.getElementById("badgeCount"),
    userName: document.getElementById("userName"),
    userLocation: document.getElementById("userLocation"),
    progressFill: document.getElementById("progressFill"),
    progressText: document.getElementById("progressText"),
    roadmapContent: document.getElementById("roadmapContent"),
    simulationContent: document.getElementById("simulationContent"),
    caseContainer: document.getElementById("caseContainer"),
    badgesContainer: document.getElementById("badgesContainer"),
    leaderboardContent: document.getElementById("leaderboardContent"),
    appName: document.getElementById("appName"),
    tagline: document.getElementById("tagline"),
    heroTitle: document.getElementById("heroTitle"),
    heroSubtitle: document.getElementById("heroSubtitle"),
    startJourney: document.getElementById("startJourney"),
    roadmapDescription: document.getElementById("roadmapDescription"),
    selectState: document.getElementById("selectState"),
    selectEducation: document.getElementById("selectEducation"),
    chooseState: document.getElementById("chooseState"),
    chooseEducation: document.getElementById("chooseEducation"),
    generateRoadmap: document.getElementById("generateRoadmap"),
    dataNote: document.getElementById("dataNote"),
    feature1Title: document.getElementById("feature1Title"),
    feature1Desc: document.getElementById("feature1Desc"),
    feature2Title: document.getElementById("feature2Title"),
    feature2Desc: document.getElementById("feature2Desc"),
    feature3Title: document.getElementById("feature3Title"),
    feature3Desc: document.getElementById("feature3Desc"),
    statsStates: document.getElementById("statsStates"),
    statsFree: document.getElementById("statsFree"),
    stats2G: document.getElementById("stats2G"),
    roadmapTitle: document.getElementById("roadmapTitle"),
    backButton: document.getElementById("backButton"),
    noRoadmapTitle: document.getElementById("noRoadmapTitle"),
    noRoadmapDesc: document.getElementById("noRoadmapDesc"),
    simulationTitle: document.getElementById("simulationTitle"),
    simulationSubtitle: document.getElementById("simulationSubtitle"),
    simulationDesc: document.getElementById("simulationDesc"),
    fairnessLogic: document.getElementById("fairnessLogic"),
    noLegalKnowledge: document.getElementById("noLegalKnowledge"),
    startCase: document.getElementById("startCase"),
    yourBadges: document.getElementById("yourBadges"),
    leaderboardTitle: document.getElementById("leaderboardTitle"),
    refreshText: document.getElementById("refreshText"),
    allStates: document.getElementById("allStates"),
    loadingLeaderboard: document.getElementById("loadingLeaderboard"),
    leaderboardNote: document.getElementById("leaderboardNote"),
    profileTitle: document.getElementById("profileTitle"),
    totalScoreLabel: document.getElementById("totalScoreLabel"),
    casesSolvedLabel: document.getElementById("casesSolvedLabel"),
    badgesLabel: document.getElementById("badgesLabel"),
    resetProgressText: document.getElementById("resetProgressText"),
    saveProgressText: document.getElementById("saveProgressText"),
    journeyProgress: document.getElementById("journeyProgress"),
    appSettings: document.getElementById("appSettings"),
    dataSavingLabel: document.getElementById("dataSavingLabel"),
    offlineModeLabel: document.getElementById("offlineModeLabel"),
    storageNote: document.getElementById("storageNote"),
    copyright: document.getElementById("copyright"),
    taglineFooter: document.getElementById("taglineFooter"),
    builtForIndia: document.getElementById("builtForIndia"),
  },
  navTexts: {
    home: document.querySelector('[data-section="home"] .nav-text'),
    roadmap: document.querySelector('[data-section="roadmap"] .nav-text'),
    simulation: document.querySelector('[data-section="simulation"] .nav-text'),
    leaderboard: document.querySelector(
      '[data-section="leaderboard"] .nav-text',
    ),
    profile: document.querySelector('[data-section="profile"] .nav-text'),
  },
};

// ============================================
// Language Controller
// ============================================
class LanguageController {
  static init() {
    // Set initial language
    AppState.currentLanguage = getCurrentLanguage();
    document.documentElement.lang = AppState.currentLanguage;

    // Set language dropdown
    if (DOM.inputs.language) {
      DOM.inputs.language.value = AppState.currentLanguage;
      DOM.inputs.language.addEventListener("change", (e) => {
        this.changeLanguage(e.target.value);
      });
    }

    // Update all text
    this.updateAllText();
  }

  static changeLanguage(lang) {
    AppState.currentLanguage = setLanguage(lang);
    this.updateAllText();
    Utils.showToast(getText(lang, "welcome"), 2000);
  }

  static updateAllText() {
    const lang = AppState.currentLanguage;

    // Update all text elements
    if (DOM.displays.appName)
      DOM.displays.appName.textContent = getText(lang, "appName");
    if (DOM.displays.tagline)
      DOM.displays.tagline.textContent = getText(lang, "tagline");
    if (DOM.displays.heroTitle)
      DOM.displays.heroTitle.textContent = getText(lang, "heroTitle");
    if (DOM.displays.heroSubtitle)
      DOM.displays.heroSubtitle.textContent = getText(lang, "heroSubtitle");
    if (DOM.displays.startJourney)
      DOM.displays.startJourney.textContent = getText(lang, "startJourney");
    if (DOM.displays.roadmapDescription)
      DOM.displays.roadmapDescription.textContent = getText(
        lang,
        "roadmapDescription",
      );
    if (DOM.displays.selectState)
      DOM.displays.selectState.textContent = getText(lang, "selectState");
    if (DOM.displays.selectEducation)
      DOM.displays.selectEducation.textContent = getText(
        lang,
        "selectEducation",
      );
    if (DOM.displays.chooseState)
      DOM.displays.chooseState.textContent = getText(lang, "chooseState");
    if (DOM.displays.chooseEducation)
      DOM.displays.chooseEducation.textContent = getText(
        lang,
        "chooseEducation",
      );
    if (DOM.displays.generateRoadmap)
      DOM.displays.generateRoadmap.textContent = getText(
        lang,
        "generateRoadmap",
      );
    if (DOM.displays.dataNote)
      DOM.displays.dataNote.textContent = getText(lang, "dataNote");
    if (DOM.displays.feature1Title)
      DOM.displays.feature1Title.textContent = getText(lang, "feature1Title");
    if (DOM.displays.feature1Desc)
      DOM.displays.feature1Desc.textContent = getText(lang, "feature1Desc");
    if (DOM.displays.feature2Title)
      DOM.displays.feature2Title.textContent = getText(lang, "feature2Title");
    if (DOM.displays.feature2Desc)
      DOM.displays.feature2Desc.textContent = getText(lang, "feature2Desc");
    if (DOM.displays.feature3Title)
      DOM.displays.feature3Title.textContent = getText(lang, "feature3Title");
    if (DOM.displays.feature3Desc)
      DOM.displays.feature3Desc.textContent = getText(lang, "feature3Desc");
    if (DOM.displays.statsStates)
      DOM.displays.statsStates.textContent = getText(lang, "statsStates");
    if (DOM.displays.statsFree)
      DOM.displays.statsFree.textContent = getText(lang, "statsFree");
    if (DOM.displays.stats2G)
      DOM.displays.stats2G.textContent = getText(lang, "stats2G");
    if (DOM.displays.roadmapTitle)
      DOM.displays.roadmapTitle.textContent = getText(lang, "roadmapTitle");
    if (DOM.displays.backButton)
      DOM.displays.backButton.textContent = getText(lang, "backButton");
    if (DOM.displays.noRoadmapTitle)
      DOM.displays.noRoadmapTitle.textContent = getText(lang, "noData");
    if (DOM.displays.noRoadmapDesc)
      DOM.displays.noRoadmapDesc.textContent = getText(lang, "noDataDesc");
    if (DOM.displays.simulationTitle)
      DOM.displays.simulationTitle.textContent = getText(
        lang,
        "simulationTitle",
      );
    if (DOM.displays.simulationSubtitle)
      DOM.displays.simulationSubtitle.textContent = getText(
        lang,
        "simulationSubtitle",
      );
    if (DOM.displays.simulationDesc)
      DOM.displays.simulationDesc.textContent = getText(lang, "simulationDesc");
    if (DOM.displays.fairnessLogic)
      DOM.displays.fairnessLogic.textContent = getText(lang, "fairnessLogic");
    if (DOM.displays.noLegalKnowledge)
      DOM.displays.noLegalKnowledge.textContent = getText(
        lang,
        "noLegalKnowledge",
      );
    if (DOM.displays.startCase)
      DOM.displays.startCase.textContent = getText(lang, "startCase");
    if (DOM.displays.yourBadges)
      DOM.displays.yourBadges.textContent = getText(lang, "badgesLabel");
    if (DOM.displays.leaderboardTitle)
      DOM.displays.leaderboardTitle.textContent = getText(
        lang,
        "leaderboardTitle",
      );
    if (DOM.displays.refreshText)
      DOM.displays.refreshText.textContent = getText(lang, "refresh");
    if (DOM.displays.allStates)
      DOM.displays.allStates.textContent = getText(lang, "allStates");
    if (DOM.displays.loadingLeaderboard)
      DOM.displays.loadingLeaderboard.textContent = getText(lang, "noData");
    if (DOM.displays.leaderboardNote)
      DOM.displays.leaderboardNote.textContent = getText(
        lang,
        "leaderboardNote",
      );
    if (DOM.displays.profileTitle)
      DOM.displays.profileTitle.textContent = getText(lang, "profileTitle");
    if (DOM.displays.totalScoreLabel)
      DOM.displays.totalScoreLabel.textContent = getText(
        lang,
        "totalScoreLabel",
      );
    if (DOM.displays.casesSolvedLabel)
      DOM.displays.casesSolvedLabel.textContent = getText(
        lang,
        "casesSolvedLabel",
      );
    if (DOM.displays.badgesLabel)
      DOM.displays.badgesLabel.textContent = getText(lang, "badgesLabel");
    if (DOM.displays.resetProgressText)
      DOM.displays.resetProgressText.textContent = getText(
        lang,
        "resetProgress",
      );
    if (DOM.displays.saveProgressText)
      DOM.displays.saveProgressText.textContent = getText(lang, "saveProgress");
    if (DOM.displays.journeyProgress)
      DOM.displays.journeyProgress.textContent = getText(
        lang,
        "journeyProgress",
      );
    if (DOM.displays.appSettings)
      DOM.displays.appSettings.textContent = getText(lang, "appSettings");
    if (DOM.displays.dataSavingLabel)
      DOM.displays.dataSavingLabel.textContent = getText(lang, "dataSaving");
    if (DOM.displays.offlineModeLabel)
      DOM.displays.offlineModeLabel.textContent = getText(lang, "offlineMode");
    if (DOM.displays.storageNote)
      DOM.displays.storageNote.textContent = getText(lang, "storageNote");
    if (DOM.displays.copyright)
      DOM.displays.copyright.textContent = getText(lang, "copyright");
    if (DOM.displays.taglineFooter)
      DOM.displays.taglineFooter.textContent = getText(lang, "tagline");
    if (DOM.displays.builtForIndia)
      DOM.displays.builtForIndia.textContent = getText(lang, "builtForIndia");

    // Update navigation text
    if (DOM.navTexts.home)
      DOM.navTexts.home.textContent = getText(lang, "navHome");
    if (DOM.navTexts.roadmap)
      DOM.navTexts.roadmap.textContent = getText(lang, "navRoadmap");
    if (DOM.navTexts.simulation)
      DOM.navTexts.simulation.textContent = getText(lang, "navSimulation");
    if (DOM.navTexts.leaderboard)
      DOM.navTexts.leaderboard.textContent = getText(lang, "navLeaderboard");
    if (DOM.navTexts.profile)
      DOM.navTexts.profile.textContent = getText(lang, "navProfile");

    // Update points text
    const pointsElements = document.querySelectorAll(
      ".points-text, .score-label",
    );
    pointsElements.forEach((el) => {
      el.textContent = getText(lang, "points");
    });
  }

  static getCurrentLang() {
    return AppState.currentLanguage;
  }
}

// ============================================
// Utility Functions
// ============================================
class Utils {
  static showToast(message, duration = 3000) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  }

  static showLoading(container, message = "Loading...") {
    if (container) {
      container.innerHTML = `<div class="loading">${message}</div>`;
    }
  }

  static saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(`nyaya_${key}`, JSON.stringify(data));
    } catch (e) {
      console.error("LocalStorage error:", e);
    }
  }

  static loadFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(`nyaya_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("LocalStorage error:", e);
      return null;
    }
  }

  static generateUserId() {
    return "user_" + Math.random().toString(36).substr(2, 9);
  }

  static calculateProgress(user) {
    const maxScore = 300;
    const progress = Math.min(100, Math.floor((user.score / maxScore) * 100));
    return progress;
  }

  // NEW METHOD: Update score in header
  static updateScoreInHeader() {
    const scoreElement = document.getElementById("userScore");
    if (scoreElement) {
      scoreElement.textContent = AppState.currentUser.score;
    }
  }
}

// ============================================
// Navigation Controller
// ============================================
class Navigation {
  static init() {
    // Set up navigation buttons
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sectionId = btn.getAttribute("data-section");
        this.switchSection(sectionId);
      });
    });

    // Back button
    if (DOM.buttons.backHome) {
      DOM.buttons.backHome.addEventListener("click", () => {
        this.switchSection("home");
      });
    }
  }

  static switchSection(sectionId) {
    // Update active nav button
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-section") === sectionId) {
        btn.classList.add("active");
      }
    });

    // Show selected section
    Object.values(DOM.sections).forEach((section) => {
      if (section) {
        section.style.display = "none";
      }
    });

    if (DOM.sections[sectionId]) {
      DOM.sections[sectionId].style.display = "block";
    }

    // Load section-specific data
    switch (sectionId) {
      case "leaderboard":
        Leaderboard.load();
        break;
      case "profile":
        Profile.update();
        break;
    }
  }
}

// ============================================
// Roadmap Generator (Multilingual)
// ============================================
class Roadmap {
  static generate() {
    const state = DOM.inputs.state.value;
    const education = DOM.inputs.education.value;
    const lang = LanguageController.getCurrentLang();

    if (!state || !education) {
      Utils.showToast(getText(lang, "selectBoth"));
      return;
    }

    // Save user state
    AppState.currentUser.state = state;
    AppState.currentUser.education = education;
    Utils.saveToLocalStorage("user", AppState.currentUser);

    // Generate roadmap
    const roadmapData = Roadmap.getRoadmapData(state, education, lang);

    // Display roadmap
    const roadmapHTML = this.createRoadmapHTML(roadmapData, state, lang);
    DOM.displays.roadmapContent.innerHTML = roadmapHTML;

    // Switch to roadmap section
    Navigation.switchSection("roadmap");

    Utils.showToast(getText(lang, "roadmapGenerated"));
  }

  static getRoadmapData(state, education, lang) {
    // Check for specific state roadmap
    if (RoadmapDatabase[state] && RoadmapDatabase[state][education]) {
      return (
        RoadmapDatabase[state][education][lang] ||
        RoadmapDatabase[state][education]["en"]
      );
    }

    // Return generic roadmap
    return this.getGenericRoadmap(education, lang);
  }

  static getGenericRoadmap(education, lang) {
    const baseSteps = {
      en: [
        {
          step: "Complete required education",
          icon: "📚",
          details: "Current focus",
        },
        {
          step: "Pursue LLB degree",
          icon: "⚖️",
          details:
            education === "grad" ? "3-year LLB" : "5-year integrated LLB",
        },
        {
          step: "Register with Bar Council",
          icon: "📋",
          details: "Mandatory for legal practice",
        },
        {
          step: "Prepare for State Judicial Exam",
          icon: "🎯",
          details: "State-specific syllabus",
        },
        {
          step: "Appear for examination",
          icon: "📝",
          details: "Prelims, Mains, Interview",
        },
        {
          step: "Judicial Training",
          icon: "🏫",
          details: "1 year at state Judicial Academy",
        },
        {
          step: "Begin as Civil Judge",
          icon: "👨‍⚖️",
          details: "Junior Division initially",
        },
      ],
      hi: [
        {
          step: "आवश्यक शिक्षा पूरी करें",
          icon: "📚",
          details: "वर्तमान फोकस",
        },
        {
          step: "LLB की डिग्री प्राप्त करें",
          icon: "⚖️",
          details:
            education === "grad" ? "3-वर्षीय LLB" : "5-वर्षीय एकीकृत LLB",
        },
        {
          step: "बार काउंसिल में पंजीकरण करें",
          icon: "📋",
          details: "कानूनी अभ्यास के लिए अनिवार्य",
        },
        {
          step: "राज्य न्यायिक परीक्षा की तैयारी करें",
          icon: "🎯",
          details: "राज्य-विशिष्ट पाठ्यक्रम",
        },
        {
          step: "परीक्षा में उपस्थित हों",
          icon: "📝",
          details: "प्रारंभिक, मुख्य, साक्षात्कार",
        },
        {
          step: "न्यायिक प्रशिक्षण",
          icon: "🏫",
          details: "राज्य न्यायिक अकादमी में 1 वर्ष",
        },
        {
          step: "सिविल जज के रूप में शुरुआत करें",
          icon: "👨‍⚖️",
          details: "प्रारंभ में जूनियर डिवीजन",
        },
      ],
      mr: [
        {
          step: "आवश्यक शिक्षण पूर्ण करा",
          icon: "📚",
          details: "सध्याचे लक्ष",
        },
        {
          step: "LLB पदवी घ्या",
          icon: "⚖️",
          details:
            education === "grad" ? "3-वर्षाचे LLB" : "5-वर्षाचे एकात्मिक LLB",
        },
        {
          step: "बार कौन्सिलमध्ये नोंदणी करा",
          icon: "📋",
          details: "कायदेशीर सरावासाठी अनिवार्य",
        },
        {
          step: "राज्य न्यायिक परीक्षेची तयारी करा",
          icon: "🎯",
          details: "राज्य-विशिष्ट अभ्यासक्रम",
        },
        {
          step: "परीक्षेसाठी उपस्थित राहा",
          icon: "📝",
          details: "प्राथमिक, मुख्य, मुलाखत",
        },
        {
          step: "न्यायिक प्रशिक्षण",
          icon: "🏫",
          details: "राज्य न्यायिक अकादमीत 1 वर्ष",
        },
        {
          step: "सिव्हिल जज म्हणून सुरुवात करा",
          icon: "👨‍⚖️",
          details: "सुरुवातीला ज्युनियर डिव्हिजन",
        },
      ],
    };

    return baseSteps[lang] || baseSteps["en"];
  }

  static createRoadmapHTML(steps, state, lang) {
    const stateNames = {
      up: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश", mr: "उत्तर प्रदेश" },
      mh: { en: "Maharashtra", hi: "महाराष्ट्र", mr: "महाराष्ट्र" },
      br: { en: "Bihar", hi: "बिहार", mr: "बिहार" },
    };

    const stateName = stateNames[state]
      ? stateNames[state][lang] || stateNames[state]["en"]
      : state.toUpperCase();

    return `
            <div class="card">
                <h3><i class="fas fa-map"></i> ${getText(lang, "genericRoadmapTitle")} ${stateName}</h3>
                <p>${getText(lang, "roadmapDescription")}</p>
                
                <div class="timeline">
                    ${steps
                      .map(
                        (step, index) => `
                        <div class="timeline-step ${index === 0 ? "current" : ""}">
                            <div class="step-content">
                                <h4 class="step-title">${step.icon} ${step.step}</h4>
                                <p>${step.details}</p>
                                <span class="step-timeline">${getText(lang, "step")} ${index + 1}</span>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                
                <div class="info-note">
                    <i class="fas fa-info-circle"></i>
                    <small>${getText(lang, "officialNote")}</small>
                </div>
                
                <button id="trySimulationFromRoadmap" class="btn btn-primary btn-block">
                    <i class="fas fa-gavel"></i> ${getText(lang, "trySimulation")}
                </button>
            </div>
        `;
  }
}

// ============================================
// Simulation Engine (Multilingual)
// ============================================
class Simulation {
  static start() {
    const lang = LanguageController.getCurrentLang();
    // Get random case from current language
    const cases = CaseDatabase[lang] || CaseDatabase["en"];
    const randomCase = cases[Math.floor(Math.random() * cases.length)];
    AppState.currentCase = randomCase;

    // Display case
    const caseHTML = this.createCaseHTML(randomCase, lang);
    DOM.displays.caseContainer.innerHTML = caseHTML;
    DOM.displays.caseContainer.style.display = "block";

    // Hide start button
    if (DOM.buttons.startSim) {
      DOM.buttons.startSim.style.display = "none";
    }

    // Set up option buttons
    setTimeout(() => {
      document.querySelectorAll(".option-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
          this.selectOption(index, lang);
        });
      });
    }, 100);
  }

  static createCaseHTML(caseData, lang) {
    return `
            <div class="case-card">
                <h3 class="case-title">${caseData.title}</h3>
                
                <div class="case-facts">
                    <h4><i class="fas fa-file-alt"></i> ${getText(lang, "caseFacts")}</h4>
                    <p>${caseData.facts}</p>
                </div>
                
                <div class="evidence">
                    <h4><i class="fas fa-clipboard-check"></i> ${getText(lang, "evidence")}</h4>
                    <ul>
                        ${caseData.evidence.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                </div>
                
                <div class="options-grid">
                    ${caseData.options
                      .map(
                        (option, index) => `
                        <button class="option-btn" data-index="${index}">
                            <strong>${String.fromCharCode(65 + index)}:</strong> ${option.text}
                        </button>
                    `,
                      )
                      .join("")}
                </div>
                
                <p class="instruction"><i class="fas fa-lightbulb"></i> ${getText(lang, "chooseInstruction")}</p>
            </div>
        `;
  }

  static selectOption(optionIndex, lang) {
    const selectedCase = AppState.currentCase;
    const selectedOption = selectedCase.options[optionIndex];

    if (!selectedOption) return;

    // Disable all buttons
    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.disabled = true;
      btn.classList.remove("selected");
    });

    // Highlight selected
    const selectedBtn = document.querySelector(
      `.option-btn[data-index="${optionIndex}"]`,
    );
    if (selectedBtn) {
      selectedBtn.classList.add("selected");
    }

    // Update user score
    AppState.currentUser.score += selectedOption.score;
    AppState.currentUser.casesSolved += 1;

    // UPDATE SCORE IN HEADER - FIX ADDED HERE
    Utils.updateScoreInHeader();

    // Update badges
    this.updateBadges(lang);

    // Save progress
    Utils.saveToLocalStorage("user", AppState.currentUser);

    // Show result
    setTimeout(() => {
      this.showResult(selectedOption, lang);
    }, 1000);

    // Submit to leaderboard if online
    if (db) {
      Leaderboard.submitScore();
    }
  }

  static showResult(option, lang) {
    const resultHTML = `
            <div class="result-card">
                <h3><i class="fas fa-award"></i> ${getText(lang, "judgmentDelivered")}</h3>
                <div class="result-score">+${option.score} ${getText(lang, "points")}</div>
                <p><strong>${getText(lang, "feedback")}:</strong> ${option.feedback}</p>
                <p>${getText(lang, "totalScore")}: <strong>${AppState.currentUser.score}</strong> | ${getText(lang, "casesSolved")}: <strong>${AppState.currentUser.casesSolved}</strong></p>
                
                <div style="margin-top: 20px;">
                    <button onclick="Simulation.start()" class="btn btn-primary">
                        <i class="fas fa-redo"></i> ${getText(lang, "tryAnother")}
                    </button>
                    <button onclick="Navigation.switchSection('profile')" class="btn btn-secondary">
                        <i class="fas fa-chart-line"></i> ${getText(lang, "viewProfile")}
                    </button>
                </div>
            </div>
        `;

    DOM.displays.caseContainer.innerHTML = resultHTML;

    // Update score displays
    if (DOM.displays.currentScore) {
      DOM.displays.currentScore.textContent = AppState.currentUser.score;
    }
    Profile.update();
  }

  static updateBadges(lang) {
    const user = AppState.currentUser;
    const badges = Badges[lang] || Badges["en"];

    // Check each badge
    Object.values(badges).forEach((badge) => {
      if (badge.id === "first_case" && user.casesSolved >= badge.threshold) {
        if (!user.badges.includes(badge.id)) {
          user.badges.push(badge.id);
          Utils.showToast(
            getText(lang, "badgeUnlocked", { badge: badge.name }),
          );
        }
      } else if (
        badge.id === "logical_thinker" &&
        user.score >= badge.threshold
      ) {
        if (!user.badges.includes(badge.id)) {
          user.badges.push(badge.id);
          Utils.showToast(
            getText(lang, "badgeUnlocked", { badge: badge.name }),
          );
        }
      } else if (
        badge.id === "consistent" &&
        user.casesSolved >= badge.threshold
      ) {
        if (!user.badges.includes(badge.id)) {
          user.badges.push(badge.id);
          Utils.showToast(
            getText(lang, "badgeUnlocked", { badge: badge.name }),
          );
        }
      }
    });

    // Update badge display
    Profile.updateBadges();
  }
}

// ============================================
// Leaderboard System
// ============================================
class Leaderboard {
  static async load() {
    if (!DOM.displays.leaderboardContent) return;

    const lang = LanguageController.getCurrentLang();
    Utils.showLoading(DOM.displays.leaderboardContent, getText(lang, "noData"));

    try {
      // Try to load from Firebase
      if (db) {
        const snapshot = await db
          .collection("leaderboard")
          .orderBy("score", "desc")
          .limit(20)
          .get();

        const leaderboardData = [];
        snapshot.forEach((doc) => {
          leaderboardData.push(doc.data());
        });

        this.display(leaderboardData);
        return;
      }
    } catch (error) {
      console.log("Firebase load failed:", error);
    }

    // Fallback to localStorage
    const localData = Utils.loadFromLocalStorage("leaderboard") || [];
    this.display(localData);
  }

  static display(data) {
    if (!DOM.displays.leaderboardContent) return;

    const lang = LanguageController.getCurrentLang();
    const stateFilter = DOM.inputs.stateFilter
      ? DOM.inputs.stateFilter.value
      : "all";
    let filteredData = data;

    if (stateFilter !== "all") {
      filteredData = filteredData.filter(
        (entry) => entry.state === stateFilter,
      );
    }

    if (filteredData.length === 0) {
      DOM.displays.leaderboardContent.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-trophy fa-3x"></i>
                    <h3>${getText(lang, "noData")}</h3>
                    <p>${getText(lang, "noDataDesc")}</p>
                </div>
            `;
      return;
    }

    const leaderboardHTML = `
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th>${getText(lang, "rank")}</th>
                        <th>${getText(lang, "name")}</th>
                        <th>${getText(lang, "state")}</th>
                        <th>${getText(lang, "score")}</th>
                        <th>${getText(lang, "cases")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredData
                      .map(
                        (entry, index) => `
                        <tr>
                            <td class="rank">${index + 1}</td>
                            <td>${entry.name || getText(lang, "aspiringJudge")}</td>
                            <td>${entry.state ? entry.state.toUpperCase() : "N/A"}</td>
                            <td><strong>${entry.score || 0}</strong></td>
                            <td>${entry.casesSolved || 0}</td>
                        </tr>
                    `,
                      )
                      .join("")}
                </tbody>
            </table>
        `;

    DOM.displays.leaderboardContent.innerHTML = leaderboardHTML;
  }

  static async submitScore() {
    if (!db) return;

    try {
      const user = AppState.currentUser;
      if (user.score === 0) return;

      // Ensure user has ID
      if (!user.id) {
        user.id = Utils.generateUserId();
      }

      // Submit to Firebase
      await db
        .collection("leaderboard")
        .doc(user.id)
        .set(
          {
            id: user.id,
            name: user.name,
            state: user.state || "unknown",
            score: user.score,
            casesSolved: user.casesSolved,
            language: LanguageController.getCurrentLang(),
            lastUpdated: new Date().toISOString(),
          },
          { merge: true },
        );

      console.log("Score submitted to leaderboard");
    } catch (error) {
      console.log("Leaderboard submission failed:", error);
    }
  }
}

// ============================================
// Profile Management
// ============================================
class Profile {
  static update() {
    const user = AppState.currentUser;
    const lang = LanguageController.getCurrentLang();

    // Update displays
    if (DOM.displays.totalScore) {
      DOM.displays.totalScore.textContent = user.score;
    }
    if (DOM.displays.casesSolved) {
      DOM.displays.casesSolved.textContent = user.casesSolved;
    }
    if (DOM.displays.badgeCount) {
      DOM.displays.badgeCount.textContent = user.badges.length;
    }
    if (DOM.displays.currentScore) {
      DOM.displays.currentScore.textContent = user.score;
    }

    // UPDATE SCORE IN HEADER - FIX ADDED HERE
    Utils.updateScoreInHeader();

    // Update name and location
    if (user.state && DOM.displays.userLocation) {
      const stateNames = {
        up: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश", mr: "उत्तर प्रदेश" },
        mh: { en: "Maharashtra", hi: "महाराष्ट्र", mr: "महाराष्ट्र" },
        br: { en: "Bihar", hi: "बिहार", mr: "बिहार" },
      };

      const stateName = stateNames[user.state]
        ? stateNames[user.state][lang] || stateNames[user.state]["en"]
        : user.state.toUpperCase();

      DOM.displays.userLocation.textContent = stateName;
    }

    // Update progress
    const progress = Utils.calculateProgress(user);
    if (DOM.displays.progressFill) {
      DOM.displays.progressFill.style.width = `${progress}%`;
    }
    if (DOM.displays.progressText) {
      DOM.displays.progressText.textContent = `${progress}% ${getText(lang, "complete")}`;
    }

    // Update badges
    this.updateBadges();
  }

  static updateBadges() {
    if (!DOM.displays.badgesContainer) return;

    const lang = LanguageController.getCurrentLang();
    const user = AppState.currentUser;
    const badges = Badges[lang] || Badges["en"];

    const badgesHTML = Object.values(badges)
      .map((badge) => {
        const unlocked = user.badges.includes(badge.id);
        return `
                <div class="badge-item ${unlocked ? "unlocked" : ""}">
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-name">${badge.name}</div>
                </div>
            `;
      })
      .join("");

    DOM.displays.badgesContainer.innerHTML = badgesHTML;
  }

  static reset() {
    const lang = LanguageController.getCurrentLang();
    if (confirm(getText(lang, "resetProgress") + "?")) {
      AppState.currentUser = {
        id: AppState.currentUser.id || Utils.generateUserId(),
        name: getText(lang, "aspiringJudge"),
        state: "",
        education: "",
        score: 0,
        casesSolved: 0,
        badges: [],
        createdAt: new Date().toISOString(),
      };

      Utils.saveToLocalStorage("user", AppState.currentUser);
      this.update();

      // UPDATE SCORE IN HEADER - FIX ADDED HERE
      Utils.updateScoreInHeader();

      Utils.showToast(getText(lang, "progressReset"));
    }
  }

  static save() {
    const lang = LanguageController.getCurrentLang();
    Utils.saveToLocalStorage("user", AppState.currentUser);
    Utils.showToast(getText(lang, "progressSaved"));
  }
}

// ============================================
// PWA Service Worker Registration
// ============================================
class PWA {
  static registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("./service-worker.js")
          .then((registration) => {
            console.log("ServiceWorker registered:", registration.scope);
          })
          .catch((error) => {
            console.log("ServiceWorker registration failed:", error);
          });
      });
    }
  }

  static initInstallPrompt() {
    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;

      setTimeout(() => {
        if (deferredPrompt) {
          const lang = LanguageController.getCurrentLang();
          if (
            confirm(
              getText(lang, "installPrompt") ||
                "Install Nyaya-Uday app for offline access?",
            )
          ) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === "accepted") {
                console.log("User accepted install");
              }
              deferredPrompt = null;
            });
          }
        }
      }, 10000);
    });
  }
}

// ============================================
// App Initialization
// ============================================
class NyayaUdayApp {
  static init() {
    console.log("Nyaya-Uday App Initializing...");

    // 1. Load saved user data
    const savedUser = Utils.loadFromLocalStorage("user");
    if (savedUser) {
      AppState.currentUser = { ...AppState.currentUser, ...savedUser };
      if (!AppState.currentUser.id) {
        AppState.currentUser.id = Utils.generateUserId();
      }
    } else {
      AppState.currentUser.id = Utils.generateUserId();
      Utils.saveToLocalStorage("user", AppState.currentUser);
    }

    // UPDATE SCORE IN HEADER ON INIT - FIX ADDED HERE
    Utils.updateScoreInHeader();

    // 2. Initialize Language
    LanguageController.init();

    // 3. Initialize PWA
    PWA.registerServiceWorker();
    PWA.initInstallPrompt();

    // 4. Initialize navigation
    Navigation.init();

    // 5. Set up event listeners
    this.bindEvents();

    // 6. Update displays
    Profile.update();

    // 7. Load leaderboard if online
    if (navigator.onLine) {
      setTimeout(() => Leaderboard.load(), 1000);
    }

    console.log("Nyaya-Uday App Ready!");
    setTimeout(() => {
      const lang = LanguageController.getCurrentLang();
      Utils.showToast(getText(lang, "welcome"), 2000);
    }, 500);
  }

  static bindEvents() {
    const lang = LanguageController.getCurrentLang();

    // Generate roadmap button
    if (DOM.buttons.generate) {
      DOM.buttons.generate.addEventListener("click", () => Roadmap.generate());
    }

    // Start simulation button
    if (DOM.buttons.startSim) {
      DOM.buttons.startSim.addEventListener("click", () => Simulation.start());
    }

    // Refresh leaderboard
    if (DOM.buttons.refreshLB) {
      DOM.buttons.refreshLB.addEventListener("click", () => Leaderboard.load());
    }

    // State filter for leaderboard
    if (DOM.inputs.stateFilter) {
      DOM.inputs.stateFilter.addEventListener("change", () =>
        Leaderboard.load(),
      );
    }

    // Profile buttons
    if (DOM.buttons.reset) {
      DOM.buttons.reset.addEventListener("click", () => Profile.reset());
    }

    if (DOM.buttons.save) {
      DOM.buttons.save.addEventListener("click", () => Profile.save());
    }

    // Data saving mode toggle
    const dataSavingToggle = document.getElementById("dataSaving");
    if (dataSavingToggle) {
      dataSavingToggle.addEventListener("change", (e) => {
        const lang = LanguageController.getCurrentLang();
        Utils.showToast(
          e.target.checked
            ? getText(lang, "dataSavingEnabled")
            : getText(lang, "dataSavingDisabled"),
        );
      });
    }

    // Online/offline detection
    window.addEventListener("online", () => {
      const lang = LanguageController.getCurrentLang();
      Utils.showToast(getText(lang, "online"));
      setTimeout(() => Leaderboard.load(), 1000);
    });

    window.addEventListener("offline", () => {
      const lang = LanguageController.getCurrentLang();
      Utils.showToast(getText(lang, "offline"));
    });

    // Add event listener for simulation button in roadmap
    document.addEventListener("click", (e) => {
      if (e.target && e.target.id === "trySimulationFromRoadmap") {
        Navigation.switchSection("simulation");
      }
    });
  }
}

// ============================================
// Start the App
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  NyayaUdayApp.init();
});

// Make key functions available globally for inline event handlers
window.Navigation = Navigation;
window.Simulation = Simulation;
window.Profile = Profile;
window.Roadmap = Roadmap;
window.LanguageController = LanguageController;
