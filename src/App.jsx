import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { Apple, Search, ShoppingBag, Menu, ArrowRight, Sun } from 'lucide-react';
import MoltenMetal from './components/MoltenMetal';
import SplitText from './components/SplitText';
import DashboardMockup from './components/DashboardMockup';
import TiltedCard from './components/TiltedCard';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Estimate from './components/Estimate';
import MyPage from './components/MyPage';
import KakaoCallback from './components/KakaoCallback';
import NaverCallback from './components/NaverCallback';
import GoogleCallback from './components/GoogleCallback';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: '고객' });

  useEffect(() => {
    if (isLoggedIn) {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        setUserProfile(JSON.parse(saved));
      }
    }
  }, [isLoggedIn]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <header
      className={`fixed top-0 z-50 flex justify-center w-full transition-all duration-300 ease-in-out ${
        isScrolled ? 'pt-4 pointer-events-none' : 'pt-0 border-b border-divider-soft bg-transparent'
      }`}
    >
      <motion.nav
        layout
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`flex items-center justify-between w-full mx-auto pointer-events-auto ${
          isScrolled 
            ? 'max-w-[1060px] bg-surface-canvas/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-divider-hairline rounded-full px-6 md:px-8 h-auto py-2 min-h-[56px]' 
            : 'max-w-7xl px-8 h-[60px]'
        }`}
      >
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer shrink-1"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/assets/images/logo.png" alt="Platform Maker Logo" className="w-8 h-8 object-cover rounded-lg mr-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-black/5 shrink-0" />
          <span className="font-display font-bold text-[16px] md:text-[18px] text-ink tracking-tight leading-tight">Platform Maker</span>
        </div>
        
        {/* Links */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-[13px] lg:text-[14px] font-medium text-ink-muted-80 whitespace-nowrap shrink-0">
          <a href="#features" className="hover:text-ink transition-colors">서비스 특징</a>
          <a href="#workflow" className="hover:text-ink transition-colors">작업 프로세스</a>
          <a href="#portfolio" className="hover:text-ink transition-colors">포트폴리오</a>
          <a href="#pricing" className="hover:text-ink transition-colors">비용 및 계약</a>
          <a href="#faq" className="hover:text-ink transition-colors">자주 묻는 질문</a>
          <button onClick={() => navigate('/mypage')} className="hover:text-ink transition-colors font-bold text-[#5227FF]">마</button>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3 lg:space-x-4 shrink-0 whitespace-nowrap">
          {isLoggedIn ? (
            <button 
              onClick={() => navigate('/mypage')}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-1.5 px-3 rounded-full transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#5227FF] to-[#FF9FFC] p-[1.5px]">
                <div className="w-full h-full bg-white rounded-full border border-white flex items-center justify-center bg-gray-100 text-gray-500 font-bold text-[10px]">
                  {userProfile.name.charAt(0)}
                </div>
              </div>
              <span className="text-[13px] font-bold text-gray-700 hidden sm:block">내 정보</span>
            </button>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="text-[15px] font-medium text-ink hover:text-primary transition-colors hidden sm:block"
              >
                로그인
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="btn-secondary !border-divider-hairline !text-ink hover:!bg-surface-parchment !py-2 !px-5 !rounded-lg text-[14px] font-medium shadow-sm bg-surface-canvas"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </motion.nav>
    </header>
  );
}

const HERO_COPY = [
  {
    main: (
      <>대한재활의학과의사회 전용<br/>맞춤형 프리미엄 홈페이지</>
    ),
    sub: (
      <>공장형 템플릿이 아닌 100% 맞춤형 디자인으로<br/>원장님만의 특별한 병원 홈페이지를 구축해 드립니다.</>
    )
  },
  {
    main: (
      <>어떠한 환경과 페이지도<br/>동일가격 199만원 제작</>
    ),
    sub: (
      <>반응형 웹, 모바일 최적화, 네이버/구글 검색 노출(SEO)까지.<br/>복잡한 추가 비용 없이 50% 할인된 특별한 가격으로 제공합니다.</>
    )
  }
];

function Hero() {
  const navigate = useNavigate();
  const [copyIndex, setCopyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCopyIndex((prev) => (prev + 1) % HERO_COPY.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'scrollParent') {
        window.scrollBy({ top: event.data.deltaY, behavior: 'auto' });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section className="tile-light relative pt-[140px] pb-section flex flex-col items-center text-center overflow-hidden min-h-[90vh]">
      <div className="absolute inset-0 z-0 opacity-100">
        <MoltenMetal
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          brightness={1.3}
          colorMode="molten"
          opacity={1.0}
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="mt-[50px] flex flex-col items-center w-full">
          <div className="flex flex-col items-center w-full min-h-[240px] relative">
            <AnimatePresence>
              <motion.div
                key={copyIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 flex flex-col items-center w-full"
              >
                <SplitText
                  tag="h1"
                  className="text-[40px] md:text-[56px] font-bold tracking-tight mb-4 text-ink leading-[1.15] max-w-4xl"
                  delay={50}
                  duration={1.5}
                  splitType="words, chars"
                >
                  {HERO_COPY[copyIndex].main}
                </SplitText>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[17px] text-ink-muted-80 mt-6 max-w-2xl leading-relaxed"
                >
                  {HERO_COPY[copyIndex].sub}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex items-center justify-center"
          >
            <button 
              onClick={() => navigate('/estimate')}
              className="relative overflow-hidden group flex items-center justify-center rounded-full px-8 py-4 text-[17px] font-bold text-black transition-all duration-300 transform hover:-translate-y-1 shadow-[inset_0_0_0_2px_black] hover:shadow-[0_15px_40px_rgba(82,39,255,0.25)] hover:text-white"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#5227FF] to-[#FF9FFC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out z-0 skew-x-12"></div>

              <span className="relative z-10 flex items-center tracking-wide">
                MOU 특별 혜택 신청하기
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-[164px] w-full max-w-[1440px] aspect-[16/9] bg-white rounded-2xl border border-divider-soft shadow-[0_40px_80px_rgba(0,0,0,0.15)] overflow-hidden flex items-center justify-center relative"
        >
          <iframe 
            src="https://naumclinic.pages.dev/" 
            className="w-full h-full border-none bg-white"
            title="나음의원 포트폴리오 미리보기"
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="bg-black text-white flex flex-col items-center text-center pt-32 pb-section px-4 relative overflow-hidden min-h-screen">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      {/* Dome Container */}
      <div className="relative z-10 w-full max-w-[1200px] mt-10 flex flex-col items-center">
        {/* Animated Dome Background Wrapper */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] sm:w-[1200px] h-[200vw] sm:h-[1200px] rounded-full overflow-hidden p-[1px] opacity-80" style={{ clipPath: 'inset(0 0 50% 0)' }}>
          {/* Animated Light Beam */}
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_200deg,white_260deg,transparent_360deg)] animate-spin" style={{ animationDuration: '8s' }}></div>
          {/* Inner Black Dome */}
          <div className="absolute inset-[1px] bg-black rounded-full"></div>
          {/* Soft glowing gradient at the top of the dome */}
          <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
        </div>

        {/* Content inside Dome */}
        <div className="relative z-20 pt-[80px] sm:pt-[120px] pb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h2 className="text-[48px] md:text-[72px] font-bold leading-[1.1] tracking-tight text-white mb-6">
              Platform Maker
            </h2>
            <p className="text-[20px] md:text-[24px] text-white/80 font-medium tracking-tight">
              개원가 원장님들의 홈페이지 고민을 해결해드립니다.
            </p>
          </motion.div>
        </div>

        {/* 3 Cards */}
        <div className="relative z-30 w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] px-4 mt-12 mb-32">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltedCard
              containerHeight="380px"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.03}
              rotateAmplitude={8}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div className="w-full h-full bg-[#0f0f0f] border border-white/10 pt-10 px-8 pb-10 rounded-[24px] flex flex-col justify-start shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-center mb-8">
                  <h3 className="text-[24px] font-semibold text-white mb-3">병원 맞춤형 홈페이지</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed break-keep">
                    찍어내는 공장형 디자인이 아닌<br/>우리 병원만의 차별화된 웹사이트
                  </p>
                </div>

                <ul className="space-y-3.5 flex flex-col justify-center">
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">환자의 신뢰를 얻는 프리미엄 UI/UX 기획</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">진료 과목과 특화 클리닉을 돋보이게 하는 구성</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">네이버, 구글 등 주요 포털 검색(SEO) 최적화</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">AI 검색 엔진(AEO)에 대응하는 차세대 웹 표준</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">PC/태블릿/모바일 100% 반응형 웹 지원</span>
                  </li>
                </ul>
              </div>
            </TiltedCard>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltedCard
              containerHeight="380px"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.03}
              rotateAmplitude={8}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div className="w-full h-full bg-[#141414] border border-white/15 pt-10 px-8 pb-10 rounded-[24px] flex flex-col justify-start shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-center mb-8">
                  <h3 className="text-[24px] font-semibold text-white mb-3">전환율 중심 설계</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed break-keep">
                    방문자를 실제 내원 환자로 이끄는<br/>효과적인 온라인 마케팅 거점
                  </p>
                </div>

                <ul className="space-y-3.5 flex flex-col justify-center">
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">전화 연결 및 카카오톡 상담 즉시 연동</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">네이버 플레이스/예약 서비스 완벽 연동</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">사용자 행동 데이터 기반 전환율 최적화</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">의료법을 준수하는 검증된 마케팅 텍스트</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">이벤트 및 랜딩페이지로의 손쉬운 확장</span>
                  </li>
                </ul>
              </div>
            </TiltedCard>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltedCard
              containerHeight="380px"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.03}
              rotateAmplitude={8}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div className="w-full h-full bg-[#0f0f0f] border border-white/10 pt-10 px-8 pb-10 rounded-[24px] flex flex-col justify-start shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-center mb-8">
                  <h3 className="text-[24px] font-semibold text-white mb-3">합리적인 유지보수</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed break-keep">
                    값비싼 월 관리비 대신<br/>MOU 특별가로 부담 없이 시작
                  </p>
                </div>

                <ul className="space-y-3.5 flex flex-col justify-center">
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">제작비 50% 파격 할인 혜택 (199만원)</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">월 유지보수비 단 5만원으로 서버/도메인 지원</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">빠르고 정확한 텍스트/이미지 수정 처리</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">트래픽 급증에도 다운되지 않는 안정적인 서버</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">정기적인 보안 업데이트 및 백업 제공</span>
                  </li>
                </ul>
              </div>
            </TiltedCard>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center mt-12 pb-24 relative z-20"
      >
        <h3 className="text-[28px] md:text-[40px] font-bold leading-[1.3] text-white mb-6">
          재활의학과의사회 협력을 통해<br/>
          재활의학과의 성장을 돕습니다.
        </h3>
        <p className="text-[20px] md:text-[24px] text-white font-medium mt-4">
          Platform Maker가 여러분과 함께 합니다.
        </p>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    {
      id: 1,
      title: "병원 브랜딩 맞춤 디자인",
      desc: "공장형 템플릿으로는 브랜드를 각인시킬 수 없습니다. 원장님만의 진료 철학과 병원의 분위기를 온전히 담아내는 독창적인 인터페이스를 설계합니다.",
      visual: "/assets/images/feature_ui_ux_1787196032064.png",
      className: "md:col-span-2 md:row-span-1" // 넓은 가로형 카드
    },
    {
      id: 2,
      title: "병원 맞춤형 원장님 대시보드",
      desc: "실시간 온라인 예약, 환자 유입 통계, 공지사항을 한눈에 직관적으로 제어할 수 있는 스마트 백오피스를 제공합니다.",
      visual: "/assets/images/feature_admin_dashboard_1787196044390.png",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 3,
      title: "보안 및 최상급 서버 안정성",
      desc: "환자들의 원활한 접속을 위해 트래픽 폭주 시에도 다운되지 않는 빠르고 안정적인 최신 클라우드 서버 환경을 구축합니다.",
      visual: "/assets/images/feature_server_stability_1787196057950.png",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 4,
      title: "강력한 마케팅 & SEO 연동",
      desc: "환자들이 지역 내 재활의학과 검색 시 효과적으로 노출될 수 있도록 네이버/구글 검색 엔진 최적화(SEO)를 완벽하게 적용합니다.",
      visual: "/assets/images/feature_ai_integration_1787196071031.png",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 5,
      title: "올케어 안심 유지보수",
      desc: "제작만 하고 끝내지 않습니다. 바쁘신 원장님을 대신해 팝업 등록, 진료 시간 변경, 신규 장비 안내 등 철저한 사후 관리를 책임집니다.",
      visual: "/assets/images/feature_maintenance_care_1787196082088.png",
      className: "md:col-span-1 md:row-span-1"
    }
  ];

  return (
    <section id="features" className="bg-black text-white relative py-24 md:py-32 px-4">
      {/* High-end Subtle Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.4)]"></div>

      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-[36px] md:text-[52px] font-bold tracking-tight mb-6 leading-[1.2]">
            최신 기능과 맞춤형 디자인,<br />환자 유입을 위한 완벽한 기반
          </h2>
          <p className="text-[18px] text-white/50">재활의학과 홈페이지를 위한 5가지 차별화 포인트</p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-[24px] bg-[#0a0a0a] border border-white/5 flex flex-col ${feature.className || ''}`}
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
                <img src={feature.visual} alt={feature.title} className="w-full h-full object-cover opacity-[0.4] group-hover:opacity-[0.6] group-hover:scale-105 transition-all duration-700" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10 min-h-[340px] pointer-events-none">
                <div className="text-white/50 font-semibold mb-3 tracking-[0.2em] text-[12px]">
                  POINT 0{idx + 1}
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold leading-[1.3] mb-3 tracking-tight break-keep">
                  {feature.title}
                </h3>
                <p className="text-[15px] md:text-[16px] leading-[1.6] text-white/60 max-w-[400px] break-keep">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  const workflow = [
    {
      week: 1,
      title: "병원 심층 분석 및 메뉴 기획",
      desc: "원장님의 진료 철학과 주력 클리닉을 분석하여, 환자들에게 신뢰를 주는 맞춤형 메뉴 구조를 기획합니다.",
      tasks: [
        "1:1 온/오프라인 미팅을 통한 병원 장점 및 요구사항 분석",
        "주요 진료 과목 및 클리닉 메뉴 트리 확정",
        "메인 페이지 스토리보드 및 디자인 컨셉 제안"
      ]
    },
    {
      week: 2,
      title: "맞춤형 하이엔드 UI/UX 디자인",
      desc: "공장형 템플릿이 아닌, 오직 원장님 병원만을 위한 독창적이고 고급스러운 디자인을 완성합니다.",
      tasks: [
        "PC, 모바일, 태블릿에 최적화된 반응형 디자인 설계",
        "메인 화면 및 주요 서브 페이지 비주얼 퍼블리싱",
        "디자인 시안 1차 전달 및 원장님 피드백 수렴"
      ]
    },
    {
      week: 3,
      title: "기능 개발 및 관리자 연동",
      desc: "병원 운영에 꼭 필요한 실용적인 기능들을 개발하고, 원장님 전용 관리자 시스템에 연동합니다.",
      tasks: [
        "온라인 예약 시스템 및 카카오톡 상담 채널 연동",
        "진료시간 변경, 팝업 관리를 위한 직관적인 대시보드 구축",
        "병원 소개, 의료진 안내, 오시는 길 등 상세 정보 반영"
      ]
    },
    {
      week: 4,
      title: "통합 테스트 및 정식 런칭",
      desc: "꼼꼼한 검수와 마케팅 세팅 후, 병원의 온라인 간판을 세상에 성공적으로 오픈합니다.",
      tasks: [
        "기기별 호환성 테스트 및 검색엔진 최적화(SEO) 적용",
        "최종 도메인 연결 및 보안 인증서(SSL) 세팅",
        "관리자 페이지 인수인계 및 사후 유지보수 안내"
      ]
    }
  ];

  return (
    <section id="workflow" className="bg-black text-white relative py-32 px-4">
      {/* High-end Subtle Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.4)]"></div>

      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h2 className="text-[36px] md:text-[52px] font-bold tracking-tight mb-4 leading-[1.3]">
            계약부터 홈페이지 오픈까지 단 4주.<br />성공적인 개원을 위한 체계적인 워크플로우
          </h2>
          <p className="text-[16px] md:text-[18px] text-white/50">
            * 협의에 따라 작업 기간은 유연하게 변경 가능합니다.
          </p>
        </motion.div>

        <div className="relative pl-8 md:pl-0">
          {/* Base Vertical Line */}
          <div className="absolute left-[15px] md:left-[50%] top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2"></div>

          {workflow.map((item, index) => (
            <motion.div 
              key={item.week}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col md:flex-row items-start w-full mb-12 md:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} ${index > 0 ? 'md:-mt-24 lg:-mt-32' : ''}`}
            >
              {/* Dot on the line */}
              <div className="absolute left-[-33px] md:left-1/2 md:-translate-x-1/2 top-[32px] md:top-[64px] w-[16px] h-[16px] bg-black border-4 border-white rounded-full z-10 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>

              {/* Content Box */}
              <div className={`w-full md:w-1/2 relative z-20 ${index % 2 === 0 ? 'md:pl-10 lg:pl-16' : 'md:pr-10 lg:pr-16'}`}>
                <div className="bg-[#111] border border-white/10 rounded-3xl p-8 hover:bg-[#151515] hover:border-white/30 transition-colors duration-500 shadow-lg">
                  <div className="text-white/40 font-bold tracking-widest text-[14px] mb-2">WEEK {item.week}</div>
                  <h3 className="text-[22px] md:text-[24px] font-bold mb-4">{item.title}</h3>
                  <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed mb-6 break-keep">
                    {item.desc}
                  </p>
                  
                  {item.tasks.length > 0 && (
                    <ul className="space-y-3 border-t border-white/10 pt-6">
                      {item.tasks.map((task, i) => (
                        <li key={i} className="flex items-start text-[13px] md:text-[14px] text-white/50">
                          <span className="mr-3 text-white/30 text-[10px] mt-[6px]">●</span>
                          <span className="leading-relaxed break-keep">{task}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const portfolios = [
    {
      id: 1,
      type: "대표적 스타일",
      title: "프리미엄 재활의학과",
      tags: ["#표준형", "#정보전달최적화", "#신뢰감"],
      url: "https://naumclinic.pages.dev/",
      image: "/assets/images/portfolio_1.gif",
      desc: "다양한 진료 과목과 병원 안내를 체계적으로 보여주는 가장 표준적이고 안정적인 레이아웃입니다."
    },
    {
      id: 2,
      type: "풀페이지 스크롤형",
      title: "브랜딩 특화 홈페이지",
      tags: ["#시각적임팩트", "#몰입감", "#고급스러움"],
      url: "https://naumclinic.pages.dev/fullpage",
      image: "/assets/images/portfolio_2.gif",
      desc: "한 화면씩 꽉 채워서 넘어가는 방식으로, 병원의 철학과 하이엔드 브랜딩을 강조할 때 강력한 인상을 줍니다."
    },
    {
      id: 3,
      type: "원페이지형",
      title: "특화 진료 및 이벤트 랜딩",
      tags: ["#심플함", "#빠른정보전달", "#전환율최적화"],
      url: "https://naumclinic.pages.dev/onepage",
      image: "/assets/images/portfolio_3.gif",
      desc: "페이지 이동 없이 스크롤만으로 핵심 정보를 빠르게 전달하며, 특정 진료나 이벤트를 집중 홍보하기에 최적화된 구조입니다."
    }
  ];

  return (
    <section id="portfolio" className="bg-white text-[#111] relative py-32 px-4 border-t border-black/5">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-[48px] md:text-[64px] font-bold tracking-tight mb-6 font-display text-black">
            Portfolio
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#666] leading-[1.6] max-w-[700px] mx-auto break-keep">
            성공적인 개원과 신뢰받는 병원 브랜딩을 완성하는 <span className="font-semibold text-[#5227FF]">재활의학과 맞춤형 홈페이지 레퍼런스</span>를 직접 확인해 보세요.
          </p>
        </motion.div>

        {/* Horizontal Stack */}
        <div className="flex flex-col gap-20 md:gap-32">
          {portfolios.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Text Info */}
              <div className="flex-1 w-full text-left">
                <div className="text-[14px] md:text-[16px] font-bold text-[#5227FF] mb-4 tracking-wider">0{index + 1} / {item.type}</div>
                <h3 className="text-[32px] md:text-[40px] font-bold text-black mb-6 leading-tight break-keep">{item.title}</h3>
                <p className="text-[16px] md:text-[18px] text-[#666] mb-8 leading-relaxed break-keep">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-[#f5f5f7] text-[#555] text-[14px] rounded-full font-medium tracking-tight">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-4 rounded-full font-semibold text-[15px] hover:bg-[#333] transition-colors"
                >
                  새 창에서 사이트 보기 ↗
                </a>
              </div>

              {/* Image Container */}
              <a 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 w-full group relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5 block"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 text-white font-bold py-3 px-6 rounded-full text-[14px]">
                    새 창에서 열기 ↗
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="bg-white text-[#111] relative py-32 px-4 border-t border-black/5">
      <div className="max-w-[1000px] mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-[48px] md:text-[56px] font-bold tracking-tight mb-6 font-display text-black leading-tight">
            재활의학과의사회<br />특별 제안 가격
          </h2>
          <p className="text-[18px] text-[#666] leading-[1.6] max-w-[600px] mx-auto break-keep">
            비즈니스 단계에 맞는 최적의 플랜을 선택하세요.
          </p>
        </motion.div>

        <div className="max-w-[760px] mx-auto">
          
          {/* Card 1: MOU Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0a0a0a] text-white rounded-[40px] p-12 md:p-16 flex flex-col items-center relative shadow-[0_40px_80px_rgba(0,0,0,0.2)]"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FF9FFC] text-black text-[15px] md:text-[18px] font-bold px-8 py-3.5 rounded-full tracking-wider shadow-lg">
              MOU 특별 혜택
            </div>
            
            <h3 className="text-[32px] md:text-[40px] font-bold mb-5 mt-4 text-center text-white leading-tight">재활의학과 프리미엄 홈페이지</h3>
            <p className="text-[17px] md:text-[19px] text-white/60 mb-10 text-center break-keep leading-relaxed max-w-[500px]">
              재활의학과의사회 소속 원장님들만을 위한 파격적인 특별 할인
            </p>
            
            <div className="mb-12 pb-12 border-b border-white/10 flex flex-col items-center w-full">
              <span className="line-through text-white/40 text-[20px] mb-3">기존 400만원</span>
              <div className="text-[64px] md:text-[84px] font-extrabold tracking-tight text-[#FF9FFC] leading-none flex items-baseline">
                199
                <span className="text-[26px] md:text-[36px] font-bold text-white/80 ml-2">만원</span>
                <span className="text-[16px] md:text-[20px] font-medium text-white/50 ml-3">(50% 할인)</span>
              </div>
            </div>
            
            <ul className="space-y-5 mb-14 w-full max-w-[500px]">
              <li className="flex items-center text-[17px] md:text-[19px] font-semibold text-white">
                <span className="mr-4 text-[16px] md:text-[18px]">⚡</span> 월 관리비 단 5만원 (유지보수비 파격할인)
              </li>
              <li className="flex items-center text-[16px] md:text-[18px] text-white/70">
                <span className="mr-4 text-white/30 text-[12px]">●</span> 100% 원장님 맞춤형 하이엔드 UI/UX
              </li>
              <li className="flex items-center text-[16px] md:text-[18px] text-white/70">
                <span className="mr-4 text-white/30 text-[12px]">●</span> 네이버/구글 SEO 및 AEO 기본 최적화
              </li>
              <li className="flex items-center text-[16px] md:text-[18px] text-white/70">
                <span className="mr-4 text-white/30 text-[12px]">●</span> 스마트한 원장님 전용 관리자 페이지
              </li>
              <li className="flex items-center text-[16px] md:text-[18px] text-white/70">
                <span className="mr-4 text-white/30 text-[12px]">●</span> 병원 예약 시스템 및 카카오톡 연동
              </li>
              <li className="flex items-center text-[16px] md:text-[18px] text-white/70">
                <span className="mr-4 text-white/30 text-[12px]">●</span> 서버 및 도메인 1년 무상 지원
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/estimate')}
              className="w-full max-w-[500px] py-5 rounded-full bg-white text-black font-extrabold text-[18px] md:text-[20px] transition-transform duration-200 active:scale-95 hover:bg-gray-100 shadow-xl"
            >
              MOU 혜택 신청하기
            </button>
          </motion.div>

        </div>

        {/* Contract Process Guide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 pt-24 border-t border-black/10"
        >
          <div className="text-center mb-16">
            <h3 className="text-[32px] md:text-[40px] font-bold text-black mb-4 tracking-tight">투명하고 안전한 계약 진행 안내</h3>
            <p className="text-[#666] text-[16px] md:text-[18px] break-keep">
              비주얼이 완성된 후 중도금을, 최종 배포까지 책임진 후 잔금을 받습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-black/5"></div>
            
            {[
              {
                step: "01",
                title: "기획 및 계약",
                badge: "계약금 50%",
                badgeColor: "bg-black text-white shadow-md",
                desc: ["원장님 심층 인터뷰 및 요구사항 분석", "병원 특화 메뉴 구성 및 계약 체결"]
              },
              {
                step: "02",
                title: "디자인 완료",
                badge: "디자인 진행",
                badgeColor: "bg-[#f5f5f7] text-[#555] border border-black/10",
                desc: ["병원 브랜딩 맞춤형 UI/UX 설계", "디자인 시안 컨펌 및 피드백 반영"]
              },
              {
                step: "03",
                title: "기능 개발 및 검증",
                badge: "개발 및 테스트",
                badgeColor: "bg-transparent text-[#999] border border-transparent",
                desc: ["진료 안내, 랜딩 페이지 등 퍼블리싱", "예약 연동 및 모바일 호환성 테스트"]
              },
              {
                step: "04",
                title: "정식 런칭",
                badge: "잔금 50%",
                badgeColor: "bg-[#f5f5f7] text-[#555] border border-black/10",
                desc: ["네이버/구글 검색 엔진 최적화(SEO)", "도메인 연결 및 관리자 권한 인수인계"]
              }
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                {/* Node */}
                <div className="w-[56px] h-[56px] rounded-full bg-white border border-black/10 shadow-[0_10px_20px_rgba(0,0,0,0.06)] flex items-center justify-center text-[20px] font-bold text-black relative z-10 mb-6 font-display">
                  {item.step}
                </div>
                
                <h4 className="text-[22px] font-bold text-black mb-3">{item.title}</h4>
                <div className={`px-4 py-1.5 rounded-full text-[13px] font-bold mb-6 tracking-wide ${item.badgeColor}`}>
                  {item.badge}
                </div>
                
                <ul className="space-y-2 text-[#555]">
                  {item.desc.map((d, i) => (
                    <li key={i} className="text-[15px] break-keep leading-relaxed">{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Refund Guarantee Banner */}
          <div className="mt-20 flex justify-center">
            <div className="bg-[#f8f8f8] border border-black/10 rounded-2xl py-6 px-8 md:px-10 flex flex-col md:flex-row items-center gap-5 shadow-sm">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-[22px] flex-shrink-0">
                ✓
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-[18px] font-bold text-black mb-1">개발 중단시 100% 환불 보장</h4>
                <p className="text-[15px] text-[#555] break-keep">개발사의 문제로 인해서 개발 중단시 100% 환불을 보장드립니다.</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "병원 홈페이지 제작에 대해 잘 모릅니다. 알아서 기획해주시나요?",
      a: "네, 물론입니다. 수많은 병원 홈페이지 제작 노하우를 바탕으로, 원장님의 진료 철학과 주력 클리닉만 간단히 말씀해 주시면 환자 유입에 최적화된 맞춤형 기획과 메뉴 구조를 저희가 직접 설계해 드립니다."
    },
    {
      q: "재활의학과의사회 MOU 특별 제안가 199만원 외에 추가 비용이 발생하나요?",
      a: "기본적인 추가 개발 비용은 전혀 없습니다. 199만원(50% 할인, VAT 별도) 정액제 안에 반응형 하이엔드 홈페이지, 온라인 예약 연동, 검색엔진 최적화(SEO) 등 필수 기능이 모두 포함되어 있습니다. 단, 이 제안가는 일반적인 의원급 홈페이지 규모 제작에 한하며, 규모가 훨씬 큰 대형 프로젝트는 별도 협의를 통해 진행됩니다. (물론 이 또한 재활의학과의사회 특별 할인가로 진행해 드립니다.) 런칭 후 서버 호스팅 및 관리를 위한 월 유지보수 비용(5만원, VAT 별도)만 별도로 발생합니다."
    },
    {
      q: "약속된 '단 4주 완성' 기간은 어떻게 보장되나요?",
      a: "저희는 한 번에 무리하게 다수의 병원 프로젝트를 쳐내지 않고, 체계적인 1:1 전담 개발 시스템으로 일정을 철저히 관리합니다. 원장님께서 디자인 컨펌과 피드백만 빠르게 주신다면, 4주 안에 완성된 결과물을 보장합니다. 또한 보다 빠른 작업을 원하신다면 그 또한 얼마든지 가능합니다."
    },
    {
      q: "월 5만원의 유지보수에는 어떤 서비스가 포함되나요?",
      a: "안정적인 클라우드 서버 및 트래픽 비용, 보안 SSL 인증서 관리는 물론이고, 바쁘신 원장님을 대신하여 진료 시간 변경, 간단한 이미지 및 텍스트 수정 등 필수적인 사후 관리가 무상으로 지원됩니다. (단, 팝업 관리는 원장님 전용 대시보드에서 직접 하실 수 있도록 세팅해 드립니다.)"
    },
    {
      q: "기존 홈페이지가 이미 있습니다. 리뉴얼을 해도 MOU 혜택이 적용되나요?",
      a: "네, 동일하게 적용됩니다. 기존 홈페이지의 내용을 수정 및 보완하여 낡은 디자인과 시스템을 완전히 새롭게 재구축해 드립니다. 단, 기존 서버나 타 업체의 시스템을 그대로 유지하는 것은 불가능하며, 저희의 최신 시스템 서버 환경에서 완전히 새롭게 시작하시게 됩니다."
    },
    {
      q: "4주 동안 진행 상황은 어떻게 공유받을 수 있나요?",
      a: "프로젝트 시작 즉시 원장님 전용 소통 채널(카카오톡 등)을 개설하여 실시간으로 소통합니다. 기획, 디자인 시안, 개발 완료 등 주요 단계마다 실제 클릭하고 확인해볼 수 있는 시연 링크를 보내드립니다."
    },
    {
      q: "결제 방식과 계약 진행은 어떻게 이루어지나요?",
      a: "초기 기획 및 계약 단계에서 총 금액의 50%를 선금으로 결제하시고, 4주 뒤 모든 기능 검수 후 정식 오픈(런칭) 시점에 나머지 50% 잔금을 결제하시는 가장 안전하고 합리적인 방식으로 진행됩니다."
    }
  ];

  return (
    <section id="faq" className="bg-[#f5f5f7] py-32 px-4 border-t border-black/5">
      <div className="max-w-[800px] mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] md:text-[52px] font-bold tracking-tight mb-6 font-display text-black">
            자주 묻는 질문
          </h2>
          <p className="text-[17px] text-[#666]">프로젝트 시작 전 궁금하신 점을 모두 해결해 드립니다.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-6 md:px-8 md:py-7 flex justify-between items-center focus:outline-none group"
              >
                <span className="font-bold text-[16px] md:text-[18px] text-black pr-8 tracking-tight group-hover:text-blue-600 transition-colors">
                  {faq.q}
                </span>
                <span className={`text-2xl font-light flex-shrink-0 transition-transform duration-300 transform ${openIndex === index ? 'rotate-180 text-blue-600' : 'text-black/40'}`}>
                  ↓
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-7 md:px-8 pt-2 text-[#555] text-[15px] md:text-[16px] leading-[1.7] border-t border-black/5 mx-2 md:mx-4 break-keep">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#0a0a0a] text-[#888] pt-20 pb-12 px-6 border-t border-white/5 text-[14px] font-body">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          
          {/* Brand & Call to action */}
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <img src="/assets/images/logo.png" alt="Platform Maker Logo" className="w-11 h-11 object-cover rounded-xl mr-4 shadow-lg border border-white/10" />
              <h2 className="text-[28px] font-bold text-white tracking-tight">Platform Maker</h2>
            </div>
            <p className="text-[16px] text-[#999] mb-8 max-w-[400px] leading-[1.6] break-keep">
              위대한 비즈니스는 빠른 실행에서 시작됩니다.<br/>
              당신의 혁신적인 아이디어를 세상에 가장 완벽한 형태로 내놓으세요.
            </p>
            <button 
              onClick={() => navigate('/estimate')}
              className="bg-white text-black text-[15px] font-bold py-4 px-8 rounded-full transition-transform duration-200 active:scale-95 hover:bg-gray-200"
            >
              프로젝트 문의하기
            </button>
          </div>

          {/* Business Info */}
          <div className="md:w-1/2 flex flex-col md:items-end">
            <div className="space-y-2 text-left md:text-right text-[13px] leading-relaxed">
              <p><strong className="text-white font-medium text-[15px]">주식회사 블루프라임</strong></p>
              <p>대표자: 김덕규 <span className="mx-2 text-white/20">|</span> 사업자등록번호: 153-87-03544</p>
              <p>서울특별시 노원구 상계로23다길 13-8, 1101호</p>
              <div className="pt-3 flex flex-col md:flex-row md:justify-end gap-2 md:gap-6">
                <span>Tel: <strong className="text-white font-medium tracking-wider">010-3046-9821</strong></span>
                <span>Email: <strong className="text-white font-medium tracking-wide">goodduck2@naver.com</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[12px] text-[#666]">
          <p className="mt-4 md:mt-0">© 2026 Platform Maker (BluePrime Co., Ltd.). All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    // 앱 초기 로드 시 백엔드(/api/auth/me)로 요청을 보내 HttpOnly 쿠키(JWT)가 유효한지 검증합니다.
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        if (data.success && data.user) {
          setIsLoggedIn(true);
          // 프론트엔드 UI용으로만 로컬 스토리지에 최신 유저 정보를 업데이트합니다.
          localStorage.setItem('userProfile', JSON.stringify(data.user));
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          // 토큰이 없거나 만료된 경우 모든 로컬 캐시를 지우고 로그아웃 상태로 만듭니다.
          setIsLoggedIn(false);
          localStorage.removeItem('userProfile');
          localStorage.removeItem('isLoggedIn');
        }
      } catch (error) {
        console.error('Session check error:', error);
        setIsLoggedIn(false);
        localStorage.removeItem('userProfile');
        localStorage.removeItem('isLoggedIn');
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  if (isCheckingSession) {
    // 세션 확인 중일 때는 아무것도 그리지 않거나 로딩 스피너를 보여줄 수 있습니다.
    return <div className="min-h-screen bg-surface-canvas flex items-center justify-center"></div>;
  }

  return (
    <div className="w-full min-h-screen bg-surface-canvas">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <main className="w-full">
              <Hero />
              <Pricing />
              <Problem />
              <Features />
              <Workflow />
              <Portfolio />
              <FAQ />
            </main>
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/mypage" element={<MyPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/auth/naver/callback" element={<NaverCallback setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/auth/google/callback" element={<GoogleCallback setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
