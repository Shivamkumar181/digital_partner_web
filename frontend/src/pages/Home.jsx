// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Home = () => {
//   return (
//     <div className="bg-black text-white min-h-screen overflow-hidden">
//       {/* HERO */}
//       <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.2),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.2),transparent_40%)]"></div>

//         <h1 className="text-5xl md:text-7xl font-extrabold">
//           Collaborate. Contribute.
//           <br />
//           <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
//             Earn Globally.
//           </span>
//         </h1>

//         <p className="mt-6 text-gray-400 max-w-xl">
//           Work with top freelancers from India 🇮🇳 and USA 🇺🇸.
//         </p>
//       </section>

//       {/* FREELANCERS AUTO SCROLL (RIGHT ➝ LEFT) */}
//       <section className="py-20">
//         <h2 className="text-4xl text-center mb-10 font-bold">
//           Top Freelancers
//         </h2>

//         <div className="overflow-hidden">
//           <motion.div
//             animate={{ x: ["0%", "-50%"] }}
//             transition={{
//               repeat: Infinity,
//               duration: 20,
//               ease: "linear",
//             }}
//             className="flex gap-8 w-max"
//           >
//             {[...Array(2)].map((_, idx) => (
//               <>
//                 {["Aman 🇮🇳", "Priya 🇮🇳", "Rahul 🇮🇳", "John 🇺🇸", "Emily 🇺🇸"].map(
//                   (name, i) => (
//                     <div
//                       key={`${idx}-${i}`}
//                       className="min-w-[200px] p-6 rounded-xl bg-[#0a0a0a] border border-gray-800 text-center"
//                     >
//                       <img
//                         src={`https://i.pravatar.cc/100?img=${i + 10}`}
//                         className="w-16 h-16 mx-auto rounded-full mb-2"
//                       />
//                       <p>{name}</p>
//                       <p className="text-gray-400 text-sm">Top Rated</p>
//                     </div>
//                   ),
//                 )}
//               </>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* TESTIMONIALS AUTO SCROLL (LEFT ➝ RIGHT) */}
//       <section className="py-20">
//         <h2 className="text-4xl text-center mb-10 font-bold">
//           Client Testimonials
//         </h2>

//         <div className="overflow-hidden">
//           <motion.div
//             animate={{ x: ["-50%", "0%"] }}
//             transition={{
//               repeat: Infinity,
//               duration: 20,
//               ease: "linear",
//             }}
//             className="flex gap-8 w-max"
//           >
//             {[...Array(2)].map((_, idx) => (
//               <>
//                 {["Rajesh 🇮🇳", "Anita 🇮🇳", "Michael 🇺🇸"].map((name, i) => (
//                   <div
//                     key={`${idx}-${i}`}
//                     className="min-w-[250px] p-6 rounded-xl bg-[#0a0a0a] border border-gray-800"
//                   >
//                     <div className="flex items-center gap-3 mb-2">
//                       <img
//                         src={`https://i.pravatar.cc/100?img=${i + 20}`}
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <p>{name}</p>
//                     </div>

//                     <p className="text-gray-400 text-sm">
//                       Amazing platform, smooth and professional.
//                     </p>
//                   </div>
//                 ))}
//               </>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* WHO WE ARE */}
//       <section className="py-24 max-w-6xl mx-auto px-6 text-center">
//         <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
//         <p className="text-gray-400 max-w-3xl mx-auto">
//           DigitalPartner is a next-generation freelancing platform built for the
//           modern world. We connect skilled freelancers and clients globally,
//           focusing on collaboration, transparency, and fair compensation for
//           every contribution.
//         </p>
//       </section>

//       {/* WHY TRUST US */}
//       <section className="py-24 bg-[#050505]">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h2 className="text-4xl font-bold mb-16">Why Trust Us</h2>

//           <div className="grid md:grid-cols-3 gap-10">
//             {[
//               "🔒 Secure Payments System",
//               "✔ Verified Freelancers & Clients",
//               "🌍 Global Collaboration Platform",
//               "⚡ Real-Time Communication",
//               "📜 Verified Certificates",
//               "💰 Transparent Earnings",
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="p-6 rounded-xl bg-[#0a0a0a] border border-gray-800 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition"
//               >
//                 {item}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CLIENT BENEFITS */}
//       <section className="py-24 max-w-6xl mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center mb-16">For Clients</h2>

