import type { Project } from '../types';

// 공개 원칙: 회사·고객사명, 실제 데이터 모델·필드명, API 경로, 운영 수치, 정산 정책 값, 내부 코드,
// 번호 발급 방식 등 내부 구현 세부, 내부 오류·검증 환경 세부, 종료 사유는 쓰지 않는다.
// 수치: Back-end 테스트는 실행 시점과 함께만 쓰고, Front-end 테스트 수와 검사 시간 비교는 쓰지 않는다.
// 근거 상세는 저장소 밖 portfolio-private/evidence-matrix-op2.md 에 있다.

export const project: Project = {
  slug: 'op2-operation-system',
  title: '고객·계약·청구 통합 운영관리시스템 개발 (OP2)',
  listing: {
    description:
      '운영관리시스템과 스프레드시트에 나뉘어 있던 고객·계약·청구 업무를 한 시스템으로 옮기기 위해, 요구사항 분석부터 Front-end·Back-end 구현과 검증까지 진행했습니다.',
    stack: ['풀스택', 'React', 'TanStack Query', 'Spring Boot', 'jOOQ'],
    year: '2026',
    status: '운영 미반영',
  },
  meta: '사내 운영 시스템 · 2026.08 – 2026.09 · 개발 환경 구현 · 운영 미반영',
  summary:
    '기존 운영관리시스템과 스프레드시트에 나뉘어 있던 고객·계약·청구 업무를 통합하기 위한 시스템을 개발했습니다. 현업 담당자와 직접 소통하며 불편한 점을 파악하고 필요한 기능을 기획했습니다. 이후 도메인 설계부터 Front-end·Back-end 구현과 검증까지 주도했습니다.',
  role: '요구사항 분석 · 기능 기획 · 도메인 설계 · 풀스택 개발 · 검증',
  tags: ['풀스택 개발', '도메인 설계', 'AI 협업 개발'],
  highlights: [
    {
      label: '현업 요구사항 분석 및 도메인 설계',
      text: '현업의 업무 방식과 불편함을 파악해 기능을 기획하고, 기존 데이터 분석을 바탕으로 그룹사·매출처 도메인 설계',
      evidence: 'git',
    },
    {
      label: '청구·입금 Back-end 개발',
      text: '청구 등록의 멱등 처리, 입금 연결의 동시성 제어 및 연결 이력 관리 구현',
      evidence: 'git',
    },
    {
      label: 'React 기반 업무 화면 개발',
      text: 'TanStack Query를 활용한 서버 상태 관리, 동시 편집 충돌 처리, URL 기반 화면 상태 유지 구현',
      evidence: 'git',
    },
  ],

  overview: {
    rows: [
      ['기간', '2026.08 – 2026.09'],
      ['진행 결과', '개발 환경에서 주요 기능 구현·검증 · 운영 미반영'],
      ['담당 역할', '단독 담당 개발자 — 요구사항 분석, 도메인·상세 설계, Front-end·Back-end 개발, 테스트·검증'],
      ['개발 방식', 'Claude Code를 활용해 개발했으며, 요구사항 분석과 설계 방향 수립, 구현 결과 검토 및 테스트를 직접 진행했습니다.'],
    ],
    stacks: [
      { system: 'Back-end', items: ['Java 21', 'Spring Boot', 'jOOQ', 'PostgreSQL', 'Flyway'] },
      { system: '화면', items: ['React 19', 'TypeScript', 'TanStack Query'] },
      { system: '검증', items: ['JUnit', 'Testcontainers', 'Vitest', 'Playwright'] },
      { system: '개발 환경', items: ['Claude Code', 'Git Worktree', 'Git Hook'] },
    ],
    // 신규 시스템이라 협업·기존 구조 활용 행을 두지 않는다 (현업 소통은 Hero·02·05에서 설명)
    collaboration: [],
  },

  background: {
    labels: { before: '기존 업무', after: 'OP2 구현 방향 (개발 환경)' },
    comparisons: [
      {
        topic: '고객 관리',
        before: '고객 정보가 운영관리시스템과 여러 스프레드시트에 나뉘어 있었습니다.',
        after: '고객사 화면 하나에서 구독 상태·사용량·계약·변경 이력을 조회할 수 있게 했습니다.',
        evidence: 'doc',
      },
      {
        topic: '그룹사',
        before: '계열사 묶음을 원래 다른 용도의 입력 칸으로 관리하고 있었습니다.',
        after: '그룹사 관리 기능을 구현하고, 계약 등록 시점의 공유 대상을 별도로 저장하도록 했습니다.',
        evidence: 'doc',
      },
      {
        topic: '청구 대상',
        before: '계약 대상 고객사와 실제 청구 대상이 다른 경우를 구분해 관리하기 어려웠습니다.',
        after: '매출처를 따로 두고, 청구를 매출처 기준으로 등록하게 했습니다.',
        evidence: 'doc',
      },
      {
        topic: '청구·입금',
        before: '청구 요청과 수금 확인을 스프레드시트와 메일로 처리했습니다.',
        after: '청구 등록, 입금 등록, 입금과 청구의 연결을 화면과 API로 만들었습니다.',
        evidence: 'git',
      },
    ],
    approach: [
      {
        text: 'OP2는 기존 운영관리시스템(OP)을 대체할 신규 시스템을 개발하면서, Claude Code를 활용한 AI 기반 개발 과정을 처음부터 끝까지 경험하기 위해 시작한 프로젝트입니다.',
        evidence: 'self',
      },
      {
        text: '기존에는 고객·계약·청구 업무가 운영관리시스템과 여러 스프레드시트에 나뉘어 있었습니다. 실제 사용자인 운영·영업 담당자와 정기적으로 회의하고 수시로 질의응답하며 업무 흐름과 예외 사례를 파악했습니다. 또한 운영 데이터를 직접 조회해 기존 데이터 구조와 실제 사용 방식을 확인하고, 이를 바탕으로 요구사항을 구체화해 OP2의 기능과 설계에 반영했습니다.',
        evidence: 'self',
      },
      {
        text: '개발 과정에서는 AI가 생성한 코드와 테스트를 직접 검증하며 여러 시행착오를 겪었습니다. 반복되는 오류와 작업 환경 문제를 테스트 및 개발 규칙에 반영하면서 AI 협업 방식을 개선했습니다.',
        evidence: 'git',
      },
      {
        text: '이후 회사의 시스템 통합 방향이 변경되면서 OP2의 단독 개발이 종료되었습니다. 주요 기능은 개발 환경에서 구현·검증했으며, 운영 배포와 기존 업무 전환은 진행되지 않았습니다.',
        evidence: 'self',
      },
    ],
  },

  architecture: {
    lanes: [
      { id: 'web', label: '화면 (React)', x: 2, width: 326 },
      { id: 'server', label: '서버 (Spring Boot)', x: 337, width: 326 },
      { id: 'data', label: '데이터 (PostgreSQL)', x: 672, width: 326 },
    ],
    roles: [
      { label: '화면', text: '고객사·그룹, 계약, 청구·입금 업무 화면입니다. 서버 상태 조회와 화면 상태 유지, 입력·저장 처리를 맡습니다.' },
      { label: '서버', text: '업무 규칙을 검증하고, 청구 재시도와 입금 연결처럼 정합성이 필요한 처리를 트랜잭션 안에서 수행합니다.' },
      { label: '데이터', text: '그룹 소속과 계약 공유 범위, 청구·입금과 연결 이력을 저장합니다.' },
    ],
    nodes: [
      {
        id: 'ui-customer',
        name: '고객사·그룹 화면',
        summary: '조회·그룹 관리',
        lane: 'web',
        kind: 'component',
        x: 165,
        y: 150,
        ownership: ['new'],
        role: '고객사 정보와 사용량을 조회하고, 그룹을 만들고 소속 회사를 관리하는 화면입니다.',
        mine: [
          { ownership: 'new', text: '조회 상태 표시, 검색 조건·탭의 URL 유지, 동시 편집 충돌 안내를 구현했습니다.' },
        ],
        ref: 'screen',
        evidence: 'git',
      },
      {
        id: 'ui-contract',
        name: '계약 등록 화면',
        summary: '대상 선택·초과 정산',
        lane: 'web',
        kind: 'component',
        x: 165,
        y: 300,
        ownership: ['new'],
        role: '계약을 등록·수정하는 화면입니다. 초과 사용분 정산도 별도 화면이 아니라 이 등록 화면 안에서 확인하고 확정합니다.',
        mine: [
          { ownership: 'new', text: '계약 대상(개별 회사 또는 그룹)을 고르면 이전 계약의 초과 사용분을 조회해 안내합니다.' },
          { ownership: 'new', text: '초과 금액은 화면에서 건수와 단가로 계산하고, 담당자가 확정한 값을 계약의 제공 항목에 반영합니다.' },
        ],
        ref: 'overage',
        evidence: 'git',
      },
      {
        id: 'ui-billing',
        name: '청구·입금 화면',
        summary: '청구 등록·입금 연결',
        lane: 'web',
        kind: 'component',
        x: 165,
        y: 450,
        ownership: ['new'],
        role: '청구를 등록하고, 입금을 등록해 청구와 연결하는 화면입니다.',
        mine: [{ ownership: 'new', text: '청구 등록 요청마다 요청 키를 만들어 보내고, 연결 후보를 조회해 입금과 청구를 연결합니다.' }],
        ref: 'billing',
        evidence: 'git',
      },
      {
        id: 'api-customer',
        name: '고객·그룹 API',
        summary: '조회·그룹 편집',
        lane: 'server',
        kind: 'component',
        x: 500,
        y: 150,
        ownership: ['new'],
        role: '고객사 조회와 그룹 편집을 처리합니다.',
        mine: [
          { ownership: 'new', text: '그룹 변경은 사유와 함께 이력으로 남기고, 수정 시각이 다르면 덮어쓰지 않고 충돌로 응답합니다.' },
        ],
        ref: 'domain',
        evidence: 'git',
      },
      {
        id: 'api-contract',
        name: '계약 API',
        summary: '공유 범위·초과 건수',
        lane: 'server',
        kind: 'component',
        x: 500,
        y: 300,
        ownership: ['new'],
        role: '계약 등록·수정과 이전 계약의 초과 사용분 조회를 처리합니다.',
        mine: [
          { ownership: 'new', text: '그룹으로 계약을 맺으면 그 시점의 그룹 구성원을 계약 공유 대상으로 확정합니다.' },
          { ownership: 'new', text: '이전 계약 상품의 제공량·단가와 사용량을 조회해 초과 건수를 계산합니다.' },
        ],
        ref: 'domain',
        evidence: 'git',
      },
      {
        id: 'api-billing',
        name: '청구·입금 API',
        summary: '멱등·잠금·이력',
        lane: 'server',
        kind: 'component',
        x: 500,
        y: 450,
        ownership: ['new'],
        role: '청구 등록, 입금 등록, 입금과 청구의 연결·해제를 처리합니다.',
        mine: [
          { ownership: 'new', text: '요청 키로 청구 재시도를 구분하고, 입금 연결 시 잠근 뒤 합계를 다시 확인합니다.' },
          { ownership: 'new', text: '연결 해제는 기존 기록을 지우지 않고 반대 기록을 추가합니다.' },
        ],
        ref: 'billing',
        evidence: 'git',
      },
      {
        id: 'db',
        name: 'OP2 DB',
        summary: '업무 데이터',
        lane: 'data',
        kind: 'component',
        x: 835,
        y: 300,
        ownership: ['new'],
        role: 'OP2의 고객·그룹·계약·청구·입금 데이터를 저장합니다.',
        mine: [
          { ownership: 'new', text: '그룹 소속과 계약 공유 범위를 따로 저장하고, 청구 요청 키에 유일성 제약을 두었습니다.' },
        ],
        ref: 'domain',
        evidence: 'git',
      },
    ],
    edges: [
      { from: 'ui-customer', to: 'api-customer' },
      { from: 'ui-contract', to: 'api-contract' },
      { from: 'ui-billing', to: 'api-billing', label: '요청 키 포함', labelDy: -14 },
      { from: 'api-customer', to: 'db' },
      { from: 'api-contract', to: 'db', label: '조회·저장', labelDy: -14 },
      { from: 'api-billing', to: 'db', label: '잠금·재확인', labelDx: 6, labelDy: 24 },
    ],
    flows: [
      {
        id: 'group-contract',
        title: '그룹 계약 및 공유 범위',
        oneLine: '계약 등록 시점의 그룹 구성원을 계약별 공유 대상으로 저장',
        summary:
          '계약 대상을 그룹으로 고르면 그 시점의 그룹 구성원을 계약별 공유 대상으로 저장합니다. 그룹 소속과 계약 공유 범위를 따로 관리하므로, 이후 그룹 구성이 바뀌어도 기존 계약의 공유 대상은 그대로입니다.',
        path: [
          ['ui-contract', 'api-contract'],
          ['api-contract', 'db'],
        ],
        steps: [
          { node: 'ui-contract', text: '그룹 선택 및 계약 대상 확인' },
          { node: 'api-contract', text: '현재 그룹 구성원을 계약 공유 대상으로 확정' },
          { node: 'db', text: '계약과 공유 대상 저장 (그룹 소속과 별도 관리)' },
        ],
      },
      {
        id: 'overage',
        title: '초과 사용분 정산',
        showAllSteps: true,
        oneLine: '계약 등록 화면 안에서 이전 계약의 초과 사용분을 확인하고 새 계약에 반영',
        summary:
          '계약 등록 시 이전 계약의 초과 사용분을 조회하고, 서버에서 초과 건수를 계산합니다. 화면에서는 금액을 산정하고 담당자가 검토·확정한 정산 결과를 계약과 함께 저장합니다.',
        path: [
          ['ui-contract', 'api-contract'],
          ['api-contract', 'db'],
        ],
        steps: [
          {
            node: 'ui-contract',
            text: '개별 회사 또는 그룹 선택',
            detail: ['그룹을 고르면 소속 회사들의 이전 계약까지 확인 대상에 포함합니다.'],
          },
          { node: 'api-contract', text: '이전 계약과 사용량을 조회해 초과 건수 계산' },
          { node: 'ui-contract', text: '건수와 단가를 바탕으로 금액 산정, 담당자 검토·조정' },
          { node: 'ui-contract', text: '확정한 정산 내용을 새 계약에 반영' },
          { node: 'db', text: '계약과 정산 결과 저장' },
        ],
      },
      {
        id: 'billing',
        title: '청구·입금 관리',
        oneLine: '청구 등록의 중복 방지와 입금 연결의 초과 방지를 같은 경로에서 처리',
        summary:
          '청구 등록과 입금 연결은 서로 독립된 작업이지만 같은 경로를 거칩니다. 청구 등록 시에는 동일 요청의 중복 생성을 방지하고, 입금을 청구에 연결할 때는 동시 요청으로 연결 금액이 초과되지 않도록 처리했습니다.',
        path: [
          ['ui-billing', 'api-billing'],
          ['api-billing', 'db'],
        ],
        steps: [
          { node: 'ui-billing', text: '청구 등록 또는 입금 연결 요청' },
          { node: 'api-billing', text: '작업별 정합성 처리 (아래 참고)' },
          { node: 'db', text: '청구·입금과 연결 기록 저장' },
        ],
        sections: [
          {
            title: '청구 등록 — 멱등 처리',
            text: '요청 식별값과 데이터베이스 유일성 제약을 활용해 재시도에 따른 중복 등록을 처리했습니다.',
          },
          {
            title: '입금 연결 — 동시성 제어',
            text: '입금과 청구 데이터를 잠근 뒤 연결 금액을 다시 확인해 동시 요청에 따른 초과 연결을 방지하도록 구현했습니다.',
          },
        ],
      },
    ],
  },

  // 04 주요 개발 내용. ownership 은 내부 검증용 (화면 미표시).
  contributions: [
    {
      id: 'domain',
      title: '그룹사·매출처 데이터 모델과 기능',
      system: '요구사항 분석 · Back-end · 화면',
      summary: '현업 설명과 기존 데이터 분석을 바탕으로, 기존 시스템에 없던 그룹사와 매출처를 데이터 모델과 기능으로 만들었습니다.',
      units: [
        {
          title: '그룹 모델',
          body: '회사의 현재 그룹은 변경 이력과 함께 관리하고, 계약을 그룹으로 맺으면 그 시점의 그룹 구성을 계약별 공유 대상으로 저장했습니다.',
          ownership: ['new'],
          anchor: 'group-model',
          evidence: 'git',
        },
        {
          title: '그룹 관리 화면',
          body: '그룹 생성·수정, 소속 회사 추가·이동·제외, 대표 회사 지정, 그룹 사용량·계약·변경 이력 조회. 그룹을 바꿀 때는 사유를 입력받습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '제휴 정보 분리',
          body: '기존 입력 칸에 계열사 묶음과 섞여 있던 제휴 정보는 그룹이 아니라 별도의 채널 관리로 옮겼습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '매출처 모델과 청구 등록',
          body: '고객사와 청구 대상을 구분하는 매출처 모델을 설계하고, 청구 등록 시 기존 매출처를 선택하거나 새 매출처를 등록할 수 있도록 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
      noteLabel: '참고',
      note: '기존 데이터 이관과 일부 후속 관리 기능은 구현 범위에 포함되지 않았습니다.',
    },
    {
      id: 'billing',
      title: '청구·입금 서버 API와 정합성',
      system: 'Back-end',
      summary: '청구 등록과 입금 연결에서 재시도와 동시 요청이 있어도 금액과 이력이 어긋나지 않도록 서버 처리를 구현했습니다.',
      emphasis: '재시도와 동시 요청',
      units: [
        {
          title: '청구 등록',
          body: '매출처, 청구 번호, 청구 항목을 한 번에 저장하고, 요청 키로 같은 요청의 재시도를 구분합니다. 과정은 5.2에 정리했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '입금 연결',
          body: '하나의 입금을 여러 청구에 나눠 연결할 수 있습니다. 연결하기 전에 해당 입금과 청구를 잠그고 합계를 다시 읽어, 입금액이나 청구액을 넘는 연결을 막습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '연결 해제 이력',
          body: '기존 연결 기록은 유지하고, 반대 금액의 거래 기록을 추가해 해제 시점과 사유를 이력으로 남겼습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '발행 요청 메일',
          body: '발송에 성공했을 때만 청구 상태를 바꾸고, 결과를 알 수 없으면 상태를 그대로 둡니다. 개발 환경에서 시험 발송까지 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '오류 응답',
          body: '업무 오류는 코드로 내려주고 화면이 문구를 만듭니다. 예상하지 못한 내부 오류 문구는 사용자에게 보이지 않게 막았습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'screen',
      title: '업무 화면의 서버 상태 관리와 동시 편집',
      system: 'Front-end · Back-end',
      summary: '조회 결과가 언제 최신인지, 다른 사람이 먼저 고쳤는지, 새로고침 뒤에도 같은 화면인지가 분명하게 보이도록 화면을 만들었습니다.',
      units: [
        {
          title: 'TanStack Query 기반 조회 상태 관리',
          body: '화면마다 따로 짜여 있던 조회 코드를 옮기면서 처음 불러오는 상태와 다시 불러오는 상태를 나눴습니다. 재조회 중에는 기존 조회 결과를 유지하면서 갱신 중임을 표시했고, 조회가 실패하면 다시 시도할 수 있게 했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '동시 편집 충돌 처리',
          body: '화면을 연 시점의 수정 시각을 저장 요청에 함께 보냅니다. 그 사이 다른 사람이 먼저 저장했다면 서버는 덮어쓰지 않고 충돌로 응답하고, 화면은 새로 고쳐 확인한 뒤 다시 저장하도록 안내합니다. Front-end와 Back-end를 함께 구현했고, 고객사·채널·쿠폰 수정 화면에 적용했습니다.',
          ownership: ['new'],
          emphasis: '덮어쓰지 않고 충돌로 응답',
          evidence: 'git',
        },
        {
          title: 'URL 기반 화면 상태 유지',
          body: '목록 검색 조건, 탭, 사용량 조회 기간을 URL에 담아 새로고침하거나 상세 화면에 다녀와도 같은 조건으로 돌아옵니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '입력·저장 처리 공통화',
          body: '연속 클릭으로 같은 저장이 두 번 실행되지 않게 막았습니다. 수정 화면은 연 시점의 값과 비교해 실제로 바뀐 경우에만 나가기 확인을 띄우고, 입력 오류는 칸을 벗어나거나 저장할 때 보여주는 규칙을 여러 폼에 공통으로 적용했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
      noteLabel: '그 밖에',
      note: '한국어·영어·일본어 다국어와 누락 검사, 계약 대상을 바꾸면 이전 계산값이 남던 문제 등 개별 화면 오류를 재현 후 수정했습니다.',
    },
    {
      id: 'overage',
      title: '계약 등록 및 초과 사용분 정산',
      system: 'Back-end · 화면',
      summary:
        '기존 계약 등록 업무를 참고해 OP2의 계약 관리 기능을 새로 구현하고, 담당자가 계약 등록과 별도로 처리하던 초과 사용분 정산을 계약 등록 흐름 안에서 확인하고 정할 수 있게 했습니다.',
      emphasis: '계약 등록 흐름 안에서',
      units: [
        {
          title: '계약 등록·수정',
          body: '계약 대상(회사 또는 그룹), 기간, 상품, 유료 옵션을 단계별로 입력해 등록하고, 분납 계약은 서버에서 회차를 만들어 둡니다. 기간이 겹치는 계약이 있으면 알려 주고, 수정·삭제할 때는 사유를 받아 변경 이력으로 남겼습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '이전 계약의 초과 사용분 확인',
          body: '계약 대상을 고르면 이전 계약의 초과 사용분을 조회해, 확인이 필요하면 등록 화면에 안내를 띄웁니다. 그룹을 대상으로 고르면 소속 회사들의 이전 계약까지 함께 확인합니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '초과분 계산',
          body: '서버는 이전 계약 상품의 제공량·단가와 사용량을 조회해 초과 건수를 계산하고, 초과 금액은 화면에서 건수와 단가로 산정합니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '담당자 확인·조정',
          body: '담당자가 계산 결과를 검토·조정해 확정하면, 정산 내용이 계약의 제공 항목에 반영되고 계약과 함께 저장됩니다. 값을 조정한 경우에는 사유를 남깁니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
      noteLabel: '참고',
      note: '정산 시점 등 일부 업무 규칙은 확정되지 않은 상태로 남아 있습니다.',
    },
  ],

  // 05 기술적 문제 해결. 번호 발급 방식·트랜잭션 경계 세부·내부 오류 사례 상세는 쓰지 않는다.
  cases: [
    {
      title: '그룹 변경이 기존 계약에 영향을 주지 않도록 설계',
      labels: { requirement: '배경', existing: '초기 설계안', implementation: '설계 변경' },
      requirement:
        '현업 담당자와 기존 그룹사 관리 방식을 확인하는 과정에서, 여러 업무 목적의 정보가 하나의 관리 항목에 혼재되어 있다는 점을 파악했습니다. 이후 기존 데이터를 분석해 그룹 관계를 별도 도메인으로 분리할 필요성을 확인했습니다.',
      existing:
        '처음에는 회사의 현재 그룹 소속을 기준으로 계약 공유 범위까지 관리하는 방식을 고려했습니다. 그러나 이 방식에서는 그룹 구성의 변경이 기존 계약의 공유 대상과 사용량 집계에 영향을 줄 수 있었습니다.',
      implementation: [
        {
          label: '요구사항 재확인',
          text: '계약 기능 구현에 앞서 현업과 계약 공유 범위를 다시 확인했습니다. 그룹 구성이 변경되더라도 기존 계약의 공유 대상과 사용량 집계 기준은 유지되어야 했으며, 그룹 소속과 별도로 계약하는 회사도 고려해야 했습니다.',
        },
        {
          label: '도메인 분리',
          text: '현재 그룹 소속과 계약별 공유 범위를 별도의 개념으로 정의했습니다. 계약 등록 시점의 공유 대상을 별도로 저장해 이후 그룹 구성 변경이 기존 계약의 공유 범위에 영향을 주지 않도록 설계·구현했습니다.',
        },
      ],
      table: {
        columns: ['구분', '그룹 소속', '계약 공유 범위'],
        rows: [
          ['의미', '회사의 현재 그룹 관계', '계약을 함께 사용하는 회사'],
          ['변경 시점', '그룹 소속을 변경할 때', '계약을 등록하거나 수정할 때'],
          ['그룹 변경의 영향', '현재 소속 관계 갱신 및 이력 기록', '기존 계약의 공유 대상 유지'],
        ],
      },
      evidence: 'doc',
    },
    {
      title: '응답을 받지 못한 청구 등록의 재시도',
      labels: { requirement: '문제 상황', existing: '검토한 접근', implementation: '구현' },
      requirement:
        '서버는 청구를 저장했는데 응답이 화면까지 오지 못하면, 사용자는 실패한 줄 알고 다시 등록합니다. 그대로 두면 같은 청구가 두 건 생기고 청구 번호도 하나 더 쓰이게 됩니다.',
      existing:
        '버튼 잠금은 새 탭이나 새로고침, 네트워크 재시도를 막지 못했고, 같은 내용의 중복을 금지하면 같은 금액을 정당하게 두 번 청구하는 경우까지 막혔습니다. 요청 키로 먼저 조회하는 방식은 처음에 구현했지만, 동시에 들어온 요청을 걸러내지 못하는 구조인데도 테스트가 통과하는 것을 보고 바꿨습니다.',
      implementation: [
        {
          label: '요청 식별값과 유일성 제약',
          text: '요청 식별값에 데이터베이스 유일성 제약을 적용하고, 청구 관련 데이터를 하나의 트랜잭션으로 처리했습니다. 중복 요청이 감지되면 기존 처리 결과를 조회해 동일한 요청은 기존 결과를 반환하고, 내용이 다른 요청은 충돌로 응답하도록 구현했습니다.',
        },
        {
          label: '검증',
          text: '같은 요청을 두 번 보냈을 때와 여러 요청을 동시에 보냈을 때 청구가 한 건만 남는지, 청구 번호가 건너뛰지 않는지, 같은 키에 다른 내용이면 거절되는지 테스트했습니다.',
        },
      ],
      evidence: 'git',
    },
    {
      title: 'AI 협업 개발의 검증 체계 개선',
      labels: { requirement: '배경', existing: '문제', implementation: '검증 절차' },
      requirement:
        'OP2는 처음부터 Claude Code로 개발했습니다. 프로젝트 규칙과 작업 지침은 CLAUDE.md에 정리했고, 문제가 생길 때마다 그 이유와 함께 규칙을 추가했습니다. 규칙이 늘어난 뒤에는 공통 규칙과 화면·검사·리뷰·작업 공간별 규칙으로 나눴습니다.',
      existing: '그래도 자동 검사는 통과했는데 실제로는 틀린 결과가 반복해서 나왔습니다.',
      implementation: [
        {
          label: '작업 공간과 개발 환경 분리',
          text: '여러 세션이 한 작업 공간을 함께 쓰다가 다른 작업의 변경이 섞인 일이 있었습니다. 이후 Git Worktree로 세션마다 작업 공간과 개발 DB를 나누고, 검사 전에 서버가 현재 작업 공간에서 실행된 것인지 확인하게 했습니다.',
        },
        {
          label: '오류 재현 테스트 작성',
          text: '문제를 발견하면 먼저 실패하는 테스트나 화면 검사로 재현하고 나서 고쳤습니다. 자동 판정은 통과했지만 화면에서는 틀렸던 경우도 재현 검사로 남겼습니다.',
        },
        {
          label: '반복되는 오류의 테스트·lint 규칙화',
          text: '존재하지 않는 데이터 필드 참조, 날짜에 따라 달라지는 결과, 그 시점 데이터를 그대로 박아 둔 기대값처럼 같은 종류의 실수가 반복되면 테스트와 lint 규칙으로 옮겼습니다.',
        },
        {
          label: '화면 변경 시 병합 전 검증',
          text: '화면 코드가 바뀐 병합은 해당 화면 검사를 통과한 기록이 있어야 진행되도록 Git Hook에 넣었습니다. 바뀐 화면에 해당하는 검사만 골라 실행할 수 있게 해서, 작은 변경도 검사를 거치게 했습니다.',
        },
      ],
      conclusion: '반복되는 오류를 개별 수정에 그치지 않고 테스트·검사 규칙·병합 조건에 반영해, 이후 변경 사항을 검증하는 절차를 마련했습니다.',
      evidence: 'git',
    },
  ],

  validation: {
    groups: [
      {
        title: 'Back-end',
        emphasis: 'Back-end 자동화 테스트 1,282건이 통과했습니다',
        paragraphs: [
          {
            text: '청구 등록의 반복·동시 요청에서 중복 데이터가 생성되지 않는지 검증하고, 입금 연결 시 동시 요청으로 연결 금액이 초과되지 않는지 테스트했습니다.',
            evidence: 'git',
          },
          {
            text: '그룹 계약에서는 계약 등록 시점의 공유 대상이 저장되는지와 개별 계약의 적용 범위를 확인했습니다.',
            evidence: 'git',
          },
          { text: '2026년 10월 16일 로컬 실행 기준, Back-end 자동화 테스트 1,282건이 통과했습니다.', evidence: 'git' },
        ],
      },
      {
        title: 'Front-end',
        paragraphs: [
          {
            text: '데이터 재조회와 오류 처리, 중복 저장 방지, 동시 편집 충돌 안내, URL 기반 화면 상태 유지 등 주요 동작을 브라우저에서 검증했습니다.',
            evidence: 'git',
          },
          {
            text: 'Vitest와 Playwright를 활용해 로직과 화면 문제를 재현하고, 변경 범위에 따른 자동화 검사와 병합 전 화면 검증 절차를 적용했습니다.',
            evidence: 'git',
          },
        ],
      },
      {
        title: '진행 결과',
        paragraphs: [
          { text: '주요 기능을 개발 환경에서 구현하고 자동화 테스트를 진행했으며, 운영에는 반영되지 않았습니다.', evidence: 'self' },
        ],
      },
    ],
  },

  retrospective: [
    {
      text: '개발하면서 실제 사용자와 직접 이야기할 기회는 많지 않았는데, 이번에는 운영·영업 담당자들과 직접 소통하며 진행할 수 있었습니다. 기존 업무에서 무엇이 불편한지 듣고 필요한 기능을 함께 구체화한 뒤, 개선 방향을 고민해 설계하고 실제 기능과 화면으로 만들어 보는 과정이 특히 재미있었습니다. 사용자와 가까이에서 이야기하며 기획부터 개발까지 이어 가는 방식이 저와 잘 맞는다고 느꼈습니다.',
      evidence: 'self',
    },
    {
      text: 'OP2는 처음부터 Claude Code로 진행했지만, 처음부터 잘 활용했던 것은 아닙니다. 작업을 어떻게 나눠 전달할지, 어떤 규칙이 필요한지, 만들어진 코드를 어떻게 확인할지를 개발하는 내내 고민했습니다. CLAUDE.md에 규칙을 정리하고, Git Worktree로 작업 환경을 나누고, 반복되는 오류를 테스트와 검사 규칙으로 옮기면서 방식을 조금씩 고쳐 나갔습니다. 그렇게 저에게 맞는 개발 방식을 직접 만들어 간 과정이 좋았습니다.',
      evidence: 'self',
    },
  ],
};
