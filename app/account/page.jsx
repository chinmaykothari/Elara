"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { User, Mail, Lock, Bell, Book, Settings, LogOut } from "lucide-react"

const SettingsCard = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl"
  >
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    {children}
  </motion.div>
)

const MenuItem = ({ icon: Icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
      active 
        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white" 
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </button>
)

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeSection, setActiveSection] = useState("profile")

  useEffect(() => {
    const userToken = Cookies.get('userToken')
    const currentUser = Cookies.get('currentUser')

    if (!userToken || !currentUser) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(currentUser))
  }, [router])

  const handleLogout = () => {
    Cookies.remove('userToken')
    Cookies.remove('currentUser')
    router.push('/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-sky-500/5 blur-2xl"></div>
        
        {/* Metallic Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Account Settings
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400"
            >
              Manage your account preferences and settings
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-2"
            >
              <MenuItem 
                icon={User} 
                label="Profile" 
                active={activeSection === "profile"}
                onClick={() => setActiveSection("profile")}
              />
              <MenuItem 
                icon={Bell} 
                label="Notifications" 
                active={activeSection === "notifications"}
                onClick={() => setActiveSection("notifications")}
              />
              <MenuItem 
                icon={Book} 
                label="Learning Preferences" 
                active={activeSection === "preferences"}
                onClick={() => setActiveSection("preferences")}
              />
              <MenuItem 
                icon={Settings} 
                label="Account Settings" 
                active={activeSection === "settings"}
                onClick={() => setActiveSection("settings")}
              />
              <MenuItem 
                icon={LogOut} 
                label="Logout" 
                onClick={handleLogout}
              />
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {activeSection === "profile" && (
                <SettingsCard title="Profile Information">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Full Name</label>
                      <Input 
                        value={user.name}
                        className="bg-white/5 border-white/10 text-white"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Email</label>
                      <Input 
                        value={user.email}
                        className="bg-white/5 border-white/10 text-white"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Member Since</label>
                      <Input 
                        value={new Date(user.createdAt).toLocaleDateString()}
                        className="bg-white/5 border-white/10 text-white"
                        disabled
                      />
                    </div>
                  </div>
                </SettingsCard>
              )}

              {activeSection === "notifications" && (
                <SettingsCard title="Notification Preferences">
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <span className="text-slate-300">Email Notifications</span>
                      <input type="checkbox" className="form-checkbox bg-white/5 border-white/10 rounded text-cyan-500 focus:ring-cyan-500/20" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-slate-300">Session Reminders</span>
                      <input type="checkbox" className="form-checkbox bg-white/5 border-white/10 rounded text-cyan-500 focus:ring-cyan-500/20" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-slate-300">Progress Updates</span>
                      <input type="checkbox" className="form-checkbox bg-white/5 border-white/10 rounded text-cyan-500 focus:ring-cyan-500/20" />
                    </label>
                  </div>
                </SettingsCard>
              )}

              {activeSection === "preferences" && (
                <SettingsCard title="Learning Preferences">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Preferred Learning Style</label>
                      <select className="w-full bg-white/5 border-white/10 text-white rounded-lg p-2">
                        <option value="visual">Visual</option>
                        <option value="auditory">Auditory</option>
                        <option value="kinesthetic">Kinesthetic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Study Session Duration</label>
                      <select className="w-full bg-white/5 border-white/10 text-white rounded-lg p-2">
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>
                  </div>
                </SettingsCard>
              )}

              {activeSection === "settings" && (
                <SettingsCard title="Account Settings">
                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-red-500 text-red-400 hover:bg-red-500/10"
                    >
                      Delete Account
                    </Button>
                  </div>
                </SettingsCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 