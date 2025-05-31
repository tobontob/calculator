import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 법적 고지사항 섹션 */}
        <div className="text-center mb-8">
          <h3 className="font-bold mb-3 text-gray-800 text-lg">법적 고지사항</h3>
          <p className="text-sm text-gray-600 leading-relaxed md:whitespace-nowrap">
            본 계산기의 결과는 참고용으로만 사용되어야 하며, 법적 효력이 없습니다. 정확한 계산을 위해서는 반드시 전문가와 상담하시기 바랍니다.
          </p>
        </div>

        {/* 링크 섹션 */}
        <div className="text-center mb-8">
          <ul className="text-sm text-gray-600 flex flex-wrap justify-center gap-4">
            <li><a href="/privacy-policy" className="hover:text-blue-500 transition-colors">개인정보처리방침</a></li>
            <li><a href="/terms" className="hover:text-blue-500 transition-colors">이용약관</a></li>
            <li><a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">국세청</a></li>
            <li><a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">법제처</a></li>
            <li><a href="https://www.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">세무사 찾기</a></li>
          </ul>
        </div>

        {/* 저작권 섹션 */}
        <div className="text-center border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Calculator Hub. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 mt-1">
            문의사항: jccompany2007@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
} 