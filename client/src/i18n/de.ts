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
      specialChar: "Mindestens ein Sonderzeichen (!@#$%^&*+)",
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
    offerOverview: "Angebotsübersicht",
    totalHoursLabel: "Gesamtstunden",
    termsAgreementNote: "Durch Klicken auf 'Ich stimme zu & akzeptiere' akzeptieren Sie unsere Allgemeinen Geschäftsbedingungen.",
    viewTermsButton: "Allgemeine Geschäftsbedingungen ansehen",
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
    content: `Datenschutzerklärung 

Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert für die Geschäftsleitung der Sinopia Deutschland GmbH. Eine Nutzung der Internetseiten der Sinopia Deutschland GmbH ist grundsätzlich ohne jede Angabe personenbezogener Daten möglich. Sofern eine betroffene Person besondere Services unseres Unternehmens über unsere Internetseite in Anspruch nehmen möchte, könnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht für eine solche Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen Person ein. 

Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der Datenschutz-Grundverordnung und in Übereinstimmung mit den für die Sinopia Deutschland GmbH geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerklärung möchte unser Unternehmen die Öffentlichkeit über Art, Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels dieser Datenschutzerklärung über die ihnen zustehenden Rechte aufgeklärt. 

Die Sinopia Deutschland GmbH hat als für die Verarbeitung Verantwortlicher zahlreiche technische und organisatorische Maßnahmen umgesetzt, um einen möglichst lückenlosen Schutz der über diese Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch können Internetbasierte Datenübertragungen grundsätzlich Sicherheitslücken aufweisen, sodass ein absoluter Schutz nicht gewährleistet werden kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch, an uns zu übermitteln. 

1. Begriffsbestimmungen 

Die Datenschutzerklärung der Sinopia Deutschland GmbH beruht auf den Begrifflichkeiten, die durch den Europäischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden. Unsere Datenschutzerklärung soll sowohl für die Öffentlichkeit als auch für unsere Kunden und Geschäftspartner einfach lesbar und verständlich sein. Um dies zu gewährleisten, möchten wir vorab die verwendeten Begrifflichkeiten erläutern. 

Wir verwenden in dieser Datenschutzerklärung unter anderem die folgenden Begriffe: 

a)    personenbezogene Daten 

Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden „betroffene Person“) beziehen. Als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind, identifiziert werden kann. 

b)    betroffene Person 

Betroffene Person ist jede identifizierte oder identifizierbare natürliche Person, deren personenbezogene Daten von dem für die Verarbeitung Verantwortlichen verarbeitet werden. 

c)    Verarbeitung 

Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Veränderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung. 

d)    Einschränkung der Verarbeitung 

Einschränkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre künftige Verarbeitung einzuschränken. 

e)    Profiling 

Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche Person beziehen, zu bewerten, insbesondere, um Aspekte bezüglich Arbeitsleistung, wirtschaftlicher Lage, Gesundheit, persönlicher Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen. 

f)     Pseudonymisierung 

Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche die personenbezogenen Daten ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden können, sofern diese zusätzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Maßnahmen unterliegen, die gewährleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren natürlichen Person zugewiesen werden. 

g)    Verantwortlicher oder für die Verarbeitung Verantwortlicher 

Verantwortlicher oder für die Verarbeitung Verantwortlicher ist die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung durch das Unionsrecht oder das Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche beziehungsweise können die bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten vorgesehen werden. 

h)    Auftragsverarbeiter 

Auftragsverarbeiter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet. 

i)      Empfänger 

Empfänger ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, der personenbezogene Daten offengelegt werden, unabhängig davon, ob es sich bei ihr um einen Dritten handelt oder nicht. Behörden, die im Rahmen eines bestimmten Untersuchungsauftrags nach dem Unionsrecht oder dem Recht der Mitgliedstaaten möglicherweise personenbezogene Daten erhalten, gelten jedoch nicht als Empfänger. 

j)      Dritter 

Dritter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle außer der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die personenbezogenen Daten zu verarbeiten. 

k)    Einwilligung 

Einwilligung ist jede von der betroffenen Person freiwillig für den bestimmten Fall in informierter Weise und unmissverständlich abgegebene Willensbekundung in Form einer Erklärung oder einer sonstigen eindeutigen bestätigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist. 

2. Name und Anschrift des für die Verarbeitung Verantwortlichen 

Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist die: 

Sinopia Deutschland GmbH 

Deckerstr. 39 

70372 Stuttgart 

Deutschland 

Tel.: +491774928319 

E-Mail: info@sinopia.eu 

Website: www.sinopia.eu 

3. Erfassung von allgemeinen Daten und Informationen 

Die Internetseite der Sinopia Deutschland GmbH erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden können die (1) verwendeten Browsertypen und Versionen, (2) das vom zugreifenden System verwendete Betriebssystem, (3) die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (sogenannte Referrer), (4) die Unterwebseiten, welche über ein zugreifendes System auf unserer Internetseite angesteuert werden, (5) das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6) eine Internet-Protokoll-Adresse (IP-Adresse), (7) der Internet-Service-Provider des zugreifenden Systems und (8) sonstige ähnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere informationstechnologischen Systeme dienen. 

Bei der Nutzung dieser allgemeinen Daten und Informationen zieht die Sinopia Deutschland GmbH keine Rückschlüsse auf die betroffene Person. Diese Informationen werden vielmehr benötigt, um (1) die Inhalte unserer Internetseite korrekt auszuliefern, (2) die Inhalte unserer Internetseite sowie die Werbung für diese zu optimieren, (3) die dauerhafte Funktionsfähigkeit unserer informationstechnologischen Systeme und der Technik unserer Internetseite zu gewährleisten sowie (4) um Strafverfolgungsbehörden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen Informationen bereitzustellen. Diese anonym erhobenen Daten und Informationen werden durch die Sinopia Deutschland GmbH daher einerseits statistisch und ferner mit dem Ziel ausgewertet, den Datenschutz und die Datensicherheit in unserem Unternehmen zu erhöhen, um letztlich ein optimales Schutzniveau für die von uns verarbeiteten personenbezogenen Daten sicherzustellen. Die anonymen Daten der Server-Logfiles werden getrennt von allen durch eine betroffene Person angegebenen personenbezogenen Daten gespeichert. 

4. Registrierung auf unserer Internetseite 

Die betroffene Person hat die Möglichkeit, sich auf der Internetseite des für die Verarbeitung Verantwortlichen unter Angabe von personenbezogenen Daten zu registrieren. Welche personenbezogenen Daten dabei an den für die Verarbeitung Verantwortlichen übermittelt werden, ergibt sich aus der jeweiligen Eingabemaske, die für die Registrierung verwendet wird. Die von der betroffenen Person eingegebenen personenbezogenen Daten werden ausschließlich für die interne Verwendung bei dem für die Verarbeitung Verantwortlichen und für eigene Zwecke erhoben und gespeichert. Der für die Verarbeitung Verantwortliche kann die Weitergabe an einen oder mehrere Auftragsverarbeiter, beispielsweise einen Paketdienstleister, veranlassen, der die personenbezogenen Daten ebenfalls ausschließlich für eine interne Verwendung, die dem für die Verarbeitung Verantwortlichen zuzurechnen ist, nutzt. 

Durch eine Registrierung auf der Internetseite des für die Verarbeitung Verantwortlichen wird ferner die vom Internet-Service-Provider (ISP) der betroffenen Person vergebene IP-Adresse, das Datum sowie die Uhrzeit der Registrierung gespeichert. Die Speicherung dieser Daten erfolgt vor dem Hintergrund, dass nur so der Missbrauch unserer Dienste verhindert werden kann, und diese Daten im Bedarfsfall ermöglichen, begangene Straftaten aufzuklären. Insofern ist die Speicherung dieser Daten zur Absicherung des für die Verarbeitung Verantwortlichen erforderlich. Eine Weitergabe dieser Daten an Dritte erfolgt grundsätzlich nicht, sofern keine gesetzliche Pflicht zur Weitergabe besteht oder die Weitergabe der Strafverfolgung dient. 

Die Registrierung der betroffenen Person unter freiwilliger Angabe personenbezogener Daten dient dem für die Verarbeitung Verantwortlichen dazu, der betroffenen Person Inhalte oder Leistungen anzubieten, die aufgrund der Natur der Sache nur registrierten Benutzern angeboten werden können. Registrierten Personen steht die Möglichkeit frei, die bei der Registrierung angegebenen personenbezogenen Daten jederzeit abzuändern oder vollständig aus dem Datenbestand des für die Verarbeitung Verantwortlichen löschen zu lassen. 

Der für die Verarbeitung Verantwortliche erteilt jeder betroffenen Person jederzeit auf Anfrage Auskunft darüber, welche personenbezogenen Daten über die betroffene Person gespeichert sind. Ferner berichtigt oder löscht der für die Verarbeitung Verantwortliche personenbezogene Daten auf Wunsch oder Hinweis der betroffenen Person, soweit dem keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Die Gesamtheit der Mitarbeiter des für die Verarbeitung Verantwortlichen stehen der betroffenen Person in diesem Zusammenhang als Ansprechpartner zur Verfügung. 

5. Kontaktmöglichkeit über die Internetseite 

Die Internetseite der Sinopia Deutschland GmbH enthält aufgrund von gesetzlichen Vorschriften Angaben, die eine schnelle elektronische Kontaktaufnahme zu unserem Unternehmen sowie eine unmittelbare Kommunikation mit uns ermöglichen, was ebenfalls eine allgemeine Adresse der sogenannten elektronischen Post (E-Mail-Adresse) umfasst. Sofern eine betroffene Person per E-Mail oder über ein Kontaktformular den Kontakt mit dem für die Verarbeitung Verantwortlichen aufnimmt, werden die von der betroffenen Person übermittelten personenbezogenen Daten automatisch gespeichert. Solche auf freiwilliger Basis von einer betroffenen Person an den für die Verarbeitung Verantwortlichen übermittelten personenbezogenen Daten werden für Zwecke der Bearbeitung oder der Kontaktaufnahme zur betroffenen Person gespeichert. Es erfolgt keine Weitergabe dieser personenbezogenen Daten an Dritte. 

6. Routinemäßige Löschung und Sperrung von personenbezogenen Daten 

Der für die Verarbeitung Verantwortliche verarbeitet und speichert personenbezogene Daten der betroffenen Person nur für den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies durch den Europäischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, welchen der für die Verarbeitung Verantwortliche unterliegt, vorgesehen wurde. 

Entfällt der Speicherungszweck oder läuft eine vom Europäischen Richtlinien- und Verordnungsgeber oder einem anderen zuständigen Gesetzgeber vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht. 

7. Rechte der betroffenen Person 

a)    Recht auf Bestätigung 

Jede betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber eingeräumte Recht, von dem für die Verarbeitung Verantwortlichen eine Bestätigung darüber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden. Möchte eine betroffene Person dieses Bestätigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden. 

b)    Recht auf Auskunft 

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, jederzeit von dem für die Verarbeitung Verantwortlichen unentgeltliche Auskunft über die zu seiner Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten. Ferner hat der Europäische Richtlinien- und Verordnungsgeber der betroffenen Person Auskunft über folgende Informationen zugestanden: 

die Verarbeitungszwecke 

die Kategorien personenbezogener Daten, die verarbeitet werden 

die Empfänger oder Kategorien von Empfängern, gegenüber denen die personenbezogenen Daten offengelegt worden sind oder noch offengelegt werden, insbesondere bei Empfängern in Drittländern oder bei internationalen Organisationen 

falls möglich die geplante Dauer, für die die personenbezogenen Daten gespeichert werden, oder, falls dies nicht möglich ist, die Kriterien für die Festlegung dieser Dauer 

das Bestehen eines Rechts auf Berichtigung oder Löschung der sie betreffenden personenbezogenen Daten oder auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung 

das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde 

wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden: Alle verfügbaren Informationen über die Herkunft der Daten 

das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß Artikel 22 Abs.1 und 4 DS-GVO und — zumindest in diesen Fällen — aussagekräftige Informationen über die involvierte Logik sowie die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung für die betroffene Person 

Ferner steht der betroffenen Person ein Auskunftsrecht darüber zu, ob personenbezogene Daten an ein Drittland oder an eine internationale Organisation übermittelt wurden. Sofern dies der Fall ist, so steht der betroffenen Person im Übrigen das Recht zu, Auskunft über die geeigneten Garantien im Zusammenhang mit der Übermittlung zu erhalten. 

Möchte eine betroffene Person dieses Auskunftsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden. 

c)    Recht auf Berichtigung 

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, die unverzügliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen. Ferner steht der betroffenen Person das Recht zu, unter Berücksichtigung der Zwecke der Verarbeitung, die Vervollständigung unvollständiger personenbezogener Daten — auch mittels einer ergänzenden Erklärung — zu verlangen. 

Möchte eine betroffene Person dieses Berichtigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden. 

d)    Recht auf Löschung (Recht auf Vergessen werden) 

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, von dem Verantwortlichen zu verlangen, dass die sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, sofern einer der folgenden Gründe zutrifft und soweit die Verarbeitung nicht erforderlich ist: 

Die personenbezogenen Daten wurden für solche Zwecke erhoben oder auf sonstige Weise verarbeitet, für welche sie nicht mehr notwendig sind. 

Die betroffene Person widerruft ihre Einwilligung, auf die sich die Verarbeitung gemäß Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung. 

Die betroffene Person legt gemäß Art. 21 Abs. 1 DS-GVO Widerspruch gegen die Verarbeitung ein, und es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder die betroffene Person legt gemäß Art. 21 Abs. 2 DS-GVO Widerspruch gegen die Verarbeitung ein. 

Die personenbezogenen Daten wurden unrechtmäßig verarbeitet. 

Die Löschung der personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt. 

Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß Art. 8 Abs. 1 DS-GVO erhoben. 

Sofern einer der oben genannten Gründe zutrifft und eine betroffene Person die Löschung von personenbezogenen Daten, die bei der Sinopia Deutschland GmbH gespeichert sind, veranlassen möchte, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Sinopia Deutschland GmbH wird veranlassen, dass dem Löschverlangen unverzüglich nachgekommen wird. 

Wurden die personenbezogenen Daten von der Sinopia Deutschland GmbH öffentlich gemacht und ist unser Unternehmen als Verantwortlicher gemäß Art. 17 Abs. 1 DS-GVO zur Löschung der personenbezogenen Daten verpflichtet, so trifft die Sinopia Deutschland GmbH unter Berücksichtigung der verfügbaren Technologie und der Implementierungskosten angemessene Maßnahmen, auch technischer Art, um andere für die Datenverarbeitung Verantwortliche, welche die veröffentlichten personenbezogenen Daten verarbeiten, darüber in Kenntnis zu setzen, dass die betroffene Person von diesen anderen für die Datenverarbeitung Verantwortlichen die Löschung sämtlicher Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt hat, soweit die Verarbeitung nicht erforderlich ist. Der Mitarbeiter der Sinopia Deutschland GmbH wird im Einzelfall das Notwendige veranlassen. 

e)    Recht auf Einschränkung der Verarbeitung 

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, von dem Verantwortlichen die Einschränkung der Verarbeitung zu verlangen, wenn eine der folgenden Voraussetzungen gegeben ist: 

Die Richtigkeit der personenbezogenen Daten wird von der betroffenen Person bestritten, und zwar für eine Dauer, die es dem Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen. 

Die Verarbeitung ist unrechtmäßig, die betroffene Person lehnt die Löschung der personenbezogenen Daten ab und verlangt stattdessen die Einschränkung der Nutzung der personenbezogenen Daten. 

Der Verantwortliche benötigt die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger, die betroffene Person benötigt sie jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. 

Die betroffene Person hat Widerspruch gegen die Verarbeitung gem. Art. 21 Abs. 1 DS-GVO eingelegt und es steht noch nicht fest, ob die berechtigten Gründe des Verantwortlichen gegenüber denen der betroffenen Person überwiegen. 

Sofern eine der oben genannten Voraussetzungen gegeben ist und eine betroffene Person die Einschränkung von personenbezogenen Daten, die bei der Sinopia Deutschland GmbH gespeichert sind, verlangen möchte, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Sinopia Deutschland GmbH wird die Einschränkung der Verarbeitung veranlassen. 

f)     Recht auf Datenübertragbarkeit 

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, die sie betreffenden personenbezogenen Daten, welche durch die betroffene Person einem Verantwortlichen bereitgestellt wurden, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten. Sie hat außerdem das Recht, diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu übermitteln, sofern die Verarbeitung auf der Einwilligung gemäß Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO oder auf einem Vertrag gemäß Art. 6 Abs. 1 Buchstabe b DS-GVO beruht und die Verarbeitung mithilfe automatisierter Verfahren erfolgt, sofern die Verarbeitung nicht für die Wahrnehmung einer Aufgabe erforderlich ist, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, welche dem Verantwortlichen übertragen wurde. 

Ferner hat die betroffene Person bei der Ausübung ihres Rechts auf Datenübertragbarkeit gemäß Art. 20 Abs. 1 DS-GVO das Recht, zu erwirken, dass die personenbezogenen Daten direkt von einem Verantwortlichen an einen anderen Verantwortlichen übermittelt werden, soweit dies technisch machbar ist und sofern hiervon nicht die Rechte und Freiheiten anderer Personen beeinträchtigt werden. 

Zur Geltendmachung des Rechts auf Datenübertragbarkeit kann sich die betroffene Person jederzeit an einen Mitarbeiter der Sinopia Deutschland GmbH wenden. 

g)    Recht auf Widerspruch 

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 Buchstaben e oder f DS-GVO erfolgt, Widerspruch einzulegen. Dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. 

Die Sinopia Deutschland GmbH verarbeitet die personenbezogenen Daten im Falle des Widerspruchs nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die den Interessen, Rechten und Freiheiten der betroffenen Person überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. 

Verarbeitet die Sinopia Deutschland GmbH personenbezogene Daten, um Direktwerbung zu betreiben, so hat die betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung der personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen. Dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Widerspricht die betroffene Person gegenüber der Sinopia Deutschland GmbH der Verarbeitung für Zwecke der Direktwerbung, so wird die Sinopia Deutschland GmbH die personenbezogenen Daten nicht mehr für diese Zwecke verarbeiten. 

Zudem hat die betroffene Person das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, gegen die sie betreffende Verarbeitung personenbezogener Daten, die bei der Sinopia Deutschland GmbH zu wissenschaftlichen oder historischen Forschungszwecken oder zu statistischen Zwecken gemäß Art. 89 Abs. 1 DS-GVO erfolgen, Widerspruch einzulegen, es sei denn, eine solche Verarbeitung ist zur Erfüllung einer im öffentlichen Interesse liegenden Aufgabe erforderlich. 

Zur Ausübung des Rechts auf Widerspruch kann sich die betroffene Person direkt an jeden Mitarbeiter der Sinopia Deutschland GmbH oder einen anderen Mitarbeiter wenden. Der betroffenen Person steht es ferner frei, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft, ungeachtet der Richtlinie 2002/58/EG, ihr Widerspruchsrecht mittels automatisierter Verfahren auszuüben, bei denen technische Spezifikationen verwendet werden. 

h)    Automatisierte Entscheidungen im Einzelfall einschließlich Profiling 

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung — einschließlich Profiling — beruhenden Entscheidung unterworfen zu werden, die ihr gegenüber rechtliche Wirkung entfaltet oder sie in ähnlicher Weise erheblich beeinträchtigt, sofern die Entscheidung (1) nicht für den Abschluss oder die Erfüllung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich ist, oder (2) aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten, denen der Verantwortliche unterliegt, zulässig ist und diese Rechtsvorschriften angemessene Maßnahmen zur Wahrung der Rechte und Freiheiten sowie der berechtigten Interessen der betroffenen Person enthalten oder (3) mit ausdrücklicher Einwilligung der betroffenen Person erfolgt. 

Ist die Entscheidung (1) für den Abschluss oder die Erfüllung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich oder (2) erfolgt sie mit ausdrücklicher Einwilligung der betroffenen Person, trifft die Sinopia Deutschland GmbH angemessene Maßnahmen, um die Rechte und Freiheiten sowie die berechtigten Interessen der betroffenen Person zu wahren, wozu mindestens das Recht auf Erwirkung des Eingreifens einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung gehört. 

Möchte die betroffene Person Rechte mit Bezug auf automatisierte Entscheidungen geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden. 

i)      Recht auf Widerruf einer datenschutzrechtlichen Einwilligung 

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europäischen Richtlinien- und Verordnungsgeber gewährte Recht, eine Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen. 

Möchte die betroffene Person ihr Recht auf Widerruf einer Einwilligung geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden. 

8. Datenschutz bei Bewerbungen und im Bewerbungsverfahren 

Der für die Verarbeitung Verantwortliche erhebt und verarbeitet die personenbezogenen Daten von Bewerbern zum Zwecke der Abwicklung des Bewerbungsverfahrens. Die Verarbeitung kann auch auf elektronischem Wege erfolgen. Dies ist insbesondere dann der Fall, wenn ein Bewerber entsprechende Bewerbungsunterlagen auf dem elektronischen Wege, beispielsweise per E-Mail oder über ein auf der Internetseite befindliches Webformular, an den für die Verarbeitung Verantwortlichen übermittelt. Schließt der für die Verarbeitung Verantwortliche einen Anstellungsvertrag mit einem Bewerber, werden die übermittelten Daten zum Zwecke der Abwicklung des Beschäftigungsverhältnisses unter Beachtung der gesetzlichen Vorschriften gespeichert. Wird von dem für die Verarbeitung Verantwortlichen kein Anstellungsvertrag mit dem Bewerber geschlossen, so werden die Bewerbungsunterlagen zwei Monate nach Bekanntgabe der Absageentscheidung automatisch gelöscht, sofern einer Löschung keine sonstigen berechtigten Interessen des für die Verarbeitung Verantwortlichen entgegenstehen. Sonstiges berechtigtes Interesse in diesem Sinne ist beispielsweise eine Beweispflicht in einem Verfahren nach dem Allgemeinen Gleichbehandlungsgesetz (AGG). 

9. Rechtsgrundlage der Verarbeitung 

Art. 6 I lit. a DS-GVO dient unserem Unternehmen als Rechtsgrundlage für Verarbeitungsvorgänge, bei denen wir eine Einwilligung für einen bestimmten Verarbeitungszweck einholen. Ist die Verarbeitung personenbezogener Daten zur Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, erforderlich, wie dies beispielsweise bei Verarbeitungsvorgängen der Fall ist, die für eine Lieferung von Waren oder die Erbringung einer sonstigen Leistung oder Gegenleistung notwendig sind, so beruht die Verarbeitung auf Art. 6 I lit. b DS-GVO. Gleiches gilt für solche Verarbeitungsvorgänge die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind, etwa in Fällen von Anfragen zur unseren Produkten oder Leistungen. Unterliegt unser Unternehmen einer rechtlichen Verpflichtung durch welche eine Verarbeitung von personenbezogenen Daten erforderlich wird, wie beispielsweise zur Erfüllung steuerlicher Pflichten, so basiert die Verarbeitung auf Art. 6 I lit. c DS-GVO. In seltenen Fällen könnte die Verarbeitung von personenbezogenen Daten erforderlich werden, um lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person zu schützen. Dies wäre beispielsweise der Fall, wenn ein Besucher in unserem Betrieb verletzt werden würde und daraufhin sein Name, sein Alter, seine Krankenkassendaten oder sonstige lebenswichtige Informationen an einen Arzt, ein Krankenhaus oder sonstige Dritte weitergegeben werden müssten. Dann würde die Verarbeitung auf Art. 6 I lit. d DS-GVO beruhen. Letztlich könnten Verarbeitungsvorgänge auf Art. 6 I lit. f DS-GVO beruhen. Auf dieser Rechtsgrundlage basieren Verarbeitungsvorgänge, die von keiner der vorgenannten Rechtsgrundlagen erfasst werden, wenn die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich ist, sofern die Interessen, Grundrechte und Grundfreiheiten des Betroffenen nicht überwiegen. Solche Verarbeitungsvorgänge sind uns insbesondere deshalb gestattet, weil sie durch den Europäischen Gesetzgeber besonders erwähnt wurden. Er vertrat insoweit die Auffassung, dass ein berechtigtes Interesse anzunehmen sein könnte, wenn die betroffene Person ein Kunde des Verantwortlichen ist (Erwägungsgrund 47 Satz 2 DS-GVO). 

10. Berechtigte Interessen an der Verarbeitung, die von dem Verantwortlichen oder einem Dritten verfolgt werden 

Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 I lit. f DS-GVO ist unser berechtigtes Interesse die Durchführung unserer Geschäftstätigkeit zugunsten des Wohlergehens all unserer Mitarbeiter und unserer Anteilseigner. 

11. Dauer, für die die personenbezogenen Daten gespeichert werden 

Das Kriterium für die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinemäßig gelöscht, sofern sie nicht mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind. 

12. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten; Erforderlichkeit für den Vertragsabschluss; Verpflichtung der betroffenen Person, die personenbezogenen Daten bereitzustellen; mögliche Folgen der Nichtbereitstellung 

Wir klären Sie darüber auf, dass die Bereitstellung personenbezogener Daten zum Teil gesetzlich vorgeschrieben ist (z.B. Steuervorschriften) oder sich auch aus vertraglichen Regelungen (z.B. Angaben zum Vertragspartner) ergeben kann. Mitunter kann es zu einem Vertragsschluss erforderlich sein, dass eine betroffene Person uns personenbezogene Daten zur Verfügung stellt, die in der Folge durch uns verarbeitet werden müssen. Die betroffene Person ist beispielsweise verpflichtet uns personenbezogene Daten bereitzustellen, wenn unser Unternehmen mit ihr einen Vertrag abschließt. Eine Nichtbereitstellung der personenbezogenen Daten hätte zur Folge, dass der Vertrag mit dem Betroffenen nicht geschlossen werden könnte. Vor einer Bereitstellung personenbezogener Daten durch den Betroffenen muss sich der Betroffene an einen unserer Mitarbeiter wenden. Unser Mitarbeiter klärt den Betroffenen einzelfallbezogen darüber auf, ob die Bereitstellung der personenbezogenen Daten gesetzlich oder vertraglich vorgeschrieben oder für den Vertragsabschluss erforderlich ist, ob eine Verpflichtung besteht, die personenbezogenen Daten bereitzustellen, und welche Folgen die Nichtbereitstellung der personenbezogenen Daten hätte. 

13. Bestehen einer automatisierten Entscheidungsfindung 

Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling. 

Diese Datenschutzerklärung wurde durch den Datenschutzerklärungs-Generator der DGD Deutsche Gesellschaft für Datenschutz GmbH, die als Externer Datenschutzbeauftragter Aschaffenburg tätig ist, in Kooperation mit dem Anwalt für IT- und Datenschutzrecht Christian Solmecke erstellt. `,
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
