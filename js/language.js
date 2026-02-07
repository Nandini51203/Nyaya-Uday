// language.js - Multilingual support for Nyaya-Uday

const LanguageData = {
  en: {
    // Login Screen
    loginWelcome: "Welcome to Nyaya-Uday",
    loginSubtitle: "Your judicial career discovery platform",
    continueGuest: "Continue as Guest",
    signIn: "Sign In",
    createAccount: "Create Account",
    forgotPassword: "Forgot Password?",
    loginInfo:
      "Continue as guest to explore all features. Your progress will be saved locally.",
    loginFeaturesTitle: "What you'll get:",
    featureRoadmaps: "Personalized Judicial Roadmaps",
    featureSimulation: "Judge Simulation Exercises",
    featureScoring: "Aptitude Scoring & Badges",
    featureExams: "Exam Preparation Guidance",

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
    feature3Title: "AI Assistant",
    feature3Desc: "Get instant answers to your queries",

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
    duration: "Duration",
    optionalStep: "Optional step",
    recommendedExams: "Recommended exams",

    // Exams Section
    examsTitle: "Recommended Exams",
    clatExam: "CLAT (Common Law Admission Test)",
    ailetExam: "AILET (All India Law Entrance Test)",
    stateCet: "State Law CET",
    upPcsj: "UP PCS-J (Judicial Services)",
    mhJudicial: "Maharashtra Judicial Services",
    biharJudicial: "Bihar Judicial Services",
    examPattern: "Exam Pattern",
    eligibility: "Eligibility",
    ageLimit: "Age Limit",
    attempts: "Attempts",
    frequency: "Frequency",
    officialWebsite: "Official Website",

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
    installPrompt: "Install Nyaya-Uday app for offline access?",

    // Auth Messages
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

    // Assistant Messages
    assistantWelcome:
      "Hello! I'm Nyaya Assistant. How can I help you with your judicial career journey today?",
    judgePathGeneral:
      "The path to becoming a judge typically involves:\n1. Completing LLB degree\n2. Bar Council registration\n3. Judicial service exam preparation\n4. Clearing state judicial exams\n5. Judicial training\n\nCan you tell me your current education level?",
    clatInfo:
      "CLAT (Common Law Admission Test):\n• National level entrance for NLUs\n• Eligibility: Class 12 with 45% (40% for SC/ST)\n• No age limit for UG programs\n• Pattern: 150 MCQs\n• Subjects: English, GK, Maths, Legal Aptitude, Reasoning\n• Website: consortiumofnlus.ac.in",
    ailetInfo:
      "AILET (All India Law Entrance Test):\n• Entrance for NLU Delhi\n• Eligibility: Class 12 with 50% (45% for SC/ST)\n• Age: Below 20 years for UG\n• Pattern: 150 MCQs\n• Website: nludelhi.ac.in",
    examInfoGeneral:
      "Major Judicial Exams in India:\n1. State Judicial Services Exams\n2. CLAT for law admissions\n3. AILET for NLU Delhi\n4. State CET for law colleges\n\nWhich specific exam information do you need?",
    roadmapHelp:
      "To get your personalized judicial career roadmap:\n1. Go to Home section\n2. Select your state and education level\n3. Click 'Generate My Roadmap'\n4. View detailed step-by-step plan with exam suggestions\n\nYou can also ask me specific questions about your career path.",
    assistantThanks:
      "You're welcome! Feel free to ask if you have more questions about your judicial career journey.",
    assistantHelp:
      "I can help you with:\n• How to become a judge after 12th/graduation\n• State-wise exam information\n• Age limits and eligibility\n• Preparation tips and books\n• Salary and career progression\n• LLB admission guidance\n• Interview preparation\n• Exam pattern and syllabus\n• Reservation policies\n• Application process\n\nJust ask me anything!",
    assistantDefault:
      "I'm not sure I understand. Could you please rephrase your question? Here are some things I can help with:\n• 'How to become a judge after 12th?'\n• 'Which exam is needed in Maharashtra?'\n• 'What is the age limit for judicial exams?'\n• 'Tell me about CLAT exam'\n• 'What is the salary of a judge?'\n• 'How to prepare for judicial exams?'\n• 'Which books should I read?'",

    // Footer
    copyright: "Nyaya-Uday © 2026 • Judicial Career Discovery Platform",
    builtForIndia: "Built for India • Works on 2G networks • Free Forever",
  },

  hi: {
    // Login Screen
    loginWelcome: "न्याय-उदय में आपका स्वागत है",
    loginSubtitle: "आपका न्यायिक करियर डिस्कवरी प्लेटफॉर्म",
    continueGuest: "अतिथि के रूप में जारी रखें",
    signIn: "साइन इन करें",
    createAccount: "खाता बनाएं",
    forgotPassword: "पासवर्ड भूल गए?",
    loginInfo:
      "सभी सुविधाओं का अन्वेषण करने के लिए अतिथि के रूप में जारी रखें। आपकी प्रगति स्थानीय रूप से सहेजी जाएगी।",
    loginFeaturesTitle: "आपको क्या मिलेगा:",
    featureRoadmaps: "व्यक्तिगत न्यायिक रोडमैप",
    featureSimulation: "न्यायाधीश सिमुलेशन अभ्यास",
    featureScoring: "योग्यता स्कोरिंग और बैज",
    featureExams: "परीक्षा तैयारी मार्गदर्शन",

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
      "30 सेकंद में अपना व्यक्तिगत न्यायिक करियर रोडमैप प्राप्त करें",
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
    feature3Title: "AI असिस्टेंट",
    feature3Desc: "अपने सवालों के तुरंत जवाब पाएं",

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
    duration: "अवधि",
    optionalStep: "वैकल्पिक कदम",
    recommendedExams: "सुझाई गई परीक्षाएं",

    // Exams Section
    examsTitle: "सुझाई गई परीक्षाएं",
    clatExam: "CLAT (कॉमन लॉ एडमिशन टेस्ट)",
    ailetExam: "AILET (ऑल इंडिया लॉ एंट्रेंस टेस्ट)",
    stateCet: "राज्य लॉ CET",
    upPcsj: "UP PCS-J (न्यायिक सेवाएं)",
    mhJudicial: "महाराष्ट्र न्यायिक सेवाएं",
    biharJudicial: "बिहार न्यायिक सेवाएं",
    examPattern: "परीक्षा पैटर्न",
    eligibility: "पात्रता",
    ageLimit: "आयु सीमा",
    attempts: "प्रयास",
    frequency: "आवृत्ति",
    officialWebsite: "आधिकारिक वेबसाइट",

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
    installPrompt: "ऑफलाइन एक्सेस के लिए न्याय-उदय ऐप इंस्टॉल करें?",

    // Auth Messages
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

    // Assistant Messages
    assistantWelcome:
      "नमस्ते! मैं न्याय असिस्टेंट हूं, आपका न्यायिक करियर मार्गदर्शक। आज मैं आपकी कैसे मदद कर सकता हूं?",
    judgePathGeneral:
      "न्यायाधीश बनने का रास्ता:\n1. LLB डिग्री पूरी करें\n2. बार काउंसिल पंजीकरण\n3. न्यायिक सेवा परीक्षा की तैयारी\n4. राज्य न्यायिक परीक्षा पास करें\n5. न्यायिक प्रशिक्षण\n\nकृपया अपनी वर्तमान शिक्षा बताएं?",
    clatInfo:
      "CLAT (कॉमन लॉ एडमिशन टेस्ट):\n• NLU में प्रवेश के लिए राष्ट्रीय परीक्षा\n• पात्रता: कक्षा 12, 45% अंक (SC/ST के लिए 40%)\n• आयु सीमा: नहीं\n• पैटर्न: 150 MCQs\n• विषय: अंग्रेजी, सामान्य ज्ञान, गणित, कानूनी योग्यता\n• वेबसाइट: consortiumofnlus.ac.in",
    assistantDefault:
      "मुझे समझ नहीं आया। कृपया अपना प्रश्न दोबारा पूछें। मैं इन विषयों में मदद कर सकता हूं:\n• '12वीं के बाद न्यायाधीश कैसे बनें?'\n• 'महाराष्ट्र में कौन सी परीक्षा चाहिए?'\n• 'न्यायिक परीक्षा की आयु सीमा क्या है?'\n• 'CLAT परीक्षा के बारे में बताएं'\n• 'न्यायाधीश का वेतन कितना है?'\n• 'न्यायिक परीक्षा की तैयारी कैसे करें?'\n• 'कौन सी किताबें पढ़नी चाहिए?'",

    // Footer
    copyright: "न्याय-उदय © 2026 • न्यायिक करियर डिस्कवरी प्लेटफॉर्म",
    builtForIndia:
      "भारत के लिए निर्मित • 2G नेटवर्क पर काम करता है • हमेशा मुफ्त",
  },

  mr: {
    // Login Screen
    loginWelcome: "न्याय-उदय मध्ये आपले स्वागत आहे",
    loginSubtitle: "तुमचे न्यायिक करिअर डिस्कव्हरी प्लॅटफॉर्म",
    continueGuest: "पाहुणा म्हणून सुरू ठेवा",
    signIn: "साइन इन करा",
    createAccount: "खाते तयार करा",
    forgotPassword: "पासवर्ड विसरलात?",
    loginInfo:
      "सर्व वैशिष्ट्ये एक्सप्लोर करण्यासाठी पाहुणा म्हणून सुरू ठेवा. तुमची प्रगती स्थानिकरित्या जतन केली जाईल.",
    loginFeaturesTitle: "तुम्हाला काय मिळेल:",
    featureRoadmaps: "वैयक्तिक न्यायिक रोडमॅप",
    featureSimulation: "न्यायाधीश सिम्युलेशन व्यायाम",
    featureScoring: "योग्यतेचे स्कोरिंग आणि बॅज",
    featureExams: "परीक्षा तयारी मार्गदर्शन",

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
    feature3Title: "AI सहायक",
    feature3Desc: "तुमच्या प्रश्नांची त्वरित उत्तरे मिळवा",

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
    duration: "कालावधी",
    optionalStep: "पर्यायी पायरी",
    recommendedExams: "शिफारस केलेल्या परीक्षा",

    // Exams Section
    examsTitle: "शिफारस केलेल्या परीक्षा",
    clatExam: "CLAT (कॉमन लॉ अॅडमिशन टेस्ट)",
    ailetExam: "AILET (ऑल इंडिया लॉ एंट्रन्स टेस्ट)",
    stateCet: "राज्य लॉ CET",
    upPcsj: "UP PCS-J (न्यायिक सेवा)",
    mhJudicial: "महाराष्ट्र न्यायिक सेवा",
    biharJudicial: "बिहार न्यायिक सेवा",
    examPattern: "परीक्षा पॅटर्न",
    eligibility: "पात्रता",
    ageLimit: "वय मर्यादा",
    attempts: "प्रयत्न",
    frequency: "वारंवारता",
    officialWebsite: "अधिकृत संकेतस्थळ",

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
    installPrompt: "ऑफलाइन ॲक्सेससाठी न्याय-उदय ॲप इंस्टॉल करा?",

    // Auth Messages
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

    // Assistant Messages
    assistantWelcome:
      "नमस्कार! मी न्याय सहायक आहे, तुमचा न्यायिक करिअर मार्गदर्शक. आज मी तुमची कशी मदत करू शकतो?",
    assistantDefault:
      "मला समजले नाही. कृपया तुमचा प्रश्न पुन्हा विचारा. मी या विषयांमध्ये मदत करू शकतो:\n• '12वीनंतर न्यायाधीश कसे व्हावे?'\n• 'महाराष्ट्रात कोणती परीक्षा हवी?'\n• 'न्यायिक परीक्षेची वय मर्यादा काय आहे?'\n• 'CLAT परीक्षेबद्दल सांगा'\n• 'न्यायाधीशाचा पगार किती आहे?'\n• 'न्यायिक परीक्षेची तयारी कशी करावी?'\n• 'कोणती पुस्तके वाचावीत?'",

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
