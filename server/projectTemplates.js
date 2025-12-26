export const projectTemplates = [
  {
    _id: 101,
    title: "Patient Appointment Booking System",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Patients face difficulty in booking doctor appointments due to lack of simple online systems.",
    proposedSolution:
      "Build a web app that allows patients to book, view, and manage doctor appointments online.",
    keyFeatures: [
      "Doctor listing",
      "Appointment booking",
      "User login",
      "Appointment history",
      "Email confirmation",
    ],
    roadmapText:
      "UI design → Backend setup → Database integration → Testing → Deployment",
    tasksText:
      "Design UI, Setup auth, Build booking module, Connect MongoDB, Final testing",
    summaryText:
      "A simple system that digitizes appointment booking for patients.",
    vivaQAText:
      "This project improves healthcare service efficiency and reduces waiting time.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 102,
    title: "Medicine Reminder System",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Patients forget to take medicines on time, causing health problems.",
    proposedSolution:
      "Develop a reminder system that notifies patients about medicine schedules.",
    keyFeatures: [
      "Add medicine schedule",
      "Reminder alerts",
      "Daily notification",
      "User profile",
      "Health history",
    ],
    roadmapText: "UI → Reminder logic → Database → Notification → Testing",
    tasksText:
      "Create forms, Set reminder logic, Store data, Send alerts",
    summaryText:
      "Helps patients follow medicine routines correctly.",
    vivaQAText: "This project supports better medication adherence.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 103,
    title: "Hospital Feedback Management System",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Hospitals lack proper systems to collect and analyze patient feedback.",
    proposedSolution:
      "Create an online feedback system for hospitals to improve services.",
    keyFeatures: [
      "Feedback submission",
      "Rating system",
      "Admin dashboard",
      "Feedback reports",
      "User management",
    ],
    roadmapText:
      "Design UI → Build feedback module → Database → Reports → Testing",
    tasksText: "Create feedback form, Save feedback, Display reports",
    summaryText: "Improves hospital services using patient feedback.",
    vivaQAText:
      "The project helps hospitals improve patient experience.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 104,
    title: "Blood Bank Management System",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Blood availability information is often poorly managed and outdated.",
    proposedSolution:
      "Develop a system to manage blood donors and blood stock records.",
    keyFeatures: [
      "Donor registration",
      "Blood stock tracking",
      "Search blood group",
      "Request management",
      "Admin panel",
    ],
    roadmapText: "UI → Donor module → Database → Stock system → Testing",
    tasksText:
      "Register donors, Store data, Manage stock, Search feature",
    summaryText: "A simple solution for managing blood donation services.",
    vivaQAText:
      "This system ensures quick access to blood availability.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 105,
    title: "Health Tips & Awareness Portal",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement: "People lack awareness about basic health practices.",
    proposedSolution:
      "Create a portal that shares daily health tips and wellness information.",
    keyFeatures: [
      "Health articles",
      "Admin content management",
      "User login",
      "Category filtering",
      "Like & share options",
    ],
    roadmapText:
      "Design UI → Build content system → Database → Testing",
    tasksText: "Create pages, Manage content, Connect database",
    summaryText:
      "Encourages healthy lifestyle through daily health content.",
    vivaQAText: "This project promotes health awareness.",
    isActive: true,
    createdAt: new Date(),
  },
  // Final projects (beginner)
  {
    _id: 1,
    title: "Patient Appointment Booking System",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Patients face difficulty in booking doctor appointments due to lack of simple digital systems.",
    proposedSolution:
      "Develop a web application that allows patients to book doctor appointments online easily.",
    keyFeatures: [
      "Doctor list",
      "Appointment booking",
      "Patient registration",
      "Appointment status",
      "Email notification",
    ],
    roadmapText:
      "Phase 1: UI Design → Phase 2: Backend & Database → Phase 3: Testing",
    tasksText:
      "Design UI, Create booking form, Store data in database, Test application",
    summaryText:
      "A basic healthcare web application to simplify appointment booking.",
    vivaQAText:
      "Q: Why this project? A: To reduce manual appointment booking and save time.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 2,
    title: "Medicine Reminder System",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Many patients forget to take medicines on time, affecting their recovery.",
    proposedSolution:
      "Build a system that reminds patients to take medicines as per schedule.",
    keyFeatures: [
      "Medicine schedule",
      "Daily reminders",
      "Patient profile",
      "Medicine history",
      "Simple dashboard",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Reminder logic → Phase 3: Testing",
    tasksText:
      "Create reminder form, Save medicine details, Trigger reminders, Test system",
    summaryText:
      "A simple reminder application to help patients take medicines regularly.",
    vivaQAText:
      "Q: Why this project? A: To help patients follow proper medication routine.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 3,
    title: "Online Blood Donor Management System",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Finding blood donors quickly during emergencies is difficult.",
    proposedSolution:
      "Create a system that connects blood donors and patients easily.",
    keyFeatures: [
      "Donor registration",
      "Blood group search",
      "Contact details",
      "Simple admin panel",
      "Donor list",
    ],
    roadmapText:
      "Phase 1: UI Design → Phase 2: Database → Phase 3: Testing",
    tasksText:
      "Design registration form, Store donor data, Implement search, Test system",
    summaryText:
      "A basic system to help patients find blood donors during emergencies.",
    vivaQAText:
      "Q: Why this project? A: To save time and lives during blood emergencies.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 4,
    title: "Hospital Management System (Basic)",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Manual hospital record keeping is time-consuming and error-prone.",
    proposedSolution:
      "Develop a basic hospital management system to store patient and doctor data.",
    keyFeatures: [
      "Patient registration",
      "Doctor records",
      "Appointment details",
      "Simple dashboard",
      "Data storage",
    ],
    roadmapText:
      "Phase 1: Requirement analysis → Phase 2: Development → Phase 3: Testing",
    tasksText:
      "Create forms, Store data, Display records, Test application",
    summaryText:
      "A beginner-friendly system to digitize hospital records.",
    vivaQAText:
      "Q: Why this project? A: To reduce paperwork and improve efficiency.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 5,
    title: "Health Tips & Awareness Portal",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Many people lack basic health awareness and reliable health information.",
    proposedSolution:
      "Build a web portal that provides verified health tips and awareness content.",
    keyFeatures: [
      "Health articles",
      "Category-wise tips",
      "Admin content upload",
      "User-friendly UI",
      "Search functionality",
    ],
    roadmapText:
      "Phase 1: UI design → Phase 2: Content module → Phase 3: Testing",
    tasksText:
      "Design pages, Add health content, Implement search, Test portal",
    summaryText:
      "A simple portal to spread health awareness using digital platforms.",
    vivaQAText:
      "Q: Why this project? A: To improve public health awareness.",
    isActive: true,
    createdAt: new Date(),
  },
  // Hackathon projects
  {
    id: 1,
    title: "CareConnect – Smart Patient Support Platform",
    domain: "Healthcare",
    type: "hackathon project",
    skillsTags: ["react", "node", "mongodb"],
    problemStatement:
      "Many patients struggle to get quick guidance for common health problems and do not know when professional help is required.",
    proposedSolution:
      "Build a web platform that provides basic health guidance, symptom checking, and connects patients with nearby clinics.",
    keyFeatures: [
      "Symptom checker with basic questions",
      "Health tips & awareness articles",
      "Nearby clinic locator",
      "Appointment request form",
      "Emergency contact information",
    ],
    roadmapText:
      "Phase 1: UI & basic health modules. Phase 2: Clinic search & appointment system. Phase 3: Optimization & deployment.",
    taskText:
      "Design UI → Build symptom checker → Add clinic locator → Implement appointment module → Testing",
    summaryText:
      "A beginner-friendly healthcare solution that improves access to basic medical guidance.",
    vivaQAText:
      "Explains patient workflow, healthcare challenges, and system benefits clearly.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "BloodLink – Smart Blood Donation System",
    domain: "Healthcare",
    type: "hackathon project",
    skillsTags: ["react", "node", "mongodb"],
    problemStatement:
      "Hospitals waste time finding compatible blood donors during emergencies.",
    proposedSolution:
      "A centralized system to manage blood donors and emergency requests.",
    keyFeatures: [
      "Donor registration",
      "Blood group search",
      "Emergency request posting",
      "Hospital dashboard",
      "Availability status tracking",
    ],
    roadmapText:
      "Phase 1: Donor module. Phase 2: Emergency request system. Phase 3: Final deployment.",
    taskText:
      "Build donor forms → Add search → Create emergency panel → Testing",
    summaryText:
      "A life-saving platform connecting donors and hospitals quickly.",
    vivaQAText:
      "Demonstrates how technology reduces emergency response time.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 4,
    title: "HealHub – Student Health Management Portal",
    domain: "Healthcare",
    type: "hackathon project",
    skillsTags: ["react", "node", "mongodb"],
    problemStatement:
      "Students ignore physical and mental health due to lack of awareness and guidance.",
    proposedSolution:
      "A student-focused portal for wellness content, stress tools, and medical support.",
    keyFeatures: [
      "Daily health tips",
      "Stress & mood tracker",
      "Health check forms",
      "Counseling request system",
      "Emergency help resources",
    ],
    roadmapText:
      "Phase 1: Health content & dashboard. Phase 2: Tracking & counseling module. Phase 3: Deployment.",
    taskText:
      "Design portal → Add trackers → Implement counseling system → Testing",
    summaryText:
      "Improves student wellness through accessible digital healthcare tools.",
    vivaQAText:
      "Explains student health challenges and digital intervention.",
    isActive: true,
    createdAt: new Date(),
    createdAt: new Date(),
  },
  // Intermediate Mini Projects
  {
    _id: 201,
    title: "Online Doctor Appointment & Queue Management",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Hospitals face long patient queues due to lack of real-time appointment and queue management systems.",
    proposedSolution:
      "Develop a system that allows patients to book appointments and view live queue status online.",
    keyFeatures: [
      "Doctor-wise appointment booking",
      "Live queue status",
      "Patient registration",
      "Appointment notifications",
      "Admin management panel",
    ],
    roadmapText:
      "Phase 1: UI & flow design → Phase 2: Backend & Database → Phase 3: Testing",
    tasksText:
      "Design UI, Implement booking logic, Manage queue system, Test application",
    summaryText:
      "A smart appointment system to reduce waiting time in hospitals.",
    vivaQAText:
      "Q: Why this project? A: To improve hospital workflow and patient experience.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 202,
    title: "Digital Prescription Management System",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Paper-based prescriptions are often lost and difficult to manage for patients.",
    proposedSolution:
      "Create a digital system where doctors can upload prescriptions and patients can access them anytime.",
    keyFeatures: [
      "Doctor prescription upload",
      "Patient access control",
      "Prescription history",
      "Secure authentication",
      "Download prescription",
    ],
    roadmapText:
      "Phase 1: Requirement analysis → Phase 2: Development → Phase 3: Testing",
    tasksText:
      "Build upload module, Implement authentication, Store prescriptions, Test system",
    summaryText:
      "A digital solution to safely store and manage medical prescriptions.",
    vivaQAText:
      "Q: Why this project? A: To eliminate paper prescriptions and improve record safety.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 203,
    title: "Health Insurance Claim Tracking System",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Patients find it difficult to track the status of their health insurance claims.",
    proposedSolution:
      "Develop a system that allows users to submit and track insurance claims digitally.",
    keyFeatures: [
      "Claim submission form",
      "Claim status tracking",
      "Document upload",
      "User dashboard",
      "Admin verification panel",
    ],
    roadmapText:
      "Phase 1: UI design → Phase 2: Backend & Database → Phase 3: Testing",
    tasksText:
      "Create claim form, Implement status workflow, Store documents, Test system",
    summaryText:
      "A simple platform to track and manage health insurance claims.",
    vivaQAText:
      "Q: Why this project? A: To improve transparency in insurance claim processing.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 204,
    title: "Hospital Feedback & Rating System",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Hospitals lack structured systems to collect and analyze patient feedback.",
    proposedSolution:
      "Build a platform where patients can submit feedback and rate hospital services.",
    keyFeatures: [
      "Patient feedback submission",
      "Rating system",
      "Feedback analytics",
      "Admin dashboard",
      "Report generation",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Development → Phase 3: Testing",
    tasksText:
      "Design feedback forms, Store ratings, Generate reports, Test system",
    summaryText:
      "A feedback system to help hospitals improve service quality.",
    vivaQAText:
      "Q: Why this project? A: To improve healthcare services through patient feedback.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 205,
    title: "Patient Diet & Nutrition Tracker",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Patients with specific health conditions struggle to track daily diet and nutrition.",
    proposedSolution:
      "Develop a system that allows users to log meals and monitor nutrition intake.",
    keyFeatures: [
      "Daily meal logging",
      "Nutrition tracking",
      "Health goal setting",
      "Progress dashboard",
      "Diet history",
    ],
    roadmapText:
      "Phase 1: UI design → Phase 2: Logic & Database → Phase 3: Testing",
    tasksText:
      "Create meal forms, Calculate nutrition data, Display progress, Test system",
    summaryText:
      "A nutrition tracking tool to help users maintain a healthy diet.",
    vivaQAText:
      "Q: Why this project? A: To promote healthier lifestyle through diet tracking.",
    isActive: true,
    createdAt: new Date(),
  },
  // Intermediate Final Projects
  {
    _id: 301,
    title: "Smart Hospital Management System",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Hospitals struggle with managing patients, doctors, appointments, and records using manual or disconnected systems.",
    proposedSolution:
      "Develop an integrated hospital management system that digitizes patient records, appointments, and doctor schedules.",
    keyFeatures: [
      "Patient & doctor management",
      "Online appointment booking",
      "Digital medical records",
      "Admin dashboard",
      "Role-based access control",
    ],
    roadmapText:
      "Phase 1: Requirement analysis → Phase 2: System design → Phase 3: Development → Phase 4: Testing",
    tasksText:
      "Design database, Implement authentication, Build modules, Integrate dashboard, Test system",
    summaryText:
      "A centralized system to streamline hospital operations and data management.",
    vivaQAText:
      "Q: Why this project? A: To improve hospital efficiency and reduce paperwork.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 302,
    title: "Online Telemedicine & Consultation Platform",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Patients in remote areas face difficulties in accessing timely medical consultation.",
    proposedSolution:
      "Create a telemedicine platform that enables online doctor consultation through chat or video.",
    keyFeatures: [
      "Doctor & patient registration",
      "Online consultation booking",
      "Chat-based consultation",
      "Digital prescriptions",
      "Consultation history",
    ],
    roadmapText:
      "Phase 1: UI design → Phase 2: Backend development → Phase 3: Integration → Phase 4: Testing",
    tasksText:
      "Build user modules, Implement consultation flow, Store prescriptions, Test platform",
    summaryText:
      "A telemedicine solution to provide healthcare access from anywhere.",
    vivaQAText:
      "Q: Why this project? A: To provide remote healthcare services using technology.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 303,
    title: "Electronic Health Record (EHR) System",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Patient health records are scattered and difficult to access across healthcare providers.",
    proposedSolution:
      "Develop an electronic health record system for centralized and secure patient data storage.",
    keyFeatures: [
      "Patient medical history",
      "Doctor access with permission",
      "Lab report uploads",
      "Secure authentication",
      "Data privacy control",
    ],
    roadmapText:
      "Phase 1: Analysis → Phase 2: Database design → Phase 3: Development → Phase 4: Testing",
    tasksText:
      "Design schema, Implement access control, Build upload modules, Test security",
    summaryText:
      "A secure system for managing and accessing patient health records digitally.",
    vivaQAText:
      "Q: Why this project? A: To improve data accessibility and patient care.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 304,
    title: "Health Insurance Management & Claim System",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Managing health insurance policies and claims manually is slow and error-prone.",
    proposedSolution:
      "Build a system to manage insurance policies and allow users to submit and track claims digitally.",
    keyFeatures: [
      "Policy management",
      "Online claim submission",
      "Claim status tracking",
      "Document verification",
      "Admin approval workflow",
    ],
    roadmapText:
      "Phase 1: UI design → Phase 2: Backend & database → Phase 3: Workflow implementation → Phase 4: Testing",
    tasksText:
      "Create claim module, Implement workflows, Store documents, Test system",
    summaryText:
      "A digital solution to simplify health insurance management and claims.",
    vivaQAText:
      "Q: Why this project? A: To improve transparency and speed in insurance processes.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 305,
    title: "AI-Based Health Symptom Checker (Basic)",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "People often ignore early health symptoms due to lack of basic medical guidance.",
    proposedSolution:
      "Develop a basic AI-powered system that analyzes symptoms and suggests possible health conditions.",
    keyFeatures: [
      "Symptom input form",
      "Basic AI logic",
      "Condition suggestions",
      "Health advice",
      "User history",
    ],
    roadmapText:
      "Phase 1: Data collection → Phase 2: Logic implementation → Phase 3: Integration → Phase 4: Testing",
    tasksText:
      "Create symptom form, Implement logic rules, Store user data, Test accuracy",
    summaryText:
      "A beginner-friendly AI healthcare system for early symptom guidance.",
    vivaQAText:
      "Q: Why this project? A: To help users get basic health guidance early.",
    isActive: true,
    createdAt: new Date(),
  },
  // Intermediate Hackathon Projects
  {
    _id: 401,
    title: "AI-Based Emergency Triage Assistant",
    domain: "Healthcare",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "In emergencies, hospitals struggle to quickly prioritize patients based on severity.",
    proposedSolution:
      "Build an AI-based triage system that analyzes symptoms and vitals to prioritize emergency cases.",
    keyFeatures: [
      "Symptom input form",
      "Severity scoring",
      "Priority-based patient list",
      "Doctor dashboard",
      "Quick alerts",
    ],
    roadmapText:
      "Phase 1: Problem analysis → Phase 2: AI logic → Phase 3: UI integration → Phase 4: Demo",
    tasksText:
      "Design UI, Implement scoring logic, Display priority list, Test demo",
    summaryText:
      "A fast triage solution to help doctors handle emergency patients efficiently.",
    vivaQAText:
      "Q: Why this project? A: To reduce emergency response time and save lives.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 402,
    title: "Smart Medicine Availability Finder",
    domain: "Healthcare",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Patients waste critical time searching for medicines that are out of stock nearby.",
    proposedSolution:
      "Develop a platform that shows real-time medicine availability in nearby pharmacies.",
    keyFeatures: [
      "Medicine search",
      "Nearby pharmacy listing",
      "Availability status",
      "Location-based search",
      "Quick contact option",
    ],
    roadmapText:
      "Phase 1: UI design → Phase 2: Search logic → Phase 3: API integration → Phase 4: Demo",
    tasksText:
      "Create search UI, Implement filtering, Show pharmacy results, Test demo",
    summaryText:
      "A quick medicine finder to save time during medical emergencies.",
    vivaQAText:
      "Q: Why this project? A: To help patients find medicines faster.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 403,
    title: "Mental Health Support & Mood Tracker",
    domain: "Healthcare",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Many people ignore mental health issues due to lack of easy and private support systems.",
    proposedSolution:
      "Build a mental health platform that tracks mood and provides basic self-care suggestions.",
    keyFeatures: [
      "Daily mood tracking",
      "Mental health tips",
      "Anonymous usage",
      "Progress insights",
      "Emergency helpline links",
    ],
    roadmapText:
      "Phase 1: UX design → Phase 2: Logic implementation → Phase 3: Testing → Phase 4: Demo",
    tasksText:
      "Design mood tracker, Store entries, Show insights, Test platform",
    summaryText:
      "A simple digital tool to promote mental health awareness and self-care.",
    vivaQAText:
      "Q: Why this project? A: To support mental health using accessible technology.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 404,
    title: "Women Health & Period Care Tracker",
    domain: "Healthcare",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Women lack simple digital tools to track menstrual health and related symptoms.",
    proposedSolution:
      "Create a women-centric health tracker for period cycle tracking and health tips.",
    keyFeatures: [
      "Period cycle tracking",
      "Symptom logging",
      "Health tips",
      "Reminder alerts",
      "Privacy-focused design",
    ],
    roadmapText:
      "Phase 1: UI design → Phase 2: Tracking logic → Phase 3: Alerts → Phase 4: Demo",
    tasksText:
      "Create tracking forms, Implement reminder logic, Display insights, Test demo",
    summaryText:
      "A health-focused solution to empower women through digital care tools.",
    vivaQAText:
      "Q: Why this project? A: To improve women’s health awareness and tracking.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 405,
    title: "IoT-Based Patient Vital Monitoring Dashboard",
    domain: "Healthcare",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Continuous monitoring of patient vitals is difficult outside hospitals.",
    proposedSolution:
      "Build a dashboard that displays real-time patient vitals collected from IoT devices.",
    keyFeatures: [
      "Real-time vitals display",
      "Sensor data integration",
      "Alert thresholds",
      "Doctor monitoring dashboard",
      "Patient history",
    ],
    roadmapText:
      "Phase 1: IoT data setup → Phase 2: Dashboard UI → Phase 3: Alerts → Phase 4: Demo",
    tasksText:
      "Integrate sensor data, Display charts, Set alerts, Test demo",
    summaryText:
      "A smart healthcare dashboard for real-time patient monitoring.",
    vivaQAText:
      "Q: Why this project? A: To enable remote patient monitoring using IoT.",
    isActive: true,
    createdAt: new Date(),
  },
  // Advanced Mini Projects
  {
    _id: 501,
    title: "AI-Based Disease Prediction System",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Early disease detection is difficult without intelligent analysis of symptoms.",
    proposedSolution:
      "Develop an AI system that predicts possible diseases based on user symptoms.",
    keyFeatures: [
      "Symptom input",
      "ML-based prediction",
      "Disease probability",
      "User history",
      "Secure login",
    ],
    roadmapText:
      "Phase 1: Dataset → Phase 2: ML Model → Phase 3: UI → Phase 4: Testing",
    tasksText:
      "Prepare data, Train model, Build UI, Integrate backend, Test",
    summaryText:
      "An intelligent system for early disease prediction.",
    vivaQAText:
      "Q: Why this project? A: To help in early health diagnosis.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 502,
    title: "Smart Medicine Recommendation System",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Patients often misuse medicines without proper guidance.",
    proposedSolution:
      "Create a rule-based system that suggests medicines based on symptoms.",
    keyFeatures: [
      "Symptom analysis",
      "Medicine suggestion",
      "Dosage info",
      "Warnings",
      "History tracking",
    ],
    roadmapText:
      "Phase 1: Rules → Phase 2: Logic → Phase 3: UI → Phase 4: Testing",
    tasksText:
      "Define rules, Implement logic, Design UI, Test system",
    summaryText:
      "A smart assistant for basic medicine guidance.",
    vivaQAText:
      "Q: Why this project? A: To reduce medicine misuse.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 503,
    title: "Health Chatbot using NLP",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Patients need quick answers to basic health queries.",
    proposedSolution:
      "Build an NLP-based chatbot to answer health-related questions.",
    keyFeatures: [
      "Chat interface",
      "NLP processing",
      "Health FAQs",
      "24/7 availability",
      "Conversation history",
    ],
    roadmapText:
      "Phase 1: NLP setup → Phase 2: Training → Phase 3: UI → Phase 4: Testing",
    tasksText:
      "Train chatbot, Build UI, Integrate backend, Test responses",
    summaryText:
      "A virtual assistant for healthcare queries.",
    vivaQAText:
      "Q: Why chatbot? A: To provide instant health support.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 504,
    title: "Smart Health Monitoring Dashboard",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Manual health tracking is inefficient.",
    proposedSolution:
      "Create a dashboard to track vitals and health metrics.",
    keyFeatures: [
      "Vitals tracking",
      "Graph visualization",
      "User profile",
      "Alerts",
      "History",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: Data logic → Phase 3: Charts → Phase 4: Testing",
    tasksText:
      "Design dashboard, Implement logic, Add charts, Test",
    summaryText:
      "A smart dashboard for health monitoring.",
    vivaQAText:
      "Q: Why dashboard? A: To visualize health data easily.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 505,
    title: "Nutrition & Calorie Analyzer",
    domain: "Healthcare",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "People struggle to calculate daily calorie intake.",
    proposedSolution:
      "Develop a system that analyzes food intake and calories.",
    keyFeatures: [
      "Food logging",
      "Calorie calculation",
      "Diet reports",
      "Goal tracking",
      "History",
    ],
    roadmapText:
      "Phase 1: Dataset → Phase 2: Logic → Phase 3: UI → Phase 4: Testing",
    tasksText:
      "Prepare data, Implement logic, Build UI, Test",
    summaryText:
      "A calorie analysis system for healthy living.",
    vivaQAText:
      "Q: Why this project? A: To promote healthy eating.",
    isActive: true,
    createdAt: new Date(),
  },
  // Advanced Final Projects
  {
    _id: 601,
    title: "Blockchain-Based Electronic Health Record System",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Medical records are vulnerable to data breaches and tampering.",
    proposedSolution:
      "Use blockchain to securely store and manage health records.",
    keyFeatures: [
      "Blockchain storage",
      "Patient consent",
      "Immutable records",
      "Access control",
      "Audit logs",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Blockchain → Phase 3: Integration → Phase 4: Testing",
    tasksText:
      "Design system, Implement blockchain, Manage access, Test",
    summaryText:
      "A secure EHR system using blockchain technology.",
    vivaQAText:
      "Q: Why blockchain? A: It ensures data integrity.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 602,
    title: "AI-Based Telemedicine Platform",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Remote patients lack intelligent consultation support.",
    proposedSolution:
      "Build an AI-enabled telemedicine consultation platform.",
    keyFeatures: [
      "Video consultation",
      "AI symptom analysis",
      "Digital prescriptions",
      "History tracking",
      "Secure login",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: AI → Phase 3: Integration → Phase 4: Testing",
    tasksText:
      "Build modules, Integrate AI, Test consultations",
    summaryText:
      "A smart telemedicine solution for remote healthcare.",
    vivaQAText:
      "Q: Why AI here? A: To assist doctors and patients.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 603,
    title: "Smart Health Insurance Claim System",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Insurance claim processing is slow and inefficient.",
    proposedSolution:
      "Automate claims using intelligent workflows.",
    keyFeatures: [
      "Claim automation",
      "Document verification",
      "Status tracking",
      "Admin dashboard",
      "Notifications",
    ],
    roadmapText:
      "Phase 1: Analysis → Phase 2: Backend → Phase 3: Workflow → Phase 4: Testing",
    tasksText:
      "Build claim module, Implement workflows, Test",
    summaryText:
      "An automated insurance claim system.",
    vivaQAText:
      "Q: Why automation? A: To reduce claim time.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 604,
    title: "Smart ICU Monitoring System",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "ICU patients need continuous intelligent monitoring.",
    proposedSolution:
      "Develop an AI + IoT ICU monitoring system.",
    keyFeatures: [
      "IoT vitals",
      "AI risk alerts",
      "Real-time dashboard",
      "Doctor access",
      "Patient history",
    ],
    roadmapText:
      "Phase 1: IoT → Phase 2: AI → Phase 3: Dashboard → Phase 4: Testing",
    tasksText:
      "Integrate sensors, Train AI, Build dashboard, Test",
    summaryText:
      "An intelligent ICU monitoring solution.",
    vivaQAText:
      "Q: Why AI+IoT? A: For proactive care.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 605,
    title: "AI-Based Mental Health Analysis System",
    domain: "Healthcare",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Mental health issues often go undetected.",
    proposedSolution:
      "Analyze user inputs to detect mental health risks.",
    keyFeatures: [
      "Mood analysis",
      "AI prediction",
      "Self-care tips",
      "Progress tracking",
      "Privacy protection",
    ],
    roadmapText:
      "Phase 1: Dataset → Phase 2: AI → Phase 3: UI → Phase 4: Testing",
    tasksText:
      "Prepare data, Train model, Build UI, Test",
    summaryText:
      "A system to support mental health awareness.",
    vivaQAText:
      "Q: Why this project? A: To support mental wellness.",
    isActive: true,
    createdAt: new Date(),
  },
  // Advanced Hackathon Projects (first three; send remaining details for wearable, etc.)
  {
    _id: 701,
    title: "AI-Powered Emergency Response System",
    domain: "Healthcare",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Emergency response delays can cost lives.",
    proposedSolution:
      "Use AI to prioritize and alert emergency services.",
    keyFeatures: [
      "Emergency detection",
      "AI severity scoring",
      "Instant alerts",
      "Live dashboard",
      "Location tracking",
    ],
    roadmapText:
      "Phase 1: Logic → Phase 2: AI → Phase 3: Alerts → Phase 4: Demo",
    tasksText:
      "Implement AI, Integrate alerts, Test demo",
    summaryText:
      "A fast AI-based emergency response solution.",
    vivaQAText:
      "Q: Why this project? A: To save lives.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 702,
    title: "Smart Ambulance Tracking System",
    domain: "Healthcare",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Ambulance delays reduce emergency survival chances.",
    proposedSolution:
      "Track ambulances in real time using GPS.",
    keyFeatures: [
      "Live GPS tracking",
      "Route optimization",
      "Hospital alerts",
      "Driver dashboard",
      "ETA display",
    ],
    roadmapText:
      "Phase 1: GPS → Phase 2: Backend → Phase 3: UI → Phase 4: Demo",
    tasksText:
      "Integrate GPS, Build dashboard, Test demo",
    summaryText:
      "A real-time ambulance tracking system.",
    vivaQAText:
      "Q: Why tracking? A: To reduce response time.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 703,
    title: "AI-Based Pandemic Prediction Dashboard",
    domain: "Healthcare",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Pandemics spread rapidly without early warning.",
    proposedSolution:
      "Analyze data to predict outbreak trends.",
    keyFeatures: [
      "Data analytics",
      "AI prediction",
      "Heatmaps",
      "Trend graphs",
      "Admin dashboard",
    ],
    roadmapText:
      "Phase 1: Data → Phase 2: AI → Phase 3: Dashboard → Phase 4: Demo",
    tasksText:
      "Collect data, Train model, Build dashboard",
    summaryText:
      "An AI dashboard for outbreak prediction.",
    vivaQAText:
      "Q: Why this project? A: For early prevention.",
    isActive: true,
    createdAt: new Date(),
  },
  // Finance Beginner – Mini Projects
  {
    _id: 1,
    title: "Personal Expense Tracker",
    domain: "Finance",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "People find it difficult to track daily expenses manually.",
    proposedSolution:
      "Develop a simple application to record and categorize daily expenses.",
    keyFeatures: [
      "Add daily expenses",
      "Expense categories",
      "Monthly summary",
      "Simple dashboard",
      "Data storage",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: Logic → Phase 3: Testing",
    tasksText:
      "Create expense form, Store data, Show summary, Test app",
    summaryText:
      "A simple tool to track personal expenses easily.",
    vivaQAText:
      "Q: Why this project? A: To manage daily expenses digitally.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 2,
    title: "Budget Planner System",
    domain: "Finance",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "People fail to manage monthly budgets properly.",
    proposedSolution:
      "Build a system to plan and monitor monthly budgets.",
    keyFeatures: [
      "Set monthly budget",
      "Track spending",
      "Budget alerts",
      "Category-wise analysis",
      "Simple reports",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Budget logic → Phase 3: Testing",
    tasksText:
      "Create budget module, Track expenses, Generate report",
    summaryText:
      "A beginner-friendly budget planning system.",
    vivaQAText:
      "Q: Why this project? A: To avoid overspending.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 3,
    title: "Loan EMI Calculator",
    domain: "Finance",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users struggle to calculate loan EMIs manually.",
    proposedSolution:
      "Develop an EMI calculator for loans.",
    keyFeatures: [
      "Loan amount input",
      "Interest rate input",
      "EMI calculation",
      "Loan duration",
      "Result display",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: Formula logic → Phase 3: Testing",
    tasksText:
      "Implement EMI formula, Build UI, Test calculations",
    summaryText:
      "A simple calculator to estimate loan EMIs.",
    vivaQAText:
      "Q: Why this project? A: To help users plan loans.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 4,
    title: "Savings Goal Tracker",
    domain: "Finance",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "People find it hard to track progress towards savings goals.",
    proposedSolution:
      "Create a system to track savings goals.",
    keyFeatures: [
      "Set savings goal",
      "Track savings",
      "Progress bar",
      "Monthly view",
      "Simple dashboard",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Logic → Phase 3: Testing",
    tasksText:
      "Create goal form, Update progress, Test app",
    summaryText:
      "A tool to help users save money efficiently.",
    vivaQAText:
      "Q: Why this project? A: To encourage savings habit.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 5,
    title: "Income Management System",
    domain: "Finance",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users lack clarity on multiple income sources.",
    proposedSolution:
      "Develop a system to record and manage income sources.",
    keyFeatures: [
      "Add income sources",
      "Monthly income summary",
      "Simple charts",
      "History tracking",
      "Dashboard",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: Logic → Phase 3: Testing",
    tasksText:
      "Create income module, Store data, Display summary",
    summaryText:
      "A basic income tracking application.",
    vivaQAText:
      "Q: Why this project? A: To manage income properly.",
    isActive: true,
    createdAt: new Date(),
  },
  // Finance Beginner – Final Projects
  {
    _id: 6,
    title: "Personal Finance Management System",
    domain: "Finance",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "People use multiple apps to manage finances.",
    proposedSolution:
      "Build one system to manage income, expenses, and savings.",
    keyFeatures: [
      "Expense tracking",
      "Income management",
      "Savings tracking",
      "Dashboard",
      "Reports",
    ],
    roadmapText:
      "Phase 1: Analysis → Phase 2: Development → Phase 3: Testing",
    tasksText:
      "Design DB, Build modules, Integrate dashboard",
    summaryText:
      "An all-in-one personal finance solution.",
    vivaQAText:
      "Q: Why this project? A: To manage finances in one place.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 7,
    title: "Online Banking System (Basic)",
    domain: "Finance",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Manual banking operations are slow.",
    proposedSolution:
      "Develop a basic online banking system.",
    keyFeatures: [
      "User registration",
      "Account balance",
      "Money transfer",
      "Transaction history",
      "Secure login",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Backend → Phase 3: Testing",
    tasksText:
      "Build account module, Implement transfer logic",
    summaryText:
      "A simple digital banking system.",
    vivaQAText:
      "Q: Why this project? A: To digitize banking tasks.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 8,
    title: "Invoice Management System",
    domain: "Finance",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Small businesses struggle with manual invoicing.",
    proposedSolution:
      "Create a digital invoice management system.",
    keyFeatures: [
      "Invoice generation",
      "Customer records",
      "Payment status",
      "Invoice history",
      "PDF export",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: Logic → Phase 3: Testing",
    tasksText:
      "Create invoice form, Generate PDF, Store data",
    summaryText:
      "A basic invoicing system for businesses.",
    vivaQAText:
      "Q: Why this project? A: To simplify billing.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 9,
    title: "Tax Calculator System",
    domain: "Finance",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Tax calculation is confusing for individuals.",
    proposedSolution:
      "Develop a simple tax calculator.",
    keyFeatures: [
      "Income input",
      "Tax slab calculation",
      "Tax summary",
      "Result display",
      "Simple UI",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Logic → Phase 3: Testing",
    tasksText:
      "Implement tax rules, Test calculations",
    summaryText:
      "A basic tax estimation system.",
    vivaQAText:
      "Q: Why this project? A: To simplify tax calculation.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 10,
    title: "Salary Management System",
    domain: "Finance",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Manual salary calculation leads to errors.",
    proposedSolution:
      "Build a system to calculate and manage salaries.",
    keyFeatures: [
      "Employee records",
      "Salary calculation",
      "Deductions",
      "Payslip generation",
      "Reports",
    ],
    roadmapText:
      "Phase 1: Analysis → Phase 2: Development → Phase 3: Testing",
    tasksText:
      "Create salary logic, Generate payslips",
    summaryText:
      "A simple salary management system.",
    vivaQAText:
      "Q: Why this project? A: To automate salary calculation.",
    isActive: true,
    createdAt: new Date(),
  },
  // Finance Beginner – Hackathon Projects
  {
    _id: 11,
    title: "Smart Expense Splitter",
    domain: "Finance",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Friends struggle to split expenses fairly.",
    proposedSolution:
      "Build an app to split group expenses.",
    keyFeatures: [
      "Group creation",
      "Expense split",
      "Balance calculation",
      "Summary view",
      "Simple UI",
    ],
    roadmapText:
      "Phase 1: Logic → Phase 2: UI → Phase 3: Demo",
    tasksText:
      "Implement split logic, Test demo",
    summaryText:
      "A quick expense-splitting solution.",
    vivaQAText:
      "Q: Why this project? A: To avoid money conflicts.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 12,
    title: "Digital Wallet System",
    domain: "Finance",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Cash transactions are inconvenient.",
    proposedSolution:
      "Create a simple digital wallet.",
    keyFeatures: [
      "Add balance",
      "Send money",
      "Transaction history",
      "User login",
      "Wallet balance",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Logic → Phase 3: Demo",
    tasksText:
      "Build wallet logic, Test transfers",
    summaryText:
      "A basic digital wallet solution.",
    vivaQAText:
      "Q: Why this project? A: To promote digital payments.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 13,
    title: "Finance Learning & Quiz App",
    domain: "Finance",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "People lack basic financial literacy.",
    proposedSolution:
      "Build a finance learning app with quizzes.",
    keyFeatures: [
      "Finance lessons",
      "Quizzes",
      "Score tracking",
      "User progress",
      "Simple UI",
    ],
    roadmapText:
      "Phase 1: Content → Phase 2: Quiz logic → Phase 3: Demo",
    tasksText:
      "Add content, Implement quizzes",
    summaryText:
      "A fun app to learn finance basics.",
    vivaQAText:
      "Q: Why this project? A: To improve financial literacy.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 14,
    title: "Loan Eligibility Checker",
    domain: "Finance",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users don’t know if they are eligible for loans.",
    proposedSolution:
      "Develop a system to check loan eligibility.",
    keyFeatures: [
      "User input",
      "Eligibility rules",
      "Instant result",
      "Simple UI",
      "Guidance",
    ],
    roadmapText:
      "Phase 1: Rules → Phase 2: Logic → Phase 3: Demo",
    tasksText:
      "Implement eligibility rules",
    summaryText:
      "A quick loan eligibility checker.",
    vivaQAText:
      "Q: Why this project? A: To help loan planning.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 15,
    title: "Daily Financial Tips App",
    domain: "Finance",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "People lack daily financial guidance.",
    proposedSolution:
      "Create an app that shows daily finance tips.",
    keyFeatures: [
      "Daily tips",
      "Categories",
      "Admin upload",
      "User-friendly UI",
      "Search",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: Content → Phase 3: Demo",
    tasksText:
      "Add tips, Display content",
    summaryText:
      "A simple finance awareness app.",
    vivaQAText:
      "Q: Why this project? A: To improve money habits.",
    isActive: true,
    createdAt: new Date(),
  },
  // Finance Intermediate – Mini Projects
  {
    _id: 1,
    title: "Expense Analytics Dashboard",
    domain: "Finance",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users track expenses but do not get meaningful insights from raw data.",
    proposedSolution:
      "Build a dashboard that analyzes expenses and shows visual insights.",
    keyFeatures: [
      "Category-wise expense analysis",
      "Monthly comparison charts",
      "Spending trends",
      "User authentication",
      "Dashboard view",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: Analytics logic → Phase 3: Testing",
    tasksText:
      "Store expense data, Generate charts, Display insights",
    summaryText:
      "A finance dashboard that helps users understand spending behavior.",
    vivaQAText:
      "Q: Why analytics? A: To improve financial decision-making.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 2,
    title: "Investment Portfolio Tracker",
    domain: "Finance",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Investors struggle to track multiple investments at one place.",
    proposedSolution:
      "Create a system to manage and monitor investment portfolios.",
    keyFeatures: [
      "Investment entry",
      "Profit/loss calculation",
      "Portfolio summary",
      "Asset categorization",
      "Secure login",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Logic → Phase 3: Testing",
    tasksText:
      "Create portfolio module, Implement calculations, Test data",
    summaryText:
      "A tool to monitor and analyze investment performance.",
    vivaQAText:
      "Q: Why portfolio tracking? A: To monitor investment growth.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 3,
    title: "Loan Management System",
    domain: "Finance",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Managing multiple loans manually is time-consuming and error-prone.",
    proposedSolution:
      "Develop a system to manage loans, EMIs, and repayment schedules.",
    keyFeatures: [
      "Loan record management",
      "EMI schedule",
      "Payment tracking",
      "Outstanding balance",
      "User dashboard",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: Backend → Phase 3: Testing",
    tasksText:
      "Implement EMI logic, Store records, Display schedules",
    summaryText:
      "A digital system for efficient loan management.",
    vivaQAText:
      "Q: What is EMI? A: Monthly loan repayment amount.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 4,
    title: "Subscription Expense Manager",
    domain: "Finance",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users forget active subscriptions and overspend unknowingly.",
    proposedSolution:
      "Build a system to track and manage recurring subscriptions.",
    keyFeatures: [
      "Subscription listing",
      "Renewal reminders",
      "Monthly cost summary",
      "Category grouping",
      "Notifications",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: Reminder logic → Phase 3: Testing",
    tasksText:
      "Create subscription module, Set reminders, Test alerts",
    summaryText:
      "A tool to control recurring financial expenses.",
    vivaQAText:
      "Q: Why manage subscriptions? A: To reduce unnecessary spending.",
    isActive: true,
    createdAt: new Date(),
  },
  // Finance Intermediate – Final Projects
  {
    _id: 5,
    title: "Personal Finance Management System",
    domain: "Finance",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "People use multiple apps for budgeting, savings, and expenses.",
    proposedSolution:
      "Develop an all-in-one personal finance management platform.",
    keyFeatures: [
      "Expense tracking",
      "Budget planning",
      "Savings goals",
      "Financial reports",
      "User dashboard",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Development → Phase 3: Testing",
    tasksText:
      "Integrate modules, Generate reports, Final testing",
    summaryText:
      "A complete solution for managing personal finances.",
    vivaQAText:
      "Q: Why integrated system? A: For better financial control.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 6,
    title: "Online Loan Approval System",
    domain: "Finance",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Manual loan approval processes are slow and inefficient.",
    proposedSolution:
      "Create a digital loan application and approval platform.",
    keyFeatures: [
      "Online loan application",
      "Eligibility check",
      "Admin approval panel",
      "Loan status tracking",
      "Document upload",
    ],
    roadmapText:
      "Phase 1: UI → Phase 2: Backend → Phase 3: Testing",
    tasksText:
      "Build forms, Implement logic, Manage approvals",
    summaryText:
      "A digital solution to simplify loan approvals.",
    vivaQAText:
      "Q: What is eligibility check? A: Loan approval criteria.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 7,
    title: "Stock Portfolio Management System",
    domain: "Finance",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Investors find it hard to monitor stock performance regularly.",
    proposedSolution:
      "Develop a system to manage and analyze stock investments.",
    keyFeatures: [
      "Stock purchase records",
      "Profit/loss calculation",
      "Portfolio summary",
      "Performance analysis",
      "Secure login",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Logic → Phase 3: Testing",
    tasksText:
      "Implement calculations, Store data, Generate reports",
    summaryText:
      "A platform to monitor stock investments efficiently.",
    vivaQAText:
      "Q: Why track stocks? A: To maximize returns.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 8,
    title: "Credit Score Monitoring System",
    domain: "Finance",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users are unaware of factors affecting their credit score.",
    proposedSolution:
      "Create a system to monitor credit score and provide improvement tips.",
    keyFeatures: [
      "Credit score tracking",
      "Loan history analysis",
      "Score improvement tips",
      "User dashboard",
      "Secure data handling",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Logic → Phase 3: Testing",
    tasksText:
      "Analyze data, Display score, Provide insights",
    summaryText:
      "A system to help users understand and improve credit scores.",
    vivaQAText:
      "Q: Why credit score matters? A: For loan approvals.",
    isActive: true,
    createdAt: new Date(),
  },
  // Finance Intermediate – Hackathon Projects
  {
    _id: 9,
    title: "AI-Based Expense Prediction App",
    domain: "Finance",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users cannot predict future expenses based on past spending.",
    proposedSolution:
      "Build an AI-based system to predict upcoming expenses.",
    keyFeatures: [
      "Expense prediction",
      "Spending trend analysis",
      "Visual insights",
      "Alerts",
      "Dashboard",
    ],
    roadmapText:
      "Phase 1: Data analysis → Phase 2: Model → Phase 3: Demo",
    tasksText:
      "Prepare data, Build model, Integrate UI",
    summaryText:
      "An AI-powered expense forecasting solution.",
    vivaQAText:
      "Q: Why prediction? A: For better financial planning.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 10,
    title: "Smart Budget Recommendation System",
    domain: "Finance",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users struggle to decide ideal budget limits.",
    proposedSolution:
      "Create a system that recommends budgets based on income and expenses.",
    keyFeatures: [
      "Income analysis",
      "Smart budget suggestions",
      "Expense tracking",
      "Alerts",
      "Dashboard",
    ],
    roadmapText:
      "Phase 1: Logic → Phase 2: UI → Phase 3: Demo",
    tasksText:
      "Implement recommendation logic, Build UI",
    summaryText:
      "A smart budgeting assistant for users.",
    vivaQAText:
      "Q: Why recommendations? A: For smarter budgeting.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 11,
    title: "Fraud Detection Demo System",
    domain: "Finance",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Financial frauds are increasing due to lack of detection systems.",
    proposedSolution:
      "Build a basic fraud detection system using transaction patterns.",
    keyFeatures: [
      "Transaction analysis",
      "Suspicious activity alerts",
      "Rule-based detection",
      "Admin dashboard",
      "Reports",
    ],
    roadmapText:
      "Phase 1: Rules → Phase 2: Detection logic → Phase 3: Demo",
    tasksText:
      "Define rules, Detect anomalies, Test alerts",
    summaryText:
      "A demo system for detecting suspicious financial activities.",
    vivaQAText:
      "Q: What is fraud detection? A: Identifying abnormal transactions.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 12,
    title: "Digital Wallet Management System",
    domain: "Finance",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Managing multiple digital payments is inconvenient.",
    proposedSolution:
      "Develop a digital wallet system for managing transactions.",
    keyFeatures: [
      "Wallet balance",
      "Transaction history",
      "Secure payments",
      "User authentication",
      "Dashboard",
    ],
    roadmapText:
      "Phase 1: Design → Phase 2: Logic → Phase 3: Demo",
    tasksText:
      "Implement wallet logic, Store transactions",
    summaryText:
      "A simple digital wallet solution.",
    vivaQAText:
      "Q: Why digital wallets? A: For fast and cashless payments.",
    isActive: true,
    createdAt: new Date(),
  },
  // ================= E-COMMERCE (BEGINNER LEVEL) =================
  // Beginner Mini
  {
    _id: 1,
    title: "Simple Product Catalog Website",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Small sellers need a basic way to display products online.",
    proposedSolution:
      "Build a simple website to list products with price and description.",
    keyFeatures: [
      "Product listing",
      "Product details",
      "Simple UI",
      "Responsive design",
    ],
    roadmapText: "UI → Product data → Testing",
    tasksText: "Create pages, Add products, Style UI",
    summaryText: "A basic e-commerce product showcase website.",
    vivaQAText: "Q: Why product catalog? A: To display products digitally.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 2,
    title: "Shopping Cart System",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users need a way to collect items before purchasing.",
    proposedSolution:
      "Create a shopping cart feature for adding and removing items.",
    keyFeatures: [
      "Add to cart",
      "Remove items",
      "Total price calculation",
    ],
    roadmapText: "Logic → UI → Testing",
    tasksText: "Cart logic, UI integration",
    summaryText: "A basic shopping cart for e-commerce sites.",
    vivaQAText: "Q: What is a cart? A: Temporary storage for products.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 3,
    title: "User Registration & Login System",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users need secure access to e-commerce platforms.",
    proposedSolution:
      "Build login and registration functionality.",
    keyFeatures: [
      "User signup",
      "Login",
      "Logout",
      "Validation",
    ],
    roadmapText: "Forms → Authentication → Testing",
    tasksText: "Create forms, Validate users",
    summaryText: "Basic authentication system for e-commerce.",
    vivaQAText: "Q: Why login needed? A: For personalized access.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 4,
    title: "Order Summary Page",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users want to review orders before confirmation.",
    proposedSolution:
      "Develop an order summary page.",
    keyFeatures: [
      "Order details",
      "Total cost",
      "Product list",
    ],
    roadmapText: "UI → Logic → Testing",
    tasksText: "Display order data",
    summaryText: "A simple order review page.",
    vivaQAText: "Q: Why order summary? A: To avoid mistakes.",
    isActive: true,
    createdAt: new Date(),
  },
  // Beginner Final
  {
    _id: 5,
    title: "Basic E-Commerce Website",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Small businesses need an online selling platform.",
    proposedSolution:
      "Create a basic e-commerce website with products and cart.",
    keyFeatures: [
      "Product listing",
      "Cart",
      "User login",
      "Order placement",
    ],
    roadmapText: "Design → Development → Testing",
    tasksText: "Frontend, Cart logic, Orders",
    summaryText: "A beginner-friendly e-commerce website.",
    vivaQAText: "Q: Why e-commerce? A: To sell products online.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 6,
    title: "Online Grocery Store",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Local grocery shops lack online presence.",
    proposedSolution:
      "Build an online grocery ordering system.",
    keyFeatures: [
      "Product categories",
      "Cart",
      "Checkout",
    ],
    roadmapText: "UI → Backend → Testing",
    tasksText: "Create product pages, Orders",
    summaryText: "An online grocery shopping solution.",
    vivaQAText: "Q: Why grocery store? A: Daily use case.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 7,
    title: "Online Book Store",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Book sellers want online sales channels.",
    proposedSolution:
      "Create a book selling website.",
    keyFeatures: [
      "Book listing",
      "Search",
      "Cart",
    ],
    roadmapText: "Design → Logic → Testing",
    tasksText: "Add books, Cart system",
    summaryText: "A simple online bookstore.",
    vivaQAText: "Q: Why books? A: Easy product management.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 8,
    title: "Order Management System",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Manual order handling is inefficient.",
    proposedSolution:
      "Build a basic order management system.",
    keyFeatures: [
      "Order list",
      "Order status",
      "User orders",
    ],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Store orders, Display status",
    summaryText: "A system to manage e-commerce orders.",
    vivaQAText: "Q: What is OMS? A: Order Management System.",
    isActive: true,
    createdAt: new Date(),
  },
  // Beginner Hackathon
  {
    _id: 9,
    title: "Flash Sale Website",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users miss limited-time deals.",
    proposedSolution:
      "Create a flash sale page with timers.",
    keyFeatures: [
      "Countdown timer",
      "Discount display",
    ],
    roadmapText: "UI → Timer → Demo",
    tasksText: "Timer logic, UI",
    summaryText: "A flash sale demo platform.",
    vivaQAText: "Q: Why flash sale? A: Increase sales urgency.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 10,
    title: "Product Comparison Tool",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users struggle to compare products.",
    proposedSolution:
      "Build a product comparison feature.",
    keyFeatures: [
      "Compare prices",
      "Compare features",
    ],
    roadmapText: "Logic → UI → Demo",
    tasksText: "Comparison logic",
    summaryText: "A product comparison tool.",
    vivaQAText: "Q: Why compare? A: Better buying decision.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 11,
    title: "Wishlist Feature",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users want to save products for later.",
    proposedSolution:
      "Create wishlist functionality.",
    keyFeatures: [
      "Add to wishlist",
      "Remove items",
    ],
    roadmapText: "Logic → UI → Demo",
    tasksText: "Wishlist logic",
    summaryText: "A wishlist feature for users.",
    vivaQAText: "Q: Why wishlist? A: Save future purchases.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 12,
    title: "Order Tracking Page",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Customers want order status updates.",
    proposedSolution:
      "Build an order tracking page.",
    keyFeatures: [
      "Order status",
      "Tracking steps",
    ],
    roadmapText: "UI → Logic → Demo",
    tasksText: "Status display",
    summaryText: "A simple order tracking system.",
    vivaQAText: "Q: Why tracking? A: Transparency.",
    isActive: true,
    createdAt: new Date(),
  },
  // ================= E-COMMERCE (INTERMEDIATE LEVEL) =================
  // Intermediate Mini
  {
    _id: 13,
    title: "Dynamic Product Filtering System",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users struggle to find products quickly without filters.",
    proposedSolution:
      "Implement dynamic filters for products by price, category, and rating.",
    keyFeatures: [
      "Category filter",
      "Price range",
      "Rating filter",
      "Real-time update",
    ],
    roadmapText: "UI → Filter logic → Testing",
    tasksText: "Implement filter functions, Integrate UI",
    summaryText: "A dynamic filtering system for better product discovery.",
    vivaQAText: "Q: Why filters? A: To enhance user search experience.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 14,
    title: "Discount & Promo Code System",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Shoppers miss discounts and promotional offers.",
    proposedSolution:
      "Add discount and promo code functionality.",
    keyFeatures: [
      "Apply promo code",
      "Discount calculation",
      "Validation",
    ],
    roadmapText: "Logic → UI → Testing",
    tasksText: "Implement discount rules, Test checkout",
    summaryText: "A system to apply discounts in shopping cart.",
    vivaQAText: "Q: Why promo codes? A: To attract customers.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 15,
    title: "Product Review & Rating System",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users cannot see authentic product feedback.",
    proposedSolution:
      "Build a product review and rating module.",
    keyFeatures: [
      "Submit review",
      "Star rating",
      "View reviews",
    ],
    roadmapText: "UI → Backend → Testing",
    tasksText: "Create review form, Display ratings",
    summaryText: "A module to enable reviews and ratings.",
    vivaQAText: "Q: Why reviews? A: To help user decision.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 16,
    title: "Wishlist with Notifications",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users forget products saved for later.",
    proposedSolution:
      "Add wishlist with email or notification alerts.",
    keyFeatures: [
      "Add/remove wishlist",
      "Alerts on price drop",
    ],
    roadmapText: "UI → Notification → Testing",
    tasksText: "Wishlist logic, Notification setup",
    summaryText: "A wishlist system with reminders.",
    vivaQAText: "Q: Why notifications? A: To retain interest.",
    isActive: true,
    createdAt: new Date(),
  },
  // Intermediate Final
  {
    _id: 17,
    title: "Multi-Vendor E-Commerce Platform",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Small vendors need a shared online marketplace.",
    proposedSolution:
      "Build a platform for multiple vendors to sell products.",
    keyFeatures: [
      "Vendor registration",
      "Product management",
      "Order system",
      "User dashboard",
    ],
    roadmapText: "UI → Vendor module → Order module → Testing",
    tasksText: "Integrate vendor module, Cart, Orders",
    summaryText: "An intermediate multi-vendor e-commerce platform.",
    vivaQAText: "Q: Why multi-vendor? A: To provide marketplace solution.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 18,
    title: "Payment Gateway Integration",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users need secure online payments.",
    proposedSolution:
      "Integrate a payment gateway (like Stripe/PayPal).",
    keyFeatures: [
      "Secure checkout",
      "Payment status",
      "Transaction history",
    ],
    roadmapText: "API Integration → UI → Testing",
    tasksText: "Integrate payment API, Test transactions",
    summaryText: "A platform enabling online payments securely.",
    vivaQAText: "Q: Why gateway? A: To process payments online.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 19,
    title: "Inventory Management System",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Managing stock manually is inefficient.",
    proposedSolution:
      "Develop inventory tracking for products.",
    keyFeatures: [
      "Stock updates",
      "Low-stock alerts",
      "Reports",
    ],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Implement stock logic, Alerts, Reports",
    summaryText: "An inventory management solution.",
    vivaQAText: "Q: Why inventory system? A: To avoid stock issues.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 20,
    title: "Order Tracking & Delivery Status System",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Customers cannot track orders efficiently.",
    proposedSolution:
      "Provide order tracking and delivery updates.",
    keyFeatures: [
      "Real-time tracking",
      "Delivery status",
      "Notifications",
    ],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Implement tracking logic, Notifications",
    summaryText: "A system for tracking orders effectively.",
    vivaQAText: "Q: Why order tracking? A: For transparency and customer satisfaction.",
    isActive: true,
    createdAt: new Date(),
  },
  // Intermediate Hackathon
  {
    _id: 21,
    title: "AI-Based Product Recommendation System",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users cannot discover personalized products easily.",
    proposedSolution:
      "Build AI-based product recommendations.",
    keyFeatures: [
      "AI suggestions",
      "User behavior analysis",
      "Related products",
    ],
    roadmapText: "Data → Model → Integration → Demo",
    tasksText: "Train model, Integrate recommendations",
    summaryText: "A recommendation system for personalized shopping.",
    vivaQAText: "Q: Why recommendations? A: To enhance user experience.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 22,
    title: "Real-Time Deal Notification System",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users miss deals or discounts.",
    proposedSolution:
      "Notify users in real-time about ongoing deals.",
    keyFeatures: [
      "Live alerts",
      "Push notifications",
      "Deal tracking",
    ],
    roadmapText: "Backend → Notifications → Demo",
    tasksText: "Setup alert logic, Test notifications",
    summaryText: "A system for live deal notifications.",
    vivaQAText: "Q: Why live alerts? A: To increase sales conversion.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 23,
    title: "Multi-Currency E-Commerce Demo",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users face currency issues while shopping internationally.",
    proposedSolution:
      "Support multi-currency pricing.",
    keyFeatures: [
      "Currency conversion",
      "Dynamic pricing",
    ],
    roadmapText: "Backend → Frontend → Demo",
    tasksText: "Implement conversion logic",
    summaryText: "A demo supporting multiple currencies.",
    vivaQAText: "Q: Why multi-currency? A: For global usability.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 24,
    title: "Abandoned Cart Reminder System",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Many users abandon carts without purchasing.",
    proposedSolution:
      "Send reminders for abandoned carts via email.",
    keyFeatures: [
      "Cart tracking",
      "Email reminders",
      "Dashboard",
    ],
    roadmapText: "Logic → Email setup → Demo",
    tasksText: "Track carts, Send reminders",
    summaryText: "A system to recover abandoned carts.",
    vivaQAText: "Q: Why reminders? A: To increase sales conversion.",
    isActive: true,
    createdAt: new Date(),
  },
  // ================= E-COMMERCE (ADVANCED LEVEL) =================
  // Advanced Mini
  {
    _id: 25,
    title: "AI-Powered Price Optimization Tool",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Sellers cannot optimize product pricing efficiently.",
    proposedSolution:
      "Use AI to recommend optimal product pricing.",
    keyFeatures: [
      "AI analysis",
      "Dynamic pricing",
      "Sales prediction",
    ],
    roadmapText: "Data → AI Model → Integration",
    tasksText: "Train AI, Generate pricing",
    summaryText: "A tool to optimize product pricing using AI.",
    vivaQAText: "Q: Why price optimization? A: To maximize profit.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 26,
    title: "AI-Based Customer Sentiment Analysis",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Sellers cannot analyze customer feedback effectively.",
    proposedSolution:
      "Analyze customer reviews with AI sentiment analysis.",
    keyFeatures: [
      "Review scraping",
      "Sentiment AI",
      "Dashboard",
    ],
    roadmapText: "Data → Model → UI",
    tasksText: "Train model, Display sentiment",
    summaryText: "Analyze customer feedback using AI.",
    vivaQAText: "Q: Why sentiment analysis? A: To improve products.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 27,
    title: "Smart Inventory Prediction System",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Predicting stock requirements manually is inefficient.",
    proposedSolution:
      "Use AI to forecast inventory demand.",
    keyFeatures: [
      "Demand prediction",
      "Stock alerts",
      "Dashboard",
    ],
    roadmapText: "Data → Model → Integration",
    tasksText: "Train prediction model, Test",
    summaryText: "AI-based stock demand prediction.",
    vivaQAText: "Q: Why forecast stock? A: To reduce shortage/overstock.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 28,
    title: "Chatbot for Customer Support",
    domain: "E-Commerce",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Customers face delays in support queries.",
    proposedSolution:
      "Integrate AI chatbot for instant assistance.",
    keyFeatures: [
      "AI chatbot",
      "FAQ handling",
      "Order tracking",
    ],
    roadmapText: "Bot → Integration → Testing",
    tasksText: "Build bot, Connect to site",
    summaryText: "AI chatbot to handle customer queries.",
    vivaQAText: "Q: Why chatbot? A: To improve support response.",
    isActive: true,
    createdAt: new Date(),
  },
  // Advanced Final
  {
    _id: 29,
    title: "Full-Scale Multi-Vendor E-Commerce with Analytics",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Vendors need insights to improve sales performance.",
    proposedSolution:
      "Multi-vendor platform with integrated analytics.",
    keyFeatures: [
      "Vendor dashboard",
      "Sales analytics",
      "Product management",
      "Orders",
    ],
    roadmapText: "Vendor module → Analytics → Testing",
    tasksText: "Build vendor dashboard, Analytics charts",
    summaryText: "Advanced multi-vendor e-commerce with insights.",
    vivaQAText: "Q: Why analytics? A: To optimize sales.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 30,
    title: "AI-Based Personalized Product Recommendations",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Users need tailored product suggestions.",
    proposedSolution:
      "AI generates personalized product recommendations.",
    keyFeatures: [
      "User profiling",
      "AI recommendations",
      "Dynamic dashboard",
    ],
    roadmapText: "Data → AI → Integration",
    tasksText: "Train model, Integrate recommendations",
    summaryText: "Advanced personalized product suggestions using AI.",
    vivaQAText: "Q: Why personalized? A: To improve user engagement.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 31,
    title: "Blockchain-Based Secure E-Commerce Payments",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Payment fraud and security concerns in e-commerce.",
    proposedSolution:
      "Use blockchain for secure payment processing.",
    keyFeatures: [
      "Blockchain ledger",
      "Secure payments",
      "Transaction logs",
    ],
    roadmapText: "Blockchain → Integration → Testing",
    tasksText: "Implement blockchain, Integrate checkout",
    summaryText: "Secure payments using blockchain technology.",
    vivaQAText: "Q: Why blockchain? A: For security and transparency.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 32,
    title: "AI-Powered Dynamic Pricing & Offers System",
    domain: "E-Commerce",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Sellers cannot adjust prices dynamically based on demand.",
    proposedSolution:
      "AI analyzes demand and sets optimal pricing/offers.",
    keyFeatures: [
      "Dynamic pricing",
      "Demand analysis",
      "Offer suggestions",
    ],
    roadmapText: "Data → AI → Integration",
    tasksText: "Train model, Integrate pricing system",
    summaryText: "AI-based dynamic pricing for e-commerce.",
    vivaQAText: "Q: Why dynamic pricing? A: To maximize revenue.",
    isActive: true,
    createdAt: new Date(),
  },
  // Advanced Hackathon
  {
    _id: 33,
    title: "AI-Based Fraud Detection in E-Commerce",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "E-commerce frauds are hard to detect manually.",
    proposedSolution:
      "Use AI to detect suspicious transactions.",
    keyFeatures: [
      "Transaction analysis",
      "Anomaly detection",
      "Alerts",
    ],
    roadmapText: "Data → AI → Integration → Demo",
    tasksText: "Train model, Test fraud detection",
    summaryText: "AI system for fraud detection in e-commerce.",
    vivaQAText: "Q: Why fraud detection? A: To prevent losses.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 34,
    title: "AI-Based Customer Churn Prediction",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Sellers cannot predict which customers may leave.",
    proposedSolution:
      "AI predicts potential churn and retention suggestions.",
    keyFeatures: [
      "Churn prediction",
      "Retention alerts",
      "Dashboard",
    ],
    roadmapText: "Data → Model → Demo",
    tasksText: "Train model, Display alerts",
    summaryText: "Predict customers at risk of leaving the platform.",
    vivaQAText: "Q: Why churn prediction? A: To retain users.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 35,
    title: "Real-Time E-Commerce Analytics Dashboard",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Sellers cannot monitor real-time sales effectively.",
    proposedSolution:
      "Build dashboard for live analytics (sales, users, revenue).",
    keyFeatures: [
      "Live data",
      "Charts",
      "Real-time updates",
    ],
    roadmapText: "Data → Dashboard → Demo",
    tasksText: "Integrate live data, Build charts",
    summaryText: "Dashboard showing live e-commerce metrics.",
    vivaQAText: "Q: Why live analytics? A: To make quick decisions.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 36,
    title: "AI-Powered Personalized Marketing System",
    domain: "E-Commerce",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Marketing is generic, not personalized.",
    proposedSolution:
      "AI analyzes users and sends personalized campaigns.",
    keyFeatures: [
      "User behavior analysis",
      "AI campaigns",
      "Recommendations",
    ],
    roadmapText: "Data → AI → Integration → Demo",
    tasksText: "Train AI, Setup campaign logic",
    summaryText: "AI-driven personalized marketing for e-commerce.",
    vivaQAText: "Q: Why personalized marketing? A: To improve conversions.",
    isActive: true,
    createdAt: new Date(),
  },
  // ================= BANKING (BEGINNER LEVEL) =================
  // Beginner Mini
  {
    _id: 1,
    title: "Simple Account Management System",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users cannot keep track of basic account details manually.",
    proposedSolution:
      "Create a simple system to view account balance and details.",
    keyFeatures: ["View balance", "Account info", "User login", "Simple UI"],
    roadmapText: "UI → Backend → Testing",
    tasksText: "Create pages, Add user data, Display balance",
    summaryText: "A basic banking account management system.",
    vivaQAText: "Q: Why account management? A: To view user bank info.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 2,
    title: "Basic Deposit & Withdrawal System",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users struggle to record deposits and withdrawals manually.",
    proposedSolution:
      "Build deposit and withdrawal functionality with balance update.",
    keyFeatures: ["Deposit money", "Withdraw money", "Balance update"],
    roadmapText: "UI → Logic → Testing",
    tasksText: "Implement transaction logic, Update balance",
    summaryText: "A simple deposit & withdrawal system.",
    vivaQAText: "Q: Why deposit/withdrawal system? A: To track money flow.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 3,
    title: "User Registration & Login",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users need secure login to access bank info.",
    proposedSolution:
      "Create login and registration forms for users.",
    keyFeatures: ["User signup", "Login", "Logout", "Validation"],
    roadmapText: "Forms → Authentication → Testing",
    tasksText: "Create forms, Validate users",
    summaryText: "A basic banking authentication system.",
    vivaQAText: "Q: Why login needed? A: For secure account access.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 4,
    title: "Mini Transaction History",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users cannot view past transactions easily.",
    proposedSolution:
      "Develop a page to display recent transactions.",
    keyFeatures: ["View transactions", "Date & amount", "Simple UI"],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Display transaction data",
    summaryText: "A simple transaction history feature.",
    vivaQAText: "Q: Why transaction history? A: To track money movement.",
    isActive: true,
    createdAt: new Date(),
  },
  // Beginner Final
  {
    _id: 5,
    title: "Basic Online Banking System",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Customers cannot access banking services online.",
    proposedSolution:
      "Create an online banking website with basic features.",
    keyFeatures: ["Account management", "Transaction", "User login", "Balance check"],
    roadmapText: "UI → Backend → Testing",
    tasksText: "Implement accounts, Transactions, UI",
    summaryText: "A beginner-friendly online banking system.",
    vivaQAText: "Q: Why online banking? A: To provide convenience.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 6,
    title: "Simple Fund Transfer System",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Manual fund transfer is time-consuming.",
    proposedSolution:
      "Implement a system to transfer funds between accounts.",
    keyFeatures: ["Transfer money", "Update balances", "Confirmation message"],
    roadmapText: "Logic → UI → Testing",
    tasksText: "Transfer logic, Update balances, Test",
    summaryText: "A basic fund transfer system.",
    vivaQAText: "Q: Why fund transfer? A: To move money between accounts.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 7,
    title: "Mini Loan Calculator",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Customers cannot calculate EMI manually.",
    proposedSolution:
      "Create a loan calculator for principal, interest, and duration.",
    keyFeatures: ["EMI calculation", "Interest input", "Principal input"],
    roadmapText: "Logic → UI → Testing",
    tasksText: "Implement EMI formula, Display results",
    summaryText: "A beginner-friendly loan calculator.",
    vivaQAText: "Q: Why loan calculator? A: To compute EMI easily.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 8,
    title: "Mini Savings Tracker",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users cannot track savings effectively.",
    proposedSolution:
      "Develop a basic savings tracker system.",
    keyFeatures: ["Add savings", "View total", "Simple UI"],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Add savings logic, Display totals",
    summaryText: "A simple savings tracking system.",
    vivaQAText: "Q: Why savings tracker? A: To monitor savings progress.",
    isActive: true,
    createdAt: new Date(),
  },
  // Beginner Hackathon
  {
    _id: 9,
    title: "Quick Balance Checker",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users want instant balance check.",
    proposedSolution:
      "Develop a quick balance checking page.",
    keyFeatures: ["Instant balance", "User authentication", "Simple UI"],
    roadmapText: "Backend → UI → Demo",
    tasksText: "Display balance after login",
    summaryText: "A quick balance checker for users.",
    vivaQAText: "Q: Why balance check? A: For instant info.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 10,
    title: "Mini Transaction Alert System",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users cannot track transactions in real-time.",
    proposedSolution:
      "Send email alerts for each transaction.",
    keyFeatures: ["Email alerts", "Transaction info"],
    roadmapText: "Backend → Email → Demo",
    tasksText: "Send alerts on transactions",
    summaryText: "A basic transaction alert system.",
    vivaQAText: "Q: Why alerts? A: To notify users immediately.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 11,
    title: "Mini ATM Simulation",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users cannot practice ATM operations online.",
      
    proposedSolution:
      "Simulate ATM deposit, withdrawal, and balance check.",
    keyFeatures: ["Deposit", "Withdraw", "Check balance"],
    roadmapText: "Logic → UI → Demo",
    tasksText: "Implement ATM logic",
    summaryText: "A beginner-friendly ATM simulator.",
    vivaQAText: "Q: Why ATM simulator? A: To practice operations safely.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 12,
    title: "Mini Account Statement Generator",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Users cannot get mini statements quickly.",
    proposedSolution:
      "Generate mini account statements with last 5 transactions.",
    keyFeatures: ["Last 5 transactions", "Print option"],
    roadmapText: "Backend → UI → Demo",
    tasksText: "Fetch transactions, Display statement",
    summaryText: "A mini account statement feature.",
    vivaQAText: "Q: Why statement? A: To check recent activity.",
    isActive: true,
    createdAt: new Date(),
  },
  // ================= BANKING (INTERMEDIATE LEVEL) =================
  // Intermediate Mini
  {
    _id: 13,
    title: "Fund Transfer with Validation",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users often enter incorrect account numbers while transferring funds.",
    proposedSolution:
      "Add validation and confirmation before processing transfers.",
    keyFeatures: ["Account validation", "OTP confirmation", "Transfer history"],
    roadmapText: "Logic → UI → Testing",
    tasksText: "Implement validation, OTP, Record transactions",
    summaryText: "A secure fund transfer system with validations.",
    vivaQAText: "Q: Why validation? A: To avoid errors and fraud.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 14,
    title: "Loan EMI & Interest Management",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Manual calculation of loan EMIs is inefficient.",
    proposedSolution:
      "Build system to calculate EMI and track interest.",
    keyFeatures: ["EMI calculator", "Interest tracking", "Schedule"],
    roadmapText: "Logic → UI → Testing",
    tasksText: "EMI formula, UI integration",
    summaryText: "An intermediate loan management system.",
    vivaQAText: "Q: Why EMI tracking? A: To help users plan payments.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 15,
    title: "Mini KYC Verification System",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Banks need a digital way to verify user identity.",
    proposedSolution:
      "Implement a simple KYC form and verification module.",
    keyFeatures: ["Upload documents", "Verify identity", "Approval status"],
    roadmapText: "Form → Backend → Testing",
    tasksText: "Create KYC form, Implement verification logic",
    summaryText: "A basic KYC verification system.",
    vivaQAText: "Q: Why KYC? A: To ensure user authenticity.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 16,
    title: "Savings Goal Tracker",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users cannot monitor savings goals efficiently.",
    proposedSolution:
      "Build a tracker to set goals and monitor progress.",
    keyFeatures: ["Set target", "Track progress", "Alerts on milestones"],
    roadmapText: "UI → Logic → Testing",
    tasksText: "Goal input, Progress tracker",
    summaryText: "A savings goal management system.",
    vivaQAText: "Q: Why goal tracker? A: To motivate saving habits.",
    isActive: true,
    createdAt: new Date(),
  },
  // Intermediate Final
  {
    _id: 17,
    title: "Advanced Online Banking System",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Customers need secure and complete online banking features.",
    proposedSolution:
      "Create full online banking platform with accounts, transfers, and statements.",
    keyFeatures: [
      "Account management",
      "Fund transfer",
      "Transaction history",
      "User dashboard",
    ],
    roadmapText: "UI → Backend → Security → Testing",
    tasksText: "Build accounts, Transactions, Dashboard",
    summaryText: "An intermediate online banking platform.",
    vivaQAText: "Q: Why advanced system? A: To provide full banking services online.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 18,
    title: "Integrated Loan Management System",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Banks need to manage multiple loans efficiently.",
    proposedSolution:
      "Develop a system to calculate EMI, interest, and manage loan records.",
    keyFeatures: ["Loan calculator", "EMI schedule", "Loan history", "Notifications"],
    roadmapText: "Logic → UI → Backend → Testing",
    tasksText: "Calculate EMIs, Manage loan data, Notifications",
    summaryText: "A system for comprehensive loan management.",
    vivaQAText: "Q: Why loan system? A: To track and manage loans digitally.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 19,
    title: "Online Fund Transfer with Notifications",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users need confirmation after transactions.",
    proposedSolution:
      "Integrate transfer module with email/SMS notifications.",
    keyFeatures: ["Secure transfer", "Email/SMS alerts", "Transaction history"],
    roadmapText: "Backend → Notifications → Testing",
    tasksText: "Implement transfer, Notification system",
    summaryText: "An online fund transfer system with notifications.",
    vivaQAText: "Q: Why notifications? A: To confirm transaction success.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 20,
    title: "Customer Dashboard & Analytics",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Customers cannot see spending patterns easily.",
    proposedSolution:
      "Build a dashboard showing account summary and analytics.",
    keyFeatures: ["Transaction analytics", "Spending charts", "Balance summary"],
    roadmapText: "Backend → UI → Charts → Testing",
    tasksText: "Fetch data, Display analytics",
    summaryText: "A dashboard for customer financial insights.",
    vivaQAText: "Q: Why dashboard? A: To monitor finances effectively.",
    isActive: true,
    createdAt: new Date(),
  },
  // Intermediate Hackathon
  {
    _id: 21,
    title: "AI-Based Fraud Detection",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Banks struggle to detect fraudulent transactions in time.",
    proposedSolution:
      "Use AI to flag suspicious transactions.",
    keyFeatures: ["Transaction monitoring", "Anomaly detection", "Alerts"],
    roadmapText: "Data → AI → Demo",
    tasksText: "Train AI, Integrate alerts",
    summaryText: "AI system to detect banking frauds.",
    vivaQAText: "Q: Why fraud detection? A: To secure user transactions.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 22,
    title: "Mini Credit Score Analyzer",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users cannot assess their credit score easily.",
    proposedSolution:
      "Provide a simple tool to analyze credit score based on transactions.",
    keyFeatures: ["Analyze transactions", "Generate score", "Provide tips"],
    roadmapText: "Logic → UI → Demo",
    tasksText: "Analyze data, Display score",
    summaryText: "A tool to check creditworthiness.",
    vivaQAText: "Q: Why credit score? A: To guide user financial decisions.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 23,
    title: "Digital Loan Eligibility Checker",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Users cannot know loan eligibility quickly.",
    proposedSolution:
      "Build a calculator to check eligibility instantly.",
    keyFeatures: ["Input data", "Eligibility calculation", "Result display"],
    roadmapText: "Logic → UI → Demo",
    tasksText: "Implement rules, Show result",
    summaryText: "Quick loan eligibility tool.",
    vivaQAText: "Q: Why eligibility checker? A: To guide loan applications.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 24,
    title: "Automated Mini Statement Generator",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Customers cannot get mini statements quickly.",
    proposedSolution:
      "Automatically generate mini statements with recent transactions.",
    keyFeatures: ["Last 5 transactions", "Download/Print option"],
    roadmapText: "Backend → UI → Demo",
    tasksText: "Fetch transactions, Display statement",
    summaryText: "Mini statement generator for users.",
    vivaQAText: "Q: Why mini statement? A: To check recent activity.",
    isActive: true,
    createdAt: new Date(),
  },
  // ================= BANKING (ADVANCED LEVEL) =================
  // Advanced Mini
  {
    _id: 25,
    title: "AI-Based Personalized Banking Assistant",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Users need smart banking advice for decisions.",
    proposedSolution:
      "Develop AI assistant to give financial tips and reminders.",
    keyFeatures: ["AI chat", "Transaction suggestions", "Alerts"],
    roadmapText: "AI → UI → Testing",
    tasksText: "Train assistant, Integrate UI",
    summaryText: "AI assistant for personalized banking support.",
    vivaQAText: "Q: Why AI assistant? A: To guide customers smartly.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 26,
    title: "AI-Powered Loan Approval Prediction",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Banks need quick loan approval assessment.",
    proposedSolution:
      "Use AI to predict loan approval chances based on data.",
    keyFeatures: ["Predict approval", "Data analysis", "Dashboard"],
    roadmapText: "Data → AI → Integration",
    tasksText: "Train model, Test predictions",
    summaryText: "AI predicts loan approval likelihood.",
    vivaQAText: "Q: Why AI approval? A: To speed up decision-making.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 27,
    title: "Smart Investment Recommendation System",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Users cannot get personalized investment advice.",
    proposedSolution:
      "AI recommends suitable investment options.",
    keyFeatures: ["User profile analysis", "AI suggestions", "Dashboard"],
    roadmapText: "AI → Backend → UI",
    tasksText: "Train AI, Display recommendations",
    summaryText: "AI-based investment recommendation system.",
    vivaQAText: "Q: Why AI investments? A: To guide financial growth.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 28,
    title: "Predictive Expense Tracker",
    domain: "Banking",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Users cannot predict future expenses accurately.",
    proposedSolution:
      "Use AI to forecast expenses and suggest budgeting.",
    keyFeatures: ["Expense prediction", "Budget alerts", "Charts"],
    roadmapText: "Data → Model → UI",
    tasksText: "Train model, Display predictions",
    summaryText: "AI-powered expense forecasting tool.",
    vivaQAText: "Q: Why predictive tracking? A: To improve financial planning.",
    isActive: true,
    createdAt: new Date(),
  },
  // Advanced Final
  {
    _id: 29,
    title: "Full-Scale Online Banking with Analytics",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Banks need real-time analytics for customer accounts.",
    proposedSolution:
      "Build platform with analytics, accounts, transfers, and loans.",
    keyFeatures: ["Account dashboard", "Transfer module", "Loan management", "Analytics charts"],
    roadmapText: "UI → Backend → Analytics → Testing",
    tasksText: "Integrate modules, Build analytics",
    summaryText: "Advanced banking system with insights.",
    vivaQAText: "Q: Why analytics? A: To monitor operations effectively.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 30,
    title: "AI-Based Credit Risk Assessment",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Banks cannot assess credit risk efficiently.",
    proposedSolution:
      "Use AI to evaluate customer creditworthiness.",
    keyFeatures: ["AI scoring", "Risk dashboard", "Alerts"],
    roadmapText: "Data → AI → Integration",
    tasksText: "Train AI, Display risk",
    summaryText: "AI system for credit risk analysis.",
    vivaQAText: "Q: Why credit risk? A: To prevent loan defaults.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 31,
    title: "Blockchain-Based Secure Banking Transactions",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Transactions need higher security and transparency.",
    proposedSolution:
      "Use blockchain for secure banking operations.",
    keyFeatures: ["Blockchain ledger", "Transaction security", "Audit trail"],
    roadmapText: "Blockchain → Integration → Testing",
    tasksText: "Implement blockchain, Integrate transactions",
    summaryText: "Secure banking system using blockchain.",
    vivaQAText: "Q: Why blockchain? A: To ensure security and transparency.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 32,
    title: "AI-Powered Personalized Banking Dashboard",
    domain: "Banking",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Users cannot get insights and tips on their finances easily.",
    proposedSolution:
      "Dashboard with AI suggestions for savings, spending, and investments.",
    keyFeatures: ["AI insights", "Spending analysis", "Savings tips", "Charts"],
    roadmapText: "Data → AI → Dashboard",
    tasksText: "Train AI, Integrate dashboard",
    summaryText: "Personalized banking dashboard with AI insights.",
    vivaQAText: "Q: Why AI dashboard? A: To guide users for better financial decisions.",
    isActive: true,
    createdAt: new Date(),
  },
  // Advanced Hackathon
  {
    _id: 33,
    title: "AI-Based Fraud Prevention System",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Banks need proactive fraud detection.",
    proposedSolution:
      "Real-time AI fraud detection system.",
    keyFeatures: ["Transaction monitoring", "Anomaly detection", "Alerts", "Dashboard"],
    roadmapText: "Data → AI → Integration → Demo",
    tasksText: "Train model, Integrate system",
    summaryText: "AI-powered banking fraud prevention.",
    vivaQAText: "Q: Why fraud AI? A: To prevent financial losses.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 34,
    title: "Predictive Loan Default System",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Banks cannot predict default risk quickly.",
    proposedSolution:
      "Use AI to predict potential loan defaulters.",
    keyFeatures: ["Default prediction", "Alerts", "Dashboard"],
    roadmapText: "Data → AI → Demo",
    tasksText: "Train AI, Display alerts",
    summaryText: "Predict loan defaults proactively.",
    vivaQAText: "Q: Why predictive system? A: To minimize risk.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 35,
    title: "Smart Investment & Portfolio Manager",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Users cannot manage investments efficiently.",
    proposedSolution:
      "AI-based portfolio and investment management system.",
    keyFeatures: ["AI recommendations", "Portfolio analysis", "Dashboard"],
    roadmapText: "AI → Backend → Demo",
    tasksText: "Train AI, Integrate portfolio dashboard",
    summaryText: "Manage investments intelligently using AI.",
    vivaQAText: "Q: Why portfolio manager? A: To optimize investments.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 36,
    title: "Real-Time Banking Analytics & Insights",
    domain: "Banking",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Banks cannot monitor real-time operations effectively.",
    proposedSolution:
      "Live analytics dashboard for banking operations.",
    keyFeatures: ["Real-time data", "Charts & Graphs", "Alerts", "User insights"],
    roadmapText: "Backend → Analytics → Demo",
    tasksText: "Fetch live data, Display dashboard",
    summaryText: "Live analytics system for banking operations.",
    vivaQAText: "Q: Why real-time analytics? A: For fast and informed decisions.",
    isActive: true,
    createdAt: new Date(),
  },
  // ================= BUSINESS (BEGINNER LEVEL) =================
  // Beginner Mini
  {
    _id: 1,
    title: "Simple Business Expense Tracker",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Small businesses struggle to track daily expenses manually.",
    proposedSolution:
      "Develop a system to log and view expenses easily.",
    keyFeatures: ["Add expense", "View history", "Category tracking"],
    roadmapText: "UI → Backend → Testing",
    tasksText: "Create expense form, Display expense list",
    summaryText: "A basic tool to track business expenses.",
    vivaQAText: "Q: Why expense tracker? A: To manage business spending.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 2,
    title: "Basic Invoice Generator",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Generating invoices manually is inefficient.",
    proposedSolution:
      "Create a simple system to generate invoices for clients.",
    keyFeatures: ["Generate invoice", "Print/Download", "Client info"],
    roadmapText: "UI → Logic → Testing",
    tasksText: "Invoice form, Generate PDF, Test printing",
    summaryText: "A simple invoice creation tool.",
    vivaQAText: "Q: Why invoice generator? A: To simplify billing.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 3,
    title: "Client Contact Management",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Business owners cannot maintain client contacts efficiently.",
    proposedSolution:
      "Develop a system to save and manage client information.",
    keyFeatures: ["Add client", "View clients", "Edit/Delete client info"],
    roadmapText: "UI → Backend → Testing",
    tasksText: "Create client forms, Display contacts",
    summaryText: "A basic client contact management system.",
    vivaQAText: "Q: Why client management? A: To maintain business contacts.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 4,
    title: "Mini Sales Tracker",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Tracking sales manually is time-consuming.",
    proposedSolution:
      "Create a simple sales tracker to record daily sales.",
    keyFeatures: ["Add sales", "View daily sales", "Category-wise tracking"],
    roadmapText: "UI → Backend → Testing",
    tasksText: "Implement sales form, Display sales list",
    summaryText: "A beginner-friendly sales tracking tool.",
    vivaQAText: "Q: Why sales tracker? A: To monitor revenue easily.",
    isActive: true,
    createdAt: new Date(),
  },
  // Beginner Final
  {
    _id: 5,
    title: "Basic Business Management System",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Small businesses lack simple software to manage operations.",
    proposedSolution:
      "Develop a system to manage clients, sales, and expenses.",
    keyFeatures: ["Client management", "Sales tracking", "Expense tracking", "Reports"],
    roadmapText: "UI → Backend → Testing",
    tasksText: "Integrate modules, Create dashboard",
    summaryText: "A beginner-level business management software.",
    vivaQAText: "Q: Why business management? A: To streamline small business operations.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 6,
    title: "Mini Inventory System",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Tracking inventory manually is error-prone.",
    proposedSolution:
      "Create a simple inventory management system.",
    keyFeatures: ["Add items", "View stock", "Update/Delete items"],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Implement inventory forms, Display stock",
    summaryText: "A beginner-friendly inventory tracker.",
    vivaQAText: "Q: Why inventory system? A: To manage stock efficiently.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 7,
    title: "Mini Business Report Generator",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Manual report generation is slow for small businesses.",
    proposedSolution:
      "Generate simple monthly/weekly reports automatically.",
    keyFeatures: ["Generate reports", "Download PDF", "Charts"],
    roadmapText: "Backend → Logic → Testing",
    tasksText: "Collect data, Generate PDF/Charts",
    summaryText: "A basic reporting tool for business data.",
    vivaQAText: "Q: Why report generator? A: To save time on manual reports.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 8,
    title: "Mini Task Management for Employees",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Businesses struggle to assign and track employee tasks.",
    proposedSolution:
      "Create a system to assign tasks and monitor completion.",
    keyFeatures: ["Assign tasks", "Task status", "Employee list"],
    roadmapText: "UI → Backend → Testing",
    tasksText: "Create task forms, Track status",
    summaryText: "A simple task management tool for small teams.",
    vivaQAText: "Q: Why task management? A: To track employee work easily.",
    isActive: true,
    createdAt: new Date(),
  },
  // Beginner Hackathon
  {
    _id: 9,
    title: "Quick Expense Summary Dashboard",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Businesses need instant view of expenses.",
    proposedSolution:
      "Show dashboard with summarized expenses and charts.",
    keyFeatures: ["Expense summary", "Charts", "Recent expenses"],
    roadmapText: "Backend → UI → Demo",
    tasksText: "Summarize data, Display charts",
    summaryText: "A quick dashboard for expense overview.",
    vivaQAText: "Q: Why dashboard? A: To get quick expense insights.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 10,
    title: "Mini Invoice Alert System",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Businesses forget to send invoices on time.",
    proposedSolution:
      "Send automatic alerts for pending invoices.",
    keyFeatures: ["Invoice alerts", "Email notification"],
    roadmapText: "Backend → Alerts → Demo",
    tasksText: "Implement alert system",
    summaryText: "A simple invoice reminder tool.",
    vivaQAText: "Q: Why alerts? A: To avoid late invoicing.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 11,
    title: "Mini Client Feedback System",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Businesses cannot collect feedback easily.",
    proposedSolution:
      "Create a simple feedback form for clients.",
    keyFeatures: ["Collect feedback", "View responses", "Simple UI"],
    roadmapText: "UI → Backend → Demo",
    tasksText: "Create form, Save responses",
    summaryText: "A beginner-friendly feedback collection tool.",
    vivaQAText: "Q: Why feedback system? A: To improve services.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 12,
    title: "Mini Sales Alert System",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["beginner"],
    problemStatement:
      "Businesses need to know sales updates quickly.",
    proposedSolution:
      "Send instant notifications when a sale occurs.",
    keyFeatures: ["Sale alerts", "Email/Notification"],
    roadmapText: "Backend → Alerts → Demo",
    tasksText: "Trigger alert on sale",
    summaryText: "A sales notification system.",
    vivaQAText: "Q: Why sales alerts? A: To stay updated instantly.",
    isActive: true,
    createdAt: new Date(),
  },
  // ================= BUSINESS (INTERMEDIATE LEVEL) =================
  // Intermediate Mini
  {
    _id: 13,
    title: "Advanced Expense Tracker",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses need better tracking of multiple expense categories.",
    proposedSolution:
      "Create system to categorize, track, and summarize expenses.",
    keyFeatures: ["Category-wise tracking", "Charts", "Export data"],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Add categories, Track data, Display charts",
    summaryText: "Intermediate expense management tool.",
    vivaQAText: "Q: Why advanced tracker? A: To organize expenses better.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 14,
    title: "Client Relationship Management (CRM) Mini",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses cannot track clients interactions efficiently.",
    proposedSolution:
      "Develop mini CRM system to log interactions and follow-ups.",
    keyFeatures: ["Client database", "Interaction logs", "Follow-up reminders"],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Create client DB, Log interactions",
    summaryText: "A mini CRM for small businesses.",
    vivaQAText: "Q: Why CRM? A: To maintain client relations.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 15,
    title: "Mini Inventory Analytics",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses cannot analyze inventory effectively.",
    proposedSolution:
      "Add analytics and charts for inventory management.",
    keyFeatures: ["Stock analysis", "Charts", "Low stock alerts"],
    roadmapText: "Backend → Analytics → UI",
    tasksText: "Generate charts, Implement alerts",
    summaryText: "Intermediate inventory management tool.",
    vivaQAText: "Q: Why analytics? A: To optimize inventory.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 16,
    title: "Task & Project Tracker",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Teams cannot track tasks & project progress efficiently.",
    proposedSolution:
      "System to assign, track, and report progress of tasks.",
    keyFeatures: ["Task assignment", "Progress tracking", "Reports"],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Assign tasks, Track progress, Generate reports",
    summaryText: "Intermediate task management tool.",
    vivaQAText: "Q: Why tracker? A: To monitor project progress.",
    isActive: true,
    createdAt: new Date(),
  },
  // Intermediate Final
  {
    _id: 17,
    title: "Full Business Management System",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses lack an integrated system for operations.",
    proposedSolution:
      "Combine sales, clients, expenses, and reports in one system.",
    keyFeatures: ["Sales module", "Expense module", "Client management", "Reports"],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Integrate modules, Test system",
    summaryText: "Intermediate-level business management software.",
    vivaQAText: "Q: Why integrated system? A: To manage all business functions together.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 18,
    title: "Mini Business Analytics",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses cannot analyze performance easily.",
    proposedSolution:
      "Add charts, dashboards, and summary reports.",
    keyFeatures: ["Sales analytics", "Expense analytics", "Charts", "Reports"],
    roadmapText: "Backend → UI → Analytics",
    tasksText: "Collect data, Generate dashboards",
    summaryText: "Business analytics system.",
    vivaQAText: "Q: Why analytics? A: To monitor performance.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 19,
    title: "CRM & Feedback System",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses cannot manage client feedback efficiently.",
    proposedSolution:
      "CRM system integrated with client feedback collection.",
    keyFeatures: ["Client database", "Feedback form", "Reports"],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Manage clients, Collect feedback",
    summaryText: "CRM with feedback tracking.",
    vivaQAText: "Q: Why CRM with feedback? A: To improve client relations.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 20,
    title: "Inventory & Sales Dashboard",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses need a single dashboard for stock and sales.",
    proposedSolution:
      "Integrate inventory and sales data into dashboard.",
    keyFeatures: ["Stock overview", "Sales analytics", "Charts", "Reports"],
    roadmapText: "Backend → UI → Testing",
    tasksText: "Fetch inventory & sales, Display charts",
    summaryText: "Dashboard for stock and sales analytics.",
    vivaQAText: "Q: Why dashboard? A: To monitor inventory and sales easily.",
    isActive: true,
    createdAt: new Date(),
  },
  // Intermediate Hackathon
  {
    _id: 21,
    title: "AI-Powered Sales Predictor",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses cannot predict future sales accurately.",
    proposedSolution:
      "Use AI to forecast sales trends.",
    keyFeatures: ["Sales prediction", "Charts", "Alerts"],
    roadmapText: "Data → AI → Demo",
    tasksText: "Train AI, Display predictions",
    summaryText: "AI-based sales prediction tool.",
    vivaQAText: "Q: Why sales predictor? A: To plan inventory and resources.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 22,
    title: "Client Retention Analyzer",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses cannot identify at-risk clients.",
    proposedSolution:
      "Analyze client activity and generate retention insights.",
    keyFeatures: ["Client analysis", "Retention score", "Alerts"],
    roadmapText: "Data → Logic → Demo",
    tasksText: "Analyze client data, Generate insights",
    summaryText: "Tool to monitor client retention.",
    vivaQAText: "Q: Why retention analyzer? A: To improve client loyalty.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 23,
    title: "Expense Optimization Suggestion Tool",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses cannot optimize expenses effectively.",
    proposedSolution:
      "AI suggests areas to reduce costs.",
    keyFeatures: ["Expense analysis", "AI suggestions", "Dashboard"],
    roadmapText: "Data → AI → Demo",
    tasksText: "Analyze expenses, Generate suggestions",
    summaryText: "AI-powered cost optimization tool.",
    vivaQAText: "Q: Why expense optimizer? A: To save money efficiently.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 24,
    title: "Quick Business Insights Dashboard",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["intermediate"],
    problemStatement:
      "Businesses need instant insights.",
    proposedSolution:
      "Generate live dashboard showing sales, expenses, and clients.",
    keyFeatures: ["Live dashboard", "Charts", "Reports"],
    roadmapText: "Backend → UI → Demo",
    tasksText: "Fetch data, Display dashboard",
    summaryText: "Real-time insights for businesses.",
    vivaQAText: "Q: Why dashboard? A: To make quick decisions.",
    isActive: true,
    createdAt: new Date(),
  },
  // ================= BUSINESS (ADVANCED LEVEL) =================
  // Advanced Mini
  {
    _id: 25,
    title: "AI-Based Business Forecasting",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses cannot predict future trends efficiently.",
    proposedSolution:
      "Use AI to forecast revenue, sales, and customer trends.",
    keyFeatures: ["Revenue forecast", "Customer trends", "Charts"],
    roadmapText: "Data → AI → UI",
    tasksText: "Train model, Display forecast",
    summaryText: "AI-powered business forecasting tool.",
    vivaQAText: "Q: Why forecasting? A: To make informed business decisions.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 26,
    title: "AI-Powered Marketing Suggestion Tool",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses struggle to plan marketing strategies.",
    proposedSolution:
      "AI recommends marketing campaigns based on data.",
    keyFeatures: ["Analyze data", "Campaign suggestions", "Dashboard"],
    roadmapText: "Data → AI → UI",
    tasksText: "Train AI, Show suggestions",
    summaryText: "AI marketing assistant for small businesses.",
    vivaQAText: "Q: Why AI marketing? A: To improve ROI.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 27,
    title: "AI-Based Client Behavior Analysis",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses cannot understand client behavior efficiently.",
    proposedSolution:
      "AI predicts client preferences and actions.",
    keyFeatures: ["Client data analysis", "AI predictions", "Dashboard"],
    roadmapText: "Data → AI → UI",
    tasksText: "Train AI, Display predictions",
    summaryText: "AI-driven client behavior tool.",
    vivaQAText: "Q: Why client analysis? A: To improve services and sales.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 28,
    title: "AI-Based Financial Planning Assistant",
    domain: "Business",
    type: "Mini Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses cannot plan budgets effectively.",
    proposedSolution:
      "AI suggests budget allocations and expense optimizations.",
    keyFeatures: ["Budget forecast", "Expense suggestions", "Dashboard"],
    roadmapText: "Data → AI → UI",
    tasksText: "Train AI, Generate recommendations",
    summaryText: "AI-based budgeting assistant.",
    vivaQAText: "Q: Why financial planning AI? A: To optimize spending.",
    isActive: true,
    createdAt: new Date(),
  },
  // Advanced Final
  {
    _id: 29,
    title: "Full-Scale AI Business Management System",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses need complete AI-assisted management.",
    proposedSolution:
      "Integrate sales, inventory, clients, and AI insights in one platform.",
    keyFeatures: ["AI insights", "Sales module", "Inventory module", "Reports"],
    roadmapText: "Backend → AI → UI → Testing",
    tasksText: "Integrate modules, Train AI, Build dashboards",
    summaryText: "Advanced business management platform with AI.",
    vivaQAText: "Q: Why full AI system? A: To manage all operations efficiently.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 30,
    title: "AI-Based Market Trend Analyzer",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses cannot track market trends efficiently.",
    proposedSolution:
      "AI system predicts market demand and trends.",
    keyFeatures: ["Trend prediction", "Charts", "Recommendations"],
    roadmapText: "Data → AI → Dashboard",
    tasksText: "Train AI, Display market insights",
    summaryText: "Advanced market trend analysis tool.",
    vivaQAText: "Q: Why market trends? A: To adapt business strategy.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 31,
    title: "AI-Based Client Retention System",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses lose clients due to poor retention strategy.",
    proposedSolution:
      "AI predicts clients at risk and suggests actions.",
    keyFeatures: ["Client risk analysis", "AI suggestions", "Dashboard"],
    roadmapText: "Data → AI → Dashboard",
    tasksText: "Train AI, Display retention insights",
    summaryText: "Advanced client retention management.",
    vivaQAText: "Q: Why retention AI? A: To prevent client churn.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 32,
    title: "AI-Based Sales Optimization System",
    domain: "Business",
    type: "Final Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses cannot maximize sales efficiently.",
    proposedSolution:
      "AI provides suggestions to improve sales performance.",
    keyFeatures: ["Sales analysis", "AI suggestions", "Reports"],
    roadmapText: "Data → AI → Dashboard",
    tasksText: "Train AI, Provide suggestions",
    summaryText: "Advanced sales optimization tool.",
    vivaQAText: "Q: Why sales AI? A: To increase revenue effectively.",
    isActive: true,
    createdAt: new Date(),
  },
  // Advanced Hackathon
  {
    _id: 33,
    title: "AI-Powered Real-Time Business Insights",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses cannot get real-time insights easily.",
    proposedSolution:
      "Dashboard with live AI analytics on sales, expenses, and clients.",
    keyFeatures: ["Real-time data", "AI insights", "Charts", "Alerts"],
    roadmapText: "Data → AI → Dashboard → Demo",
    tasksText: "Fetch live data, Train AI, Display insights",
    summaryText: "Real-time business intelligence system.",
    vivaQAText: "Q: Why real-time AI? A: For instant decision-making.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 34,
    title: "AI-Powered Marketing Optimizer",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Marketing strategies are not optimized for ROI.",
    proposedSolution:
      "AI recommends campaigns and optimizes budget allocation.",
    keyFeatures: ["AI marketing", "Budget suggestions", "Campaign analysis"],
    roadmapText: "Data → AI → Demo",
    tasksText: "Train AI, Provide suggestions",
    summaryText: "AI-based marketing optimization tool.",
    vivaQAText: "Q: Why AI marketing? A: To maximize ROI.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 35,
    title: "AI-Based Inventory Forecasting",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses cannot predict stock requirements accurately.",
    proposedSolution:
      "AI predicts inventory needs based on sales trends.",
    keyFeatures: ["Inventory forecast", "AI insights", "Alerts"],
    roadmapText: "Data → AI → Demo",
    tasksText: "Train AI, Display inventory forecast",
    summaryText: "AI-powered inventory management tool.",
    vivaQAText: "Q: Why inventory AI? A: To maintain optimal stock levels.",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: 36,
    title: "AI-Based Revenue Growth Predictor",
    domain: "Business",
    type: "Hackathon Project",
    skillsTags: ["advanced"],
    problemStatement:
      "Businesses cannot predict revenue growth accurately.",
    proposedSolution:
      "AI predicts future revenue and suggests strategies.",
    keyFeatures: ["Revenue forecast", "AI suggestions", "Dashboard"],
    roadmapText: "Data → AI → Demo",
    tasksText: "Train AI, Display growth predictions",
    summaryText: "AI-based revenue prediction tool.",
    vivaQAText: "Q: Why revenue AI? A: To plan business strategies.",
    isActive: true,
    createdAt: new Date(),
  },
];
