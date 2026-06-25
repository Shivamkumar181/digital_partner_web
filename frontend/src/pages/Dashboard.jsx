import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ClientDashboard from '../components/dashboard/ClientDashboard'
import FreelancerDashboard from '../components/dashboard/FreelancerDashboard'

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  
  useEffect(() => {
    if (user && token) {
      fetchDashboardStats()
    }
  }, [user, token, refreshKey])
  
  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      // Set default stats to avoid breaking the UI
      setStats({
        activeProjects: 0,
        totalSpent: 0,
        contributionsReceived: 0,
        completedProjects: 0,
        totalEarnings: 0,
        approvedContributions: 0,
        pendingContributions: 0,
        certificatesCount: 0,
        recentProjects: [],
        recentContributions: [],
        skills: []
      })
    } finally {
      setLoading(false)
    }
  }

  const refreshStats = () => {
    setRefreshKey(prev => prev + 1)
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-indigo-100">
          {user?.role === 'client' 
            ? 'Manage your projects and review contributions'
            : 'Track your contributions and earnings'}
        </p>
      </motion.div>
      
      {user?.role === 'client' ? (
        <ClientDashboard stats={stats} refreshStats={refreshStats} />
      ) : (
        <FreelancerDashboard stats={stats} refreshStats={refreshStats} />
      )}
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user?.role === 'client' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-950 rounded-xl border border-gray-800 shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/projects/create"
                className="block w-full text-center bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                onClick={() => setTimeout(refreshStats, 2000)}
              >
                Create New Project
              </Link>
              <Link
                to="/projects"
                className="block w-full text-center bg-gray-800 text-gray-100 border border-gray-700 px-6 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        )}
        
        {user?.role === 'freelancer' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-950 rounded-xl border border-gray-800 shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/projects"
                className="block w-full text-center bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Browse Projects
              </Link>
              <Link
                to="/certificates"
                className="block w-full text-center bg-gray-800 text-gray-100 border border-gray-700 px-6 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                View Certificates
              </Link>
            </div>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-950 rounded-xl border border-gray-800 shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Quick Tips</h3>
          <div className="space-y-3 text-gray-300">
            {user?.role === 'client' ? (
              <>
                <p className="text-sm">✓ Review contributions promptly</p>
                <p className="text-sm">✓ Generate certificates for approved work</p>
                <p className="text-sm">✓ Communicate clearly with freelancers</p>
              </>
            ) : (
              <>
                <p className="text-sm">✓ Submit quality contributions</p>
                <p className="text-sm">✓ Respond to client feedback</p>
                <p className="text-sm">✓ Build your portfolio with certificates</p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard;