import React from 'react';
import { motion } from 'framer-motion';
import { 
  MonitorSmartphone, 
  Search, 
  Bot, 
  ShieldCheck, 
  Stethoscope, 
  Wrench, 
  MousePointerClick, 
  FileText, 
  Lock, 
  LayoutDashboard, 
  CalendarCheck, 
  Zap 
} from 'lucide-react';

export default function FeaturesCube() {
  const features = [
    {
      icon: <MonitorSmartphone size={24} className="text-[#5227FF]" />,
      title: "반응형 홈페이지",
      desc: "PC, 태블릿, 모바일 어떤 기기에서도 깨짐 없이 완벽한 비율로 알아서 맞춰지는 디자인."
    },
    {
      icon: <Search size={24} className="text-[#5227FF]" />,
      title: "SEO 최적화",
      desc: "구글, 네이버 등 주요 포털 검색 결과 상위에 노출될 수 있도록 기술적 최적화 세팅."
    },
    {
      icon: <Bot size={24} className="text-[#5227FF]" />,
      title: "AEO 최적화",
      desc: "챗GPT 등 차세대 AI 검색 엔진에서도 병원 정보가 정확히 답변되도록 구조화된 데이터 적용."
    },
    {
      icon: <ShieldCheck size={24} className="text-[#5227FF]" />,
      title: "의료광고법 준수",
      desc: "까다로운 의료광고법과 가이드라인을 철저히 분석하여 안전한 병원 마케팅 기반 마련."
    },
    {
      icon: <Stethoscope size={24} className="text-[#5227FF]" />,
      title: "병원 홈페이지 전문",
      desc: "병원 시스템과 환자의 심리를 가장 잘 이해하는 전문 기획자와 디자이너의 맞춤형 설계."
    },
    {
      icon: <Wrench size={24} className="text-[#5227FF]" />,
      title: "1:1 전담 유지보수",
      desc: "오픈 후에도 방치되지 않도록, 원장님 병원만을 위한 전담 매니저가 신속한 사후 관리 지원."
    },
    {
      icon: <MousePointerClick size={24} className="text-[#5227FF]" />,
      title: "쉬운 직접 수정",
      desc: "진료 시간 변경, 공지 등을 개발자 없이도 누구나 클릭 몇 번으로 쉽게 수정 가능한 노코드 기반."
    },
    {
      icon: <FileText size={24} className="text-[#5227FF]" />,
      title: "비급여 진료비 고지",
      desc: "보건복지부 지침에 따른 비급여 항목 고지 의무를 완벽하게 충족하는 전용 게시판 기본 탑재."
    },
    {
      icon: <Lock size={24} className="text-[#5227FF]" />,
      title: "최고 수준 철통 보안",
      desc: "환자의 민감한 개인정보 유출을 원천 차단하는 SSL 암호화 및 최신 보안 프로토콜 적용."
    },
    {
      icon: <LayoutDashboard size={24} className="text-[#5227FF]" />,
      title: "최신형 관리자 페이지",
      desc: "복잡하고 낡은 관리자 창 대신, 직관적이고 세련된 대시보드를 통해 온라인 현황을 한눈에 파악."
    },
    {
      icon: <CalendarCheck size={24} className="text-[#5227FF]" />,
      title: "온라인 예약 연동",
      desc: "네이버 예약, 카카오톡 채널 상담 등 환자가 가장 편하게 접근하는 예약 시스템과의 매끄러운 연동."
    },
    {
      icon: <Zap size={24} className="text-[#5227FF]" />,
      title: "초고속 로딩 최적화",
      desc: "3초 이상 걸리면 이탈합니다. 최신 이미지 압축 기술과 캐싱으로 즉각적으로 열리는 쾌적한 속도."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className="py-24 px-4 bg-[#F8F9FA] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight mb-4 text-ink">
            재활의학과에 <span className="text-[#5227FF]">꼭 필요한 12가지</span> 핵심 기능
          </h2>
          <p className="text-[17px] text-ink-muted-80 max-w-2xl mx-auto leading-relaxed">
            환자의 신뢰를 얻고 병원의 가치를 높이는 모든 기술적, 마케팅적 요소가 완벽하게 준비되어 있습니다.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(82,39,255,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F3EBFF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-[18px] font-bold text-ink mb-3 group-hover:text-[#5227FF] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-[14px] text-ink-muted-80 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
