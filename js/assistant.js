// Nyaya Assistant - AI Assistant for Judicial Career Guidance
// Uses rule-based keyword matching and Web Speech API for voice input

import { getText, getCurrentLanguage } from "./language.js";

class NyayaAssistant {
  constructor() {
    this.isOpen = false;
    this.isListening = false;
    this.recognition = null;
    this.currentLang = getCurrentLanguage();
    this.isProcessing = false; // Prevent multiple responses
    this.conversationHistory = []; // Track conversation context
    this.init();
  }

  init() {
    this.bindEvents();
    this.initSpeechRecognition();
    this.loadLocalResponses();
  }

  bindEvents() {
    // Assistant button
    const assistantBtn = document.getElementById("assistantBtn");
    if (assistantBtn) {
      assistantBtn.addEventListener("click", () => {
        this.toggleAssistant();
      });
    }

    // Close button
    const closeBtn = document.getElementById("closeAssistant");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.closeAssistant();
      });
    }

    // Send message button
    const sendBtn = document.getElementById("sendMessageBtn");
    if (sendBtn) {
      sendBtn.addEventListener("click", () => {
        this.sendMessage();
      });
    }

    // Enter key in input field
    const chatInput = document.getElementById("chatInput");
    if (chatInput) {
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.sendMessage();
        }
      });
    }

    // Voice input button
    const voiceBtn = document.getElementById("voiceInputBtn");
    if (voiceBtn) {
      voiceBtn.addEventListener("click", () => {
        this.toggleVoiceInput();
      });
    }

    // Quick question buttons
    this.bindQuickQuestions();

    // Close assistant when clicking outside
    const modal = document.getElementById("assistantModal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target.id === "assistantModal") {
          this.closeAssistant();
        }
      });
    }
  }

  bindQuickQuestions() {
    // Remove existing event listeners first to prevent duplication
    document.querySelectorAll(".quick-question").forEach((button) => {
      button.replaceWith(button.cloneNode(true));
    });

    // Rebind all quick question buttons
    document.querySelectorAll(".quick-question").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const question = e.target.getAttribute("data-question");
        if (question && !this.isProcessing) {
          document.getElementById("chatInput").value = question;
          this.sendMessage();
        }
      });
    });
  }

  initSpeechRecognition() {
    // Check if browser supports speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();

      // Configure recognition
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.getSpeechLanguage();

      // Handle recognition results
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("chatInput").value = transcript;
        this.updateVoiceStatus("Voice recognized");

        // Auto-send after recognition
        setTimeout(() => {
          if (!this.isProcessing) {
            this.sendMessage();
          }
        }, 500);
      };

      // Handle errors
      this.recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        this.updateVoiceStatus("Voice recognition failed");
        this.stopListening();
      };

      // Handle end of recognition
      this.recognition.onend = () => {
        this.stopListening();
      };
    } else {
      console.warn("Speech recognition not supported in this browser");
      document.getElementById("voiceInputBtn").style.display = "none";
    }
  }

  getSpeechLanguage() {
    // Map app languages to speech recognition languages
    const languageMap = {
      en: "en-IN", // English India
      hi: "hi-IN", // Hindi India
      mr: "mr-IN", // Marathi India
    };
    return languageMap[this.currentLang] || "en-IN";
  }

  toggleAssistant() {
    const modal = document.getElementById("assistantModal");
    if (!this.isOpen) {
      modal.style.display = "flex";
      this.isOpen = true;
      // Focus on input field
      setTimeout(() => {
        document.getElementById("chatInput").focus();
      }, 100);
    } else {
      this.closeAssistant();
    }
  }

  closeAssistant() {
    const modal = document.getElementById("assistantModal");
    modal.style.display = "none";
    this.isOpen = false;
    this.stopListening();
  }

  toggleVoiceInput() {
    if (!this.recognition) {
      this.updateVoiceStatus("Voice input not supported");
      return;
    }

    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening() {
    try {
      this.recognition.start();
      this.isListening = true;
      document.getElementById("voiceInputBtn").classList.add("listening");
      this.updateVoiceStatus("Listening... Speak now");
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      this.updateVoiceStatus("Unable to start voice input");
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
    this.isListening = false;
    document.getElementById("voiceInputBtn").classList.remove("listening");
    this.updateVoiceStatus("");
  }

  updateVoiceStatus(message) {
    document.getElementById("voiceStatus").textContent = message;
  }

  sendMessage() {
    if (this.isProcessing) {
      console.log("Already processing a message, please wait...");
      return;
    }

    const inputField = document.getElementById("chatInput");
    const message = inputField.value.trim();

    if (!message) return;

    // Add user message to chat
    this.addMessage(message, "user");

    // Clear input field
    inputField.value = "";

    // Show typing indicator
    this.showTypingIndicator();

    // Process message after a short delay
    setTimeout(() => {
      this.processMessage(message);
    }, 800);
  }

  addMessage(text, sender) {
    const chatMessages = document.getElementById("chatMessages");

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    const avatarDiv = document.createElement("div");
    avatarDiv.className = "message-avatar";

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";

    if (sender === "user") {
      avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
      contentDiv.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
      // Store in conversation history
      this.conversationHistory.push({ type: "user", text: text });
    } else {
      avatarDiv.innerHTML = '<i class="fas fa-scale-balanced"></i>';
      // Format response with line breaks
      const formattedText = text.replace(/\n/g, "<br>");
      contentDiv.innerHTML = `<p>${formattedText}</p>`;
      // Store in conversation history
      this.conversationHistory.push({ type: "assistant", text: text });
    }

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageDiv;
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  showTypingIndicator() {
    const chatMessages = document.getElementById("chatMessages");

    const typingDiv = document.createElement("div");
    typingDiv.className = "message assistant";
    typingDiv.id = "typingIndicator";

    const avatarDiv = document.createElement("div");
    avatarDiv.className = "message-avatar";
    avatarDiv.innerHTML = '<i class="fas fa-scale-balanced"></i>';

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";

    const dotsDiv = document.createElement("div");
    dotsDiv.className = "typing-indicator";
    dotsDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;

    contentDiv.appendChild(dotsDiv);
    typingDiv.appendChild(avatarDiv);
    typingDiv.appendChild(contentDiv);
    chatMessages.appendChild(typingDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  processMessage(message) {
    this.isProcessing = true;

    // Hide typing indicator
    this.hideTypingIndicator();

    // Get response based on keywords
    const response = this.getResponse(message.toLowerCase());

    // Add assistant response
    this.addMessage(response, "assistant");

    this.isProcessing = false;
  }

  getResponse(message) {
    // Load user's current state and education from app state
    const userState = window.AppState?.currentUser?.state || "";
    const userEducation = window.AppState?.currentUser?.education || "";

    // Convert state code to full name for responses
    const stateNames = {
      up: "Uttar Pradesh",
      mh: "Maharashtra",
      wb: "West Bengal",
      br: "Bihar",
      mp: "Madhya Pradesh",
      tn: "Tamil Nadu",
      rj: "Rajasthan",
      ka: "Karnataka",
      gj: "Gujarat",
      ap: "Andhra Pradesh",
      od: "Odisha",
      ts: "Telangana",
      kl: "Kerala",
      jh: "Jharkhand",
      as: "Assam",
      pb: "Punjab",
      ct: "Chhattisgarh",
      hr: "Haryana",
      uk: "Uttarakhand",
      hp: "Himachal Pradesh",
      dl: "Delhi",
      jk: "Jammu & Kashmir",
    };

    const stateName = stateNames[userState] || "your state";
    const lang = getCurrentLanguage();

    // Enhanced greeting detection
    if (
      this.containsAny(message, [
        "hello",
        "hi",
        "hey",
        "namaste",
        "good morning",
        "good afternoon",
        "good evening",
      ])
    ) {
      const greetings = [
        `Hello! I'm Nyaya Assistant, your AI guide for judicial career paths. How can I help you today?`,
        `Hi there! I'm here to help you navigate your journey to becoming a judge. What would you like to know?`,
        `Namaste! Welcome to Nyaya Assistant. How can I assist with your judicial career today?`,
        `Greetings! I'm your judicial career guide. Feel free to ask me anything about becoming a judge.`,
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Check if this is a follow-up question
    const lastMessage =
      this.conversationHistory[this.conversationHistory.length - 2];
    const isFollowUp =
      lastMessage &&
      lastMessage.type === "assistant" &&
      (message.includes("yes") ||
        message.includes("ok") ||
        message.includes("more") ||
        message.includes("tell me") ||
        message.includes("explain"));

    // Keyword-based response matching with improved logic
    if (
      this.containsAny(message, [
        "judge",
        "become judge",
        "judicial",
        "become a judge",
      ])
    ) {
      if (
        this.containsAny(message, [
          "12th",
          "12",
          "intermediate",
          "higher secondary",
          "after 12",
          "12th pass",
        ])
      ) {
        return this.getJudicialPathAfter12th(stateName, userState, isFollowUp);
      } else if (
        this.containsAny(message, [
          "graduate",
          "graduation",
          "degree",
          "after graduation",
          "graduated",
        ])
      ) {
        return this.getJudicialPathAfterGraduation(
          stateName,
          userState,
          isFollowUp,
        );
      } else if (
        this.containsAny(message, [
          "llb",
          "after llb",
          "llb graduate",
          "law degree",
        ])
      ) {
        return this.getJudicialPathAfterLLB(stateName, userState, isFollowUp);
      } else {
        return (
          getText(lang, "judgePathGeneral") +
          `\n\nAre you currently in school, college, or have completed LLB?`
        );
      }
    } else if (
      this.containsAny(message, [
        "exam",
        "examination",
        "test",
        "pattern",
        "syllabus",
      ])
    ) {
      if (this.containsAny(message, ["state", stateName.toLowerCase()])) {
        return this.getStateExamInfo(userState, lang);
      } else if (this.containsAny(message, ["clat", "common law"])) {
        return this.getDetailedClatInfo();
      } else if (this.containsAny(message, ["ailet"])) {
        return this.getDetailedAiletInfo();
      } else if (
        this.containsAny(message, [
          "judicial service",
          "pcs",
          "pcs-j",
          "state judicial",
        ])
      ) {
        return this.getJudicialServiceExamInfo(stateName, userState);
      } else if (this.containsAny(message, ["syllabus", "what to study"])) {
        return this.getJudicialExamSyllabus();
      } else if (
        this.containsAny(message, ["pattern", "format", "type of questions"])
      ) {
        return this.getExamPattern();
      } else {
        return getText(lang, "examInfoGeneral");
      }
    } else if (
      this.containsAny(message, [
        "age",
        "age limit",
        "maximum age",
        "minimum age",
        "age criteria",
      ])
    ) {
      return this.getAgeLimitDetails(stateName);
    } else if (
      this.containsAny(message, [
        "eligibility",
        "qualification",
        "required",
        "criteria",
      ])
    ) {
      return this.getEligibilityDetails(stateName);
    } else if (
      this.containsAny(message, [
        "salary",
        "pay",
        "income",
        "package",
        "earnings",
      ])
    ) {
      return this.getSalaryDetails();
    } else if (
      this.containsAny(message, [
        "preparation",
        "prepare",
        "study",
        "books",
        "study material",
        "how to prepare",
      ])
    ) {
      return this.getPreparationTips(stateName);
    } else if (
      this.containsAny(message, [
        "llb",
        "law degree",
        "law college",
        "law school",
        "law admission",
      ])
    ) {
      return this.getLLBProgramsInfo();
    } else if (
      this.containsAny(message, [
        "roadmap",
        "path",
        "career path",
        "timeline",
        "step by step",
      ])
    ) {
      if (userState && userEducation) {
        return `I see you're from ${stateName} with ${this.getEducationLabel(userEducation)}. Would you like me to generate a personalized judicial career roadmap for you? You can also go to the Home section and click "Generate My Roadmap" for a detailed step-by-step plan.`;
      } else {
        return getText(lang, "roadmapHelp");
      }
    } else if (
      this.containsAny(message, [
        "college",
        "university",
        "institute",
        "best college",
      ])
    ) {
      return this.getTopLawColleges();
    } else if (
      this.containsAny(message, [
        "subject",
        "paper",
        "law subject",
        "important subject",
      ])
    ) {
      return this.getImportantSubjects();
    } else if (
      this.containsAny(message, [
        "attempt",
        "number of attempts",
        "how many times",
      ])
    ) {
      return this.getAttemptDetails(stateName);
    } else if (
      this.containsAny(message, [
        "cutoff",
        "cut off",
        "marks",
        "qualifying marks",
      ])
    ) {
      return this.getCutoffInfo();
    } else if (
      this.containsAny(message, ["interview", "viva", "personality test"])
    ) {
      return this.getInterviewTips();
    } else if (
      this.containsAny(message, ["training", "probation", "post selection"])
    ) {
      return this.getTrainingDetails();
    } else if (
      this.containsAny(message, [
        "promotion",
        "career growth",
        "next level",
        "higher judge",
      ])
    ) {
      return this.getPromotionPath();
    } else if (
      this.containsAny(message, [
        "reservation",
        "quota",
        "category",
        "sc st",
        "obc",
      ])
    ) {
      return this.getReservationDetails();
    } else if (
      this.containsAny(message, [
        "form",
        "application",
        "apply",
        "how to apply",
      ])
    ) {
      return this.getApplicationProcess();
    } else if (
      this.containsAny(message, ["fee", "application fee", "exam fee"])
    ) {
      return this.getFeeStructure();
    } else if (this.containsAny(message, ["center", "exam center", "venue"])) {
      return this.getExamCenterInfo();
    } else if (
      this.containsAny(message, [
        "document",
        "required document",
        "certificate",
      ])
    ) {
      return this.getRequiredDocuments();
    } else if (
      this.containsAny(message, [
        "coaching",
        "institute",
        "classes",
        "best coaching",
      ])
    ) {
      return this.getCoachingInfo(stateName);
    } else if (
      this.containsAny(message, [
        "online",
        "website",
        "portal",
        "official website",
      ])
    ) {
      return this.getOfficialWebsites(userState);
    } else if (
      this.containsAny(message, [
        "thank",
        "thanks",
        "dhanyavad",
        "shukriya",
        "thank you",
      ])
    ) {
      const thanks = [
        "You're welcome! Feel free to ask if you have more questions about your judicial career journey.",
        "Glad I could help! Don't hesitate to ask if you need more information.",
        "My pleasure! All the best for your judicial career preparation.",
        "Happy to assist! Remember, consistency is key in judicial exam preparation.",
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    } else if (
      this.containsAny(message, ["help", "support", "guide", "what can you do"])
    ) {
      return getText(lang, "assistantHelp");
    } else if (
      this.containsAny(message, ["bye", "goodbye", "see you", "exit"])
    ) {
      return "Goodbye! Best of luck with your judicial career preparation. Feel free to return anytime you need guidance.";
    }

    // Default response for unknown queries
    return getText(lang, "assistantDefault");
  }

  // Enhanced response methods
  getJudicialPathAfter12th(stateName, state, isFollowUp) {
    if (isFollowUp) {
      return `To give you more specific guidance for ${stateName}:\n\n1. Complete Class 12 in Arts stream (recommended) or any stream\n2. Appear for entrance exams: CLAT, AILET, or state-specific law entrance tests\n3. Join 5-year integrated BA LLB or BBA LLB program\n4. During LLB: Focus on Constitution, IPC, CrPC, Evidence Act\n5. Intern at district courts during vacations\n6. After LLB: Register with State Bar Council\n7. Practice law for 1-2 years (optional but beneficial)\n8. Start preparing for ${stateName} Judicial Services Exam\n\nWould you like information about law colleges in ${stateName}?`;
    }

    return `To become a judge after 12th in ${stateName}:\n\n1. Complete Class 12 in any stream (Arts recommended for better foundation)\n2. Appear for CLAT/AILET/state law entrance tests\n3. Complete 5-year integrated LLB program from recognized university\n4. Register with Bar Council of your state\n5. Gain court practice experience (highly recommended)\n6. Prepare for ${stateName} Judicial Services exam\n7. Age criteria: Usually 22-35 years (with relaxation for reserved categories)\n8. Clear Prelims, Mains, and Interview\n\nWould you like more detailed step-by-step guidance?`;
  }

  getJudicialPathAfterGraduation(stateName, state, isFollowUp) {
    if (isFollowUp) {
      return `For graduates in ${stateName}:\n\nDetailed Steps:\n1. Complete 3-year LLB from a recognized university\n2. During LLB: Focus on procedural laws and bare acts\n3. Register with State Bar Council immediately after LLB\n4. Start practicing in district courts to gain practical knowledge\n5. Join judicial exam coaching if needed\n6. Prepare specific subjects for ${stateName} Judicial Services\n7. Practice previous 10 years' question papers\n8. Join test series for mock exams\n\nImportant: Some states require minimum practice experience. Check ${stateName} PSC website for exact requirements.`;
    }

    return `To become a judge after graduation in ${stateName}:\n\n1. Complete 3-year LLB after graduation in any discipline\n2. Register with Bar Council\n3. Gain court practice experience (varies by state, typically 1-3 years)\n4. Prepare for ${stateName} Judicial Services exam\n5. Age: Minimum 21-22 years, Maximum 35 years (with relaxation)\n6. Clear three stages: Preliminary, Mains, and Interview\n7. Medical fitness test\n8. Training period after selection\n\nNeed more details about any specific step?`;
  }

  getJudicialPathAfterLLB(stateName, state, isFollowUp) {
    return `After completing LLB in ${stateName}:\n\nImmediate Steps:\n1. Register with State Bar Council\n2. Start practicing in district courts (minimum 2-3 years recommended)\n3. Study specific subjects for judicial exams:\n   • Civil Procedure Code\n   • Criminal Procedure Code\n   • Indian Evidence Act\n   • Indian Penal Code\n   • Constitution of India\n   • Local laws specific to ${stateName}\n4. Join coaching classes or online courses\n5. Read important Supreme Court and High Court judgments\n6. Follow legal journals and magazines\n7. Practice writing judgments\n\nWould you like book recommendations for ${stateName} judicial exam?`;
  }

  getDetailedClatInfo() {
    return `CLAT 2024 Details:\n\n• Exam Level: National\n• Conducting Body: Consortium of NLUs\n• Eligibility: Class 12 with 45% (40% for SC/ST)\n• No age limit for UG programs\n• Exam Pattern:\n  - Total Questions: 120\n  - Duration: 2 hours\n  - Type: Multiple Choice Questions\n  - Marking: +1 for correct, -0.25 for incorrect\n\nSections:\n1. English Language: 28-32 questions\n2. Current Affairs: 35-39 questions\n3. Legal Reasoning: 35-39 questions\n4. Logical Reasoning: 28-32 questions\n5. Quantitative Techniques: 13-17 questions\n\nTop NLUs through CLAT:\n1. NLSIU Bangalore\n2. NALSAR Hyderabad\n3. NLIU Bhopal\n4. WBNUJS Kolkata\n5. NLU Delhi (through AILET)\n\nWebsite: consortiumofnlus.ac.in`;
  }

  getDetailedAiletInfo() {
    return `AILET 2024 Details:\n\n• For: National Law University, Delhi\n• Eligibility: Class 12 with 50% (45% for SC/ST)\n• Age: Below 20 years (22 for reserved categories)\n• Exam Pattern:\n  - Total Questions: 150\n  - Duration: 1 hour 30 minutes\n  - Subjects:\n    • English: 35 questions\n    • General Knowledge: 35 questions\n    • Legal Aptitude: 35 questions\n    • Reasoning: 35 questions\n    • Elementary Mathematics: 10 questions\n\nSeats: Total 123 seats (including reserved categories)\nApplication Fee: General ₹3050, SC/ST ₹1050\nWebsite: nludelhi.ac.in`;
  }

  getJudicialServiceExamInfo(stateName, state) {
    const stateSpecificInfo = {
      up: `UP PCS-J Exam Pattern:\n\n• Preliminary Exam: 150 MCQs (2 hours)\n• Main Exam: 5 descriptive papers\n• Interview: 100 marks\n\nPrelims Subjects:\n1. General Knowledge\n2. Law\n\nMains Subjects:\n1. General Knowledge\n2. Language\n3. Law-I (Substantive Law)\n4. Law-II (Procedure & Evidence)\n5. Law-III (Penal, Revenue & Local Laws)\n\nOfficial Website: uppsc.up.nic.in`,
      mh: `Maharashtra Judicial Services:\n\n• Preliminary: 100 MCQs\n• Main: 4 papers\n• Interview: 50 marks\n\nAge: 21-35 years\nApplication Fee: ₹394\nOfficial Website: mpsc.gov.in`,
      br: `Bihar Judicial Services:\n\n• Preliminary: 100 MCQs\n• Main: 5 papers\n• Interview: 100 marks\n\nAge: 22-35 years\nAttempts: General-4, OBC-7, SC/ST-No limit\nWebsite: bpsc.bih.nic.in`,
      default: `Judicial Service Exam in ${stateName}:\n\nTypical Pattern:\n1. Preliminary Exam: Objective type\n2. Main Exam: Descriptive/subjective\n3. Interview/Viva Voce\n4. Medical Examination\n\nCommon Subjects:\n• Constitutional Law\n• Civil Procedure Code\n• Criminal Procedure Code\n• Evidence Act\n• Indian Penal Code\n• Local Laws\n• General Knowledge\n• Language (English & Regional)\n\nCheck ${stateName} Public Service Commission website for exact pattern.`,
    };

    return stateSpecificInfo[state] || stateSpecificInfo.default;
  }

  getJudicialExamSyllabus() {
    return `Judicial Exam Syllabus (Common):\n\nCore Subjects:\n1. Constitution of India\n   • Fundamental Rights\n   • Directive Principles\n   • Emergency Provisions\n   • Amendment Procedures\n\n2. Code of Civil Procedure, 1908\n   • Jurisdiction of Courts\n   • Pleadings\n   • Appeals\n   • Execution of Decrees\n\n3. Indian Penal Code, 1860\n   • General Exceptions\n   • Specific Offences\n   • Punishments\n\n4. Code of Criminal Procedure, 1973\n   • Investigation\n   • Trial Procedures\n   • Bail\n   • Appeals\n\n5. Indian Evidence Act, 1872\n   • Relevancy of Facts\n   • Admissions & Confessions\n   • Examination of Witnesses\n\n6. Specific Relief Act\n7. Transfer of Property Act\n8. Contract Act\n9. Hindu & Muslim Law\n10. Local Laws of your state\n\nWould you like book recommendations for any specific subject?`;
  }

  getExamPattern() {
    return `Judicial Exam Pattern (Typical):\n\nStage 1: Preliminary Exam\n• Type: Multiple Choice Questions\n• Questions: 100-150\n• Duration: 2 hours\n• Negative Marking: Usually 0.25 per wrong answer\n• Subjects: General Knowledge + Law\n\nStage 2: Main Exam (Descriptive)\n• Papers: 4-5\n• Duration: 3 hours each\n• Subjects:\n  Paper 1: Language (Essay, Translation, Grammar)\n  Paper 2: Law-I (Substantive Law)\n  Paper 3: Law-II (Procedure & Evidence)\n  Paper 4: Law-III (Local Laws)\n  Paper 5: General Knowledge\n\nStage 3: Interview\n• Marks: 50-100\n• Duration: 20-30 minutes\n• Focus: Personality, Legal Knowledge, Current Affairs\n\nStage 4: Medical Examination`;
  }

  getAgeLimitDetails(stateName) {
    return `Age Limits for Judicial Services (General Guidelines):\n\n• Minimum Age: 21-22 years\n• Maximum Age: 35 years\n\nRelaxations:\n• OBC: 3 years (Up to 38 years)\n• SC/ST: 5 years (Up to 40 years)\n• Physically Handicapped: Additional 10 years\n• Ex-servicemen: As per state rules\n\nState Variations:\n• Delhi: 21-32 years\n• Rajasthan: 23-35 years\n• Madhya Pradesh: 21-35 years\n• West Bengal: 23-35 years\n• Tamil Nadu: 25-35 years\n\nNote: Age calculated as on 1st January of exam year. Check ${stateName} PSC notification for exact dates.`;
  }

  getEligibilityDetails(stateName) {
    return `Eligibility Criteria for Judicial Services:\n\nEssential Qualifications:\n1. Bachelor of Laws (LLB) from recognized university\n2. Registered with State Bar Council\n3. Indian Citizen\n4. Good character certificate from university/employer\n5. Physically and mentally fit\n\nAdditional Requirements:\n• Some states require minimum practice experience\n   - Fresh graduates: No experience required in most states\n   - Direct District Judge: 7 years practice\n• No criminal record\n• Not dismissed from government service\n\nDocumentary Proof Required:\n1. LLB Degree & Marksheets\n2. Bar Council Registration Certificate\n3. Age Proof (10th Certificate)\n4. Caste Certificate (if applicable)\n5. Domicile Certificate (for some states)\n6. No Objection Certificate (if employed)\n\nCheck ${stateName} PSC website for exact eligibility.`;
  }

  getSalaryDetails() {
    return `Judicial Salary Structure (7th Pay Commission):\n\nEntry Level (Civil Judge Jr. Division):\n• Basic Pay: ₹77,840\n• Grade Pay: ₹9,000\n• Gross Salary: ₹1,20,000 - ₹1,40,000/month\n\nCivil Judge (Sr. Division):\n• Basic Pay: ₹1,00,000 - ₹1,20,000\n• Gross Salary: ₹1,50,000 - ₹1,80,000/month\n\nDistrict Judge:\n• Basic Pay: ₹1,44,840 - ₹1,94,660\n• Gross Salary: ₹2,00,000 - ₹2,50,000/month\n\nHigh Court Judge:\n• Basic Pay: ₹2,50,000\n• Gross Salary: ₹3,50,000+/month\n\nPerks & Allowances:\n• Dearness Allowance (DA)\n• House Rent Allowance (HRA)\n• Travel Allowance (TA)\n• Medical Benefits\n• Pension after retirement\n• Official residence & vehicle (for higher positions)`;
  }

  getPreparationTips(stateName) {
    return `Judicial Exam Preparation Strategy:\n\nPhase 1: Foundation (3-4 months)\n• Read bare acts thoroughly\n• Make subject-wise notes\n• Read standard textbooks\n• Understand landmark judgments\n\nPhase 2: Intensive Study (4-5 months)\n• Focus on procedural laws (CPC, CrPC)\n• Practice writing answers\n• Solve previous years' papers\n• Join test series\n\nPhase 3: Revision (2-3 months)\n• Daily revision of important sections\n• Mock interviews\n• Current affairs updates\n• Speed writing practice\n\nRecommended Books:\n1. Constitution: DD Basu\n2. IPC: KD Gaur\n3. CrPC: Kelkar\n4. CPC: Takwani\n5. Evidence Act: Batuk Lal\n6. Contract: Avtar Singh\n\nDaily Study Plan:\n• Morning: New topics (3 hours)\n• Afternoon: Revision (2 hours)\n• Evening: Practice questions (2 hours)\n• Night: Current affairs & reading (1 hour)`;
  }

  getLLBProgramsInfo() {
    return `LLB Programs in India:\n\n1. 5-Year Integrated LLB (After 12th):\n   • BA LLB, BBA LLB, BCom LLB, BSc LLB\n   • Duration: 5 years (10 semesters)\n   • Admission: CLAT, AILET, state CETs\n   • Top Colleges: NLUs, DU, Symbiosis, ILS\n\n2. 3-Year LLB (After Graduation):\n   • Duration: 3 years (6 semesters)\n   • Eligibility: Graduation with 45-50%\n   • Admission: Entrance tests or merit\n   • Top Colleges: Campus Law Centre (DU), Govt. Law Colleges\n\nSelection Process:\n• National Level: CLAT, AILET\n• State Level: MH CET Law, TS LAWCET, AP LAWCET\n• University Level: DU LLB, PU LLB\n\nTop 10 Law Colleges:\n1. NLSIU Bangalore\n2. NALSAR Hyderabad\n3. NLU Delhi\n4. WBNUJS Kolkata\n5. NLU Jodhpur\n6. Symbiosis Law School\n7. Faculty of Law, Delhi University\n8. ILS Law College, Pune\n9. Gujarat National Law University\n10. Rajiv Gandhi School of IP Law\n\nWebsite for CLAT: consortiumofnlus.ac.in`;
  }

  // Additional specialized methods
  getTopLawColleges() {
    return `Top Law Colleges in India:\n\nNational Law Universities (NLUs):\n1. NLSIU Bangalore (1st ranked)\n2. NALSAR Hyderabad\n3. NLU Delhi\n4. WBNUJS Kolkata\n5. NLIU Bhopal\n6. NLU Jodhpur\n7. HNLU Raipur\n8. GNLU Gandhinagar\n9. RGNUL Patiala\n10. CNLU Patna\n\nOther Premier Institutes:\n• Faculty of Law, Delhi University\n• Symbiosis Law School, Pune\n• ILS Law College, Pune\n• Government Law College, Mumbai\n• Campus Law Centre, Delhi\n• Law Faculty, BHU\n• AMU Law Faculty\n\nAdmission: Through CLAT, AILET, or university entrance tests\nAverage Fees: ₹1-3 lakhs/year (varies by institute)\nPlacement: Top law firms, corporate houses, judiciary`;
  }

  getImportantSubjects() {
    return `Most Important Subjects for Judicial Exams:\n\nHigh Priority (Weightage 60-70%):\n1. Code of Civil Procedure, 1908\n2. Code of Criminal Procedure, 1973\n3. Indian Evidence Act, 1872\n4. Indian Penal Code, 1860\n5. Constitution of India\n\nMedium Priority (Weightage 20-30%):\n6. Transfer of Property Act\n7. Specific Relief Act\n8. Indian Contract Act\n9. Hindu Law & Muslim Law\n10. Limitation Act\n\nLow Priority (Weightage 10-15%):\n11. Local Laws of your state\n12. Court Fees Act\n13. Registration Act\n14. Legal Maxims\n15. Important Case Laws\n\nFocus Areas:\n• Definitions in each act\n• Important sections with case laws\n• Procedural aspects\n• Recent amendments\n• Landmark Supreme Court judgments`;
  }

  getAttemptDetails(stateName) {
    return `Number of Attempts for Judicial Exams:\n\nGeneral Guidelines:\n• General Category: 4-6 attempts\n• OBC Category: 7-9 attempts\n• SC/ST Category: No limit (varies by state)\n• Physically Handicapped: Additional attempts\n\nState-wise Variations:\n• Uttar Pradesh: General-6, OBC-9, SC/ST-No limit\n• Bihar: General-4, OBC-7, SC/ST-No limit\n• Maharashtra: Varies by category\n• Madhya Pradesh: General-6, Others-No limit\n• Rajasthan: General-5, OBC-8, SC/ST-No limit\n\nImportant Notes:\n1. Attempts counted from first appearance\n2. If qualified prelims but not mains, attempt counted\n3. Age criteria more important than attempt limit\n4. Check latest notification for exact rules\n\nBest Strategy: Prepare thoroughly for 1-2 attempts maximum`;
  }

  getStateExamInfo(state, lang) {
    const stateExamInfo = {
      up: "UP PCS-J (Uttar Pradesh Judicial Services)\n• Conducted by: UPPSC\n• Age: 22-35 years\n• Attempts: General-6, OBC-9, SC/ST-No limit\n• Application: Online through uppsc.up.nic.in\n• Frequency: Usually yearly\n• Last Exam: 2023 (Notification expected 2024)\n• Contact: 0532-2409177",
      mh: "Maharashtra Judicial Services\n• Conducted by: MPSC\n• Age: 21-35 years\n• Application Fee: ₹394 for General\n• Exam Centers: Major cities in Maharashtra\n• Official Website: mpsc.gov.in\n• Helpline: 020-25644774\n• Selection: Prelims, Mains, Interview",
      br: "Bihar Judicial Services\n• Conducted by: BPSC\n• Age: 22-35 years\n• Attempts: General-4, OBC-7, SC/ST-No limit\n• Exam Pattern: 100 MCQs (Prelims), 5 papers (Mains)\n• Website: bpsc.bih.nic.in\n• Contact: 0612-2215890",
      wb: "West Bengal Judicial Services\n• Conducted by: WBPSC\n• Age: 23-35 years\n• Application: pscwb.org.in\n• Exam: Usually in Kolkata\n• Language: English & Bengali\n• Contact: 033-23604401",
      tn: "Tamil Nadu Judicial Services\n• Conducted by: TNPSC\n• Age: 25-35 years\n• Qualification: Tamil language compulsory\n• Website: tnpsc.gov.in\n• Contact: 044-25300300",
      default: `For ${state} Judicial Services exam information:\n\n1. Visit State Public Service Commission website\n2. Check "Recruitment" or "Examination" section\n3. Look for "Judicial Services" notification\n4. Download information brochure\n5. Check eligibility, syllabus, and dates\n\nYou can also visit the "Roadmap" section after selecting your state for detailed guidance.`,
    };

    return stateExamInfo[state] || stateExamInfo.default;
  }

  // More specialized response methods
  getCutoffInfo() {
    return `Judicial Exam Cut-off Marks:\n\nFactors affecting cut-off:\n1. Difficulty level of paper\n2. Number of vacancies\n3. Number of applicants\n4. Reservation categories\n\nTypical Cut-off Range:\n• Preliminary Exam: 60-70% for General\n• Main Exam: 50-60% for selection\n• Final Merit: Combined score of Mains & Interview\n\nPrevious Year Trends:\n• Uttar Pradesh (2022): General - 68%, OBC - 65%, SC - 60%\n• Maharashtra (2021): General - 72%, Reserved - 67%\n• Delhi (2020): General - 75%, Others - 70%\n\nNote: Cut-off varies each year. Focus on scoring maximum rather than just cut-off.`;
  }

  getInterviewTips() {
    return `Judicial Exam Interview Preparation:\n\nCommon Questions:\n1. Why do you want to become a judge?\n2. Recent important judgments\n3. Legal principles in daily situations\n4. Ethical dilemmas\n5. Knowledge of local laws\n\nPreparation Tips:\n1. Read daily legal news\n2. Know important Supreme Court judgments (last 6 months)\n3. Understand judicial ethics\n4. Practice mock interviews\n5. Work on communication skills\n\nDress Code:\n• Formal attire (preferably traditional)\n• Neat and professional appearance\n• Avoid flashy accessories\n\nBody Language:\n• Maintain eye contact\n• Sit upright\n• Speak clearly and confidently\n• Be honest about what you don't know\n\nDuration: Usually 20-30 minutes\nMarks: 50-100 (depending on state)`;
  }

  getTrainingDetails() {
    return `Judicial Training After Selection:\n\nTraining Period: 1-2 years\nTraining Institute: State Judicial Academy\n\nTraining Components:\n1. Classroom Lectures\n   • Advanced legal principles\n   • Judgment writing\n   • Court management\n   • Ethics and conduct\n\n2. Practical Training\n   • Attachment with senior judges\n   • Court observation\n   • Drafting practice\n   • Case management\n\n3. Field Visits\n   • Prisons\n   • Juvenile homes\n   • Legal aid camps\n   • Police stations\n\nExaminations During Training:\n• Periodic tests\n• Final examination\n• Practical assessments\n\nProbation Period: Usually 2 years\nConfirmation: After successful training completion`;
  }

  getPromotionPath() {
    return `Judicial Career Progression:\n\nTypical Hierarchy:\n1. Civil Judge (Junior Division) - Entry level\n2. Civil Judge (Senior Division) - After 5 years\n3. District Judge - Through promotion/exam\n4. Additional District Judge\n5. District & Sessions Judge\n6. Registrar (High Court)\n7. Additional/Joint Registrar\n8. High Court Judge (Through elevation)\n9. Supreme Court Judge (Through elevation)\n\nPromotion Criteria:\n• Seniority\n• Annual Confidential Reports (ACR)\n• Vacancies\n• Special qualifications\n• Merit\n\nTime Frame:\n• Civil Judge Jr to Sr: 5 years\n• To District Judge: 10+ years\n• High Court Judge: 10+ years as District Judge\n\nAlternative Paths:\n• Direct District Judge exam (7 years practice)\n• Higher Judicial Service exam\n• Law Secretary positions`;
  }

  // Utility methods
  getEducationLabel(education) {
    const labels = {
      10: "Class 10th",
      12: "Class 12th",
      grad: "graduation",
      llb: "LLB studies",
      lawyer: "law practice",
    };
    return labels[education] || "your current education level";
  }

  containsAny(text, keywords) {
    return keywords.some((keyword) => text.includes(keyword));
  }

  loadLocalResponses() {
    // Responses are hardcoded for offline use
    this.responses = {
      greeting:
        "Hello! How can I assist you with your judicial career journey today?",
      farewell:
        "Thank you for using Nyaya Assistant. Best of luck with your judicial career!",
      help: "I can help you with:\n• Judicial career paths\n• Exam information\n• Eligibility criteria\n• Age limits\n• Preparation tips\n• State-specific guidance\n\nJust ask me anything!",
    };
  }

  // New specialized methods
  getReservationDetails() {
    return `Reservation in Judicial Services:\n\nConstitutional Reservations:\n• Scheduled Castes (SC): 15%\n• Scheduled Tribes (ST): 7.5%\n• Other Backward Classes (OBC): 27%\n• Economically Weaker Sections (EWS): 10%\n\nAdditional Reservations:\n• Women: 30% (in some states)\n• Physically Handicapped: 4%\n• Ex-servicemen: As per state rules\n• Domicile: Preference to state residents\n\nDocuments Required:\n1. Caste Certificate from competent authority\n2. Income Certificate (for EWS)\n3. Disability Certificate (if applicable)\n4. Domicile Certificate\n\nImportant Notes:\n• Carry original certificates for verification\n• Reservation only at entry level\n• No reservation in promotions (as per current law)\n• Creamy layer applies to OBC\n• Inter-state reservation varies`;
  }

  getApplicationProcess() {
    return `How to Apply for Judicial Exams:\n\nStep 1: Online Registration\n• Visit State PSC website\n• Create account with email & phone\n• Fill basic details\n\nStep 2: Form Filling\n• Personal information\n• Educational qualifications\n• Experience details\n• Category details\n• Exam center preference\n\nStep 3: Document Upload\n• Scanned photograph & signature\n• Educational certificates\n• Category certificate\n• Domicile certificate\n• Bar registration certificate\n\nStep 4: Fee Payment\n• Online payment: Credit/Debit card, Net Banking\n• Offline: Challan at designated banks\n• Keep payment receipt\n\nStep 5: Final Submission\n• Review all details\n• Submit application\n• Take printout\n\nImportant Dates to Remember:\n• Notification date\n• Application start & end date\n• Admit card release\n• Exam date\n• Result date\n\nAlways apply early to avoid last-minute issues.`;
  }

  getFeeStructure() {
    return `Application Fee for Judicial Exams:\n\nGeneral Category: ₹500 - ₹1000\nOBC Category: ₹300 - ₹800\nSC/ST Category: ₹100 - ₹500\nPhysically Handicapped: Usually exempted or minimal fee\nWomen: Often exempted in many states\n\nPayment Methods:\n1. Online: Credit/Debit card, Net Banking, UPI\n2. Offline: Bank Challan\n3. E-wallets: Some states accept\n\nFee Exemption Categories:\n• SC/ST candidates\n• Physically Handicapped (40%+ disability)\n• Women candidates (in some states)\n• Ex-servicemen\n• Below Poverty Line (with certificate)\n\nImportant:\n• Fee non-refundable\n• Keep payment proof until selection process ends\n• Double-check category while paying\n• Pay before deadline to avoid rejection`;
  }

  getExamCenterInfo() {
    return `Judicial Exam Centers:\n\nTypical Centers:\n• State capital\n• Major district headquarters\n• University towns\n• Sometimes in neighboring states for large states\n\nChoosing Exam Center:\n1. Select nearest center\n2. Consider travel convenience\n3. Check accommodation availability\n4. Consider traffic conditions\n\nAdmit Card Information:\n• Download 2-3 weeks before exam\n• Check name, roll number, center\n• Photo and signature should be clear\n• Carry to exam hall with ID proof\n\nID Proofs Accepted:\n• Aadhaar Card\n• Voter ID\n• Driving License\n• Passport\n• PAN Card\n\nReporting Time: Usually 1 hour before exam\nThings to Carry: Admit card, ID proof, black ball pen, water bottle`;
  }

  getRequiredDocuments() {
    return `Documents Required for Judicial Exams:\n\nEssential Documents:\n1. LLB Degree Certificate & Marksheets\n2. Bar Council Registration Certificate\n3. Class 10 Certificate (Age proof)\n4. Graduation Degree & Marksheets\n5. Category Certificate (if applicable)\n6. Domicile Certificate\n7. Character Certificate\n8. No Objection Certificate (if employed)\n\nAdditional Documents:\n9. Experience Certificate (if required)\n10. Physically Handicapped Certificate\n11. Ex-serviceman Certificate\n12. Income Certificate (for EWS)\n13. Recent Passport-size Photographs\n14. Signature Scan\n\nFormat Requirements:\n• All documents in PDF format\n• Photo: JPEG, 50-100KB, white background\n• Signature: JPEG, 20-50KB, black ink\n• Certificates: Clear scanned copies\n\nImportant: Keep multiple copies of all documents. Get category certificates from competent authorities only.`;
  }

  getCoachingInfo(stateName) {
    return `Judicial Exam Coaching Institutes:\n\nNational Level Institutes:\n1. ALS (Amity Law School)\n2. Career Launcher\n3. Success Mantra\n4. Paramount Coaching\n5. Judiciary Gold\n\nState-Specific Institutes:\n${this.getStateCoaching(stateName)}\n\nOnline Coaching Options:\n• Unacademy Judiciary\n• Byju's Judiciary\n• Testbook Judiciary\n• Law Prep Tutorial\n• Judiciary Dreams\n\nFactors to Consider:\n1. Faculty experience\n2. Success rate\n3. Study material quality\n4. Test series frequency\n5. Fee structure\n6. Location convenience\n\nSelf-Study Tips:\n1. Join online test series\n2. Form study groups\n3. Follow YouTube channels\n4. Use mobile apps\n5. Read legal blogs\n\nRemember: Coaching helps but self-study is most important.`;
  }

  getStateCoaching(state) {
    const coachingInfo = {
      up: "UP Judicial Coaching:\n• Singhania Academy, Allahabad\n• Prayagraj Coaching Center\n• GATE Academy, Lucknow\n• Success Institute, Kanpur",
      mh: "Maharashtra Judicial Coaching:\n• Yeshwantrao Chavan Law College, Pune\n• Government Law College, Mumbai\n• ILS Law College, Pune\n• Mumbai-based coaching centers",
      br: "Bihar Judicial Coaching:\n• Patna Law College\n• Chanakya IAS Academy, Patna\n• Career Point, Patna",
      default:
        "For state-specific coaching institutes:\n1. Check near state capital\n2. Contact local law colleges\n3. Search online for '[State Name] Judicial Coaching'\n4. Ask recently selected judges\n5. Join state-specific Facebook groups",
    };
    return coachingInfo[state] || coachingInfo.default;
  }

  getOfficialWebsites(state) {
    const websites = {
      up: "Uttar Pradesh: uppsc.up.nic.in",
      mh: "Maharashtra: mpsc.gov.in",
      br: "Bihar: bpsc.bih.nic.in",
      wb: "West Bengal: pscwb.org.in",
      tn: "Tamil Nadu: tnpsc.gov.in",
      rj: "Rajasthan: rpsc.rajasthan.gov.in",
      ka: "Karnataka: kpsc.kar.nic.in",
      gj: "Gujarat: gpsc.gujarat.gov.in",
      ap: "Andhra Pradesh: psc.ap.gov.in",
      ts: "Telangana: tspsc.gov.in",
      default:
        "General Websites:\n• Supreme Court: sci.gov.in\n• All India Bar Council: barouncilofindia.org\n• Law Commission: lawcommissionofindia.nic.in\n• CLAT: consortiumofnlus.ac.in\n• AILET: nludelhi.ac.in",
    };

    return `Important Official Websites:\n\nState PSC:\n${websites[state] || "Check your state PSC website"}\n\n${websites.default}`;
  }

  // Update language when changed in app
  updateLanguage(lang) {
    this.currentLang = lang;
    if (this.recognition) {
      this.recognition.lang = this.getSpeechLanguage();
    }
  }
}

// Add assistant text to language files
const AssistantText = {
  en: {
    // Assistant Messages
    assistantWelcome:
      "Hello! I'm Nyaya Assistant, your AI guide for judicial career paths. How can I help you today?",
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
  },
  hi: {
    // Assistant Messages
    assistantWelcome:
      "नमस्ते! मैं न्याय असिस्टेंट हूं, आपका न्यायिक करियर मार्गदर्शक। आज मैं आपकी कैसे मदद कर सकता हूं?",
    judgePathGeneral:
      "न्यायाधीश बनने का रास्ता:\n1. LLB डिग्री पूरी करें\n2. बार काउंसिल पंजीकरण\n3. न्यायिक सेवा परीक्षा की तैयारी\n4. राज्य न्यायिक परीक्षा पास करें\n5. न्यायिक प्रशिक्षण\n\nकृपया अपनी वर्तमान शिक्षा बताएं?",
    clatInfo:
      "CLAT (कॉमन लॉ एडमिशन टेस्ट):\n• NLU में प्रवेश के लिए राष्ट्रीय परीक्षा\n• पात्रता: कक्षा 12, 45% अंक (SC/ST के लिए 40%)\n• आयु सीमा: नहीं\n• पैटर्न: 150 MCQs\n• विषय: अंग्रेजी, सामान्य ज्ञान, गणित, कानूनी योग्यता\n• वेबसाइट: consortiumofnlus.ac.in",
    assistantDefault:
      "मुझे समझ नहीं आया। कृपया अपना प्रश्न दोबारा पूछें। मैं इन विषयों में मदद कर सकता हूं:\n• '12वीं के बाद न्यायाधीश कैसे बनें?'\n• 'महाराष्ट्र में कौन सी परीक्षा चाहिए?'\n• 'न्यायिक परीक्षा की आयु सीमा क्या है?'\n• 'CLAT परीक्षा के बारे में बताएं'\n• 'न्यायाधीश का वेतन कितना है?'\n• 'न्यायिक परीक्षा की तैयारी कैसे करें?'\n• 'कौन सी किताबें पढ़नी चाहिए?'",
  },
  mr: {
    // Assistant Messages
    assistantWelcome:
      "नमस्कार! मी न्याय सहायक आहे, तुमचा न्यायिक करिअर मार्गदर्शक. आज मी तुमची कशी मदत करू शकतो?",
    assistantDefault:
      "मला समजले नाही. कृपया तुमचा प्रश्न पुन्हा विचारा. मी या विषयांमध्ये मदत करू शकतो:\n• '12वीनंतर न्यायाधीश कसे व्हावे?'\n• 'महाराष्ट्रात कोणती परीक्षा हवी?'\n• 'न्यायिक परीक्षेची वय मर्यादा काय आहे?'\n• 'CLAT परीक्षेबद्दल सांगा'\n• 'न्यायाधीशाचा पगार किती आहे?'\n• 'न्यायिक परीक्षेची तयारी कशी करावी?'\n• 'कोणती पुस्तके वाचावीत?'",
  },
};

// Initialize assistant when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're in the main app (not login screen)
  if (document.getElementById("assistantBtn")) {
    window.NyayaAssistant = new NyayaAssistant();
  }
});

export { NyayaAssistant, AssistantText };
