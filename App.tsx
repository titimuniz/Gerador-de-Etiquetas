import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MenuPaper } from './components/MenuPaper';
import { LabelsPaper } from './components/LabelsPaper';
import { MenuItem } from './types';
import { database } from './services/database';
import { Printer } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<MenuItem[]>(() => {
    return database.loadItems();
  });

  const [logo, setLogo] = useState<string | null>(null);
  const [menuBackground, setMenuBackground] = useState<string | null>(() => {
    return database.loadBackground();
  });
  
  const [title, setTitle] = useState<string>('Coffee Break');
  const [layoutMode, setLayoutMode] = useState<'menu' | 'labels' | 'labels-32'>('menu');

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
      name: name,
      selected: true
    };
    setItems(prev => [newItem, ...prev]);
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
        onToggleItem={handleToggleItem}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onLogoUpload={handleLogoUpload}
        onTitleChange={setTitle}
        currentTitle={title}
        layoutMode={layoutMode}
        onLayoutChange={setLayoutMode}
        onBackgroundUpload={handleBackgroundUpload}
        onClearBackground={handleClearBackground}
        hasBackground={!!menuBackground}
      />
      
      <main className="flex-1 overflow-auto p-4 lg:p-12 flex flex-col items-center justify-start relative">
        <div className="relative flex flex-col lg:flex-row items-start gap-8">
          
          {/* Área do Papel A4 com classe de impressão */}
          <div className="shadow-2xl bg-white print-area">
            {layoutMode === 'menu' ? (
                <MenuPaper 
                  logo={logo}
                  items={items}
                  title={title}
                  backgroundImage={menuBackground}
                />
            ) : (
                <LabelsPaper 
                  logo={logo}
                  items={items}
                  mode={layoutMode}
                />
            )}
          </div>

          {/* Botão de Imprimir Fixo ao Lado (Apenas visualização em tela) */}
          <div className="no-print lg:sticky lg:top-12 flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 min-w-[200px]">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Controles</p>
            <button 
              onClick={handlePrint}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 hover:scale-105 whitespace-nowrap"
            >
              <Printer size={28} />
              <span className="text-xl">IMPRIMIR</span>
            </button>
            <p className="text-[10px] text-gray-400 text-center max-w-[150px]">
              O sistema gera automaticamente as páginas extras se as etiquetas não couberem em uma folha.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}