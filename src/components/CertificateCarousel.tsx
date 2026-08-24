import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ExternalLink, Award, CheckCircle2 } from 'lucide-react';

export interface CertificateData {
  id: string;
  badge: string;
  title: string;
  institution: string;
  studentName: string;
  issueDate: string;
  duration: string;
  software: string;
  accentColor: string;
}

const CERTIFICATES: CertificateData[] = [
  {
    id: '1',
    badge: 'PRESENCIAL',
    title: 'Efeitos Visuais e Motion Graphics',
    institution: 'SAGA',
    studentName: 'Gustavo Mendes Cardoso',
    issueDate: '26/04/2024',
    duration: '3 MESES',
    software: 'AFTER EFFECTS',
    accentColor: '#A6FF00',
  },
  {
    id: '2',
    badge: 'PRESENCIAL',
    title: 'Edição Audiovisual',
    institution: 'SAGA',
    studentName: 'Gustavo Mendes Cardoso',
    issueDate: '26/04/2024',
    duration: '3 MESES',
    software: 'PREMIERE',
    accentColor: '#00E5FF',
  },
  {
    id: '3',
    badge: 'PRESENCIAL',
    title: 'Composição de Imagens',
    institution: 'SAGA',
    studentName: 'Gustavo Mendes Cardoso',
    issueDate: '27/08/2025',
    duration: '3 MESES',
    software: 'PHOTOSHOP',
    accentColor: '#31A8FF',
  },
  {
    id: '4',
    badge: 'PRESENCIAL',
    title: 'Arte Vetorial',
    institution: 'SAGA',
    studentName: 'Gustavo Mendes Cardoso',
    issueDate: '28/05/2025',
    duration: '3 MESES',
    software: 'ILLUSTRATOR',
    accentColor: '#FF9A00',
  },
];

interface CertificateCarouselProps {
  compact?: boolean;
}

export const CertificateCarousel: React.FC<CertificateCarouselProps> = ({ compact = true }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  // Autoplay functionality: scroll automatically every 2.8 seconds
  useEffect(() => {
    if (!emblaApi) return;

    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, 2800);

    return () => clearInterval(autoplayInterval);
  }, [emblaApi]);

  return (
    <div className="relative w-full py-1">
      {/* Controls Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#A6FF00]">
          <Award className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider font-bold text-[11px]">Certificações de Maestria SAGA</span>
        </div>
      </div>

      {/* Embla Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className={compact ? "flex-[0_0_80%] sm:flex-[0_0_46%] min-w-0" : "flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_38%] min-w-0"}
            >
              <div
                className={`relative rounded-2xl bg-zinc-950 border border-zinc-800 p-3.5 flex flex-col justify-between shadow-xl hover:border-[#A6FF00]/60 transition-all duration-300 group ${
                  compact ? 'h-[250px]' : 'h-[420px]'
                }`}
              >
                {/* Certificate Outer Card Header */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-red-600/90 text-white text-[9px] font-mono font-bold tracking-widest rounded uppercase">
                    {cert.badge}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#A6FF00] transition-colors" />
                </div>

                {/* Course Name */}
                <h3 className="font-['Outfit'] font-black text-sm md:text-base text-white mt-1 leading-tight uppercase line-clamp-1">
                  {cert.title}
                </h3>

                {/* Simulated Certificate Sheet inside Card */}
                <div className="bg-zinc-100 text-zinc-900 rounded-xl p-2.5 my-1.5 flex flex-col justify-between border border-zinc-300 shadow-inner flex-1">
                  <div className="flex items-center justify-between border-b border-zinc-300 pb-1 mb-1">
                    <span className="font-['Outfit'] font-extrabold tracking-wider text-xs text-zinc-900">
                      {cert.institution}
                    </span>
                    <div className="w-5 h-5 bg-zinc-900 text-white rounded text-[7px] flex items-center justify-center font-mono font-bold">
                      QR
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-tight">
                    CERTIFICADO DE CONCLUSÃO
                  </div>

                  <div className="font-bold text-xs text-zinc-950 my-0.5 font-['Outfit']">
                    {cert.studentName}
                  </div>

                  <div className="flex justify-between items-end border-t border-zinc-200 pt-1 mt-1">
                    <div className="text-[8px] font-mono text-zinc-500">
                      <div className="italic text-zinc-700 font-serif">Gustavo M.</div>
                    </div>
                    <div className="text-[8px] font-mono text-zinc-500 text-right">
                      <div className="italic text-zinc-700 font-serif">Alexandre S.</div>
                    </div>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="border-t border-zinc-800 pt-1.5 text-[10px] font-mono flex items-center justify-between text-zinc-400">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#A6FF00]" />
                    <span>{cert.issueDate}</span>
                  </div>
                  <span>{cert.duration}</span>
                  <span className="font-bold text-white tracking-wide" style={{ color: cert.accentColor }}>
                    {cert.software}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
