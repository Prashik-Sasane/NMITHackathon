import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Lock, Save, Eye, EyeOff } from 'lucide-react'
import './Dashboard.css'

const Dashboard = () => {
  const { user, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const result = await updateProfile(profileData)
    
    if (result.success) {
      setMessage('Profile updated successfully!')
    } else {
      setMessage(result.error || 'Update failed')
    }
    
    setLoading(false)
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match')
      setLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long')
      setLoading(false)
      return
    }

    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword)
    
    if (result.success) {
      setMessage('Password updated successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } else {
      setMessage(result.error || 'Password update failed')
    }
    
    setLoading(false)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <nav className="dashboard-nav">
              <button
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="nav-icon" />
                Profile Settings
              </button>
              <button
                className={`nav-item ${activeTab === 'password' ? 'active' : ''}`}
                onClick={() => setActiveTab('password')}
              >
                <Lock className="nav-icon" />
                Change Password
              </button>
            </nav>
          </div>

          <div className="dashboard-main">
            {message && (
              <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="dashboard-section">
                <h2>Profile Settings</h2>
                <form onSubmit={handleProfileSubmit} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <div className="input-group">
                      <User className="input-icon" />
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={profileData.username}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-group">
                      <Mail className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="save-button"
                    disabled={loading}
                  >
                    <Save className="button-icon" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="dashboard-section">
                <h2>Change Password</h2>
                <form onSubmit={handlePasswordSubmit} className="password-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <div className="input-group">
                      <Lock className="input-icon" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="input-group">
                      <Lock className="input-icon" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <div className="input-group">
                      <Lock className="input-icon" />
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="save-button"
                    disabled={loading}
                  >
                    <Save className="button-icon" />
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
