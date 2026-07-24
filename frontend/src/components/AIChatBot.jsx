import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "👋 Welcome to DigitalPartner! I'm your AI assistant. How can I help you today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  // Professional AI Response Generator
  const generateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    const lowerMessage = userMessage.toLowerCase().trim();
    let botReply = "";
    
    // REETINGS & INTRODUCTIONS
    if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|yo|what's up|howdy|namaste)/)) {
      botReply = "Hello! 👋 Welcome to DigitalPartner. I'm your dedicated AI assistant, here to help you navigate our platform. Whether you're a freelancer looking for projects or a client seeking talent, I'm here to guide you every step of the way. How may I assist you today?";
    }
    
    // ABOUT DIGITALPARTNER
    else if (lowerMessage.includes('about') || lowerMessage.includes('what is digitalpartner') || lowerMessage.includes('company')) {
      botReply = "DigitalPartner is a revolutionary freelancing platform that connects talented freelancers with forward-thinking clients. We believe in fair compensation, transparent collaboration, and recognizing every contribution. Our mission is to create a global ecosystem where freelancers can build meaningful careers and clients can access world-class talent. With blockchain-verified certificates, secure payments, and real-time collaboration tools, we're redefining the future of work.";
    }
    
    //  HOW IT WORKS 
    else if (lowerMessage.includes('how it works') || lowerMessage.includes('how does it work') || lowerMessage.includes('getting started') || lowerMessage.includes('start')) {
      botReply = "Getting started with DigitalPartner is simple!\n\n🔹 **For Freelancers:**\n1. Create your profile with skills and portfolio\n2. Browse projects that match your expertise\n3. Submit quality contributions with clear proposals\n4. Get paid for approved work and earn certificates\n\n🔹 **For Clients:**\n1. Post your project with clear requirements\n2. Review contributions from skilled freelancers\n3. Approve quality work and generate certificates\n4. Pay securely and build a network of trusted collaborators\n\nReady to begin? I can guide you through any specific step!";
    }
    
    //  FREELANCER QUESTIONS 
    else if (lowerMessage.includes('freelancer') && (lowerMessage.includes('how') || lowerMessage.includes('what'))) {
      botReply = "👨‍💻 **For Freelancers on DigitalPartner:**\n\n• **Find Projects:** Browse our project listings filtered by category, skills, and budget\n• **Submit Contributions:** Create detailed proposals with your work samples\n• **Get Paid:** Receive fair compensation for your approved contributions\n• **Earn Certificates:** Build your professional portfolio with blockchain-verified certificates\n• **Grow Your Profile:** Showcase your skills and build a reputation on the platform\n\n💡 Pro Tip: Quality contributions and clear communication lead to more opportunities and higher earnings!";
    }
    
    // CLIENT QUESTIONS 
    else if (lowerMessage.includes('client') && (lowerMessage.includes('how') || lowerMessage.includes('what'))) {
      botReply = "💼 **For Clients on DigitalPartner:**\n\n• **Post Projects:** Create detailed project briefs with clear requirements and budgets\n• **Review Contributions:** Evaluate freelancer submissions and provide feedback\n• **Manage Payments:** Pay securely for approved contributions\n• **Generate Certificates:** Award blockchain-verified certificates for quality work\n• **Build Your Team:** Create a network of trusted freelancers for future projects\n\n💡 Pro Tip: Clear communication and prompt feedback attract top-tier freelancers to your projects!";
    }
    
    // PROJECTS
    else if (lowerMessage.includes('project') || lowerMessage.includes('find project') || lowerMessage.includes('browse project')) {
      botReply = "↗️**Project Management on DigitalPartner:**\n\n• **Browse Projects:** Use filters to find projects by category, budget, and timeline\n• **Project Status:** Track progress from 'Open' to 'In Progress' to 'Completed'\n• **Collaborate:** Real-time chat with team members and clients\n• **Submit Work:** Upload files and descriptions for your contributions\n• **Track Progress:** Monitor all your projects from your dashboard\n\n🔍 Ready to explore projects? Head to the Projects section or tell me what you're looking for!";
    }
    
    //  PAYMENTS 
    else if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('earn') || lowerMessage.includes('money') || lowerMessage.includes('salary') || lowerMessage.includes('income')) {
      botReply = "💵 **Payments & Earnings on DigitalPartner:**\n\n• **Secure Transactions:** All payments are processed through our secure payment system\n• **Fair Compensation:** Get paid for your specific contributions, not just the final product\n• **Payment Tracking:** Monitor your earnings and payment history in your dashboard\n• **Multiple Methods:** Support for bank transfers, UPI, and other payment options\n• **Transparent Process:** Clear payment terms and dispute resolution\n\n💳 **For Freelancers:** Complete your bank details in Settings to receive payments\n\n💳 **For Clients:** Pay for approved contributions easily through your dashboard\n\nNeed help with a specific payment issue? I'm here to help!";
    }
    
    // CERTIFICATES 
    else if (lowerMessage.includes('certificate') || lowerMessage.includes('verify') || lowerMessage.includes('verification') || lowerMessage.includes('certified') || lowerMessage.includes('credential')) {
      botReply = "📜 **Blockchain-Verified Certificates:**\n\n• **Unique Certificates:** Each contribution receives a unique, tamper-proof certificate\n• **Blockchain Technology:** Certificates are verified using blockchain for authenticity\n• **Easy Verification:** Anyone can verify your certificate using the unique ID\n• **Portfolio Building:** Showcase your verified contributions to clients\n• **Permanent Record:** Certificates are permanently stored and verifiable\n\n🔹 **How to Generate:** Clients can generate certificates for approved contributions\n🔹 **How to Verify:** Visit our Verify Certificate page and enter the certificate ID\n\n🏆 Certificates are your digital proof of expertise and professionalism!";
    }
    
    //  CONTRIBUTIONS
    else if (lowerMessage.includes('contribution') || lowerMessage.includes('submit') || lowerMessage.includes('work submission')) {
      botReply = "📝 **Contributions on DigitalPartner:**\n\n• **Submission Process:** Submit detailed descriptions, files, and your proposed amount\n• **Review Process:** Clients review and provide feedback on your contributions\n• **Status Tracking:** Track your contribution status - Pending, Approved, Rejected, or Paid\n• **Quality Matters:** High-quality contributions lead to more approvals and better ratings\n• **Payment:** Approved contributions are paid after client verification\n\n💡 Tips for successful contributions:\n• Be thorough in your description\n• Include relevant files and samples\n• Price your work fairly\n• Respond to client feedback promptly";
    }
    
    // SKILLS & PROFILE
    else if (lowerMessage.includes('profile') || lowerMessage.includes('skill') || lowerMessage.includes('expertise') || lowerMessage.includes('portfolio')) {
      botReply = "👤 **Building Your Profile on DigitalPartner:**\n\n• **Complete Your Profile:** Add your name, bio, skills, and professional information\n• **Showcase Skills:** List your technical skills and expertise areas\n• **Professional Bio:** Tell clients about your experience and work style\n• **Avatar:** Upload a professional profile picture\n• **Bank Details:** Add payment information for receiving earnings (Freelancers)\n\n🌟 A complete, professional profile attracts better projects and higher-paying clients!\n\n🔹 Go to Settings to update your profile information";
    }
    
    //  COMMUNICATION 
    else if (lowerMessage.includes('chat') || lowerMessage.includes('message') || lowerMessage.includes('communicate') || lowerMessage.includes('talk')) {
      botReply = "💬 **Communication Tools:**\n\n• **Real-time Chat:** Direct message any user on the platform\n• **Project Discussions:** Chat within project rooms for focused conversations\n• **Notifications:** Get instant notifications for new messages\n• **Professional Etiquette:** Clear, respectful communication builds trust\n• **File Sharing:** Share files, images, and documents securely\n\n🔹 Click the message icon on any profile to start a conversation\n🔹 Use project chat for collaboration-specific discussions\n\nRemember, good communication leads to successful collaborations!";
    }
    
    // RATINGS & REVIEWS 
    else if (lowerMessage.includes('rating') || lowerMessage.includes('review') || lowerMessage.includes('feedback')) {
      botReply = "⭐ **Ratings and Reviews:**\n\n• **Quality Feedback:** Clients rate contributions based on quality and professionalism\n• **Freelancer Reputation:** Build your reputation through positive reviews\n• **Improvement Insights:** Use feedback to improve your work quality\n• **Transparent System:** All reviews are visible on your profile\n\n📈 High ratings lead to:\n• Better project opportunities\n• Higher earning potential\n• Trust from clients\n\nFocus on delivering exceptional work and communication will follow!";
    }
    
    //  TROUBLESHOOTING / HELP 
    else if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('issue') || lowerMessage.includes('problem') || lowerMessage.includes('error') || lowerMessage.includes('not working')) {
      botReply = "🛠️ **How Can I Help You?**\n\nI'm here to assist with:\n\n• **Account Issues:** Login, registration, profile updates\n• **Project Problems:** Finding projects, submission issues, status questions\n• **Payment Concerns:** Payment delays, methods, tracking\n• **Certificate Questions:** Generation, verification, downloading\n• **Technical Support:** Navigation, features, platform issues\n\n📧 For urgent matters, you can also contact our support team at support@digitalpartner.com\n\nTell me more about your specific issue, and I'll provide targeted assistance!";
    }
    
    // SECURITY & PRIVACY 
    else if (lowerMessage.includes('security') || lowerMessage.includes('privacy') || lowerMessage.includes('safe') || lowerMessage.includes('secure') || lowerMessage.includes('data')) {
      botReply = "🔒 **Security & Privacy at DigitalPartner:**\n\n• **Data Protection:** Your personal information is encrypted and secure\n• **Secure Payments:** All transactions use industry-standard encryption\n• **Privacy Policy:** We never share your data without consent\n• **Two-Factor Authentication:** Extra security option for your account\n• **Verification:** All users are verified for authenticity\n\n🛡️ We take security seriously. Your trust and safety are our priority.\n\nReview our Privacy Policy and Terms of Service for detailed information.";
    }
    
    //  SUCCESS STORIES
    else if (lowerMessage.includes('success') || lowerMessage.includes('story') || lowerMessage.includes('testimonial') || lowerMessage.includes('experience')) {
      botReply = "🌟 **Success Stories on DigitalPartner:**\n\n• **Freelancer Growth:** Many freelancers have built thriving careers through our platform\n• **Client Success:** Clients have found exceptional talent and completed amazing projects\n• **Global Community:** Connect with professionals from around the world\n• **Career Advancement:** Use certificates to build a credible portfolio\n\n💡 Real stories from our community:\n• Freelancers increased their income by 2x through consistent contributions\n• Clients completed projects faster with our collaborative tools\n• Professionals built their reputation and gained global recognition\n\nReady to write your success story? We're here to help!";
    }
    
    //  FEATURES
    else if (lowerMessage.includes('feature') || lowerMessage.includes('benefit') || lowerMessage.includes('advantage') || lowerMessage.includes('why')) {
      botReply = "🚀 **Why Choose DigitalPartner:**\n\n• **Collaborative Projects:** Multiple freelancers can contribute to a single project\n• **Fair Compensation:** Get paid for your specific contributions\n• **Verified Certificates:** Blockchain-secured proof of your work\n• **Real-time Communication:** Chat with team members instantly\n• **Secure Payments:** Trusted payment processing\n• **Professional Growth:** Build your portfolio and reputation\n• **Global Opportunities:** Work with clients worldwide\n• **Transparent Process:** Clear expectations and feedback\n\nThese features make DigitalPartner the ideal platform for modern freelancing!";
    }
    
    // DEFAULT RESPONSE
    else {
      botReply = "🤔 That's an interesting question! I want to make sure I provide the most helpful information. Could you please specify whether you're:\n\n1️⃣ A freelancer looking to find work and earn\n2️⃣ A client seeking talent for projects\n3️⃣ Looking for help with a specific feature\n4️⃣ Having a technical issue\n\nOr simply rephrase your question, and I'll do my best to assist you! 😊";
    }
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    setIsTyping(false);
    
    return botReply;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputText.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    const botReply = await generateAIResponse(userMessage.text);
    
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      text: botReply
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Professional quick reply options
  const quickReplies = [
    { text: "How It Works", action: "How does DigitalPartner work?" },
    { text: "For Freelancers", action: "How can I start as a freelancer?" },
    { text: "For Clients", action: "How can I start as a client?" },
    { text: "Payments", action: "Tell me about payments and earnings" },
    { text: "Certificates", action: "How do certificates work?" },
    { text: "Help", action: "I need help with an issue" },
  ];

  return (
    <>
      {/* Floating Chat Button - Responsive */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 z-50 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full p-2.5 sm:p-3 md:p-4 shadow-2xl hover:shadow-lg hover:scale-110 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open AI Chat"
      >
        {isOpen ? (
          <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        ) : (
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        )}
      </motion.button>

      {/* Chat Window - Fully Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : 'auto'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-16 sm:bottom-20 md:bottom-24 left-3 right-3 sm:left-auto sm:right-3 md:right-6 z-50 
                       w-[calc(100%-24px)] sm:w-[380px] md:w-[420px] lg:w-[450px] 
                       max-h-[80vh] sm:max-h-[90vh] 
                       bg-gray-950 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
          >
            {/* Header - Responsive */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2.5 sm:p-3 md:p-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold text-xs sm:text-sm md:text-base">DigitalPartner AI</span>
                <span className="text-white/60 text-[8px] sm:text-[10px] md:text-xs">• Online</span>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <button
                  onClick={toggleMinimize}
                  className="text-white/70 hover:text-white transition-colors p-0.5 sm:p-1"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Minimize2 size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white/70 hover:text-white transition-colors p-0.5 sm:p-1"
                  aria-label="Close chat"
                >
                  <X size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            {/* Messages - Responsive */}
            {!isMinimized && (
              <>
                <div className="h-64 sm:h-72 md:h-80 lg:h-[420px] overflow-y-auto p-2.5 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2 md:space-y-3 bg-black">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[90%] sm:max-w-[85%] px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-2xl 
                                   text-[10px] sm:text-xs md:text-sm whitespace-pre-line break-words ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                            : 'bg-gray-800 text-gray-100 border border-gray-700'
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-800 text-gray-100 border border-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies - Responsive */}
                {messages.length < 3 && (
                  <div className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-900 border-t border-gray-800 flex flex-wrap gap-1 sm:gap-1.5">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputText(reply.action);
                          handleSendMessage(new Event('submit'));
                        }}
                        className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 
                                   text-[8px] sm:text-[10px] md:text-xs rounded-full transition-colors 
                                   border border-gray-700 whitespace-nowrap"
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input - Responsive */}
                <form onSubmit={handleSendMessage} className="p-1.5 sm:p-2 md:p-3 border-t border-gray-800 bg-gray-950 flex gap-1.5 sm:gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-black border border-gray-700 rounded-xl 
                               text-white text-[10px] sm:text-xs md:text-sm 
                               focus:outline-none focus:border-indigo-500 transition-colors
                               placeholder:text-gray-500"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-indigo-500 to-purple-600 
                               text-white rounded-xl hover:shadow-lg transition-all duration-200 
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
