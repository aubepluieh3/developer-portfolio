import type { Project } from '../types';

// 공개 원칙: 회사명, 내부 시스템 구조 세부, API 경로·테이블명·데이터 모델, 악용 방지 기준값과 판정 조건,
// 우회 가능한 경로, 운영 코드의 보안 문제, 운영 수치는 쓰지 않는다.
// 근거 상세는 저장소 밖 portfolio-private/evidence-matrix-abuse-prevention.md 에 있다.

export const project: Project = {
  slug: 'abuse-prevention',
  title: '무료체험 악용 방지 및 의심 고객 관리 기능 개발',
  listing: {
    description: '가입 과정에서 의심 고객을 판정해 운영관리시스템에 자동 등록하고, 운영자가 조회·조치할 수 있도록 구현했습니다.',
    stack: ['풀스택', 'Spring', 'JPA', 'MyBatis', 'JavaScript'],
    year: '2025',
  },
  meta: 'B2B 전자계약 SaaS · 2025.07 – 2025.08 · 2025.09 운영 반영',
  summary:
    '회원가입과 회사 생성 과정에 악용 방지 정책을 적용하고, 의심 고객 정보를 운영관리시스템에 자동 등록하도록 구현했습니다. 또한 운영자의 사용 정지·해제 조치를 고객 서비스에 연동하고, 주요 기능에 접근 제한을 적용했습니다.',
  role: '기술 설계 · 풀스택 개발',
  tags: ['시스템 연동', '운영 자동화', '풀스택 개발'],
  highlights: [
    {
      label: '가입 이력 기반 제한·판정',
      text: '대표관리자의 가입 이력 데이터 모델을 설계하고, 기획 정책에 따른 재가입 제한과 의심 고객 판정 기능 구현',
      evidence: 'git',
    },
    {
      label: '의심 고객 등록·관리 자동화',
      text: '기존 비동기 연동 구조를 확장해 의심 고객 정보를 운영관리시스템에 등록하고, 운영자 알림 및 관리 화면 구현',
      evidence: 'git',
    },
    {
      label: '사용 정지·해제 연동',
      text: '운영자의 조치를 고객 서비스에 반영하고, 사용자 역할별 안내와 주요 기능의 접근 제한 구현',
      evidence: 'git',
    },
  ],

  overview: {
    rows: [
      ['기간', '2025.07 – 2025.08 · 이후 운영 개선'],
      ['진행 결과', '2025년 9월 운영 반영'],
      ['담당 역할', '기술 설계 및 풀스택 개발'],
    ],
    stacks: [
      { system: '고객 서비스', items: ['Java', 'Spring MVC', 'JPA'] },
      { system: '운영관리시스템', items: ['Spring Boot', 'MyBatis', 'JSP'] },
      { system: '화면', items: ['JavaScript', 'jQuery'] },
    ],
    // 기획팀 정책은 02, 기존 구조는 03 노드, 화면 스타일 담당은 04.4 에서 구분한다
    collaboration: [],
  },

  background: {
    comparisons: [
      {
        topic: '재가입 제한',
        before: '탈퇴 이력을 활용한 재가입 제한 기능이 없었습니다.',
        after: '가입 이력을 확인하고, 기획 정책에 따라 재가입을 제한하도록 했습니다.',
        evidence: 'doc',
      },
      {
        topic: '의심 고객 관리',
        before: '운영팀이 의심 고객을 별도로 확인하고 관리했습니다.',
        after: '의심 고객 정보를 자동 등록하고, 운영관리시스템에서 목록과 사유를 조회하도록 했습니다.',
        evidence: 'self',
      },
      {
        topic: '사용 정지·해제',
        before: '운영관리시스템에서 의심 고객의 서비스 이용을 정지·해제할 수 없었습니다.',
        after: '운영자의 정지·해제 요청을 고객 서비스에 반영하고, 정지된 회사의 주요 기능 접근을 제한하도록 했습니다.',
        evidence: 'doc',
      },
    ],
    approach: [
      {
        text: '기존 서비스에서는 탈퇴 후 재가입으로 무료체험을 반복하거나, 회사명을 사칭하는 등의 악용 사례가 발생했습니다. 운영팀은 이러한 의심 고객을 별도로 확인하고 관리해야 했습니다.',
        evidence: 'self',
      },
      {
        text: '이에 따라 기획팀에서 정한 악용 방지 정책을 회원가입과 회사 생성 과정에 적용했습니다. 또한 의심 고객을 운영관리시스템에 자동 등록하고, 운영자가 목록을 조회해 사용 정지·해제 등의 조치를 할 수 있도록 개발했습니다.',
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
        text: '가입 이력을 확인해 재가입 제한과 의심 고객 판정을 처리하고, 운영자가 설정한 사용 정지 상태를 주요 서비스 기능에 반영합니다.',
      },
      { label: '운영관리시스템', text: '의심 고객 정보를 등록해 운영자에게 알리고, 관리 대상 조회와 사용 정지·해제 기능을 제공합니다.' },
      {
        label: '시스템 연동',
        text: '의심 고객 정보는 기존 비동기 연동 구조를 통해 전달하고, 운영자의 사용 정지·해제 요청은 별도 API로 고객 서비스에 반영합니다.',
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
        mine: [{ ownership: 'extended', text: '재가입 제한 안내와 회사 생성 시 필요한 확인 절차를 추가했습니다.' }],
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
        ownership: ['extended'],
        role: '회원가입과 회사 생성을 처리하는 기존 서버 로직입니다.',
        mine: [
          {
            ownership: 'extended',
            text: '가입 이력을 확인해 재가입 제한과 의심 고객 판정을 처리하고, 회사 생성에 필요한 확인 정보를 검증하도록 확장했습니다.',
          },
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
        role: '대표관리자의 가입·탈퇴·권한 변경 이력을 저장합니다.',
        mine: [{ ownership: 'new', text: '이력을 기록·조회하는 기능을 설계하고, 재가입 제한 여부를 확인할 때 활용했습니다.' }],
        ref: 'history',
        evidence: 'git',
      },
      {
        id: 'queue',
        name: '비동기 전송 큐',
        summary: '기존 연동 구조',
        lane: 'service',
        kind: 'component',
        x: 355,
        y: 410,
        ownership: ['existing'],
        role: '고객 서비스의 데이터를 운영관리시스템으로 전달하는 기존 비동기 연동 구조입니다.',
        mine: [
          { ownership: 'extended', text: '의심 고객 정보 전송을 추가하고, 고객사 정보에 대한 의존 관계를 고려해 전송 흐름을 조정했습니다.' },
        ],
        ref: 'monitoring',
        evidence: 'git',
      },
      {
        id: 'suspend-apply',
        name: '서비스 이용 제한',
        summary: '안내·접근 제한',
        lane: 'service',
        kind: 'component',
        x: 355,
        y: 180,
        ownership: ['new'],
        role: '운영자가 설정한 사용 정지·해제 상태를 고객 서비스에 반영합니다.',
        mine: [{ ownership: 'new', text: '정지·해제 API와 사용자 역할별 안내, 주요 서비스 기능의 접근 제한을 구현했습니다.' }],
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
        role: '의심 고객을 확인하고 사용 정지·해제 여부를 판단하는 운영 담당자입니다.',
        mine: [],
        evidence: 'doc',
      },
      {
        id: 'monitor',
        name: '의심 고객 관리 화면',
        summary: '조회·정지·해제',
        lane: 'admin',
        kind: 'component',
        x: 645,
        y: 180,
        ownership: ['new'],
        role: '운영자가 관리 대상·사용 정지·블랙리스트 고객을 조회하고 조치하는 화면입니다.',
        mine: [{ ownership: 'new', text: '서버 페이징, 검색, 정렬, 엑셀 다운로드, 권한별 기능 제어를 구현했습니다.' }],
        ref: 'monitoring',
        evidence: 'git',
      },
      {
        id: 'collector',
        name: '데이터 수집기',
        summary: '의심 고객 등록',
        lane: 'admin',
        kind: 'component',
        x: 645,
        y: 410,
        ownership: ['extended'],
        role: '고객 서비스에서 전달한 데이터를 운영관리시스템에 반영하는 기존 수집기입니다.',
        mine: [{ ownership: 'extended', text: '의심 고객 정보의 등록과 별도 탐지 조건에 따른 알림 처리를 추가했습니다.' }],
        ref: 'monitoring',
        evidence: 'git',
      },
      {
        id: 'watch-data',
        name: '의심 고객 관리 데이터',
        summary: '정보·사유·설정',
        lane: 'admin',
        kind: 'component',
        x: 885,
        y: 410,
        ownership: ['new'],
        role: '의심 고객 정보와 등록 사유, 관리에 필요한 설정을 저장합니다.',
        mine: [],
        ref: 'monitoring',
        evidence: 'git',
      },
      {
        id: 'mail',
        name: '운영자 알림 메일',
        summary: '운영자 알림',
        lane: 'admin',
        kind: 'component',
        x: 885,
        y: 180,
        ownership: ['existing'],
        role: '운영자에게 안내 메일을 보내는 기존 기능입니다.',
        mine: [{ ownership: 'new', text: '의심 고객 등록과 사용 정지·해제 관련 알림을 추가했습니다.' }],
        ref: 'monitoring',
        evidence: 'git',
      },
    ],
    edges: [
      { from: 'applicant', to: 'signup-ui', label: '가입·회사 생성 요청', labelDx: 70 },
      { from: 'signup-ui', to: 'signup-server', label: '요청 처리', labelDx: 44 },
      { from: 'signup-server', to: 'history', label: '이력 저장·조회', labelDx: 52 },
      { from: 'signup-server', to: 'queue', label: '의심 고객 정보 전달', labelDx: 26, labelDy: -14 },
      { from: 'queue', to: 'collector', label: '비동기 데이터 수집', labelDy: -14 },
      { from: 'collector', to: 'watch-data', label: '정보 등록', labelDy: -14 },
      { from: 'collector', to: 'mail', label: '알림 요청', labelDx: 18, labelDy: 18 },
      { from: 'mail', to: 'operator', label: '알림 발송', labelDx: 40 },
      { from: 'operator', to: 'monitor', label: '조회·조치', labelDx: 0, labelDy: -12 },
      { from: 'monitor', to: 'suspend-apply', label: '정지·해제 요청', labelDy: -16 },
      { from: 'monitor', to: 'signup-server', label: '회사 생성 확인 정보 검증 연동', labelDx: -30, labelDy: 26 },
    ],
    flows: [
      {
        id: 'register',
        title: '의심 고객 자동 등록',
        oneLine: '가입 과정에서 분류된 의심 고객 정보를 운영관리시스템에 전달하고 등록',
        summary:
          '가입·회사 생성 과정에서 의심 고객으로 분류되면, 해당 정보를 기존 비동기 연동 구조를 통해 운영관리시스템으로 전달합니다. 운영관리시스템은 정보를 등록하고 운영자에게 알림을 보냅니다.',
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
          { node: 'signup-server', text: '가입 이력 확인 및 의심 고객 판정' },
          {
            node: 'queue',
            text: '의심 고객 정보를 운영관리시스템으로 전달',
            detail: [
              '의심 고객 정보를 등록하려면 해당 고객사 정보가 먼저 존재해야 합니다. 이를 고려해 기존 비동기 연동 흐름에서 고객사 정보 전송을 먼저 요청하도록 실행 순서를 조정했습니다.',
            ],
          },
          { node: 'collector', text: '의심 고객 정보 등록 및 알림 대상 확인' },
          { node: 'mail', text: '운영자에게 신규 관리 대상 안내' },
        ],
      },
      {
        id: 'company',
        title: '회사 생성 확인',
        oneLine: '회사 생성에 필요한 확인 정보를 서버에서 검증',
        summary:
          '회사 생성 과정에 추가 확인 절차를 적용했습니다. 운영관리시스템에서 발급한 확인 정보를 고객 서비스 서버가 검증한 뒤 회사 생성을 진행하도록 기존 기능을 확장했습니다.',
        path: [
          ['operator', 'monitor'],
          ['monitor', 'signup-server'],
          ['applicant', 'signup-ui'],
          ['signup-ui', 'signup-server'],
        ],
        steps: [
          { node: 'monitor', text: '회사 생성에 필요한 확인 정보 발급' },
          { node: 'signup-ui', text: '확인 정보를 포함한 회사 생성 요청' },
          { node: 'signup-server', text: '확인 정보 검증 후 회사 생성' },
        ],
      },
      {
        id: 'suspend',
        title: '사용 정지·해제',
        oneLine: '운영자의 사용 정지·해제 요청을 고객 서비스에 반영',
        summary:
          '운영자가 사용 정지 또는 해제를 요청하면 해당 상태를 고객 서비스에 반영합니다. 정지된 회사에는 사용자 역할에 맞는 안내를 표시하고, 주요 서비스 기능의 접근을 제한합니다.',
        path: [
          ['operator', 'monitor'],
          ['monitor', 'suspend-apply'],
        ],
        steps: [
          { node: 'monitor', text: '운영자가 확인 후 사용 정지·해제 요청' },
          {
            node: 'suspend-apply',
            text: '회사 상태 반영 및 정지 상태에 따른 접근 제한',
            detail: ['사용자 역할별 안내를 제공하고, 정지 상태에 따른 접근 제한을 화면과 서버에 적용했습니다.'],
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
      summary: '대표관리자의 가입·탈퇴·권한 변경 이력을 관리하고, 기획 정책에 따라 재가입 제한과 의심 고객 판정에 활용했습니다.',
      units: [
        {
          title: '가입 이력 관리',
          body: '가입·탈퇴·권한 변경 시점의 이력을 기록하고 조회하는 기능을 설계했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '재가입 제한',
          body: '가입 이력을 기준으로 기획팀에서 정한 재가입 제한 조건을 적용했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '의심 고객 판정',
          body: '기획팀에서 정의한 조건에 해당하는 고객을 관리 대상으로 분류했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'company',
      title: '회사 생성 확인',
      system: '고객 서비스 · 운영관리시스템',
      summary: '기존 회사 생성 기능에 추가 확인 절차를 적용하고, 서버에서 확인 정보를 검증하도록 구현했습니다.',
      units: [
        {
          title: '확인 정보 발급·검증',
          body: '운영관리시스템에서 발급한 정보를 고객 서비스 서버가 검증한 뒤 회사 생성을 진행하도록 기존 기능을 확장했습니다.',
          ownership: ['new', 'extended'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'monitoring',
      title: '운영관리시스템 연동과 의심 고객 관리',
      system: '고객 서비스 · 운영관리시스템',
      summary:
        '고객 서비스에서 분류한 의심 고객 정보를 기존 비동기 연동 구조로 전달하고, 운영관리시스템의 등록·조회·알림 기능을 구현했습니다.',
      units: [
        {
          title: '의심 고객 자동 등록',
          body: '기존 비동기 전송 구조에 의심 고객 정보 유형을 추가하고, 수집기에서 등록하도록 확장했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '의심 정보 확인 및 알림',
          body: '운영자가 설정한 조건에 해당하는 정보를 확인해 관리 대상으로 등록하고, 운영자에게 메일로 알리도록 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '관리 화면',
          body: '관리 대상·사용 정지·블랙리스트 고객을 조회하는 화면에 서버 페이징, 검색, 정렬, 엑셀 다운로드, 권한별 기능 제어를 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'suspend',
      title: '서비스 사용 정지·해제 연동',
      system: '고객 서비스 · 운영관리시스템',
      summary: '운영관리시스템에서 요청한 정지·해제 상태를 고객 서비스에 반영하고, 정지된 회사의 주요 기능 접근을 제한했습니다.',
      units: [
        {
          title: '정지·해제 API',
          body: '운영자의 요청을 기존 시스템 간 인증 구조를 거쳐 고객 서비스에 반영하도록 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '역할별 안내와 접근 제한',
          body: '정지된 회사에 사용자 역할별 안내를 제공하고, 문서 작성 등 주요 기능의 접근을 화면과 서버에서 제한했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
      note: '기존 안내 화면의 처리 흐름은 재사용하되, 정지 상태 판단과 접근 제한은 새로 구현했습니다. 화면 스타일은 별도 담당자가 구현했습니다.',
    },
  ],

  // 05 기술적 문제 해결. "순서 보장"·특정 가입 경로·우회 조건은 쓰지 않는다.
  cases: [
    {
      title: '시스템 간 데이터 등록 순서 조정',
      requirement:
        '고객 서비스에서 분류한 의심 고객을 운영관리시스템에 등록해야 했습니다. 의심 고객 정보는 특정 고객사에 속하므로, 등록 대상인 고객사 정보가 운영관리시스템에 먼저 존재해야 했습니다.',
      existing:
        '고객사 정보와 의심 고객 정보는 기존 비동기 연동 구조를 통해 운영관리시스템으로 전달되고, 수집기가 각 데이터를 처리하는 방식이었습니다.',
      implementation: [
        {
          label: '데이터 의존 관계 확인',
          text: '회사 생성과 동시에 의심 고객으로 분류되는 경우, 고객사 정보가 등록되기 전에 의심 고객 정보를 처리하면 대상 회사를 찾지 못해 등록이 누락될 수 있었습니다.',
        },
        {
          label: '전송·수집 흐름 분석',
          text: '기존 데이터의 전송 및 수집 흐름을 확인하고, 의심 고객 등록에 필요한 고객사 정보의 생성 시점을 파악했습니다.',
        },
        { label: '실행 순서 조정', text: '고객사 정보 전송을 먼저 요청하도록 가입·회사 생성 과정의 실행 순서를 조정했습니다.' },
        { label: '중복 등록 정리', text: '운영관리시스템에서 같은 관리 대상이 중복 등록되던 처리 경로를 정리했습니다.' },
      ],
      evidence: 'git',
    },
    {
      title: '가입 제한 검증을 서버로 확장',
      requirement: '탈퇴 후 기획팀에서 정한 제한 기간에는 대표관리자로 다시 가입할 수 없어야 했습니다.',
      existing: '초기에는 가입 화면에서 입력 정보를 확인하고, 재가입 제한 여부를 사용자에게 안내했습니다.',
      implementation: [
        { label: '검증 누락 확인', text: '운영 이후 일부 가입 흐름에서 화면의 제한 확인 절차가 실행되지 않는 문제를 확인했습니다.' },
        { label: '화면 처리 보완', text: '해당 흐름에서도 재가입 제한 여부를 확인하도록 화면 처리를 수정했습니다.' },
        {
          label: '서버 검증 추가',
          text: '후속 개선으로 실제 가입 처리 단계에서도 제한 조건을 확인하도록 변경했습니다. 화면의 사전 확인 여부와 관계없이 서버에서 최종 가입 가능 여부를 판단하도록 했습니다.',
        },
      ],
      table: {
        caption: '검증 위치 비교',
        columns: ['위치', '역할', '적용 시점'],
        rows: [
          ['가입 화면', '가입 전 제한 여부 안내', '최초 운영 반영'],
          ['가입 처리 서버', '실제 가입 요청에 대한 최종 검증', '운영 이후 개선'],
        ],
      },
      evidence: 'git',
    },
  ],

  validation: {
    groups: [
      {
        title: '테스트 및 QA',
        emphasis: '13개 개발자 테스트 시나리오를 작성·수행',
        paragraphs: [
          {
            text: '재가입 제한, 의심 고객 등록, 회사 생성, 사용 정지·해제, 운영관리 화면, 운영자 알림 등 13개 개발자 테스트 시나리오를 작성·수행하고 검토자 확인을 받았습니다.',
            evidence: 'doc',
          },
          { text: 'QA에서 확인된 데이터 등록·조회 관련 오류를 수정했습니다.', evidence: 'git' },
        ],
      },
      {
        title: '운영 반영 및 유지보수',
        paragraphs: [
          { text: '2025년 9월 서비스 운영 환경에 반영했습니다.', evidence: 'self' },
          { text: '운영 이후 가입 제한 검증 누락과 시스템 연동 관련 문제를 수정하며 기능을 유지보수했습니다.', evidence: 'git' },
        ],
      },
      {
        title: '결과',
        paragraphs: [
          {
            text: '의심 고객 등록·알림과 사용 정지·해제 기능을 실제 운영 업무에 적용했습니다. 이후 운영 중 발견된 문제를 수정하고, 재가입 제한을 서버에서 최종 검증하도록 보완했습니다.',
            evidence: 'self',
          },
        ],
      },
    ],
  },

  retrospective: [
    {
      text: '처음에는 가입 화면에서 재가입 제한 여부를 확인하도록 구현했습니다. 그런데 운영 이후 일부 가입 흐름에서 확인 절차가 실행되지 않는 문제가 있었고, 실제 가입 처리 단계에도 서버 검증을 추가했습니다.',
      evidence: 'git',
    },
    {
      text: '화면에서 미리 안내하는 것만으로는 가입을 확실하게 제한할 수 없다는 걸 알게 됐습니다. 특히 기존 서비스처럼 가입 경로가 여러 곳에 있는 경우에는, 최종 처리 단계에서도 검증해야 한다는 점이 기억에 남았습니다.',
      evidence: 'self',
    },
  ],
};
