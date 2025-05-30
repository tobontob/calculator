'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  title: string;
  items: {
    name: string;
    path: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    title: '재무 계산기',
    items: [
      { name: '대출 계산기', path: '/financial/loan' },
      { name: '이자 계산기', path: '/financial/interest' },
    ],
  },
  {
    title: '건강 계산기',
    items: [
      { name: 'BMI 계산기', path: '/health/bmi' },
      { name: '칼로리 계산기', path: '/health/calorie' },
      { name: '체지방률 계산기', path: '/health/bodyfat' },
    ],
  },
  {
    title: '수학 계산기',
    items: [
      { name: '기본 계산기', path: '/math/basic' },
      { name: '공학용 계산기', path: '/math/scientific' },
      { name: '단위 변환기', path: '/math/unit-converter' },
    ],
  },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const headerWrapper = document.getElementById('header-wrapper');
    if (headerWrapper) {
      headerWrapper.style.backgroundColor = isOpen ? 'rgb(243, 244, 246)' : 'transparent';
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveCategory(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const toggleCategory = (title: string) => {
    if (isMobile) {
      setActiveCategory(activeCategory === title ? null : title);
    }
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {/* 햄버거 버튼 */}
      <button
        onClick={toggleMenu}
        className={`
          fixed top-4 left-4 z-50 p-2 hover:text-blue-600
          ${isOpen ? 'text-blue-600' : 'text-gray-600'}
        `}
        aria-label="메뉴"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* 메뉴 컨테이너 */}
      <div
        className={`
          fixed z-40 transition-all duration-500 ease-in-out
          ${isMobile 
            ? 'top-0 left-0 w-64 h-full bg-white transform'
            : 'inset-x-0 top-16 bg-white shadow-lg'
          }
          ${isOpen 
            ? isMobile ? 'translate-x-0' : 'translate-y-0 opacity-100 visible' 
            : isMobile ? '-translate-x-full' : '-translate-y-full opacity-0 invisible'
          }
        `}
      >
        <div className={`
          h-full w-full
          ${isMobile ? 'pt-16 overflow-y-auto' : 'py-12'}
        `}>
          <nav className="container mx-auto px-6">
            <div className={`
              mx-auto
              ${isMobile 
                ? 'space-y-4' 
                : 'grid grid-cols-3 gap-x-8 max-w-4xl'
              }
            `}>
              {menuItems.map((category) => (
                <div key={category.title} className={`
                  ${isMobile ? '' : 'flex flex-col items-center'}
                `}>
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className={`
                      text-lg font-bold text-gray-900 hover:text-blue-600
                      mb-6 whitespace-nowrap
                      ${isMobile ? 'w-full text-left flex justify-between items-center' : ''}
                    `}
                  >
                    {category.title}
                    {isMobile && (
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          activeCategory === category.title ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  <div className={`
                    ${isMobile ? 'pl-4' : 'flex flex-col items-center'}
                    ${isMobile && activeCategory !== category.title ? 'hidden' : 'block'}
                  `}>
                    {category.items.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`
                          block py-2 text-base transition-colors whitespace-nowrap
                          ${pathname === item.path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}
                        `}
                        onClick={handleMenuItemClick}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
} 