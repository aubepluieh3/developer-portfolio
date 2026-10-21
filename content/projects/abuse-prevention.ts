import type { Project } from '../types';

// 공개 원칙: 회사명, 내부 시스템 구조 세부, API 경로·테이블명·데이터 모델, 악용 방지 기준값과 판정 조건,
// 우회 가능한 경로, 운영 코드의 보안 문제, 운영 수치는 쓰지 않는다.
// 근거 상세는 저장소 밖 portfolio-private/evidence-matrix-abuse-prevention.md 에 있다.

export const project: Project = {
  slug: 'abuse-prevention',
  title: '무료체험 악용 방지 및 의심 고객 관리 기능 개발',
  listing: {
    description:
      '운영팀이 수작업으로 관리하던 의심 고객을 서비스에서 자동으로 탐지·등록하고, 운영관리시스템에서 확인하고 조치할 수 있도록 구현했습니다.',
    stack: ['풀스택', 'Spring', 'JPA', 'MyBatis', 'JavaScript'],
    year: '2025',
  },
  meta: 'B2B 전자계약 SaaS · 2025.07 – 2025.09 · 이후 운영 개선',
  summary:
    '운영팀이 수작업으로 관리하던 의심 고객을 서비스에서 자동으로 탐지·등록하고, 운영자가 운영관리시스템에서 확인하고 사용 정지·해제할 수 있도록 구현했습니다.',
  role: '기술 설계 · 풀스택 개발',
  tags: ['시스템 연동', '운영 자동화', '풀스택 개발'],
  highlights: [
    {
      label: '가입 이력 및 판정 기능 설계',
      text: '대표관리자 가입 이력 데이터 모델을 설계하고, 기획 정책에 따른 재가입 제한과 의심 고객 판정 기능 구현',
      evidence: 'git',
    },
    {
      label: '의심 고객 관리 프로세스 자동화',
      text: '기존 비동기 연동 구조를 확장해 관리 대상 자동 등록·알림을 구현하고, 운영자의 조치를 별도 API로 서비스에 반영',
      evidence: 'git',
    },
    {
      label: '서비스 전반의 사용 정지 적용',
      text: '사용자 역할별 안내와 주요 서비스 기능의 접근 제한을 Front-end·Back-end에 적용',
      evidence: 'git',
    },
  ],

  overview: {
    rows: [
      ['기간', '2025.07 – 2025.09 · 이후 운영 개선'],
      ['진행 결과', '2025년 9월 운영 반영'],
      ['담당 역할', '기술 설계 및 풀스택 개발'],
    ],
    stacks: [
      { system: '서비스', items: ['Java', 'Spring MVC', 'JPA'] },
      { system: '운영관리시스템', items: ['Spring Boot', 'MyBatis', 'JSP'] },
      { system: '화면', items: ['JavaScript', 'jQuery'] },
    ],
    collaboration: [
      {
        text: '악용 방지 정책은 기획팀에서 정의하고, 화면 스타일은 별도 담당자가 구현했습니다. 기존 비동기 연동 구조와 데이터 수집기, 메일 발송 기능을 활용해 신규 기능을 개발했습니다.',
        evidence: 'doc',
      },
    ],
  },

  background: {
    comparisons: [
      {
        topic: '재가입',
        before: '탈퇴 후 제한 없이 다시 가입해 무료체험을 반복할 수 있었습니다.',
        after: '가입 이력을 기준으로 일정 기간 재가입을 제한하도록 했습니다.',
        evidence: 'doc',
      },
      {
        topic: '의심 고객 관리',
        before: '운영팀이 의심 고객을 수작업으로 관리했습니다.',
        after: '의심 고객을 자동으로 등록해 운영자에게 알리고, 운영관리시스템에서 한곳에 모아 조회할 수 있게 했습니다.',
        evidence: 'self',
      },
      {
        topic: '조치',
        before: '운영관리시스템에서 의심 회사의 서비스 사용을 정지할 기능이 없었습니다.',
        after: '운영자가 확인 후 사용 정지·해제하면 서비스에 반영되어 주요 기능의 접근이 제한되도록 했습니다.',
        evidence: 'doc',
      },
    ],
    approach: [
      {
        text: '탈퇴 후 다시 가입해 무료체험을 반복하거나 회사명을 사칭하는 등 서비스를 악용하는 사례가 있었고, 운영팀은 이런 의심 고객을 수작업으로 관리하고 있었습니다. 이 프로젝트는 기획팀이 정한 악용 방지 정책을 기존 회원가입·회사 관리 기능에 적용하고, 의심 고객을 시스템에서 모아 운영자가 확인하고 조치할 수 있게 하는 것을 목표로 했습니다.',
        evidence: 'self',
      },
    ],
  },

  architecture: {
    lanes: [
      { id: 'service', label: '고객 서비스', x: 2, width: 472 },
      { id: 'admin', label: '운영관리시스템', x: 526, width: 472 },
    ],
    roles: [
      {
        label: '고객 서비스',
        text: '가입·회사 생성 과정에서 재가입을 제한하고 의심 고객을 판정합니다. 사용 정지된 회사는 서비스 전반에서 접근을 제한합니다.',
      },
      { label: '운영관리시스템', text: '전달받은 관리 대상을 등록하고 운영자에게 알리며, 운영자가 의심 고객을 조회하고 조치합니다.' },
      {
        label: '연결',
        text: '관리 대상은 기존 비동기 전송 구조로 운영관리시스템에 전달되고, 사용 정지·해제는 별도 API로 서비스에 반영됩니다.',
      },
    ],
    nodes: [
      {
        id: 'applicant',
        name: '가입자',
        summary: '',
        lane: 'service',
        kind: 'actor',
        x: 115,
        y: 70,
        ownership: [],
        role: '서비스에 가입하거나 회사를 생성하는 사용자입니다.',
        mine: [],
        evidence: 'doc',
      },
      {
        id: 'signup-ui',
        name: '가입·회사 생성 화면',
        summary: '가입·회사 생성',
        lane: 'service',
        kind: 'component',
        x: 115,
        y: 180,
        ownership: ['extended'],
        role: '회원가입과 회사 생성을 진행하는 기존 화면입니다.',
        mine: [
          { ownership: 'extended', text: '재가입 제한 안내와 회사 생성 확인 흐름을 기존 화면에 추가했습니다.' },
        ],
        ref: 'company',
        evidence: 'git',
      },
      {
        id: 'signup-server',
        name: '가입 처리 서버',
        summary: '제한 확인·판정',
        lane: 'service',
        kind: 'component',
        x: 115,
        y: 295,
        ownership: ['extended', 'new'],
        role: '가입과 회사 생성을 처리하는 기존 서버 로직입니다.',
        mine: [
          { ownership: 'extended', text: '가입·회사 생성 처리에 재가입 제한 확인과 회사 생성 확인 절차를 추가했습니다.' },
          { ownership: 'new', text: '기획에서 정의한 의심 사유에 해당하면 관리 대상으로 분류합니다.' },
        ],
        ref: 'history',
        evidence: 'git',
      },
      {
        id: 'history',
        name: '가입 이력',
        summary: '이력 저장·조회',
        lane: 'service',
        kind: 'component',
        x: 115,
        y: 410,
        ownership: ['new'],
        role: '대표관리자의 가입·탈퇴·권한 변경 이력입니다.',
        mine: [{ ownership: 'new', text: '이력을 기록하고 조회하는 기능을 새로 설계했습니다.' }],
        ref: 'history',
        evidence: 'git',
      },
      {
        id: 'queue',
        name: '비동기 전송 큐',
        summary: '기존 전송 구조',
        lane: 'service',
        kind: 'component',
        x: 355,
        y: 410,
        ownership: ['existing'],
        role: '고객 서비스의 데이터를 운영관리시스템으로 보내는 기존 비동기 전송 구조입니다.',
        mine: [{ ownership: 'extended', text: '관리 대상 데이터 유형을 추가하고, 회사 정보 다음에 등록되도록 순서를 맞췄습니다.' }],
        note: '전송 구조 자체는 기존 구조입니다.',
        ref: 'monitoring',
        evidence: 'git',
      },
      {
        id: 'suspend-apply',
        name: '정지 상태 적용',
        summary: '안내·접근 제한',
        lane: 'service',
        kind: 'component',
        x: 355,
        y: 180,
        ownership: ['new'],
        role: '사용 정지된 회사에 대해 서비스 전반에서 안내하고 접근을 제한합니다.',
        mine: [
          { ownership: 'new', text: '정지·해제 API로 회사 상태를 바꾸고, 사용자 역할별 안내와 주요 기능의 접근 제한을 적용했습니다.' },
        ],
        ref: 'suspend',
        evidence: 'git',
      },
      {
        id: 'operator',
        name: '운영자',
        summary: '',
        lane: 'admin',
        kind: 'actor',
        x: 885,
        y: 70,
        ownership: [],
        role: '의심 고객을 확인하고 사용 정지·해제를 판단하는 운영 담당자입니다.',
        mine: [],
        evidence: 'doc',
      },
      {
        id: 'monitor',
        name: '모니터링 화면',
        summary: '조회·정지·해제',
        lane: 'admin',
        kind: 'component',
        x: 645,
        y: 180,
        ownership: ['new'],
        role: '관리 대상·사용 정지·블랙리스트 고객을 조회하고 조치하는 운영자 화면입니다.',
        mine: [
          { ownership: 'new', text: '서버 페이징, 검색, 정렬, 엑셀 다운로드, 권한별 기능 제어를 구현했습니다.' },
        ],
        ref: 'monitoring',
        evidence: 'git',
      },
      {
        id: 'collector',
        name: '데이터 수집기',
        summary: '관리 대상 등록',
        lane: 'admin',
        kind: 'component',
        x: 645,
        y: 410,
        ownership: ['existing', 'extended'],
        role: '고객 서비스에서 전달된 데이터를 운영관리시스템에 반영하는 기존 수집기입니다.',
        mine: [{ ownership: 'extended', text: '관리 대상을 등록하고 의심 정보를 탐지해 알리는 처리를 추가했습니다.' }],
        note: '수집기 자체는 기존 구조입니다.',
        ref: 'monitoring',
        evidence: 'git',
      },
      {
        id: 'watch-data',
        name: '관리 대상 데이터',
        summary: '의심 고객 목록',
        lane: 'admin',
        kind: 'component',
        x: 885,
        y: 410,
        ownership: ['new'],
        role: '운영자가 확인할 의심 고객과 사유를 저장합니다.',
        mine: [{ ownership: 'new', text: '관리 대상과 탐지 설정을 저장하도록 구성했습니다.' }],
        ref: 'monitoring',
        evidence: 'git',
      },
      {
        id: 'mail',
        name: '알림 메일',
        summary: '운영자 알림',
        lane: 'admin',
        kind: 'component',
        x: 885,
        y: 180,
        ownership: ['existing'],
        role: '운영자에게 알림을 보내는 기존 메일 발송 기능입니다.',
        mine: [{ ownership: 'new', text: '관리 대상 등록과 정지·해제 알림 메일 템플릿을 추가했습니다.' }],
        note: '메일 발송 기능 자체는 기존 구조입니다.',
        ref: 'monitoring',
        evidence: 'git',
      },
    ],
    edges: [
      { from: 'applicant', to: 'signup-ui' },
      { from: 'signup-ui', to: 'signup-server' },
      { from: 'signup-server', to: 'history', label: '이력 저장', labelDx: 44 },
      { from: 'signup-server', to: 'queue', label: '관리 대상 전송', labelDx: 26, labelDy: -14 },
      { from: 'queue', to: 'collector', label: '비동기 수집' },
      { from: 'collector', to: 'watch-data', label: '등록' },
      { from: 'collector', to: 'mail', label: '알림', labelDx: 18, labelDy: 18 },
      { from: 'mail', to: 'operator' },
      { from: 'operator', to: 'monitor', label: '확인·조치', labelDx: 0, labelDy: -12 },
      { from: 'monitor', to: 'suspend-apply', label: '정지·해제 API', labelDy: -16 },
      { from: 'monitor', to: 'signup-server', label: '생성 확인 정보', labelDx: -30, labelDy: 26 },
    ],
    flows: [
      {
        id: 'register',
        title: '의심 고객 등록',
        oneLine: '가입 시 판정한 관리 대상을 기존 전송 구조로 등록하고 운영자에게 알림',
        summary:
          '가입·회사 생성 과정에서 의심 고객으로 판정되면, 회사 정보 다음 순서로 관리 대상을 기존 비동기 전송 구조에 넣습니다. 운영관리시스템이 이를 등록하고 운영자에게 알립니다.',
        path: [
          ['applicant', 'signup-ui'],
          ['signup-ui', 'signup-server'],
          ['signup-server', 'history'],
          ['signup-server', 'queue'],
          ['queue', 'collector'],
          ['collector', 'watch-data'],
          ['collector', 'mail'],
          ['mail', 'operator'],
        ],
        steps: [
          { node: 'signup-ui', text: '가입 또는 회사 생성 요청' },
          { node: 'signup-server', text: '재가입 제한 확인, 이력 저장, 의심 고객 판정' },
          {
            node: 'queue',
            text: '회사 정보 다음 순서로 관리 대상을 전송',
            detail: ['관리 대상은 회사 정보가 있어야 등록할 수 있어, 회사 정보를 먼저 등록하도록 순서를 맞췄습니다. 전송 구조 자체는 기존 구조입니다.'],
          },
          { node: 'collector', text: '관리 대상 등록과 의심 정보 탐지' },
          { node: 'mail', text: '운영자에게 알림' },
        ],
      },
      {
        id: 'company',
        title: '회사 생성 관리',
        oneLine: '운영관리시스템에서 발급한 정보를 확인한 뒤 회사 생성',
        summary: '회사 생성 과정에 확인 절차를 두어, 운영관리시스템에서 발급한 정보를 서버가 검증한 뒤 회사를 생성합니다.',
        path: [
          ['operator', 'monitor'],
          ['monitor', 'signup-server'],
          ['applicant', 'signup-ui'],
          ['signup-ui', 'signup-server'],
        ],
        steps: [
          { node: 'monitor', text: '운영관리시스템에서 생성 확인 정보 발급' },
          { node: 'signup-ui', text: '고객의 회사 생성 요청' },
          { node: 'signup-server', text: '발급된 정보를 검증한 뒤 회사 생성' },
        ],
      },
      {
        id: 'suspend',
        title: '사용 정지·해제',
        oneLine: '운영자 조치를 별도 API로 서비스에 반영',
        summary:
          '운영자가 의심 고객을 확인한 뒤 사용 정지·해제를 결정하면, 별도 API로 서비스의 회사 상태가 바뀌고 서비스 전반에서 접근이 제한됩니다.',
        path: [
          ['operator', 'monitor'],
          ['monitor', 'suspend-apply'],
        ],
        steps: [
          { node: 'monitor', text: '운영자가 확인 후 사용 정지·해제' },
          {
            node: 'suspend-apply',
            text: '서비스의 회사 상태 반영, 역할별 안내와 접근 제한',
            detail: ['사용자 역할에 맞는 안내를 보여주고, 주요 서비스 기능의 접근은 화면과 서버에서 제한합니다.'],
          },
        ],
      },
    ],
  },

  // 04 주요 개발 내용. ownership 은 내부 검증용 (화면 미표시).
  contributions: [
    {
      id: 'history',
      title: '가입 이력과 의심 고객 판정',
      system: '고객 서비스',
      summary: '대표관리자의 가입 이력을 새로 쌓고, 이 이력을 기준으로 재가입 제한과 의심 고객 판정을 구현했습니다.',
      units: [
        {
          title: '가입 이력 관리',
          body: '가입·탈퇴·권한 변경 시점의 이력을 기록하고 조회하는 기능을 설계했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '재가입 제한',
          body: '가입 이력을 확인해 기획에서 정한 기간 안에는 대표관리자로 다시 가입할 수 없게 했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '의심 고객 판정',
          body: '기획에서 정의한 의심 사유에 해당하면 관리 대상으로 분류합니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'company',
      title: '회사 생성 관리',
      system: '고객 서비스 · 운영관리시스템',
      summary: '회사 생성 과정에 별도의 확인 절차를 도입하고, 운영관리시스템에서 발급한 정보를 검증하도록 기존 생성 기능을 확장했습니다.',
      units: [
        {
          title: '발급 정보 검증',
          body: '운영관리시스템에서 발급한 정보를 회사 생성 시 서버에서 검증한 뒤 생성을 진행합니다.',
          ownership: ['new', 'extended'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'monitoring',
      title: '운영관리시스템 연동과 모니터링 화면',
      system: '고객 서비스 · 운영관리시스템',
      summary:
        '서비스에서 판정한 관리 대상을 운영관리시스템에 자동 등록하고, 운영자가 의심 고객을 한곳에서 확인·조치하는 화면을 만들었습니다.',
      emphasis: '운영관리시스템에 자동 등록',
      units: [
        {
          title: '관리 대상 자동 등록',
          body: '기존 비동기 전송 구조에 관리 대상 데이터 유형을 추가하고, 운영관리시스템의 수집기에서 이를 등록하도록 확장했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '의심 정보 탐지 및 운영자 알림',
          body: '운영자가 설정한 조건에 해당하는 정보가 확인되면 관리 대상으로 등록하고 운영자에게 메일로 알립니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '모니터링 화면',
          body: '관리 대상·사용 정지·블랙리스트 고객 화면에 서버 페이징, 검색, 정렬, 엑셀 다운로드, 권한별 기능 제어를 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'suspend',
      title: '사용 정지 상태 적용',
      system: '고객 서비스 · 운영관리시스템',
      summary: '운영자의 정지·해제 조치가 서비스 전반에 반영되도록 했습니다.',
      units: [
        {
          title: '정지·해제 API',
          body: '운영관리시스템에서 정지·해제하면 기존 서명 검증 구조를 거쳐 서비스의 회사 상태를 바꿉니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '역할별 안내와 접근 제한',
          body: '정지된 회사에 대해 사용자 역할에 맞는 안내를 보여주고, 문서 작성 등 주요 서비스 기능의 접근을 화면과 서버에서 제한했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
      note: '안내 화면은 기존 연체 안내 흐름을 재사용했고, 정지 상태 판단과 접근 제한은 새로 구현했습니다.',
    },
  ],

  // 05 기술적 문제 해결. "순서 보장"·특정 가입 경로·우회 조건은 쓰지 않는다.
  cases: [
    {
      title: '시스템 간 데이터 등록 순서 조정',
      requirement:
        '서비스에서 판정한 관리 대상을 운영관리시스템에 등록해야 했습니다. 관리 대상은 특정 회사에 속하므로, 운영관리시스템에 그 회사 정보가 먼저 있어야 등록할 수 있습니다.',
      existing:
        '서비스의 회사 정보와 관리 대상 정보는 같은 기존 비동기 전송 구조를 거쳐 운영관리시스템의 수집기가 처리했습니다.',
      implementation: [
        {
          label: '데이터 의존 관계 확인',
          text: '회사를 만들면서 바로 관리 대상이 되는 경우, 관리 대상이 회사 정보보다 먼저 처리되면 수집기가 대상 회사를 찾지 못해 등록이 누락될 수 있었습니다.',
        },
        {
          label: '전송·수집 흐름 분석',
          text: '기존 전송 데이터의 조회·처리 방식을 분석하고, 관리 대상 등록에 필요한 회사 정보의 생성 시점을 확인했습니다.',
        },
        {
          label: '등록 순서 조정',
          text: '가입·회사 생성 과정에서 회사 정보가 먼저 전송되도록 실행 순서를 조정하고, 정상 처리 흐름에서 관리 대상 등록에 필요한 데이터가 선행되도록 개선했습니다.',
        },
        { label: '중복 등록 정리', text: '같은 시기에 운영관리시스템에서 관리 대상이 중복 등록되던 처리도 하나로 정리했습니다.' },
      ],
      evidence: 'git',
    },
    {
      title: '가입 제한 검증을 서버로 확장',
      requirement: '탈퇴 후 일정 기간에는 대표관리자로 다시 가입할 수 없어야 했습니다.',
      existing: '처음에는 가입 화면에서 정보를 입력할 때 재가입 가능 여부를 확인해 안내했습니다.',
      implementation: [
        { label: '검증 누락 확인', text: '운영 이후 일부 가입 흐름에서는 화면 확인이 실행되지 않는 경우가 있다는 점을 확인했습니다.' },
        { label: '화면 처리 보완', text: '해당 흐름에서도 확인이 실행되도록 화면 처리를 보완했습니다.' },
        {
          label: '서버 검증 추가',
          text: '후속 개선으로 실제 가입 처리 단계에서도 같은 제한을 확인하도록 바꿔, 화면 확인 여부와 관계없이 서버에서 제한이 적용되게 했습니다.',
        },
      ],
      table: {
        caption: '검증 위치',
        columns: ['위치', '역할', '시점'],
        rows: [
          ['가입 화면', '입력 단계에서 미리 안내', '최초 반영부터'],
          ['가입 처리 서버', '실제 가입 시 제한 확인', '운영 이후 후속 개선'],
        ],
      },
      evidence: 'git',
    },
  ],

  validation: {
    groups: [
      {
        title: '테스트 및 QA',
        emphasis: '13개 개발자 테스트 시나리오를 직접 작성·수행',
        paragraphs: [
          {
            text: '재가입 제한, 의심 고객 등록, 회사 생성, 사용 정지, 운영관리 화면, 운영자 알림 등 13개 개발자 테스트 시나리오를 직접 작성·수행하고 검토자 확인을 받았습니다.',
            evidence: 'doc',
          },
          { text: 'QA 과정에서 확인된 데이터 등록·조회 관련 오류를 수정했습니다.', evidence: 'git' },
        ],
      },
      {
        title: '운영 반영 및 유지보수',
        paragraphs: [
          { text: '2025년 9월 운영에 반영했습니다.', evidence: 'self' },
          { text: '운영 이후에는 가입 처리 검증과 시스템 연동 관련 오류를 수정하며 기능을 유지보수했습니다.', evidence: 'git' },
        ],
      },
      {
        title: '결과',
        paragraphs: [
          {
            text: '운영팀이 수작업으로 관리하던 의심 고객을 시스템이 자동으로 탐지·등록하고 운영자에게 알리도록 했습니다.',
            evidence: 'self',
          },
          {
            text: '운영자가 운영관리시스템에서 의심 고객을 한곳에서 조회하고 사용 정지·해제 조치를 할 수 있게 되었습니다.',
            evidence: 'resume',
          },
        ],
      },
    ],
  },

  retrospective: [
    {
      text: '이번 프로젝트에서는 악용 방지 정책을 구현하면서, 화면에서 사용자의 행동을 제한하는 것과 실제 서버에서 요청을 검증하는 것은 다르다는 점을 경험했습니다.',
      evidence: 'self',
    },
    {
      text: '초기에는 가입 화면에서 제한 여부를 확인했지만, 운영 이후 일부 가입 흐름에서 검증이 누락되는 문제가 있었습니다. 이를 보완하면서 사용자에게 안내하는 화면 검증과 실제 가입을 제어하는 서버 검증의 역할을 구분하게 되었습니다.',
      evidence: 'git',
    },
  ],
};
