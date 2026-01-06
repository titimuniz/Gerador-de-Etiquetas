import React from 'react';
import { MenuItem } from '../types';
import { THEME_COLOR } from '../constants';

interface LabelsPaperProps {
  logo: string | null;
  items: MenuItem[];
  mode?: 'labels' | 'labels-32';
}

export const LabelsPaper: React.FC<LabelsPaperProps> = ({ logo, items, mode = 'labels' }) => {
  const isSmall = mode === 'labels-32';
  const baseItems = items.filter(i => i.selected);

  const displayItems = isSmall 
    ? baseItems.flatMap(item => [
        { ...item, id: `${item.id}-1` },
        { ...item, id: `${item.id}-2` },
        { ...item, id: `${item.id}-3` },
        { ...item, id: `${item.id}-4` }
      ])
    : baseItems;

  const gridClasses = isSmall 
    ? "grid grid-cols-4"
    : "grid grid-cols-3 gap-1 p-8";

  // Altura calculada para caber aproximadamente 8 linhas na folha A4 (37mm x 8 = 296mm)
  const itemHeightClass = isSmall 
    ? "h-[37mm]" 
    : "aspect-[4/3] mb-4";

  return (
    <div 
      className="bg-white relative mx-auto"
      style={{ 
        width: '210mm',
        minHeight: '297mm', // Altura mínima de uma folha A4, cresce se necessário
        color: THEME_COLOR,
        padding: isSmall ? '0' : '0',
        boxSizing: 'border-box'
      }}
    >
      <div className={gridClasses}>
        {displayItems.map((item, index) => (
          <div 
            key={`${item.id}-${index}`}
            className={`flex flex-col items-center justify-between bg-white text-center break-inside-avoid relative p-2 border border-gray-100 ${itemHeightClass}`}
            style={{ 
              borderColor: isSmall ? '#f3f4f6' : THEME_COLOR,
              borderWidth: isSmall ? '0.5px' : '4px'
            }}
          >
            <div className={`flex-shrink-0 w-full flex items-center justify-center ${isSmall ? 'h-6 mb-1' : 'h-16 mb-2'}`}>
              {logo ? (
                <img src={logo} alt="Logo" className="h-full object-contain max-w-[90%]" />
              ) : (
                <div className="h-full w-full flex items-center justify-center opacity-10 text-[8px]">
                  Logo
                </div>
              )}
            </div>

            <div className="flex-grow flex flex-col items-center justify-center w-full overflow-hidden">
              <h3 
                className="font-bold uppercase leading-tight"
                style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isSmall 
                        ? (item.name.length > 20 ? '0.65rem' : '0.85rem')
                        : (item.name.length > 25 ? '1.1rem' : '1.5rem')
                }}
              >
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {displayItems.length === 0 && (
         <div className="absolute inset-0 flex items-center justify-center opacity-30 italic">
            Nenhum item selecionado para as etiquetas.
         </div>
      )}
    </div>
  );
};