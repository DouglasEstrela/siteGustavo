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
    <section className="relative isolate min-h-screen overflow-hidden bg-[#050711] px-4 py-6 text-white sm:px-6 lg:px-10">
      {/* Mesh aurora + perspective grid: visual depth without a canvas/WebGL dependency. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,#14234d_0%,#080b18_38%,#050711_74%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(125,211,252,0.6)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <motion.div aria-hidden="true" animate={{ x: ['-10%', '24%', '-10%'], y: ['-12%', '8%', '-12%'], scale: [1, 1.14, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -left-52 -top-64 h-[43rem] w-[43rem] rounded-full bg-[#00B8FF]/22 blur-[125px]" />
      <motion.div aria-hidden="true" animate={{ x: ['10%', '-22%', '10%'], y: ['10%', '-10%', '10%'], scale: [1.1, 0.92, 1.1] }} transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -bottom-72 -right-44 h-[46rem] w-[46rem] rounded-full bg-[#7C3AED]/23 blur-[135px]" />
      <motion.div aria-hidden="true" animate={{ opacity: [0.3, 0.7, 0.3], rotate: [12, 22, 12] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute left-[42%] top-[-42%] h-[145%] w-48 bg-gradient-to-b from-transparent via-[#67E8F9]/20 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute -bottom-[48%] left-[-20%] h-[80%] w-[140%] origin-top [transform:perspective(500px)_rotateX(62deg)] [background-image:linear-gradient(rgba(34,211,238,0.23)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.23)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,transparent,black_35%,transparent_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(5,7,17,0.5)_64%,#050711_100%)]" />

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
