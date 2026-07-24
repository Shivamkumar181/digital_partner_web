// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { CheckCircle, XCircle, Download } from "lucide-react";
// import { format } from "date-fns";

// const VerifyCertificate = () => {
//   const { certificateId } = useParams();
//   const [certificate, setCertificate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const printRef = useRef(null);

//   useEffect(() => {
//     verifyCertificate();
//   }, [certificateId]);

//   const verifyCertificate = async () => {
//     try {
//       const res = await axios.get(`/api/certificates/verify/${certificateId}`);
//       if (res.data.verified) setCertificate(res.data.certificate);
//       else setError("Certificate not found or invalid");
//     } catch {
//       setError("Failed to verify certificate");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrint = () => {
//     const content = printRef.current;
//     const win = window.open("", "", "width=900,height=650");
//     win.document.write(`
//       <html><head><title>Certificate - ${certificate.id}</title>
//       <style>
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { font-family: Georgia, serif; background: white; }
//         .cert { width: 210mm; min-height: 148mm; margin: 0 auto; padding: 40px 50px; border: 8px double #4f46e5; position: relative; }
//         .cert-inner { border: 2px solid #c7d2fe; padding: 30px; height: 100%; }
//         .header { text-align: center; margin-bottom: 24px; }
//         .logo { width: 70px; height: 70px; object-fit: contain; margin: 0 auto 12px; display: block; }
//         .logo-placeholder { width: 70px; height: 70px; background: linear-gradient(135deg,#4f46e5,#7c3aed); border-radius: 16px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: bold; }
//         .company { font-size: 22px; font-weight: bold; color: #1e1b4b; letter-spacing: 2px; text-transform: uppercase; }
//         .tagline { font-size: 11px; color: #6366f1; letter-spacing: 3px; margin-top: 4px; }
//         .divider { border: none; border-top: 1px solid #c7d2fe; margin: 16px 0; }
//         .cert-title { font-size: 13px; letter-spacing: 4px; color: #6366f1; text-transform: uppercase; text-align: center; margin-bottom: 8px; }
//         .cert-sub { font-size: 32px; color: #1e1b4b; text-align: center; font-style: italic; margin-bottom: 20px; }
//         .to { font-size: 12px; text-align: center; color: #64748b; margin-bottom: 6px; }
//         .name { font-size: 36px; color: #4f46e5; text-align: center; font-weight: bold; border-bottom: 2px solid #4f46e5; display: inline-block; padding-bottom: 4px; margin: 0 auto; }
//         .name-wrap { text-align: center; margin-bottom: 16px; }
//         .desc { font-size: 13px; color: #475569; text-align: center; line-height: 1.6; margin-bottom: 20px; max-width: 500px; margin-left: auto; margin-right: auto; }
//         .meta { display: flex; justify-content: space-around; margin-top: 20px; }
//         .meta-item { text-align: center; }
//         .meta-label { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
//         .meta-value { font-size: 13px; color: #1e293b; font-weight: bold; margin-top: 2px; }
//         .cert-id { font-size: 9px; color: #94a3b8; text-align: center; margin-top: 16px; font-family: monospace; }
//         .website { font-size: 10px; color: #6366f1; text-align: center; margin-top: 4px; }
//         .corner { position: absolute; width: 30px; height: 30px; }
//         .tl { top: 8px; left: 8px; border-top: 3px solid #4f46e5; border-left: 3px solid #4f46e5; }
//         .tr { top: 8px; right: 8px; border-top: 3px solid #4f46e5; border-right: 3px solid #4f46e5; }
//         .bl { bottom: 8px; left: 8px; border-bottom: 3px solid #4f46e5; border-left: 3px solid #4f46e5; }
//         .br { bottom: 8px; right: 8px; border-bottom: 3px solid #4f46e5; border-right: 3px solid #4f46e5; }
//       </style>
//       </head><body>
//       ${content.innerHTML}
//       </body></html>
//     `);
//     win.document.close();
//     setTimeout(() => {
//       win.print();
//       win.close();
//     }, 500);
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
//         >
//           <XCircle size={64} className="mx-auto text-red-500 mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Invalid Certificate
//           </h2>
//           <p className="text-gray-500">{error}</p>
//         </motion.div>
//       </div>
//     );

