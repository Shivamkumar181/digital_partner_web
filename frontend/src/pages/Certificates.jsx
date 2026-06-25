import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import axios from 'axios'
import { format } from 'date-fns'
import { Download, Share2, QrCode } from 'lucide-react'
import CertificateViewer from '../components/client/CertificateViewer'

const Certificates = () => {
  const { user, token } = useSelector((state) => state.auth)
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  
  useEffect(() => {
    fetchCertificates()
  }, [])
  
  const fetchCertificates = async () => {
    try {
      const response = await axios.get('/api/certificates/my-certificates', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCertificates(response.data)
    } catch (error) {
      console.error('Failed to fetch certificates:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleShare = async (certificate) => {
    const shareData = {
      title: 'DigitalPartner Certificate',
      text: `I earned a certificate for contributing to ${certificate.projectId?.title}!`,
      url: `${window.location.origin}/verify/${certificate.certificateId}`
    }
    
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareData.url)
      alert('Verification link copied to clipboard!')
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6 min-h-screen bg-black p-2 sm:p-4 rounded-2xl">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
        <p className="text-indigo-100">
          Your verified contributions are recognized with official certificates
        </p>
      </div>
      
      {certificates.length === 0 ? (
        <div className="bg-gray-950 border border-gray-800 rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📜</div>
          <h3 className="text-xl text-white font-semibold mb-2">No Certificates Yet</h3>
          <p className="text-gray-400 mb-6">
            Start contributing to projects to earn verified certificates
          </p>
          <a href="/projects" className="btn-primary inline-block">
            Browse Projects
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-950 border border-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
                <div className="flex justify-between items-start">
                  <div className="text-white">
                    <p className="text-sm opacity-90">Certificate of Achievement</p>
                    <p className="text-lg font-bold">{cert.certificateId}</p>
                  </div>
                  <QrCode className="text-white" size={32} />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl text-white font-bold mb-2">{cert.projectId?.title}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Contribution: {cert.contributionId?.description?.substring(0, 100)}...
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Issued on {format(new Date(cert.issuedAt), 'PPP')}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCertificate({
                      certificateId: cert.certificateId,
                      freelancerName: cert.contributorName || user?.name,
                      clientName: cert.clientName,
                      projectTitle: cert.projectId?.title,
                      contributionDescription: cert.contributionId?.description,
                      amount: cert.contributionId?.amount,
                      issuedAt: cert.issuedAt,
                      companyName: cert.companyName || 'Digital Partner',
                      companyLogo: cert.companyLogo
                    })}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 text-sm hover:bg-gray-700 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => window.open(cert.pdfUrl || `/verify-certificate/${cert.certificateId}`, '_blank')}
                    className="flex-1 flex items-center justify-center gap-2 btn-primary text-sm"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    onClick={() => handleShare(cert)}
                    className="flex-1 flex items-center justify-center gap-2 btn-secondary text-sm"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500 text-center">
                    Verify at: {window.location.origin}/verify/{cert.certificateId}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <CertificateViewer
        certificate={selectedCertificate}
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  )
}

export default Certificates;