import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Upload, Plus, Check, Trash2, Search, Database, Grid, FileText, LayoutGrid, Image as ImageIcon, X } from 'lucide-react';

interface SidebarProps {
  items: MenuItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (name: string) => void;
  onDeleteItem: (id: string) => void;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleChange: (title: string) => void;
  currentTitle: string;
  layoutMode: 'menu' | 'labels' | 'labels-32';
  onLayoutChange: (mode: 'menu' | 'labels' | 'labels-32') => void;
  onBackgroundUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearBackground?: () => void;
  hasBackground?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  items, 
  onToggleItem, 
  onAddItem, 
  onDeleteItem,
  onLogoUpload,
  onTitleChange,
  currentTitle,
  layoutMode,
  onLayoutChange,
  onBackgroundUpload,
  onClearBackground,
  hasBackground
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddItem(newItemName);
      setNewItemName('');
    }
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

        {/* Logo Section */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
            2. Logo da Empresa
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
                        3. Fundo do Cardápio
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
                4. Título do Cabeçalho
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
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
            {layoutMode === 'menu' ? '5.' : '3.'} Banco de Pratos <Database size={14} className="text-gray-400"/>
          </label>
          
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