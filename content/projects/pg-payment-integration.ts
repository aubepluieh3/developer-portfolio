import type { Project } from '../types';

// 공개 원칙: 회사명, 내부 API 경로·테이블명, 결제 키·설정값(시간·주기 수치 포함), 운영 코드의 보안 문제는 쓰지 않는다.
// 근거 상세는 저장소 밖 portfolio-private/evidence-matrix-pg-payment.md 에 있다.
// 이 프로젝트는 PG사 계약 무산으로 실제 서비스에 도입되지 않았다. 운영 성과·실거래 수치는 쓰지 않는다.

export const project: Project = {
  slug: 'pg-payment-integration',
  title: '토스페이먼츠 결제 연동 및 가상계좌 지연 충전',
  listing: {
    description:
      '카드 결제만 가능하던 충전형 요금제에 계좌이체·가상계좌를 추가하고, 입금 상태를 확인한 뒤 충전하는 구조를 구현했습니다.',
    stack: ['풀스택', 'Spring', 'Quartz', 'JavaScript'],
    year: '2025',
    status: '개발·QA 검증 후 미도입 (PG사 계약 무산)',
  },
  meta: 'B2B 전자계약 SaaS · 2025.10 – 2025.12 · 서비스 미도입',
  summary:
    '카드 결제만 가능하던 충전형 요금제에 토스페이먼츠를 연동해 실시간 계좌이체와 가상계좌를 추가하고, 입금 시점이 다른 가상계좌는 입금 상태를 확인한 뒤 충전하도록 구현했습니다.',
  role: '기능 상세 설계 · 풀스택 개발',
  tags: ['결제 연동', '비동기 처리', '풀스택 개발'],
  highlights: [
    { text: '가상계좌 입금 웹훅으로 상태를 기록하고, 기존 Quartz 스케줄러에서 조건을 충족한 결제만 충전하도록 구현', evidence: 'git' },
    { text: 'window.open · window.opener · postMessage로 결제 팝업과 구매 화면 사이의 결과 전달 구현', evidence: 'git' },
    { text: '서버에서 생성한 주문번호·금액을 저장해 두고, 결제 승인 전에 요청 값과 대조', evidence: 'git' },
  ],

  overview: {
    rows: [
      ['기간', '2025.10 – 2025.12'],
      ['진행 결과', '개발자 테스트 및 QA 재검수 진행 · 서비스 미도입'],
      ['담당 역할', '결제 팝업·상태별 화면 개발, 결제 준비·승인 API, 웹훅 및 지연 충전 배치 구현'],
    ],
    stacks: [
      { system: '서버', items: ['Java', 'Spring MVC', 'JPA', 'Quartz'] },
      { system: '화면', items: ['JavaScript', 'jQuery', 'Toss Payments SDK v2'] },
    ],
    collaboration: [
      {
        text: '결제 정책은 기획팀에서 정의하고, 화면 디자인과 마크업은 별도 담당자가 수행했습니다. 기존 스케줄러·가격 계산·선불 충전 로직을 활용해 결제 기능을 구현했습니다.',
        evidence: 'doc',
      },
    ],
  },

  background: {
    comparisons: [
      {
        topic: '결제 수단',
        before: '충전형 요금제는 카드 결제만 지원했습니다.',
        after: '결제창에서 카드·실시간 계좌이체·가상계좌를 선택할 수 있습니다.',
        evidence: 'doc',
      },
      {
        topic: '기업 고객 결제',
        before: '무통장 입금을 원하는 기업 고객에게 제공할 결제 수단이 없었습니다.',
        after: '가상계좌를 발급하고, 입금 기한과 입금 대기 상태를 구매 화면과 결제내역에서 안내합니다.',
        evidence: 'doc',
      },
      {
        topic: '충전 시점',
        before: '카드는 승인과 동시에 결제가 끝나 바로 충전하는 흐름이었습니다.',
        after: '가상계좌는 계좌 발급과 실제 입금 시점이 달라, 입금 상태를 확인한 뒤 충전합니다.',
        evidence: 'resume',
      },
    ],
    approach: [
      {
        text: '충전형 요금제는 카드 결제만 지원해서, 계좌이체나 무통장 입금을 원하는 기업 고객이 결제하기 어려웠습니다. 이 프로젝트는 기존 구매·충전·결제내역 구조를 활용하면서 토스페이먼츠를 연동해 카드·계좌이체·가상계좌 결제를 추가하는 것을 목표로 했습니다.',
        evidence: 'resume',
      },
    ],
  },

  architecture: {
    lanes: [
      { id: 'browser', label: '브라우저', x: 2, width: 258 },
      { id: 'server', label: '서비스 서버', x: 278, width: 482 },
      { id: 'pg', label: '토스페이먼츠', x: 778, width: 220 },
    ],
    roles: [
      { label: '브라우저', text: '구매 화면이 결제 팝업을 열고, 결제 결과를 postMessage로 돌려받습니다.' },
      {
        label: '서비스 서버',
        text: '주문번호·금액을 저장해 승인 전에 대조하고, 가상계좌 입금 상태는 웹훅으로 기록한 뒤 기존 스케줄러에서 충전 대상을 확인합니다.',
      },
      { label: '토스페이먼츠', text: '결제창, 결제 승인, 입금 상태 웹훅을 제공합니다.' },
    ],
    nodes: [
      {
        id: 'buy-ui',
        name: '구매 화면',
        summary: '결제 시작·결과 수신',
        lane: 'browser',
        kind: 'component',
        x: 130,
        y: 90,
        ownership: ['extended'],
        role: '충전할 문서·크레딧을 고르고 결제를 시작하는 기존 구매 화면입니다.',
        mine: [
          { ownership: 'extended', text: '결제 팝업을 열고, 팝업이 보낸 결제 결과에 따라 완료·가상계좌 발급·실패 후속 처리를 하도록 확장했습니다.' },
          { ownership: 'new', text: '입금 대기 중인 가상계좌가 있으면 안내 배너를 보여줍니다.' },
        ],
        ref: 'popup',
        evidence: 'git',
      },
      {
        id: 'popup',
        name: '결제 팝업',
        summary: '결제창 호출·결과 전달',
        lane: 'browser',
        kind: 'component',
        x: 130,
        y: 300,
        ownership: ['new'],
        role: '토스페이먼츠 결제창을 띄우고, 결제가 끝나면 결과를 구매 화면으로 보내는 별도 창입니다.',
        mine: [
          { ownership: 'new', text: 'window.opener에서 결제 정보를 읽어 결제 위젯을 호출하고, 결과 페이지에서 postMessage로 결과를 보냅니다.' },
        ],
        ref: 'popup',
        evidence: 'git',
      },
      {
        id: 'history-ui',
        name: '결제내역 화면',
        summary: '상태별 표시',
        lane: 'browser',
        kind: 'component',
        x: 130,
        y: 530,
        ownership: ['extended'],
        role: 'PC·모바일에서 결제 상태와 결제 정보를 보여주는 기존 화면입니다.',
        mine: [{ ownership: 'extended', text: '결제 완료·입금 대기·실패 상태에 맞는 금액과 결제수단 정보를 표시하도록 확장했습니다.' }],
        ref: 'history',
        evidence: 'git',
      },
      {
        id: 'payment-api',
        name: '결제 API',
        summary: '주문 생성·승인 대조',
        lane: 'server',
        kind: 'component',
        x: 420,
        y: 185,
        ownership: ['new'],
        role: '결제 준비 시 주문번호·금액을 저장하고, 승인 요청이 오면 저장된 값과 대조한 뒤 PG 승인을 요청합니다.',
        mine: [
          { ownership: 'new', text: '주문번호·금액 저장과 승인 전 대조, PG 승인 요청과 응답 처리를 구현했습니다.' },
          { ownership: 'extended', text: '승인 결과는 기존 선불 결제 완료 처리와 연결했습니다.' },
        ],
        ref: 'verify',
        evidence: 'git',
      },
      {
        id: 'charge',
        name: '선불 충전 처리',
        summary: '충전·영수증',
        lane: 'server',
        kind: 'component',
        x: 420,
        y: 420,
        ownership: ['existing'],
        role: '문서·크레딧을 충전하고 영수증을 처리하는 기존 로직입니다.',
        mine: [],
        note: '기존 로직을 그대로 사용했습니다. 카드·계좌이체는 승인 직후, 가상계좌는 충전 대상 확인 배치에서 호출합니다.',
        ref: 'deposit',
        evidence: 'git',
      },
      {
        id: 'payment-db',
        name: '결제 정보',
        summary: '주문·결제 상태',
        lane: 'server',
        kind: 'component',
        x: 420,
        y: 530,
        ownership: ['new'],
        role: '주문번호·금액과 결제수단별 상세 정보(은행, 가상계좌, 입금 기한, 상태)를 저장합니다.',
        mine: [{ ownership: 'new', text: '승인 전 대조용 주문 정보와 결제 상세 정보를 저장하도록 구성했습니다.' }],
        ref: 'deposit',
        evidence: 'git',
      },
      {
        id: 'webhook',
        name: '웹훅 수신',
        summary: '입금 상태 기록',
        lane: 'server',
        kind: 'component',
        x: 670,
        y: 530,
        ownership: ['new'],
        role: '토스페이먼츠가 보내는 가상계좌 입금 상태 변경을 받습니다.',
        mine: [{ ownership: 'new', text: '결제 상태와 마지막 변경 시각을 저장하고 충전 확인 대상을 표시합니다. 이 단계에서는 충전하지 않습니다.' }],
        ref: 'deposit',
        evidence: 'git',
      },
      {
        id: 'batch',
        name: '충전 대상 확인 배치',
        summary: '기존 스케줄러',
        lane: 'server',
        kind: 'component',
        x: 670,
        y: 420,
        ownership: ['new', 'existing'],
        role: '기존 Quartz 스케줄러에서 주기적으로 실행되며, 충전 조건을 충족한 결제를 조회합니다.',
        mine: [
          { ownership: 'new', text: '입금 완료 상태이면서 마지막 변경 후 일정 시간이 지난 결제를 조회하는 작업을 등록하고, 기존 충전 로직을 호출하도록 구현했습니다.' },
        ],
        note: '스케줄러 자체는 기존 구조입니다.',
        ref: 'deposit',
        evidence: 'git',
      },
      {
        id: 'pg-window',
        name: '결제창',
        summary: '결제수단 선택',
        lane: 'pg',
        kind: 'actor',
        x: 888,
        y: 300,
        ownership: [],
        role: '토스페이먼츠가 제공하는 결제창입니다. 사용자가 결제수단을 고르고 인증합니다.',
        mine: [],
        evidence: 'doc',
      },
      {
        id: 'pg-confirm',
        name: '승인 API',
        summary: '결제 승인',
        lane: 'pg',
        kind: 'actor',
        x: 888,
        y: 185,
        ownership: [],
        role: '서비스 서버의 승인 요청을 받아 결제를 승인합니다. 가상계좌는 입금 대기 상태로 응답합니다.',
        mine: [],
        evidence: 'doc',
      },
      {
        id: 'pg-webhook',
        name: '웹훅',
        summary: '입금 상태 알림',
        lane: 'pg',
        kind: 'actor',
        x: 888,
        y: 530,
        ownership: [],
        role: '가상계좌 입금 상태가 바뀌면 서비스 서버로 알림을 보냅니다.',
        mine: [],
        evidence: 'doc',
      },
    ],
    edges: [
      { from: 'buy-ui', to: 'popup', label: 'window.open · postMessage', bidirectional: true },
      { from: 'buy-ui', to: 'payment-api', label: '주문 생성', labelDx: 10, labelDy: -12 },
      { from: 'popup', to: 'pg-window', label: '결제 요청' },
      { from: 'popup', to: 'payment-api', label: '승인 요청', labelDx: 18, labelDy: 18 },
      { from: 'payment-api', to: 'pg-confirm', label: '승인' },
      { from: 'payment-api', to: 'charge', label: '즉시 충전', labelDx: 46, labelDy: 50 },
      { from: 'pg-webhook', to: 'webhook', label: '웹훅', labelDy: -18 },
      { from: 'webhook', to: 'payment-db', label: '상태 기록' },
      { from: 'batch', to: 'payment-db', label: '대상 조회', labelDx: 8, labelDy: 6 },
      { from: 'batch', to: 'charge', label: '충전' },
      { from: 'history-ui', to: 'payment-db', label: '상태 조회' },
    ],
    flows: [
      {
        id: 'card',
        title: '카드·계좌이체',
        oneLine: '승인 전 주문번호·금액을 대조하고, 승인 직후 충전',
        summary:
          '서버에 저장한 주문번호·금액과 승인 요청 값을 대조한 뒤 PG 승인을 요청하고, 승인되면 기존 충전 로직으로 바로 충전합니다. 결과는 팝업에서 구매 화면으로 전달합니다.',
        path: [
          ['buy-ui', 'payment-api'],
          ['buy-ui', 'popup'],
          ['popup', 'pg-window'],
          ['popup', 'payment-api'],
          ['payment-api', 'pg-confirm'],
          ['payment-api', 'charge'],
        ],
        steps: [
          { node: 'buy-ui', text: '결제 준비 요청, 서버가 주문번호·금액을 생성해 저장' },
          { node: 'popup', text: 'window.open으로 열린 팝업이 opener에서 결제 정보를 읽어 결제창 호출' },
          { node: 'pg-window', text: '결제수단 선택과 인증' },
          {
            node: 'payment-api',
            text: '주문번호·금액을 저장된 값과 대조한 뒤 PG 승인 요청',
            detail: ['값이 다르거나 주문이 없으면 PG 승인을 요청하지 않고 결제를 중단합니다.'],
          },
          { node: 'charge', text: '승인되면 기존 충전 로직으로 즉시 충전' },
          {
            node: 'popup',
            text: '결과 페이지가 postMessage로 구매 화면에 결과 전달',
            detail: ['구매 화면은 같은 출처에서 온 메시지만 처리합니다.'],
          },
        ],
      },
      {
        id: 'virtual-account',
        title: '가상계좌 발급',
        oneLine: '승인 시 입금 대기로 저장하고, 충전하지 않음',
        summary:
          '가상계좌는 승인 시점에 입금되지 않으므로, 발급 정보를 입금 대기 상태로 저장하고 충전하지 않습니다. 발급 정보는 구매 화면과 결제내역에서 안내합니다.',
        path: [
          ['buy-ui', 'payment-api'],
          ['buy-ui', 'popup'],
          ['popup', 'pg-window'],
          ['popup', 'payment-api'],
          ['payment-api', 'pg-confirm'],
          ['history-ui', 'payment-db'],
        ],
        steps: [
          { node: 'buy-ui', text: '결제 준비 요청과 결제 팝업 열기' },
          { node: 'pg-window', text: '가상계좌 선택' },
          { node: 'payment-api', text: '대조 후 승인 요청, 입금 대기 상태로 은행·계좌·입금 기한 저장 (충전하지 않음)' },
          { node: 'popup', text: '발급 정보를 postMessage로 구매 화면에 전달' },
          { node: 'history-ui', text: '결제내역에 입금 대기 상태와 입금 기한 표시' },
        ],
      },
      {
        id: 'deposit',
        title: '입금 후 충전',
        oneLine: '웹훅은 상태만 기록하고, 기존 스케줄러에서 충전 대상 확인',
        summary:
          '입금 상태가 바뀌면 웹훅에서는 상태와 마지막 변경 시각만 기록합니다. 충전은 기존 Quartz 스케줄러의 배치가 조건을 충족한 결제를 조회해 처리합니다.',
        path: [
          ['pg-webhook', 'webhook'],
          ['webhook', 'payment-db'],
          ['batch', 'payment-db'],
          ['batch', 'charge'],
          ['history-ui', 'payment-db'],
        ],
        steps: [
          { node: 'pg-webhook', text: '가상계좌 입금 상태 변경 알림' },
          { node: 'webhook', text: '결제 상태와 마지막 변경 시각 기록, 충전 확인 대상 표시 (충전하지 않음)' },
          {
            node: 'batch',
            text: '기존 Quartz 스케줄러에서 주기적으로 실행, 입금 완료 상태로 일정 시간이 지난 결제 조회',
            detail: ['"입금 완료 상태가 일정 시간 유지된 경우에만 충전"은 기획 정책이고, 조회 조건과 배치 작업은 제가 구현했습니다. 입금 대기로 다시 바뀐 결제는 대상에서 빠집니다.'],
          },
          { node: 'charge', text: '기존 충전 로직 호출 후 처리 완료 반영' },
          { node: 'history-ui', text: '결제내역에 결제 완료 표시' },
        ],
      },
    ],
  },

  // 04 주요 개발 내용. ownership 은 내부 검증용 (화면 미표시).
  contributions: [
    {
      id: 'popup',
      title: '결제 팝업과 postMessage 결과 전달',
      system: '브라우저',
      summary:
        '기존 구매 화면의 입력 정보를 유지한 채 별도 창에서 결제할 수 있도록 토스페이먼츠 결제위젯 v2를 연동하고, 결제 결과를 구매 화면으로 돌려받는 흐름을 구현했습니다.',
      emphasis: '결제 결과를 구매 화면으로 돌려받는 흐름',
      units: [
        {
          title: '팝업 열기와 결제 정보 전달',
          body: 'window.open으로 결제 팝업을 열고, 팝업은 window.opener에서 구매 화면의 결제 정보를 읽어 결제 위젯을 호출합니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: 'postMessage 결과 전달',
          body: '결과 페이지가 결제 완료, 가상계좌 발급 정보, 실패를 구분해 postMessage로 보내고, 구매 화면은 같은 출처의 메시지만 받아 결과에 따른 후속 처리를 합니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '팝업 종료 감지와 실패 안내',
          body: '팝업 종료를 감지하고 결제 결과에 따라 후속 안내를 처리했습니다. 결제 실패 유형별 메시지와 지원하지 않는 브라우저에 대한 안내를 적용했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
      note: '기존 PG 팝업 유틸리티와 구매 화면 구조를 활용했습니다.',
    },
    {
      id: 'verify',
      title: '서버 측 주문번호·금액 검증과 결제 승인',
      system: '서비스 서버',
      summary:
        '결제 금액을 브라우저 값에 의존하지 않도록 구매 요청 시 서버에서 주문번호와 금액을 생성·저장하고, 승인 요청 값과 대조한 뒤 토스페이먼츠 승인 API를 호출했습니다.',
      units: [
        {
          title: '주문번호·금액 생성과 대조',
          body: '기존 가격 계산 로직으로 금액을 구해 주문번호와 함께 저장하고, 승인 요청의 값이 다르거나 주문이 없으면 승인을 요청하지 않습니다.',
          emphasis: '승인을 요청하지 않습니다',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '승인 API 연동',
          body: '토스페이먼츠 승인 API 호출과 응답 처리를 기존 선불 결제 완료 로직과 연결했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '결제 상세 정보 저장',
          body: '결제수단별 은행, 가상계좌, 입금 기한 같은 상세 정보를 저장하고 조회할 수 있게 했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'deposit',
      title: '가상계좌 상태 관리',
      system: '서비스 서버 · 구매 화면',
      summary:
        '가상계좌의 발급부터 입금 상태 변경까지를 저장하고, 고객이 구매 화면에서 입금 진행 상황을 확인할 수 있게 했습니다.',
      units: [
        {
          title: '발급 정보 저장',
          body: '승인 시 입금 대기 상태로 은행, 계좌, 입금 기한을 저장하고, 이 시점에는 충전하지 않습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '입금 상태 기록',
          body: '웹훅으로 받은 입금 상태와 마지막 변경 시각을 기록하고, 충전 확인 대상을 표시합니다. 실제 충전은 기존 스케줄러의 배치에서 처리합니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '입금 대기 안내',
          body: '입금 대기 중인 가상계좌 결제를 조회하는 API를 만들고, 구매 화면에 입금 대기 안내 배너를 표시했습니다.',
          ownership: ['new'],
          evidence: 'resume',
        },
      ],
    },
    {
      id: 'history',
      title: 'PC·모바일 결제내역 표시',
      system: '브라우저',
      summary: '기획에서 정의한 결제 상태별 표시 규칙을 PC·모바일 결제내역에 구현했습니다.',
      units: [
        {
          title: '상태별 안내와 금액 표시',
          body: '결제 완료·입금 대기·실패 상태에 맞는 안내 문구와 결제 정보를 보여주고, 입금 대기·실패 건은 실제 결제 금액과 대기·실패 금액을 구분해 표시합니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '결제수단 정보와 만료 판단',
          body: '은행명, 가상계좌번호, 입금 기한을 연동해 보여주고, 조회 시 입금 기한이 지난 미입금 건은 만료로 판단해 표시합니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
      ],
      note: '화면 디자인과 마크업은 디자인·퍼블리싱 담당자의 작업입니다.',
    },
  ],

  // 05 기술적 문제 해결. 사례 1개. 실행 주기·유지 시간 수치는 쓰지 않는다.
  cases: [
    {
      title: '가상계좌 입금 상태 변경에 대응한 지연 충전',
      requirement:
        '가상계좌는 계좌 발급과 실제 입금 시점이 다르고, 입금 상태는 토스페이먼츠가 웹훅으로 알려줍니다. 입금이 확인된 결제에만 문서·크레딧을 충전해야 했습니다.',
      existing:
        '기존 결제는 카드 승인과 동시에 충전하는 흐름이었습니다. 서비스에는 Quartz 기반 스케줄러와 선불 충전·영수증 처리 로직이 이미 있었습니다.',
      implementation: [
        {
          label: '처음 구현',
          text: '입금 완료 웹훅을 받으면 바로 충전하고, 결제 상태가 되돌아오면 충전량을 차감하는 방식을 먼저 작성해 검토했습니다.',
        },
        {
          label: '예외 확인',
          text: '결제 상태 처리 방식을 검토하다가, 일부 은행에서 입금 완료 상태가 다시 입금 대기로 바뀔 수 있다는 예외를 확인했습니다. 즉시 충전하면 이미 지급한 사용량을 회수해야 하는 문제가 생깁니다.',
        },
        {
          label: '정책 결정',
          text: '이 문제를 기획자에게 공유했고, PG사 확인을 거쳐 "입금 완료 상태가 일정 시간 유지된 경우에만 충전한다"는 정책이 정해졌습니다.',
        },
        {
          label: '상태 기록과 충전 분리',
          text: '웹훅에서는 결제 상태와 마지막 변경 시각을 저장하고 충전 확인 대상만 표시하며, 충전은 하지 않습니다.',
        },
        {
          label: '충전 대상 확인',
          text: '기존 Quartz 스케줄러에 작업을 등록해 주기적으로 실행하고, 결제 상태가 입금 완료이면서 마지막 변경 시각으로부터 일정 시간이 지난 결제만 조회해 기존 충전 로직을 호출합니다. PG가 충전 시점을 알려주는 것이 아니라, 저장된 상태와 시각이 조건을 충족할 때 서버가 처리합니다.',
        },
        {
          label: '처리 완료 반영',
          text: '충전한 결제는 조회 대상에서 빼고 기존 영수증·운영 이력 등록과 연결했습니다. 입금 대기로 다시 바뀐 결제는 충전 대상에서 제외됩니다.',
        },
        {
          label: '역할 구분',
          text: '예외를 확인해 공유하고, 정책을 적용한 서버 로직과 스케줄러 작업을 구현했습니다. 충전 정책 자체는 기획팀이 PG사 확인을 거쳐 결정했습니다.',
        },
      ],
      table: {
        caption: '결제수단별 충전 시점',
        columns: ['결제수단', '충전 시점'],
        rows: [
          ['카드 · 실시간 계좌이체', '결제 승인 직후'],
          ['가상계좌', '입금 완료 상태로 일정 시간이 지난 뒤, 기존 스케줄러의 배치에서'],
        ],
      },
      evidence: 'resume',
    },
  ],

  validation: {
    groups: [
      {
        title: '테스트 및 QA',
        emphasis: '웹훅 수신과 서버의 결제 상태 갱신 흐름을 확인',
        paragraphs: [
          {
            text: '카드·계좌이체·가상계좌 결제, 실패 유형, 브라우저 제한, 요금제 변경, 결제내역 표시, 국가별 PG 분기에 대한 개발자 테스트 시나리오를 작성·수행하고 리뷰어 검토를 받았습니다.',
            evidence: 'resume',
          },
          {
            text: '토스페이먼츠 개발자센터에 웹훅 URL을 등록하고, 테스트 환경에서 가상계좌 입금 상태를 바꿔 가며 웹훅 수신과 서버의 결제 상태 갱신 흐름을 확인했습니다.',
            evidence: 'resume',
          },
          {
            text: 'QA에서 발견된 결제·충전 처리 및 기존 결제 경로의 회귀 오류, 결제내역과 입금 안내 화면의 표시 문제를 수정하고 재검수를 진행했습니다.',
            evidence: 'resume',
          },
        ],
      },
      {
        title: '결과',
        paragraphs: [
          {
            text: '기존 선불 결제 구조에 토스페이먼츠 결제위젯, 승인 API, 가상계좌 웹훅과 지연 충전 기능을 연동하고 개발자 테스트와 QA 결함 수정·재검수를 마쳤습니다.',
            evidence: 'resume',
          },
          {
            text: 'PG사와의 최종 계약이 무산되어 이 결제 기능은 실제 서비스에 도입되지 않았고, 이후 결제 경로를 기존 PG로 되돌렸습니다.',
            evidence: 'git',
          },
        ],
      },
    ],
  },

  retrospective: [
    {
      text: '가장 어려웠던 부분은 가상계좌의 입금 상태 변경을 기존 선불 충전 흐름에 연결하는 것이었습니다.',
      evidence: 'self',
    },
    {
      text: '처음에는 입금 완료 이벤트를 바로 충전 처리와 연결했지만, 결제 상태가 이후에도 변경될 수 있다는 점을 확인하면서 처리 시점을 다시 검토해야 했습니다.',
      evidence: 'self',
    },
    {
      text: '이 경험을 통해 외부 시스템에서 전달받은 이벤트와 내부 서비스에서 수행하는 작업이 항상 같은 시점에 처리될 필요는 없으며, 데이터의 상태와 후속 처리 조건을 함께 고려해야 한다는 점을 배웠습니다.',
      evidence: 'self',
    },
  ],
};
