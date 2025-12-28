'use client'

import { useState } from 'react'
import {
  Sparkles, RefreshCw, Download, Copy, Check, Grid,
  Layers, Sun, Moon, Square, Circle, Hexagon,
  Maximize2, Minimize2, RotateCcw, Palette, Zap,
  Eye, Edit3, Trash2, Plus, Image, Lock
} from 'lucide-react'

interface LogoVariation {
  id: string
  name: string
  type: 'primary' | 'secondary' | 'icon' | 'wordmark' | 'monochrome' | 'reversed'
  preview: string
  backgroundColor: string
  locked: boolean
}

interface GenerationSettings {
  style: 'modern' | 'classic' | 'minimal' | 'bold' | 'playful'
  shape: 'square' | 'circle' | 'hexagon' | 'custom'
  includeText: boolean
  colorScheme: 'brand' | 'monochrome' | 'gradient'
}

const STYLE_OPTIONS = [
  { id: 'modern', label: 'Modern', description: 'Clean lines, geometric shapes' },
  { id: 'classic', label: 'Classic', description: 'Timeless, elegant design' },
  { id: 'minimal', label: 'Minimal', description: 'Simple, stripped-down' },
  { id: 'bold', label: 'Bold', description: 'Strong, impactful presence' },
  { id: 'playful', label: 'Playful', description: 'Fun, creative energy' },
]

const SHAPE_OPTIONS = [
  { id: 'square', icon: Square, label: 'Square' },
  { id: 'circle', icon: Circle, label: 'Circle' },
  { id: 'hexagon', icon: Hexagon, label: 'Hexagon' },
  { id: 'custom', icon: Layers, label: 'Custom' },
]

const DEMO_VARIATIONS: LogoVariation[] = [
  { id: '1', name: 'Primary Logo', type: 'primary', preview: '', backgroundColor: '#1a1a2e', locked: true },
  { id: '2', name: 'Light Background', type: 'secondary', preview: '', backgroundColor: '#ffffff', locked: false },
  { id: '3', name: 'Icon Only', type: 'icon', preview: '', backgroundColor: '#1a1a2e', locked: false },
  { id: '4', name: 'Wordmark', type: 'wordmark', preview: '', backgroundColor: '#1a1a2e', locked: false },
  { id: '5', name: 'Monochrome', type: 'monochrome', preview: '', backgroundColor: '#f5f5f5', locked: false },
  { id: '6', name: 'Reversed', type: 'reversed', preview: '', backgroundColor: '#000000', locked: false },
]

