/**
 * German translations for Sinopia
 *
 * Struktur:
 * - common: Gemeinsame Texte in der App
 * - nav: Navigationsbeschriftungen
 * - home: Startseiten-Inhalt
 * - auth: Authentifizierungsseiten
 * - dashboard: Dashboard und geschützte Seiten
 * - footer: Fußzeilen-Inhalt
 */
export const de = {
  common: {
    appName: "Sinopia",
    loading: "Laden...",
    save: "Speichern",
    saving: "Speichern...",
    cancel: "Abbrechen",
    submit: "Absenden",
    delete: "Löschen",
    edit: "Bearbeiten",
    view: "Ansehen",
    close: "Schließen",
    back: "Zurück",
    next: "Weiter",
    search: "Suchen",
    filter: "Filtern",
    noResults: "Keine Ergebnisse gefunden",
    error: "Ein Fehler ist aufgetreten",
    success: "Erfolgreich",
    optional: "freiwillig",
    untitled: "Ohne Titel",
    unknown: "Unbekannt",
    more: "weitere",
  },
  nav: {
    home: "Startseite",
    about: "Über uns",
    vision: "Vision",
    imprint: "Impressum",
    contact: "Kontakt",
    signIn: "Anmelden",
    signUp: "Registrieren",
    getStarted: "Jetzt starten",
    dashboard: "Übersicht",
    projects: "Anwendungsfälle",
    offers: "Angebote",
    contracts: "Verträge",
    payments: "Zahlungen",
    notifications: "Benachrichtigungen",
    profile: "Profil",
    signOut: "Abmelden",
  },
  home: {
    heroTitle: "SIA verbindet - Fachwissen on demand Von Mensch zu Mensch zu",
    heroTitleHighlight: "Unternehmen",
    heroSubtitle:
      "Sinopia ermöglicht es Unternehmen, einen geschäftlichen Anwendungsfall in ein konkretes Ergebnis zu verwandeln, indem Anforderungen in die benötigten Fähigkeiten aufgeteilt werden, diese Fähigkeiten über die Agentic-KI-Plattform sofort verfügbar gemacht werden und die passenden Kompetenzen gezielt zur Lösung der Aufgabe orchestriert wird.",
    learnMore: "Mehr erfahren",
    featuresTitle: "Warum Sinopia wählen?",
    featuresSubtitle:
      "Alles, was Sie brauchen, um Fähigkeiten mit Möglichkeiten zu verbinden",
    feature1Title: "Perfekte Übereinstimmungen finden",
    feature1Desc:
      "Unser intelligenter Zuordnungs-Algorithmus verbindet Sie mit den richtigen Projekten oder Talenten basierend auf Ihren Fähigkeiten und Anforderungen.",
    feature2Title: "Sichere Zahlungen",
    feature2Desc:
      "Geschützte Transaktionen mit meilensteinbasierten Zahlungen stellen sicher, dass beide Parteien zufrieden sind, bevor Gelder freigegeben werden.",
    feature3Title: "Professionelle Verträge",
    feature3Desc:
      "Rechtlich bindende digitale Verträge, die sowohl Fähigkeitengeber als auch -sucher während des gesamten Projekts schützen.",
    ctaTitle: "Bereit anzufangen?",
    ctaSubtitle:
      "Schließen Sie sich Tausenden von Fachleuten an, die Sinopia bereits nutzen",
    ctaButton: "Konto erstellen",
    testimonials: {
      title: "Erfolgsgeschichten",
      subtitle:
        "Erfahren Sie von Fachleuten und Unternehmen, die ihre Ziele mit Sinopia erreicht haben.",
      mock: {
        person1Name: "Sarah Chen",
        person1Role: "Full-Stack-Entwicklerin",
        person1Type: "Fähigkeitengeber",
        person1Quote:
          "Sinopia hat meine Freelance-Karriere verändert. Ich habe beständige, hochwertige Projekte gefunden und mein Einkommen innerhalb von 6 Monaten verdoppelt.",
        person2Name: "Michael Torres",
        person2Role: "CTO bei TechFlow",
        person2Type: "Fähigkeitensucher",
        person2Quote:
          "Die Qualität der Talente auf Sinopia ist außergewöhnlich. Wir haben unsere gesamte mobile App mit einem Team aufgebaut, das wir hier gefunden haben.",
        person3Name: "Emily Roberts",
        person3Role: "UX-Designerin",
        person3Type: "Fähigkeitengeber",
        person3Quote:
          "Die Plattform ist intuitiv und das Zahlungssystem ist zuverlässig. Ich liebe, wie Sinopia Verträge und Meilensteine handhabt.",
      },
    },
  },
  auth: {
    signInTitle: "Willkommen zurück",
    signInSubtitle: "Melden Sie sich bei Ihrem Sinopia-Konto an",
    signInSuccess: "Erfolgreich angemeldet!",
    signInError:
      "Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut.",
    signUpTitle: "Konto erstellen",
    signUpSubtitle: "Treten Sie Sinopia bei und starten Sie Ihre Reise",
    email: "E-Mail",
    emailPlaceholder: "Geben Sie Ihre E-Mail ein",
    password: "Passwort",
    passwordPlaceholder: "Geben Sie Ihr Passwort ein",
    confirmPassword: "Passwort bestätigen",
    confirmPasswordPlaceholder: "Passwort erneut eingeben",
    firstName: "Vorname",
    lastName: "Nachname",
    rememberMe: "Angemeldet bleiben",
    noAccount: "Noch kein Konto?",
    hasAccount: "Bereits ein Konto?",
    signInButton: "Anmelden",
    signUpButton: "Konto erstellen",
    orContinueWith: "Oder fortfahren mit",
    skillGiver: "Fähigkeitengeber",
    skillSearcher: "Fähigkeitensucher",
    skillGiverDesc: "Ich möchte meine Fähigkeiten anbieten und Anwendungsfälle finden",
    skillSearcherDesc: "Ich möchte talentierte Fachleute finden",
    selectRole: "Wählen Sie Ihre Rolle",
    forgotPasswordTitle: "Passwort vergessen",
    forgotPasswordSubtitle:
      "Geben Sie Ihre E-Mail ein, um einen Reset-Code zu erhalten",
    sendCode: "Reset-Code senden",
    resetPasswordTitle: "Passwort zurücksetzen",
    resetPasswordSubtitle: "Geben Sie Ihr neues Passwort ein",
    resetButton: "Passwort zurücksetzen",
    otpTitle: "E-Mail bestätigen",
    otpSubtitle:
      "Geben Sie den 6-stelligen Code ein, der an Ihre E-Mail gesendet wurde",
    verifyButton: "Bestätigen",
    resendCode: "Code erneut senden",
    passwordsDoNotMatch: "Passwörter stimmen nicht überein",
    verificationRequired: "Verifizierung erforderlich",
    verificationCodeSent:
      "Ein Verifizierungscode wurde an Ihre E-Mail gesendet",
    otp: {
      title: "E-Mail bestätigen",
      description: "Wir haben einen 6-stelligen Code gesendet an",
      verifying: "Wird überprüft...",
      verifyEmail: "E-Mail bestätigen",
      verifyAndCreate: "Bestätigen & Konto erstellen",
      didntReceive: "Code nicht erhalten?",
      resend: "Erneut senden",
      backToSignUp: "Zurück zur Registrierung",
      sessionExpired: "Sitzung abgelaufen",
      pleaseLoginAgain: "Bitte melden Sie sich erneut an",
      pleaseSignUpAgain: "Bitte registrieren Sie sich erneut.",
      invalidCode: "Ungültiger Code",
      invalidCodeDesc: "Ungültiger Verifizierungscode",
      emailVerified: "E-Mail bestätigt!",
      nowUploadCv:
        "Bitte laden Sie jetzt Ihren Lebenslauf hoch, um die Registrierung abzuschließen.",
      accountCreated: "Erfolgreich!",
      accountCreatedDesc: "Ihr Konto wurde erfolgreich erstellt.",
      registrationFailed: "Registrierung fehlgeschlagen",
      somethingWentWrong:
        "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
      codeResent: "Code erneut gesendet",
      codeResentDesc:
        "Ein neuer Verifizierungscode wurde an Ihre E-Mail gesendet.",
    },
    forgotPassword: {
      title: "Passwort vergessen?",
      description:
        "Kein Problem! Geben Sie Ihre E-Mail ein und wir senden Ihnen einen Reset-Code.",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "sie@beispiel.de",
      sendButton: "Reset-Code senden",
      sending: "Senden...",
      backToSignIn: "Zurück zur Anmeldung",
      checkEmail: "Prüfen Sie Ihre E-Mails",
      checkEmailDesc:
        "Wir haben Ihnen einen Verifizierungscode zum Zurücksetzen Ihres Passworts gesendet.",
    },
    resetPassword: {
      title: "Passwort zurücksetzen",
      description: "Erstellen Sie ein neues Passwort für Ihr Konto",
      newPassword: "Neues Passwort",
      newPasswordPlaceholder: "Erstellen Sie ein sicheres Passwort",
      confirmPassword: "Passwort bestätigen",
      confirmPasswordPlaceholder: "Bestätigen Sie Ihr Passwort",
      passwordHint:
        "Mindestens 8 Zeichen mit Groß-, Kleinbuchstaben und einer Zahl",
      passwordsMatch: "Passwörter stimmen überein",
      passwordsDoNotMatch: "Passwörter stimmen nicht überein",
      resetButton: "Passwort zurücksetzen",
      resetting: "Zurücksetzen...",
      rememberPassword: "Sie erinnern sich an Ihr Passwort?",
      success: "Passwort erfolgreich zurückgesetzt!",
      successDesc: "Sie können sich jetzt mit Ihrem neuen Passwort anmelden.",
    },
    otpVerification: {
      title: "Verifizierungscode eingeben",
      description: "Wir haben einen 6-stelligen Code gesendet an",
      verifyButton: "Code verifizieren",
      verifying: "Verifizieren...",
      didntReceive: "Code nicht erhalten?",
      resend: "Erneut senden",
      backToSignIn: "Zurück zur Anmeldung",
      codeVerified: "Code verifiziert!",
      codeVerifiedResetDesc: "Sie können jetzt Ihr Passwort zurücksetzen.",
      codeVerifiedEmailDesc: "Ihre E-Mail wurde verifiziert.",
      codeResent: "Code erneut gesendet",
      codeResentDesc:
        "Ein neuer Verifizierungscode wurde an Ihre E-Mail gesendet.",
    },
    passwordValidation: {
      minLength: "Mindestens 8 Zeichen",
      uppercase: "Mindestens ein Großbuchstabe",
      number: "Mindestens eine Zahl",
      specialChar: "Mindestens ein Sonderzeichen (!@#$%^&*)",
    },
    cvUpload: {
      title: "Lebenslauf hochladen",
      description:
        "Bitte laden Sie Ihren Lebenslauf hoch, um Ihre Registrierung als Fähigkeitengeber abzuschließen",
      dropHere: "Lebenslauf hier ablegen",
      orClickBrowse: "oder klicken zum Durchsuchen",
      browseFiles: "Dateien durchsuchen",
      fileFormat: "PDF oder Word-Dokumente bis zu 5MB",
      remove: "Entfernen",
      creatingAccount: "Konto wird erstellt...",
      completeRegistration: "Registrierung abschließen",
      back: "Zurück",
      invalidFileType: "Ungültiger Dateityp",
      invalidFileTypeDesc: "Bitte laden Sie ein PDF- oder Word-Dokument hoch.",
      fileTooLarge: "Datei zu groß",
      fileTooLargeDesc: "Bitte laden Sie eine Datei kleiner als 5MB hoch.",
      skipForNow: "Überspringen",
      skipHelperText: "Du kannst deinen Lebenslauf jetzt hochladen oder überspringen und später hinzufügen.",
    },
  },
  dashboard: {
    welcome: "Willkommen zurück",
    overview: "Übersicht",
    recentProjects: "Aktuelle Anwendungsfälle",
    pendingOffers: "Ausstehende Angebote",
    activeContracts: "Aktive Verträge",
    totalEarnings: "Gesamtbetrag",
    completedProjects: "Abgeschlossene Anwendungsfälle",
    pendingPayments: "Ausstehende Zahlungen",
    quickActions: "Schnellaktionen",
    viewAll: "Alle anzeigen",
    noProjects: "Noch keine Anwendungsfälle",
    noOffers: "Keine ausstehenden Angebote",
    noContracts: "Keine aktiven Verträge",
    progress: "Fortschritt",
    from: "Von",
    stages: "Phasen",
  },
  projects: {
    title: "Anwendungsfälle",
    addNew: "Neues Anwendungsfall hinzufügen",
    search: "Anwendungsfälle suchen...",
    status: "Status",
    budget: "Budget",
    deadline: "Frist",
    skills: "Erforderliche Fähigkeiten",
    description: "Beschreibung",
    viewDetails: "Details anzeigen",
    applyNow: "Jetzt bewerben",
    jobRole: "Berufsbezeichnung",
    statusDraft: "Entwurf",
    statusOpen: "Offen",
    statusInProgress: "In Bearbeitung",
    statusCompleted: "Abgeschlossen",
    statusCancelled: "Storniert",
    statusPending: "Ausstehend",
    statusActive: "Aktiv",
    totalCost: "Gesamtbetrag",
    expertStatus: "Experten-Status",
    fetchError: "Anwendungsfälle konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
  },
  useCaseDetails: {
    backToProjects: "Zurück zu Anwendungsfälle",
    notFound: "Anwendungsfall nicht gefunden",
    notFoundDescription: "Der gesuchte Anwendungsfall existiert nicht oder wurde entfernt.",
    fetchError: "Laden fehlgeschlagen",
    fetchErrorDescription: "Beim Laden der Anwendungsfalldetails ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
    overview: "Übersicht",
    requiredExperts: "Benötigte Experten",
    implementationStages: "Implementierungsphasen",
    requiredSkills: "Erforderliche Fähigkeiten",
    perHour: "Std.",
  },
  projectDetail: {
    notFound: "Anwendungsfall nicht gefunden",
    backToProjects: "Zurück zu Anwendungsfälle",
    editProject: "Anwendungsfall bearbeiten",
    projectStages: "Anwendungsfall phasen",
    overall: "Gesamt",
    projectDetails: "Anwendungsfall details",
    assignedTo: "Zugewiesen an",
    overallCompletion: "Gesamtfortschritt",
  },
  offers: {
    title: "Angebote",
    pageTitle: "Angebote",
    subtitleGiver: "Sehen Sie Ihre gesendeten Angebote",
    subtitleSearcher: "Überprüfen und verwalten Sie eingehende Angebote",
    pending: "Ausstehend",
    accepted: "Angenommen",
    rejected: "Abgelehnt",
    amount: "Angebotsbetrag",
    message: "Nachricht",
    accept: "Annehmen",
    acceptOffer: "Angebot annehmen",
    reject: "Ablehnen",
    rejectOffer: "Angebot ablehnen",
    withdraw: "Zurückziehen",
    searchOffers: "Angebote suchen...",
    filterByStatus: "Nach Status filtern",
    allStatus: "Alle Status",
    noOffersFound: "Keine Angebote gefunden",
    adjustFilters: "Versuchen Sie, Ihre Suche oder Filter anzupassen",
    noOffersToDisplay: "Keine Angebote zum Anzeigen vorhanden",
    offerAccepted: "Angebot angenommen!",
    offerAcceptedDesc: "Der Vertrag wird in Kürze erstellt.",
    offerRejected: "Angebot abgelehnt",
    offerRejectedDesc: "Das Angebot wurde abgelehnt.",
    from: "Von",
    confirmAction: "Aktion bestätigen",
    confirm: "Bestätigen",
    sent: "Gesendet",
    offerAmount: "Angebotsbetrag",
    acceptConfirmDesc:
      "Sind Sie sicher, dass Sie dieses Angebot annehmen möchten? Ein Vertrag wird erstellt.",
    rejectConfirmDesc:
      "Sind Sie sicher, dass Sie dieses Angebot ablehnen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
    viewDetails: "Details anzeigen",
    termsAgreementTitle: "Allgemeine Geschäftsbedingungen",
    termsAgreementSubtitle: "Bitte lesen und akzeptieren Sie die Bedingungen, um fortzufahren",
    digitalSignature: "Digitale Unterschrift",
    digitallySignedBy: "Digital unterzeichnet von:",
    signatureDate: "Datum:",
    downloadPdf: "PDF herunterladen",
    agreeAndAccept: "Ich stimme zu & akzeptiere",
    untitledProject: "Unbenanntes Projekt",
    noJobTitle: "Keine Stellenbezeichnung angegeben",
    errorTitle: "Fehler beim Laden der Angebote",
    fetchError: "Angebote konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
    notFound: "Angebot nicht gefunden",
    notFoundDesc: "Das gesuchte Angebot existiert nicht oder wurde entfernt.",
    backToOffers: "Zurück zu Angeboten",
    jobDetails: "Stellendetails",
    role: "Rolle",
    description: "Beschreibung",
    workload: "Arbeitsbelastung",
    hours: "Stunden",
    employeesRequired: "Erforderliche Mitarbeiter",
    requiredSkills: "Erforderliche Fähigkeiten",
    noSkillsRequired: "Keine spezifischen Fähigkeiten erforderlich",
    acceptOfferPlaceholder: "Angebot annehmen Funktion wird implementiert.",
    rejectOfferPlaceholder: "Angebot ablehnen Funktion wird implementiert.",
  },
  contracts: {
    title: "Verträge",
    pageTitle: "Verträge",
    pageSubtitle: "Verwalten Sie Ihre Verträge und Vereinbarungen",
    sign: "Vertrag unterzeichnen",
    signed: "Unterzeichnet",
    pending: "Unterschrift ausstehend",
    viewContract: "Vertrag anzeigen",
    viewDetails: "Details anzeigen",
    downloadPdf: "PDF herunterladen",
    searchContracts: "Verträge suchen...",
    filterByStatus: "Nach Status filtern",
    allStatus: "Alle Status",
    draft: "Entwurf",
    sent: "Gesendet",
    noContractsFound: "Keine Verträge gefunden",
    adjustFilters: "Versuchen Sie, Ihre Suche oder Filter anzupassen",
    noContractsToDisplay: "Keine Verträge zum Anzeigen vorhanden",
    client: "Auftraggeber",
    freelancer: "Freiberufler",
    contractSigned: "Vertrag unterzeichnet!",
    contractActive: "Der Vertrag ist jetzt aktiv.",
    signContractDialog: "Vertrag unterzeichnen",
    signContractDesc:
      'Sie sind dabei, den Vertrag für "{projectTitle}" zu unterzeichnen. Dies macht den Vertrag rechtlich bindend.',
    contractValue: "Vertragswert",
    duration: "Laufzeit",
  },
  payments: {
    title: "Zahlungen",
    titleGiver: "Rechnungen & Einnahmen",
    titleSearcher: "Zahlungen",
    subtitleGiver: "Verfolgen Sie Ihre Rechnungen und Einnahmen",
    subtitleSearcher: "Verwalten Sie Ihre Zahlungen und Rechnungen",
    totalEarned: "Gesamt verdient",
    totalPaid: "Gesamt bezahlt",
    invoices: "Rechnungen",
    paymentHistory: "Zahlungsverlauf",
    pending: "Ausstehend",
    paid: "Bezahlt",
    overdue: "Überfällig",
    amount: "Betrag",
    dueDate: "Fälligkeitsdatum",
    payNow: "Jetzt bezahlen",
    downloadInvoice: "Rechnung herunterladen",
    searchInvoices: "Rechnungen suchen...",
    filterByStatus: "Nach Status filtern",
    allStatus: "Alle Status",
    noInvoicesFound: "Keine Rechnungen gefunden",
    adjustFilters: "Versuchen Sie, Ihre Suche oder Filter anzupassen",
    noInvoicesToDisplay: "Keine Rechnungen zum Anzeigen vorhanden",
    due: "Fällig",
    paidOn: "Bezahlt",
    noPayments: "Noch keine Zahlungen",
    noPaymentsToDisplay: "Keine Zahlungen zum Anzeigen vorhanden",
    paymentHistoryWillAppear: "Der Zahlungsverlauf wird hier angezeigt",
    recentPayments: "Letzte Zahlungen",
  },
  profile: {
    title: "Profil",
    pageTitle: "Profil",
    pageSubtitleGiver: "Verwalten Sie Ihr professionelles Profil",
    pageSubtitleSearcher: "Verwalten Sie Ihr Unternehmensprofil",
    editProfile: "Profil bearbeiten",
    saveChanges: "Änderungen speichern",
    about: "Bio",
    experience: "Erfahrung",
    education: "Ausbildung",
    certifications: "Zertifizierungen",
    personalProjects: "Persönliche Anwendungsfälle",
    mock: {
      giverTitle: "Senior Full-Stack-Entwickler",
      giverBio:
        "Erfahrener Full-Stack-Entwickler mit über 8 Jahren Erfahrung in der Entwicklung von Web- und Mobilanwendungen. Begeistert von sauberem Code und benutzerorientiertem Design.",
      giverLocation: "Düsseldorf, NW",
      giverAvailability: "Vollzeit",
      experience1Company: "TechCorp",
      experience1Role: "Senior-Entwickler",
      experience1Desc: "Leitung der Frontend-Entwicklung",
      experience2Company: "StartupXYZ",
      experience2Role: "Full-Stack-Entwickler",
      experience2Desc: "Entwicklung von Kernproduktfunktionen",
      searcherCompany: "TechCorp GmbH",
      searcherIndustry: "Technologie",
      searcherBio:
        "Führendes Technologieunternehmen, spezialisiert auf innovative Softwarelösungen für Unternehmenskunden.",
    },
    personalInfo: "Persönliche Informationen",
    professionalInfo: "Berufliche Informationen",
    skills: "Fähigkeiten",
    portfolio: "Arbeitsmappe",
    reviews: "Bewertungen",
    settings: "Einstellungen",
    uploadPhoto: "Foto hochladen",
    bio: "Biografie",
    bioPlaceholder: "Erzählen Sie uns etwas über sich und Ihre Erfahrung...",
    hourlyRate: "Stundensatz",
    availability: "Verfügbarkeit",
    location: "Standort",
    profileUpdated: "Profil aktualisiert!",
    changesSaved: "Ihre Änderungen wurden erfolgreich gespeichert.",
    saveFailed: "Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.",
    addSkill: "Fähigkeit hinzufügen",
    removeSkill: "Entfernen",
    skillName: "Fähigkeitsname",
    skillNamePlaceholder: "z.B. JavaScript, Projektmanagement",
    skillLevel: "Fähigkeitsstufe",
    present: "Heute",
    companyInfo: "Unternehmensinformationen",
    companyName: "Unternehmensname",
    industry: "Branche",
    contactEmail: "Kontakt-E-Mail",
    contactPhone: "Kontakttelefon",
    website: "Webseite",
    city: "Stadt",
    country: "Land",
    companySize: "Unternehmensgröße",
    locationNotSet: "—",
    fullName: "Vollständiger Name",
    fullNamePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
    phone: "Telefonnummer",
    phonePlaceholder: "Telefonnummer eingeben",
    linkedinUrl: "LinkedIn-URL",
    linkedinPlaceholder: "https://linkedin.com/in/ihrprofil",
    jobTitle: "Berufsbezeichnung",
    jobTitlePlaceholder: "z.B. Senior-Entwickler",
    address: "Adresse",
    addressPlaceholder: "Stadt, Land",
    email: "E-Mail",
    emailPlaceholder: "ihre@email.de",
    contactInfo: "Kontaktdaten",
    levelBeginner: "Anfänger",
    levelIntermediate: "Mittelstufe",
    levelAdvanced: "Fortgeschritten",
    levelExpert: "Experte",
    skillType: "Fähigkeitstyp",
    skillTypeTechnical: "Technisch",
    skillTypeSoft: "Soft Skill",
    editSkill: "Fähigkeit bearbeiten",
    skillAdded: "Fähigkeit erfolgreich hinzugefügt",
    skillUpdated: "Fähigkeit erfolgreich aktualisiert",
    skillDeleted: "Fähigkeit erfolgreich gelöscht",
    confirmDeleteSkill: "Sind Sie sicher, dass Sie diese Fähigkeit löschen möchten?",
    addExperience: "Erfahrung hinzufügen",
    experienceTitle: "Berufsbezeichnung",
    experienceTitlePlaceholder: "z.B. Senior-Entwickler",
    experienceCompany: "Unternehmen",
    experienceCompanyPlaceholder: "Unternehmensname",
    experienceStartDate: "Startdatum",
    experienceEndDate: "Enddatum",
    experiencePresent: "Arbeite derzeit hier",
    experienceDetails: "Details",
    experienceDetailsPlaceholder: "Beschreiben Sie Ihre Verantwortlichkeiten und Erfolge",
    addEducation: "Ausbildung hinzufügen",
    educationDegree: "Abschluss",
    educationDegreePlaceholder: "z.B. Bachelor of Science",
    educationInstitution: "Institution",
    educationInstitutionPlaceholder: "Universität oder Schulname",
    educationGraduationYear: "Abschlussjahr",
    educationGraduationYearPlaceholder: "JJJJ",
    educationGpa: "Notendurchschnitt",
    educationGpaPlaceholder: "z.B. 1,8",
    addCertification: "Zertifizierung hinzufügen",
    certificationName: "Zertifizierungsname",
    certificationNamePlaceholder: "z.B. AWS Solutions Architect",
    certificationAuthority: "Ausstellende Behörde",
    certificationAuthorityPlaceholder: "z.B. Amazon Web Services",
    certificationDate: "Erhaltungsdatum",
    certificationUpdated: "Zertifikat erfolgreich aktualisiert",
    certificationDeleted: "Zertifikat erfolgreich gelöscht",
    confirmDeleteCertificate: "Sind Sie sicher, dass Sie dieses Zertifikat löschen möchten?",
    educationUpdated: "Ausbildung erfolgreich aktualisiert",
    educationDeleted: "Ausbildung erfolgreich gelöscht",
    confirmDeleteEducation: "Sind Sie sicher, dass Sie diesen Ausbildungseintrag löschen möchten?",
    experienceUpdated: "Berufserfahrung erfolgreich aktualisiert",
    experienceDeleted: "Berufserfahrung erfolgreich gelöscht",
    confirmDeleteExperience: "Sind Sie sicher, dass Sie diesen Berufserfahrungseintrag löschen möchten?",
    projectUpdated: "Anwendungsfall erfolgreich aktualisiert",
    projectDeleted: "Anwendungsfall erfolgreich gelöscht",
    confirmDeleteProject: "Sind Sie sicher, dass Sie dieses Anwendungsfall löschen möchten?",
    projectUrl: "Projekt-URL",
    projectUrlPlaceholder: "z.B. https://github.com/benutzername/projekt",
    deleteFailed: "Löschen fehlgeschlagen",
    addProject: "Anwendungsfall hinzufügen",
    projectName: "Anwendungsfall name",
    projectNamePlaceholder: "Name Ihres Anwendungsfälle",
    projectDescription: "Beschreibung",
    projectDescriptionPlaceholder: "Was haben Sie erstellt? Welches Problem haben Sie gelöst?",
    projectTechnologies: "Technologien",
    projectTechnologiesPlaceholder: "z.B. React, Node.js, PostgreSQL",
    projectDuration: "Dauer",
    projectDurationPlaceholder: "z.B. 3 Monate oder Jan 2024 - März 2024",
    editContactInfo: "Kontaktdaten bearbeiten",
    editCompanyInfo: "Unternehmensdaten bearbeiten",
    websitePlaceholder: "https://www.beispiel.de",
    companyNamePlaceholder: "Ihr Unternehmensname",
    cityPlaceholder: "Stadt",
    countryPlaceholder: "Land",
    companySizePlaceholder: "z.B. 10-50 Mitarbeiter",
    invalidWebsiteUrl: "Bitte geben Sie eine gültige Webseiten-URL ein",
    websiteHelperText: "Bitte beginnen Sie Ihre Website mit https://",
    websiteMustStartWithHttps: "Website muss mit https:// beginnen",
    cvUploadTitle: "Lebenslauf hochladen (KI-gestützt)",
    cvUploadDescription: "Ziehe deinen Lebenslauf hierher oder klicke zum Auswählen",
    cvUploadSupported: "Unterstützt: Nur PDF (max. 5MB)",
    cvUploadButton: "Hochladen & mit KI auslesen",
    cvSkipButton: "Überspringen",
    cvUploaded: "Lebenslauf hochgeladen",
    cvNotUploaded: "Nicht hochgeladen",
    cvUploading: "Wird hochgeladen...",
    cvExtracting: "Mit KI extrahieren...",
    cvExtractingDescription: "Unsere KI analysiert Ihren Lebenslauf, um Fähigkeiten, Erfahrung und Qualifikationen zu extrahieren.",
    cvUploadSuccess: "Lebenslauf erfolgreich hochgeladen",
    cvExtractionComplete: "Dein Profil wurde mit den extrahierten Informationen aktualisiert.",
    cvExtractionPartial: "Nicht alles konnte extrahiert werden. Du kannst es manuell bearbeiten.",
    cvExtractionFailed: "Nicht alle Informationen konnten extrahiert werden. Du kannst sie manuell bearbeiten.",
    cvInvalidFileType: "Bitte lade ein PDF- oder Word-Dokument hoch.",
    cvFileTooLarge: "Bitte lade eine Datei kleiner als 5MB hoch.",
    cvDropHere: "Datei hier ablegen",
    cvSelectedFile: "Ausgewählte Datei",
    cvRemoveFile: "Entfernen",
  },
  footer: {
    skillGiver: "Fähigkeitengeber",
    findProjects: "Anwendungsfälle finden",
    buildPortfolio: "Arbeitsmappe aufbauen",
    getPaid: "Bezahlt werden",
    skillSearcher: "Fähigkeitensucher",
    postProjects: "Aufgaben erstellen",
    findTalent: "Talente finden",
    manageTeams: "Teams verwalten",
    legal: "Rechtliches",
    terms: "Nutzungsbedingungen",
    privacy: "Datenschutzerklärung",
    contactUs: "Kontakt",
    copyright: "Alle Rechte vorbehalten.",
    tagline:
      "Verbinde Fähigkeiten mit Möglichkeiten. Baue deine Karriere auf oder finde die Talente, die du brauchst.",
    poweredBy: "bereitgestellt von curizen",
  },
  about: {
    title: "Über Sinopia",
    subtitle: "Verbindung von Skills und Fähigkeitslücken seit 2025",
    storyTitle: "Unsere Geschichte",
    storyText1:
      "Sinopia ist ein junges und innovatives Unternehmen mit einer klaren Vision: bestehendes gesellschaftliches Potenzial neu zu denken und auf neue, sinnvolle Weise zugänglich zu machen.",
    storyText2:
      "Unsere Mission ist es, alternative und manchmal disruptive Ansätze zu entwickeln, um wertvolle Ressourcen - insbesondere menschliche Expertise und Erfahrung - wieder in den sozialen und wirtschaftlichen Kreislauf zu integrieren.",
    storyText3:
      "Die Idee hinter Sinopia wurde von einem einfachen, aber tiefgründigen Bild inspiriert: uralte Höhlenmalereien, die menschliche Hände darstellen – ein zeitloses Symbol für Verbindung, Unterstützung und die Weitergabe von Wissen.",
    storyText4:
      "Aus dieser Symbolik entstand die Vision, die umfangreiche Erfahrung von Rentnern und erfahrenen Fachleuten der heutigen Arbeitswelt zur Verfügung zu stellen – flexibel, gezielt und wirkungsvoll. Als Gründer sind wir überzeugt, dass unser Ansatz nicht nur die Herausforderungen des demografischen Wandels adressiert, sondern auch zur sozialen Teilhabe, zum Wissenserhalt und zu einem nachhaltigeren Arbeitsmarkt beiträgt.",
    valuesTitle: "Unsere Werte",
    valuesChips: {
      service: "Service-Expertise",
      innovation: "Innovation",
      newThinking: "Neues Denken",
      orchestration: "Orchestrierung",
      partnership: "Partnerschaft",
      integrity: "Integrität",
      achievement: "Ausführung",
    },
    sinopia: {
      s: {
        letter: "S",
        title: "Service Expertise",
        description: "Wir stehen für eine hohe Qualität der eingesetzten Skills und Kompetenzen.",
      },
      i1: {
        letter: "I",
        title: "Innovation",
        description: "Wir stehen für neue Wege und Lösungen. \"Um die Ecke denken\", im Sinne des Kunden und der Gesellschaft.",
      },
      n: {
        letter: "N",
        title: "Neues Denken",
        description: "Wir möchten mit dem Kunden neue Wege gehen, Prozesse zu denken und zu leben. Skill basiert, nicht Personal zentriert.",
      },
      o: {
        letter: "O",
        title: "Orchestrierung",
        description: "Unser Ansatz basiert auf einem nahezu vollständig automatisierten Ansatz. So garantieren wir kurze Anlaufzeiten und eine zielgerichtete Einsatz  sowie Auftragsabwicklung.",
      },
      p: {
        letter: "P",
        title: "Partnerschaft",
        description: "Wir führen eine Partnerschaft auf Augenhöhe. Langfristig, zielorientiert und fair.",
      },
      i2: {
        letter: "I",
        title: "Integrität",
        description: "Wir leben unsere Werte im täglichen Handeln. Und stehen zu unseren Aussagen.",
      },
      a: {
        letter: "A",
        title: "Ausführung",
        description: "Wir denken ergebnis-orientiert. Nicht der \"Weg\" zählt, sondern das \"Ziel\".",
      },
    },
    skillsTitle: "Unsere Stärken",
    skill1Name: "Skill Zuordnung",
    skill1Desc:
      "Verbindung der richtigen Skills mit spezifischen Aufgaben basierend auf verifizierter Expertise.",
    skill2Name: "ESCO Kompetenz Zuordnung",
    skill2Desc:
      "Nutzung des europäischen Rahmens für Fähigkeiten, Kompetenzen und Berufe zur standardisierten Klassifizierung.",
    skill3Name: "Use-Case Definition",
    skill3Desc:
      "Definition klarer Ziele, Liefergegenstände und Meilensteine für erfolgreiche Ergebnisse.",
    skill4Name: "Vertrags & Meilenstein-Verwaltung",
    skill4Desc:
      "Strukturierte Vereinbarungen mit transparenter Fortschrittsverfolgung und Zahlungsplänen.",
    skill5Name: "Qualitätssicherung",
    skill5Desc:
      "Sicherstellung der Standardkonformität durch systematische Überprüfungs und Verifizierungsprozesse.",
    skill6Name: "Skill Einarbeitung",
    skill6Desc:
      "Nahtlose Integration von benötiger Skills in Prozesse und Use-Cases mit klaren Erwartungen und Unterstützung.",
  },
  time: {
    justNow: "Gerade eben",
    minutesAgo: " Min.",
    hoursAgo: " Std.",
    daysAgo: " T.",
  },
  notifications: {
    title: "Benachrichtigungen",
    unreadCount: "Sie haben {count} ungelesene Benachrichtigung(en)",
    allCaughtUp: "Alles erledigt!",
    markAllRead: "Alle als gelesen markieren",
    noNotifications: "Keine Benachrichtigungen",
    noNotificationsDesc:
      "Alles erledigt! Neue Benachrichtigungen erscheinen hier.",
    recentActivity: "Letzte Aktivität",
    viewDetails: "Details anzeigen",
    markAsRead: "Als gelesen markieren",
    delete: "Löschen",
  },
  contact: {
    title: "Kontakt",
    subtitle: "Wir freuen uns von Ihnen zu hören",
    nameLabel: "Ihr Name",
    namePlaceholder: "Max Mustermann",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "max@beispiel.de",
    subjectLabel: "Betreff",
    subjectPlaceholder: "Wie können wir helfen?",
    messageLabel: "Nachricht",
    messagePlaceholder: "Erzählen Sie uns mehr über Ihre Anfrage...",
    sendButton: "Nachricht senden",
    successMessage:
      "Vielen Dank für Ihre Nachricht. Wir melden uns bald bei Ihnen!",
    info: {
      email: "E-Mail",
      phone: "Telefon",
      office: "Büro",
    },
  },
  features: {
    forSkillGivers: "Für Fähigkeitengeber",
    skillGiversDesc:
      "Rentner, erfahrene Experten und Fachleute, die ihre Erfahrung anbieten.",
    forSkillSearchers: "Für Fähigkeitensucher",
    skillSearchersDesc:
      "Unternehmen, die präzise Expertise für Aufgaben, Prozesse oder Anwendungsfälle suchen.",
    howItWorks: "So funktioniert es",
    howItWorksDesc:
      "Der Einstieg bei Sinopia ist einfach. Folgen Sie diesen einfachen Schritten, um Ihre Reise zu beginnen.",
    fastMatching: "Schnelle Zuordnung",
    securePayments: "Sichere Zahlungen",
    support247: "24/7 Unterstützung",
    sg1Title: "Teilen Sie Ihr Fachwissen",
    sg1Desc:
      "Bringen Sie Ihr lebenslanges Wissen in bedeutungsvolle, flexible Projekte ein.",
    sg2Title: "Aufgabenbasierte Arbeit",
    sg2Desc:
      "Werden Sie mit gezielten, modularen Aufgaben abgestimmt, die auf Ihre Fähigkeiten zugeschnitten sind.",
    sg3Title: "Faire & sichere Vergütung",
    sg3Desc:
      "Erhalten Sie transparente Preise und zuverlässige Zahlungen basierend auf Aufwand und Expertise.",
    ss1Title: "Zugang zu erfahrenen Fachleuten",
    ss1Desc:
      "Finden Sie erfahrene Experten mit verifizierten Fähigkeiten und tiefem Branchenwissen.",
    ss2Title: "KI-gesteuerte Zuordnung",
    ss2Desc:
      "Erhalten Sie maßgeschneiderte Aufgabenempfehlungen, Kompetenz-Zuordnungen (ESCO) und Aufwandsschätzungen.",
    ss3Title: "Modulare Projektabwicklung",
    ss3Desc:
      "Unterteilen Sie Arbeit in klare Aufgaben und Meilensteine für vorhersehbare Ergebnisse.",
    step1Title: "Erstellen Sie Ihr Profil",
    step1Desc:
      "Erstellen Sie Ihr Profil und skizzieren Sie Ihre Fähigkeiten oder reichen Sie Ihr Projekt ein.",
    step2Title: "Intelligent zugeordnet werden",
    step2Desc:
      "KI analysiert Anforderungen und empfiehlt die richtigen Experten basierend auf Fähigkeiten.",
    step3Title: "Mit Klarheit zusammenarbeiten",
    step3Desc:
      "Arbeiten Sie durch strukturierte Aufgaben mit transparenter Preisgestaltung und sicherer Zahlung.",
  },
  cta: {
    title: "Bereit, Ihre Reise zu starten?",
    subtitle:
      "Schließen Sie sich Tausenden von Fachleuten und Unternehmen an, die ihre Ziele bereits mit Sinopia erreichen.",
    createAccount: "Kostenloses Konto erstellen",
    contactSales: "Vertrieb kontaktieren",
  },
  terms: {
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    viewTerms: "Bedingungen ansehen",
    openFullTerms: "Vollständige Nutzungsbedingungen öffnen",
    agreeLabel: "Ich habe die Allgemeinen Geschäftsbedingungen gelesen und akzeptiere sie",
    scrollToAccept: "Bitte scrollen Sie nach unten, um die Zustimmung zu aktivieren",
    acceptError: "Bitte lesen und akzeptieren Sie die Nutzungsbedingungen, um fortzufahren.",
    acceptButton: "Ich stimme zu",
    closeButton: "Schließen",
    content: `**Allgemeine Geschäftsbedingungen (AGB)**
**Sinopia Deutschland GmbH**
Stand: 27.01.2026


**§ 1 Geltungsbereich und Begriffsbestimmungen**

1. Diese Allgemeinen Geschäftsbedingungen gelten für sämtliche Nutzungs- und Vertragsverhältnisse zwischen der Sinopia Deutschland GmbH (nachfolgend „Sinopia") und den Nutzern der Sinopia-Plattform.

2. Nutzer der Plattform sind:
• Skill-Searcher: Unternehmen oder Organisationen, die über die Plattform konkrete Use Cases einstellen und Leistungen nachfragen.
• Skill-Giver: Selbstständige, Freiberufler oder Unternehmen, die ihre Fähigkeiten und Kompetenzen über die Plattform anbieten.

3. Sinopia betreibt eine digitale Plattform zur Vermittlung von Leistungen, ist jedoch nicht selbst Leistungserbringer der durch Skill-Giver erbrachten Leistungen.

4. Abweichende Geschäftsbedingungen von Skill-Searchern oder Skill-Givern finden keine Anwendung, es sei denn, Sinopia stimmt ihrer Geltung ausdrücklich schriftlich zu.

5. Individuelle Vereinbarungen zwischen Sinopia und den Nutzern haben Vorrang vor diesen AGB.


**§ 2 Gegenstand der Plattform und Leistungen von Sinopia**

1. Sinopia stellt eine digitale Plattform bereit, über die:
• Skill-Searcher konkrete Use Cases beschreiben und anfragen können,
• Skill-Giver passende Angebote zur Umsetzung dieser Use Cases erhalten.

2. Sinopia übernimmt insbesondere:
• Analyse und Strukturierung der Anfrage des Skill-Searchers,
• Erstellung eines Angebots inkl. Preis für den Skill-Searcher,
• Auswahl und Beauftragung eines geeigneten Skill-Givers,
• Koordination der Beauftragung und Abwicklung über die Plattform.

3. Sinopia schuldet keinen bestimmten wirtschaftlichen oder technischen Erfolg der vermittelten Leistung, sondern ausschließlich die ordnungsgemäße Vermittlung und Plattformbereitstellung.


**§ 3 Vertragsschluss und Vertragsverhältnisse**

1. Zwischen Sinopia und dem Skill-Searcher kommt ein Vertrag zustande, sobald der Skill-Searcher ein von Sinopia unterbreitetes Angebot annimmt.

2. Zwischen Sinopia und dem Skill-Giver kommt ein separater Vertrag zustande, sobald der Skill-Giver ein von Sinopia unterbreitetes Leistungsangebot annimmt.

3. Ein unmittelbarer Vertrag zwischen Skill-Searcher und Skill-Giver kommt nicht zustande, sofern nicht ausdrücklich schriftlich etwas anderes vereinbart wird.

4. Sinopia ist berechtigt, Anfragen oder Angebote ohne Angabe von Gründen abzulehnen.


**§ 4 Angebots- und Leistungsprozess**

1. Der Skill-Searcher erhält von Sinopia ein verbindliches Angebot mit Leistungsbeschreibung, Preis und Laufzeit.

2. Der Skill-Giver erhält von Sinopia ein separates Angebot zur Durchführung der angefragten Leistung.

3. Angebote gelten nur für den jeweils angegebenen Zeitraum.

4. Die Leistungserbringung erfolgt ausschließlich durch den Skill-Giver in eigener Verantwortung.


**§ 5 Rolle und Pflichten der Skill-Giver**

1. Skill-Giver handeln selbstständig und auf eigene Rechnung.

2. Es besteht kein Arbeits-, Dienst- oder Gesellschaftsverhältnis zwischen Sinopia und dem Skill-Giver.

3. Skill-Giver sind für die ordnungsgemäße, fachgerechte und fristgerechte Erbringung der Leistung verantwortlich.

4. Skill-Giver gewährleisten, dass sie über die erforderlichen Qualifikationen und Rechte zur Leistungserbringung verfügen.


**§ 6 Rolle und Pflichten der Skill-Searcher**

1. Skill-Searcher sind verpflichtet, ihre Use Cases vollständig, korrekt und wahrheitsgemäß zu beschreiben.

2. Änderungen des Leistungsumfangs bedürfen der schriftlichen Zustimmung von Sinopia.

3. Verzögerungen oder Mehrkosten aufgrund unvollständiger oder fehlerhafter Angaben gehen zu Lasten des Skill-Searchers.


**§ 7 Vergütung und Zahlungsabwicklung**

1. Die Vergütung des Skill-Searchers richtet sich nach dem von Sinopia unterbreiteten Angebot.

2. Sinopia ist berechtigt, Zahlungen treuhänderisch entgegenzunehmen und nach Leistungserbringung an den Skill-Giver weiterzuleiten.

3. Sinopia behält sich eine Plattform- bzw. Vermittlungsgebühr vor.

4. Alle Preise verstehen sich zzgl. der gesetzlichen Umsatzsteuer, sofern anwendbar.


**§ 8 Haftung**

1. Sinopia haftet unbeschränkt für Schäden aus der Verletzung von Leben, Körper oder Gesundheit.

2. Für sonstige Schäden haftet Sinopia nur bei Vorsatz oder grober Fahrlässigkeit.

3. Sinopia haftet nicht für die tatsächliche Leistungserbringung durch Skill-Giver, deren Qualität oder Ergebnisse.


**§ 9 Mängel und Reklamationen**

1. Beanstandungen sind unverzüglich an Sinopia zu richten.

2. Sinopia ist berechtigt, den Sachverhalt mit dem Skill-Giver zu klären und eine Nachbesserung zu vermitteln.

3. Weitergehende Ansprüche bestehen nur im Rahmen der gesetzlichen Vorschriften.


**§ 10 Kündigung und Stornierung**

1. Verträge können gemäß den im Angebot vereinbarten Bedingungen gekündigt werden.

2. Bereits erbrachte Leistungen sind anteilig zu vergüten.

3. Sinopia ist berechtigt, Nutzer bei Verstößen gegen diese AGB von der Plattform auszuschließen.


**§ 11 Urheber- und Nutzungsrechte**

1. Rechte an Arbeitsergebnissen verbleiben beim Skill-Giver, sofern nicht ausdrücklich anders vereinbart.

2. Der Skill-Searcher erhält ein einfaches Nutzungsrecht im vereinbarten Umfang.


**§ 12 Vertraulichkeit**

1. Alle Parteien verpflichten sich zur Vertraulichkeit über nicht öffentliche Informationen.

2. Diese Verpflichtung gilt auch nach Vertragsende fort.


**§ 13 Datenschutz**

Die Verarbeitung personenbezogener Daten erfolgt gemäß DSGVO und der Datenschutzerklärung von Sinopia.


**§ 14 Schlussbestimmungen**

1. Es gilt deutsches Recht.

2. Gerichtsstand ist Stuttgart, sofern gesetzlich zulässig.

3. Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen Regelungen unberührt.`,
  },
  language: {
    en: "EN",
    de: "DE",
    switchTo: "Sprache wechseln",
  },
  errors: {
    pageNotFound: "404 Seite nicht gefunden",
    pageNotFoundDesc: "Die gesuchte Seite existiert nicht.",
    goHome: "Zur Startseite",
  },
  settings: {
    title: "Einstellungen",
    subtitle: "Verwalten Sie Ihre Kontoeinstellungen und Vorlieben",
    language: "Sprache",
    languageDesc: "Wählen Sie Ihre bevorzugte Sprache",
    appearance: "Erscheinungsbild",
    appearanceDesc: "Passen Sie das Aussehen an",
    lightMode: "Hellmodus",
    darkMode: "Dunkelmodus",
    account: "Konto",
    accountDesc: "Ihre Kontoinformationen",
    email: "E-Mail-Adresse",
    role: "Rolle",
    currentLanguage: "Aktuelle Sprache",
    profilePicture: "Profilbild",
    profilePictureDesc:
      "Laden Sie ein Profilbild hoch, um Ihr Konto zu personalisieren",
    uploadPicture: "Bild hochladen",
    imageFormats: "JPG, PNG, GIF oder WebP. Maximal 5MB.",
    invalidImageType:
      "Ungültiger Bildtyp. Bitte verwenden Sie JPG, PNG, GIF oder WebP.",
    imageTooLarge: "Bild ist zu groß. Maximale Größe ist 5MB.",
    profilePictureUpdated: "Profilbild aktualisiert",
    profilePictureUpdatedDesc: "Ihr Profilbild wurde erfolgreich aktualisiert.",
    uploadFailed:
      "Hochladen des Bildes fehlgeschlagen. Bitte versuchen Sie es erneut.",
    changePassword: "Kennwort ändern",
    changePasswordDesc:
      "Aktualisieren Sie Ihr Kennwort, um Ihr Konto zu schützen",
    currentPassword: "Aktuelles Kennwort",
    currentPasswordPlaceholder: "Aktuelles Kennwort eingeben",
    newPassword: "Neues Kennwort",
    newPasswordPlaceholder: "Neues Kennwort eingeben",
    confirmPassword: "Neues Kennwort bestätigen",
    confirmPasswordPlaceholder: "Neues Kennwort bestätigen",
    updatePassword: "Kennwort aktualisieren",
    deleteAccount: "Konto löschen",
    deleteAccountDesc:
      "Ihr Konto und alle zugehörigen Daten dauerhaft entfernen",
    deleteAccountWarning:
      "Sobald Sie Ihr Konto löschen, gibt es kein Zurück. Bitte seien Sie sich sicher.",
    deleteAccountButton: "Konto löschen",
    deleteConfirmTitle: "Sind Sie absolut sicher?",
    deleteConfirmDesc:
      "Diese Aktion kann nicht rückgängig gemacht werden. Ihr Konto wird dauerhaft gelöscht und Ihre Daten werden von unseren Servern entfernt.",
    accountDeleted: "Konto gelöscht",
    accountDeletedDesc: "Ihr Konto wurde erfolgreich gelöscht.",
    deleteAccountFailed:
      "Konto konnte nicht gelöscht werden. Bitte versuchen Sie es erneut.",
    passwordTooShort: "Kennwort muss mindestens 8 Zeichen lang sein.",
    passwordMismatch: "Kennwörter stimmen nicht überein.",
    passwordChanged: "Kennwort geändert",
    passwordChangedDesc: "Ihr Kennwort wurde erfolgreich aktualisiert.",
    passwordChangeFailed:
      "Änderung des Kennworts fehlgeschlagen. Bitte versuchen Sie es erneut.",
  },
  menu: {
    menu: "Menü",
    home: "Startseite",
  },
  emptyState: {
    notSet: "Nicht gesetzt",
    noData: "Keine Daten verfügbar",
    noProjects: "Noch keine Anwendungsfälle",
    noOffers: "Noch keine Angebote",
    noContracts: "Noch keine Verträge",
    noPayments: "Noch keine Zahlungen",
    noSkills: "Keine Fähigkeiten hinzugefügt",
    noExperience: "Keine Erfahrung hinzugefügt",
    noEducation: "Keine Ausbildung hinzugefügt",
    noCertifications: "Keine Zertifizierungen hinzugefügt",
    noPersonalProjects: "Keine persönlichen Anwendungsfälle hinzugefügt",
  },
  status: {
    paid: "Bezahlt",
    pending: "Ausstehend",
    signed: "Unterzeichnet",
    overdue: "Überfällig",
    draft: "Entwurf",
    accepted: "Angenommen",
    rejected: "Abgelehnt",
    sent: "Gesendet",
  },
  vision: {
    title: "Vision",
    teamPhotoAlt: "Sinopia Gründungsteam",
    content:
      "Der Fachkräftemangel ist allgegenwärtig! Die bisherigen Lösungen dem Mangel an Personal entgegenzuwirken belaufen sich primär auf den Aufbau neuer Arbeitskräfte, Einbindung von Fachkräften aus anderen Ländern oder Förderung von Quereinsteigern. Wir als Sinopia möchten vorhandenes Wissen nutzen. Gerade die Generation der Babyboomer, die jetzt aus dem aktiven Berufsleben in die Rente gehen, bringen mit Ihrem Erfahrungsschatz einen enormen Mehrwert für die Wirtschaft. Laut einer Erhebung aus 2023 sind nur ca. 13% der Rentner nach Renteneintritt noch erwerbstätig. Oft nicht aus dem Willen, noch einen Beitrag leisten zu wollen, sondern aus einem Mangel an zugeschnittenen Angeboten. Zugeschnitten auf eine individuelle Balance zwischen Beitrag und Freizeit. Wir möchten eine Verbindung zwischen Angebot und Nachfrage generieren, allerdings anders als mit standardisierten Arbeitsverträgen. Es geht darum, Arbeitsprozesse neu zu betrachten und in kleinteilige Einzelaufträge (sogenannte Aufgaben) zu unterteilen, die speziell auf die Bedürfnisse der Unternehmen sowie Erwerbstätigen (Kompetenz-Kollektiv) zugeschnitten sind.",
    foundingTeam: "Gründungsteam",
  },
  privacy: {
    title: "Datenschutzerklärung",
    introductionText:
      "Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (z. B. Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies stets auf freiwilliger Basis, soweit möglich. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.",
    ipAddresses: "IP-Adressen und Protokolldateien",
    ipAddressesText:
      "Beim Aufruf dieser Website werden die IP-Adressen der Besucher erfasst und in Logfiles gespeichert. Diese IP-Adressen werden für maximal sieben Tage gespeichert, um Angriffe zu erkennen und zu verhindern.",
    security: "Sicherheitshinweis",
    securityText:
      "Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein vollständiger Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
    advertising: "Widerspruch gegen unerwünschte Werbung",
    advertisingText:
      "Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber dieser Website behalten sich rechtliche Schritte im Falle unverlangter Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.",
    contactFormReference:
      "Hinweise zum Kontaktformular finden Sie im nachfolgenden Abschnitt dieser Datenschutzerklärung.",
    contactFormTitle: "Datenschutzbestimmungen zum Kontaktformular",
    contactFormText:
      "Über das Kontaktformular werden personenbezogene Daten erhoben. Gemäß Art. 13 der EU-Datenschutz-Grundverordnung (DSGVO) informieren wir Sie hiermit über die mit dieser Erhebung verbundene Datenverarbeitung. Ergänzend gilt die allgemeine Datenschutzerklärung für die Website der Sinopia Deutschland GmbH.",
    processingScope: "Umfang der Verarbeitung personenbezogener Daten",
    processingItems:
      "Vorname|Firmenname|E-Mail-Adresse|Telefonnummer|Ihre Nachricht",
    processingItemsAuto:
      "Zusätzlich werden folgende Daten automatisch erhoben:",
    processingItemsAutoList:
      "Bestätigung Ihrer Einwilligungserklärung|Datum und Uhrzeit der Formularübermittlung",
    legalBasis: "Rechtsgrundlage",
    legalBasisText:
      "Die Erhebung der Formulardaten erfolgt auf Grundlage der Einwilligung der betroffenen Personen gemäß Art. 6 Abs. 1 lit. a DSGVO.",
    purpose: "Zweck der Datenverarbeitung",
    purposeText:
      "Das Formular dient der Kontaktaufnahme mit der Sinopia Deutschland GmbH. Die von Ihnen übermittelten Daten werden zu Informationszwecken sowie zur Zusendung von Veranstaltungsinformationen der Sinopia Deutschland GmbH verwendet. Sie können der Kontaktaufnahme und der Verarbeitung Ihrer Daten jederzeit widersprechen.",
    storageDuration: "Speicherdauer",
    storageDurationText:
      "Ihre Daten werden zum Zwecke der Kommunikation mit der Sinopia Deutschland GmbH gespeichert, solange Ihre E-Mail-Adresse gültig ist oder bis Sie der Speicherung widersprechen. Der Widerspruch kann jederzeit formlos an info[at]sinopia.de erfolgen. Anschließend werden Ihre Daten vollständig gelöscht.",
    contactDetails: "Kontaktangaben",
    contactDetailsText:
      "Verantwortlich für diese Website ist die Sinopia Deutschland GmbH (siehe",
    contactDetailsLink: "Impressum",
    yourRights: "Ihre Rechte als betroffene Person",
    yourRightsText:
      "Als betroffene Person können Sie Ihre Rechte gemäß der EU-Datenschutz-Grundverordnung jederzeit geltend machen.",
  },
  imprint: {
    title: "Impressum",
    subtitle: "Angaben gemäß § 5 DDG",
    companyName: "Sinopia Deutschland GmbH",
    companyAddress:
      "Deckerstr. 39\n70372 Stuttgart\nHandelsregister: HRA 800342\nRegistergericht: Stuttgart",
    representedByTitle: "Vertreten durch:",
    representedByNames: "Jens Uwe Jung, Tobias Bahlinger und Eyad Dawood",
    contactTitle: "Kontakt:",
    contactDetails: "Telefon: 0177-4928319\ninfo@sinopia.eu",
    vatIdTitle: "Umsatzsteuer-ID:",
    vatIdNumber: "DE455888790",
    responsibleTitle: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:",
    responsibleDetails: "Jens Uwe Jung\nDeckerstr. 39\n70372 Stuttgart",
    disclaimerTitle: "Haftungsausschluss:",
    euDisputeTitle: "EU-Streitschlichtung",
    euDisputeText:
      "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:",
    euDisputeEmail: "Unsere E-Mail-Adresse finden Sie oben im Impressum.",
    consumerDisputeTitle:
      "Verbraucherstreitbeilegung / Universalschlichtungsstelle",
    consumerDisputeText:
      "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    contentLiabilityTitle: "Haftung für Inhalte",
    contentLiabilityText:
      "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    linkLiabilityTitle: "Haftung für Links",
    linkLiabilityText:
      "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    copyrightTitle: "Urheberrecht",
    copyrightText:
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
    privacyTitle: "Datenschutz",
    privacyText: "Informationen zum Datenschutz erhalten Sie in unserer",
  },
  onboarding: {
    step1: "Konto",
    step2: "Unternehmensdaten",
    step2of2: "Schritt 2/2",
    companyInfoTitle: "Unternehmensinformationen",
    companyInfoSubtitle:
      "Erzählen Sie uns von Ihrem Unternehmen, um Ihre Registrierung abzuschließen",
    companyName: "Unternehmensname",
    companyNamePlaceholder: "Geben Sie Ihren Unternehmensnamen ein",
    industry: "Branche",
    industryPlaceholder: "z.B. Technologie, Gesundheitswesen, Finanzen",
    contactEmail: "Kontakt-E-Mail",
    contactEmailPlaceholder: "Geben Sie die Kontakt-E-Mail ein",
    contactPhone: "Kontakttelefon",
    contactPhonePlaceholder: "Geben Sie die Kontakttelefonnummer ein",
    city: "Stadt",
    cityPlaceholder: "Geben Sie Ihre Stadt ein",
    country: "Land",
    countryPlaceholder: "Geben Sie Ihr Land ein",
    companySize: "Unternehmensgröße",
    companySizePlaceholder: "Unternehmensgröße auswählen",
    companySize1to10: "1-10 Mitarbeiter",
    companySize11to50: "11-50 Mitarbeiter",
    companySize51to200: "51-200 Mitarbeiter",
    companySize201to500: "201-500 Mitarbeiter",
    companySize501to1000: "501-1000 Mitarbeiter",
    companySize1000plus: "1000+ Mitarbeiter",
    bio: "Über uns",
    bioPlaceholder: "Erzählen Sie uns von Ihrem Unternehmen (freiwillig)",
    website: "Webseite",
    websitePlaceholder: "https://example.com",
    websiteHelperText: "Bitte beginnen Sie Ihre Website mit https://",
    websiteMustStartWithHttps: "Website muss mit https:// beginnen",
    continueButton: "Weiter zur Übersicht",
    companyInfoSaved: "Unternehmensinformationen gespeichert",
    companyInfoSavedDesc:
      "Ihre Unternehmensdaten wurden erfolgreich gespeichert.",
    companyInfoRequired:
      "Bitte vervollständigen Sie Ihre Unternehmensdaten, um fortzufahren.",
    fillAllRequired: "Bitte füllen Sie alle erforderlichen Felder aus.",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  },
  useCases: {
    uploadUseCase: "Aufgabe hochladen",
    postUseCase: "Aufgabe erstellen",
    uploadTitle: "Aufgabe hochladen",
    uploadSubtitle:
      "Laden Sie ein PDF- oder Word-Dokument hoch, das Ihre Aufgabe beschreibt",
    selectFile: "Datei auswählen",
    selectTemplateLabel: "Oder wählen Sie eine Vorlagendatei:",
    selectTemplatePlaceholder: "Vorlage auswählen...",
    downloadingTemplate: "Vorlage wird heruntergeladen...",
    templateSelected: "Vorlage ausgewählt",
    templateSelectedDesc: "Vorlagendatei wurde geladen. Klicken Sie auf Absenden zum Analysieren.",
    loadingTemplates: "Vorlagen werden geladen...",
    noTemplatesAvailable: "Keine Vorlagen verfügbar",
    dragDropText: "Datei hierher ziehen und ablegen",
    orBrowse: "oder klicken zum Durchsuchen",
    browseFiles: "Dateien durchsuchen",
    acceptedFormats: "Akzeptierte Formate: PDF, DOC, DOCX (max. 10MB)",
    uploadedFiles: "Hochgeladene Dateien",
    uploadSuccess: "Datei erfolgreich hochgeladen",
    uploadError: {
      invalidType:
        "Ungültiger Dateityp. Bitte laden Sie ein PDF- oder Word-Dokument hoch.",
      tooLarge: "Datei ist zu groß. Maximale Größe ist 10MB.",
    },
    filesProcessed: "Dateien erfolgreich verarbeitet",
    filesProcessedDesc: "Ihre Aufgabe wurde zur Überprüfung eingereicht.",
    submitUpload: "Aufgabe einreichen",
    analyzingFile: "Datei wird analysiert...",
    postTitle: "Aufgabe erstellen",
    postSubtitle:
      "Erstellen Sie eine neue Aufgabe, um den richtigen Experten zu finden",
    details: "Aufgabendetails",
    titleLabel: "Titel",
    titlePlaceholder: "z.B. Prozessoptimierung in der Fertigung",
    titlePlaceholderOptional: "Optional - Leer lassen, um hochgeladene Dateidaten zu verwenden",
    descriptionLabel: "Beschreibung",
    descriptionPlaceholder:
      "Beschreiben Sie Ihre Aufgabe im Detail. Wie ist die aktuelle Situation? Welche Herausforderungen gibt es?",
    descriptionPlaceholderOptional: "Optional - Leer lassen, um hochgeladene Dateidaten zu verwenden",
    objectiveLabel: "Ziele",
    objectivePlaceholder:
      "Was möchten Sie erreichen? Was ist das gewünschte Ergebnis?",
    objective: "Ziel",
    addObjective: "Ziel hinzufügen",
    removeObjective: "Entfernen",
    atLeastOneObjective: "Bitte fügen Sie mindestens ein Ziel hinzu.",
    uploadCta: {
      headline: "Haben Sie ein Anforderungsdokument?",
      subtext: "Überspringen Sie die manuelle Eingabe! Laden Sie Ihre PDF-Datei hoch und lassen Sie unsere KI die Details für Sie extrahieren.",
      button: "Aufgabe-Datei hochladen",
    },
    createButton: "Aufgabe akzeptieren",
    termsTitle: "Allgemeine Geschäftsbedingungen",
    useCaseDetails: "Aufgabendetails",
    contractTitle: "Sinopia Aufgabenvertrag",
    agreeAndCreate: "Ich stimme zu & erstelle",
    confirmUseCase: "Aufgabe bestätigen",
    useCaseOverview: "Aufgabenübersicht",
    termsAgreementNote: "Durch Klicken auf 'Ich stimme zu & erstelle' akzeptieren Sie unsere Allgemeinen Geschäftsbedingungen.",
    viewTermsButton: "Allgemeine Geschäftsbedingungen ansehen",
    created: "Aufgabe erstellt!",
    createdDesc: "Ihre Aufgabe wurde erfolgreich veröffentlicht.",
    allFieldsRequired: "Bitte füllen Sie alle erforderlichen Felder aus.",
    analyzeButton: "Aufgabe analysieren",
    analyzing: "KI-Analyse läuft...",
    analyzingDescription: "Unsere KI analysiert Ihren Anwendungsfall, um erforderliche Fähigkeiten, Experten und Umsetzungsphasen zu identifizieren.",
    analysisComplete: "Analyse abgeschlossen",
    analysisCompleteDesc: "Analyse abgeschlossen. Sie können nun die Aufgabe erstellen.",
    analysisError: "Analyse fehlgeschlagen. Bitte versuchen Sie es erneut.",
    endpointNotFound: "API-Endpunkt nicht gefunden (404). Bitte kontaktieren Sie den Support.",
    analysisResults: "KI-Analyseergebnisse",
    analyzeFirst: "Bitte analysieren Sie die Aufgabe zuerst, bevor Sie sie erstellen.",
    analysisDataInvalid: "Analysedaten sind ungültig. Bitte analysieren Sie erneut.",
    createError: "Aufgabe konnte nicht erstellt werden. Bitte versuchen Sie es erneut.",
    totalHours: "Gesamtstunden",
    totalCost: "Gesamtbetrag",
    hours: "Stunden",
    requiredRoles: "Erforderliche Rollen",
    roles: "Rollen",
    jobTitles: "Erforderliche Berufsbezeichnungen",
    analyzeHint: "Klicken Sie auf «Aufgabe analysieren», um KI-gestützte Erkenntnisse zu erhalten.",
    projectOverview: "Anwendungsfall Übersicht",
    projectSummary: "Zusammenfassung des Anwendungsfalls",
    requiredRolesDetailed: "Erforderliche Ressourcen",
    employee: "Ressource",
    employees: "Ressourcen",
    requiredSkills: "Erforderliche Fähigkeiten",
    implementationStages: "Umsetzungsphasen",
    uploadedUseCase: "Hochgeladener Anwendungsfall",
    uploadedUseCaseDesc: "Anwendungsfalldetails aus hochgeladener Datei extrahiert",
    uploadedUseCaseObjective: "Ziele aus hochgeladener Datei",
  },
  chatWidget: {
    title: "KI-Assistent",
    welcomeMessage: "Hallo! Wie kann ich Ihnen heute helfen?",
    inputPlaceholder: "Ihre Nachricht eingeben...",
    errorResponse: "Entschuldigung, ich konnte Ihre Anfrage nicht verarbeiten. Bitte versuchen Sie es erneut.",
    typing: "Schreibt...",
  },
};
