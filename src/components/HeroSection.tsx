import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HexagonBackground } from './HexagonBackground';

interface HeroSectionProps {
  onContinue: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContinue }) => {
  return (
    <HexagonBackground hexagonSize={68} hexagonMargin={3}>
      <div className="w-full h-screen flex items-center justify-center text-white px-4 py-6 md:py-10">
        {/* Main Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-5xl 2xl:max-w-6xl w-full bg-zinc-950/80 backdrop-blur-2xl rounded-2xl p-6 md:p-10 lg:p-12 2xl:p-14 shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-white/15 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-14 items-center"
        >
          {/* Left Column: Photo */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[260px] md:max-w-[300px] 2xl:max-w-[340px] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-zinc-900 flex items-center justify-center transition-transform duration-500 hover:scale-[1.02] group">
              <img
                src="/images/hero_avatar.png"
                alt="Gustavo Mendes Cardoso"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle inner border glow */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Title, Copy, CTA Button */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4 md:space-y-5 2xl:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-semibold tracking-widest text-zinc-300 uppercase w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Apresentação & Portfólio</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-black tracking-tight text-white font-['Outfit'] drop-shadow-md">
                Prazer em conhecer
              </h1>
            </div>

            <p className="text-sm md:text-base 2xl:text-lg leading-relaxed text-zinc-300 font-normal font-['Outfit']">
              Sou <strong className="text-white font-bold">Gustavo Mendes Cardoso</strong>, Baiano, tenho 21 anos, simpático, engraçado e focado, estudante de TI, com formação em design gráfico. Tenho interesse em áreas que vão além da tecnologia, como a confeitaria, sou do tipo que une lógica, criatividade e sensibilidade estética em seus projetos. Gamer nas horas livres, representante de classe e administra seu próprio servidor no Discord.
            </p>

            <div className="pt-1 md:pt-2">
              <motion.button
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={onContinue}
                className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-zinc-900 to-black hover:from-black hover:to-zinc-900 text-white font-bold rounded-xl border border-white/25 hover:border-[#00E5FF]/70 shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-all duration-300 text-sm md:text-base 2xl:text-lg cursor-pointer group font-['Outfit']"
              >
                <span>Conhecer meu projeto de vida</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 text-[#00E5FF] transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </HexagonBackground>
  );
};


