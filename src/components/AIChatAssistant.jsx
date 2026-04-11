import { useState, useEffect, useRef } from 'react';
import Icons from './Icons';
import { profile } from '../data/profile';

const knowledgeBase = [
  // General
  { keys: ["name", "who", "yourself", "introduce"], answer: `I'm ${profile.name}, a ${profile.title} with 12+ years of experience in enterprise web development. Currently serving at the General Civil Aviation Authority (GCAA) in the UAE.` },
  { keys: ["experience", "years", "how long", "career"], answer: "I have over 12 years of professional experience in web development and enterprise applications, having worked across aviation, government, finance, real estate, and healthcare sectors. I've held roles including Senior .NET Consultant, Technical Lead, and Team Lead." },
  { keys: ["skill", "tech", "stack", "tools", "know"], answer: "My core stack includes C#, .NET Core, ASP.NET Web API, Angular 2-10+, SQL Server, Azure, AWS, Node.js, TypeScript, Entity Framework, and React Native. I'm also proficient in microservices architecture, DevOps (Azure DevOps, Jenkins, Git), and agile methodologies." },
  { keys: ["current", "work", "job", "company", "now"], answer: "I'm currently serving as a Senior .NET Consultant at the General Civil Aviation Authority (GCAA) in the UAE — the federal authority responsible for aviation safety regulation and air transport. I work on enterprise applications using .NET Core, C#, Web API, SQL Server, and Azure." },
  { keys: ["education", "degree", "study", "university", "college"], answer: "I hold a Bachelor of Computer Science from Virtual University." },
  { keys: ["certif", "az-900", "az-400"], answer: "I hold two Microsoft Azure certifications:\n• AZ-900 — Azure Fundamentals\n• AZ-400 — Azure DevOps" },
  { keys: ["location", "country", "live", "based"], answer: "I'm based in the United Arab Emirates." },
  { keys: ["contact", "email", "phone", "reach"], answer: `You can reach me at ${profile.email} or call ${profile.phone}. I'm also on LinkedIn: linkedin.com/in/faisal-aman-b2412620` },
  { keys: ["language", "speak"], answer: "I speak English and Urdu fluently." },
  { keys: ["frontend", "angular", "ui", "spa"], answer: "On the frontend, I specialize in Angular (2-10+), TypeScript, HTML5, CSS3, and jQuery. I've built numerous single-page applications with component-driven architecture and responsive design." },
  { keys: ["backend", "api", ".net", "c#", "csharp"], answer: "I'm an expert in backend development with .NET Core, C#, ASP.NET Web API, WCF, and Entity Framework. I build enterprise-grade APIs and microservices with scalable architecture." },
  { keys: ["cloud", "devops", "aws", "deploy", "ci", "cd"], answer: "I work with Azure and AWS (Lambda, Serverless) for cloud deployments. For DevOps, I use Azure DevOps, Jenkins, TFS, and Git with CI/CD pipelines." },
  { keys: ["database", "sql", "data"], answer: "I have deep expertise in SQL Server (2008-2016), SQLite, and LINQ — including database design, performance tuning, and data migration strategies." },
  { keys: ["lead", "mentor", "team", "manage"], answer: "I've held Technical Lead and Team Lead roles at multiple companies. I'm experienced in team mentoring, code reviews, requirement analysis, and agile project delivery in multi-cultural environments." },
  { keys: ["download", "cv", "resume"], answer: "You can download my CV using the 'Download CV' button in the hero section or the 'Resume' button in the navigation bar." },
  { keys: ["hire", "available", "freelance", "opportunity", "open"], answer: "Yes, I'm open to new opportunities! Feel free to reach out via email at askfaisal@outlook.com or connect with me on LinkedIn." },
  { keys: ["microservice", "architecture", "pattern", "solid", "design"], answer: "I design solutions using microservices, MVC, Repository and Dependency Injection patterns, and SOLID principles. I focus on building scalable, maintainable systems with clean separation of concerns." },
  { keys: ["mobile", "xamarin", "react native", "app"], answer: "I've built mobile applications using both Xamarin and React Native, including the AdvancedAir JetCenter mobile app and cross-platform solutions." },
  { keys: ["sector", "industry", "domain"], answer: "I've worked across 6+ industry sectors: Aviation (GCAA), Government (CDA Sanad), Healthcare (GWU Covid-19 LIMS), Finance (Civic Financial), Real Estate (Wedgewood, Aqarat), Loyalty Programs (AIMIA Air Miles), Education (Tutor2day), and Agriculture (Watertronics)." },

  // ── Individual Projects ──
  { keys: ["gcaa", "aviation", "civil aviation"], answer: "**GCAA — General Civil Aviation Authority (Aug 2023 – Present)**\nRole: Senior .NET Consultant\nThe GCAA is the UAE's federal authority for aviation safety and air transport regulation.\n\nTech: .NET Core, C#, Web API, SQL Server, Azure\n\n• Development and maintenance of enterprise applications\n• Microservices architecture and cloud-based solutions\n• Cross-functional agile team collaboration\n• Database design and optimization with SQL Server\n• Code reviews, mentoring junior developers, ensuring coding standards" },
  { keys: ["watertronics", "pump", "golf", "landscape", "agricultural"], answer: "**Watertronics — Custom Pumping Solutions**\nRole: Technical Lead\nWatertronics designs and manufactures custom pumping solutions for Golf, Landscape, Municipal, and Agricultural use.\n\nTech: C# .NET Core, Angular 10, Azure\n\n• Requirement analysis and technical design documentation\n• Built SPA with Angular 10 and REST Web API services\n• Azure deployment to Dev, QA, and UAT environments" },
  { keys: ["george washington", "gwu", "lims", "covid", "lab", "laboratory"], answer: "**George Washington University — LIMS (Covid-19)**\nRole: Senior .NET Developer / Technical Lead\nA Laboratory Information Management System for Covid-19 testing workflows.\n\nTech: Angular 10, Node.js, TypeScript, AWS\n\n• Solution architecture design with Angular UI and Node.js backend\n• AWS deployment and functional analysis" },
  { keys: ["civic", "loan", "financial", "mortgage"], answer: "**Civic Financial Services — Loan Management System**\nRole: Senior .NET Developer\n\nTech: AngularJS, Web API, MVC, Entity Framework, DocuSign\n\n• SPA development with AngularJS and MVC pattern\n• DocuSign integration for e-signature on loan approvals\n• Dependency injection and repository pattern implementation" },
  { keys: ["wedgewood", "minerva", "real estate"], answer: "**Wedgewood — Real Estate Management (Minerva)**\nRole: Senior .NET Developer\n\nTech: Azure, ASP.NET MVC, Angular 4, SharePoint 2013, SSRS\n\n• WebAPI and web application development using .NET Framework 4.7\n• Converted Windows Form applications into Angular SPAs" },
  { keys: ["advancedair", "advanced air", "jetcenter", "jet center", "trip", "charter", "flight"], answer: "**AdvancedAir — JetCenter Trip Management**\nRole: Senior .NET Developer\nA trip management system for private chartered flights.\n\nTech: ASP.NET Web APIs, AngularJS, Azure, Xamarin\n\n• Plaid integration for credit card transaction processing\n• SPA development with AngularJS and Xamarin mobile app" },
  { keys: ["tutor", "tutor2day", "tutoring", "online learning"], answer: "**Tutor2day — Online Tutoring Platform**\nRole: Team Lead\n\nTech: AngularJS, Web API, C#, SQL Server\n\n• Built application architecture, Web API, and database schema\n• Led development team with scheduling and email notification features" },
  { keys: ["aimia", "air miles", "loyalty", "voucher"], answer: "**AIMIA, Dubai — Loyalty Management System (Air Miles ME)**\nRole: ASP.NET Consultant\n\nTech: ASP.NET, Web API, SQL Server\n\n• Client-site requirements analysis and design workshops\n• E-Voucher Web API for mobile integration and dashboard development" },
  { keys: ["sanad", "cda", "community development", "disability", "therapy", "children"], answer: "**Community Development Authority — Sanad RV**\nRole: .NET Developer\nA mobile therapy unit application for children with disabilities.\n\nTech: C#, ASP.NET, Web API, SQL Server" },
  { keys: ["idox", "document management", "archive", "capture"], answer: "**iDOX — Enterprise Document Management System**\nRole: .NET Developer\nAn enterprise document management system handling capture, archive, search, and distribution.\n\nTech: C#, ASP.NET, Web API, SQL Server" },
  { keys: ["aqarat", "property", "map", "google maps"], answer: "**Aqarat — Real Estate Mobile App**\nRole: .NET Developer\nA real estate mobile application with Google Maps integration.\n\nTech: C#, ASP.NET, Web API, SQL Server" },
  { keys: ["contract", "timesheet", "expense", "signature", "document sign"], answer: "**Contract Management Systems**\nRole: .NET Developer\nExpense tracking, timesheet management, and digital signature document management systems.\n\nTech: C#, ASP.NET, Web API, SQL Server" },
  { keys: ["docusign", "e-sign", "esign", "signature"], answer: "I integrated DocuSign for e-signature functionality in the Civic Financial Services Loan Management System, enabling digital signatures on loan approvals." },
  { keys: ["plaid", "payment", "credit card", "transaction"], answer: "I integrated Plaid for credit card transaction processing in the AdvancedAir JetCenter Trip Management system for private chartered flights." },
  { keys: ["sharepoint", "ssrs", "report"], answer: "I've worked with SharePoint 2013 and SQL Server Reporting Services (SSRS) at Wedgewood for the Minerva real estate management platform." },

  // All projects overview
  { keys: ["project", "deliver", "built", "portfolio", "all project", "list"], answer: "I've delivered 100+ projects. Here are my key projects:\n\n• **GCAA** — Aviation enterprise apps (.NET Core, Azure)\n• **Watertronics** — Pumping solutions SPA (Angular 10, Azure)\n• **GWU LIMS** — Covid-19 lab system (Angular, Node.js, AWS)\n• **Civic Financial** — Loan management (AngularJS, DocuSign)\n• **Wedgewood Minerva** — Real estate (Angular 4, SharePoint)\n• **AdvancedAir JetCenter** — Trip management (AngularJS, Xamarin)\n• **Tutor2day** — Online tutoring platform (AngularJS, C#)\n• **AIMIA Air Miles** — Loyalty system (ASP.NET, Web API)\n• **CDA Sanad** — Therapy app for children with disabilities\n• **iDOX** — Document management system\n• **Aqarat** — Real estate app with Google Maps\n• **Contract Management** — Expense & timesheet systems\n\nAsk me about any specific project for more details!" },
];

