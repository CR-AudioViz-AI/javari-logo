'use client'

import { useState } from 'react'
import {
  Image, Monitor, Smartphone, Shirt, Coffee, Package,
  CreditCard, FileText, Building2, Car, ShoppingBag,
  Download, RefreshCw, Sparkles, Eye, Grid, List,
  Plus, Trash2, Edit3, Maximize2, ChevronRight
} from 'lucide-react'

interface MockupTemplate {
  id: string
  name: string
  category: string
  icon: React.ReactNode
  preview: string
  premium: boolean
}

interface GeneratedMockup {
  id: string
  template: string
  preview: string
  createdAt: string
}

const MOCKUP_CATEGORIES = [
  { id: 'all', name: 'All', icon: Grid },
  { id: 'digital', name: 'Digital', icon: Monitor },
  { id: 'print', name: 'Print', icon: FileText },
  { id: 'apparel', name: 'Apparel', icon: Shirt },
  { id: 'packaging', name: 'Packaging', icon: Package },
  { id: 'signage', name: 'Signage', icon: Building2 },
]

const MOCKUP_TEMPLATES: MockupTemplate[] = [
  { id: '1', name: 'MacBook Pro', category: 'digital', icon: <Monitor className="w-6 h-6" />, preview: '', premium: false },
  { id: '2', name: 'iPhone 15', category: 'digital', icon: <Smartphone className="w-6 h-6" />, preview: '', premium: false },
  { id: '3', name: 'iPad Pro', category: 'digital', icon: <Monitor className="w-6 h-6" />, preview: '', premium: false },
  { id: '4', name: 'Business Card', category: 'print', icon: <CreditCard className="w-6 h-6" />, preview: '', premium: false },
  { id: '5', name: 'Letterhead', category: 'print', icon: <FileText className="w-6 h-6" />, preview: '', premium: false },
  { id: '6', name: 'Envelope', category: 'print', icon: <FileText className="w-6 h-6" />, preview: '', premium: true },
  { id: '7', name: 'T-Shirt', category: 'apparel', icon: <Shirt className="w-6 h-6" />, preview: '', premium: false },
  { id: '8', name: 'Hoodie', category: 'apparel', icon: <Shirt className="w-6 h-6" />, preview: '', premium: true },
  { id: '9', name: 'Cap', category: 'apparel', icon: <Shirt className="w-6 h-6" />, preview: '', premium: true },
  { id: '10', name: 'Coffee Cup', category: 'packaging', icon: <Coffee className="w-6 h-6" />, preview: '', premium: false },
  { id: '11', name: 'Shopping Bag', category: 'packaging', icon: <ShoppingBag className="w-6 h-6" />, preview: '', premium: false },
  { id: '12', name: 'Box Package', category: 'packaging', icon: <Package className="w-6 h-6" />, preview: '', premium: true },
  { id: '13', name: 'Office Building', category: 'signage', icon: <Building2 className="w-6 h-6" />, preview: '', premium: true },
  { id: '14', name: 'Store Front', category: 'signage', icon: <Building2 className="w-6 h-6" />, preview: '', premium: true },
  { id: '15', name: 'Vehicle Wrap', category: 'signage', icon: <Car className="w-6 h-6" />, preview: '', premium: true },
]

export default function MockupGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
  const [generatedMockups, setGeneratedMockups] = useState<GeneratedMockup[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [brandName, setBrandName] = useState('My Brand')
  const [logoColor, setLogoColor] = useState('#7c3aed')

  const filteredTemplates = MOCKUP_TEMPLATES.filter(
    t => selectedCategory === 'all' || t.category === selectedCategory
  )

  const toggleTemplate = (id: string) => {
    setSelectedTemplates(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const generateMockups = async () => {
    if (selectedTemplates.length === 0) return
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newMockups: GeneratedMockup[] = selectedTemplates.map(templateId => {
      const template = MOCKUP_TEMPLATES.find(t => t.id === templateId)!
      return {
        id: `mockup_${Date.now()}_${templateId}`,
        template: template.name,
        preview: '',
        createdAt: new Date().toISOString()
      }
    })
    
    setGeneratedMockups(prev => [...newMockups, ...prev])
    setSelectedTemplates([])
    setIsGenerating(false)
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Image className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Mockup Generator</h2>
              <p className="text-sm text-gray-400">Preview your logo on real products</p>
            </div>
          </div>

          {selectedTemplates.length > 0 && (
            <button
              onClick={generateMockups}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-lg transition-colors"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate {selectedTemplates.length} Mockups
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Logo Preview & Settings */}
      <div className="p-4 border-b border-gray-800 bg-gray-800/50">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Logo Preview */}
          <div className="flex-shrink-0">
            <div
              className="w-24 h-24 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: logoColor + '20' }}
            >
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: logoColor }}
              >
                <span className="text-white font-bold text-2xl">{brandName.charAt(0)}</span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Logo Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={logoColor}
                  onChange={(e) => setLogoColor(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={logoColor}
                  onChange={(e) => setLogoColor(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex flex-wrap gap-2">
          {MOCKUP_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">
            Select Templates
            {selectedTemplates.length > 0 && (
              <span className="ml-2 text-amber-400">({selectedTemplates.length} selected)</span>
            )}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1'}`}>
          {filteredTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => !template.premium && toggleTemplate(template.id)}
              disabled={template.premium}
              className={`relative rounded-lg overflow-hidden transition-all ${
                viewMode === 'grid' ? 'aspect-square' : 'flex items-center gap-4 p-4'
              } ${
                selectedTemplates.includes(template.id)
                  ? 'ring-2 ring-amber-500 bg-amber-500/10'
                  : template.premium
                  ? 'bg-gray-800/50 opacity-60 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-gray-750 cursor-pointer'
              }`}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-700/50">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: logoColor }}
                    >
                      <span className="text-white font-bold">{brandName.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-sm font-medium">{template.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{template.category}</p>
                  </div>
                  {template.premium && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500 text-black text-xs font-medium rounded">
                      PRO
                    </div>
                  )}
                  {selectedTemplates.includes(template.id) && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: logoColor + '20' }}
                  >
                    {template.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-gray-400 capitalize">{template.category}</p>
                  </div>
                  {template.premium ? (
                    <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-medium rounded">PRO</span>
                  ) : selectedTemplates.includes(template.id) ? (
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Mockups */}
      {generatedMockups.length > 0 && (
        <div className="p-4 border-t border-gray-800">
          <h3 className="font-medium mb-4">Generated Mockups ({generatedMockups.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {generatedMockups.map(mockup => (
              <div key={mockup.id} className="bg-gray-800 rounded-lg overflow-hidden group">
                <div className="aspect-square bg-gray-700 flex items-center justify-center relative">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: logoColor }}
                  >
                    <span className="text-white font-bold text-xl">{brandName.charAt(0)}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm">{mockup.template}</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
