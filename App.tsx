import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MenuPaper } from './components/MenuPaper';
import { LabelsPaper } from './components/LabelsPaper';
import { SebraePaper } from './components/SebraePaper';
import { MenuItem, FontSettings, SebraeConfig } from './types';
import { database } from './services/database';
import { Printer } from 'lucide-react';
import { THEME_COLOR } from './constants';

export default function App() {
  const [items, setItems] = useState<MenuItem[]>(() => {
    const loadedItems = database.loadItems();
    // Ensure all loaded items have a quantity field
    return loadedItems.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
  });

  const [logo, setLogo] = useState<string | null>(null);
  const [menuBackground, setMenuBackground] = useState<string | null>(() => {
    return database.loadBackground();
  });
  
  const [title, setTitle] = useState<string>('Coffee Break');
  const [layoutMode, setLayoutMode] = useState<'menu' | 'labels' | 'labels-32' | 'sebrae'>('menu');
  
  const [fontSettings, setFontSettings] = useState<FontSettings>({
    family: "'League Spartan', sans-serif",
    size: 24,
    color: THEME_COLOR,
    isBold: true,
    isUppercase: true
  });

  const [sebraeConfig, setSebraeConfig] = useState<SebraeConfig>({
    rowColors: ['#f37021', '#00a651', '#0054a6', '#ed1c24']
  });

  useEffect(() => {
    database.saveItems(items);
  }, [items]);

  useEffect(() => {
    database.saveBackground(menuBackground);
  }, [menuBackground]);

  const handleToggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleAddItem = (name: string) => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: name.trim(),
      selected: true,
      quantity: 1
    };
    setItems(prev => [newItem, ...prev]);
  };

  const handleDeselectAll = () => {
    setItems(prev => prev.map(item => ({ ...item, selected: false })));
  };

  const handleBulkAdd = (text: string) => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const newItems: MenuItem[] = lines.map((name, index) => ({
      id: (Date.now() + index).toString(),
      name: name,
      selected: true,
      quantity: 1
    }));
    
    setItems(prev => [...newItems, ...prev]);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este prato permanentemente?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuBackground(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearBackground = () => {
    setMenuBackground(null);
  };

  const handlePrint = () => {
    window.focus();
    setTimeout(() => {
      window.print();
    }, 250);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-sans">
      <Sidebar 
        items={items}
        onToggleItem= {handleToggleItem}
        onAddItem={handleAddItem}
        onBulkAdd={handleBulkAdd}
        onDeselectAll={handleDeselectAll}
        onDeleteItem={handleDeleteItem}
        onUpdateQuantity={handleUpdateQuantity}
        onLogoUpload={handleLogoUpload}
        onTitleChange={setTitle}
        currentTitle={title}
        layoutMode={layoutMode}
        onLayoutChange={setLayoutMode}
        onBackgroundUpload={handleBackgroundUpload}
        onClearBackground={handleClearBackground}
        hasBackground={!!menuBackground}
        fontSettings={fontSettings}
        onFontSettingsChange={setFontSettings}
        sebraeConfig={sebraeConfig}
        onSebraeConfigChange={setSebraeConfig}
      />
      
      <main className="flex-1 overflow-auto p-4 lg:p-12 flex flex-col items-center justify-start relative">
        <div className="relative flex flex-col lg:flex-row items-start gap-8">
          
          <div className="print-area">
            {layoutMode === 'menu' && (
                <MenuPaper 
                  logo={logo}
                  items={items}
                  title={title}
                  backgroundImage={menuBackground}
                  fontSettings={fontSettings}
                />
            )}
            {layoutMode === 'sebrae' && (
                <SebraePaper 
                  logo={logo}
                  items={items}
                  fontSettings={fontSettings}
                  sebraeConfig={sebraeConfig}
                />
            )}
            {(layoutMode === 'labels' || layoutMode === 'labels-32') && (
                <LabelsPaper 
                  logo={logo}
                  items={items}
                  mode={layoutMode}
                  fontSettings={fontSettings}
                />
            )}
          </div>

          <div className="no-print lg:sticky lg:top-12 flex flex-col items-center gap-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100 min-w-[160px]">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Controles</p>
            <button 
              onClick={handlePrint}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 hover:scale-105 whitespace-nowrap"
            >
              <Printer size={20} />
              <span className="text-lg">IMPRIMIR</span>
            </button>
            <p className="text-[9px] text-gray-400 text-center max-w-[130px] leading-tight">
              O sistema gera automaticamente páginas extras se necessário.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}