//   const companyName = certificate.companyName || "DigitalPartner";
//   const companyLogo = certificate.companyLogo || null;
//   const siteUrl = window.location.origin;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-3xl mx-auto"
//       >
//         {/* Verified badge */}
//         <div className="flex items-center justify-center gap-2 mb-6">
//           <CheckCircle className="text-green-500" size={22} />
//           <span className="text-green-700 font-semibold text-sm bg-green-50 border border-green-200 px-3 py-1 rounded-full">
//             Verified Authentic Certificate
//           </span>
//         </div>

//         {/* Certificate */}
//         <div ref={printRef}>
//           <div
//             className="cert bg-white relative"
//             style={{ border: "8px double #4f46e5", padding: "40px 50px" }}
//           >
//             {/* Corner decorations */}
//             <div
//               className="corner tl absolute"
//               style={{
//                 top: 8,
//                 left: 8,
//                 width: 30,
//                 height: 30,
//                 borderTop: "3px solid #4f46e5",
//                 borderLeft: "3px solid #4f46e5",
//               }}
//             />
//             <div
//               className="corner tr absolute"
//               style={{
//                 top: 8,
//                 right: 8,
//                 width: 30,
//                 height: 30,
//                 borderTop: "3px solid #4f46e5",
//                 borderRight: "3px solid #4f46e5",
//               }}
//             />
//             <div
//               className="corner bl absolute"
//               style={{
//                 bottom: 8,
//                 left: 8,
//                 width: 30,
//                 height: 30,
//                 borderBottom: "3px solid #4f46e5",
//                 borderLeft: "3px solid #4f46e5",
//               }}
//             />
//             <div
//               className="corner br absolute"
//               style={{
//                 bottom: 8,
//                 right: 8,
//                 width: 30,
//                 height: 30,
//                 borderBottom: "3px solid #4f46e5",
//                 borderRight: "3px solid #4f46e5",
//               }}
//             />

//             <div
//               style={{ border: "1.5px solid #c7d2fe", padding: "32px 40px" }}
//             >
//               {/* Header */}
//               <div className="text-center mb-6">
//                 {companyLogo ? (
//                   <img
//                     src={companyLogo}
//                     alt={companyName}
//                     className="w-16 h-16 object-contain mx-auto mb-3"
//                   />
//                 ) : (
//                   <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-md">
//                     <span className="text-white font-bold text-2xl">
//                       {companyName.charAt(0)}
//                     </span>
//                   </div>
//                 )}
//                 <p className="text-xl font-bold text-indigo-900 tracking-widest uppercase">
//                   {companyName}
//                 </p>
//                 <p className="text-xs text-indigo-400 tracking-widest mt-1">
//                   VERIFIED CONTRIBUTION CERTIFICATE
//                 </p>
//               </div>

//               <hr style={{ borderColor: "#c7d2fe", margin: "16px 0" }} />

//               <p className="text-xs tracking-widest text-indigo-400 text-center uppercase mb-2">
//                 Certificate of Achievement
//               </p>
//               <p className="text-3xl text-indigo-900 text-center font-serif italic mb-5">
//                 This is to certify that
//               </p>

//               <div className="text-center mb-5">
//                 <p className="text-xs text-gray-400 mb-1">
//                   Proudly presented to
//                 </p>
//                 <span className="text-4xl font-bold text-indigo-600 border-b-2 border-indigo-400 pb-1 inline-block">
//                   {certificate.freelancerName || "Contributor"}
//                 </span>
//               </div>

//               <p className="text-sm text-gray-500 text-center leading-relaxed mb-6 max-w-lg mx-auto">
//                 has successfully contributed to the project{" "}
//                 <strong className="text-gray-700">
//                   "{certificate.projectTitle}"
//                 </strong>
//                 {certificate.contributionDescription && (
//                   <span>
//                     {" "}
//                     — {certificate.contributionDescription.substring(0, 120)}
//                     {certificate.contributionDescription.length > 120
//                       ? "..."
//                       : ""}
//                   </span>
//                 )}
//               </p>

