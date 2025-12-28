'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles, Plus, Palette, Layers, Image, Download,
  Grid, Settings, Users, Menu, X, Wand2, Eye,
  Edit3, Trash2, Copy, Star, Clock, Folder
} from 'lucide-react'

import BrandIdentityBuilder from '@/components/BrandIdentityBuilder'
import LogoVariationGenerator from '@/components/LogoVariationGenerator'
import MockupGenerator from '@/components/MockupGenerator'
import CrossMarketingFooter from '@/components/CrossMarketingFooter'
import JavariWidget from '@/components/JavariWidget'

type ActiveView = 'dashboard' | 'create' | 'brand' | 'variations' | 'mockups' | 'projects' | 'settings'

interface Project {
  id: string
  name: string
  thumbnail: string
  updatedAt: string
  status: 'draft' | 'completed'
}

const DEMO_PROJECTS: Project[] = [
  { id: '1', name: 'TechStart Logo', thumbnail: '', updatedAt: '2024-12-27', status: 'completed' },
  { id: '2', name: 'Coffee Shop Brand', thumbnail: '', updatedAt: '2024-12-26', status: 'draft' },
  { id: '3', name: 'Fitness App Icon', thumbnail: '', updatedAt: '2024-12-25', status: 'completed' },
  { id: '4', name: 'Restaurant Logo', thumbnail: '', updatedAt: '2024-12-24', status: 'draft' },
]

export default function LogoStudioPage() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard')
  const [projects] = useState<Project[]>(DEMO_PROJECTS)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Grid },
    { id: 'create', label: 'AI Create', icon: Sparkles },
    { id: 'brand', label: 'Brand Kit', icon: Palette, badge: 'NEW' },
    { id: 'variations', label: 'Variations', icon: Layers, badge: 'NEW' },
    { id: 'mockups', label: 'Mockups', icon: Image, badge: 'NEW' },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Logo Studio Pro
            </h1>
            <span className="hidden sm:inline px-2 py-1 bg-violet-500/20 text-violet-400 text-xs rounded-full">Pro</span>
          </div>
          <button onClick={() => setActiveView('create')} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Create Logo</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-56 bg-gray-900 border-r border-gray-800 fixed md:sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto z-30`}>
          <nav className="p-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveView(item.id as ActiveView); setMobileMenuOpen(false) }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg mb-1 ${
                  activeView === item.id ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-3"><item.icon className="w-4 h-4" /><span className="text-sm">{item.label}</span></div>
                {item.badge && <span className="px-1.5 py-0.5 bg-pink-500 text-white text-xs rounded">{item.badge}</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 min-h-[calc(100vh-57px)]">
          <div className="max-w-6xl mx-auto">
            {/* Dashboard */}
            {activeView === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2"><Folder className="w-4 h-4" /><span className="text-sm">Projects</span></div>
                    <p className="text-2xl font-bold">{projects.length}</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2"><Layers className="w-4 h-4" /><span className="text-sm">Variations</span></div>
                    <p className="text-2xl font-bold text-violet-400">24</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2"><Image className="w-4 h-4" /><span className="text-sm">Mockups</span></div>
                    <p className="text-2xl font-bold text-pink-400">12</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2"><Download className="w-4 h-4" /><span className="text-sm">Exports</span></div>
                    <p className="text-2xl font-bold text-green-400">48</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => setActiveView('create')} className="flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-750 rounded-xl">
                    <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center"><Sparkles className="w-5 h-5 text-violet-400" /></div>
                    <div className="text-left"><p className="font-medium">AI Create</p></div>
                  </button>
                  <button onClick={() => setActiveView('brand')} className="flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-750 rounded-xl">
                    <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center"><Palette className="w-5 h-5 text-pink-400" /></div>
                    <div className="text-left"><p className="font-medium">Brand Kit</p></div>
                  </button>
                  <button onClick={() => setActiveView('variations')} className="flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-750 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"><Layers className="w-5 h-5 text-blue-400" /></div>
                    <div className="text-left"><p className="font-medium">Variations</p></div>
                  </button>
                  <button onClick={() => setActiveView('mockups')} className="flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-750 rounded-xl">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center"><Image className="w-5 h-5 text-amber-400" /></div>
                    <div className="text-left"><p className="font-medium">Mockups</p></div>
                  </button>
                </div>

                {/* Recent Projects */}
                <div className="bg-gray-800 rounded-xl">
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <h2 className="font-semibold">Recent Projects</h2>
                    <button onClick={() => setActiveView('projects')} className="text-sm text-violet-400">View All</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {projects.map(project => (
                      <div key={project.id} className="bg-gray-900 rounded-lg overflow-hidden group cursor-pointer">
                        <div className="aspect-square bg-gradient-to-br from-violet-500/20 to-pink-500/20 relative flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{project.name.charAt(0)}</span>
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30"><Eye className="w-4 h-4" /></button>
                            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30"><Edit3 className="w-4 h-4" /></button>
                            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30"><Download className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-sm truncate">{project.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">{project.updatedAt}</span>
                            <span className={`px-2 py-0.5 text-xs rounded ${project.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AI Create */}
            {activeView === 'create' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">AI Logo Generator</h2>
                <div className="bg-gray-800 rounded-xl p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Create Your Perfect Logo</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Describe your brand and let our AI generate unique, professional logos tailored to your vision.
                  </p>
                  <div className="max-w-xl mx-auto space-y-4">
                    <input
                      type="text"
                      placeholder="Enter your brand name..."
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                    />
                    <textarea
                      placeholder="Describe your brand (e.g., modern tech startup, eco-friendly products, luxury fashion)..."
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white resize-none"
                    />
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg font-medium">
                      <Wand2 className="w-5 h-5" />
                      Generate Logo Concepts
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'brand' && <BrandIdentityBuilder />}
            {activeView === 'variations' && <LogoVariationGenerator />}
            {activeView === 'mockups' && <MockupGenerator />}

            {/* Projects */}
            {activeView === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Projects</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg">
                    <Plus className="w-4 h-4" />
                    New Project
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projects.map(project => (
                    <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden group cursor-pointer">
                      <div className="aspect-square bg-gradient-to-br from-violet-500/20 to-pink-500/20 relative flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xl">{project.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-sm truncate">{project.name}</p>
                        <span className="text-xs text-gray-500">{project.updatedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeView === 'settings' && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Settings</h2>
                <p className="text-gray-400">Configure your workspace preferences.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <CrossMarketingFooter />
      <JavariWidget />
    </div>
  )
}
