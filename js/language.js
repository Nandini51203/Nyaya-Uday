// languages.js - Multilingual support for Nyaya-Uday

const LanguageData = {
  en: {
    // App Info
    appName: "Nyaya-Uday",
    tagline: "Access to Justice Begins with Access to the Path",

    // Navigation
    navHome: "Home",
    navRoadmap: "Roadmap",
    navSimulation: "Simulation",
    navLeaderboard: "Leaderboard",
    navProfile: "Profile",

    // Home Page
    heroTitle: "Discover Your Path to the Bench",
    heroSubtitle: "Free, simple guidance for aspiring judges across India",
    startJourney: "Start Your Journey",
    roadmapDescription:
      "Get personalized judicial career roadmap in 30 seconds",
    selectState: "Select Your State",
    selectEducation: "Current Education",
    chooseState: "Choose State/UT",
    chooseEducation: "Select Education Level",
    generateRoadmap: "Generate My Roadmap",
    dataNote:
      "Data based on official BCI rules and state judicial service notifications",

    // Features
    feature1Title: "State Roadmaps",
    feature1Desc: "Personalized path based on your state's rules",
    feature2Title: "Judge Simulation",
    feature2Desc: "Test your judicial thinking skills",
    feature3Title: "Lightweight",
    feature3Desc: "Works on basic smartphones",

    // Stats
    statsStates: "States",
    statsFree: "Free",
    stats2G: "Works on 2G",

    // Roadmap Page
    roadmapTitle: "Your Judicial Career Roadmap",
    backButton: "Back",
    genericRoadmapTitle: "Judicial Career Path for",
    step: "Step",
    officialNote:
      "This is a simplified overview. Always verify with official state judicial service notifications.",
    trySimulation: "Try Judicial Simulation",

    // Simulation Page
    simulationTitle: "Junior Judge Simulation",
    simulationSubtitle: "Test Your Judicial Temperament",
    simulationDesc:
      "Solve real-case scenarios to see if you have what it takes to be a judge.",
    fairnessLogic: "Focus on fairness & logic",
    noLegalKnowledge: "No legal knowledge required",
    startCase: "Start New Case",
    caseFacts: "Facts of the Case",
    evidence: "Available Evidence",
    chooseInstruction:
      "Choose based on fairness, evidence, and logical reasoning",
    judgmentDelivered: "Judgment Delivered!",
    points: "pts",
    feedback: "Feedback",
    totalScore: "Total Score",
    casesSolved: "Cases Solved",
    tryAnother: "Try Another Case",
    viewProfile: "View Profile",

    // Leaderboard Page
    leaderboardTitle: "Judicial Aptitude Leaderboard",
    refresh: "Refresh",
    allStates: "All States",
    rank: "Rank",
    name: "Name",
    state: "State",
    score: "Score",
    cases: "Cases",
    noData: "No Leaderboard Data",
    noDataDesc: "Complete simulations to appear on the leaderboard!",
    leaderboardNote:
      "Leaderboard updates in real-time. Scores based on simulation performance.",

    // Profile Page
    profileTitle: "Your Profile",
    aspiringJudge: "Aspiring Judge",
    totalScoreLabel: "Total Score",
    casesSolvedLabel: "Cases Solved",
    badgesLabel: "Badges",
    resetProgress: "Reset Progress",
    saveProgress: "Save Progress",
    journeyProgress: "Your Journey Progress",
    complete: "Complete",
    appSettings: "App Settings",
    dataSaving: "Data Saving Mode",
    offlineMode: "Offline Mode",
    storageNote: "All data stored locally. Works without internet.",

    // Badges
    firstJudgment: "First Judgment",
    logicalThinker: "Logical Thinker",
    fairMinded: "Fair Minded",
    consistent: "Consistent",
    rapidDecider: "Rapid Decider",

    // Toast Messages
    welcome: "Welcome to Nyaya-Uday!",
    selectBoth: "Please select both state and education level",
    roadmapGenerated: "Roadmap generated successfully!",
    badgeUnlocked: "Unlocked: {badge} badge!",
    progressSaved: "Progress saved locally",
    progressReset: "Progress reset successfully",
    online: "Back online. Syncing data...",
    offline: "Working offline. Data saved locally.",
    dataSavingEnabled: "Data saving enabled",
    dataSavingDisabled: "Data saving disabled",

    // Footer
    copyright: "Nyaya-Uday © 2026 • Judicial Career Discovery Platform",
    builtForIndia: "Built for India • Works on 2G networks • Free Forever",

    // Case Data
    rentDisputeTitle: "The Rent Dispute",
    rentDisputeFacts:
      "Landlord Mr. Sharma claims tenant Mr. Verma hasn't paid rent for 3 months. Tenant says the roof was leaking throughout monsoon and repair requests were ignored.",
    rentDisputeEvidence1: "WhatsApp messages showing repair requests",
    rentDisputeEvidence2: "Photos of water leakage damage",
    rentDisputeEvidence3: "No written rent agreement",
    rentDisputeEvidence4: "One neighbor as witness",
    optionA:
      "Order tenant to pay 2 months' rent (deducting 1 month for repairs)",
    optionB: "Dismiss case due to lack of written agreement",
    optionC: "Side with landlord because he seems trustworthy",
    optionD: "Order mediation between parties before deciding",
    feedbackA:
      "Excellent! You balanced both parties' interests and considered the evidence properly.",
    feedbackB:
      "While procedurally correct, this ignores the practical realities of the situation.",
    feedbackC:
      "Judges must avoid emotional biases and decide based on evidence, not appearances.",
    feedbackD:
      "Good approach for dispute resolution, but sometimes immediate decisions are needed.",

    stolenBicycleTitle: "The Stolen Bicycle",
    stolenBicycleFacts:
      "Rohan claims Sohan took his bicycle without permission. Sohan says Rohan promised to lend it for a week. No witnesses. Value: ₹5,000.",
    stolenBicycleEvidence1: "Both are college friends",
    stolenBicycleEvidence2: "No written lending agreement",
    stolenBicycleEvidence3: "Bicycle was returned after 10 days",
    stolenBicycleEvidence4: "Minor scratches on bicycle",

    partnershipTitle: "The Business Partnership",
    partnershipFacts:
      "Two friends started a small shop. Partner A invested ₹50,000, Partner B managed daily operations. After 6 months, they disagree on profit sharing.",
    partnershipEvidence1: "Bank transfer of ₹50,000",
    partnershipEvidence2: "No written partnership agreement",
    partnershipEvidence3: "Mixed accounts for personal and business",
    partnershipEvidence4: "Sales records maintained by Partner B",
  },

  hi: {
    // App Info
    appName: "न्याय-उदय",
    tagline: "न्याय तक पहुँच, रास्ते तक पहुँच से शुरू होती है",

    // Navigation
    navHome: "होम",
    navRoadmap: "रोडमैप",
    navSimulation: "सिमुलेशन",
    navLeaderboard: "लीडरबोर्ड",
    navProfile: "प्रोफाइल",

    // Home Page
    heroTitle: "न्यायाधीश बनने का रास्ता खोजें",
    heroSubtitle:
      "भारत भर में न्यायाधीश बनने के इच्छुक लोगों के लिए मुफ्त, सरल मार्गदर्शन",
    startJourney: "अपनी यात्रा शुरू करें",
    roadmapDescription:
      "30 सेकंड में अपना व्यक्तिगत न्यायिक करियर रोडमैप प्राप्त करें",
    selectState: "अपना राज्य चुनें",
    selectEducation: "वर्तमान शिक्षा",
    chooseState: "राज्य/केंद्रशासित प्रदेश चुनें",
    chooseEducation: "शिक्षा स्तर चुनें",
    generateRoadmap: "मेरा रोडमैप बनाएं",
    dataNote:
      "डेटा आधिकारिक बीसीआई नियमों और राज्य न्यायिक सेवा अधिसूचनाओं पर आधारित है",

    // Features
    feature1Title: "राज्यवार रोडमैप",
    feature1Desc: "आपके राज्य के नियमों पर आधारित व्यक्तिगत रास्ता",
    feature2Title: "न्यायाधीश सिमुलेशन",
    feature2Desc: "अपने न्यायिक सोच कौशल का परीक्षण करें",
    feature3Title: "हल्का एप",
    feature3Desc: "बेसिक स्मार्टफोन पर काम करता है",

    // Stats
    statsStates: "राज्य",
    statsFree: "मुफ्त",
    stats2G: "2G पर काम करता है",

    // Roadmap Page
    roadmapTitle: "आपका न्यायिक करियर रोडमैप",
    backButton: "वापस",
    genericRoadmapTitle: "के लिए न्यायिक करियर पथ",
    step: "चरण",
    officialNote:
      "यह एक सरलीकृत अवलोकन है। हमेशा आधिकारिक राज्य न्यायिक सेवा अधिसूचनाओं से सत्यापित करें।",
    trySimulation: "न्यायिक सिमुलेशन आजमाएं",

    // Simulation Page
    simulationTitle: "जूनियर जज सिमुलेशन",
    simulationSubtitle: "अपने न्यायिक स्वभाव का परीक्षण करें",
    simulationDesc:
      "यह देखने के लिए वास्तविक मामले के परिदृश्यों को हल करें कि क्या आपमें न्यायाधीश बनने की योग्यता है।",
    fairnessLogic: "निष्पक्षता और तर्क पर ध्यान दें",
    noLegalKnowledge: "कानूनी ज्ञान की आवश्यकता नहीं",
    startCase: "नया मामला शुरू करें",
    caseFacts: "मामले के तथ्य",
    evidence: "उपलब्ध सबूत",
    chooseInstruction: "निष्पक्षता, साक्ष्य और तार्किक तर्क के आधार पर चुनें",
    judgmentDelivered: "निर्णय सुनाया गया!",
    points: "अंक",
    feedback: "प्रतिक्रिया",
    totalScore: "कुल स्कोर",
    casesSolved: "मामले हल",
    tryAnother: "दूसरा मामला आजमाएं",
    viewProfile: "प्रोफाइल देखें",

    // Leaderboard Page
    leaderboardTitle: "न्यायिक योग्यता लीडरबोर्ड",
    refresh: "ताज़ा करें",
    allStates: "सभी राज्य",
    rank: "रैंक",
    name: "नाम",
    state: "राज्य",
    score: "स्कोर",
    cases: "मामले",
    noData: "कोई लीडरबोर्ड डेटा नहीं",
    noDataDesc: "लीडरबोर्ड पर दिखने के लिए सिमुलेशन पूरे करें!",
    leaderboardNote:
      "लीडरबोर्ड रीयल-टाइम में अपडेट होता है। स्कोर सिमुलेशन प्रदर्शन पर आधारित है।",

    // Profile Page
    profileTitle: "आपकी प्रोफाइल",
    aspiringJudge: "उभरते न्यायाधीश",
    totalScoreLabel: "कुल स्कोर",
    casesSolvedLabel: "मामले हल",
    badgesLabel: "बैज",
    resetProgress: "प्रगति रीसेट करें",
    saveProgress: "प्रगति सहेजें",
    journeyProgress: "आपकी यात्रा प्रगति",
    complete: "पूर्ण",
    appSettings: "एप सेटिंग्स",
    dataSaving: "डेटा सेविंग मोड",
    offlineMode: "ऑफलाइन मोड",
    storageNote:
      "सभी डेटा स्थानीय रूप से संग्रहीत है। इंटरनेट के बिना काम करता है।",

    // Badges
    firstJudgment: "पहला निर्णय",
    logicalThinker: "तार्किक विचारक",
    fairMinded: "निष्पक्ष मन",
    consistent: "निरंतर",
    rapidDecider: "त्वरित निर्णायक",

    // Toast Messages
    welcome: "न्याय-उदय में आपका स्वागत है!",
    selectBoth: "कृपया राज्य और शिक्षा स्तर दोनों चुनें",
    roadmapGenerated: "रोडमैप सफलतापूर्वक बनाया गया!",
    badgeUnlocked: "अनलॉक किया गया: {badge} बैज!",
    progressSaved: "प्रगति स्थानीय रूप से सहेजी गई",
    progressReset: "प्रगति सफलतापूर्वक रीसेट की गई",
    online: "ऑनलाइन वापस आएं। डेटा सिंक कर रहे...",
    offline: "ऑफलाइन काम कर रहे हैं। डेटा स्थानीय रूप से सहेजा गया।",
    dataSavingEnabled: "डेटा सेविंग सक्षम किया गया",
    dataSavingDisabled: "डेटा सेविंग अक्षम किया गया",

    // Footer
    copyright: "न्याय-उदय © 2026 • न्यायिक करियर डिस्कवरी प्लेटफॉर्म",
    builtForIndia:
      "भारत के लिए निर्मित • 2G नेटवर्क पर काम करता है • हमेशा मुफ्त",
  },

  mr: {
    // App Info
    appName: "न्याय-उदय",
    tagline: "न्यायाप्रती मार्ग, मार्गाप्रती मार्गाने सुरू होते",

    // Navigation
    navHome: "होम",
    navRoadmap: "रोडमॅप",
    navSimulation: "सिम्युलेशन",
    navLeaderboard: "लीडरबोर्ड",
    navProfile: "प्रोफाइल",

    // Home Page
    heroTitle: "न्यायाधीश बनण्याचा मार्ग शोधा",
    heroSubtitle:
      "भारतभर न्यायाधीश बनू इच्छिणाऱ्यांसाठी विनामूल्य, सोपे मार्गदर्शन",
    startJourney: "आपला प्रवास सुरू करा",
    roadmapDescription: "30 सेकंदात तुमचा वैयक्तिक न्यायिक करिअर रोडमॅप मिळवा",
    selectState: "तुमचा राज्य निवडा",
    selectEducation: "सद्य शिक्षण",
    chooseState: "राज्य/केंद्रशासित प्रदेश निवडा",
    chooseEducation: "शिक्षण पातळी निवडा",
    generateRoadmap: "माझा रोडमॅप तयार करा",
    dataNote:
      "डेटा अधिकृत BCI नियम आणि राज्य न्यायिक सेवा अधिसूचनांवर आधारित आहे",

    // Features
    feature1Title: "राज्यनिहाय रोडमॅप",
    feature1Desc: "तुमच्या राज्याच्या नियमांवर आधारित वैयक्तिक मार्ग",
    feature2Title: "न्यायाधीश सिम्युलेशन",
    feature2Desc: "तुमच्या न्यायिक विचार कौशल्याची चाचणी घ्या",
    feature3Title: "हलका ऍप",
    feature3Desc: "बेसिक स्मार्टफोनवर कार्य करते",

    // Stats
    statsStates: "राज्ये",
    statsFree: "विनामूल्य",
    stats2G: "2G वर कार्य करते",

    // Roadmap Page
    roadmapTitle: "तुमचा न्यायिक करिअर रोडमॅप",
    backButton: "मागे",
    genericRoadmapTitle: "साठी न्यायिक करिअर मार्ग",
    step: "चरण",
    officialNote:
      "हे एक सरलीकृत आढावा आहे. नेहमी अधिकृत राज्य न्यायिक सेवा अधिसूचना तपासा.",
    trySimulation: "न्यायिक सिम्युलेशन वापरून पहा",

    // Simulation Page
    simulationTitle: "कनिष्ठ न्यायाधीश सिम्युलेशन",
    simulationSubtitle: "तुमच्या न्यायिक स्वभावाची चाचणी घ्या",
    simulationDesc:
      "वास्तविक प्रकरणांची परिस्थिती सोडवून पहा की तुमच्यात न्यायाधीश बनण्याची योग्यता आहे का.",
    fairnessLogic: "निष्पक्षता आणि तर्कावर लक्ष द्या",
    noLegalKnowledge: "कायदेशीर ज्ञान आवश्यक नाही",
    startCase: "नवीन प्रकरण सुरू करा",
    caseFacts: "प्रकरणाची तथ्ये",
    evidence: "उपलब्ध पुरावे",
    chooseInstruction: "निष्पक्षता, पुरावे आणि तार्किक तर्क यावर आधारित निवडा",
    judgmentDelivered: "निर्णय सुनावला!",
    points: "गुण",
    feedback: "अभिप्राय",
    totalScore: "एकूण गुण",
    casesSolved: "प्रकरणे सोडवली",
    tryAnother: "दुसरे प्रकरण वापरून पहा",
    viewProfile: "प्रोफाइल पहा",

    // Leaderboard Page
    leaderboardTitle: "न्यायिक योग्यता लीडरबोर्ड",
    refresh: "रिफ्रेश करा",
    allStates: "सर्व राज्ये",
    rank: "क्रमांक",
    name: "नाव",
    state: "राज्य",
    score: "स्कोर",
    cases: "केसेस",
    noData: "लीडरबोर्ड डेटा नाही",
    noDataDesc: "लीडरबोर्डवर दिसण्यासाठी सिम्युलेशन पूर्ण करा!",
    leaderboardNote:
      "लीडरबोर्ड रिअल-टाइममध्ये अपडेट होतो. स्कोर सिम्युलेशन कामगिरीवर आधारित आहे.",

    // Profile Page
    profileTitle: "तुमची प्रोफाइल",
    aspiringJudge: "उदयोन्मुख न्यायाधीश",
    totalScoreLabel: "एकूण गुण",
    casesSolvedLabel: "प्रकरणे सोडवली",
    badgesLabel: "बॅजेस",
    resetProgress: "प्रगती रीसेट करा",
    saveProgress: "प्रगती जतन करा",
    journeyProgress: "तुमची प्रवास प्रगती",
    complete: "पूर्ण",
    appSettings: "ॲप सेटिंग्ज",
    dataSaving: "डेटा सेव्हिंग मोड",
    offlineMode: "ऑफलाइन मोड",
    storageNote:
      "सर्व डेटा स्थानिकरित्या संग्रहित केला जातो. इंटरनेटशिवाय कार्य करते.",

    // Badges
    firstJudgment: "पहिला निर्णय",
    logicalThinker: "तार्किक विचारवंत",
    fairMinded: "निष्पक्ष मन",
    consistent: "सातत्यशील",
    rapidDecider: "त्वरित निर्णायक",

    // Toast Messages
    welcome: "न्याय-उदय मध्ये आपले स्वागत आहे!",
    selectBoth: "कृपया राज्य आणि शिक्षण पातळी दोन्ही निवडा",
    roadmapGenerated: "रोडमॅप यशस्वीरित्या तयार झाला!",
    badgeUnlocked: "अनलॉक केले: {badge} बॅज!",
    progressSaved: "प्रगती स्थानिकरित्या जतन केली",
    progressReset: "प्रगती यशस्वीरित्या रीसेट केली",
    online: "ऑनलाइन परत आलो. डेटा सिंक करत आहे...",
    offline: "ऑफलाइन कार्य करत आहे. डेटा स्थानिकरित्या जतन केला.",
    dataSavingEnabled: "डेटा सेव्हिंग सक्षम केले",
    dataSavingDisabled: "डेटा सेव्हिंग अक्षम केले",

    // Footer
    copyright: "न्याय-उदय © 2026 • न्यायिक करिअर डिस्कव्हरी प्लॅटफॉर्म",
    builtForIndia:
      "भारतासाठी बनविलेले • 2G नेटवर्कवर कार्य करते • कायमचे विनामूल्य",
  },
};

// Get translated text
function getText(lang, key, params = {}) {
  let text = LanguageData[lang]?.[key] || LanguageData["en"][key] || key;

  // Replace parameters
  Object.keys(params).forEach((param) => {
    text = text.replace(`{${param}}`, params[param]);
  });

  return text;
}

// Get current language
function getCurrentLanguage() {
  return localStorage.getItem("nyaya_language") || "en";
}

// Set language
function setLanguage(lang) {
  localStorage.setItem("nyaya_language", lang);
  document.documentElement.lang = lang;
  return lang;
}

// Get available languages
function getAvailableLanguages() {
  return [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "mr", name: "Marathi", native: "मराठी" },
  ];
}

export {
  LanguageData,
  getText,
  getCurrentLanguage,
  setLanguage,
  getAvailableLanguages,
};