function getAIResponse(question) {
  const q = question.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const key of entry.keys) {
      if (q.includes(key)) {
        // Longer keys get higher score for better matching
        score += 1 + (key.length > 5 ? 1 : 0);
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) return bestMatch.answer;

  // Greeting
  if (/^(hi|hello|hey|greet|salam|assalam)/i.test(q)) {
    return `Hello! I'm Faisal's AI assistant. Ask me anything about his skills, experience, projects, or how to get in touch!\n\nTry asking about specific projects like GCAA, Watertronics, Covid-19 LIMS, or any technology!`;
  }

  // Thank you
  if (/^(thank|thanks|thx|cheers|appreciate)/i.test(q)) {
    return "You're welcome! Feel free to ask anything else about Faisal's experience, projects, or skills.";
  }

  return "I don't have a specific answer for that, but here are some things you can ask me:\n\n• About specific projects (GCAA, Watertronics, Covid-19 LIMS, etc.)\n• Technical skills (.NET, Angular, Azure, SQL Server)\n• Work experience and roles\n• Certifications and education\n• How to get in touch\n\nOr reach Faisal directly at askfaisal@outlook.com!";
}

const suggestedQuestions = [
  "What are your skills?",
  "List all your projects",
  "Tell me about GCAA",
  "Covid-19 LIMS project?",
  "Are you available for hire?",
  "What certifications do you have?",
];

