/**
 * English translations for Sinopia
 *
 * Structure:
 * - common: Shared strings across the app
 * - nav: Navigation labels
 * - home: Homepage content
 * - auth: Authentication pages
 * - dashboard: Dashboard and protected pages
 * - footer: Footer content
 *
 * To add a new key: Add it here and in de.ts with the German translation
 */
export const en = {
  common: {
    appName: "Sinopia",
    loading: "Loading...",
    save: "Save",
    saving: "Saving...",
    cancel: "Cancel",
    submit: "Submit",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    close: "Close",
    back: "Back",
    next: "Next",
    search: "Search",
    filter: "Filter",
    noResults: "No results found",
    error: "An error occurred",
    success: "Success",
    optional: "optional",
    untitled: "Untitled",
    unknown: "Unknown",
    more: "more",
  },
  nav: {
    home: "Home",
    about: "About",
    vision: "Vision",
    imprint: "Imprint",
    contact: "Contact",
    signIn: "Sign In",
    signUp: "Sign Up",
    getStarted: "Get Started",
    dashboard: "Dashboard",
    projects: "Use Cases",
    offers: "Offers",
    contracts: "Contracts",
    payments: "Payments",
    notifications: "Notifications",
    profile: "Profile",
    signOut: "Sign Out",
  },
  home: {
    heroTitle: "SIA connects - expertise on demand from personal to personal to",
    heroTitleHighlight: "businesses",
    heroSubtitle:
      "Sinopia enables companies to turn a business use case into an outcome, by breaking the request down into the required skills, making those skills instantly available through the Agentic AI platform, and orchestrating the right skill set to solve the use case.",
    learnMore: "Learn More",
    featuresTitle: "Why Choose Sinopia?",
    featuresSubtitle:
      "Everything you need to connect skills with opportunities",
    feature1Title: "Find Perfect Matches",
    feature1Desc:
      "Our smart matching algorithm connects you with the right projects or talents based on your skills and requirements.",
    feature2Title: "Secure Payments",
    feature2Desc:
      "Protected transactions with milestone-based payments ensure both parties are satisfied before funds are released.",
    feature3Title: "Professional Contracts",
    feature3Desc:
      "Legally binding digital contracts that protect both skill givers and searchers throughout the project.",
    ctaTitle: "Ready to Get Started?",
    ctaSubtitle: "Join thousands of professionals already using Sinopia",
    ctaButton: "Create Your Account",
    testimonials: {
      title: "Success Stories",
      subtitle:
        "Hear from professionals and companies who have achieved their goals with Sinopia.",
      mock: {
        person1Name: "Sarah Chen",
        person1Role: "Full-Stack Developer",
        person1Type: "Skill Giver",
        person1Quote:
          "Sinopia has transformed my freelance career. I found consistent high-quality projects and doubled my income within 6 months.",
        person2Name: "Michael Torres",
        person2Role: "CTO at TechFlow",
        person2Type: "Skill Searcher",
        person2Quote:
          "The quality of talent on Sinopia is exceptional. We built our entire mobile app with a team we found here.",
        person3Name: "Emily Roberts",
        person3Role: "UX Designer",
        person3Type: "Skill Giver",
        person3Quote:
          "The platform is intuitive and the payment system is reliable. I love how Sinopia handles contracts and milestones.",
      },
    },
  },
  auth: {
    signInTitle: "Welcome Back",
    signInSubtitle: "Sign in to your Sinopia account",
    signInSuccess: "Successfully signed in!",
    signInError: "Invalid email or password. Please try again.",
    signUpTitle: "Create Account",
    signUpSubtitle: "Join Sinopia and start your journey",
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Re-enter your password",
    firstName: "First Name",
    lastName: "Last Name",
    rememberMe: "Remember me",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    signInButton: "Sign In",
    signUpButton: "Create Account",
    orContinueWith: "Or continue with",
    skillGiver: "Skill Giver",
    skillSearcher: "Skill Searcher",
    skillGiverDesc: "I want to offer my skills and find projects",
    skillSearcherDesc: "I want to find talented professionals",
    selectRole: "Select your role",
    forgotPasswordTitle: "Forgot Password",
    forgotPasswordSubtitle: "Enter your email to receive a reset code",
    sendCode: "Send Reset Code",
    resetPasswordTitle: "Reset Password",
    resetPasswordSubtitle: "Enter your new password",
    resetButton: "Reset Password",
    otpTitle: "Verify Your Email",
    otpSubtitle: "Enter the 6-digit code sent to your email",
    verifyButton: "Verify",
    resendCode: "Resend Code",
    passwordsDoNotMatch: "Passwords do not match",
    verificationRequired: "Verification Required",
    verificationCodeSent: "A verification code has been sent to your email",
    otp: {
      title: "Verify Your Email",
      description: "We sent a 6-digit code to",
      verifying: "Verifying...",
      verifyEmail: "Verify Email",
      verifyAndCreate: "Verify & Create Account",
      didntReceive: "Didn't receive the code?",
      resend: "Resend",
      backToSignUp: "Back to Sign Up",
      sessionExpired: "Session Expired",
      pleaseLoginAgain: "Please log in again",
      pleaseSignUpAgain: "Please sign up again.",
      invalidCode: "Invalid Code",
      invalidCodeDesc: "Invalid verification code",
      emailVerified: "Email Verified!",
      nowUploadCv: "Now please upload your CV to complete registration.",
      accountCreated: "Success!",
      accountCreatedDesc: "Your account has been created successfully.",
      registrationFailed: "Registration Failed",
      somethingWentWrong: "Something went wrong. Please try again.",
      codeResent: "Code Resent",
      codeResentDesc: "A new verification code has been sent to your email.",
    },
    forgotPassword: {
      title: "Forgot Password?",
      description:
        "No worries! Enter your email and we'll send you a reset code.",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      sendButton: "Send Reset Code",
      sending: "Sending...",
      backToSignIn: "Back to Sign In",
      checkEmail: "Check your email",
      checkEmailDesc: "We sent a verification code to reset your password.",
    },
    resetPassword: {
      title: "Reset Password",
      description: "Create a new password for your account",
      newPassword: "New Password",
      newPasswordPlaceholder: "Create a strong password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      passwordHint:
        "At least 8 characters with uppercase, lowercase, and a number",
      passwordsMatch: "Passwords match",
      passwordsDoNotMatch: "Passwords do not match",
      resetButton: "Reset Password",
      resetting: "Resetting...",
      rememberPassword: "Remember your password?",
      success: "Password reset successful!",
      successDesc: "You can now sign in with your new password.",
    },
    otpVerification: {
      title: "Enter Verification Code",
      description: "We sent a 6-digit code to",
      verifyButton: "Verify Code",
      verifying: "Verifying...",
      didntReceive: "Didn't receive the code?",
      resend: "Resend",
      backToSignIn: "Back to Sign In",
      codeVerified: "Code verified!",
      codeVerifiedResetDesc: "You can now reset your password.",
      codeVerifiedEmailDesc: "Your email has been verified.",
      codeResent: "Code resent",
      codeResentDesc: "A new verification code has been sent to your email.",
    },
    passwordValidation: {
      minLength: "At least 8 characters",
      uppercase: "At least one uppercase letter",
      number: "At least one number",
      specialChar: "At least one special character (!@#$%^&*+)",
    },
    cvUpload: {
      title: "Upload Your CV",
      description:
        "Please upload your CV to complete your registration as a Skill Giver",
      dropHere: "Drop your CV here",
      orClickBrowse: "or click to browse",
      browseFiles: "Browse Files",
      fileFormat: "PDF or Word documents up to 5MB",
      remove: "Remove",
      creatingAccount: "Creating Account...",
      completeRegistration: "Complete Registration",
      back: "Back",
      invalidFileType: "Invalid File Type",
      invalidFileTypeDesc: "Please upload a PDF or Word document.",
      fileTooLarge: "File Too Large",
      fileTooLargeDesc: "Please upload a file smaller than 5MB.",
      skipForNow: "Skip for now",
      skipHelperText: "You can upload your CV now or skip and add it later.",
    },
  },
  dashboard: {
    welcome: "Welcome back",
    overview: "Overview",
    recentProjects: "Recent Use Cases",
    pendingOffers: "Pending Offers",
    activeContracts: "Active Contracts",
    totalEarnings: "Total Amount",
    completedProjects: "Completed Use Cases",
    pendingPayments: "Pending Payments",
    quickActions: "Quick Actions",
    viewAll: "View All",
    noProjects: "No use cases yet",
    noOffers: "No pending offers",
    noContracts: "No active contracts",
    progress: "Progress",
    from: "From",
    stages: "stages",
  },
  projects: {
    title: "Use Cases",
    addNew: "Add New Use Case",
    search: "Search use cases...",
    status: "Status",
    budget: "Budget",
    deadline: "Deadline",
    skills: "Skills Required",
    description: "Description",
    viewDetails: "View Details",
    applyNow: "Apply Now",
    jobRole: "Job Role",
    statusDraft: "Draft",
    statusOpen: "Open",
    statusInProgress: "In Progress",
    statusCompleted: "Completed",
    statusCancelled: "Cancelled",
    statusPending: "Pending",
    statusActive: "Active",
    totalCost: "Total Amount",
    vatRate: "VAT 19%",
    totalWithVat: "Total incl. VAT",
    expertStatus: "Expert Status",
    fetchError: "Failed to load use cases. Please try again.",
  },
  useCaseDetails: {
    backToProjects: "Back to Use Cases",
    notFound: "Use Case Not Found",
    notFoundDescription: "The use case you are looking for does not exist or has been removed.",
    fetchError: "Failed to Load",
    fetchErrorDescription: "There was an error loading the use case details. Please try again.",
    overview: "Overview",
    requiredExperts: "Required Experts",
    implementationStages: "Implementation Stages",
    requiredSkills: "Required Skills",
    perHour: "hr",
    acceptUseCase: "Accept Offer",
    reject: "Reject",
    comingSoonTitle: "Coming Soon",
    comingSoonBody: "This feature will be fully available on",
    comingSoonDate: "February 16th",
  },
  projectDetail: {
    notFound: "Use Case not found",
    backToProjects: "Back to Use Cases",
    editProject: "Edit Use Case",
    projectStages: "Use Case Stages",
    overall: "Overall",
    projectDetails: "Use Case Details",
    assignedTo: "Assigned To",
    overallCompletion: "Overall Completion",
  },
  offers: {
    title: "Offers",
    pageTitle: "Offers",
    subtitleGiver: "View offers you have sent",
    subtitleSearcher: "Review and manage incoming offers",
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    amount: "Offer Amount",
    message: "Message",
    accept: "Accept",
    acceptOffer: "Accept Offer",
    reject: "Reject",
    rejectOffer: "Reject Offer",
    withdraw: "Withdraw",
    searchOffers: "Search offers...",
    filterByStatus: "Filter by status",
    allStatus: "All Status",
    noOffersFound: "No offers found",
    adjustFilters: "Try adjusting your search or filters",
    noOffersToDisplay: "No offers to display at the moment",
    offerAccepted: "Offer accepted!",
    offerAcceptedDesc: "The contract will be created shortly.",
    offerRejected: "Offer rejected",
    offerRejectedDesc: "The offer has been declined.",
    from: "From",
    confirmAction: "Confirm Action",
    confirm: "Confirm",
    sent: "Sent",
    offerAmount: "Offer Amount",
    acceptConfirmDesc:
      "Are you sure you want to accept this offer? A contract will be created.",
    rejectConfirmDesc:
      "Are you sure you want to reject this offer? This action cannot be undone.",
    viewDetails: "View Details",
    termsAgreementTitle: "Terms & Conditions Agreement",
    termsAgreementSubtitle: "Please read and accept the terms to proceed",
    digitalSignature: "Digital Signature",
    digitallySignedBy: "Digitally Signed by:",
    signatureDate: "Date:",
    downloadPdf: "Download PDF",
    agreeAndAccept: "I Agree & Accept",
    untitledProject: "Untitled Project",
    noJobTitle: "No job title specified",
    errorTitle: "Error Loading Offers",
    fetchError: "Failed to load offers. Please try again.",
    notFound: "Offer Not Found",
    notFoundDesc: "The offer you're looking for doesn't exist or has been removed.",
    backToOffers: "Back to Offers",
    jobDetails: "Job Details",
    role: "Role",
    description: "Description",
    workload: "Workload",
    amountPerPerson: "Amount per person",
    hours: "hours",
    employeesRequired: "Employees Required",
    requiredSkills: "Required Skills",
    noSkillsRequired: "No specific skills required",
    acceptOfferPlaceholder: "Accept offer functionality will be implemented.",
    rejectOfferPlaceholder: "Reject offer functionality will be implemented.",
    offerOverview: "Offer Overview",
    totalHoursLabel: "Total Hours",
    termsAgreementNote: "By clicking 'I Agree & Accept', you accept our Terms & Conditions.",
    viewTermsButton: "View Terms & Conditions",
  },
  contracts: {
    title: "Contracts",
    pageTitle: "Contracts",
    pageSubtitle: "Manage your contracts and agreements",
    sign: "Sign Contract",
    signed: "Signed",
    pending: "Pending Signature",
    viewContract: "View Contract",
    viewDetails: "View Details",
    downloadPdf: "Download PDF",
    searchContracts: "Search contracts...",
    filterByStatus: "Filter by status",
    allStatus: "All Status",
    draft: "Draft",
    sent: "Sent",
    noContractsFound: "No contracts found",
    adjustFilters: "Try adjusting your search or filters",
    noContractsToDisplay: "No contracts to display at the moment",
    client: "Client",
    freelancer: "Freelancer",
    contractSigned: "Contract signed!",
    contractActive: "The contract is now active.",
    signContractDialog: "Sign Contract",
    signContractDesc:
      'You are about to sign the contract for "{projectTitle}". This will make the contract legally binding.',
    contractValue: "Contract Value",
    duration: "Duration",
  },
  payments: {
    title: "Payments",
    titleGiver: "Invoices & Earnings",
    titleSearcher: "Payments",
    subtitleGiver: "Track your invoices and earnings",
    subtitleSearcher: "Manage your payments and invoices",
    totalEarned: "Total Earned",
    totalPaid: "Total Paid",
    invoices: "Invoices",
    paymentHistory: "Payment History",
    pending: "Pending",
    paid: "Paid",
    overdue: "Overdue",
    amount: "Amount",
    dueDate: "Due Date",
    payNow: "Pay Now",
    downloadInvoice: "Download Invoice",
    searchInvoices: "Search invoices...",
    filterByStatus: "Filter by status",
    allStatus: "All Status",
    noInvoicesFound: "No invoices found",
    adjustFilters: "Try adjusting your search or filters",
    noInvoicesToDisplay: "No invoices to display at the moment",
    due: "Due",
    paidOn: "Paid",
    noPayments: "No payments yet",
    noPaymentsToDisplay: "No payments to display at the moment",
    paymentHistoryWillAppear: "Payment history will appear here",
    recentPayments: "Recent Payments",
  },
  profile: {
    title: "Profile",
    pageTitle: "Profile",
    pageSubtitleGiver: "Manage your professional profile",
    pageSubtitleSearcher: "Manage your company profile",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    about: "Bio",
    experience: "Experience",
    education: "Education",
    certifications: "Certifications",
    personalProjects: "Personal Projects",
    mock: {
      giverTitle: "Senior Full-Stack Developer",
      giverBio:
        "Experienced full-stack developer with 8+ years in building web and mobile applications. Passionate about clean code and user-centric design.",
      giverLocation: "Düsseldorf, NW",
      giverAvailability: "Full-time",
      experience1Company: "TechCorp",
      experience1Role: "Senior Developer",
      experience1Desc: "Leading frontend development",
      experience2Company: "StartupXYZ",
      experience2Role: "Full-Stack Developer",
      experience2Desc: "Built core product features",
      searcherCompany: "TechCorp Inc.",
      searcherIndustry: "Technology",
      searcherBio:
        "Leading technology company specializing in innovative software solutions for enterprise clients.",
    },
    personalInfo: "Personal Information",
    professionalInfo: "Professional Information",
    skills: "Skills",
    portfolio: "Portfolio",
    reviews: "Reviews",
    settings: "Settings",
    uploadPhoto: "Upload Photo",
    bio: "Bio",
    bioPlaceholder: "Tell us about yourself and your experience...",
    hourlyRate: "Hourly Rate",
    availability: "Availability",
    location: "Location",
    profileUpdated: "Profile updated!",
    changesSaved: "Your changes have been saved successfully.",
    saveFailed: "Failed to save. Please try again.",
    addSkill: "Add Skill",
    removeSkill: "Remove",
    skillName: "Skill Name",
    skillNamePlaceholder: "e.g., JavaScript, Project Management",
    skillLevel: "Skill Level",
    present: "Present",
    companyInfo: "Company Information",
    companyName: "Company Name",
    industry: "Industry",
    contactEmail: "Contact Email",
    contactPhone: "Contact Phone",
    website: "Website",
    city: "City",
    country: "Country",
    companySize: "Company Size",
    locationNotSet: "—",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    phone: "Phone Number",
    phonePlaceholder: "Enter phone number",
    linkedinUrl: "LinkedIn URL",
    linkedinPlaceholder: "https://linkedin.com/in/yourprofile",
    jobTitle: "Job Title",
    jobTitlePlaceholder: "e.g., Senior Developer",
    address: "Address",
    addressPlaceholder: "City, Country",
    email: "Email",
    emailPlaceholder: "your@email.com",
    contactInfo: "Contact Info",
    levelBeginner: "Beginner",
    levelIntermediate: "Intermediate",
    levelAdvanced: "Advanced",
    levelExpert: "Expert",
    skillType: "Skill Type",
    skillTypeTechnical: "Technical",
    skillTypeSoft: "Soft Skill",
    editSkill: "Edit Skill",
    skillAdded: "Skill added successfully",
    skillUpdated: "Skill updated successfully",
    skillDeleted: "Skill deleted successfully",
    confirmDeleteSkill: "Are you sure you want to delete this skill?",
    addExperience: "Add Experience",
    experienceTitle: "Job Title",
    experienceTitlePlaceholder: "e.g., Senior Developer",
    experienceCompany: "Company",
    experienceCompanyPlaceholder: "Company name",
    experienceStartDate: "Start Date",
    experienceEndDate: "End Date",
    experiencePresent: "Currently working here",
    experienceDetails: "Details",
    experienceDetailsPlaceholder: "Describe your responsibilities and achievements",
    addEducation: "Add Education",
    educationDegree: "Degree",
    educationDegreePlaceholder: "e.g., Bachelor of Science",
    educationInstitution: "Institution",
    educationInstitutionPlaceholder: "University or school name",
    educationGraduationYear: "Graduation Year",
    educationGraduationYearPlaceholder: "YYYY",
    educationGpa: "GPA",
    educationGpaPlaceholder: "e.g., 3.8",
    addCertification: "Add Certification",
    certificationName: "Certification Name",
    certificationNamePlaceholder: "e.g., AWS Solutions Architect",
    certificationAuthority: "Issuing Authority",
    certificationAuthorityPlaceholder: "e.g., Amazon Web Services",
    certificationDate: "Date Obtained",
    certificationUpdated: "Certificate updated successfully",
    certificationDeleted: "Certificate deleted successfully",
    confirmDeleteCertificate: "Are you sure you want to delete this certificate?",
    educationUpdated: "Education updated successfully",
    educationDeleted: "Education deleted successfully",
    confirmDeleteEducation: "Are you sure you want to delete this education entry?",
    experienceUpdated: "Experience updated successfully",
    experienceDeleted: "Experience deleted successfully",
    confirmDeleteExperience: "Are you sure you want to delete this experience entry?",
    projectUpdated: "Personal project updated successfully",
    projectDeleted: "Personal project deleted successfully",
    confirmDeleteProject: "Are you sure you want to delete this personal project?",
    projectUrl: "Project URL",
    projectUrlPlaceholder: "e.g., https://github.com/username/project",
    deleteFailed: "Failed to delete",
    languages: "Languages",
    addLanguage: "Add Language",
    editLanguage: "Edit Language",
    languageName: "Language",
    languageNamePlaceholder: "e.g., English, German, Arabic",
    languageLevel: "Level",
    languageLevelBeginner: "Beginner",
    languageLevelIntermediate: "Intermediate",
    languageLevelAdvanced: "Advanced",
    languageLevelExpert: "Expert",
    languageLevelNative: "Native",
    selectLevel: "Select level",
    languageSaved: "Language saved successfully",
    languageDeleted: "Language deleted successfully",
    languageSaveFailed: "Failed to save language",
    languageDeleteFailed: "Failed to delete language",
    confirmDeleteLanguage: "Are you sure you want to delete this language?",
    noLanguages: "No languages added yet",
    addProject: "Add Personal Project",
    projectName: "Project Name",
    projectNamePlaceholder: "Name of your project",
    projectDescription: "Description",
    projectDescriptionPlaceholder: "What did you build? What problem did it solve?",
    projectTechnologies: "Technologies",
    projectTechnologiesPlaceholder: "e.g., React, Node.js, PostgreSQL",
    projectDuration: "Duration",
    projectDurationPlaceholder: "e.g., 3 months or Jan 2024 - Mar 2024",
    editContactInfo: "Edit Contact Info",
    editCompanyInfo: "Edit Company Info",
    websitePlaceholder: "https://www.example.com",
    companyNamePlaceholder: "Your company name",
    cityPlaceholder: "City",
    countryPlaceholder: "Country",
    companySizePlaceholder: "e.g., 10-50 employees",
    invalidWebsiteUrl: "Please enter a valid website URL",
    websiteHelperText: "Please start your website with https://",
    websiteMustStartWithHttps: "Website must start with https://",
    cvUploadTitle: "Upload your CV (AI-powered)",
    cvUploadDescription: "Drag & drop your CV here, or click to browse",
    cvUploadSupported: "Supported: PDF, DOC, DOCX (max 5MB)",
    cvUploadButton: "Upload & Extract with AI",
    cvSkipButton: "Skip for now",
    cvUploaded: "CV uploaded",
    cvNotUploaded: "Not uploaded",
    cvUploading: "Uploading...",
    cvExtracting: "Extracting with AI...",
    cvExtractingDescription: "Our AI is analyzing your CV to extract skills, experience, and qualifications.",
    cvUploadSuccess: "CV uploaded successfully",
    cvExtractionComplete: "Your profile has been updated with the extracted information.",
    cvExtractionPartial: "We couldn't extract everything. You can edit manually.",
    cvExtractionFailed: "We couldn't extract all information. You can edit it manually.",
    cvInvalidFileType: "Please upload a PDF or Word document.",
    cvFileTooLarge: "Please upload a file smaller than 5MB.",
    cvDropHere: "Drop your file here",
    cvSelectedFile: "Selected file",
    cvRemoveFile: "Remove",
  },
  footer: {
    skillGiver: "Skill Giver",
    findProjects: "Find Use Cases",
    buildPortfolio: "Build Portfolio",
    getPaid: "Get Paid",
    skillSearcher: "Skill Searcher",
    postProjects: "Post Use Cases",
    findTalent: "Find Talent",
    manageTeams: "Manage Teams",
    legal: "Legal",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    contactUs: "Contact Us",
    copyright: "All rights reserved.",
    tagline:
      "Connect skills with opportunities. Build your career or find the talent you need.",
    poweredBy: "powered by curizen",
  },
  about: {
    title: "About Sinopia",
    subtitle: "Connecting skills and competency gaps since 2025",
    storyTitle: "Our Story",
    storyText1:
      "Sinopia is a young and innovative company with a clear vision: to rethink existing societal potential and make it accessible in new, meaningful ways.",
    storyText2:
      "Our mission is to develop alternative and sometimes disruptive approaches to reintegrate valuable resources, especially human expertise and experience, back into the social and economic cycle.",
    storyText3:
      "The idea behind Sinopia was inspired by a simple yet profound image: ancient cave paintings depicting human hands - a timeless symbol of connection, support, and the passing on of knowledge.",
    storyText4:
      "From this symbolism, the vision emerged to make the vast experience of retirees and senior professionals available to today's working world - flexible, targeted, and impactful. As founders, we are convinced that our approach not only addresses the challenges of demographic change but also contributes to social participation, knowledge preservation, and a more sustainable labor market.",
    valuesTitle: "Our Values",
    valuesChips: {
      service: "Service Expertise",
      innovation: "Innovation",
      newThinking: "New Thinking",
      orchestration: "Orchestration",
      partnership: "Partnership",
      integrity: "Integrity",
      achievement: "Achievement",
    },
    sinopia: {
      s: {
        letter: "S",
        title: "Service Expertise",
        description: "We stand for high quality skills and competencies.",
      },
      i1: {
        letter: "I",
        title: "Innovation",
        description: "We stand for new paths and solutions thinking beyond the obvious for customers and society.",
      },
      n: {
        letter: "N",
        title: "New Thinking",
        description: "We work with customers to rethink and live processes skill based, not personnel centered.",
      },
      o: {
        letter: "O",
        title: "Orchestration",
        description: "Our approach is built on a nearly fully automated model, ensuring fast rampup times and targeted deployment and delivery.",
      },
      p: {
        letter: "P",
        title: "Partnership",
        description: "We build partnerships at eye level long term, goal oriented, and fair.",
      },
      i2: {
        letter: "I",
        title: "Integrity",
        description: "We live our values in everyday actions and stand by what we say.",
      },
      a: {
        letter: "A",
        title: "Achievement",
        description: "We think results first what matters is not the \"path,\" but the \"goal.\"",
      },
    },
    skillsTitle: "Our Skills",
    skill1Name: "Skill Matching",
    skill1Desc:
      "Connecting the right skills with specific use cases based on verified expertise and experience.",
    skill2Name: "ESCO Skill Mapping",
    skill2Desc:
      "Utilizing the European Skills, Competences and Occupations framework for standardized skill classification.",
    skill3Name: "Use-Case Scoping",
    skill3Desc:
      "Defining clear objectives, deliverables, and milestones for successful project result.",
    skill4Name: "Contract & Milestone Management",
    skill4Desc:
      "Structured agreements with transparent progress tracking and payment schedules.",
    skill5Name: "Quality Assurance",
    skill5Desc:
      "Ensuring deliverables meet standards through systematic review and verification processes.",
    skill6Name: "Skill Onboarding",
    skill6Desc:
      "Seamless integration of professionals into Processes and Use Cases with clear expectations and support.",
  },
  time: {
    justNow: "Just now",
    minutesAgo: "m ago",
    hoursAgo: "h ago",
    daysAgo: "d ago",
  },
  notifications: {
    title: "Notifications",
    unreadCount: "You have {count} unread notification(s)",
    allCaughtUp: "All caught up!",
    markAllRead: "Mark all as read",
    noNotifications: "No notifications",
    noNotificationsDesc:
      "You're all caught up! New notifications will appear here.",
    recentActivity: "Recent Activity",
    viewDetails: "View details",
    markAsRead: "Mark as read",
    delete: "Delete",
  },
  contact: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you",
    nameLabel: "Your Name",
    namePlaceholder: "John Doe",
    emailLabel: "Email Address",
    emailPlaceholder: "john@example.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "How can we help?",
    messageLabel: "Message",
    messagePlaceholder: "Tell us more about your inquiry...",
    sendButton: "Send Message",
    successMessage: "Thank you for your message. We'll get back to you soon!",
    info: {
      email: "Email",
      phone: "Phone",
      office: "Office",
    },
  },
  features: {
    forSkillGivers: "For Skill Givers",
    skillGiversDesc:
      "Retirees, senior experts, and professionals offering their experience.",
    forSkillSearchers: "For Skill Searchers",
    skillSearchersDesc:
      "Companies seeking precise expertise for tasks, processes, or projects.",
    howItWorks: "How It Works",
    howItWorksDesc:
      "Getting started with Sinopia is easy. Follow these simple steps to begin your journey.",
    fastMatching: "Fast Matching",
    securePayments: "Secure Payments",
    support247: "24/7 Support",
    sg1Title: "Share Your Expertise",
    sg1Desc:
      "Bring your lifelong knowledge into meaningful, flexible projects.",
    sg2Title: "Use-Case Based Work",
    sg2Desc:
      "Get matched to targeted, modular Use Cases tailored to your skills not generic jobs.",
    sg3Title: "Fair & Secure Compensation",
    sg3Desc:
      "Receive transparent pricing and reliable payments based on effort and expertise.",
    ss1Title: "Access Experienced Professionals",
    ss1Desc:
      "Find senior experts with verified skills, proven track records, and deep industry knowledge.",
    ss2Title: "AI Driven Matching",
    ss2Desc:
      "Receive tailored Use Case recommendations, skill mappings (ESCO), and effort estimations.",
    ss3Title: "Modular Project Delivery",
    ss3Desc:
      "Break work into clear tasks, milestones, and factory style processes for predictable outcomes.",
    step1Title: "Create Your Profile, Define Your Expertise or Need",
    step1Desc:
      "Create your profile and outline your skills or submit your project as a clear Use Case.",
    step2Title: "Get Smart Matched",
    step2Desc:
      "AI analyzes requirements and recommends the right expertise or Use Cases based on skills and experience.",
    step3Title: "Collaborate with Clarity",
    step3Desc:
      "Work through structured tasks and milestones, with transparent pricing and secure payment upon delivery.",
  },
  cta: {
    title: "Ready to Start Your Journey?",
    subtitle:
      "Join thousands of professionals and companies who are already achieving their goals with Sinopia.",
    createAccount: "Create Free Account",
    contactSales: "Contact Sales",
  },
  terms: {
    title: "General Terms and Conditions (GTC)",
    viewTerms: "View Terms",
    openFullTerms: "Open full Terms page",
    agreeLabel: "I have read and accept the General Terms and Conditions",
    scrollToAccept: "Please scroll to the bottom to enable acceptance",
    acceptError: "Please read and accept the Terms & Conditions to continue.",
    acceptButton: "I Accept",
    closeButton: "Close",
    content: `General Terms and Conditions (GTC) – Sinopia Deutschland GmbH (As of January 27, 2026)
    
Section 1: Scope and Definitions
(1) These General Terms and Conditions apply to all contracts for services between the provider and its customers.

(2) "Customers" within the meaning of these GTC include both consumers and entrepreneurs, unless an explicit restriction is stated.

(3) Deviating terms and conditions of the customer shall not apply unless their validity has been expressly agreed to in writing.

(4) Individual agreements between the provider and the customer shall take precedence over these GTC.

Section 2: Subject Matter of the Service
(1) The subject matter of the contract is the provision of the respectively agreed service in accordance with the offer, service description, or individual agreement.

(2) Unless expressly agreed otherwise, the provider does not guarantee a specific result, but merely a professional, diligent service that corresponds to the state of the art.

(3) The scope of performance results exclusively from the contractual agreement. There are no verbal collateral agreements.

Section 3: Conclusion of Contract
(1) Offers from the provider are non-binding unless they are expressly marked as binding.

(2) A contract is concluded by:

Acceptance of an offer by the customer,

Written or electronic order confirmation,

Or by the actual utilization of the service.

(3) The provider is entitled to reject contract offers without providing reasons.

Section 4: Implementation and Provision of Services
(1) The provider is entitled to use third parties to fulfill contractual obligations.

(2) The provider determines the type, process, and scheduling of the service provision at its reasonable discretion, provided no binding specifications have been agreed upon.

(3) Dates and deadlines are only binding if they have been expressly agreed upon as binding.

Section 5: Cooperation Obligations of the Customer
(1) The customer undertakes to provide all information, content, documents, and cooperation activities required for the proper provision of the service in a timely, complete, and correct manner.

(2) If the customer fails to provide the required cooperation, the provider is not responsible for any resulting delays or restrictions in performance.

(3) Additional costs incurred due to missing or delayed cooperation may be invoiced to the customer.

Section 6: Remuneration and Pricing
(1) Remuneration is based on the respectively agreed form of payment (e.g., flat fee, hourly rate, project price).

(2) All prices are subject to the applicable statutory value-added tax (VAT) unless explicitly stated otherwise.

(3) Additional services that are not part of the original contract will be remunerated separately.

Section 8: Payment Terms
(1) Invoices are due for payment within the payment period without deduction:

For individually created customer services: Immediately upon invoicing.

For standard services (Sinopia Standard Use Cases): 14 days from the date of invoice.

(2) The provider is entitled to demand advance payments or installments.

(3) In the event of default in payment, statutory default interest shall apply. Further claims for damages remain unaffected.

(4) In the event of default in payment, the provider is entitled to withhold further services until full payment is received.

Section 9: Default, Disruptions in Performance, and Force Majeure
(1) The provider is not liable for delays or performance failures due to force majeure or other unforeseeable events for which it is not responsible.

(2) In such cases, agreed deadlines shall be extended appropriately.

(3) If the disruption lasts longer than [e.g., 60 days], both parties are entitled to withdraw from the contract.

Section 10: Liability
(1) The provider has unlimited liability for damages resulting from injury to life, body, or health.

(2) For other damages, the provider is only liable in cases of intent or gross negligence.

(3) In the event of a slightly negligent breach of essential contractual obligations, liability is limited to typically foreseeable damage.

(4) Any further liability is excluded to the extent permitted by law.

Section 11: Warranty Claims (Defects)
(1) The customer is obliged to report defects immediately upon becoming aware of them.

(2) The provider is entitled to remedy defects at its own discretion by means of rectification.

(3) Further claims exist only within the framework of statutory regulations.

Section 12: Termination and Cancellation
(1) Contracts may be terminated ordinarily in compliance with the agreed notice periods.

(2) The right to extraordinary termination for good cause remains unaffected.

(3) Services already rendered must be remunerated proportionately, even in the event of termination.

Section 13: Cancellation by the Customer
(1) In the event of cancellation, the provider may demand reasonable remuneration for services already rendered.

(2) The customer reserves the right to prove that no damage or less damage has occurred.

Section 14: Copyright and Rights of Use
(1) All copyrights to works created within the scope of the service remain with the provider, unless otherwise agreed.

(2) The customer receives a simple, non-transferable right of use to the agreed extent.

(3) Any disclosure to third parties or modification of the work results requires the consent of the provider.

Section 15: Confidentiality
(1) Both parties undertake to keep all confidential information obtained during the cooperation secret.

(2) This obligation continues to apply even after the termination of the contractual relationship.

Section 16: Data Protection
(1) The processing of personal data takes place in accordance with the applicable data protection regulations.

(2) Further information can be found in the separate privacy policy.

Section 17: Final Provisions
(1) The law of the Federal Republic of Germany shall apply.

(2) The place of jurisdiction is—to the extent permitted by law—the registered office of the provider.

(3) Should individual provisions be invalid, the validity of the remaining provisions shall remain unaffected.
 `,
  },
  language: {
    en: "EN",
    de: "DE",
    switchTo: "Switch language",
  },
  errors: {
    pageNotFound: "404 Page Not Found",
    pageNotFoundDesc: "The page you're looking for doesn't exist.",
    goHome: "Go Home",
  },
  settings: {
    title: "Settings",
    subtitle: "Manage your account settings and preferences",
    language: "Language",
    languageDesc: "Choose your preferred language",
    appearance: "Appearance",
    appearanceDesc: "Customize the look and feel",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    account: "Account",
    accountDesc: "Your account information",
    email: "Email",
    role: "Role",
    currentLanguage: "Current language",
    profilePicture: "Profile Picture",
    profilePictureDesc: "Upload a profile picture to personalize your account",
    uploadPicture: "Upload Picture",
    imageFormats: "JPG, PNG, GIF or WebP. Max 5MB.",
    invalidImageType: "Invalid image type. Please use JPG, PNG, GIF or WebP.",
    imageTooLarge: "Image is too large. Maximum size is 5MB.",
    profilePictureUpdated: "Profile picture updated",
    profilePictureUpdatedDesc:
      "Your profile picture has been updated successfully.",
    uploadFailed: "Failed to upload image. Please try again.",
    changePassword: "Change Password",
    changePasswordDesc: "Update your password to keep your account secure",
    currentPassword: "Current Password",
    currentPasswordPlaceholder: "Enter current password",
    newPassword: "New Password",
    newPasswordPlaceholder: "Enter new password",
    confirmPassword: "Confirm New Password",
    confirmPasswordPlaceholder: "Confirm new password",
    updatePassword: "Update Password",
    deleteAccount: "Delete Account",
    deleteAccountDesc:
      "Permanently remove your account and all associated data",
    deleteAccountWarning:
      "Once you delete your account, there is no going back. Please be certain.",
    deleteAccountButton: "Delete account",
    deleteConfirmTitle: "Are you absolutely sure?",
    deleteConfirmDesc:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    accountDeleted: "Account deleted",
    accountDeletedDesc: "Your account has been successfully deleted.",
    deleteAccountFailed: "Failed to delete account. Please try again.",
    passwordTooShort: "Password must be at least 8 characters long.",
    passwordMismatch: "Passwords do not match.",
    passwordChanged: "Password changed",
    passwordChangedDesc: "Your password has been updated successfully.",
    passwordChangeFailed: "Failed to change password. Please try again.",
  },
  menu: {
    menu: "Menu",
    home: "Home",
  },
  emptyState: {
    notSet: "Not set",
    noData: "No data available",
    noProjects: "No projects yet",
    noOffers: "No offers yet",
    noContracts: "No contracts yet",
    noPayments: "No payments yet",
    noSkills: "No skills added",
    noExperience: "No experience added",
    noEducation: "No education added",
    noCertifications: "No certifications added",
    noPersonalProjects: "No personal projects added",
  },
  status: {
    paid: "Paid",
    pending: "Pending",
    signed: "Signed",
    overdue: "Overdue",
    draft: "Draft",
    accepted: "Accepted",
    rejected: "Rejected",
    sent: "Sent",
  },
  vision: {
    title: "Vision",
    teamPhotoAlt: "Sinopia Founding Team",
    content:
      "The skills shortage is omnipresent! Previous solutions to counteract the lack of personnel primarily focus on building new workforces, integrating skilled workers from other countries, or supporting career changers. We at Sinopia want to leverage existing knowledge. The baby boomer generation, who are now retiring from active working life, bring enormous value to the economy with their wealth of experience. According to a 2023 survey, only about 13% of retirees remain employed after retirement. Often not because they lack the desire to contribute, but because there is a lack of tailored opportunities. Tailored to an individual balance between contribution and leisure. We want to create a connection between supply and demand, but differently than with standardized employment contracts. It's about viewing work processes in a new way and breaking them down into smaller individual assignments (so-called Use Cases) that are specifically tailored to the needs of companies as well as workers (Competence Collective).",
    foundingTeam: "Founding Team",
  },
  privacy: {
    title: "Privacy Policy",
    introductionText:
      "The use of our website is generally possible without providing personal data. Insofar as personal data (e.g., name, address, or email addresses) is collected on our site, this is always done on a voluntary basis, where possible. This data will not be passed on to third parties without your explicit consent.",
    ipAddresses: "IP addresses and log files",
    ipAddressesText:
      "When visitors access this website, their IP addresses are recorded and stored in log files. These IP addresses are stored for a maximum of seven days for the purpose of detecting and preventing attacks.",
    security: "Security notice",
    securityText:
      "Please note that data transmission over the Internet (e.g., communication by email) can have security vulnerabilities. Complete protection of data against access by third parties is not possible.",
    advertising: "Objection to unsolicited advertising",
    advertisingText:
      "We hereby expressly object to the use of contact data published within the scope of the legal notice by third parties for sending unsolicited advertising and informational materials. The operators of this website expressly reserve the right to take legal action in the event of unsolicited advertising, such as spam emails.",
    contactFormReference:
      "For details regarding the contact form, please refer to the section below in this privacy policy.",
    contactFormTitle: "Privacy policy for the contact form",
    contactFormText:
      "Personal data is collected via the contact form. In accordance with Article 13 of the EU General Data Protection Regulation (GDPR), you are hereby informed about the data processing associated with this collection. In addition to this description, the general data protection declaration for the website of Sinopia Deutschland GmbH applies.",
    processingScope: "Scope of processing personal data",
    processingItems:
      "First name|Company name|E-mail address|Telephone number|Your message",
    processingItemsAuto:
      "In addition, the following data is automatically collected:",
    processingItemsAutoList:
      "Confirmation of your declaration of consent|Date and time the form was submitted",
    legalBasis: "Legal basis",
    legalBasisText:
      "The collection of form data is based on the consent of the data subjects in accordance with Art. 6 para. 1 lit. a EU GDPR.",
    purpose: "Purpose of data processing",
    purposeText:
      "This form is used to contact Sinopia Deutschland GmbH. The data you submit will be used for informational purposes and to send you event notifications from Sinopia Deutschland GmbH. You may object to being contacted and to the processing of your data at any time.",
    storageDuration: "Storage duration",
    storageDurationText:
      "Your data will be stored for communication purposes with Sinopia Deutschland GmbH as long as your email address is valid or until you object to its storage. You can object at any time by sending an informal notice to info[at]sinopia.de. Your data will then be completely deleted.",
    contactDetails: "Contact details",
    contactDetailsText:
      "The company responsible for this website is Sinopia Deutschland GmbH (see",
    contactDetailsLink: "legal notice",
    yourRights: "Your rights as a data subject",
    yourRightsText:
      "As a data subject, you can assert your rights under the EU GDPR at any time.",
  },
  imprint: {
    title: "Imprint",
    subtitle: "Information according to § 5 DDG",
    companyName: "Sinopia Deutschland GmbH",
    companyAddress:
      "Deckerstr. 39\n70372 Stuttgart\nCommercial Register: HRA 800342\nRegistry Court: Stuttgart",
    representedByTitle: "Represented by:",
    representedByNames: "Jens Uwe Jung, Tobias Bahlinger, and Eyad Dawood",
    contactTitle: "Contact:",
    contactDetails: "info@sinopia.eu",
    vatIdTitle: "VAT ID:",
    vatIdNumber: "DE455888790",
    responsibleTitle: "Responsible for content according to § 18 Abs. 2 MStV:",
    responsibleDetails: "Jens Uwe Jung\nDeckerstr. 39\n70372 Stuttgart",
    disclaimerTitle: "Disclaimer:",
    euDisputeTitle: "EU Dispute Resolution",
    euDisputeText:
      "The European Commission provides a platform for online dispute resolution (OS):",
    euDisputeEmail: "You can find our email address in the imprint above.",
    consumerDisputeTitle:
      "Consumer Dispute Resolution / Universal Arbitration Board",
    consumerDisputeText:
      "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
    contentLiabilityTitle: "Liability for Content",
    contentLiabilityText:
      "As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 Abs.1 TMG. According to §§ 8 to 10 TMG, however, we are not obliged as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific infringement. Upon becoming aware of such infringements, we will remove this content immediately.",
    linkLiabilityTitle: "Liability for Links",
    linkLiabilityText:
      "Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of an infringement. Upon becoming aware of legal violations, we will remove such links immediately.",
    copyrightTitle: "Copyright",
    copyrightText:
      "The content and works on these pages created by the site operators are subject to German copyright law. The reproduction, editing, distribution, and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. Upon becoming aware of infringements, we will remove such content immediately.",
    privacyTitle: "Privacy",
    privacyText: "Information about data protection can be found in our",
  },
  onboarding: {
    step1: "Account",
    step2: "Company Info",
    step2of2: "Step 2/2",
    companyInfoTitle: "Company Information",
    companyInfoSubtitle:
      "Tell us about your company to complete your registration",
    companyName: "Company Name",
    companyNamePlaceholder: "Enter your company name",
    industry: "Industry",
    industryPlaceholder: "e.g., Technology, Healthcare, Finance",
    contactEmail: "Contact Email",
    contactEmailPlaceholder: "Enter contact email",
    contactPhone: "Contact Phone",
    contactPhonePlaceholder: "Enter contact phone number",
    city: "City",
    cityPlaceholder: "Enter your city",
    country: "Country",
    countryPlaceholder: "Enter your country",
    companySize: "Company Size",
    companySizePlaceholder: "Select company size",
    companySize1to10: "1-10 employees",
    companySize11to50: "11-50 employees",
    companySize51to200: "51-200 employees",
    companySize201to500: "201-500 employees",
    companySize501to1000: "501-1000 employees",
    companySize1000plus: "1000+ employees",
    bio: "About",
    bioPlaceholder: "Tell us about your company (optional)",
    website: "Website",
    websitePlaceholder: "https://example.com",
    websiteHelperText: "Please start your website with https://",
    websiteMustStartWithHttps: "Website must start with https://",
    continueButton: "Continue to Dashboard",
    companyInfoSaved: "Company information saved",
    companyInfoSavedDesc: "Your company details have been saved successfully.",
    companyInfoRequired:
      "Please complete your company information to continue.",
    fillAllRequired: "Please fill in all required fields.",
    invalidEmail: "Please enter a valid email address.",
  },
  useCases: {
    uploadUseCase: "Upload Use Case",
    postUseCase: "Post Use Case",
    uploadTitle: "Upload Use Case",
    uploadSubtitle: "Upload a PDF or Word document describing your use case",
    selectFile: "Select File",
    selectTemplateLabel: "Or select a template file:",
    selectTemplatePlaceholder: "Choose a template...",
    downloadingTemplate: "Downloading template...",
    templateSelected: "Template selected",
    templateSelectedDesc: "Template file has been loaded. Click Submit to analyze.",
    loadingTemplates: "Loading templates...",
    noTemplatesAvailable: "No templates available",
    dragDropText: "Drag and drop your file here",
    orBrowse: "or click to browse",
    browseFiles: "Browse Files",
    acceptedFormats: "Accepted formats: PDF, DOC, DOCX (max 10MB)",
    uploadedFiles: "Uploaded Files",
    uploadSuccess: "File uploaded successfully",
    uploadError: {
      invalidType: "Invalid file type. Please upload a PDF or Word document.",
      tooLarge: "File is too large. Maximum size is 10MB.",
    },
    filesProcessed: "Files processed successfully",
    filesProcessedDesc: "Your use case has been submitted for review.",
    submitUpload: "Submit Use Case",
    analyzingFile: "Analyzing File...",
    postTitle: "Post Use Case",
    postSubtitle: "Create a new use case to find the right expert",
    details: "Use Case Details",
    titleLabel: "Title",
    titlePlaceholder: "e.g., Process Optimization in Manufacturing",
    titlePlaceholderOptional: "Optional - Leave empty to use uploaded file data",
    descriptionLabel: "Description",
    descriptionPlaceholder:
      "Describe your use case in detail. What is the current situation? What challenges are you facing?",
    descriptionPlaceholderOptional: "Optional - Leave empty to use uploaded file data",
    objectiveLabel: "Deliverables",
    objectivePlaceholder:
      "What do you want to achieve? What is the desired outcome?",
    objective: "Deliverable",
    objectives: "Deliverables",
    addObjective: "Add deliverable",
    removeObjective: "Remove",
    atLeastOneObjective: "Please add at least one deliverable.",
    uploadCta: {
      headline: "Have a requirement document?",
      subtext: "Skip the manual entry! Upload your PDF file and let our AI extract the details for you.",
      button: "Upload Use Case File",
    },
    createButton: "Save Use Case",
    termsTitle: "Terms & Conditions",
    useCaseDetails: "Use Case Details",
    contractTitle: "Sinopia Use Case Contract",
    agreeAndCreate: "I Agree & Create",
    confirmUseCase: "Confirm Use Case",
    useCaseOverview: "Use Case Overview",
    termsAgreementNote: "By clicking 'I Agree & Create', you accept our Terms & Conditions.",
    viewTermsButton: "View Terms & Conditions",
    created: "Use Case created!",
    createdDesc: "Your use case has been posted successfully.",
    allFieldsRequired: "Please fill in all required fields.",
    analyzeButton: "Analyze Use Case",
    analyzing: "Analyzing by AI...",
    analyzingDescription: "Our AI is processing your use case to identify required skills, experts, and implementation stages.",
    analysisComplete: "Analysis Complete",
    analysisCompleteDesc: "Analysis complete. You can now create the use case.",
    analysisError: "Failed to analyze use case. Please try again.",
    endpointNotFound: "API endpoint not found (404). Please contact support.",
    analysisResults: "AI Analysis Results",
    analyzeFirst: "Please analyze the use case first before creating.",
    analysisDataInvalid: "Analysis data is invalid. Please analyze again.",
    createError: "Failed to create use case. Please try again.",
    totalHours: "Total Hours",
    totalCost: "Total Amount",
    netAmount: "Net Amount",
    vatRate: "VAT 19%",
    totalWithVat: "Total incl. VAT",
    hours: "hours",
    requiredRoles: "Required Roles",
    roles: "roles",
    jobTitles: "Required Job Titles",
    analyzeHint: "Click 'Analyze Use Case' to get AI-powered insights before creating.",
    projectOverview: "Use Case Overview",
    projectSummary: "Use Case Summary",
    requiredRolesDetailed: "Required Resources",
    employee: "Resource",
    employees: "Resources",
    requiredSkills: "Required skills",
    implementationStages: "Implementation Stages",
    uploadedUseCase: "Uploaded Use Case",
    uploadedUseCaseDesc: "Use case details extracted from uploaded file",
    uploadedUseCaseObjective: "Objectives from uploaded file",
  },
  chatWidget: {
    title: "AI Assistant",
    welcomeMessage: "Hello! How can I help you today?",
    inputPlaceholder: "Type your message...",
    errorResponse: "Sorry, I couldn't process your request. Please try again.",
    typing: "Typing...",
  },
};

export type TranslationKeys = typeof en;
