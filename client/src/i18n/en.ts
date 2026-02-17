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
    hourlyRate: "Hourly Rate",
    totalHours: "Total Hours",
    useCaseId: "Use Case ID",
    levelJobTitle: "Level / Job Title",
    requiredEmployees: "Required Employees",
    totalAmountDue: "Total Amount Due",
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
    skillTypeTechnical: "Skills",
    skillTypeSoft: "Competence",
    editSkill: "Edit Skill",
    skillAdded: "Skill added successfully",
    skillUpdated: "Skill updated successfully",
    skillDeleted: "Skill deleted successfully",
    confirmDeleteSkill: "Are you sure you want to delete this skill?",
    confirmBulkDeleteSkills: "Are you sure you want to delete {count} skills?",
    deleteSelected: "Delete Selected",
    selectAll: "Select All",
    skillsDeletedSuccess: "Skills deleted successfully",
    skillsDeletedCount: "skills deleted",
    skillsDeleteFailed: "failed to delete",
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
    street: "Street Address",
    streetPlaceholder: "Street and house number",
    zipCode: "ZIP Code",
    zipCodePlaceholder: "ZIP / Postal code",
    state: "State / Province",
    statePlaceholder: "State or province",
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
    terms: "General Terms and Conditions",
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
    titleShort: "General Terms and Conditions",
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
    content: `Privacy Policy

We are very delighted that you have shown interest in our enterprise. Data protection is of a particularly high priority for the management of the Sinopia Deutschland GmbH. The use of the Internet pages of the Sinopia Deutschland GmbH is possible without any indication of personal data; however, if a data subject wants to use special enterprise services via our website, processing of personal data could become necessary. If the processing of personal data is necessary and there is no statutory basis for such processing, we generally obtain consent from the data subject.

The processing of personal data, such as the name, address, e-mail address, or telephone number of a data subject shall always be in line with the General Data Protection Regulation (GDPR), and in accordance with the country-specific data protection regulations applicable to the Sinopia Deutschland GmbH. By means of this data protection declaration, our enterprise would like to inform the general public of the nature, scope, and purpose of the personal data we collect, use and process. Furthermore, data subjects are informed, by means of this data protection declaration, of the rights to which they are entitled.

As the controller, the Sinopia Deutschland GmbH has implemented numerous technical and organizational measures to ensure the most complete protection of personal data processed through this website. However, Internet-based data transmissions may in principle have security gaps, so absolute protection may not be guaranteed. For this reason, every data subject is free to transfer personal data to us via alternative means, e.g. by telephone.

1. Definitions

The data protection declaration of the Sinopia Deutschland GmbH is based on the terms used by the European legislator for the adoption of the General Data Protection Regulation (GDPR). Our data protection declaration should be legible and understandable for the general public, as well as our customers and business partners. To ensure this, we would like to first explain the terminology used.

In this data protection declaration, we use, inter alia, the following terms:

a)    Personal data

Personal data means any information relating to an identified or identifiable natural person (\u201Cdata subject\u201D). An identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.

b) Data subject

Data subject is any identified or identifiable natural person, whose personal data is processed by the controller responsible for the processing.

c)    Processing

Processing is any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means, such as collection, recording, organisation, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.

d)    Restriction of processing

Restriction of processing is the marking of stored personal data with the aim of limiting their processing in the future.

e)    Profiling

Profiling means any form of automated processing of personal data consisting of the use of personal data to evaluate certain personal aspects relating to a natural person, in particular to analyse or predict aspects concerning that natural person\u2019s performance at work, economic situation, health, personal preferences, interests, reliability, behaviour, location or movements.

f)     Pseudonymisation

Pseudonymisation is the processing of personal data in such a manner that the personal data can no longer be attributed to a specific data subject without the use of additional information, provided that such additional information is kept separately and is subject to technical and organisational measures to ensure that the personal data are not attributed to an identified or identifiable natural person.

g)    Controller or controller responsible for the processing

Controller or controller responsible for the processing is the natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data; where the purposes and means of such processing are determined by Union or Member State law, the controller or the specific criteria for its nomination may be provided for by Union or Member State law.

h)    Processor

Processor is a natural or legal person, public authority, agency or other body which processes personal data on behalf of the controller.

i)      Recipient

Recipient is a natural or legal person, public authority, agency or another body, to which the personal data are disclosed, whether a third party or not. However, public authorities which may receive personal data in the framework of a particular inquiry in accordance with Union or Member State law shall not be regarded as recipients; the processing of those data by those public authorities shall be in compliance with the applicable data protection rules according to the purposes of the processing.

j)      Third party

Third party is a natural or legal person, public authority, agency or body other than the data subject, controller, processor and persons who, under the direct authority of the controller or processor, are authorised to process personal data.

k)    Consent

Consent of the data subject is any freely given, specific, informed and unambiguous indication of the data subject\u2019s wishes by which he or she, by a statement or by a clear affirmative action, signifies agreement to the processing of personal data relating to him or her.

2. Name and Address of the controller

Controller for the purposes of the General Data Protection Regulation (GDPR), other data protection laws applicable in Member states of the European Union and other provisions related to data protection is:

Sinopia Deutschland GmbH
Deckerstr. 39
70372 Stuttgart
Deutschland
Phone: +491774928319
Email: info@sinopia.eu
Website: www.sinopia.eu

3. Collection of general data and information

The website of the Sinopia Deutschland GmbH collects a series of general data and information when a data subject or automated system calls up the website. This general data and information are stored in the server log files. Collected may be (1) the browser types and versions used, (2) the operating system used by the accessing system, (3) the website from which an accessing system reaches our website (so-called referrers), (4) the sub-websites, (5) the date and time of access to the Internet site, (6) an Internet protocol address (IP address), (7) the Internet service provider of the accessing system, and (8) any other similar data and information that may be used in the event of attacks on our information technology systems.

When using these general data and information, the Sinopia Deutschland GmbH does not draw any conclusions about the data subject. Rather, this information is needed to (1) deliver the content of our website correctly, (2) optimize the content of our website as well as its advertisement, (3) ensure the long-term viability of our information technology systems and website technology, and (4) provide law enforcement authorities with the information necessary for criminal prosecution in case of a cyber-attack. Therefore, the Sinopia Deutschland GmbH analyzes anonymously collected data and information statistically, with the aim of increasing the data protection and data security of our enterprise, and to ensure an optimal level of protection for the personal data we process. The anonymous data of the server log files are stored separately from all personal data provided by a data subject.

4. Registration on our website

The data subject has the possibility to register on the website of the controller with the indication of personal data. Which personal data are transmitted to the controller is determined by the respective input mask used for the registration. The personal data entered by the data subject are collected and stored exclusively for internal use by the controller, and for his own purposes. The controller may request transfer to one or more processors (e.g. a parcel service) that also uses personal data for an internal purpose which is attributable to the controller.

By registering on the website of the controller, the IP address\u2014assigned by the Internet service provider (ISP) and used by the data subject\u2014date, and time of the registration are also stored. The storage of this data takes place against the background that this is the only way to prevent the misuse of our services, and, if necessary, to make it possible to investigate committed offenses. Insofar, the storage of this data is necessary to secure the controller. This data is not passed on to third parties unless there is a statutory obligation to pass on the data, or if the transfer serves the aim of criminal prosecution.

The registration of the data subject, with the voluntary indication of personal data, is intended to enable the controller to offer the data subject contents or services that may only be offered to registered users due to the nature of the matter in question. Registered persons are free to change the personal data specified during the registration at any time, or to have them completely deleted from the data stock of the controller.

The data controller shall, at any time, provide information upon request to each data subject as to what personal data are stored about the data subject. In addition, the data controller shall correct or erase personal data at the request or indication of the data subject, insofar as there are no statutory storage obligations. The entirety of the controller\u2019s employees are available to the data subject in this respect as contact persons.

5. Contact possibility via the website

The website of the Sinopia Deutschland GmbH contains information that enables a quick electronic contact to our enterprise, as well as direct communication with us, which also includes a general address of the so-called electronic mail (e-mail address). If a data subject contacts the controller by e-mail or via a contact form, the personal data transmitted by the data subject are automatically stored. Such personal data transmitted on a voluntary basis by a data subject to the data controller are stored for the purpose of processing or contacting the data subject. There is no transfer of this personal data to third parties.

6. Routine erasure and blocking of personal data

The data controller shall process and store the personal data of the data subject only for the period necessary to achieve the purpose of storage, or as far as this is granted by the European legislator or other legislators in laws or regulations to which the controller is subject to.

If the storage purpose is not applicable, or if a storage period prescribed by the European legislator or another competent legislator expires, the personal data are routinely blocked or erased in accordance with legal requirements.

7. Rights of the data subject

a) Right of confirmation

Each data subject shall have the right granted by the European legislator to obtain from the controller the confirmation as to whether or not personal data concerning him or her are being processed. If a data subject wishes to avail himself of this right of confirmation, he or she may, at any time, contact any employee of the controller.

b) Right of access

Each data subject shall have the right granted by the European legislator to obtain from the controller free information about his or her personal data stored at any time and a copy of this information. Furthermore, the European directives and regulations grant the data subject access to the following information:

the purposes of the processing;
the categories of personal data concerned;
the recipients or categories of recipients to whom the personal data have been or will be disclosed, in particular recipients in third countries or international organisations;
where possible, the envisaged period for which the personal data will be stored, or, if not possible, the criteria used to determine that period;
the existence of the right to request from the controller rectification or erasure of personal data, or restriction of processing of personal data concerning the data subject, or to object to such processing;
the existence of the right to lodge a complaint with a supervisory authority;
where the personal data are not collected from the data subject, any available information as to their source;
the existence of automated decision-making, including profiling, referred to in Article 22(1) and (4) of the GDPR and, at least in those cases, meaningful information about the logic involved, as well as the significance and envisaged consequences of such processing for the data subject.

Furthermore, the data subject shall have a right to obtain information as to whether personal data are transferred to a third country or to an international organisation. Where this is the case, the data subject shall have the right to be informed of the appropriate safeguards relating to the transfer.

If a data subject wishes to avail himself of this right of access, he or she may, at any time, contact any employee of the controller.

c) Right to rectification

Each data subject shall have the right granted by the European legislator to obtain from the controller without undue delay the rectification of inaccurate personal data concerning him or her. Taking into account the purposes of the processing, the data subject shall have the right to have incomplete personal data completed, including by means of providing a supplementary statement.

If a data subject wishes to exercise this right to rectification, he or she may, at any time, contact any employee of the controller.

d) Right to erasure (Right to be forgotten)

Each data subject shall have the right granted by the European legislator to obtain from the controller the erasure of personal data concerning him or her without undue delay, and the controller shall have the obligation to erase personal data without undue delay where one of the following grounds applies, as long as the processing is not necessary:

The personal data are no longer necessary in relation to the purposes for which they were collected or otherwise processed.
The data subject withdraws consent to which the processing is based according to point (a) of Article 6(1) of the GDPR, or point (a) of Article 9(2) of the GDPR, and where there is no other legal ground for the processing.
The data subject objects to the processing pursuant to Article 21(1) of the GDPR and there are no overriding legitimate grounds for the processing, or the data subject objects to the processing pursuant to Article 21(2) of the GDPR.
The personal data have been unlawfully processed.
The personal data must be erased for compliance with a legal obligation in Union or Member State law to which the controller is subject.
The personal data have been collected in relation to the offer of information society services referred to in Article 8(1) of the GDPR.

If one of the aforementioned reasons applies, and a data subject wishes to request the erasure of personal data stored by the Sinopia Deutschland GmbH, he or she may, at any time, contact any employee of the controller. An employee of Sinopia Deutschland GmbH shall promptly ensure that the erasure request is complied with immediately.

Where the controller has made personal data public and is obliged pursuant to Article 17(1) to erase the personal data, the controller, taking account of available technology and the cost of implementation, shall take reasonable steps, including technical measures, to inform other controllers processing the personal data that the data subject has requested erasure by such controllers of any links to, or copy or replication of, those personal data, as far as processing is not required. An employees of the Sinopia Deutschland GmbH will arrange the necessary measures in individual cases.

e) Right of restriction of processing

Each data subject shall have the right granted by the European legislator to obtain from the controller restriction of processing where one of the following applies:

The accuracy of the personal data is contested by the data subject, for a period enabling the controller to verify the accuracy of the personal data.
The processing is unlawful and the data subject opposes the erasure of the personal data and requests instead the restriction of their use instead.
The controller no longer needs the personal data for the purposes of the processing, but they are required by the data subject for the establishment, exercise or defence of legal claims.
The data subject has objected to processing pursuant to Article 21(1) of the GDPR pending the verification whether the legitimate grounds of the controller override those of the data subject.

If one of the aforementioned conditions is met, and a data subject wishes to request the restriction of the processing of personal data stored by the Sinopia Deutschland GmbH, he or she may at any time contact any employee of the controller. The employee of the Sinopia Deutschland GmbH will arrange the restriction of the processing.

f) Right to data portability

Each data subject shall have the right granted by the European legislator, to receive the personal data concerning him or her, which was provided to a controller, in a structured, commonly used and machine-readable format. He or she shall have the right to transmit those data to another controller without hindrance from the controller to which the personal data have been provided, as long as the processing is based on consent pursuant to point (a) of Article 6(1) of the GDPR or point (a) of Article 9(2) of the GDPR, or on a contract pursuant to point (b) of Article 6(1) of the GDPR, and the processing is carried out by automated means, as long as the processing is not necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller.

Furthermore, in exercising his or her right to data portability pursuant to Article 20(1) of the GDPR, the data subject shall have the right to have personal data transmitted directly from one controller to another, where technically feasible and when doing so does not adversely affect the rights and freedoms of others.

In order to assert the right to data portability, the data subject may at any time contact any employee of the Sinopia Deutschland GmbH.

g) Right to object

Each data subject shall have the right granted by the European legislator to object, on grounds relating to his or her particular situation, at any time, to processing of personal data concerning him or her, which is based on point (e) or (f) of Article 6(1) of the GDPR. This also applies to profiling based on these provisions.

The Sinopia Deutschland GmbH shall no longer process the personal data in the event of the objection, unless we can demonstrate compelling legitimate grounds for the processing which override the interests, rights and freedoms of the data subject, or for the establishment, exercise or defence of legal claims.

If the Sinopia Deutschland GmbH processes personal data for direct marketing purposes, the data subject shall have the right to object at any time to processing of personal data concerning him or her for such marketing. This applies to profiling to the extent that it is related to such direct marketing. If the data subject objects to the Sinopia Deutschland GmbH to the processing for direct marketing purposes, the Sinopia Deutschland GmbH will no longer process the personal data for these purposes.

In addition, the data subject has the right, on grounds relating to his or her particular situation, to object to processing of personal data concerning him or her by the Sinopia Deutschland GmbH for scientific or historical research purposes, or for statistical purposes pursuant to Article 89(1) of the GDPR, unless the processing is necessary for the performance of a task carried out for reasons of public interest.

In order to exercise the right to object, the data subject may contact any employee of the Sinopia Deutschland GmbH. In addition, the data subject is free in the context of the use of information society services, and notwithstanding Directive 2002/58/EC, to use his or her right to object by automated means using technical specifications.

h) Automated individual decision-making, including profiling

Each data subject shall have the right granted by the European legislator not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her, or similarly significantly affects him or her, as long as the decision (1) is not is necessary for entering into, or the performance of, a contract between the data subject and a data controller, or (2) is not authorised by Union or Member State law to which the controller is subject and which also lays down suitable measures to safeguard the data subject\u2019s rights and freedoms and legitimate interests, or (3) is not based on the data subject\u2019s explicit consent.

If the decision (1) is necessary for entering into, or the performance of, a contract between the data subject and a data controller, or (2) it is based on the data subject\u2019s explicit consent, the Sinopia Deutschland GmbH shall implement suitable measures to safeguard the data subject\u2019s rights and freedoms and legitimate interests, at least the right to obtain human intervention on the part of the controller, to express his or her point of view and contest the decision.

If the data subject wishes to exercise the rights concerning automated individual decision-making, he or she may, at any time, contact any employee of the Sinopia Deutschland GmbH.

i) Right to withdraw data protection consent

Each data subject shall have the right granted by the European legislator to withdraw his or her consent to processing of his or her personal data at any time.

If the data subject wishes to exercise the right to withdraw the consent, he or she may, at any time, contact any employee of the Sinopia Deutschland GmbH.

8. Data protection for applications and the application procedures

The data controller shall collect and process the personal data of applicants for the purpose of the processing of the application procedure. The processing may also be carried out electronically. This is the case, in particular, if an applicant submits corresponding application documents by e-mail or by means of a web form on the website to the controller. If the data controller concludes an employment contract with an applicant, the submitted data will be stored for the purpose of processing the employment relationship in compliance with legal requirements. If no employment contract is concluded with the applicant by the controller, the application documents shall be automatically erased two months after notification of the refusal decision, provided that no other legitimate interests of the controller are opposed to the erasure. Other legitimate interest in this relation is, e.g. a burden of proof in a procedure under the General Equal Treatment Act (AGG).

9. Legal basis for the processing

Art. 6(1) lit. a GDPR serves as the legal basis for processing operations for which we obtain consent for a specific processing purpose. If the processing of personal data is necessary for the performance of a contract to which the data subject is party, as is the case, for example, when processing operations are necessary for the supply of goods or to provide any other service, the processing is based on Article 6(1) lit. b GDPR. The same applies to such processing operations which are necessary for carrying out pre-contractual measures, for example in the case of inquiries concerning our products or services. Is our company subject to a legal obligation by which processing of personal data is required, such as for the fulfillment of tax obligations, the processing is based on Art. 6(1) lit. c GDPR. In rare cases, the processing of personal data may be necessary to protect the vital interests of the data subject or of another natural person. This would be the case, for example, if a visitor were injured in our company and his name, age, health insurance data or other vital information would have to be passed on to a doctor, hospital or other third party. Then the processing would be based on Art. 6(1) lit. d GDPR. Finally, processing operations could be based on Article 6(1) lit. f GDPR. This legal basis is used for processing operations which are not covered by any of the abovementioned legal grounds, if processing is necessary for the purposes of the legitimate interests pursued by our company or by a third party, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject which require protection of personal data. Such processing operations are particularly permissible because they have been specifically mentioned by the European legislator. He considered that a legitimate interest could be assumed if the data subject is a client of the controller (Recital 47 Sentence 2 GDPR).

10. The legitimate interests pursued by the controller or by a third party

Where the processing of personal data is based on Article 6(1) lit. f GDPR our legitimate interest is to carry out our business in favor of the well-being of all our employees and the shareholders.

11. Period for which the personal data will be stored

The criteria used to determine the period of storage of personal data is the respective statutory retention period. After expiration of that period, the corresponding data is routinely deleted, as long as it is no longer necessary for the fulfillment of the contract or the initiation of a contract.

12. Provision of personal data as statutory or contractual requirement; Requirement necessary to enter into a contract; Obligation of the data subject to provide the personal data; possible consequences of failure to provide such data

We clarify that the provision of personal data is partly required by law (e.g. tax regulations) or can also result from contractual provisions (e.g. information on the contractual partner). Sometimes it may be necessary to conclude a contract that the data subject provides us with personal data, which must subsequently be processed by us. The data subject is, for example, obliged to provide us with personal data when our company signs a contract with him or her. The non-provision of the personal data would have the consequence that the contract with the data subject could not be concluded. Before personal data is provided by the data subject, the data subject must contact any employee. The employee clarifies to the data subject whether the provision of the personal data is required by law or contract or is necessary for the conclusion of the contract, whether there is an obligation to provide the personal data and the consequences of non-provision of the personal data.

13. Existence of automated decision-making

As a responsible company, we do not use automatic decision-making or profiling.

Developed by the specialists for LegalTech at Willing & Able that also developed the system for GDPR vacation tracker. The legal texts contained in our privacy policy generator have been provided and published by Prof. Dr. h.c. Heiko Jonny Maniero from the German Association for Data Protection and Christian Solmecke from WBS law.`,
    agreeLabel: "I have read and agree to the Privacy Policy",
    agreeError: "Please read and agree to the Privacy Policy to continue.",
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
