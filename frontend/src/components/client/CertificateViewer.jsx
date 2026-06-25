import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Share2,
  X,
  QrCode,
  CheckCircle,
  Calendar,
  User,
  Briefcase,
  DollarSign,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificateViewer = ({ certificate, isOpen, onClose }) => {
  const [certificateRef, setCertificateRef] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    if (isOpen && certificate) {
      // Generate QR code dynamically
      generateQRCode();
    }
  }, [isOpen, certificate]);

  const generateQRCode = () => {
    const qrElement = document.getElementById("certificate-qr");
    if (qrElement && certificate) {
      const verifyUrl = `${window.location.origin}/verify/${certificate.certificateId}`;
      // You can use a QR code library like qrcode.react
      // For now, we'll use a simple placeholder
      qrElement.innerHTML = "";
      // Import QRCode dynamically
      import("qrcode").then((QRCode) => {
        QRCode.toCanvas(
          qrElement,
          verifyUrl,
          {
            width: 120,
            margin: 1,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          },
          (error) => {
            if (error) console.error("QR generation error:", error);
          },
        );
      });
    }
  };

  const handleDownload = async () => {
    if (!certificateRef) return;
    setDownloadLoading(true);

    try {
      const canvas = await html2canvas(certificateRef, {
        scale: 3,
        backgroundColor: "#000000",
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`certificate-${certificate.certificateId}.pdf`);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "DigitalPartner Certificate",
      text: `I earned a certificate for ${certificate.projectTitle}!`,
      url: `${window.location.origin}/verify/${certificate.certificateId}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Verification link copied to clipboard!");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className="relative max-w-5xl w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Certificate Content */}
          <div
            ref={setCertificateRef}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-12 border border-gray-800"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, rgba(75, 0, 130, 0.1) 0%, transparent 50%)",
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-purple-500 rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-purple-500 rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-purple-500 rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-purple-500 rounded-br-2xl"></div>

            {/* Main Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-12">
                {certificate.companyLogo ? (
                  <img
                    src={certificate.companyLogo}
                    alt={certificate.companyName}
                    className="h-20 mx-auto mb-4 object-contain"
                  />
                ) : (
                  <div className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-4 mb-4">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                )}
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">
                  Certificate of Achievement
                </h1>
                <p className="text-gray-400 text-lg">Proudly presented to</p>
              </div>

              {/* Recipient Name */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-2">
                  {certificate.contributorName || certificate.freelancerName}
                </h2>
                <div className="w-32 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"></div>
              </div>

              {/* Achievement Details */}
              <div className="text-center mb-10">
                <p className="text-gray-300 text-lg mb-4">
                  For outstanding contribution to
                </p>
                <h3 className="text-3xl font-bold text-purple-400 mb-6">
                  {certificate.projectTitle}
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  {certificate.contributionDescription ||
                    "Exceptional work and dedication shown throughout the project completion."}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Issued Date</p>
                  <p className="text-white font-semibold">
                    {new Date(certificate.issuedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-center">
                  <Briefcase className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Company</p>
                  <p className="text-white font-semibold">
                    {certificate.companyName}
                  </p>
                </div>
                <div className="text-center">
                  <User className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Awarded By</p>
                  <p className="text-white font-semibold text-sm">
                    {certificate.clientName || certificate.companyName}
                  </p>
                </div>
                {certificate.amount && (
                  <div className="text-center">
                    <DollarSign className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Contribution Value</p>
                    <p className="text-white font-semibold">
                      ${certificate.amount}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer with QR and Signature */}
              <div className="flex justify-between items-end mt-12 pt-8 border-t border-gray-800">
                <div>
                  <canvas id="certificate-qr" className="w-24 h-24"></canvas>
                  <p className="text-gray-500 text-xs mt-2">Scan to verify</p>
                </div>
                <div className="text-center">
                  <div className="mb-2">
                    <div className="w-48 h-0.5 bg-gray-700 mb-2"></div>
                    <p className="text-gray-400 text-sm">
                      Authorized Signature
                    </p>
                  </div>
                  <p className="text-white font-semibold">
                    {certificate.companyName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs">
                    Certificate ID: {certificate.certificateId}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Verification ID: {certificate.certificateId}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Verify at: digitalpartner.com/verify
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={handleDownload}
              disabled={downloadLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
            >
              <Download size={20} />
              {downloadLoading ? "Generating PDF..." : "Download PDF"}
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition flex items-center gap-2"
            >
              <Share2 size={20} />
              Share
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition flex items-center gap-2"
            >
              <X size={20} />
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificateViewer;
