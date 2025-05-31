export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">이용약관</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">제1조 (목적)</h2>
          <p className="text-gray-700 leading-relaxed">
            이 약관은 Calculator Hub(이하 '회사')가 제공하는 모든 서비스(이하 '서비스')의 이용조건 및 절차, 회사와 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">제2조 (용어의 정의)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>서비스: 회사가 제공하는 모든 계산기 및 관련 서비스</li>
            <li>이용자: 회사의 서비스를 이용하는 모든 사용자</li>
            <li>계산 결과: 서비스를 통해 도출된 모든 수치 및 정보</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">제3조 (약관의 효력과 변경)</h2>
          <p className="text-gray-700 leading-relaxed">
            이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통하여 공지함으로써 효력이 발생합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">제4조 (서비스의 제공)</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 다음과 같은 서비스를 제공합니다.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
            <li>각종 계산기 서비스</li>
            <li>계산 결과의 저장 및 관리</li>
            <li>기타 회사가 정하는 서비스</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">제5조 (서비스 이용의 제한)</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
            <li>서비스의 운영을 고의로 방해한 경우</li>
            <li>서비스를 이용하여 법령 또는 이 약관이 금지하는 행위를 하는 경우</li>
            <li>기타 회사가 정한 제한 사항을 위반한 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">제6조 (면책조항)</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 다음 각 호의 경우로 서비스를 제공할 수 없는 경우 이로 인하여 이용자에게 발생한 손해에 대해서는 책임을 부담하지 않습니다.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
            <li>천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우</li>
            <li>서비스 제공을 위하여 회사와 서비스 제휴계약을 체결한 제3자의 고의적인 서비스 방해가 있는 경우</li>
            <li>이용자의 귀책사유로 서비스 이용에 장애가 있는 경우</li>
            <li>제1호 내지 제3호를 제외한 기타 회사의 고의·과실이 없는 사유로 인한 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">제7조 (계산 결과의 신뢰성)</h2>
          <p className="text-gray-700 leading-relaxed">
            서비스를 통해 제공되는 모든 계산 결과는 참고용으로만 사용되어야 하며, 전문가의 검토나 자문을 대체할 수 없습니다. 회사는 계산 결과의 정확성이나 신뢰성에 대해 보증하지 않으며, 이를 기반으로 한 의사결정의 결과에 대해 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">제8조 (준거법 및 관할법원)</h2>
          <p className="text-gray-700 leading-relaxed">
            이 약관의 해석 및 회사와 이용자 간의 분쟁에 대하여는 대한민국 법을 적용하며, 분쟁이 발생한 경우 민사소송법상의 관할법원에 제소합니다.
          </p>
        </section>

        <section className="mt-8">
          <p className="text-gray-600 text-sm">
            부칙<br />
            이 약관은 2024년 1월 1일부터 시행합니다.
          </p>
        </section>
      </div>
    </div>
  );
} 