//               {/* Meta row */}
//               <div
//                 className="flex justify-around mt-4 pt-4"
//                 style={{ borderTop: "1px solid #e0e7ff" }}
//               >
//                 {certificate.amount && (
//                   <div className="text-center">
//                     <p className="text-xs text-gray-400 uppercase tracking-wide">
//                       Value
//                     </p>
//                     <p className="text-sm font-bold text-gray-800 mt-0.5">
//                       ${certificate.amount}
//                     </p>
//                   </div>
//                 )}
//                 <div className="text-center">
//                   <p className="text-xs text-gray-400 uppercase tracking-wide">
//                     Date Issued
//                   </p>
//                   <p className="text-sm font-bold text-gray-800 mt-0.5">
//                     {certificate.issuedAt
//                       ? format(new Date(certificate.issuedAt), "MMM d, yyyy")
//                       : "-"}
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-xs text-gray-400 uppercase tracking-wide">
//                     Certificate ID
//                   </p>
//                   <p className="text-xs font-mono font-bold text-indigo-600 mt-0.5">
//                     {certificate.id}
//                   </p>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="text-center mt-5">
//                 <p className="text-xs text-gray-400">
//                   Verify this certificate at:
//                 </p>
//                 <p className="text-xs text-indigo-500 font-medium">
//                   {siteUrl}/verify-certificate/{certificate.id}
//                 </p>
//                 <p className="text-xs text-gray-300 mt-2">
//                   Powered by {siteUrl}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-3 mt-6 justify-center">
//           <button
//             onClick={handlePrint}
//             className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
//           >
//             <Download size={16} /> Download / Print
//           </button>
//           <button
//             onClick={() => {
//               const url = `${siteUrl}/verify-certificate/${certificate.id}`;
//               if (navigator.share)
//                 navigator.share({ title: "My Certificate", url });
//               else {
//                 navigator.clipboard.writeText(url);
//                 alert("Link copied!");
//               }
//             }}
//             className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
//           >
//             🔗 Share Link
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default VerifyCertificate;




import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Download } from "lucide-react";
import { format } from "date-fns";