function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm Faisal's AI assistant. Ask me anything about his skills, experience, or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const handleSend = (text) => {
    const question = text || input.trim();
    if (!question) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setTyping(true);

    // Simulate AI thinking delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const response = getAIResponse(question);
      setTyping(false);
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-chat" ref={chatRef}>
      {open && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-chat-header-info">
              <div className="ai-chat-avatar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                  <path d="M18 14a6 6 0 0 0-12 0v2h12v-2z" />
                  <circle cx="9" cy="6" r="0.5" fill="currentColor" />
                  <circle cx="15" cy="6" r="0.5" fill="currentColor" />
                  <line x1="6" y1="20" x2="6" y2="22" />
                  <line x1="18" y1="20" x2="18" y2="22" />
                </svg>
              </div>
              <div>
                <span className="ai-chat-title">AI Assistant</span>
                <span className="ai-chat-status">Online</span>
              </div>
            </div>
            <button className="ai-chat-close" onClick={() => setOpen(false)}>
              {Icons.close}
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-msg ai-msg-${msg.role}`}>
                <div className={`ai-msg-bubble ai-msg-bubble-${msg.role}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="ai-msg ai-msg-ai">
                <div className="ai-msg-bubble ai-msg-bubble-ai ai-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="ai-chat-suggestions">
              {suggestedQuestions.map((q, i) => (
                <button key={i} className="ai-suggestion" onClick={() => handleSend(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="ai-chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={typing}
            />
            <button onClick={() => handleSend()} disabled={typing || !input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        className={`ai-chat-fab ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="AI Chat Assistant"
      >
        {open ? Icons.close : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="1" fill="currentColor" />
            <circle cx="15" cy="10" r="1" fill="currentColor" />
          </svg>
        )}
        <span className="ai-chat-fab-badge">AI</span>
      </button>
    </div>
  );
}

export default AIChatAssistant;
