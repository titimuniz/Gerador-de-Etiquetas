import React from 'react';
import { MenuItem, FontSettings } from '../types';
import { ChefHat, Wheat, Coffee, Utensils, Croissant } from 'lucide-react';

interface MenuPaperProps {
  logo: string | null;
  items: MenuItem[];
  title: string;
  backgroundImage?: string | null;
  fontSettings: FontSettings;
}

export const MenuPaper: React.FC<MenuPaperProps> = ({ logo, items, title, backgroundImage, fontSettings }) => {
  const selectedItems = items.filter(i => i.selected);

  return (
    <div 
      className={`relative mx-auto flex flex-col items-center overflow-hidden ${!backgroundImage ? 'paper-texture bg-white' : 'bg-white'}`}
      style={{ 
        width: '210mm',
        height: '297mm',
        color: fontSettings.color,
        padding: '10mm',
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
            <div className="absolute inset-4 border-4 border-double pointer-events-none opacity-80" style={{ borderColor: fontSettings.color }}></div>
            <div className="absolute inset-2 border-2 border-dashed pointer-events-none opacity-40" style={{ borderColor: fontSettings.color }}></div>
            <div className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at top left, ${fontSettings.color}, transparent 70%)` }}></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at bottom right, ${fontSettings.color}, transparent 70%)` }}></div>
        </>
      )}

      <div className="z-10 w-full h-full flex flex-col items-center justify-between py-6 px-6 relative flex-grow">
        
        <div className="flex flex-col items-center w-full space-y-2">
          {logo ? (
            <img src={logo} alt="Logo" className="h-24 object-contain max-w-[220px]" />
          ) : (
            <div className="h-20 w-40 border-2 border-dashed flex items-center justify-center opacity-30 text-xs bg-white/50">
              Logo Empresa
            </div>
          )}
          
          <div className="text-center">
            <h1 
              className="text-8xl mt-2 drop-shadow-sm" 
              style={{ fontFamily: "'Great Vibes', cursive", color: fontSettings.color }}
            >
              {title || 'Cardápio'}
            </h1>
          </div>
          
          <div className="w-24 h-1 rounded-full opacity-60" style={{ backgroundColor: fontSettings.color }}></div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center w-full my-6">
          <div 
            className="text-center w-full"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: selectedItems.length > 15 ? '0.25rem' : selectedItems.length > 10 ? '0.5rem' : '1rem',
              justifyContent: 'center'
            }}
          >
            {selectedItems.map((item) => (
              <div 
                key={item.id} 
                className="tracking-wider leading-tight"
                style={{ 
                    fontFamily: fontSettings.family,
                    fontSize: `${selectedItems.length > 20 ? Math.max(14, fontSettings.size - 6) : selectedItems.length > 15 ? Math.max(16, fontSettings.size - 4) : fontSettings.size}px`,
                    fontWeight: fontSettings.isBold ? 'bold' : 'normal',
                    textTransform: fontSettings.isUppercase ? 'uppercase' : 'none',
                    color: fontSettings.color
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {!backgroundImage && (
            <div className="w-full relative h-40 mt-2 flex items-end justify-between opacity-90" style={{ color: fontSettings.color }}>
                <div className="flex items-end -ml-2">
                    <Wheat size={120} strokeWidth={1} style={{ transform: 'rotate(-15deg)' }} />
                    <Croissant size={70} strokeWidth={1.5} className="-ml-12 mb-2" />
                </div>
                <div className="flex flex-col items-center mb-4 opacity-50">
                    <Utensils size={40} />
                    <span className="text-xs uppercase mt-2 tracking-widest">Bom Apetite</span>
                </div>
                <div className="flex items-end -mr-2">
                    <Coffee size={70} strokeWidth={1} className="mr-[-20px] mb-4" />
                    <ChefHat size={130} strokeWidth={1} style={{ transform: 'rotate(10deg)' }} />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};