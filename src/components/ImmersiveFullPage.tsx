import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  X,
} from 'lucide-react';

import { CertificateCarousel } from './CertificateCarousel';
import ColorBends from './ColorBends';

interface ImmersiveFullPageProps {
  initialSection?: number;
  onBackToHub: () => void;
  onBackToHero: () => void;
}

const SOFT_SKILLS = [
  { name: 'Analítico', desc: 'Raciocínio lógico focado na solução de problemas complexos' },
  { name: 'Organizado', desc: 'Estruturação metódica de processos, código e design' },
  { name: 'Eficiente', desc: 'Otimização de tempo e recursos com alta produtividade' },
  { name: 'Perfeccionista', desc: 'Atenção minuciosa aos detalhes visuais e funcionais' },
  { name: 'Pontual', desc: 'Compromisso rigoroso com prazos e entregas' },
  { name: 'Criativo', desc: 'Raciocínio estético e soluções visuais inovadoras' },
];

const HOBBIES = [
  {
    title: 'Comunidade no Discord',
    tag: 'Dragon Raja Brasil',
    image: '/images/dragon_raja_brasil.jpg',
    desc: 'Administro uma das maiores comunidades ativas do jogo Dragon Raja no Brasil.',
  },
  {
    title: 'Gamer & Animes',
    tag: 'Estratégia & Anime',
    image: '/images/gamer_anime_gustavo.jpg',
    desc: 'Jogador competitivo e focado nas horas livres com foco em MMORPG e estratégia.',
  },
  {
    title: 'Gosto de Fazer Doce',
    tag: 'Confeitaria',
    image: '/images/chocolate_cake_slice.jpg',
    desc: 'Criação de bolos, tortas, mousses e receitas de confeitaria nas horas livres.',
  },
  {
    title: 'Edição de Vídeos e Posts',
    tag: 'Design Gráfico',
    image: '/images/video_editing_laptop.png',
    desc: 'Edição audiovisual e composição de posts para redes sociais (Adobe & Inkscape).',
  },
];

const TIMELINE_EVENTS = [
  { year: '2005', title: 'Nascimento', desc: 'Início da jornada de vida em Salvador, Bahia.' },
  { year: '2022', title: 'Conclusão do Ensino Médio', desc: 'Finalização do ciclo escolar base com foco em exatas.' },
  { year: '2025', title: 'Curso de Design concluído', desc: 'Formação em Design Gráfico com domínio da suíte Adobe.' },
  { year: '2026', title: 'Técnico em TI (em curso)', desc: 'Capacitação em desenvolvimento de software e infraestrutura.' },
  { year: '2026', title: 'Curso Sócio Profissional (FMT)', desc: 'Aprimoramento de soft skills e postura corporativa.' },
  { year: '2027', title: 'Jovem Aprendiz / Estágio', desc: 'Inserção no mercado de trabalho profissional de tecnologia.' },
  { year: '2028', title: 'Faculdade + novo idioma', desc: 'Ingresso no ensino superior e fluência em novo idioma.' },
  { year: '2029', title: 'Estabilidade financeira', desc: 'Conquista da independência e consolidação profissional.' },
  { year: '2030', title: 'Projeto próprio ou social', desc: 'Lançamento de empreendimento próprio unindo TI e Design.' },
  { year: '2031', title: 'Expansão & Liderança', desc: 'Consolidação no mercado corporativo de TI, liderança de equipe e estruturação de novos projetos em tecnologia.' },
];

const QR_LINKS = [
  { label: 'Currículo', detail: 'Versão digital', seed: 17 },
  { label: 'Portfólio', detail: 'Projetos selecionados', seed: 31 },
  { label: 'LinkedIn', detail: 'Perfil profissional', seed: 53 },
];

