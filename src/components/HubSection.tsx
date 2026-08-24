import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronRight } from 'lucide-react';
import Aurora from './Aurora';

interface HubSectionProps {
  onSelectSection: (sectionIndex: number) => void;
  onBackToHero: () => void;
}

const HUB_CARDS = [
  {
    id: 'maestria',
    letter: 'M',
    title: 'MAESTRIA',
    number: '01',
    color: '#A6FF00',
    previewText: 'Competências & Certificados SAGA',
    bgImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-[#A6FF00]/25 via-black/90 to-zinc-950',
  },
  {
    id: 'vida',
    letter: 'V',
    title: 'VIDA',
    number: '02',
    color: '#8B1E1E', // Paleta trocada (Vermelho Escuro)
    previewText: 'Hobbies, Animes, Games & Doces',
    bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-[#8B1E1E]/30 via-black/90 to-zinc-950',
  },
  {
    id: 'storytelling',
    letter: 'S',
    title: 'STORYTELLING',
    number: '03',
    color: '#FF4D2E', // Paleta trocada (Laranja/Vermelho Vibrante)
    previewText: 'Linha do Tempo 2005 → 2030',
    bgImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-[#FF4D2E]/30 via-black/90 to-zinc-950',
  },
  {
    id: 'proposito',
    letter: 'P',
    title: 'PROPÓSITO',
    number: '04',
    color: '#8B5CF6',
    previewText: 'Meta de Vida & Contatos Diretos',
    bgImage: '/images/proposito_bg.png',
    gradient: 'from-[#8B5CF6]/40 via-black/80 to-zinc-950',
  },
];

export const HubSection: React.FC<HubSectionProps> = ({
  onSelectSection,
  onBackToHero,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen w-full bg-[#0d0e12] text-white flex flex-col justify-between p-4 md:p-6 lg:p-8 overflow-hidden font-['Inter']">
      {/* 4-Section Ambient Gradient & Aurora WebGL Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-35 bg-gradient-to-r from-[#A6FF00]/20 via-[#8B1E1E]/30 via-[#FF4D2E]/30 to-[#8B5CF6]/35 blur-3xl" />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-85">
        <Aurora colorStops={['#A6FF00', '#8B1E1E', '#FF4D2E', '#8B5CF6']} speed={0.7} amplitude={1.3} blend={0.65} />
      </div>

      {/* Top Row: PROJETO DE VIDA in prominent white + Return Button */}
      <div className="relative z-10 flex items-center justify-between gap-4 pt-1 pb-1">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase font-['Outfit'] text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
          PROJETO DE VIDA
        </h1>

        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.96 }}
          onClick={onBackToHero}
          className="group inline-flex items-center gap-2.5 rounded-xl border border-white/12 bg-[#0c0f16]/85 px-3 py-2.5 font-['Outfit'] text-xs font-bold tracking-wide text-zinc-200 shadow-[0_8px_25px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:border-[#00E5FF]/45 hover:bg-[#101621] hover:text-white hover:shadow-[0_0_22px_rgba(0,229,255,0.12)] md:px-4"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#00E5FF]/25 bg-[#00E5FF]/10 text-[#67E8F9] transition-transform duration-300 group-hover:-translate-x-0.5">
            <ArrowLeft className="h-3.5 w-3.5" />
          </div>
          <span className="whitespace-nowrap">
            Voltar à apresentação
          </span>
        </motion.button>
      </div>

      {/* Subheader Row: Gustavo Name on Left, Motivational Quote on Right */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-3 mt-3 md:mt-5 lg:mt-6 mb-2">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white font-['Outfit'] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Gustavo Mendes Cardoso
        </h2>

        <p className="max-w-md text-xs md:text-sm lg:text-base text-zinc-100 font-semibold leading-snug md:text-right drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
          Venha descobrir todo meu propósito de vida, minha motivação e a prova da minha existência.
        </p>
      </div>

      {/* 4 Cards Layout - Flexible Responsive Height for Laptops and Desktops */}
      <div className="relative z-10 mt-1 mb-1 flex flex-col md:flex-row gap-3 md:gap-4 w-full flex-1 min-h-[380px] md:min-h-[440px] lg:min-h-[480px] 2xl:min-h-[620px] items-stretch">
        {HUB_CARDS.map((card, idx) => {
          const isHovered = hoveredIndex === idx;
          const isAnyHovered = hoveredIndex !== null;

          // Compute dynamic flex ratio for accordion
          let flexClass = 'flex-1';
          if (isAnyHovered) {
            flexClass = isHovered ? 'md:flex-[2.2]' : 'md:flex-[0.7]';
          }

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onSelectSection(idx + 1)}
              style={{
                borderColor: isHovered ? card.color : `${card.color}44`,
                boxShadow: isHovered
                  ? `0 0 35px ${card.color}66, inset 0 0 20px ${card.color}25`
                  : `0 0 12px ${card.color}15`,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`relative rounded-3xl border bg-zinc-950/90 backdrop-blur-xl overflow-hidden cursor-pointer flex flex-col justify-between p-6 transition-all duration-400 ${flexClass}`}
            >
              {/* Ambient Background Image & Gradient */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{
                  backgroundImage: `url(${card.bgImage})`,
                  opacity: isHovered ? 0.85 : 0.45,
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-b ${card.gradient}`}
              />

              {/* Top Row: Square Icon Badge matching SAGA */}
              <div className="relative z-10 flex items-center justify-between">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-['Outfit'] font-black text-2xl shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: `${card.color}22`,
                    color: card.color,
                    border: `1.5px solid ${isHovered ? card.color : `${card.color}55`}`,
                  }}
                >
                  {card.letter}
                </div>

                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? `${card.color}35` : `${card.color}15`,
                    border: `1px solid ${isHovered ? card.color : `${card.color}35`}`,
                  }}
                >
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-300"
                    style={{
                      color: card.color,
                      transform: isHovered ? 'translate(2px, -2px) scale(1.15)' : 'none',
                    }}
                  />
                </div>
              </div>

              {/* Center Rotated Vertical Title */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4">
                <span
                  className="font-['Outfit'] font-black tracking-[0.2em] text-2xl md:text-3xl uppercase transition-colors duration-300"
                  style={{
                    writingMode: 'vertical-rl',
                    textTransform: 'uppercase',
                    color: isHovered ? '#ffffff' : '#d4d4d8',
                    textShadow: isHovered ? `0 0 20px ${card.color}cc` : 'none',
                  }}
                >
                  {card.title}
                </span>

                {/* Description Preview Text ONLY displayed when hovered */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      initial={{ opacity: 0, y: 12, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 text-xs font-mono text-center text-white leading-normal max-w-[200px] px-3 py-1.5 rounded-lg bg-black/70 border border-white/15 shadow-xl"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
                    >
                      {card.previewText}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Row: Number & Action matching SAGA (01 →) */}
              <div
                className="relative z-10 flex items-center justify-between pt-4 text-xs font-mono"
                style={{ borderTop: `1px solid ${isHovered ? `${card.color}66` : `${card.color}25`}` }}
              >
                <span
                  className="font-bold transition-colors"
                  style={{ color: isHovered ? card.color : '#a1a1aa' }}
                >
                  {card.number}
                </span>
                <span
                  className="flex items-center gap-1 font-semibold tracking-wider transition-all"
                  style={{ color: card.color }}
                >
                  EXPLORAR <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
