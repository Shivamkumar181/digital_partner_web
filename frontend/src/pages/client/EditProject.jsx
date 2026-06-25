import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectById } from '../../redux/slices/projectSlice'
import axios from 'axios'
import toast from 'react-hot-toast'

const EditProject = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector(s => s.auth)
  const { currentProject } = useSelector(s => s.projects)
  const [loading, setLoading] = useState(false)
  const [imageFiles, setImageFiles] = useState([])
  const [formData, setFormData] = useState({
    title: '', description: '', budget: '', category: '', skills: '', deadline: ''
  })

  useEffect(() => {
    dispatch(fetchProjectById(id))
  }, [id])

  useEffect(() => {
    if (currentProject) {
      setFormData({
        title: currentProject.title || '',
        description: currentProject.description || '',
        budget: currentProject.budget || '',
        category: currentProject.category || '',
        skills: currentProject.skills?.join(', ') || '',
        deadline: currentProject.deadline?.split('T')[0] || ''
      })
    }
  }, [currentProject])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.put(`/api/projects/${id}`, formData,
        { headers: { Authorization: `Bearer ${token}` } })
      
      // Upload new images if any
      if (imageFiles.length > 0) {
        const fd = new FormData()
        imageFiles.forEach(f => fd.append('images', f))
        await axios.post(`/api/projects/${id}/images`, fd,
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
      }

      toast.success('Project updated!')
      navigate(`/projects/${id}`)
    } catch (err) {
      toast.error('Update failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteImage = async (publicId) => {
    await axios.delete(`/api/projects/${id}/images/${publicId}`,
      { headers: { Authorization: `Bearer ${token}` } })
    dispatch(fetchProjectById(id))
    toast.success('Image removed')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Project</h1>

        {/* Existing images */}
        {currentProject?.images?.length > 0 && (
          <div className="mb-6">
            <p className="font-semibold mb-2 text-gray-700">Current Images</p>
            <div className="flex gap-3 flex-wrap">
              {currentProject.images.map((img) => (
                <div key={img.publicId} className="relative">
                  <img src={img.url} className="w-24 h-24 object-cover rounded-lg border" alt="" />
                  <button
                    onClick={() => handleDeleteImage(img.publicId)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Add Images</label>
          <input type="file" multiple accept="image/*"
            onChange={e => setImageFiles(Array.from(e.target.files))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          {imageFiles.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {imageFiles.map((f, i) => (
                <img key={i} src={URL.createObjectURL(f)}
                  className="w-20 h-20 object-cover rounded-lg border border-indigo-300" alt="" />
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Title</label>
            <input type="text" value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea rows="5" value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Budget ($)</label>
              <input type="number" value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Deadline</label>
              <input type="date" value={formData.deadline}
                onChange={e => setFormData({...formData, deadline: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Skills (comma separated)</label>
            <input type="text" value={formData.skills}
              onChange={e => setFormData({...formData, skills: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex gap-4 pt-2">
            <button type="submit" disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => navigate(`/projects/${id}`)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default EditProject;