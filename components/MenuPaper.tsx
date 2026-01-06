import React from 'react';
import { MenuItem } from '../types';
import { THEME_COLOR } from '../constants';
import { ChefHat, Wheat, Coffee, Utensils, Croissant } from 'lucide-react';

interface MenuPaperProps {
  logo: string | null;
  items: MenuItem[];
  title: string;
  backgroundImage?: string | null;
}

export const MenuPaper: React.FC<MenuPaperProps> = ({ logo, items, title, backgroundImage }) => {
  const selectedItems = items.filter(i => i.selected);

  return (
    <div 
      className={`relative mx-auto flex flex-col items-center overflow-hidden ${!backgroundImage ? 'paper-texture bg-white' : 'bg-white'}`}
      style={{ 
        width: '210mm',
        minHeight: '297mm',
        color: THEME_COLOR,
        padding: '2rem',
        boxSizing: 'border-box'
      }}
    >
      {/* Background Image Logic */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage} 
            alt="Fundo" 
            className="w-full h-full object-fill"
          />
        </div>
      )}

      {!backgroundImage && (
        <>
            <div className="absolute inset-4 border-4 border-double pointer-events-none opacity-80" style={{ borderColor: THEME_COLOR }}></div>
            <div className="absolute inset-2 border-2 border-dashed pointer-events-none opacity-40" style={{ borderColor: THEME_COLOR }}></div>
            <div className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at top left, ${THEME_COLOR}, transparent 70%)` }}></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at bottom right, ${THEME_COLOR}, transparent 70%)` }}></div>
        </>
      )}

      <div className="z-10 w-full h-full flex flex-col items-center justify-between py-12 px-12 relative flex-grow">
        
        <div className="flex flex-col items-center w-full space-y-4">
          {logo ? (
            <img src={logo} alt="Logo" className="h-24 object-contain max-w-[200px]" />
          ) : (
            <div className="h-24 w-48 border-2 border-dashed flex items-center justify-center opacity-30 text-sm bg-white/50">
              Logo Empresa
            </div>
          )}
          
          <div className="text-center">
            <h1 
              className="text-7xl mt-4 drop-shadow-sm" 
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {title || 'Cardápio'}
            </h1>
          </div>
          
          <div className="w-24 h-1 rounded-full opacity-60" style={{ backgroundColor: THEME_COLOR }}></div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center w-full my-8">
          <div className="space-y-4 text-center w-full">
            {selectedItems.map((item) => (
              <div 
                key={item.id} 
                className="text-lg md:text-xl font-bold uppercase tracking-wider leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {!backgroundImage && (
            <div className="w-full relative h-48 mt-4 flex items-end justify-between opacity-90">
                <div className="flex items-end -ml-4">
                    <Wheat size={120} strokeWidth={1} style={{ transform: 'rotate(-15deg)' }} />
                    <Croissant size={80} strokeWidth={1.5} className="-ml-12 mb-2" />
                </div>
                <div className="flex flex-col items-center mb-4 opacity-50">
                    <Utensils size={40} />
                    <span className="text-xs uppercase mt-2 tracking-widest">Bom Apetite</span>
                </div>
                <div className="flex items-end -mr-4">
                    <Coffee size={70} strokeWidth={1} className="mr-[-20px] mb-4" />
                    <ChefHat size={130} strokeWidth={1} style={{ transform: 'rotate(10deg)' }} />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};