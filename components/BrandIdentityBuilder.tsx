'use client'

import { useState } from 'react'
import {
  Palette, Type, Image, Sparkles, Download, Copy, Check,
  RefreshCw, ChevronRight, Eye, Edit3, Plus, Trash2,
  Wand2, BookOpen, FileText, Share2, Lock, Unlock
} from 'lucide-react'

interface BrandColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

interface BrandFont {
  name: string
  category: 'serif' | 'sans-serif' | 'display' | 'monospace'
  weights: number[]
}

interface BrandAsset {
  id: string
  type: 'logo' | 'icon' | 'pattern' | 'watermark'
  name: string
  url: string
  variants: { name: string; url: string }[]
}

interface BrandIdentity {
  id: string
  name: string
  tagline: string
  colors: BrandColors
  fonts: { heading: BrandFont; body: BrandFont }
  assets: BrandAsset[]
  guidelines: string[]
}

const FONT_OPTIONS: BrandFont[] = [
  { name: 'Inter', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Poppins', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'Montserrat', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Roboto', category: 'sans-serif', weights: [400, 500, 700] },
  { name: 'Lora', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'Space Grotesk', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'DM Sans', category: 'sans-serif', weights: [400, 500, 700] },
]

const COLOR_PALETTES = [
  { name: 'Ocean', colors: { primary: '#0077B6', secondary: '#00B4D8', accent: '#90E0EF', background: '#CAF0F8', text: '#03045E' } },
  { name: 'Forest', colors: { primary: '#2D6A4F', secondary: '#40916C', accent: '#74C69D', background: '#D8F3DC', text: '#1B4332' } },
  { name: 'Sunset', colors: { primary: '#E63946', secondary: '#F4A261', accent: '#E9C46A', background: '#FFF8F0', text: '#264653' } },
  { name: 'Midnight', colors: { primary: '#7B2CBF', secondary: '#9D4EDD', accent: '#C77DFF', background: '#10002B', text: '#E0AAFF' } },
  { name: 'Minimal', colors: { primary: '#212529', secondary: '#495057', accent: '#ADB5BD', background: '#F8F9FA', text: '#212529' } },
  { name: 'Coral', colors: { primary: '#FF6B6B', secondary: '#FFA06D', accent: '#FFE66D', background: '#FFF9F0', text: '#2D3436' } },
]

