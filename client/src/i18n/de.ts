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
    vatRate: "MwSt. 19%",
    totalWithVat: "Gesamt inkl. MwSt.",
    expertStatus: "Experten-Status",
    hourlyRate: "Stundensatz",
    totalHours: "Gesamtstunden",
    useCaseId: "Aufgaben-ID",
    levelJobTitle: "Level / Berufsbezeichnung",
    requiredEmployees: "Benötigte Mitarbeiter",
    totalAmountDue: "Fälliger Gesamtbetrag",
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
    acceptUseCase: "Angebot annehmen",
    reject: "Ablehnen",
    comingSoonTitle: "Demnächst verfügbar",
    comingSoonBody: "Diese Funktion wird vollständig verfügbar sein am",
    comingSoonDate: "16. Februar",
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
    amountPerPerson: "Betrag pro Person",
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
    skillTypeTechnical: "Fähigkeiten",
    skillTypeSoft: "Kompetenz",
    editSkill: "Fähigkeit bearbeiten",
    skillAdded: "Fähigkeit erfolgreich hinzugefügt",
    skillUpdated: "Fähigkeit erfolgreich aktualisiert",
    skillDeleted: "Fähigkeit erfolgreich gelöscht",
    confirmDeleteSkill: "Sind Sie sicher, dass Sie diese Fähigkeit löschen möchten?",
    confirmBulkDeleteSkills: "Sind Sie sicher, dass Sie {count} Fähigkeiten löschen möchten?",
    deleteSelected: "Ausgewählte löschen",
    selectAll: "Alle auswählen",
    skillsDeletedSuccess: "Fähigkeiten erfolgreich gelöscht",
    skillsDeletedCount: "Fähigkeiten gelöscht",
    skillsDeleteFailed: "konnten nicht gelöscht werden",
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
    languages: "Sprachen",
    addLanguage: "Sprache hinzufügen",
    editLanguage: "Sprache bearbeiten",
    languageName: "Sprache",
    languageNamePlaceholder: "z.B. Englisch, Deutsch, Arabisch",
    languageLevel: "Niveau",
    languageLevelBeginner: "Anfänger",
    languageLevelIntermediate: "Mittelstufe",
    languageLevelAdvanced: "Fortgeschritten",
    languageLevelExpert: "Experte",
    languageLevelNative: "Muttersprache",
    selectLevel: "Niveau auswählen",
    languageSaved: "Sprache erfolgreich gespeichert",
    languageDeleted: "Sprache erfolgreich gelöscht",
    languageSaveFailed: "Sprache konnte nicht gespeichert werden",
    languageDeleteFailed: "Sprache konnte nicht gelöscht werden",
    confirmDeleteLanguage: "Sind Sie sicher, dass Sie diese Sprache löschen möchten?",
    noLanguages: "Noch keine Sprachen hinzugefügt",
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
    street: "Straße",
    streetPlaceholder: "Straße und Hausnummer",
    zipCode: "Postleitzahl",
    zipCodePlaceholder: "PLZ",
    state: "Bundesland / Kanton",
    statePlaceholder: "Bundesland oder Kanton",
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
    terms: "Allgemeine Geschäftsbedingungen",
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
    titleShort: "Allgemeinen Geschäftsbedingungen",
    viewTerms: "Bedingungen ansehen",
    openFullTerms: "Vollständige Nutzungsbedingungen öffnen",
    agreeLabel: "Ich habe die Allgemeinen Geschäftsbedingungen gelesen und akzeptiere sie",
    scrollToAccept: "Bitte scrollen Sie nach unten, um die Zustimmung zu aktivieren",
    acceptError: "Bitte lesen und akzeptieren Sie die Nutzungsbedingungen, um fortzufahren.",
    acceptButton: "Ich stimme zu",
    closeButton: "Schließen",
    content: `Allgemeine Geschäftsbedingungen (AGB) – Sinopia Deutschland GmbH (Stand 27.01.2026)

§ 1 Geltungsbereich und Begriffsbestimmungen

(1) Diese Allgemeinen Geschäftsbedingungen gelten für sämtliche Verträge über Dienstleistungen zwischen dem Anbieter und seinen Kunden.

(2) Kunden im Sinne dieser AGB sind sowohl Verbraucher als auch Unternehmer, sofern nicht ausdrücklich eine Einschränkung erfolgt.

(3) Abweichende Geschäftsbedingungen des Kunden finden keine Anwendung, es sei denn, ihrer Geltung wurde ausdrücklich und schriftlich zugestimmt.

(4) Individuelle Vereinbarungen zwischen Anbieter und Kunde haben Vorrang vor diesen AGB.

§ 2 Gegenstand der Dienstleistung

(1) Gegenstand des Vertrages ist die Erbringung der jeweils vereinbarten Dienstleistung gemäß Angebot, Leistungsbeschreibung oder individueller Vereinbarung.

(2) Sofern nicht ausdrücklich anders vereinbart, schuldet der Anbieter keinen bestimmten Erfolg, sondern lediglich eine fachgerechte, sorgfältige und dem Stand der Technik entsprechende Leistung.

(3) Der Leistungsumfang ergibt sich ausschließlich aus der vertraglichen Vereinbarung. Nebenabreden bestehen nicht.

§ 3 Vertragsschluss

(1) Angebote des Anbieters sind unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.

(2) Ein Vertrag kommt zustande durch:

Annahme eines Angebots durch den Kunden,

schriftliche oder elektronische Auftragsbestätigung,

oder durch tatsächliche Inanspruchnahme der Dienstleistung.

(3) Der Anbieter ist berechtigt, Vertragsangebote ohne Angabe von Gründen abzulehnen.


§ 4 Leistungsdurchführung und Leistungserbringung

(1) Der Anbieter ist berechtigt, sich zur Erfüllung der vertraglichen Verpflichtungen Dritter zu bedienen.

(2) Der Anbieter bestimmt Art, Ablauf und Einteilung der Leistungserbringung nach pflichtgemäßem Ermessen, sofern keine verbindlichen Vorgaben vereinbart wurden.

(3) Termine und Fristen sind nur verbindlich, wenn sie ausdrücklich als verbindlich vereinbart wurden.


§ 5 Mitwirkungspflichten des Kunden

(1) Der Kunde verpflichtet sich, alle zur ordnungsgemäßen Leistungserbringung erforderlichen Informationen, Inhalte, Unterlagen und Mitwirkungshandlungen rechtzeitig, vollständig und korrekt bereitzustellen.

(2) Unterlässt der Kunde eine erforderliche Mitwirkung, ist der Anbieter für daraus resultierende Verzögerungen oder Leistungseinschränkungen nicht verantwortlich.

(3) Entstehende Mehrkosten aufgrund fehlender oder verspäteter Mitwirkung können dem Kunden in Rechnung gestellt werden.


§ 6 Vergütung und Preisgestaltung

(1) Die Vergütung richtet sich nach der jeweils vereinbarten Vergütungsform (z. B. Pauschalpreis, Stundenhonorar, Projektpreis).

(2) Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer, sofern nicht ausdrücklich anders angegeben.

(3) Zusatzleistungen, die nicht Bestandteil des ursprünglichen Vertrags sind, werden gesondert vergütet.


§ 8 Zahlungsbedingungen

(1) Rechnungen sind innerhalb der Zahlungsfrist ohne Abzug zur Zahlung fällig:

Für individuell erstellte Kundenleistungen sofort ab Rechnungsstellung.

Für Standardleistungen (Sinopia Standard Use Cases) 14 Tage ab Rechnungsstellung.

(2) Der Anbieter ist berechtigt, Vorauszahlungen oder Abschlagszahlungen zu verlangen.

(3) Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen. Weitere Schadensersatzansprüche bleiben unberührt.

(4) Der Anbieter ist berechtigt, bei Zahlungsverzug weitere Leistungen bis zur vollständigen Zahlung zurückzuhalten.


§ 9 Verzug, Leistungsstörungen und höhere Gewalt

(1) Der Anbieter haftet nicht für Verzögerungen oder Leistungsausfälle aufgrund höherer Gewalt oder sonstiger unvorhersehbarer, nicht zu vertretender Ereignisse.

(2) In diesen Fällen verlängern sich vereinbarte Fristen angemessen.

(3) Dauert die Störung länger als [z. B. 60 Tage], sind beide Parteien berechtigt, vom Vertrag zurückzutreten.


§ 10 Haftung

(1) Der Anbieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.

(2) Für sonstige Schäden haftet der Anbieter nur bei Vorsatz oder grober Fahrlässigkeit.

(3) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den typischerweise vorhersehbaren Schaden begrenzt.

(4) Eine weitergehende Haftung ist ausgeschlossen, soweit gesetzlich zulässig.


§ 11 Mängelansprüche

(1) Der Kunde ist verpflichtet, Mängel unverzüglich nach Kenntniserlangung anzuzeigen.

(2) Der Anbieter ist berechtigt, Mängel nach eigener Wahl durch Nachbesserung zu beheben.

(3) Weitergehende Ansprüche bestehen nur im Rahmen der gesetzlichen Vorschriften.


§ 12 Kündigung und Vertragsbeendigung

(1) Verträge können unter Einhaltung der vereinbarten Fristen ordentlich gekündigt werden.

(2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.

(3) Bereits erbrachte Leistungen sind auch im Falle der Kündigung anteilig zu vergüten.


§ 13 Stornierung durch den Kunden

(1) Bei Stornierung kann der Anbieter eine angemessene Vergütung für bereits erbrachte Leistungen verlangen.

(2) Dem Kunden bleibt der Nachweis vorbehalten, dass kein oder ein geringerer Schaden entstanden ist.


§ 14 Urheber- und Nutzungsrechte

(1) Sämtliche Urheberrechte an im Rahmen der Dienstleistung erstellten Werken verbleiben beim Anbieter, sofern nichts anderes vereinbart wurde.

(2) Der Kunde erhält ein Einfaches, nicht übertragbares Nutzungsrecht im vereinbarten Umfang.

(3) Eine Weitergabe an Dritte oder Veränderung der Arbeitsergebnisse bedarf der Zustimmung des Anbieters.


§ 15 Vertraulichkeit

(1) Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erlangten vertraulichen Informationen geheim zu halten.

(2) Diese Verpflichtung gilt auch nach Beendigung des Vertragsverhältnisses fort.


§ 16 Datenschutz

(1) Die Verarbeitung personenbezogener Daten erfolgt im Einklang mit den geltenden datenschutzrechtlichen Bestimmungen.

(2) Weitere Informationen ergeben sich aus der separaten Datenschutzerklärung.


§ 17 Schlussbestimmungen

(1) Es gilt das Recht der Bundesrepublik Deutschland.

(2) Gerichtsstand ist – soweit gesetzlich zulässig – der Sitz des Anbieters.

(3) Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Regelungen unberührt. `,
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
    content: `Datenschutzerkl\u00E4rung

Wir freuen uns sehr \u00FCber Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert f\u00FCr die Gesch\u00E4ftsleitung der Sinopia Deutschland GmbH. Eine Nutzung der Internetseiten der Sinopia Deutschland GmbH ist grunds\u00E4tzlich ohne jede Angabe personenbezogener Daten m\u00F6glich. Sofern eine betroffene Person besondere Services unseres Unternehmens \u00FCber unsere Internetseite in Anspruch nehmen m\u00F6chte, k\u00F6nnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht f\u00FCr eine solche Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen Person ein.

Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der Datenschutz-Grundverordnung (DSGVO) und in \u00DCbereinstimmung mit den f\u00FCr die Sinopia Deutschland GmbH geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerkl\u00E4rung m\u00F6chte unser Unternehmen die \u00D6ffentlichkeit \u00FCber Art, Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels dieser Datenschutzerkl\u00E4rung \u00FCber die ihnen zustehenden Rechte aufgekl\u00E4rt.

Die Sinopia Deutschland GmbH hat als f\u00FCr die Verarbeitung Verantwortlicher zahlreiche technische und organisatorische Ma\u00DFnahmen umgesetzt, um einen m\u00F6glichst l\u00FCckenlosen Schutz der \u00FCber diese Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch k\u00F6nnen internetbasierte Daten\u00FCbertragungen grunds\u00E4tzlich Sicherheitsl\u00FCcken aufweisen, sodass ein absoluter Schutz nicht gew\u00E4hrleistet werden kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch, an uns zu \u00FCbermitteln.

1. Begriffsbestimmungen

Die Datenschutzerkl\u00E4rung der Sinopia Deutschland GmbH beruht auf den Begrifflichkeiten, die durch den Europ\u00E4ischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DSGVO) verwendet wurden. Unsere Datenschutzerkl\u00E4rung soll sowohl f\u00FCr die \u00D6ffentlichkeit als auch f\u00FCr unsere Kunden und Gesch\u00E4ftspartner einfach lesbar und verst\u00E4ndlich sein. Um dies zu gew\u00E4hrleisten, m\u00F6chten wir vorab die verwendeten Begrifflichkeiten erl\u00E4utern.

Wir verwenden in dieser Datenschutzerkl\u00E4rung unter anderem die folgenden Begriffe:

a) Personenbezogene Daten

Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare nat\u00FCrliche Person (im Folgenden \u201Ebetroffene Person\u201C) beziehen. Als identifizierbar wird eine nat\u00FCrliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann.

b) Betroffene Person

Betroffene Person ist jede identifizierte oder identifizierbare nat\u00FCrliche Person, deren personenbezogene Daten von dem f\u00FCr die Verarbeitung Verantwortlichen verarbeitet werden.

c) Verarbeitung

Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgef\u00FChrte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Ver\u00E4nderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch \u00DCbermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verkn\u00FCpfung, die Einschr\u00E4nkung, das L\u00F6schen oder die Vernichtung.

d) Einschr\u00E4nkung der Verarbeitung

Einschr\u00E4nkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre k\u00FCnftige Verarbeitung einzuschr\u00E4nken.

e) Profiling

Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte pers\u00F6nliche Aspekte, die sich auf eine nat\u00FCrliche Person beziehen, zu bewerten, insbesondere um Aspekte bez\u00FCglich Arbeitsleistung, wirtschaftlicher Lage, Gesundheit, pers\u00F6nlicher Vorlieben, Interessen, Zuverl\u00E4ssigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser nat\u00FCrlichen Person zu analysieren oder vorherzusagen.

f) Pseudonymisierung

Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, dass die personenbezogenen Daten ohne Hinzuziehung zus\u00E4tzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden k\u00F6nnen, sofern diese zus\u00E4tzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Ma\u00DFnahmen unterliegen, die gew\u00E4hrleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren nat\u00FCrlichen Person zugewiesen werden.

g) Verantwortlicher oder f\u00FCr die Verarbeitung Verantwortlicher

Verantwortlicher oder f\u00FCr die Verarbeitung Verantwortlicher ist die nat\u00FCrliche oder juristische Person, Beh\u00F6rde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen \u00FCber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.

h) Auftragsverarbeiter

Auftragsverarbeiter ist eine nat\u00FCrliche oder juristische Person, Beh\u00F6rde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.

i) Empf\u00E4nger

Empf\u00E4nger ist eine nat\u00FCrliche oder juristische Person, Beh\u00F6rde, Einrichtung oder andere Stelle, der personenbezogene Daten offengelegt werden, unabh\u00E4ngig davon, ob es sich bei ihr um einen Dritten handelt oder nicht.

j) Dritter

Dritter ist eine nat\u00FCrliche oder juristische Person, Beh\u00F6rde, Einrichtung oder andere Stelle, au\u00DFer der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die personenbezogenen Daten zu verarbeiten.

k) Einwilligung

Einwilligung ist jede von der betroffenen Person freiwillig f\u00FCr den bestimmten Fall in informierter Weise und unmissverst\u00E4ndlich abgegebene Willensbekundung in Form einer Erkl\u00E4rung oder einer sonstigen eindeutigen best\u00E4tigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist.

2. Name und Anschrift des f\u00FCr die Verarbeitung Verantwortlichen

Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO), sonstiger in den Mitgliedstaaten der Europ\u00E4ischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist:

Sinopia Deutschland GmbH
Deckerstr. 39
70372 Stuttgart
Deutschland
Telefon: +491774928319
E-Mail: info@sinopia.eu
Website: www.sinopia.eu

3. Erfassung von allgemeinen Daten und Informationen

Die Internetseite der Sinopia Deutschland GmbH erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden k\u00F6nnen die (1) verwendeten Browsertypen und Versionen, (2) das vom zugreifenden System verwendete Betriebssystem, (3) die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (sogenannte Referrer), (4) die Unterwebseiten, (5) das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6) eine Internet-Protokoll-Adresse (IP-Adresse), (7) der Internet-Service-Provider des zugreifenden Systems und (8) sonstige \u00E4hnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere informationstechnologischen Systeme dienen.

Bei der Nutzung dieser allgemeinen Daten und Informationen zieht die Sinopia Deutschland GmbH keine R\u00FCckschl\u00FCsse auf die betroffene Person. Diese Informationen werden vielmehr ben\u00F6tigt, um (1) die Inhalte unserer Internetseite korrekt auszuliefern, (2) die Inhalte unserer Internetseite sowie die Werbung f\u00FCr diese zu optimieren, (3) die dauerhafte Funktionsf\u00E4higkeit unserer informationstechnologischen Systeme und der Technik unserer Internetseite zu gew\u00E4hrleisten sowie (4) um Strafverfolgungsbeh\u00F6rden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen Informationen bereitzustellen. Diese anonym erhobenen Daten und Informationen werden durch die Sinopia Deutschland GmbH daher einerseits statistisch und ferner mit dem Ziel ausgewertet, den Datenschutz und die Datensicherheit in unserem Unternehmen zu erh\u00F6hen, um letztlich ein optimales Schutzniveau f\u00FCr die von uns verarbeiteten personenbezogenen Daten sicherzustellen. Die anonymen Daten der Server-Logfiles werden getrennt von allen durch eine betroffene Person angegebenen personenbezogenen Daten gespeichert.

4. Registrierung auf unserer Internetseite

Die betroffene Person hat die M\u00F6glichkeit, sich auf der Internetseite des f\u00FCr die Verarbeitung Verantwortlichen unter Angabe von personenbezogenen Daten zu registrieren. Welche personenbezogenen Daten dabei an den f\u00FCr die Verarbeitung Verantwortlichen \u00FCbermittelt werden, ergibt sich aus der jeweiligen Eingabemaske, die f\u00FCr die Registrierung verwendet wird. Die von der betroffenen Person eingegebenen personenbezogenen Daten werden ausschlie\u00DFlich f\u00FCr die interne Verwendung bei dem f\u00FCr die Verarbeitung Verantwortlichen und f\u00FCr eigene Zwecke erhoben und gespeichert. Der f\u00FCr die Verarbeitung Verantwortliche kann die Weitergabe an einen oder mehrere Auftragsverarbeiter, beispielsweise einen Paketdienstleister, veranlassen, der die personenbezogenen Daten ebenfalls ausschlie\u00DFlich f\u00FCr eine interne Verwendung, die dem f\u00FCr die Verarbeitung Verantwortlichen zuzurechnen ist, nutzt.

Durch eine Registrierung auf der Internetseite des f\u00FCr die Verarbeitung Verantwortlichen wird ferner die vom Internet-Service-Provider (ISP) der betroffenen Person vergebene IP-Adresse, das Datum sowie die Uhrzeit der Registrierung gespeichert. Die Speicherung dieser Daten erfolgt vor dem Hintergrund, dass nur so der Missbrauch unserer Dienste verhindert werden kann, und diese Daten im Bedarfsfall erm\u00F6glichen, begangene Straftaten aufzukl\u00E4ren. Insofern ist die Speicherung dieser Daten zur Absicherung des f\u00FCr die Verarbeitung Verantwortlichen erforderlich. Eine Weitergabe dieser Daten an Dritte erfolgt grunds\u00E4tzlich nicht, sofern keine gesetzliche Pflicht zur Weitergabe besteht oder die Weitergabe der Strafverfolgung dient.

Die Registrierung der betroffenen Person unter freiwilliger Angabe personenbezogener Daten dient dem f\u00FCr die Verarbeitung Verantwortlichen dazu, der betroffenen Person Inhalte oder Leistungen anzubieten, die aufgrund der Natur der Sache nur registrierten Benutzern angeboten werden k\u00F6nnen. Registrierten Personen steht die M\u00F6glichkeit frei, die bei der Registrierung angegebenen personenbezogenen Daten jederzeit abzu\u00E4ndern oder vollst\u00E4ndig aus dem Datenbestand des f\u00FCr die Verarbeitung Verantwortlichen l\u00F6schen zu lassen.

Der f\u00FCr die Verarbeitung Verantwortliche erteilt jeder betroffenen Person jederzeit auf Anfrage Auskunft dar\u00FCber, welche personenbezogenen Daten \u00FCber die betroffene Person gespeichert sind. Ferner berichtigt oder l\u00F6scht der f\u00FCr die Verarbeitung Verantwortliche personenbezogene Daten auf Wunsch oder Hinweis der betroffenen Person, soweit dem keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Die Gesamtheit der Mitarbeiter des f\u00FCr die Verarbeitung Verantwortlichen stehen der betroffenen Person in diesem Zusammenhang als Ansprechpartner zur Verf\u00FCgung.

5. Kontaktm\u00F6glichkeit \u00FCber die Internetseite

Die Internetseite der Sinopia Deutschland GmbH enth\u00E4lt aufgrund von gesetzlichen Vorschriften Angaben, die eine schnelle elektronische Kontaktaufnahme zu unserem Unternehmen sowie eine unmittelbare Kommunikation mit uns erm\u00F6glichen, was ebenfalls eine allgemeine Adresse der sogenannten elektronischen Post (E-Mail-Adresse) umfasst. Sofern eine betroffene Person per E-Mail oder \u00FCber ein Kontaktformular den Kontakt mit dem f\u00FCr die Verarbeitung Verantwortlichen aufnimmt, werden die von der betroffenen Person \u00FCbermittelten personenbezogenen Daten automatisch gespeichert. Solche auf freiwilliger Basis von einer betroffenen Person an den f\u00FCr die Verarbeitung Verantwortlichen \u00FCbermittelten personenbezogenen Daten werden f\u00FCr Zwecke der Bearbeitung oder der Kontaktaufnahme zur betroffenen Person gespeichert. Es erfolgt keine Weitergabe dieser personenbezogenen Daten an Dritte.

6. Routinem\u00E4\u00DFige L\u00F6schung und Sperrung von personenbezogenen Daten

Der f\u00FCr die Verarbeitung Verantwortliche verarbeitet und speichert personenbezogene Daten der betroffenen Person nur f\u00FCr den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies durch den Europ\u00E4ischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, welchen der f\u00FCr die Verarbeitung Verantwortliche unterliegt, vorgesehen wurde.

Entf\u00E4llt der Speicherungszweck oder l\u00E4uft eine vom Europ\u00E4ischen Richtlinien- und Verordnungsgeber oder einem anderen zust\u00E4ndigen Gesetzgeber vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinem\u00E4\u00DFig und entsprechend den gesetzlichen Vorschriften gesperrt oder gel\u00F6scht.

7. Rechte der betroffenen Person

a) Recht auf Best\u00E4tigung

Jede betroffene Person hat das vom Europ\u00E4ischen Richtlinien- und Verordnungsgeber einger\u00E4umte Recht, von dem f\u00FCr die Verarbeitung Verantwortlichen eine Best\u00E4tigung dar\u00FCber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden. M\u00F6chte eine betroffene Person dieses Best\u00E4tigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\u00FCr die Verarbeitung Verantwortlichen wenden.

b) Recht auf Auskunft

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\u00E4ischen Richtlinien- und Verordnungsgeber gew\u00E4hrte Recht, jederzeit von dem f\u00FCr die Verarbeitung Verantwortlichen unentgeltliche Auskunft \u00FCber die zu seiner Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten. Ferner hat der Europ\u00E4ische Richtlinien- und Verordnungsgeber der betroffenen Person Auskunft \u00FCber folgende Informationen zugestanden:

die Verarbeitungszwecke;
die Kategorien personenbezogener Daten, die verarbeitet werden;
die Empf\u00E4nger oder Kategorien von Empf\u00E4ngern, gegen\u00FCber denen die personenbezogenen Daten offengelegt worden sind oder noch offengelegt werden, insbesondere bei Empf\u00E4ngern in Drittl\u00E4ndern oder bei internationalen Organisationen;
falls m\u00F6glich die geplante Dauer, f\u00FCr die die personenbezogenen Daten gespeichert werden, oder, falls dies nicht m\u00F6glich ist, die Kriterien f\u00FCr die Festlegung dieser Dauer;
das Bestehen eines Rechts auf Berichtigung oder L\u00F6schung der sie betreffenden personenbezogenen Daten oder auf Einschr\u00E4nkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung;
das Bestehen eines Beschwerderechts bei einer Aufsichtsbeh\u00F6rde;
wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden: Alle verf\u00FCgbaren Informationen \u00FCber die Herkunft der Daten;
das Bestehen einer automatisierten Entscheidungsfindung einschlie\u00DFlich Profiling gem\u00E4\u00DF Artikel 22 Abs. 1 und 4 DSGVO und \u2014 zumindest in diesen F\u00E4llen \u2014 aussagekr\u00E4ftige Informationen \u00FCber die involvierte Logik sowie die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung f\u00FCr die betroffene Person.

Ferner steht der betroffenen Person ein Auskunftsrecht dar\u00FCber zu, ob personenbezogene Daten an ein Drittland oder an eine internationale Organisation \u00FCbermittelt wurden. Sofern dies der Fall ist, so steht der betroffenen Person im \u00DCbrigen das Recht zu, Auskunft \u00FCber die geeigneten Garantien im Zusammenhang mit der \u00DCbermittlung zu erhalten.

M\u00F6chte eine betroffene Person dieses Auskunftsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\u00FCr die Verarbeitung Verantwortlichen wenden.

c) Recht auf Berichtigung

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\u00E4ischen Richtlinien- und Verordnungsgeber gew\u00E4hrte Recht, die unverz\u00FCgliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen. Ferner steht der betroffenen Person das Recht zu, unter Ber\u00FCcksichtigung der Zwecke der Verarbeitung, die Vervollst\u00E4ndigung unvollst\u00E4ndiger personenbezogener Daten \u2014 auch mittels einer erg\u00E4nzenden Erkl\u00E4rung \u2014 zu verlangen.

M\u00F6chte eine betroffene Person dieses Berichtigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\u00FCr die Verarbeitung Verantwortlichen wenden.

d) Recht auf L\u00F6schung (Recht auf Vergessen werden)

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\u00E4ischen Richtlinien- und Verordnungsgeber gew\u00E4hrte Recht, von dem Verantwortlichen zu verlangen, dass die sie betreffenden personenbezogenen Daten unverz\u00FCglich gel\u00F6scht werden, sofern einer der folgenden Gr\u00FCnde zutrifft und soweit die Verarbeitung nicht erforderlich ist:

Die personenbezogenen Daten wurden f\u00FCr solche Zwecke erhoben oder auf sonstige Weise verarbeitet, f\u00FCr welche sie nicht mehr notwendig sind.
Die betroffene Person widerruft ihre Einwilligung, auf die sich die Verarbeitung gem\u00E4\u00DF Art. 6 Abs. 1 Buchstabe a DSGVO oder Art. 9 Abs. 2 Buchstabe a DSGVO st\u00FCtzte, und es fehlt an einer anderweitigen Rechtsgrundlage f\u00FCr die Verarbeitung.
Die betroffene Person legt gem\u00E4\u00DF Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein, und es liegen keine vorrangigen berechtigten Gr\u00FCnde f\u00FCr die Verarbeitung vor, oder die betroffene Person legt gem\u00E4\u00DF Art. 21 Abs. 2 DSGVO Widerspruch gegen die Verarbeitung ein.
Die personenbezogenen Daten wurden unrechtm\u00E4\u00DFig verarbeitet.
Die L\u00F6schung der personenbezogenen Daten ist zur Erf\u00FCllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.
Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gem\u00E4\u00DF Art. 8 Abs. 1 DSGVO erhoben.

Sofern einer der oben genannten Gr\u00FCnde zutrifft und eine betroffene Person die L\u00F6schung von personenbezogenen Daten, die bei der Sinopia Deutschland GmbH gespeichert sind, veranlassen m\u00F6chte, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\u00FCr die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Sinopia Deutschland GmbH wird veranlassen, dass dem L\u00F6schverlangen unverz\u00FCglich nachgekommen wird.

Hat der f\u00FCr die Verarbeitung Verantwortliche personenbezogene Daten \u00F6ffentlich gemacht und ist er gem\u00E4\u00DF Art. 17 Abs. 1 DSGVO zur L\u00F6schung der personenbezogenen Daten verpflichtet, so trifft der f\u00FCr die Verarbeitung Verantwortliche unter Ber\u00FCcksichtigung der verf\u00FCgbaren Technologie und der Implementierungskosten angemessene Ma\u00DFnahmen, auch technischer Art, um andere f\u00FCr die Datenverarbeitung Verantwortliche, welche die ver\u00F6ffentlichten personenbezogenen Daten verarbeiten, dar\u00FCber in Kenntnis zu setzen, dass die betroffene Person von diesen anderen f\u00FCr die Datenverarbeitung Verantwortlichen die L\u00F6schung s\u00E4mtlicher Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt hat, soweit die Verarbeitung nicht erforderlich ist. Der Mitarbeiter der Sinopia Deutschland GmbH wird im Einzelfall das Notwendige veranlassen.

e) Recht auf Einschr\u00E4nkung der Verarbeitung

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\u00E4ischen Richtlinien- und Verordnungsgeber gew\u00E4hrte Recht, von dem Verantwortlichen die Einschr\u00E4nkung der Verarbeitung zu verlangen, wenn eine der folgenden Voraussetzungen gegeben ist:

Die Richtigkeit der personenbezogenen Daten wird von der betroffenen Person bestritten, und zwar f\u00FCr eine Dauer, die es dem Verantwortlichen erm\u00F6glicht, die Richtigkeit der personenbezogenen Daten zu \u00FCberpr\u00FCfen.
Die Verarbeitung ist unrechtm\u00E4\u00DFig, die betroffene Person lehnt die L\u00F6schung der personenbezogenen Daten ab und verlangt stattdessen die Einschr\u00E4nkung der Nutzung der personenbezogenen Daten.
Der Verantwortliche ben\u00F6tigt die personenbezogenen Daten f\u00FCr die Zwecke der Verarbeitung nicht l\u00E4nger, die betroffene Person ben\u00F6tigt sie jedoch zur Geltendmachung, Aus\u00FCbung oder Verteidigung von Rechtsanspr\u00FCchen.
Die betroffene Person hat Widerspruch gegen die Verarbeitung gem. Art. 21 Abs. 1 DSGVO eingelegt und es steht noch nicht fest, ob die berechtigten Gr\u00FCnde des Verantwortlichen gegen\u00FCber denen der betroffenen Person \u00FCberwiegen.

Sofern eine der oben genannten Voraussetzungen gegeben ist und eine betroffene Person die Einschr\u00E4nkung von personenbezogenen Daten, die bei der Sinopia Deutschland GmbH gespeichert sind, verlangen m\u00F6chte, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\u00FCr die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Sinopia Deutschland GmbH wird die Einschr\u00E4nkung der Verarbeitung veranlassen.

f) Recht auf Daten\u00FCbertragbarkeit

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\u00E4ischen Richtlinien- und Verordnungsgeber gew\u00E4hrte Recht, die sie betreffenden personenbezogenen Daten, welche durch die betroffene Person einem Verantwortlichen bereitgestellt wurden, in einem strukturierten, g\u00E4ngigen und maschinenlesbaren Format zu erhalten. Sie hat au\u00DFerdem das Recht, diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu \u00FCbermitteln, sofern die Verarbeitung auf der Einwilligung gem\u00E4\u00DF Art. 6 Abs. 1 Buchstabe a DSGVO oder Art. 9 Abs. 2 Buchstabe a DSGVO oder auf einem Vertrag gem\u00E4\u00DF Art. 6 Abs. 1 Buchstabe b DSGVO beruht und die Verarbeitung mithilfe automatisierter Verfahren erfolgt, sofern die Verarbeitung nicht f\u00FCr die Wahrnehmung einer Aufgabe erforderlich ist, die im \u00F6ffentlichen Interesse liegt oder in Aus\u00FCbung \u00F6ffentlicher Gewalt erfolgt, welche dem Verantwortlichen \u00FCbertragen wurde.

Ferner hat die betroffene Person bei der Aus\u00FCbung ihres Rechts auf Daten\u00FCbertragbarkeit gem\u00E4\u00DF Art. 20 Abs. 1 DSGVO das Recht, zu erwirken, dass die personenbezogenen Daten direkt von einem Verantwortlichen an einen anderen Verantwortlichen \u00FCbermittelt werden, soweit dies technisch machbar ist und sofern hiervon nicht die Rechte und Freiheiten anderer Personen beeintr\u00E4chtigt werden.

Zur Geltendmachung des Rechts auf Daten\u00FCbertragbarkeit kann sich die betroffene Person jederzeit an einen Mitarbeiter der Sinopia Deutschland GmbH wenden.

g) Recht auf Widerspruch

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\u00E4ischen Richtlinien- und Verordnungsgeber gew\u00E4hrte Recht, aus Gr\u00FCnden, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 Buchstaben e oder f DSGVO erfolgt, Widerspruch einzulegen. Dies gilt auch f\u00FCr ein auf diese Bestimmungen gest\u00FCtztes Profiling.

Die Sinopia Deutschland GmbH verarbeitet die personenbezogenen Daten im Falle des Widerspruchs nicht mehr, es sei denn, wir k\u00F6nnen zwingende schutzw\u00FCrdige Gr\u00FCnde f\u00FCr die Verarbeitung nachweisen, die den Interessen, Rechten und Freiheiten der betroffenen Person \u00FCberwiegen, oder die Verarbeitung dient der Geltendmachung, Aus\u00FCbung oder Verteidigung von Rechtsanspr\u00FCchen.

Verarbeitet die Sinopia Deutschland GmbH personenbezogene Daten, um Direktwerbung zu betreiben, so hat die betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung der personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen. Dies gilt auch f\u00FCr das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Widerspricht die betroffene Person gegen\u00FCber der Sinopia Deutschland GmbH der Verarbeitung f\u00FCr Zwecke der Direktwerbung, so wird die Sinopia Deutschland GmbH die personenbezogenen Daten nicht mehr f\u00FCr diese Zwecke verarbeiten.

Zudem hat die betroffene Person das Recht, aus Gr\u00FCnden, die sich aus ihrer besonderen Situation ergeben, gegen die sie betreffende Verarbeitung personenbezogener Daten, die bei der Sinopia Deutschland GmbH zu wissenschaftlichen oder historischen Forschungszwecken oder zu statistischen Zwecken gem\u00E4\u00DF Art. 89 Abs. 1 DSGVO erfolgen, Widerspruch einzulegen, es sei denn, eine solche Verarbeitung ist zur Erf\u00FCllung einer im \u00F6ffentlichen Interesse liegenden Aufgabe erforderlich.

Zur Aus\u00FCbung des Rechts auf Widerspruch kann sich die betroffene Person an jeden Mitarbeiter der Sinopia Deutschland GmbH wenden. Der betroffenen Person steht es ferner frei, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft, ungeachtet der Richtlinie 2002/58/EG, ihr Widerspruchsrecht mittels automatisierter Verfahren auszu\u00FCben, bei denen technische Spezifikationen verwendet werden.

h) Automatisierte Entscheidungen im Einzelfall einschlie\u00DFlich Profiling

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\u00E4ischen Richtlinien- und Verordnungsgeber gew\u00E4hrte Recht, nicht einer ausschlie\u00DFlich auf einer automatisierten Verarbeitung \u2014 einschlie\u00DFlich Profiling \u2014 beruhenden Entscheidung unterworfen zu werden, die ihr gegen\u00FCber rechtliche Wirkung entfaltet oder sie in \u00E4hnlicher Weise erheblich beeintr\u00E4chtigt, sofern die Entscheidung (1) nicht f\u00FCr den Abschluss oder die Erf\u00FCllung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich ist, oder (2) aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten, denen der Verantwortliche unterliegt, zul\u00E4ssig ist und diese Rechtsvorschriften angemessene Ma\u00DFnahmen zur Wahrung der Rechte und Freiheiten sowie der berechtigten Interessen der betroffenen Person enthalten oder (3) mit ausdr\u00FCcklicher Einwilligung der betroffenen Person erfolgt.

Ist die Entscheidung (1) f\u00FCr den Abschluss oder die Erf\u00FCllung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich oder (2) erfolgt sie mit ausdr\u00FCcklicher Einwilligung der betroffenen Person, trifft die Sinopia Deutschland GmbH angemessene Ma\u00DFnahmen, um die Rechte und Freiheiten sowie die berechtigten Interessen der betroffenen Person zu wahren, wozu mindestens das Recht auf Erwirkung des Eingreifens einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung geh\u00F6rt.

M\u00F6chte die betroffene Person Rechte mit Bezug auf automatisierte Entscheidungen geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter der Sinopia Deutschland GmbH wenden.

i) Recht auf Widerruf einer datenschutzrechtlichen Einwilligung

Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\u00E4ischen Richtlinien- und Verordnungsgeber gew\u00E4hrte Recht, eine Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen.

M\u00F6chte die betroffene Person ihr Recht auf Widerruf einer Einwilligung geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter der Sinopia Deutschland GmbH wenden.

8. Datenschutz bei Bewerbungen und im Bewerbungsverfahren

Der f\u00FCr die Verarbeitung Verantwortliche erhebt und verarbeitet die personenbezogenen Daten von Bewerbern zum Zwecke der Abwicklung des Bewerbungsverfahrens. Die Verarbeitung kann auch auf elektronischem Wege erfolgen. Dies ist insbesondere dann der Fall, wenn ein Bewerber entsprechende Bewerbungsunterlagen auf dem elektronischen Wege, beispielsweise per E-Mail oder \u00FCber ein auf der Internetseite befindliches Webformular, an den f\u00FCr die Verarbeitung Verantwortlichen \u00FCbermittelt. Schlie\u00DFt der f\u00FCr die Verarbeitung Verantwortliche einen Anstellungsvertrag mit einem Bewerber, werden die \u00FCbermittelten Daten zum Zwecke der Abwicklung des Besch\u00E4ftigungsverh\u00E4ltnisses unter Beachtung der gesetzlichen Vorschriften gespeichert. Wird von dem f\u00FCr die Verarbeitung Verantwortlichen kein Anstellungsvertrag mit dem Bewerber geschlossen, so werden die Bewerbungsunterlagen zwei Monate nach Bekanntgabe der Absageentscheidung automatisch gel\u00F6scht, sofern einer L\u00F6schung keine sonstigen berechtigten Interessen des f\u00FCr die Verarbeitung Verantwortlichen entgegenstehen. Sonstiges berechtigtes Interesse in diesem Sinne ist beispielsweise eine Beweispflicht in einem Verfahren nach dem Allgemeinen Gleichbehandlungsgesetz (AGG).

9. Rechtsgrundlage der Verarbeitung

Art. 6 Abs. 1 lit. a DSGVO dient unserem Unternehmen als Rechtsgrundlage f\u00FCr Verarbeitungsvorg\u00E4nge, bei denen wir eine Einwilligung f\u00FCr einen bestimmten Verarbeitungszweck einholen. Ist die Verarbeitung personenbezogener Daten zur Erf\u00FCllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, erforderlich, wie dies beispielsweise bei Verarbeitungsvorg\u00E4ngen der Fall ist, die f\u00FCr eine Lieferung von Waren oder die Erbringung einer sonstigen Leistung oder Gegenleistung notwendig sind, so beruht die Verarbeitung auf Art. 6 Abs. 1 lit. b DSGVO. Gleiches gilt f\u00FCr solche Verarbeitungsvorg\u00E4nge die zur Durchf\u00FChrung vorvertraglicher Ma\u00DFnahmen erforderlich sind, etwa in F\u00E4llen von Anfragen zu unseren Produkten oder Leistungen. Unterliegt unser Unternehmen einer rechtlichen Verpflichtung durch welche eine Verarbeitung von personenbezogenen Daten erforderlich wird, wie beispielsweise zur Erf\u00FCllung steuerlicher Pflichten, so basiert die Verarbeitung auf Art. 6 Abs. 1 lit. c DSGVO. In seltenen F\u00E4llen k\u00F6nnte die Verarbeitung von personenbezogenen Daten erforderlich werden, um lebenswichtige Interessen der betroffenen Person oder einer anderen nat\u00FCrlichen Person zu sch\u00FCtzen. Schlie\u00DFlich k\u00F6nnten Verarbeitungsvorg\u00E4nge auf Art. 6 Abs. 1 lit. f DSGVO beruhen. Auf dieser Rechtsgrundlage basieren Verarbeitungsvorg\u00E4nge, die von keiner der vorgenannten Rechtsgrundlagen erfasst werden, wenn die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich ist, sofern die Interessen, Grundrechte und Grundfreiheiten des Betroffenen nicht \u00FCberwiegen.

10. Berechtigte Interessen an der Verarbeitung, die von dem Verantwortlichen oder einem Dritten verfolgt werden

Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 Abs. 1 lit. f DSGVO ist unser berechtigtes Interesse die Durchf\u00FChrung unserer Gesch\u00E4ftst\u00E4tigkeit zugunsten des Wohlergehens all unserer Mitarbeiter und unserer Anteilseigner.

11. Dauer, f\u00FCr die die personenbezogenen Daten gespeichert werden

Das Kriterium f\u00FCr die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinem\u00E4\u00DFig gel\u00F6scht, sofern sie nicht mehr zur Vertragserf\u00FCllung oder Vertragsanbahnung erforderlich sind.

12. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten; Erforderlichkeit f\u00FCr den Vertragsabschluss; Verpflichtung der betroffenen Person, die personenbezogenen Daten bereitzustellen; m\u00F6gliche Folgen der Nichtbereitstellung

Wir kl\u00E4ren Sie dar\u00FCber auf, dass die Bereitstellung personenbezogener Daten zum Teil gesetzlich vorgeschrieben ist (z.B. Steuervorschriften) oder sich auch aus vertraglichen Regelungen (z.B. Angaben zum Vertragspartner) ergeben kann. Mitunter kann es zu einem Vertragsschluss erforderlich sein, dass eine betroffene Person uns personenbezogene Daten zur Verf\u00FCgung stellt, die in der Folge durch uns verarbeitet werden m\u00FCssen. Die betroffene Person ist beispielsweise verpflichtet uns personenbezogene Daten bereitzustellen, wenn unser Unternehmen mit ihr einen Vertrag abschlie\u00DFt. Eine Nichtbereitstellung der personenbezogenen Daten h\u00E4tte zur Folge, dass der Vertrag mit dem Betroffenen nicht geschlossen werden k\u00F6nnte. Vor einer Bereitstellung personenbezogener Daten durch den Betroffenen muss sich der Betroffene an einen unserer Mitarbeiter wenden. Unser Mitarbeiter kl\u00E4rt den Betroffenen einzelfallbezogen dar\u00FCber auf, ob die Bereitstellung der personenbezogenen Daten gesetzlich oder vertraglich vorgeschrieben oder f\u00FCr den Vertragsabschluss erforderlich ist, ob eine Verpflichtung besteht, die personenbezogenen Daten bereitzustellen, und welche Folgen die Nichtbereitstellung der personenbezogenen Daten h\u00E4tte.

13. Bestehen einer automatisierten Entscheidungsfindung

Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling.

Entwickelt von den Spezialisten f\u00FCr LegalTech bei Willing & Able, die auch das System f\u00FCr den DSGVO-Urlaubstracker entwickelt haben. Die in unserem Datenschutzerkl\u00E4rungsgenerator enthaltenen Rechtstexte wurden von Prof. Dr. h.c. Heiko Jonny Maniero vom Deutschen Datenschutzverband und Christian Solmecke von WBS law bereitgestellt und ver\u00F6ffentlicht.`,
    agreeLabel: "Ich habe die Datenschutzerkl\u00E4rung gelesen und akzeptiere sie",
    agreeError: "Bitte lesen und akzeptieren Sie die Datenschutzerkl\u00E4rung, um fortzufahren.",
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
    contactDetails: "info@sinopia.eu",
    vatIdTitle: "Umsatzsteuer-ID:",
    vatIdNumber: "DE455888790",
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
    objectiveLabel: "Liefergegenstände",
    objectivePlaceholder:
      "Was möchten Sie erreichen? Was ist das gewünschte Ergebnis?",
    objective: "Liefergegenstand",
    objectives: "Liefergegenstände",
    addObjective: "Liefergegenstand hinzufügen",
    removeObjective: "Entfernen",
    atLeastOneObjective: "Bitte fügen Sie mindestens einen Liefergegenstand hinzu.",
    uploadCta: {
      headline: "Haben Sie ein Anforderungsdokument?",
      subtext: "Überspringen Sie die manuelle Eingabe! Laden Sie Ihre PDF-Datei hoch und lassen Sie unsere KI die Details für Sie extrahieren.",
      button: "Aufgabe-Datei hochladen",
    },
    createButton: "Aufgabe speichern",
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
    netAmount: "Nettobetrag",
    vatRate: "MwSt. 19%",
    totalWithVat: "Gesamt inkl. MwSt.",
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
