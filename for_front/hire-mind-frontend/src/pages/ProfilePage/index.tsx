import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, deleteProfile, logout, type User } from '@/api/auth';
import { Button } from '@/components/base/buttons/button';
import { useTranslation } from 'react-i18next';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { t } = useTranslation();

  // Form state for editing
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userData = await getProfile();
        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email
        });
      } catch (error) {
        setError(t('Failed to load profile. Please try logging in again.'));
        console.error('Profile fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setUpdating(true);
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      setEditMode(false);
      setSuccess(t('Profile updated successfully!'));

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(t('Failed to update profile. Please try again.'));
      console.error('Update error:', error);
    } finally {
      setUpdating(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      t('Are you sure you want to delete your account? This action cannot be undone.')
    );

    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      t('This will permanently delete all your data. Are you absolutely sure?')
    );

    if (!doubleConfirm) return;

    try {
      setDeleting(true);
      await deleteProfile();
      alert(t('Account deleted successfully'));
      navigate('/');
    } catch (error) {
      setError(t('Failed to delete account. Please try again.'));
      console.error('Delete error:', error);
    } finally {
      setDeleting(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
        navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditMode(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('Loading profile...')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('Failed to load profile')}</p>
          <Button size='xl' onClick={() => navigate('/login')}>{t('Go to Login')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Button onClick={handleBackToDashboard} size="md" color="secondary" disabled={deleting}>{t('Back to Dashboard')}</Button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            {t('Logout')}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">

          <div className="p-8">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {success}
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Profile Information */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{t('Profile Information')}</h2>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="hidden sm:inline">{t('Edit Profile')}</span>
                  </button>
                )}
              </div>

              {editMode ? (
                /* Edit Form */
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('Full Name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('Enter your full name')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('Email Address')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('Enter your email address')}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={updating}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                      {updating ? t('Updating...') : t('Save Changes')}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={updating}
                      className="flex-1 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                      {t('Cancel')}
                    </button>
                  </div>
                </form>
              ) : (
                /* View Mode */
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">{t('Full Name')}</label>
                    <p className="text-lg text-gray-800">{user.name}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">{t('Email Address')}</label>
                    <p className="text-lg text-gray-800">{user.email}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h4 className="text-lg font-medium text-red-800 text-left">{t('Delete Account')}</h4>
                    <p className="text-red-600 mt-1 text-left">
                      {t('Permanently delete your account and all associated data. This action cannot be undone.')}
                    </p>
                  </div>
                  <Button onClick={handleDeleteAccount} size="xl" color="primary-destructive" disabled={deleting}>
                    {deleting ? t('Deleting...') : t('Delete Account')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};