//         <div className="grid md:grid-cols-3 gap-10">
//           {[
//             "Hire top global freelancers easily",
//             "Pay only for actual contributions",
//             "Track project progress in real-time",
//             "Access verified professionals",
//             "Cost-effective collaboration",
//             "Secure and transparent payments",
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="p-6 rounded-xl bg-[#0a0a0a] border border-gray-800 hover:-translate-y-2 transition"
//             >
//               <p className="text-gray-300">{item}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FREELANCER BENEFITS */}
//       <section className="py-24 bg-[#050505]">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-16">
//             For Freelancers
//           </h2>

//           <div className="grid md:grid-cols-3 gap-10">
//             {[
//               "Earn based on your real work",
//               "Collaborate with global teams",
//               "Build verified portfolio",
//               "Get paid transparently",
//               "Access multiple projects",
//               "Grow your professional network",
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="p-6 rounded-xl bg-[#0a0a0a] border border-gray-800 hover:scale-105 transition"
//               >
//                 <p className="text-gray-300">{item}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* WORKFLOW (CIRCLE ANIMATION STYLE) */}
//       <section className="py-32 text-center relative overflow-hidden">
//         <h2 className="text-4xl font-bold mb-20">How It Works</h2>

//         <div className="flex flex-col md:flex-row items-center justify-center gap-16">
//           {[
//             { step: "1", text: "Client Posts Project" },
//             { step: "2", text: "Freelancers Contribute" },
//             { step: "3", text: "Work Gets Approved" },
//             { step: "4", text: "Get Paid & Certified" },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ scale: 0.8, opacity: 0 }}
//               whileInView={{ scale: 1, opacity: 1 }}
//               transition={{ delay: i * 0.2 }}
//               className="relative flex flex-col items-center"
//             >
//               {/* CIRCLE RING */}
//               <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-2xl font-bold relative">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
//                   className="absolute inset-0 rounded-full border-2 border-purple-500 opacity-50"
//                 />

//                 {item.step}
//               </div>

//               <p className="mt-4 text-gray-400 text-sm">{item.text}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 text-center">
//         <Link className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:scale-110 transition">
//           Join Now
//         </Link>
//       </section>
//     </div>
//   );
// };

// export default Home;   




import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      title: 'Collaborative Projects',
      description: 'Work together with other freelancers on projects, each contributing their unique skills.',
      icon: '🤝',
    },
    {
      title: 'Fair Compensation',
      description: 'Get paid for your specific contributions, ensuring fair compensation for your work.',
      icon: '💰',
    },
    {
      title: 'Verified Certificates',
      description: 'Receive blockchain-verified certificates for your contributions to build your portfolio.',
      icon: '📜',
    },
    {
      title: 'Real-time Communication',
      description: 'Chat with clients and team members in real-time to coordinate effectively.',
      icon: '💬',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 bg-black text-white px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative text-center py-16 sm:py-20 md:py-28 rounded-2xl overflow-hidden mt-4 sm:mt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent leading-tight">
            Collaborate, <br className="sm:hidden" /> Contribute, Earn
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto text-gray-300 px-2">
            Join the revolutionary freelancing platform where multiple freelancers contribute to projects and get paid for their specific contributions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:space-x-0 md:space-x-4">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 text-center"
            >
              Get Started
            </Link>
            <Link
              to="/projects"
              className="w-full sm:w-auto border border-gray-600 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 text-center"
            >
              Browse Projects
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
            Why Choose DigitalPartner?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.3)',
                }}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl backdrop-blur-md transition-all duration-300"
              >
                <div className="text-4xl sm:text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 rounded-2xl bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[1, 2, 3].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6 shadow-lg">
                  {step}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {step === 1 && 'Client Posts Project'}
                  {step === 2 && 'Freelancers Contribute'}
                  {step === 3 && 'Get Paid & Certified'}
                </h3>

                <p className="text-sm sm:text-base text-gray-400 px-2">
                  {step === 1 && 'Describe your project requirements and budget'}
                  {step === 2 && 'Submit your contributions to specific aspects of the project'}
                  {step === 3 && 'Receive payment and verified certificates'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
