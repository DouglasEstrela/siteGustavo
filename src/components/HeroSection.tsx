import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, MapPin, Palette, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onContinue: () => void;
}

const HIGHLIGHTS = [
  { icon: Code2, label: 'Tecnologia', color: '#A6FF00' },
  { icon: Palette, label: 'Design gráfico', color: '#FF4D2E' },
  { icon: MapPin, label: 'Salvador, BA', color: '#A855F7' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onContinue }) => {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#07090e] px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_78%)]" />
      <motion.div aria-hidden="true" animate={{ x: ['-12%', '26%', '-12%'], y: ['-8%', '18%', '-8%'], scale: [1, 1.18, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -left-48 -top-56 h-[38rem] w-[38rem] rounded-full bg-[#A6FF00]/12 blur-[110px]" />
      <motion.div aria-hidden="true" animate={{ x: ['12%', '-24%', '12%'], y: ['8%', '-14%', '8%'], scale: [1.15, 0.95, 1.15] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -bottom-64 -right-44 h-[42rem] w-[42rem] rounded-full bg-[#8B5CF6]/15 blur-[120px]" />
      <motion.div aria-hidden="true" animate={{ rotate: [18, 34, 18], x: ['-4%', '8%', '-4%'] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute left-[32%] top-[-35%] h-[125%] w-40 rotate-[18deg] bg-gradient-to-b from-transparent via-cyan-300/10 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(7,9,14,0.72)_74%,#07090e_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-white/12 bg-[#0c0f16]/75 shadow-[0_25px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:grid-cols-12">
          <div className="relative flex min-h-[280px] items-end overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#140d21] p-5 sm:min-h-[340px] sm:p-8 lg:col-span-5 lg:min-h-[590px] lg:border-b-0 lg:border-r lg:p-10">
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(135deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="absolute -right-20 top-12 h-56 w-56 rounded-full border border-[#00E5FF]/20" />
            <div className="absolute -right-8 top-24 h-36 w-36 rounded-full border border-[#A6FF00]/25" />
            <div className="relative mx-auto w-full max-w-[270px] self-center sm:max-w-[295px] lg:max-w-[330px]">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#00E5FF]/35 via-transparent to-[#A855F7]/35 blur-xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] border border-white/20 bg-zinc-900 shadow-2xl">
                <img src="/images/hero_avatar.png" alt="Gustavo Mendes Cardoso" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080a10]/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:col-span-7 lg:p-11 xl:p-14">
            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18, duration: 0.6 }} className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/10 px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-[#A5F3FC]">
              <Sparkles className="h-3.5 w-3.5" /> APRESENTAÇÃO PESSOAL
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.26, duration: 0.6 }} className="mt-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Olá, eu sou</p>
              <h1 className="mt-2 font-['Outfit'] text-4xl font-black leading-[0.94] tracking-tight text-white sm:text-5xl xl:text-6xl">Gustavo<br />Mendes Cardoso</h1>
              <p className="mt-5 max-w-xl font-['Outfit'] text-sm leading-relaxed text-zinc-300 sm:text-base">Estudante de TI e designer gráfico. Transformo lógica, criatividade e curiosidade em projetos que comunicam, organizam e resolvem.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.55 }} className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {HIGHLIGHTS.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5">
                  <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-zinc-300">{label}</span>
                </div>
              ))}
            </motion.div>
            <motion.button initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.55 }} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={onContinue} className="group mt-7 inline-flex w-fit items-center gap-3 rounded-xl border border-[#00E5FF]/35 bg-[#00E5FF]/10 px-5 py-3.5 font-['Outfit'] text-sm font-extrabold text-white shadow-[0_0_24px_rgba(0,229,255,0.12)] transition-colors hover:border-[#00E5FF]/70 hover:bg-[#00E5FF]/18">
              Explorar meu projeto de vida
              <ArrowRight className="h-4 w-4 text-[#00E5FF] transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