/** Representação visual fictícia: não codifica nem redireciona para links reais. */
const FictionalQrCode: React.FC<{ seed: number; label: string }> = ({ seed, label }) => {
  const size = 21;
  const isDark = (row: number, column: number) => {
    const corners = [[0, 0], [0, size - 7], [size - 7, 0]];
    for (const [top, left] of corners) {
      if (row >= top && row < top + 7 && column >= left && column < left + 7) {
        const x = row - top;
        const y = column - left;
        return x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4);
      }
    }
    return ((row * 13 + column * 7 + seed + row * column) % 5) < 2;
  };

  return (
    <div role="img" aria-label={`QR code fictício para ${label}`} className="w-[76px] h-[76px] p-1.5 rounded-md bg-[#F3E8FF] shadow-[0_0_16px_rgba(168,85,247,0.26)]">
      <div className="w-full h-full grid grid-cols-[repeat(21,minmax(0,1fr))]">
        {Array.from({ length: size * size }, (_, index) => {
          const row = Math.floor(index / size);
          const column = index % size;
          return <span key={index} className={isDark(row, column) ? 'bg-[#3B0764]' : 'bg-transparent'} />;
        })}
      </div>
    </div>
  );
};

export const ImmersiveFullPage: React.FC<ImmersiveFullPageProps> = ({
  initialSection = 1,
  onBackToHub,
}) => {
  const [activeSection, setActiveSection] = useState<number>(initialSection);
  const [direction, setDirection] = useState<number>(1); // 1 = forward (right-to-left), -1 = backward (left-to-right)
  const [selectedTimelineIdx, setSelectedTimelineIdx] = useState<number>(0);
  const [selectedHobby, setSelectedHobby] = useState<(typeof HOBBIES)[0] | null>(null);
  const isCooldownRef = useRef<boolean>(false);

  // Section styling specs with softened, elegant accent tones
  const sectionColors = [
    { name: 'Maestria', color: '#A6FF00', bg: 'bg-zinc-950', border: 'border-[#A6FF00]/30' },
    { name: 'Vida', color: '#E11D48', bg: 'bg-[#180a0a]', border: 'border-[#E11D48]/30' },
    { name: 'Storytelling', color: '#F97316', bg: 'bg-[#120806]', border: 'border-[#F97316]/30' },
    { name: 'Propósito', color: '#A855F7', bg: 'bg-[#0c0817]', border: 'border-[#A855F7]/30' },
  ];

  const currentTheme = sectionColors[activeSection - 1] || sectionColors[0];

  // Mouse wheel scroll section jumper with horizontal animation & limits
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isCooldownRef.current) return;

      if (e.deltaY > 20) {
        // Scroll down -> Go to next section (if not on last section)
        if (activeSection < 4) {
          isCooldownRef.current = true;
          setDirection(1);
          setActiveSection((prev) => prev + 1);
          setTimeout(() => {
            isCooldownRef.current = false;
          }, 800);
        }
      } else if (e.deltaY < -20) {
        // Scroll up -> Go to previous section (if not on first section)
        if (activeSection > 1) {
          isCooldownRef.current = true;
          setDirection(-1);
          setActiveSection((prev) => prev - 1);
          setTimeout(() => {
            isCooldownRef.current = false;
          }, 800);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection]);

  // Soft, organic smooth transition with gentle directional drift + scale + depth fade
  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(6px)',
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(6px)',
      transition: {
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden bg-[#0a0b0e] text-white font-['Inter'] flex flex-col justify-between">
      {/* React Bits ColorBends WebGL Background tailored to section theme & color */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <ColorBends
          colors={
            activeSection === 1 ? ['#A6FF00', '#10B981', '#064E3B'] : // Maestria (Verde Neon & Esmeralda)
              activeSection === 2 ? ['#E11D48', '#FF4D2E', '#881337'] : // Vida (Vermelho Crimson & Coral)
                activeSection === 3 ? ['#F97316', '#F59E0B', '#7C2D12'] : // Storytelling (Laranja Âmbar & Dourado)
                  ['#A855F7', '#8B5CF6', '#4C1D95']                          // Propósito (Roxo Neon & Violeta)
          }
          speed={0.3}
          rotation={45}
          warpStrength={1.2}
          frequency={1.2}
          transparent={true}
          noise={0.08}
          intensity={1.8}
        />
      </div>

      {/* Floating Top Right Back Button - Larger, Outfit font, glowing glassmorphism */}
      <div className="fixed top-5 right-6 z-50 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.04, x: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={onBackToHub}
          className="px-5 py-2.5 md:px-6 md:py-3 rounded-2xl bg-zinc-950/85 backdrop-blur-2xl text-white font-['Outfit'] font-extrabold text-xs md:text-sm tracking-wider uppercase flex items-center gap-3 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.6)] cursor-pointer group border"
          style={{
            borderColor: `${currentTheme.color}60`,
            boxShadow: `0 0 25px ${currentTheme.color}25`,
          }}
        >
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:-translate-x-1"
            style={{
              backgroundColor: `${currentTheme.color}25`,
              color: currentTheme.color,
              border: `1px solid ${currentTheme.color}50`,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-['Outfit'] font-bold text-xs md:text-sm tracking-widest text-zinc-100 group-hover:text-white transition-colors">
            Voltar ao Hub
          </span>
        </motion.button>
      </div>

      {/* Direct Sub-section Dock Navigation - Larger, Outfit typography, glowing interactive micro-cards */}
      <div className="fixed left-3 md:left-5 lg:left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5 p-2 rounded-2xl bg-zinc-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
        {sectionColors.map((s, idx) => {
          const isActive = activeSection === idx + 1;
          const letters = ['M', 'V', 'S', 'P'];

          return (
            <motion.button
              key={s.name}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                setDirection(idx + 1 > activeSection ? 1 : -1);
                setActiveSection(idx + 1);
              }}
              className={`group flex items-center gap-2.5 px-2.5 py-2 md:px-3 md:py-2.5 rounded-xl transition-all duration-300 cursor-pointer relative ${
                isActive
                  ? 'bg-white/15 border shadow-lg'
                  : 'bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
              style={{
                borderColor: isActive ? s.color : undefined,
                boxShadow: isActive ? `0 0 20px ${s.color}35` : undefined,
              }}
              title={s.name}
            >
              {/* Badge Icon / Indicator */}
              <div
                className={`w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center font-['Outfit'] font-black text-xs transition-all duration-300 ${
                  isActive ? 'scale-110 shadow-md' : 'opacity-70 group-hover:opacity-100'
                }`}
                style={{
                  backgroundColor: `${s.color}25`,
                  color: s.color,
                  border: `1.5px solid ${isActive ? s.color : `${s.color}40`}`,
                }}
              >
                {letters[idx]}
              </div>

              {/* Text Label on hover / active */}
              <div className="flex flex-col items-start pr-1">
                <span className="font-mono text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                  0{idx + 1}
                </span>
                <span
                  className={`font-['Outfit'] text-xs font-extrabold tracking-wide transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}
                  style={{ color: isActive ? s.color : undefined }}
                >
                  {s.name}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Main Active Section Viewport with Lateral/Horizontal Slide Animation */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-3 md:p-6 lg:pl-48 lg:pr-10 xl:pl-52 xl:pr-12 2xl:px-8 overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction}>
          {/* ========================================================
              SUBSEÇÃO 1: MAESTRIA & CERTIFICADOS
              ======================================================== */}
          {activeSection === 1 && (
            <motion.div
              key="section-maestria"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-6xl 2xl:max-w-7xl mx-auto p-5 md:p-6 lg:p-7 rounded-2xl bg-zinc-900/90 border border-zinc-700/60 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center transform-gpu will-change-transform"
            >
              {/* Left Side Column: Badge [M] MAESTRIA + Large Title */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#A6FF00]/10 border border-[#A6FF00]/40 flex items-center justify-center text-[#A6FF00] font-['Outfit'] font-extrabold text-base md:text-lg">
                    M
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#A6FF00] uppercase tracking-widest">
                    MAESTRIA
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold font-['Outfit'] text-white leading-tight">
                  Minhas principais <br />
                  Competências <br />
                  & Certificados
                </h2>

                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-normal">
                  Unindo rigor analítico, organização e precisão estética na entrega de cada projeto de TI e Design.
                </p>
              </div>

              {/* Right Side Column: Top Box (Competencies) + Bottom Box (Certificates) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Top Box: 6 Competencies List */}
                <div className="p-4 sm:p-5 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md shadow-xl space-y-3">
                  <h3 className="text-xs font-mono font-semibold text-[#A6FF00] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Principais Competências</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SOFT_SKILLS.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-white/5 text-zinc-200 font-['Outfit'] font-semibold text-xs hover:border-[#A6FF00]/40 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#A6FF00] shrink-0" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Box: Compact Certificate Carousel */}
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md shadow-xl">
                  <CertificateCarousel compact={true} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              SUBSEÇÃO 2: VIDA
              ======================================================== */}
          {activeSection === 2 && (
            <motion.div
              key="section-vida"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-6xl 2xl:max-w-7xl mx-auto p-6 md:p-8 lg:p-9 rounded-2xl bg-zinc-900/90 border border-zinc-700/60 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center transform-gpu will-change-transform"
            >
              {/* Left Side Column: Badge [V] VIDA + Title */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#E11D48]/10 border border-[#E11D48]/40 flex items-center justify-center text-[#E11D48] font-['Outfit'] font-extrabold text-base md:text-lg">
                    V
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#E11D48] uppercase tracking-widest">
                    VIDA
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold font-['Outfit'] text-white leading-tight">
                  Minha Jornada, <br />
                  Hobbies & <br />
                  Estilo de Vida
                </h2>

                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-normal">
                  Explorando a criatividade visual, liderança de comunidades e hábitos que alimentam o dia a dia.
                </p>
              </div>

              {/* Right Side Column: Text Overview + Hobbies Grid */}
              <div className="lg:col-span-7 space-y-4">
                {/* Top Box: Textos Organizados */}
                <div className="p-4 sm:p-5 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md shadow-xl space-y-2 text-xs md:text-sm font-normal text-zinc-300">
                  <h3 className="text-xs font-mono font-semibold text-[#E11D48] uppercase tracking-wider flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sobre meus Hobbies</span>
                  </h3>
                  <p className="leading-relaxed">
                    • Tenho como hobbies jogar, produzir imagens e assistir animes — uma mente estratégica e competitiva em tudo o que faz.
                  </p>
                  <p className="leading-relaxed">
                    • Na hora de criar, uso a suíte Adobe e Inkscape para edição de imagem e vídeo com foco em artes autorais.
                  </p>
                  <p className="leading-relaxed">
                    • Na culinária, gosto de fazer doces, como bolos, tortas e mousses nas horas livres.
                  </p>
                  <p className="text-[#E11D48] font-medium leading-relaxed pt-1 border-t border-white/10">
                    • Administrador de uma das maiores comunidades de Dragon Raja no Brasil.
                  </p>
                </div>

                {/* Bottom Box: 4 Thumbnails */}
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md shadow-xl">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {HOBBIES.map((hobby) => (
                      <div
                        key={hobby.title}
                        onClick={() => setSelectedHobby(hobby)}
                        className="group cursor-pointer flex flex-col items-center text-center space-y-1.5"
                      >
                        <div className="w-full aspect-square rounded-lg overflow-hidden border border-white/10 group-hover:border-[#E11D48]/60 transition-all duration-300 group-hover:scale-105 shadow-sm">
                          <img
                            src={hobby.image}
                            alt={hobby.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <span className="font-['Outfit'] font-extrabold tracking-wide text-xs text-zinc-100 group-hover:text-[#E11D48] transition-colors leading-tight">
                          {hobby.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              SUBSEÇÃO 3: STORYTELLING (Linha do Tempo 2005 ➔ 2031)
              ======================================================== */}
          {activeSection === 3 && (
            <motion.div
              key="section-storytelling"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-6xl 2xl:max-w-7xl mx-auto p-6 md:p-8 lg:p-9 rounded-2xl bg-zinc-900/90 border border-zinc-700/60 backdrop-blur-xl shadow-2xl space-y-4 md:space-y-6 transform-gpu will-change-transform"
            >
              {/* Header Row: Badge + Title + Active Event Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-center">
                {/* Left Side: Badge & Title */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-[#F97316]/10 border border-[#F97316]/40 flex items-center justify-center text-[#F97316] font-['Outfit'] font-extrabold text-lg">
                      S
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#F97316] uppercase tracking-widest">
                      STORYTELLING
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold font-['Outfit'] text-white leading-tight">
                    Minha Linha <br />
                    do Tempo
                  </h2>
                </div>

                {/* Right Side: Active Selected Milestone Detail Box */}
                <div className="lg:col-span-7">
                  <div className="p-4 sm:p-5 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md shadow-xl flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#F97316]/15 border border-[#F97316]/50 flex items-center justify-center text-[#F97316] font-mono font-bold text-sm shrink-0">{TIMELINE_EVENTS[selectedTimelineIdx].year}</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-medium text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded border border-[#F97316]/20 uppercase">Marco {selectedTimelineIdx + 1} de {TIMELINE_EVENTS.length}</span>
                        <span className="text-[10px] text-zinc-400 font-mono">CLIQUE NOS PONTOS DA LINHA</span>
                      </div>
                      <h3 className="font-['Outfit'] font-bold text-base text-white">{TIMELINE_EVENTS[selectedTimelineIdx].title}</h3>
                      <p className="text-xs text-zinc-300 leading-relaxed font-normal">{TIMELINE_EVENTS[selectedTimelineIdx].desc}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chronological timeline: every milestone is immediately readable. */}
              <div className="hidden rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-xl md:p-5">
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#F97316]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Trajetória completa · 2005 → 2031</span>
                </h3>
                <div className="relative max-h-[46vh] overflow-y-auto pr-1.5">
                  <div className="absolute bottom-4 left-[17px] top-4 w-px bg-gradient-to-b from-[#F97316] via-[#F97316]/60 to-[#F97316]/15" />
                  <div className="space-y-3">
                    {TIMELINE_EVENTS.map((event, idx) => (
                      <article key={`${event.year}-${event.title}`} className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-3">
                        <div className="relative z-10 flex pt-3 justify-center">
                          <span className="h-3.5 w-3.5 rounded-full border-[3px] border-zinc-900 bg-[#F97316] shadow-[0_0_12px_rgba(249,115,22,0.75)]" />
                        </div>
                        <div className="rounded-xl border border-zinc-700/80 bg-zinc-950/65 px-4 py-3 transition-colors hover:border-[#F97316]/55">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-mono text-sm font-extrabold text-[#FDBA74]">{event.year}</span>
                            <span className="font-['Outfit'] text-sm font-bold text-white">{event.title}</span>
                            <span className="ml-auto font-mono text-[9px] text-zinc-600">MARCO {String(idx + 1).padStart(2, '0')}</span>
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{event.desc}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legacy compact navigation, kept out of the visual flow. */}
              <div className="p-5 md:p-6 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl relative overflow-hidden">
                <h3 className="text-xs font-mono font-semibold text-[#F97316] uppercase tracking-wider mb-8 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Acontecimentos na Linha do Tempo (2005 ➔ 2031)</span>
                </h3>

                {/* The Continuous Timeline Line Container */}
                <div className="relative w-full my-12 px-4">
                  {/* Background Base Line — mais espessa e visível */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-700 -translate-y-1/2 rounded-full" />

                  {/* Active Filled Progress Line */}
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#F97316] to-[#fb923c] -translate-y-1/2 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(249,115,22,0.7)]"
                    style={{
                      width: `${(selectedTimelineIdx / (TIMELINE_EVENTS.length - 1)) * 100}%`,
                    }}
                  />

                  {/* Nodes along the Line */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    {TIMELINE_EVENTS.map((event, idx) => {
                      const isSelected = selectedTimelineIdx === idx;
                      const isPast = idx <= selectedTimelineIdx;
                      const isAbove = idx % 2 === 0;

                      return (
                        <div
                          key={event.year + idx}
                          onClick={() => setSelectedTimelineIdx(idx)}
                          className="group cursor-pointer flex flex-col items-center relative"
                        >
                          {/* Label acima ou abaixo */}
                          <div
                            className={`absolute ${isAbove ? '-top-11' : 'top-9'} flex flex-col items-center whitespace-nowrap transition-all duration-300`}
                          >
                            <span
                              className={`font-mono text-[11px] font-extrabold tracking-tight transition-all duration-200 ${
                                isSelected
                                  ? 'text-[#F97316] drop-shadow-[0_0_6px_rgba(249,115,22,0.8)]'
                                  : isPast
                                    ? 'text-zinc-100'
                                    : 'text-zinc-400 group-hover:text-zinc-200'
                              }`}
                            >
                              {event.year}
                            </span>
                            <span
                              className={`text-[9px] font-['Outfit'] font-semibold max-w-[72px] truncate text-center transition-colors duration-200 mt-0.5 ${
                                isSelected
                                  ? 'text-[#fb923c]'
                                  : isPast
                                    ? 'text-zinc-300'
                                    : 'text-zinc-500 group-hover:text-zinc-300'
                              }`}
                            >
                              {event.title.split(' ')[0]}
                            </span>
                          </div>

                          {/* Node Circle — maior e mais visível */}
                          <div
                            className={`rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              isSelected
                                ? 'w-7 h-7 bg-[#F97316] border-white shadow-[0_0_18px_rgba(249,115,22,0.9)] scale-110'
                                : isPast
                                  ? 'w-6 h-6 bg-[#F97316] border-[#fb923c] shadow-[0_0_8px_rgba(249,115,22,0.5)] hover:scale-110'
                                  : 'w-6 h-6 bg-zinc-800 border-zinc-500 hover:border-[#F97316] hover:bg-zinc-700 hover:scale-110'
                            }`}
                          >
                            <div
                              className={`rounded-full transition-colors ${
                                isSelected
                                  ? 'w-2 h-2 bg-white'
                                  : isPast
                                    ? 'w-1.5 h-1.5 bg-zinc-900'
                                    : 'w-1.5 h-1.5 bg-zinc-500'
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              SUBSEÇÃO 4: PROPÓSITO
              ======================================================== */}
          {activeSection === 4 && (
            <motion.div
              key="section-proposito"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-6xl 2xl:max-w-7xl mx-auto p-6 md:p-8 lg:p-9 rounded-2xl bg-zinc-900/90 border border-zinc-700/60 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center transform-gpu will-change-transform"
            >
              {/* Left Side: Badge + Title + Purpose Quote */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#A855F7]/10 border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7] font-['Outfit'] font-extrabold text-base md:text-lg">
                    P
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#A855F7] uppercase tracking-widest">
                    PROPÓSITO
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold font-['Outfit'] text-white leading-tight">
                  Propósito de Vida <br />
                  & Metas
                </h2>

                <div className="rounded-xl bg-purple-950/20 border border-[#A855F7]/25 backdrop-blur-md shadow-xl overflow-hidden">
                  <div className="p-4 sm:p-5 relative">
                    <span className="text-4xl text-[#A855F7]/30 font-serif absolute top-1 left-3">"</span>
                    <blockquote className="relative z-10 text-xs md:text-sm font-normal leading-relaxed text-[#D8B4FE] italic">
                      Tenho como propósito garantir o meu sustento financeiro e prover as minhas necessidades básicas de vida, além de buscar a minha realização pessoal, o desenvolvimento de novas habilidades e a conexão social com outras pessoas.
                    </blockquote>
                  </div>
                </div>
              </div>

              {/* Right Side: Objetivo + Contatos */}
              <div className="lg:col-span-7 flex flex-col gap-3">

                {/* Objetivo Profissional */}
                <div className="order-2 p-3.5 rounded-xl bg-zinc-800/60 border border-zinc-600/50 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_6px_#A855F7]" />
                    <span className="font-mono text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Objetivo Profissional</span>
                  </div>
                  <p className="text-xs font-normal leading-relaxed text-zinc-200">
                    Tenho como objetivo estagiar ou atuar como jovem aprendiz nas áreas de <span className="text-[#C084FC] font-semibold">TI e Design</span>, meus principais interesses. Sou uma pessoa analítica, adaptável e proativa, sempre buscando aprender na prática. Tenho qualificações em <span className="text-[#C084FC] font-semibold">design gráfico</span> (Photoshop e Inkscape), além de experiência com automatização e organização de projetos. Onde eu for inserido, vou desempenhar meu papel com dedicação e sempre buscando entregar meu melhor desempenho.
                  </p>
                </div>

                {/* Divisor */}
                <div className="order-3 flex items-center gap-3">
                  <div className="flex-1 h-px bg-zinc-700" />
                  <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">Entre em contato</span>
                  <div className="flex-1 h-px bg-zinc-700" />
                </div>

                <div className="order-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* E-mail */}
                <div className="group flex flex-col items-start gap-2 p-3 rounded-xl bg-zinc-800 border border-zinc-600 hover:border-[#A855F7]/70 hover:bg-zinc-750 transition-all duration-300 shadow-md cursor-default">
                  <div className="w-11 h-11 rounded-lg bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C084FC]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] font-semibold text-zinc-400 uppercase tracking-[0.16em] mb-0.5">E-mail</span>
                    <span className="font-['Outfit'] font-bold text-white leading-none tracking-[-0.025em]">
                      <span className="block text-[13px]">gustavomcardoso32</span>
                      <span className="block mt-1 text-[11px] text-[#D8B4FE]">@gmail.com</span>
                    </span>
                  </div>
                </div>

                {/* Telefone */}
                <div className="group flex flex-col items-start gap-2 p-3 rounded-xl bg-zinc-800 border border-zinc-600 hover:border-[#A855F7]/70 hover:bg-zinc-750 transition-all duration-300 shadow-md cursor-default">
                  <div className="w-11 h-11 rounded-lg bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C084FC]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold text-zinc-400 uppercase tracking-[0.16em] mb-0.5">Telefone</span>
                    <span className="font-['Outfit'] text-[15px] leading-tight font-extrabold text-white tracking-wide">(71) 98516-9222</span>
                  </div>
                </div>

                {/* Localização */}
                <div className="group flex flex-col items-start gap-2 p-3 rounded-xl bg-zinc-800 border border-zinc-600 hover:border-[#A855F7]/70 hover:bg-zinc-750 transition-all duration-300 shadow-md cursor-default">
                  <div className="w-11 h-11 rounded-lg bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#C084FC]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-semibold text-zinc-400 uppercase tracking-[0.16em] mb-0.5">Localização</span>
                    <span className="font-['Outfit'] text-[15px] leading-tight font-extrabold text-white">Salvador, Bahia</span>
                    <span className="text-[10px] text-zinc-400 font-mono mt-1">Brasil 🇧🇷</span>
                  </div>
                </div>
                </div>

                {/* QR codes de acesso */}
                <div className="order-1 rounded-xl bg-zinc-800/60 border border-zinc-600/50 p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_6px_#A855F7]" />
                    <span className="font-mono text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Acessos rápidos</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {QR_LINKS.map((item) => (
                      <div key={item.label} className="flex flex-col items-center gap-2 rounded-lg border border-[#A855F7]/25 bg-purple-950/15 p-3 text-center transition-colors hover:border-[#A855F7]/55">
                        <FictionalQrCode seed={item.seed} label={item.label} />
                        <div className="min-w-0 w-full">
                          <p className="font-['Outfit'] text-sm font-bold text-white">{item.label}</p>
                          <p className="text-[10px] font-mono text-[#D8B4FE] mt-0.5">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox / Modal for Hobby Details */}
      <AnimatePresence>
        {selectedHobby && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHobby(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-zinc-950 border border-white/15 rounded-xl p-5 relative space-y-3.5 shadow-2xl"
            >
              <button
                onClick={() => setSelectedHobby(null)}
                className="absolute top-4 right-4 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <img
                src={selectedHobby.image}
                alt={selectedHobby.title}
                className="w-full h-52 object-cover rounded-lg border border-white/10"
              />

              <div>
                <span className="text-[10px] font-mono text-[#E11D48] font-semibold uppercase">
                  {selectedHobby.tag}
                </span>
                <h3 className="text-xl font-bold font-['Outfit'] text-white">
                  {selectedHobby.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                  {selectedHobby.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
