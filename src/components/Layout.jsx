import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    const isDark = savedMode ? savedMode === 'dark' : true;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: 'dashboard' },
    { path: '/deep-dive', label: 'Deep Dive', icon: 'analytics' },
    { path: '/interests', label: 'Interests', icon: 'insights' },
    { path: '/developer', label: 'Developer', icon: 'engineering' }
  ];

  return (
    <div className="min-h-screen bg-background text-on-background font-body-base antialiased pb-24 md:pb-0 transition-colors duration-500">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-surface-container dark:bg-white/5 dark:bg-slate-900/40 backdrop-blur-md border-b border-outline-variant dark:border-white/10 shadow-xl shadow-black/20">
        <div className="flex items-center gap-4">
          <img 
            alt="Prasetiya Mulya Logo" 
            className="h-8 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLMqWsOvieeKGRuLK8-Dw1vYvy_GoIJuta2n-TrGf_NUIZojZr19Y59EXi-2vWM8YSVTP3i6BdigslqZEDEhrapSe5MXjbCGdhHEuyJROySo04kydYbPBB3HbaBbMJYHzocv3StFsFshcrIvxo9o3BPmdRXolj21q9y1hX1aE29mmHXa_A3nrdIl2lMvfMz0ooS51mhR1kejvAPptEc0nNkn_jAXb7W4pH-a7eG40-0_wwsKK8o2Jd6c8fcrnddvz88RJM9Mrmec8"
          />
          <span className="hidden sm:block text-lg font-bold tracking-widest uppercase text-on-surface dark:text-white dark:text-cyan-50 font-inter">Prasetiya Mulya Weather Station</span>
          <span className="sm:hidden text-md font-bold tracking-widest uppercase text-on-surface dark:text-white font-inter">PMU Weather</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`font-inter tracking-tight px-3 py-1 transition-colors duration-200 ${
                  location.pathname === link.path 
                    ? 'text-primary dark:text-cyan-400 border-b-2 border-primary dark:border-cyan-400' 
                    : 'text-muted dark:text-slate-400 hover:bg-surface-container-high dark:bg-white/10 rounded-md'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4 ml-6 border-l border-outline-variant dark:border-white/10 pl-6">
            <button 
              onClick={toggleDarkMode}
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high dark:bg-white/10 transition-colors text-muted dark:text-slate-400 hover:text-on-surface dark:text-white"
              aria-label="Toggle Dark Mode"
            >
              {/* Moon Icon (Shows in Light Mode to switch to Dark) */}
              <span 
                className={`material-symbols-outlined absolute transition-all duration-500 ${!isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
              >
                dark_mode
              </span>
              {/* Sun Icon (Shows in Dark Mode to switch to Light) */}
              <span 
                className={`material-symbols-outlined absolute transition-all duration-500 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}
              >
                light_mode
              </span>
            </button>
            <div className="w-8 h-8 rounded-full border border-primary dark:border-cyan-400/30 overflow-hidden">
              <img 
                alt="Research Faculty Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_zMSN_i_XlmogmAvLG_9GlZbo1z8iR9l3StjPtdSdRA1yufqWfBaRg2GO9C2w0h_DyoO3qKP_ui7zJcaQKFKyDoOV8jxuzW6WE53vPu6UqEdc4V2aW5Xn1JvpjyMVqAkxqoR0TsmeaOsDg5hsNJq5yDUuR1m2ssuyPr9_z3TUUddgCk4g-fQP71JLjv9WD6zhwG0uKgHzFsZFQy84z4Ra58X3QYh62Gr4IJ6RiNw5TU50rO5gKwPWxUzFDZn_UZBvnpudNwOpX18"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      {children}

      {/* Mobile BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-surface-container dark:bg-white/5 dark:bg-slate-950/60 backdrop-blur-[16px] border-t border-outline-variant dark:border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path}
              to={link.path}
              className={`flex flex-1 flex-col items-center justify-center px-2 py-2 transition-all ${
                isActive ? 'text-primary dark:text-cyan-400 bg-surface-container-high dark:bg-white/10 rounded-xl' : 'text-muted dark:text-slate-400 hover:text-on-surface dark:text-white'
              }`}
            >
              <span className="material-symbols-outlined" style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>{link.icon}</span>
              <span className="font-inter text-[10px] font-semibold uppercase tracking-wider">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Background Decoration for Glassmorphism */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-tertiary/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}