export default function LogoVariationGenerator() {
  const [variations, setVariations] = useState<LogoVariation[]>(DEMO_VARIATIONS)
  const [selectedVariation, setSelectedVariation] = useState<LogoVariation | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [settings, setSettings] = useState<GenerationSettings>({
    style: 'modern',
    shape: 'square',
    includeText: true,
    colorScheme: 'brand'
  })
  const [activeTab, setActiveTab] = useState<'variations' | 'generate' | 'export'>('variations')
  const [brandName, setBrandName] = useState('My Brand')

  const generateVariations = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    // In real app, this would call AI generation API
    setIsGenerating(false)
  }

  const toggleLock = (id: string) => {
    setVariations(prev => prev.map(v =>
      v.id === id ? { ...v, locked: !v.locked } : v
    ))
  }

  const deleteVariation = (id: string) => {
    setVariations(prev => prev.filter(v => v.id !== id))
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-violet-500/20 text-violet-400',
      secondary: 'bg-blue-500/20 text-blue-400',
      icon: 'bg-green-500/20 text-green-400',
      wordmark: 'bg-orange-500/20 text-orange-400',
      monochrome: 'bg-gray-500/20 text-gray-400',
      reversed: 'bg-pink-500/20 text-pink-400'
    }
    return colors[type] || colors.primary
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Logo Variation Generator</h2>
              <p className="text-sm text-gray-400">Create multiple logo versions automatically</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Name Input */}
      <div className="p-4 border-b border-gray-800 bg-gray-800/50">
        <label className="block text-sm text-gray-400 mb-1">Brand Name</label>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Enter your brand name"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        {[
          { id: 'variations', label: 'Variations', icon: Grid },
          { id: 'generate', label: 'Generate New', icon: Sparkles },
          { id: 'export', label: 'Export All', icon: Download }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-pink-400 border-b-2 border-pink-500 bg-pink-500/5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Variations Tab */}
      {activeTab === 'variations' && (
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {variations.map(variation => (
              <div
                key={variation.id}
                className={`bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedVariation?.id === variation.id ? 'ring-2 ring-pink-500' : ''
                }`}
                onClick={() => setSelectedVariation(variation)}
              >
                <div
                  className="aspect-square flex items-center justify-center relative group"
                  style={{ backgroundColor: variation.backgroundColor }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{brandName.charAt(0)}</span>
                    </div>
                    {(variation.type === 'primary' || variation.type === 'secondary' || variation.type === 'wordmark') && (
                      <p className="font-semibold" style={{ color: variation.backgroundColor === '#ffffff' ? '#1a1a2e' : '#ffffff' }}>
                        {brandName}
                      </p>
                    )}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLock(variation.id) }}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30"
                    >
                      {variation.locked ? <Lock className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Lock Badge */}
                  {variation.locked && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-4 h-4 text-yellow-400" />
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{variation.name}</p>
                    <span className={`px-2 py-0.5 text-xs rounded ${getTypeColor(variation.type)}`}>
                      {variation.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add New */}
            <button className="aspect-square bg-gray-800 rounded-lg border-2 border-dashed border-gray-700 hover:border-pink-500 flex items-center justify-center transition-colors">
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Add Variation</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Generate Tab */}
      {activeTab === 'generate' && (
        <div className="p-4 space-y-6">
          {/* Style Selection */}
          <div>
            <h3 className="font-medium mb-3">Logo Style</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {STYLE_OPTIONS.map(style => (
                <button
                  key={style.id}
                  onClick={() => setSettings({ ...settings, style: style.id as any })}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    settings.style === style.id
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-750'
                  }`}
                >
                  <p className="font-medium text-sm">{style.label}</p>
                  <p className="text-xs opacity-70">{style.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Shape Selection */}
          <div>
            <h3 className="font-medium mb-3">Icon Shape</h3>
            <div className="flex gap-2">
              {SHAPE_OPTIONS.map(shape => (
                <button
                  key={shape.id}
                  onClick={() => setSettings({ ...settings, shape: shape.id as any })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    settings.shape === shape.id
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-750'
                  }`}
                >
                  <shape.icon className="w-4 h-4" />
                  {shape.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div>
            <h3 className="font-medium mb-3">Options</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.includeText}
                  onChange={(e) => setSettings({ ...settings, includeText: e.target.checked })}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-pink-500 focus:ring-pink-500"
                />
                <div>
                  <p className="font-medium">Include Brand Name</p>
                  <p className="text-sm text-gray-400">Generate variations with text</p>
                </div>
              </label>

              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="font-medium mb-2">Color Scheme</p>
                <div className="flex gap-2">
                  {['brand', 'monochrome', 'gradient'].map(scheme => (
                    <button
                      key={scheme}
                      onClick={() => setSettings({ ...settings, colorScheme: scheme as any })}
                      className={`px-3 py-1.5 rounded-lg text-sm capitalize ${
                        settings.colorScheme === scheme
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {scheme}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateVariations}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 disabled:opacity-50 rounded-lg font-medium transition-colors"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating Variations...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate 6 Variations
              </>
            )}
          </button>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="p-4 space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-3">Export Options</h3>
            <div className="space-y-2">
              {[
                { format: 'SVG', desc: 'Scalable vector format', recommended: true },
                { format: 'PNG', desc: 'Transparent background', recommended: true },
                { format: 'JPG', desc: 'With background color', recommended: false },
                { format: 'PDF', desc: 'Print-ready format', recommended: false },
              ].map(opt => (
                <div key={opt.format} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked={opt.recommended} className="w-4 h-4 rounded" />
                    <div>
                      <p className="font-medium">{opt.format}</p>
                      <p className="text-xs text-gray-400">{opt.desc}</p>
                    </div>
                  </div>
                  {opt.recommended && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">Recommended</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-3">Size Presets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['1024px', '512px', '256px', '128px', '64px', '32px', 'Favicon', 'Social'].map(size => (
                <label key={size} className="flex items-center gap-2 p-2 bg-gray-900 rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-medium">
            <Download className="w-5 h-5" />
            Download All ({variations.length} variations)
          </button>
        </div>
      )}
    </div>
  )
}
