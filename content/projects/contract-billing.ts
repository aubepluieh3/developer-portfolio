import type { Project } from '../types';

// 공개 원칙: 회사명·내부 요건 번호·운영 수치·실제 테이블/API 명칭·소스코드·운영 시스템의 잠재 약점은 쓰지 않는다.
// 근거 상세(커밋·경로)는 저장소 밖 portfolio-private/evidence-matrix-contract-billing.md 에 있다.

export const project: Project = {
  slug: 'contract-billing',
  title: '선불형 기업 요금제 개발',
  meta: 'B2B 전자계약 SaaS · 2024.05 – 2024.08 개발 · 2024.10 운영 반영',
  summary:
    '기업 계약 관리와 선불 과금을 결합한 신규 요금제의 계약·충전·사용량 기능을 사내 운영관리시스템과 고객 서비스 양쪽에 구현했습니다.',
  role: '설계 · 백엔드 · 운영 화면 개발 · 검증',
  tags: ['풀스택 개발', '시스템 연동', '데이터 모델링'],
  highlights: [
    { text: '계약·옵션·분납 데이터 모델을 설계하고 기존 계약 관리 기능을 확장', evidence: 'git' },
    { text: '운영관리시스템 → 고객 서비스 API 4종을 호출부와 수신부 모두 구현', evidence: 'git' },
    { text: '회사별 최신 계약 기준 사용현황 집계 SQL(CTE·윈도 함수)과 운영자 화면 개발', evidence: 'git' },
  ],

  overview: {
    rows: [
      ['기간', '2024.05 – 2024.08 개발 · 2024.10 운영 반영 · 이후 유지보수'],
      ['담당 역할', '데이터 모델·기능 상세 설계, 백엔드와 운영 화면 개발, 기능 검증과 운영 대응'],
    ],
    stacks: [
      { system: '운영관리시스템', items: ['Java 8', 'Spring Boot', 'MyBatis', 'MariaDB', 'JSP', 'jQuery'] },
      { system: '고객 서비스', items: ['Java 8', 'Spring MVC', 'JPA (Hibernate)'] },
    ],
    collaboration: [
      {
        text: '요구사항과 업무 규칙은 기획 담당자가 정의했고, 고객 화면의 디자인과 마크업은 디자인·퍼블리싱 담당자가 맡았습니다.',
        evidence: 'doc',
      },
      {
        text: '시스템 간 요청 서명 검증, 리전 라우팅, 컬럼 암호화, 비동기 동기화 파이프라인은 기존 구조를 활용했습니다.',
        evidence: 'git',
      },
    ],
  },

  background: {
    comparisons: [
      {
        topic: '고객 문의 대응',
        before: '잔여 건수 문의를 받으면 개발 조직의 확인을 거쳐야 해서, 답변까지 시간이 걸렸습니다.',
        after: '운영 담당자가 사용현황 화면에서 고객사별 계약 대비 사용량과 잔여 문서·크레딧을 바로 확인합니다.',
        evidence: 'doc',
      },
      {
        // 기존 계약 목록의 종료일 필터는 이전부터 있던 기능이다. 개선 문장은 이번에 새로 만든 사용현황 화면 범위로만 쓴다.
        topic: '계약 만료 파악',
        before: '고객사별 계약 만료일을 한 번에 파악하기 어려워, 만료가 다가오는 고객사를 개별로 조회했습니다.',
        after: '사용현황 화면에서 고객사별 최신 계약의 계약 기간과 사용량을 함께 보고, 계약 종료일로 걸러 볼 수 있습니다.',
        evidence: 'git',
      },
      {
        topic: '계약·충전·사용량 관리',
        before: '계약 정보와 실제 사용량이 서로 다른 시스템에 있어, 계약 조건에 맞춰 충전하고 사용량을 함께 관리할 수 없었습니다.',
        after: '운영 담당자가 계약 건에서 바로 충전하고, 계약 조건·충전 내역·사용량을 운영관리시스템에서 함께 관리합니다.',
        evidence: 'doc',
      },
    ],
    approach: [
      {
        text: '운영 담당자가 기업 고객의 사용량을 직접 확인할 수 없어, 고객 문의가 올 때마다 개발 조직에 확인을 요청해야 했습니다. 이 프로젝트는 기업 계약 관리에 선불 충전·사용량 관리를 결합한 요금제를 도입해, 운영 담당자가 계약부터 충전·사용량까지 직접 관리할 수 있도록 하는 것을 목표로 했습니다.',
        evidence: 'resume',
      },
    ],
  },

  architecture: {
    lanes: [
      { id: 'admin', label: '운영관리시스템 (사내)' },
      { id: 'service', label: '고객 서비스 (SaaS)' },
    ],
    roles: [
      {
        label: '운영관리시스템',
        text: '기업 고객의 계약과 충전 내역을 관리하고, 운영 담당자가 계약 정보와 사용현황을 조회하는 사내 시스템',
      },
      { label: '고객 서비스', text: '기업 고객의 실제 잔여량과 사용량을 관리하고, 문서 생성 등 서비스 기능을 처리' },
      {
        label: '시스템 간 연동',
        text: '운영관리시스템이 REST API 4종(잔여량 조회, 충전, 고객사별 단가 전달, 생성 제한 설정)으로 고객 서비스를 호출하고, 고객 서비스의 잔여량은 기존 비동기 동기화 구조를 통해 운영관리시스템에 반영',
      },
    ],
    // 공개 화면에는 기여 구분 라벨을 붙이지 않는다. ownership 은 노드 테두리와 내부 검증용으로만 쓴다.
    nodes: [
      {
        id: 'operator',
        name: '운영 담당자',
        summary: '',
        lane: 'admin',
        kind: 'actor',
        x: 115,
        y: 70,
        ownership: [],
        role: '계약 등록, 충전, 사용현황 확인을 직접 수행하는 사내 담당자입니다.',
        mine: [],
        evidence: 'doc',
      },
      {
        id: 'contract-ui',
        name: '계약 관리 화면',
        summary: '계약·충전 입력',
        lane: 'admin',
        kind: 'component',
        x: 115,
        y: 180,
        ownership: ['extended', 'new'],
        role: '계약·옵션·분납 정보를 입력하고, 계약 건에서 충전을 실행하는 화면입니다.',
        mine: [
          { ownership: 'extended', text: '기존 계약 등록·수정 화면에 계약 상태에 따른 옵션 입력 제어와 단가·할인율 자동 계산을 추가했습니다.' },
          { ownership: 'new', text: '충전 팝업에 고객 서비스의 현재 잔여량과 계약 옵션 정보를 표시했습니다.' },
        ],
        ref: 'model',
        evidence: 'git',
      },
      {
        id: 'usage-ui',
        name: '사용현황 화면',
        summary: '고객사별 사용량',
        lane: 'admin',
        kind: 'component',
        x: 115,
        y: 525,
        ownership: ['new'],
        role: '고객사별로 계약 대비 문서·크레딧 사용량과 잔여량을 한 줄씩 보여주는 운영자 화면입니다.',
        mine: [
          { ownership: 'new', text: '화면과 집계 SQL을 새로 만들었습니다. 검색·필터와 서버 사이드 페이징을 제공합니다.' },
        ],
        ref: 'usage',
        evidence: 'git',
      },
      {
        id: 'admin-server',
        name: '운영 서버',
        summary: '계약·충전 처리',
        lane: 'admin',
        kind: 'component',
        x: 115,
        y: 295,
        ownership: ['extended', 'new'],
        role: '계약 저장과 상태 검증, 충전 처리, 고객 서비스 API 호출을 담당합니다.',
        mine: [
          { ownership: 'extended', text: '기존 계약 저장 로직을 신규 요금제의 계약 상태 규칙에 맞게 확장했습니다.' },
          { ownership: 'new', text: '고객 서비스 API 4종의 호출부를 구현했습니다. 리전별 주소 결정과 요청 서명은 기존 유틸리티를 사용합니다.' },
        ],
        ref: 'api',
        evidence: 'git',
      },
      {
        id: 'admin-db',
        name: '운영 DB',
        summary: '계약·충전 기록',
        lane: 'admin',
        kind: 'component',
        x: 115,
        y: 410,
        ownership: ['extended', 'new'],
        role: '계약, 계약 옵션, 분납, 충전 이력, 잔여량 스냅샷을 저장합니다.',
        mine: [
          { ownership: 'extended', text: '기존 기업 계약 구조를 재구성하고, 분납·충전 이력·잔여량 스냅샷 데이터를 추가했습니다. 담당자 정보에는 기존 컬럼 암호화를 적용했습니다.' },
        ],
        ref: 'model',
        evidence: 'git',
      },
      {
        id: 'collector',
        name: '동기화 수집기',
        summary: '동기화 반영',
        lane: 'admin',
        kind: 'component',
        x: 355,
        y: 410,
        ownership: ['existing', 'extended'],
        role: '고객 서비스가 보낸 동기화 데이터를 운영 DB에 반영하는 기존 수집기입니다.',
        mine: [
          { ownership: 'extended', text: '기존 수집 파이프라인에 잔여량 데이터 유형을 추가해 운영 DB에 반영하도록 했습니다.' },
        ],
        ref: 'sync',
        evidence: 'git',
      },
      {
        id: 'service-api',
        name: 'API 수신부',
        summary: 'API 4종 수신',
        lane: 'service',
        kind: 'component',
        x: 645,
        y: 295,
        ownership: ['new'],
        role: '운영관리시스템이 호출하는 API 4종을 받아 처리합니다.',
        mine: [
          { ownership: 'new', text: '잔여량 조회, 충전, 고객사별 단가 전달, 생성 제한 설정 API를 새로 구현했습니다. 요청 서명 검증은 기존 구조를 적용했습니다.' },
        ],
        ref: 'api',
        evidence: 'git',
      },
      {
        id: 'billing',
        name: '과금 로직',
        summary: '잔여량·단가 계산',
        lane: 'service',
        kind: 'component',
        x: 645,
        y: 410,
        ownership: ['extended', 'new'],
        role: '충전 시 잔여량을 다시 계산하고, 사용량 차감에 쓸 단가를 결정합니다.',
        mine: [
          { ownership: 'extended', text: '기존 선불 요금제의 잔여량 계산 로직을 신규 요금제에 적용했습니다.' },
          { ownership: 'new', text: '고객사별 단가를 우선 적용하고, 없는 옵션은 요금제 기본 단가로 처리하는 단가 결정 로직을 구현했습니다.' },
        ],
        ref: 'billing',
        evidence: 'git',
      },
      {
        id: 'service-db',
        name: '서비스 DB',
        summary: '잔여량·단가',
        lane: 'service',
        kind: 'component',
        x: 885,
        y: 410,
        ownership: ['extended', 'new'],
        role: '잔여 문서·크레딧, 고객사별 단가, 생성 제한 설정을 저장합니다.',
        mine: [
          { ownership: 'new', text: '고객사별 단가 엔터티(JPA)를 추가했습니다. 잔여량과 제한 설정은 기존 데이터를 신규 요금제에서 사용합니다.' },
        ],
        ref: 'unit-price',
        evidence: 'git',
      },
      {
        id: 'queue',
        name: '동기화 큐',
        summary: '비동기 전달',
        lane: 'service',
        kind: 'component',
        x: 645,
        y: 525,
        ownership: ['existing'],
        role: '고객 서비스에서 운영관리시스템으로 데이터를 비동기로 보내는 기존 큐입니다.',
        mine: [],
        note: '큐는 기존 구조를 그대로 사용했습니다. 잔여량 적재는 과금 로직에서 추가했습니다.',
        ref: 'sync',
        evidence: 'git',
      },
      {
        id: 'doc-limit',
        name: '생성 제한 판정',
        summary: '소진 시 생성 차단',
        lane: 'service',
        kind: 'component',
        x: 885,
        y: 295,
        ownership: ['existing', 'extended'],
        role: '문서를 만들 때 잔여량과 제한 설정을 확인해 생성 가능 여부를 판단합니다.',
        mine: [
          { ownership: 'extended', text: '판정 로직은 기존 코드이며, 운영관리시스템에서 전달한 제한 설정이 신규 요금제에도 적용되도록 연동했습니다.' },
        ],
        ref: 'limit',
        evidence: 'git',
      },
      {
        id: 'customer-ui',
        name: '고객 화면',
        summary: '요금·사용 내역',
        lane: 'service',
        kind: 'component',
        x: 885,
        y: 180,
        ownership: ['extended'],
        role: '고객이 요금제, 실시간 사용 내역, 결제 내역을 확인하고 문서를 만드는 화면입니다.',
        mine: [
          { ownership: 'extended', text: '기존 요금·결제 내역 화면에 잔여량 표시, 결제 수단·결제일 항목과 페이징 데이터를 연동했습니다.' },
        ],
        note: '화면 디자인과 마크업은 디자인·퍼블리싱 담당자의 작업입니다.',
        ref: 'customer',
        evidence: 'git',
      },
      {
        id: 'customer',
        name: '고객사 사용자',
        summary: '',
        lane: 'service',
        kind: 'actor',
        x: 885,
        y: 70,
        ownership: [],
        role: '서비스에서 문서를 만들고 요금·사용 내역을 확인하는 고객사 사용자입니다.',
        mine: [],
        evidence: 'doc',
      },
    ],
    edges: [
      { from: 'operator', to: 'contract-ui' },
      { from: 'contract-ui', to: 'admin-server' },
      { from: 'admin-server', to: 'admin-db' },
      { from: 'admin-db', to: 'usage-ui', label: '집계 SQL', labelDx: 44 },
      { from: 'admin-server', to: 'service-api', label: 'API 4종', primary: true, labelDy: -16 },
      { from: 'service-api', to: 'billing' },
      { from: 'service-api', to: 'service-db' },
      { from: 'billing', to: 'service-db' },
      { from: 'billing', to: 'queue' },
      { from: 'queue', to: 'collector', label: '비동기 동기화' },
      { from: 'collector', to: 'admin-db' },
      { from: 'customer', to: 'customer-ui' },
      { from: 'customer-ui', to: 'doc-limit' },
      { from: 'doc-limit', to: 'service-db' },
    ],
    // 처리 순서는 코드 기준 (portfolio-private 근거 파일 참고). 단계 문구는 짧게, 기술 설명은 detail 에 둔다.
    flows: [
      {
        id: 'contract',
        title: '계약 등록',
        oneLine: '계약·옵션·분납 정보를 계약 상태 규칙에 맞춰 저장',
        summary:
          '운영 담당자가 입력한 계약·옵션·분납 정보를 확인하고, 계약 상태에 따라 옵션 수정 가능 여부를 판단해 저장하는 흐름입니다.',
        path: [
          ['operator', 'contract-ui'],
          ['contract-ui', 'admin-server'],
          ['admin-server', 'admin-db'],
        ],
        steps: [
          {
            node: 'contract-ui',
            text: '계약·옵션·분납 입력, 소비자가와 분납 금액 자동 계산',
            detail: ['같은 옵션을 중복 선택하거나 분납 합계가 계약 금액과 맞지 않으면 저장 전에 화면에서 막습니다.'],
          },
          {
            node: 'admin-server',
            text: '진행 중인 기존 계약 정리 후, 계약 상태에 따라 옵션 저장 여부 판단',
            detail: [
              '같은 고객사에 진행 중인 계약이 있으면 확인을 받아 기존 계약을 먼저 종료 처리하고, 그다음 새 계약을 저장합니다. 고객사당 진행 계약을 하나로 유지하는 기획 규칙을 따른 것입니다.',
              '계약을 수정할 때는 계약 상태에 따라 옵션을 다시 저장할지 판단합니다. 계약이 확정된 뒤에는 옵션이 바뀌지 않도록 한 기획 규칙을 서버에서도 적용한 것입니다.',
            ],
          },
          { node: 'admin-db', text: '계약·옵션·분납 저장' },
        ],
      },
      {
        id: 'topup',
        title: '충전',
        oneLine: '마지막 집계 이후 사용량을 반영해 잔여량 재계산',
        summary:
          '운영관리시스템에서 충전하면, 고객 서비스가 마지막 집계 기준 시점 이후의 사용량을 반영해 잔여량을 다시 계산하고 충전량을 더합니다. 충전이 끝나면 계약 단가가 고객 서비스로 전달됩니다.',
        path: [
          ['contract-ui', 'admin-server'],
          ['admin-server', 'service-api'],
          ['service-api', 'billing'],
          ['billing', 'service-db'],
        ],
        steps: [
          { node: 'contract-ui', text: '고객 서비스의 현재 잔여량을 조회해 충전 팝업에 표시' },
          { node: 'admin-server', text: '충전 요청 전송' },
          { node: 'service-api', text: '요청 확인 후 충전 로직 호출' },
          {
            node: 'billing',
            text: '기준 시점 이후 사용량 반영 → 충전량 적용 → 기준 시점 갱신',
            detail: [
              '잔여량 = 현재 잔여량 − 기준 시점 이후 사용량 + 충전량. 문서와 크레딧에 각각 같은 방식으로 적용합니다.',
              '이 계산 방식은 기존 선불형 요금제의 충전 로직을 기업 요금제에 맞게 확장한 것입니다.',
            ],
          },
          { node: 'service-db', text: '갱신된 잔여량 저장' },
          {
            node: 'admin-server',
            text: '충전 성공 후 계약 옵션 단가를 고객사별 단가로 전달',
            detail: ['이후 사용량을 차감할 때 고객사별 단가를 먼저 적용하고, 계약에 없는 옵션은 요금제 기본 단가를 적용합니다.'],
          },
        ],
      },
      {
        id: 'limit',
        title: '생성 제한',
        oneLine: '제한이 설정된 고객사는 잔여량 소진 시 문서 생성 차단',
        summary:
          '고객사에 "소진 시 문서 생성 제한"이 설정되어 있으면, 잔여량이 소진됐을 때 문서 생성을 막고 안내 팝업을 띄웁니다. 판정 로직은 기존 기능이고, 제한 설정을 전달하는 부분과 안내 내용을 이번에 연동했습니다.',
        path: [
          ['admin-server', 'service-api'],
          ['service-api', 'service-db'],
          ['customer', 'customer-ui'],
          ['customer-ui', 'doc-limit'],
          ['doc-limit', 'service-db'],
        ],
        steps: [
          { node: 'admin-server', text: '고객사 정보 저장 시 생성 제한 설정 전달' },
          { node: 'service-api', text: '제한 설정을 고객사 정보에 반영' },
          { node: 'customer-ui', text: '사용자의 문서 생성 요청' },
          {
            node: 'doc-limit',
            text: '기존 판정 로직이 잔여량과 제한 설정 확인, 해당하면 생성 차단',
            detail: [
              '판정 로직은 기존 기능입니다. 운영관리시스템에서 전달한 제한 설정이 이 판정에 반영되도록 연동했습니다.',
              '기존 소진 안내 팝업에는 기업 요금제 고객에게 구매 문의 안내가 나오도록 조건을 추가했습니다.',
            ],
          },
        ],
      },
      {
        id: 'usage',
        title: '사용현황',
        oneLine: '잔여량을 동기화하고 고객사별 최신 계약 기준으로 집계',
        summary:
          '고객 서비스의 잔여량을 기존 동기화 구조로 운영관리시스템에 반영하고, 직접 작성한 집계 SQL로 고객사별 최신 계약 기준의 사용현황을 한 줄씩 조회합니다.',
        path: [
          ['billing', 'queue'],
          ['queue', 'collector'],
          ['collector', 'admin-db'],
          ['admin-db', 'usage-ui'],
        ],
        steps: [
          { node: 'billing', text: '충전 시점과 일 배치에서 잔여량을 동기화 큐에 적재' },
          { node: 'queue', text: '기존 비동기 파이프라인으로 전달' },
          { node: 'collector', text: '운영 DB의 잔여량 스냅샷에 반영' },
          {
            node: 'usage-ui',
            text: '집계 SQL로 고객사당 한 줄 조회, 계약 대비 사용률 계산',
            detail: [
              '최신 기준 선택 — ROW_NUMBER()로 고객사별 최신 구독과 최신 계약을 1건씩 고릅니다.',
              '사용률 계산 — 계약 옵션을 품목 유형별로 합산해 계약 문서 수와 크레딧을 구하고, 동기화된 잔여량과 비교해 사용률을 계산합니다. 계약이 없는 고객사도 목록에 남도록 LEFT JOIN으로 연결했습니다.',
              '동기화 쪽에서는 기존 큐와 수집기에 잔여량 데이터 유형을 추가했습니다.',
            ],
          },
        ],
      },
    ],
  },

  // 04 주요 개발 내용. 공개 화면에는 기여 구분 라벨을 쓰지 않고 문장으로 범위를 드러낸다.
  // ownership 은 내부 검증용으로만 유지한다 (근거: portfolio-private/evidence-matrix-contract-billing.md).
  contributions: [
    {
      id: 'api',
      title: '시스템 간 API 연동',
      system: '운영관리시스템 · 고객 서비스',
      emphasis: '호출부와 고객 서비스의 수신부를 모두 구현',
      summary:
        '운영관리시스템과 고객 서비스 간 데이터 연동을 위해 REST API 4종을 개발했습니다. 운영관리시스템의 API 호출부와 고객 서비스의 수신부를 모두 구현하고, 기존 요금제 처리 로직을 기업 선불형 요금제에 맞게 확장했습니다.',
      apis: [
        { name: '잔여량 조회', role: '충전 팝업에 고객 서비스의 현재 잔여 문서·크레딧을 표시', evidence: 'git' },
        { name: '충전 처리', role: '문서·크레딧 충전 요청을 받아 잔여량을 다시 계산', evidence: 'git' },
        { name: '단가 전달', role: '충전이 끝나면 계약 옵션 단가를 고객사별 단가로 저장', evidence: 'git' },
        { name: '생성 제한 설정', role: '잔여량 소진 시 문서 생성 제한 여부를 반영', evidence: 'git' },
      ],
      units: [
        {
          anchor: 'billing',
          title: '잔여량 재계산 로직 확장',
          body: '기존 선불 요금제의 잔여량 계산 로직을 기업 요금제로 확장해, 마지막 집계 이후의 사용량을 반영한 뒤 추가 충전량을 적용하도록 구현했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          anchor: 'unit-price',
          title: '고객사별 단가 적용',
          body: '충전이 끝나면 운영관리시스템이 계약 옵션 단가를 고객 서비스로 전달합니다. 사용량을 차감할 때는 계약 옵션 단가가 있으면 그 단가를, 없으면 기본 요금제 단가를 적용하도록 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          anchor: 'limit',
          title: '문서 생성 제한 연동',
          body: '운영관리시스템에서 설정한 문서 생성 제한 정보를 고객 서비스에 반영하고, 기존 생성 제한 로직과 연동했습니다. 제한 조건에 해당하면 기업 고객에게 맞는 안내가 나오도록 기존 안내 팝업을 확장했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
      ],
      note: '리전별 라우팅과 시스템 간 요청 서명 검증은 기존 구조를 그대로 활용했습니다.',
    },
    {
      id: 'model',
      title: '계약 데이터 모델과 계약 관리',
      system: '운영관리시스템',
      summary:
        '기존 기업 계약 구조를 바탕으로 신규 요금제의 계약 데이터를 설계하고, 계약 상태별 규칙과 금액 계산을 운영 화면과 서버에 반영했습니다.',
      units: [
        {
          title: '기업 계약 데이터 모델 확장',
          body: '기존 기업 계약 데이터 구조를 확장해 계약 옵션·분납 정보를 관리하고, 충전 이력과 잔여량 정보를 연계할 수 있도록 구현했습니다.',
          ownership: ['extended', 'new'],
          evidence: 'git',
          more: {
            summary: '데이터 관계',
            rows: [
              ['계약 → 계약 옵션', '1 : N — 계약별 품목·단가를 관리해 계약 금액 계산과 충전 후 단가 전달에 사용'],
              ['계약 → 분납', '1 : N — 계약 금액을 회차별 금액·부가세로 나눠 관리'],
              ['고객사 → 충전 이력', '1 : N — 고객사별 충전 기록을 관리하고, 운영관리 및 결제 내역 조회에 활용'],
              ['고객사 → 잔여량', '1 : 1 — 고객사별 잔여량을 동기화해 관리하고, 계약 수량과 비교해 사용률 계산에 활용'],
            ],
          },
        },
        {
          title: '계약 상태에 따른 입력·수정 제어',
          body: '기획에서 정의한 계약 상태별 처리 규칙을 서버와 운영 화면에 적용했습니다. 계약 상태에 따라 옵션의 입력·수정 가능 여부를 제어하고, 서버 저장 시에도 상태에 따라 옵션 반영 여부를 판단합니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '계약 옵션 및 분납 관리',
          body: '옵션 단가·할인율에 따른 소비자가와 소계를 자동으로 계산하고, 회사 국가에 따라 통화 단위를 바꿔 보여줍니다. 분납은 기존 월별 방식에 분기별·일시불 처리를 추가했습니다.',
          ownership: ['new', 'extended'],
          evidence: 'git',
          more: {
            summary: '분납 처리',
            paragraphs: ['분납 회차별 금액과 부가세를 계산하고, 회차 합계와 계약 금액의 일치 여부를 검증한 뒤 저장하도록 구현했습니다. 분납 방식이 바뀌면 회차 정보를 새로 저장합니다.'],
          },
        },
      ],
      note: '계약 담당자의 개인정보는 기존 컬럼 암호화 처리를 그대로 적용했습니다.',
    },
    {
      id: 'usage',
      title: '사용현황 조회와 데이터 동기화',
      system: '운영관리시스템 · 고객 서비스',
      summary:
        '운영 담당자가 고객사별 사용현황을 한 화면에서 확인할 수 있도록 조회 화면과 집계 SQL을 구현하고, 필요한 잔여량 데이터는 기존 동기화 구조를 확장해 가져왔습니다.',
      units: [
        {
          title: '고객사별 사용현황 조회',
          body: '운영 담당자가 기업 고객별 계약 대비 사용량과 잔여량을 확인할 수 있도록 조회 화면을 구현했습니다. 서버 사이드 페이지네이션과 검색·필터 기능을 적용했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '사용현황 집계 SQL 구현',
          emphasis: '집계 SQL을 직접 구현',
          body: '고객사별 계약 데이터를 조회하고 사용현황을 구성하기 위해 CTE와 ROW_NUMBER()를 활용한 집계 SQL을 직접 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          anchor: 'sync',
          title: '기존 비동기 동기화 구조 확장',
          body: '고객 서비스의 잔여량 정보를 운영관리시스템에 반영할 수 있도록 기존 비동기 동기화 구조에 잔여량 데이터 처리를 추가했습니다. 충전 시점과 일 배치에서 잔여량을 전달합니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          anchor: 'customer',
          title: '고객 화면 데이터 연동',
          body: '고객 화면의 잔여 문서·크레딧 표시와 결제 내역의 결제 수단·결제일 항목에 필요한 데이터를 연동하고, 결제 내역 페이징을 구현했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
      ],
    },
  ],

  // 05 기술적 문제 해결. 선택 이유가 기록에 없는 부분은 "왜"를 쓰지 않고 구조와 사실만 쓴다.
  cases: [
    {
      title: '고객사별 사용현황 집계 SQL 구현',
      requirement:
        "고객사별 계약 정보와 사용량을 한 행으로 조회하고, 계약이 없는 고객사도 '계약 없음'으로 표시해야 했습니다. 사용률·기간·계약 상태별 검색과 페이지네이션도 필요했습니다.",
      existing:
        '기존 계약 현황은 계약 단위로 조회하는 구조였습니다. 고객사의 구독·계약·계약 옵션·잔여량 정보가 여러 테이블에 분산되어 있었고, 하나의 고객사에 여러 계약과 옵션이 연결될 수 있었습니다.',
      implementation: [
        { label: '조회 기준 데이터 선정', text: 'ROW_NUMBER()를 활용해 고객사별 구독 정보 중 조회 기준에 해당하는 한 건을 선정했습니다.' },
        { label: '대표 계약 선정', text: '고객사별 계약에 순위를 부여하고, 조회 대상 계약 한 건을 선정했습니다.' },
        {
          label: '계약 옵션 집계',
          text: 'CTE에서 계약별 옵션 정보를 먼저 합산한 뒤 연결해, 여러 옵션으로 인해 조회 결과의 행이 늘어나지 않도록 했습니다.',
        },
        {
          label: '사용현황 구성',
          text: '구독 정보를 기준으로 계약·옵션 집계·잔여량 데이터를 LEFT JOIN하고, 계약 수량과 동기화된 잔여량을 비교해 사용률을 계산했습니다. 계약이 없는 고객사도 목록에 포함되도록 구성했습니다.',
        },
        { label: '조회 기능 적용', text: '집계 결과를 목록 조회와 건수 조회에 활용하고, 검색·정렬·페이지네이션을 적용했습니다.' },
      ],
      evidence: 'git',
      more: {
        summary: 'CTE와 윈도 함수 활용 예시',
        codeCaption: '실제 운영 SQL이 아닌 독립적인 가상 데이터 예제입니다.',
        code: `-- 고객별 최근 주문 1건과 그 주문의 품목 합계
WITH latest_order AS (            -- 그룹별 1건 선택
  SELECT o.*,
         ROW_NUMBER() OVER (
           PARTITION BY o.customer_id
           ORDER BY o.ordered_at DESC
         ) AS rn
  FROM orders o
),
item_totals AS (                  -- JOIN 전에 미리 합산
  SELECT order_id,
         SUM(quantity) AS total_qty,
         SUM(amount)   AS total_amount
  FROM order_items
  GROUP BY order_id
)
SELECT c.id   AS customer_id,
       lo.id  AS latest_order_id,
       it.total_qty,
       it.total_amount
FROM customers c
LEFT JOIN latest_order lo
       ON lo.customer_id = c.id AND lo.rn = 1
LEFT JOIN item_totals it
       ON it.order_id = lo.id
-- 고객당 한 행. 주문이 없는 고객도 남는다`,
      },
    },
    {
      title: '두 시스템 간 잔여량 조회 및 동기화',
      requirement:
        '운영관리시스템에서 요청한 충전이 고객 서비스의 잔여량에 반영되어야 했습니다. 또한 충전 화면에서는 현재 잔여량을, 사용현황 화면에서는 고객사별 잔여량을 조회할 수 있어야 했습니다.',
      existing:
        '계약·충전 정보는 운영관리시스템에서, 실제 잔여량과 과금 처리는 고객 서비스에서 관리했습니다. 두 시스템 사이에는 기존 API 호출 구조와 비동기 데이터 동기화 구조가 있었습니다.',
      implementation: [
        '기존 호출 구조를 활용해 잔여량 조회·충전 처리·단가 전달·생성 제한 설정 API 4종을 개발하고, 운영관리시스템의 호출부와 고객 서비스의 수신부를 모두 구현했습니다.',
        '기존 선불 요금제의 잔여량 계산 로직을 기업 요금제에 맞게 확장해, 마지막 집계 이후 발생한 사용량을 반영하고 추가 충전량을 적용하도록 했습니다.',
        '기존 비동기 동기화 구조에 잔여량 데이터 유형을 추가하고, 고객 서비스의 잔여량 정보를 운영관리시스템에 전달·저장하도록 확장했습니다.',
      ],
      table: {
        caption: '화면별 잔여량 조회 방식',
        columns: ['화면', '조회 방식'],
        rows: [
          ['충전 팝업', '팝업을 열 때 고객 서비스 API로 현재 잔여량 조회'],
          ['사용현황', '충전 시점 및 일 배치에서 전달된 데이터를 운영 DB에 반영한 뒤 조회'],
        ],
      },
      evidence: 'git',
    },
    {
      title: '고객사별 계약 단가 적용',
      requirement:
        '고객사별 계약 옵션의 단가를 사용량 차감에 적용하고, 별도 계약 단가가 없는 옵션에는 요금제 기본 단가를 적용해야 했습니다.',
      existing: '기존 고객 서비스는 요금제별로 정의된 기본 단가를 기준으로 사용량을 차감했습니다.',
      implementation: [
        '고객사별 계약 단가를 관리하기 위한 JPA 엔터티를 추가했습니다.',
        '충전 완료 후 운영관리시스템에서 계약 옵션의 단가를 고객 서비스로 전달하도록 구현했습니다.',
        '사용량 차감 시 고객사별 계약 단가를 우선 적용하고, 계약 단가가 없는 옵션에는 기존 요금제 기본 단가를 적용하도록 과금 처리를 확장했습니다.',
      ],
      evidence: 'git',
    },
  ],

  // 06 검증 및 결과. 테스트 확인 기록(24/24)과 구체적인 운영 오류 내용은 portfolio-private 근거 파일에만 둔다.
  validation: {
    groups: [
      {
        title: '테스트 및 QA',
        emphasis: '24개 테스트 시나리오를 직접 작성',
        paragraphs: [
          {
            text: '계약 관리·충전·사용현황·요금제 전환 등 주요 기능에 대한 24개 테스트 시나리오를 직접 작성하고, 개발자 테스트를 수행했습니다.',
            evidence: 'doc',
          },
          {
            text: '테스트 시나리오 문서에 개발자 및 검토자의 전체 항목 확인 기록을 남겼으며, 기획 부서 QA에서 발견된 계약 옵션 표시·충전 내역·화면 노출 관련 오류를 수정했습니다.',
            evidence: 'doc',
          },
        ],
      },
      {
        title: '운영 반영 및 유지보수',
        paragraphs: [
          {
            text: '배포 산출물을 인프라 담당자에게 전달하고, 운영 반영 전후에 주요 기능의 동작을 확인했습니다.',
            evidence: 'resume',
          },
          {
            text: '운영 반영 이후에는 충전 데이터 처리, 계약 상태 변경, 요금제 전환 과정에서 발생한 오류를 수정하고 관련 기능을 유지보수했습니다.',
            evidence: 'git',
          },
        ],
      },
      {
        title: '결과',
        paragraphs: [
          {
            text: '2024년 10월, 기업 선불형 요금제의 계약·충전·사용현황 관리 기능을 운영 환경에 반영했습니다.',
            evidence: 'resume',
          },
          {
            text: '운영 담당자가 운영관리시스템에서 고객사별 계약 조건과 사용량을 직접 조회하고 관리할 수 있도록 기능을 제공했습니다.',
            evidence: 'resume',
          },
        ],
      },
    ],
  },

  retrospective: [
    {
      text: '이 프로젝트에서 가장 어려웠던 점은 운영관리시스템과 고객 서비스에 나뉘어 있는 계약·과금 데이터와 기존 처리 흐름을 이해하는 것이었습니다.',
      evidence: 'resume',
    },
    {
      text: '운영관리시스템에서 관리하는 계약 조건이 고객 서비스의 충전·단가·사용량 처리와 어떻게 연결되는지 확인하면서, 두 시스템에 필요한 기능을 구현했습니다.',
      evidence: 'resume',
    },
    {
      text: '이를 통해 개별 기능뿐 아니라 시스템 간 데이터 흐름과 기존 기능에 미치는 영향까지 함께 고려하는 경험을 쌓았습니다.',
      evidence: 'self',
    },
  ],
};
