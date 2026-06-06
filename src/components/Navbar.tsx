import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e8e8e8] shadow-sm">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a435f0] rounded"
          aria-label="MiniLearn home"
        >
          <span className="font-extrabold text-xl tracking-tight">
            <span className="text-[#a435f0]">mini</span><span className="text-[#1c1d1f]">learn</span>
          </span>
        </Link>

        {/* Search bar — rounded pill like current Udemy */}
        <div className="flex-1 max-w-2xl hidden sm:flex items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#1c1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search for anything"
              aria-label="Search courses"
              className="w-full border-2 border-[#1c1d1f] rounded-full pl-10 pr-5 py-2 text-sm text-[#1c1d1f] placeholder-[#6a6f73] bg-white focus:outline-none focus:border-[#a435f0] transition-colors"
            />
          </div>
        </div>

        {/* Right nav */}
        <nav className="flex items-center gap-4 ml-auto">
          {!isHome && (
            <Link
              to="/"
              className="text-sm font-bold text-[#1c1d1f] hover:text-[#a435f0] transition-colors whitespace-nowrap hidden sm:block"
            >
              ← Catalog
            </Link>
          )}
          {/* Category links — Udemy shows these in nav */}
          {/* Removed Explore button per request */}
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#1c1d1f] flex items-center justify-center text-white text-xs font-extrabold shrink-0 border-2 border-[#1c1d1f]">
            D
          </div>
        </nav>
      </div>
    </header>
  );
}