export default function BrandIdentityBuilder() {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'assets' | 'guidelines' | 'export'>('colors')
  const [brandName, setBrandName] = useState('My Brand')
  const [tagline, setTagline] = useState('Your tagline here')
  const [colors, setColors] = useState<BrandColors>(COLOR_PALETTES[0].colors)
  const [headingFont, setHeadingFont] = useState<BrandFont>(FONT_OPTIONS[0])
  const [bodyFont, setBodyFont] = useState<BrandFont>(FONT_OPTIONS[4])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const generateAIPalette = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const randomPalette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)]
    setColors(randomPalette.colors)
    setIsGenerating(false)
  }

  const copyColor = (color: string, name: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(name)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'assets', label: 'Assets', icon: Image },
    { id: 'guidelines', label: 'Guidelines', icon: BookOpen },
    { id: 'export', label: 'Export', icon: Download },
  ]

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Brand Identity Builder</h2>
              <p className="text-sm text-gray-400">Create a complete brand identity kit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Name & Tagline */}
      <div className="p-4 border-b border-gray-800 bg-gray-800/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-violet-400 border-b-2 border-violet-500 bg-violet-500/5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <div className="p-4 space-y-6">
          {/* AI Generate */}
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Color Palette</h3>
            <button
              onClick={generateAIPalette}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 rounded-lg transition-colors"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              AI Generate
            </button>
          </div>

          {/* Color Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(colors).map(([name, color]) => (
              <div key={name} className="space-y-2">
                <label className="block text-sm text-gray-400 capitalize">{name}</label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => copyColor(color, name)}
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColors({ ...colors, [name]: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono"
                    />
                  </div>
                  <button
                    onClick={() => copyColor(color, name)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    {copiedColor === name ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Preset Palettes */}
          <div>
            <h4 className="text-sm text-gray-400 mb-3">Preset Palettes</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {COLOR_PALETTES.map(palette => (
                <button
                  key={palette.name}
                  onClick={() => setColors(palette.colors)}
                  className="p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                >
                  <div className="flex gap-1 mb-2">
                    {Object.values(palette.colors).slice(0, 4).map((c, i) => (
                      <div key={i} className="w-6 h-6 rounded" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">{palette.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-800 rounded-lg p-6" style={{ backgroundColor: colors.background }}>
            <h4 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>{brandName}</h4>
            <p className="mb-4" style={{ color: colors.text }}>{tagline}</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: colors.primary }}>Primary</button>
              <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: colors.secondary }}>Secondary</button>
              <button className="px-4 py-2 rounded-lg" style={{ backgroundColor: colors.accent, color: colors.text }}>Accent</button>
            </div>
          </div>
        </div>
      )}

      {/* Typography Tab */}
      {activeTab === 'typography' && (
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Heading Font */}
            <div>
              <h3 className="font-medium mb-3">Heading Font</h3>
              <div className="space-y-2">
                {FONT_OPTIONS.filter(f => f.category !== 'monospace').map(font => (
                  <button
                    key={font.name}
                    onClick={() => setHeadingFont(font)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      headingFont.name === font.name
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-750'
                    }`}
                  >
                    <p className="font-medium" style={{ fontFamily: font.name }}>{font.name}</p>
                    <p className="text-xs text-gray-400">{font.category} · {font.weights.length} weights</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Body Font */}
            <div>
              <h3 className="font-medium mb-3">Body Font</h3>
              <div className="space-y-2">
                {FONT_OPTIONS.filter(f => f.category === 'sans-serif' || f.category === 'serif').map(font => (
                  <button
                    key={font.name}
                    onClick={() => setBodyFont(font)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      bodyFont.name === font.name
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-750'
                    }`}
                  >
                    <p style={{ fontFamily: font.name }}>{font.name}</p>
                    <p className="text-xs text-gray-400">{font.category}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Typography Preview */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-sm text-gray-400 mb-4">Preview</h4>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: headingFont.name }}>{brandName}</h1>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: headingFont.name }}>Heading Level 2</h2>
            <p className="text-gray-300 mb-2" style={{ fontFamily: bodyFont.name }}>
              This is body text using {bodyFont.name}. It should be highly readable and work well at smaller sizes for paragraphs and general content.
            </p>
            <p className="text-sm text-gray-400" style={{ fontFamily: bodyFont.name }}>
              Smaller text for captions and secondary information.
            </p>
          </div>
        </div>
      )}

      {/* Assets Tab */}
      {activeTab === 'assets' && (
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Brand Assets</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
              <Plus className="w-4 h-4" />
              Upload Asset
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Logo Primary', 'Logo Light', 'Logo Dark', 'Icon', 'Favicon', 'Watermark', 'Pattern', 'Social Avatar'].map((asset, i) => (
              <div key={asset} className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="aspect-square bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-sm font-medium">{asset}</p>
                <p className="text-xs text-gray-500">Not uploaded</p>
              </div>
            ))}
          </div>

          <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-violet-400 mt-0.5" />
              <div>
                <p className="font-medium text-violet-300">AI Logo Generation</p>
                <p className="text-sm text-gray-400">Use our AI to generate logo variations based on your brand colors and style.</p>
                <button className="mt-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm">
                  Generate Logos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guidelines Tab */}
      {activeTab === 'guidelines' && (
        <div className="p-4 space-y-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-3">Usage Guidelines</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <p>Always maintain minimum clear space around the logo equal to the height of the icon</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <p>Use the primary color palette for all main brand communications</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </div>
                <p>Do not stretch, rotate, or alter the logo proportions</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </div>
                <p>Do not use colors outside of the approved brand palette</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-3">Brand Voice</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Professional', 'Friendly', 'Innovative', 'Trustworthy'].map(trait => (
                <div key={trait} className="bg-gray-700 rounded-lg p-3 text-center">
                  <p className="font-medium text-violet-400">{trait}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="p-4 space-y-4">
          <h3 className="font-medium">Export Brand Kit</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-750 rounded-lg text-left">
              <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <p className="font-medium">Brand Guidelines PDF</p>
                <p className="text-sm text-gray-400">Complete brand book with all assets</p>
              </div>
            </button>
            <button className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-750 rounded-lg text-left">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="font-medium">Asset Package (ZIP)</p>
                <p className="text-sm text-gray-400">All logos, icons, and patterns</p>
              </div>
            </button>
            <button className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-750 rounded-lg text-left">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Share2 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="font-medium">Share Brand Portal</p>
                <p className="text-sm text-gray-400">Generate shareable link for team</p>
              </div>
            </button>
            <button className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-750 rounded-lg text-left">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Type className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="font-medium">CSS Variables</p>
                <p className="text-sm text-gray-400">Export colors as CSS custom properties</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
