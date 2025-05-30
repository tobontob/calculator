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
      { name: '체질량 지수(BMI) 계산기', path: '/health/bmi' },
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
  {
    title: '부동산/주택 계산기',
    items: [
      { name: '주택담보대출 계산기', path: '/real-estate/mortgage' },
      { name: '전월세 계산기', path: '/real-estate/rent' },
      { name: '취득세/등록세 계산기', path: '/real-estate/tax' },
      { name: '종합부동산세 계산기', path: '/real-estate/property-tax' },
      { name: '재산세 계산기', path: '/real-estate/estate-tax' },
    ],
  },
  {
    title: '급여/세금 계산기',
    items: [
      { name: '실수령액 계산기', path: '/salary/after-tax' },
      { name: '퇴직금 계산기', path: '/salary/severance' },
      { name: '연말정산 계산기', path: '/salary/year-end' },
      { name: '소득세 계산기', path: '/salary/income-tax' },
      { name: '원천징수 계산기', path: '/salary/withholding' },
    ],
  },
  {
    title: '투자/저축 계산기',
    items: [
      { name: '적금 만기 계산기', path: '/investment/savings' },
      { name: '펀드 수익률 계산기', path: '/investment/fund' },
      { name: '주식 투자수익 계산기', path: '/investment/stock' },
      { name: '복리 수익률 계산기', path: '/investment/compound' },
      { name: '예적금 이자 계산기', path: '/investment/deposit' },
    ],
  },
  {
    title: '생활금융 계산기',
    items: [
      { name: '카드 할부금 계산기', path: '/daily/card-installment' },
      { name: '신용대출 이자 계산기', path: '/daily/personal-loan' },
      { name: '연체이자 계산기', path: '/daily/overdue' },
      { name: '환율 계산기', path: '/daily/exchange' },
      { name: '가계부채 상환 계산기', path: '/daily/household-debt' },
    ],
  },
  {
    title: '사업/창업 계산기',
    items: [
      { name: '부가가치세 계산기', path: '/business/vat' },
      { name: '법인세 계산기', path: '/business/corporate-tax' },
      { name: '사업소득세 계산기', path: '/business/income-tax' },
      { name: '매출이익률 계산기', path: '/business/profit-margin' },
      { name: '창업비용 계산기', path: '/business/startup-cost' },
    ],
  }
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // 현재 페이지의 카테고리 자동 펼침
    const currentCategory = menuItems.find(category => 
      category.items.some(item => item.path === pathname)
    );
    if (currentCategory) {
      setActiveCategory(currentCategory.title);
    }
  }, [isOpen, pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // 메뉴를 닫을 때는 카테고리도 닫기
    if (isOpen) {
      setActiveCategory(null);
    }
  };

  const toggleCategory = (title: string) => {
    setActiveCategory(activeCategory === title ? null : title);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`fixed top-4 left-4 z-50 p-2 hover:text-blue-600 ${
          isOpen ? 'text-blue-600' : 'text-gray-600'
        }`}
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

      <div
        className={`fixed top-0 left-0 z-40 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto pt-16 pb-8">
          <nav className="px-4">
            <div className="space-y-2">
              {menuItems.map((category) => (
                <div key={category.title} className="border-b border-gray-200 pb-2">
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="w-full text-left flex justify-between items-center py-2 text-lg font-bold text-gray-900 hover:text-blue-600"
                  >
                    {category.title}
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
                  </button>
                  <div
                    className={`pl-4 space-y-1 overflow-hidden transition-all duration-200 ${
                      activeCategory === category.title ? 'max-h-96 mt-1' : 'max-h-0'
                    }`}
                  >
                    {category.items.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block py-1.5 text-base transition-colors ${
                          pathname === item.path ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                        }`}
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}