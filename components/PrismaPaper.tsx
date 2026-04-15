import React from 'react';
import { MenuItem, FontSettings, SebraeConfig } from '../types';

interface PrismaPaperProps {
  logo: string | null;
  items: MenuItem[];
  fontSettings: FontSettings;
  sebraeConfig: SebraeConfig;
}

export const PrismaPaper: React.FC<PrismaPaperProps> = ({ logo, items, fontSettings, sebraeConfig }) => {
  const selectedItems = items.filter(i => i.selected);
  
  // Flatten items based on their quantity
  const flattenedItems = selectedItems.flatMap(item => 
    Array.from({ length: item.quantity || 1 }).map((_, i) => ({
      ...item,
      uniqueId: `${item.id}-${i}`
    }))
  );
  
  // Modelo PRISMA (Display de Mesa):
  // 3 fileiras horizontais por página (para caber os 3 lados).
  // 4 etiquetas por fileira.
  const rowsPerPage = 3;
  const tagsPerRow = 4;
  const itemsPerPage = rowsPerPage * tagsPerRow;

  const pages = Math.ceil(flattenedItems.length / itemsPerPage) || 1;

  /**
   * DIMENSÕES PRISMA (3 Lados)
   * Altura Total Etiqueta: ~96.5mm
   * Borda Externa (Topo/Fundo): 3mm cada
   * Faixas de Dobra (2x): 4mm cada
   * Faces (3x): 27.5mm cada (Frente, Verso, Base em branco)
   */
  const BORDER_THICKNESS = '3mm';
  const TAG_TOTAL_HEIGHT = '96.5mm'; 
  const FOLD_GAP_HEIGHT = '4mm'; 
  const FACE_HEIGHT = '27.5mm'; 
  const VERTICAL_ROW_GAP = '2mm'; 
  const HORIZONTAL_TAG_GAP = '2mm';

  return (
    <div className="flex flex-col gap-8 print:gap-0 bg-gray-200 print:bg-transparent p-4 print:p-0">
      {Array.from({ length: pages }).map((_, pageIdx) => {
        const pageItems = flattenedItems.slice(pageIdx * itemsPerPage, (pageIdx + 1) * itemsPerPage);
        
        return (
          <div 
            key={`page-${pageIdx}`}
            className="bg-white relative mx-auto print:shadow-none break-after-page shadow-xl overflow-hidden"
            style={{ 
              width: '210mm',
              height: '297mm',
              padding: '4mm 5mm',
              boxSizing: 'border-box'
            }}
          >
            <div className="flex flex-col">
              {Array.from({ length: rowsPerPage }).map((_, rowIdx) => {
                const rowItems = pageItems.slice(rowIdx * tagsPerRow, (rowIdx + 1) * tagsPerRow);
                const color = sebraeConfig.rowColors[rowIdx] || '#000000';
                const hasGapAfter = rowIdx < rowsPerPage - 1;
                
                if (rowItems.length === 0) return null;

                return (
                  <div 
                    key={`row-${rowIdx}`} 
                    className="grid grid-cols-4"
                    style={{ 
                      marginBottom: hasGapAfter ? VERTICAL_ROW_GAP : '0',
                      columnGap: HORIZONTAL_TAG_GAP,
                      height: TAG_TOTAL_HEIGHT,
                      boxSizing: 'border-box'
                    }}
                  >
                    {Array.from({ length: tagsPerRow }).map((_, colIdx) => {
                      const item = rowItems[colIdx];
                      if (!item) return <div key={`empty-${rowIdx}-${colIdx}`} style={{ height: TAG_TOTAL_HEIGHT }} />;

                      return (
                        <div 
                          key={`tag-${rowIdx}-${colIdx}-${item.uniqueId}`}
                          className="flex flex-col break-inside-avoid relative"
                          style={{ 
                            height: TAG_TOTAL_HEIGHT,
                            boxSizing: 'border-box',
                            border: `${BORDER_THICKNESS} solid ${color}`,
                          }} 
                        >
                          {/* Face Superior (Invertida) */}
                          <div 
                            className="flex flex-col items-center justify-between p-1 py-1 text-center"
                            style={{ 
                              height: FACE_HEIGHT,
                              transform: 'rotate(180deg)',
                              backgroundColor: 'white',
                              boxSizing: 'border-box'
                            }}
                          >
                            <h2 
                              className="leading-[0.9] tracking-tighter px-1 mt-1 flex items-center justify-center"
                              style={{ 
                                fontFamily: fontSettings.family, 
                                fontSize: `${fontSettings.size}px`,
                                fontWeight: '900', 
                                textTransform: fontSettings.isUppercase ? 'uppercase' : 'none',
                                color: color,
                                flexGrow: 1
                              }}
                            >
                              {item.name}
                            </h2>

                            <div className="h-7 mb-1 flex items-center justify-center w-full flex-shrink-0">
                              {logo ? (
                                <img src={logo} alt="Logo" className="h-full object-contain" />
                              ) : (
                                <div className="opacity-10 text-[8px] uppercase font-bold">Logo</div>
                              )}
                            </div>
                          </div>

                          {/* Faixa de Dobra 1 */}
                          <div 
                            style={{ 
                                height: FOLD_GAP_HEIGHT,
                                backgroundColor: color,
                                boxSizing: 'border-box'
                            }} 
                            className="w-full flex items-center justify-center"
                          >
                              <div className="w-full border-t border-white opacity-20"></div>
                          </div>

                          {/* Face Central (Normal) */}
                          <div 
                            className="flex flex-col items-center justify-between p-1 py-1 text-center"
                            style={{ 
                              height: FACE_HEIGHT,
                              backgroundColor: 'white',
                              boxSizing: 'border-box'
                            }}
                          >
                            <div className="h-7 mt-1 flex items-center justify-center w-full flex-shrink-0">
                              {logo ? (
                                <img src={logo} alt="Logo" className="h-full object-contain" />
                              ) : (
                                <div className="opacity-10 text-[8px] uppercase font-bold">Logo</div>
                              )}
                            </div>

                            <h2 
                              className="leading-[0.9] tracking-tighter px-1 mb-1 flex items-center justify-center"
                              style={{ 
                                fontFamily: fontSettings.family, 
                                fontSize: `${fontSettings.size}px`,
                                fontWeight: '900',
                                textTransform: fontSettings.isUppercase ? 'uppercase' : 'none',
                                color: color,
                                flexGrow: 1
                              }}
                            >
                              {item.name}
                            </h2>
                          </div>

                          {/* Faixa de Dobra 2 */}
                          <div 
                            style={{ 
                                height: FOLD_GAP_HEIGHT,
                                backgroundColor: color,
                                boxSizing: 'border-box'
                            }} 
                            className="w-full flex items-center justify-center"
                          >
                              <div className="w-full border-t border-white opacity-20"></div>
                          </div>

                          {/* Face Inferior (Base em Branco) */}
                          <div 
                            className="flex flex-col items-center justify-center p-1 text-center"
                            style={{ 
                              height: FACE_HEIGHT,
                              backgroundColor: 'white',
                              boxSizing: 'border-box'
                            }}
                          >
                            <span className="text-[6px] opacity-10 uppercase font-bold">Base (Colar na Mesa)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {selectedItems.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-30 italic text-gray-400 no-print">
                Selecione itens no menu lateral para visualizar as etiquetas.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
