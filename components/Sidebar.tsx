import React, { useState } from 'react';
import { MenuItem, FontSettings, SebraeConfig } from '../types';
import { Upload, Plus, Check, Trash2, Search, Database, Grid, FileText, LayoutGrid, Image as ImageIcon, X, ListPlus, Square, FoldVertical, Type, Bold, CaseUpper, Languages, Palette } from 'lucide-react';

interface SidebarProps {
  items: MenuItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (name: string) => void;
  onBulkAdd: (text: string) => void;
  onDeselectAll: () => void;
  onDeleteItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleChange: (title: string) => void;
  currentTitle: string;
  layoutMode: 'menu' | 'labels' | 'labels-32' | 'sebrae' | 'prisma';
  onLayoutChange: (mode: 'menu' | 'labels' | 'labels-32' | 'sebrae' | 'prisma') => void;
  onBackgroundUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearBackground?: () => void;
  hasBackground?: boolean;
  fontSettings: FontSettings;
  onFontSettingsChange: (settings: FontSettings) => void;
  sebraeConfig: SebraeConfig;
  onSebraeConfigChange: (config: SebraeConfig) => void;
}

const AVAILABLE_FONTS = [
  { name: 'League Spartan', value: "'League Spartan', sans-serif" },
  { name: 'Montserrat', value: "'Montserrat', sans-serif" },
  { name: 'Playfair Display', value: "'Playfair Display', serif" },
  { name: 'Great Vibes (Script)', value: "'Great Vibes', cursive" },
  { name: 'Sans-Serif Padrão', value: "sans-serif" },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  items, 
  onToggleItem, 
  onAddItem, 
  onBulkAdd,
  onDeselectAll,
  onDeleteItem,
  onUpdateQuantity,
  onLogoUpload,
  onTitleChange,
  currentTitle,
  layoutMode,
  onLayoutChange,
  onBackgroundUpload,
  onClearBackground,
  hasBackground,
  fontSettings,
  onFontSettingsChange,
  sebraeConfig,
  onSebraeConfigChange
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [showBulk, setShowBulk] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddItem(newItemName);
      setNewItemName('');
    }
  };

  const handleBulkSubmit = () => {
    if (bulkText.trim()) {
      onBulkAdd(bulkText);
      setBulkText('');
      setShowBulk(false);
    }
  };

  const updateFont = (updates: Partial<FontSettings>) => {
    onFontSettingsChange({ ...fontSettings, ...updates });
  };

  const updateSebraeColor = (index: number, color: string) => {
    const newColors = [...sebraeConfig.rowColors];
    newColors[index] = color;
    onSebraeConfigChange({ ...sebraeConfig, rowColors: newColors });
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="no-print w-full lg:w-96 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto shadow-lg flex flex-col">
      <div className="p-6 bg-white border-b border-gray-200 sticky top-0 z-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center lg:text-left">Editor de Cardápio</h2>
        <p className="text-sm text-gray-500 text-center lg:text-left">Configure os itens à esquerda.</p>
      </div>

      <div className="p-6 space-y-8 flex-grow">
        {/* Layout Selection */}
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                1. Modelo de Impressão
            </label>
            <div className="flex flex-col gap-2">
                <button 
                    onClick={() => onLayoutChange('menu')}
                    className={`flex items-center justify-start px-4 py-3 rounded-lg border transition-all ${layoutMode === 'menu' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                    <FileText size={18} className="mr-3" />
                    <span className="font-medium text-sm">Menu Lista (Clássico)</span>
                </button>
                
                <button 
                    onClick={() => onLayoutChange('sebrae')}
                    className={`flex items-center justify-start px-4 py-3 rounded-lg border transition-all ${layoutMode === 'sebrae' ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                    <FoldVertical size={18} className="mr-3" />
                    <div className="text-left">
                        <span className="font-medium text-sm block">Modelo SEBRAE</span>
                        <span className="text-xs opacity-75">16 p/ folha • Cores por linha</span>
                    </div>
                </button>

                <button 
                    onClick={() => onLayoutChange('prisma')}
                    className={`flex items-center justify-start px-4 py-3 rounded-lg border transition-all ${layoutMode === 'prisma' ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                    <FoldVertical size={18} className="mr-3" />
                    <div className="text-left">
                        <span className="font-medium text-sm block">Display Prisma (3 lados)</span>
                        <span className="text-xs opacity-75">12 p/ folha • Base para mesa</span>
                    </div>
                </button>

                <button 
                    onClick={() => onLayoutChange('labels')}
                    className={`flex items-center justify-start px-4 py-3 rounded-lg border transition-all ${layoutMode === 'labels' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                    <Grid size={18} className="mr-3" />
                    <span className="font-medium text-sm">Etiquetas Grandes (Grade)</span>
                </button>

                <button 
                    onClick={() => onLayoutChange('labels-32')}
                    className={`flex items-center justify-start px-4 py-3 rounded-lg border transition-all ${layoutMode === 'labels-32' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                    <LayoutGrid size={18} className="mr-3" />
                    <div className="text-left">
                        <span className="font-medium text-sm block">Etiquetas Pequenas</span>
                        <span className="text-xs opacity-75">32 por folha • 4 cópias cada</span>
                    </div>
                </button>
            </div>
        </div>

        {/* Cores SEBRAE (Apenas se SEBRAE ou Prisma selecionado) */}
        {(layoutMode === 'sebrae' || layoutMode === 'prisma') && (
          <div className={`space-y-4 bg-white p-4 rounded-xl border shadow-sm ${layoutMode === 'prisma' ? 'border-purple-200' : 'border-orange-200'}`}>
            <label className={`block text-sm font-semibold uppercase tracking-wide flex items-center gap-2 ${layoutMode === 'prisma' ? 'text-purple-700' : 'text-orange-700'}`}>
              Cores das Linhas {layoutMode === 'prisma' ? 'Prisma' : 'SEBRAE'} <Palette size={14}/>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Linha {idx + 1}</p>
                  <input 
                    type="color" 
                    value={sebraeConfig.rowColors[idx]}
                    onChange={(e) => updateSebraeColor(idx, e.target.value)}
                    className="w-full h-8 rounded border border-gray-200 cursor-pointer p-0 overflow-hidden"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estilização Section */}
        <div className="space-y-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
            2. Estilização do Texto <Type size={14}/>
          </label>
          
          <div className="space-y-4">
            {/* Seletor de Fonte */}
            <div className="space-y-1">
               <p className="text-[10px] text-gray-400 uppercase font-bold flex items-center gap-1">
                 <Languages size={10} /> Fonte Principal
               </p>
               <select 
                 value={fontSettings.family}
                 onChange={(e) => updateFont({ family: e.target.value })}
                 className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-xs focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
               >
                 {AVAILABLE_FONTS.map(f => (
                   <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                     {f.name}
                   </option>
                 ))}
               </select>
            </div>

            {/* Cor e Tamanho na mesma linha */}
            <div className="flex items-center gap-4">
               <div className="flex-1">
                 <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Cor Geral</p>
                 <div className="flex items-center gap-2">
                   <input 
                     type="color" 
                     value={fontSettings.color}
                     onChange={(e) => updateFont({ color: e.target.value })}
                     className="w-8 h-8 rounded border border-gray-200 cursor-pointer p-0 overflow-hidden"
                   />
                   <span className="text-xs text-gray-600 font-mono uppercase">{fontSettings.color}</span>
                 </div>
               </div>
               
               <div className="flex-1">
                 <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Tamanho ({fontSettings.size}px)</p>
                 <input 
                   type="range" 
                   min="12" 
                   max="60" 
                   value={fontSettings.size}
                   onChange={(e) => updateFont({ size: parseInt(e.target.value) })}
                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                 />
               </div>
            </div>

            {/* Negrito e Case */}
            <div className="flex gap-2">
              <button 
                onClick={() => updateFont({ isBold: !fontSettings.isBold })}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded border transition-all ${fontSettings.isBold ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
              >
                <Bold size={16} />
                <span className="text-xs font-bold">Negrito</span>
              </button>
              
              <button 
                onClick={() => updateFont({ isUppercase: !fontSettings.isUppercase })}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded border transition-all ${fontSettings.isUppercase ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
              >
                <CaseUpper size={16} />
                <span className="text-xs font-bold">Maiúsculas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
            3. Logo da Empresa
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-2 pb-3">
                <Upload className="w-6 h-6 mb-2 text-gray-400" />
                <p className="text-xs text-gray-500">Enviar Logo</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={onLogoUpload} />
            </label>
          </div>
        </div>

        {/* Menu Background Section (Only for Menu mode) */}
        {layoutMode === 'menu' && (
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        4. Fundo do Cardápio
                    </label>
                    {hasBackground && onClearBackground && (
                        <button onClick={onClearBackground} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                            <X size={12} /> Remover
                        </button>
                    )}
                </div>
                <div className="flex items-center justify-center w-full">
                    <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${hasBackground ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                    <div className="flex flex-col items-center justify-center pt-2 pb-3">
                        <ImageIcon className={`w-6 h-6 mb-2 ${hasBackground ? 'text-blue-500' : 'text-gray-400'}`} />
                        <p className={`text-xs ${hasBackground ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                            {hasBackground ? 'Imagem Definida' : 'Enviar Fundo Personalizado'}
                        </p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={onBackgroundUpload} />
                    </label>
                </div>
            </div>
        )}

        {/* Title Section (Only for Menu mode) */}
        {layoutMode === 'menu' && (
            <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                5. Título do Cabeçalho
            </label>
            <input 
                type="text" 
                value={currentTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: Coffee Break"
            />
            </div>
        )}

        {/* Items Section */}
        <div className="space-y-4 pb-12">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
              {layoutMode === 'menu' ? '6.' : '4.'} Banco de Pratos <Database size={14} className="text-gray-400"/>
            </label>
            <div className="flex items-center gap-2">
              <button 
                onClick={onDeselectAll}
                className="text-[10px] bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded transition-colors flex items-center gap-1 border border-red-100"
                title="Desmarcar todos os itens"
              >
                <Square size={10} /> Limpar Seleção
              </button>
              <button 
                onClick={() => setShowBulk(!showBulk)}
                className="text-[10px] bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded transition-colors flex items-center gap-1"
              >
                <ListPlus size={10} /> {showBulk ? 'Fechar' : 'Importar Lista'}
              </button>
            </div>
          </div>
          
          {showBulk ? (
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 space-y-2">
              <p className="text-[10px] text-amber-800 font-bold uppercase">Colar Lista de Itens (um por linha):</p>
              <textarea 
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                rows={5}
                className="w-full p-2 text-xs border border-amber-200 rounded focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                placeholder="Água&#10;Café&#10;Sanduíche de Frango..."
              />
              <button 
                onClick={handleBulkSubmit}
                disabled={!bulkText.trim()}
                className="w-full bg-amber-600 text-white py-2 rounded text-xs font-bold hover:bg-amber-700 disabled:opacity-50 transition-colors"
              >
                ADICIONAR TODOS OS ITENS
              </button>
            </div>
          ) : (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-800 mb-2 font-medium">Cadastrar Novo Prato:</p>
              <form onSubmit={handleAddSubmit} className="flex gap-2">
                <input 
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Nome do prato..."
                  className="flex-1 p-2 border border-blue-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button 
                  type="submit"
                  disabled={!newItemName.trim()}
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </form>
            </div>
          )}

          <hr className="border-gray-100 my-2"/>

          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`flex items-center justify-between p-3 rounded border transition-all ${item.selected ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                >
                  <div 
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                    onClick={() => onToggleItem(item.id)}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.selected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                      {item.selected && <Check size={14} className="text-white" />}
                    </div>
                    <span className={`text-sm ${item.selected ? 'font-semibold text-blue-900' : 'text-gray-600'}`}>
                      {item.name}
                    </span>
                  </div>

                  {item.selected && layoutMode !== 'menu' && (
                    <div className="flex items-center gap-1 mr-2 bg-white border border-blue-200 rounded px-1 py-0.5 shadow-sm">
                      <span className="text-[9px] font-bold text-blue-400 uppercase">Qtd:</span>
                      <input 
                        type="number" 
                        min="1" 
                        max="99"
                        value={item.quantity || 1}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 text-center text-xs font-bold text-blue-700 focus:outline-none bg-transparent"
                      />
                    </div>
                  )}

                  <button 
                    onClick={() => onDeleteItem(item.id)}
                    className="text-gray-300 hover:text-red-500 p-1 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Nenhum prato encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};