const VerifyCertificate = () => {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const printRef = useRef(null);

  useEffect(() => {
    verifyCertificate();
  }, [certificateId]);

  const verifyCertificate = async () => {
    try {
      const res = await axios.get(`/api/certificates/verify/${certificateId}`);
      if (res.data.verified) setCertificate(res.data.certificate);
      else setError("Certificate not found or invalid");
    } catch {
      setError("Failed to verify certificate");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const content = printRef.current;
    const win = window.open("", "", "width=900,height=650");
    win.document.write(`
      <html><head><title>Certificate - ${certificate.id}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Georgia, serif; background: white; }
        .cert { width: 210mm; min-height: 148mm; margin: 0 auto; padding: 20px 25px; border: 8px double #4f46e5; position: relative; }
        .cert-inner { border: 2px solid #c7d2fe; padding: 20px; height: 100%; }
        .header { text-align: center; margin-bottom: 16px; }
        .logo { width: 60px; height: 60px; object-fit: contain; margin: 0 auto 10px; display: block; }
        .logo-placeholder { width: 60px; height: 60px; background: linear-gradient(135deg,#4f46e5,#7c3aed); border-radius: 16px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold; }
        .company { font-size: 18px; font-weight: bold; color: #1e1b4b; letter-spacing: 2px; text-transform: uppercase; }
        .tagline { font-size: 10px; color: #6366f1; letter-spacing: 3px; margin-top: 4px; }
        .divider { border: none; border-top: 1px solid #c7d2fe; margin: 12px 0; }
        .cert-title { font-size: 11px; letter-spacing: 4px; color: #6366f1; text-transform: uppercase; text-align: center; margin-bottom: 6px; }
        .cert-sub { font-size: 26px; color: #1e1b4b; text-align: center; font-style: italic; margin-bottom: 16px; }
        .to { font-size: 11px; text-align: center; color: #64748b; margin-bottom: 4px; }
        .name { font-size: 30px; color: #4f46e5; text-align: center; font-weight: bold; border-bottom: 2px solid #4f46e5; display: inline-block; padding-bottom: 4px; margin: 0 auto; }
        .name-wrap { text-align: center; margin-bottom: 14px; }
        .desc { font-size: 12px; color: #475569; text-align: center; line-height: 1.6; margin-bottom: 16px; max-width: 400px; margin-left: auto; margin-right: auto; }
        .meta { display: flex; justify-content: space-around; margin-top: 16px; }
        .meta-item { text-align: center; }
        .meta-label { font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
        .meta-value { font-size: 12px; color: #1e293b; font-weight: bold; margin-top: 2px; }
        .cert-id { font-size: 8px; color: #94a3b8; text-align: center; margin-top: 12px; font-family: monospace; }
        .website { font-size: 9px; color: #6366f1; text-align: center; margin-top: 4px; }
        .corner { position: absolute; width: 25px; height: 25px; }
        .tl { top: 8px; left: 8px; border-top: 3px solid #4f46e5; border-left: 3px solid #4f46e5; }
        .tr { top: 8px; right: 8px; border-top: 3px solid #4f46e5; border-right: 3px solid #4f46e5; }
        .bl { bottom: 8px; left: 8px; border-bottom: 3px solid #4f46e5; border-left: 3px solid #4f46e5; }
        .br { bottom: 8px; right: 8px; border-bottom: 3px solid #4f46e5; border-right: 3px solid #4f46e5; }
        @media print {
          .cert { border: 8px double #4f46e5 !important; }
          .corner { border-color: #4f46e5 !important; }
        }
        @media (max-width: 600px) {
          .cert { padding: 15px 20px; }
          .cert-inner { padding: 15px; }
          .company { font-size: 16px; }
          .cert-sub { font-size: 22px; }
          .name { font-size: 26px; }
          .desc { font-size: 11px; max-width: 100%; }
          .meta { flex-wrap: wrap; gap: 8px; }
          .meta-value { font-size: 11px; }
        }
      </style>
      </head><body>
      ${content.innerHTML}
      </body></html>
    `);
    win.document.close();
    setTimeout(() => {
      win.print();
      win.close();
    }, 500);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-indigo-600" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center"
        >
          <XCircle size={48} className="sm:w-16 sm:h-16 mx-auto text-red-500 mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Invalid Certificate
          </h2>
          <p className="text-sm sm:text-base text-gray-500">{error}</p>
        </motion.div>
      </div>
    );

  const companyName = certificate.companyName || "DigitalPartner";
  const companyLogo = certificate.companyLogo || null;
  const siteUrl = window.location.origin;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-6 sm:py-10 px-3 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Verified badge */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          <CheckCircle className="text-green-500" size={18} />
          <span className="text-green-700 font-semibold text-[10px] sm:text-sm bg-green-50 border border-green-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
            Verified Authentic Certificate
          </span>
        </div>

        {/* Certificate */}
        <div ref={printRef} className="overflow-x-auto">
          <div
            className="cert bg-white relative mx-auto"
            style={{ 
              border: "8px double #4f46e5", 
              padding: "20px 25px",
              maxWidth: "100%"
            }}
          >
            {/* Corner decorations */}
            <div
              className="corner tl absolute"
              style={{
                top: 8,
                left: 8,
                width: 25,
                height: 25,
                borderTop: "3px solid #4f46e5",
                borderLeft: "3px solid #4f46e5",
              }}
            />
            <div
              className="corner tr absolute"
              style={{
                top: 8,
                right: 8,
                width: 25,
                height: 25,
                borderTop: "3px solid #4f46e5",
                borderRight: "3px solid #4f46e5",
              }}
            />
            <div
              className="corner bl absolute"
              style={{
                bottom: 8,
                left: 8,
                width: 25,
                height: 25,
                borderBottom: "3px solid #4f46e5",
                borderLeft: "3px solid #4f46e5",
              }}
            />
            <div
              className="corner br absolute"
              style={{
                bottom: 8,
                right: 8,
                width: 25,
                height: 25,
                borderBottom: "3px solid #4f46e5",
                borderRight: "3px solid #4f46e5",
              }}
            />

            <div
              style={{ 
                border: "1.5px solid #c7d2fe", 
                padding: "20px 25px"
              }}
            >
              {/* Header */}
              <div className="text-center mb-4 sm:mb-6">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt={companyName}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain mx-auto mb-2 sm:mb-3"
                  />
                ) : (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                    <span className="text-white font-bold text-xl sm:text-2xl">
                      {companyName.charAt(0)}
                    </span>
                  </div>
                )}
                <p className="text-base sm:text-xl font-bold text-indigo-900 tracking-widest uppercase">
                  {companyName}
                </p>
                <p className="text-[10px] sm:text-xs text-indigo-400 tracking-widest mt-0.5 sm:mt-1">
                  VERIFIED CONTRIBUTION CERTIFICATE
                </p>
              </div>

              <hr style={{ borderColor: "#c7d2fe", margin: "12px 0 16px 0" }} />

              <p className="text-[10px] sm:text-xs tracking-widest text-indigo-400 text-center uppercase mb-1.5 sm:mb-2">
                Certificate of Achievement
              </p>
              <p className="text-xl sm:text-3xl text-indigo-900 text-center font-serif italic mb-3 sm:mb-5">
                This is to certify that
              </p>

              <div className="text-center mb-3 sm:mb-5">
                <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">
                  Proudly presented to
                </p>
                <span className="text-2xl sm:text-4xl font-bold text-indigo-600 border-b-2 border-indigo-400 pb-1 inline-block">
                  {certificate.freelancerName || "Contributor"}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed mb-4 sm:mb-6 max-w-xs sm:max-w-lg mx-auto px-2">
                has successfully contributed to the project{" "}
                <strong className="text-gray-700">
                  "{certificate.projectTitle}"
                </strong>
                {certificate.contributionDescription && (
                  <span>
                    {" "}
                    — {certificate.contributionDescription.substring(0, 120)}
                    {certificate.contributionDescription.length > 120
                      ? "..."
                      : ""}
                  </span>
                )}
              </p>

              {/* Meta row */}
              <div
                className="flex flex-wrap justify-center sm:justify-around gap-3 sm:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4"
                style={{ borderTop: "1px solid #e0e7ff" }}
              >
                {certificate.amount && (
                  <div className="text-center flex-1 min-w-[70px]">
                    <p className="text-[8px] sm:text-xs text-gray-400 uppercase tracking-wide">
                      Value
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5">
                      ${certificate.amount}
                    </p>
                  </div>
                )}
                <div className="text-center flex-1 min-w-[80px]">
                  <p className="text-[8px] sm:text-xs text-gray-400 uppercase tracking-wide">
                    Date Issued
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5">
                    {certificate.issuedAt
                      ? format(new Date(certificate.issuedAt), "MMM d, yyyy")
                      : "-"}
                  </p>
                </div>
                <div className="text-center flex-1 min-w-[80px]">
                  <p className="text-[8px] sm:text-xs text-gray-400 uppercase tracking-wide">
                    Certificate ID
                  </p>
                  <p className="text-[8px] sm:text-xs font-mono font-bold text-indigo-600 mt-0.5 truncate">
                    {certificate.id}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-4 sm:mt-5">
                <p className="text-[8px] sm:text-xs text-gray-400">
                  Verify this certificate at:
                </p>
                <p className="text-[8px] sm:text-xs text-indigo-500 font-medium truncate px-2">
                  {siteUrl}/verify-certificate/{certificate.id}
                </p>
                <p className="text-[8px] sm:text-xs text-gray-300 mt-1.5 sm:mt-2">
                  Powered by {siteUrl}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 justify-center">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-xs sm:text-sm font-semibold hover:shadow-lg transition-all duration-200 shadow-md shadow-indigo-200"
          >
            <Download size={14} /> Download / Print
          </button>
          <button
            onClick={() => {
              const url = `${siteUrl}/verify-certificate/${certificate.id}`;
              if (navigator.share)
                navigator.share({ title: "My Certificate", url });
              else {
                navigator.clipboard.writeText(url);
                alert("Link copied!");
              }
            }}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            🔗 Share Link
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyCertificate;
