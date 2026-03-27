import React from 'react';
import { MenuItem, FontSettings } from '../types';

interface LabelsPaperProps {
  logo: string | null;
  items: MenuItem[];
  mode?: 'labels' | 'labels-32';
  fontSettings: FontSettings;
}

export const LabelsPaper: React.FC<LabelsPaperProps> = ({ logo, items, mode = 'labels', fontSettings }) => {
  const isSmall = mode === 'labels-32';
  const baseItems = items.filter(i => i.selected);

  // Cada item selecionado gera o número de cópias definido em item.quantity
  const displayItems = baseItems.flatMap(item => 
    Array.from({ length: item.quantity || 1 }).map((_, i) => ({
      ...item,
      id: `${item.id}-${i}`
    }))
  );

  // Grid com gap para etiquetas pequenas
  const gridClasses = isSmall 
    ? "grid grid-cols-4 gap-2 p-4"
    : "grid grid-cols-3 gap-1 p-8";

  // Altura ajustada para compensar o novo gap e padding no modo de 32 etiquetas
  const itemHeightStyle = isSmall 
    ? { height: '34.2mm' } 
    : { minHeight: '150px', aspectRatio: '4/3' };

  return (
    <div 
      className="bg-white relative mx-auto"
      style={{ 
        width: '210mm',
        minHeight: '297mm',
        color: fontSettings.color,
        padding: '0',
        boxSizing: 'border-box'
      }}
    >
      <div className={gridClasses}>
        {displayItems.map((item, index) => (
          <div 
            key={`${item.id}-${index}`}
            className={`flex flex-col items-center justify-between bg-white text-center break-inside-avoid relative p-3 border mb-0 ${!isSmall ? 'mb-4' : ''} rounded-sm shadow-sm`}
            style={{ 
              ...itemHeightStyle,
              borderColor: fontSettings.color,
              borderWidth: isSmall ? '2px' : '4px',
              borderStyle: 'solid',
              boxSizing: 'border-box'
            }}
          >
            {/* Logo area */}
            <div className={`flex-shrink-0 w-full flex items-center justify-center ${isSmall ? 'h-8 mb-1' : 'h-16 mb-2'}`}>
              {logo ? (
                <img src={logo} alt="Logo" className="h-full object-contain max-w-[90%]" />
              ) : (
                <div className="h-full w-full flex items-center justify-center opacity-10 text-[8px]">
                  Logo
                </div>
              )}
            </div>

            {/* Item Name area */}
            <div className="flex-grow flex flex-col items-center justify-center w-full overflow-hidden px-1">
              <h3 
                className="leading-tight"
                style={{ 
                    fontFamily: fontSettings.family,
                    fontSize: isSmall ? `${Math.max(12, fontSettings.size - 8)}px` : `${fontSettings.size}px`,
                    fontWeight: fontSettings.isBold ? 'bold' : 'normal',
                    textTransform: fontSettings.isUppercase ? 'uppercase' : 'none',
                    color: fontSettings.color
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