"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import {
  Video,
  Users,
  LogOut,
  Plus,
  UserCircle,
  Settings,
  ChevronDown,
  Link as LinkIcon,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Extract username from email (everything before @)
  const userName = user?.email ? user.email.split('@')[0] : 'User';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
              <Video className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">MeetUp</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span>{userName}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">
                    <div className="flex items-center space-x-2">
                      <UserCircle className="w-4 h-4" />
                      <span>{user?.email}</span>
                    </div>
                  </div>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 w-full text-left">
                    <div className="flex items-center space-x-2 hover:text-blue-600">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </div>
                  </button>
                  <hr className="my-1" />
                  <button 
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 w-full text-left"
                  >
                    <div className="flex items-center space-x-2 hover:text-blue-600">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome, {userName}
          </h1>

          {/* Meeting Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Create Meeting</span>
            </button>

            <button
              onClick={() => setShowJoinModal(true)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              <LinkIcon className="w-5 h-5" />
              <span>Join Meeting</span>
            </button>
          </div>

          {/* Recent Meetings Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Recent Meetings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example Recent Meeting Card */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Team Standup</span>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Daily team sync meeting
                </p>
                <button className="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
                  Rejoin Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Meeting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Create New Meeting</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter meeting name"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Meeting Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Join Meeting</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Code
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter meeting code"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
