export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">개인정보처리방침</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. 개인정보의 처리 목적</h2>
          <p className="text-gray-700 leading-relaxed">
            Calculator Hub(이하 '회사')는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
            <li>서비스 제공 및 계산 결과 저장</li>
            <li>불량 이용 방지 및 서비스 개선</li>
            <li>신규 서비스 개발 및 맞춤 서비스 제공</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. 개인정보의 처리 및 보유기간</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
            <li>서비스 이용 기록: 3개월</li>
            <li>접속 로그: 3개월</li>
            <li>결제 및 취소 기록: 5년</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. 정보주체의 권리·의무 및 행사방법</h2>
          <p className="text-gray-700 leading-relaxed">
            정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리정지 요구</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. 처리하는 개인정보 항목</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 다음의 개인정보 항목을 처리하고 있습니다.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
            <li>필수항목: 접속 IP 정보, 서비스 이용 기록</li>
            <li>선택항목: 이메일 주소(문의 시에만 수집)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. 개인정보의 파기</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">6. 개인정보 보호책임자</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="mt-2 text-gray-700">
            <p>▶ 개인정보 보호책임자</p>
            <p className="ml-4">연락처: jccompany2007@gmail.com</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">7. 개인정보 처리방침 변경</h2>
          <p className="text-gray-700 leading-relaxed">
            이 개인정보 처리방침은 2024년 1월 1일부터 적용됩니다. 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>
        </section>
      </div>
    </div>
  );
} 