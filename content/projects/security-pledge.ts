import type { Project } from '../types';

// 공개 원칙: 내부 프로젝트명, 고객사·조직 식별 정보, 지원·이슈 번호, 커밋 ID, API 주소, DB 테이블·필드명,
// 저장소 이름·메시지 형식·식별값 이름, 인증·토큰 처리, 동료 계정명은 쓰지 않는다.
// SDK 쪽 목록 전달 처리는 다른 개발자의 유사 선행 작업과 관계가 확인되지 않아 "처리를 추가"까지만 쓴다.
// 근거 상세는 저장소 밖 portfolio-private 의 근거 매트릭스에 있다.

export const project: Project = {
  slug: 'security-pledge',
  title: '보안서약서 관리 시스템 Front-end 개발',
  listing: {
    description:
      '보안서약서 캠페인·결재 관리 시스템에서 페이지를 넘겨도 유지되는 일괄 결재 선택 상태와 검색 조건 기반 전체 선택 처리를 TypeScript로 구현했습니다.',
    stack: ['Front-end', 'TypeScript', 'IndexedDB', 'Spring', 'MyBatis'],
    year: '2025',
  },
  meta: '기업용 보안서약서 관리 시스템 · 2025.06–2025.07 개발 참여 · 2025.09 운영 반영',
  summary:
    '기업용 보안서약서 관리 시스템에서 일괄 결재와 캠페인 관리 기능을 개발했습니다. TypeScript 기반 업무 화면을 구현하고, 검색 조건에 따른 일괄 처리를 위해 기존 Back-end 기능도 확장했습니다.',
  role: 'Front-end 개발 · Back-end 기능 확장',
  tags: ['TypeScript', 'Front-end 개발', '상태 관리'],
  highlights: [
    {
      label: '일괄 결재 선택 상태 관리',
      text: '페이지를 이동해도 선택 상태가 유지되도록 구현하고, 결재 대상 정보를 임베딩된 전자서명 화면까지 전달',
      evidence: 'git',
    },
    {
      label: '검색 조건 기반 일괄 처리',
      text: '화면의 전체 선택 여부와 검색 조건을 서버의 대상 조회 로직에 연결해, 현재 페이지 밖의 대상까지 일괄 처리하도록 구현',
      evidence: 'git',
    },
    {
      label: '전자서명 화면 연동 및 공통 UI 개선',
      text: 'SDK 기반 문서 작성·전송 화면 구현, 공통 로딩 처리와 재사용 UI 개선',
      evidence: 'git',
    },
  ],

  overview: {
    rows: [
      ['기간', '2025.06 – 2025.07 개발 참여'],
      ['진행 결과', '2025.09 운영 반영'],
      ['담당 역할', 'Front-end 개발 · Back-end 기능 확장'],
    ],
    stacks: [
      { system: '화면', items: ['TypeScript', 'Vite', 'jQuery', 'IndexedDB'] },
      { system: '서버', items: ['Java', 'Spring Boot', 'MyBatis'] },
      { system: '연동', items: ['전자서명 SDK (iframe 임베딩)'] },
    ],
    collaboration: [],
  },

  background: {
    labels: { before: '요구', after: '구현' },
    comparisons: [
      {
        topic: '일괄 결재',
        before: '여러 건의 서약서를 한 번에 결재',
        after: '선택 상태를 유지하는 결재 목록과 임베딩된 일괄 결재 화면을 연결했습니다.',
        evidence: 'git',
      },
      {
        topic: '대상자 일괄 처리',
        before: '검색된 캠페인 대상자 전체에 재요청·삭제',
        after: '전체 선택 시 검색 조건을 보내 서버에서 처리 대상을 구성하도록 했습니다.',
        evidence: 'git',
      },
      {
        topic: '캠페인 전송',
        before: '협력사 캠페인 문서 작성·전송',
        after: 'SDK 임베딩 문서 작성 화면과 예약·즉시 전송 팝업을 만들었습니다.',
        evidence: 'git',
      },
    ],
    approach: [
      {
        text: '기업용 보안서약서 관리 시스템은 캠페인 등록·전송부터 대상자 관리, 서약 및 결재 현황 조회까지의 업무를 지원하는 신규 시스템입니다. 저는 개발 후반부에 참여해 일괄 결재와 캠페인 관리에 필요한 화면 및 일부 서버 기능을 개발했습니다.',
        evidence: 'git',
      },
    ],
  },

  architecture: {
    badgeCorner: 'top-right',
    lanes: [
      { id: 'web', label: '화면 (TypeScript)', x: 2, width: 245 },
      { id: 'storage', label: '브라우저 저장소', x: 252, width: 245 },
      { id: 'esign', label: '전자서명 서비스 (SDK·iframe)', x: 502, width: 245 },
      { id: 'server', label: '서버 (Spring Boot)', x: 752, width: 246 },
    ],
    roles: [
      { label: '화면', text: '결재 목록, 일괄 결재, 캠페인 상세, 캠페인 작성·전송 화면입니다. 선택 상태와 요청 데이터를 관리합니다.' },
      { label: '브라우저 저장소', text: '확정한 결재 대상 목록을 보관합니다. 전자서명 서비스에 있던 일괄 결재용 저장 방식을 따릅니다.' },
      { label: '전자서명 서비스', text: '기존 SDK 연동 구조로 전자서명 화면을 임베딩합니다. 일괄 결재에서는 저장된 결재 대상을 임베딩 화면에 전달합니다.' },
      { label: '서버', text: '일괄 결재 대상을 조회하고, 캠페인 대상자의 일괄 재요청·삭제를 처리합니다.' },
    ],
    nodes: [
      {
        id: 'approval-list',
        name: '결재 목록 화면',
        summary: '선택 상태 유지',
        lane: 'web',
        kind: 'component',
        x: 125,
        y: 110,
        ownership: ['extended'],
        role: '기존 결재함 화면입니다. 일괄 결재 대상을 고르는 목록을 추가했습니다.',
        mine: [
          { ownership: 'extended', text: '전체 선택에서 시작해 해제한 서약서만 Set에 기록하고, 페이지를 넘겨도 선택 상태와 건수가 유지되게 했습니다.' },
        ],
        ref: 'approval',
        evidence: 'git',
      },
      {
        id: 'bulk-page',
        name: '일괄 결재 화면',
        summary: '결재 화면 임베딩',
        lane: 'web',
        kind: 'component',
        x: 125,
        y: 260,
        ownership: ['new'],
        role: '임베딩된 전자서명 화면으로 일괄 결재를 진행하는 전용 화면입니다.',
        mine: [{ ownership: 'new', text: '전용 화면을 새로 만들고, 결재가 끝나면 서약서 조회 화면으로 이동하게 했습니다.' }],
        ref: 'approval',
        evidence: 'git',
      },
      {
        id: 'campaign-detail',
        name: '캠페인 상세 화면',
        summary: '전체 선택·일괄 처리',
        lane: 'web',
        kind: 'component',
        x: 125,
        y: 530,
        ownership: ['extended'],
        role: '캠페인 대상자 목록을 보는 기존 화면입니다.',
        mine: [
          { ownership: 'extended', text: '페이지별 선택과 모두 선택, 일괄 재요청·삭제 팝업을 추가했습니다. 모두 선택이면 검색 조건을 함께 보냅니다.' },
        ],
        ref: 'bulk',
        evidence: 'git',
      },
      {
        id: 'campaign-send',
        name: '캠페인 작성·전송 화면',
        summary: '문서 작성·전송',
        lane: 'web',
        kind: 'component',
        x: 125,
        y: 430,
        ownership: ['new'],
        role: '협력사 캠페인 문서를 작성하고 예약·즉시 전송하는 화면입니다.',
        mine: [{ ownership: 'new', text: '임베딩 문서 작성 화면과 예약·즉시 전송·완료 팝업, 엑셀 대상자 업로드를 구현했습니다.' }],
        ref: 'ui',
        evidence: 'git',
      },
      {
        id: 'idb',
        name: 'IndexedDB',
        summary: '결재 대상 보관',
        lane: 'storage',
        kind: 'component',
        x: 375,
        y: 230,
        ownership: ['existing'],
        role: '확정한 결재 대상 목록을 브라우저에 보관합니다.',
        mine: [{ ownership: 'existing', text: '전자서명 서비스에 있던 일괄 결재용 저장 방식을 그대로 따라 결재 대상을 저장했습니다.' }],
        note: '저장 방식 자체는 기존 구조입니다.',
        ref: 'approval',
        evidence: 'git',
      },
      {
        id: 'sdk',
        name: '전자서명 SDK 연동',
        summary: '임베딩·목록 전달',
        lane: 'esign',
        kind: 'component',
        x: 625,
        y: 330,
        ownership: ['extended'],
        role: '전자서명 화면을 iframe으로 임베딩하는 기존 SDK 연동 구조입니다.',
        mine: [{ ownership: 'extended', text: '임베딩 결재 화면이 요청하면 저장된 결재 대상 목록을 전달하는 처리를 추가했습니다.' }],
        note: 'SDK 연동 구조 자체는 기존 구조입니다.',
        ref: 'approval',
        evidence: 'git',
      },
      {
        id: 'esign-view',
        name: '임베딩 전자서명 화면',
        summary: '결재·문서 작성',
        lane: 'esign',
        kind: 'component',
        x: 625,
        y: 460,
        ownership: ['extended'],
        role: 'iframe으로 임베딩되는 전자서명 화면입니다. 기존 일괄 결재와 문서 작성 기능을 그대로 사용합니다.',
        mine: [{ ownership: 'extended', text: '전달받은 결재 대상 목록을 기존 일괄 결재 흐름으로 넘기는 처리를 추가했습니다.' }],
        note: '결재·문서 작성 기능 자체는 기존 기능입니다.',
        evidence: 'git',
      },
      {
        id: 'approval-api',
        name: '일괄 결재 API',
        summary: '결재 대상 조회',
        lane: 'server',
        kind: 'component',
        x: 875,
        y: 110,
        ownership: ['existing'],
        role: '일괄 결재 대상과 임베딩 정보를 조회하는 API입니다.',
        mine: [],
        note: '다른 담당자가 설계·구현했습니다.',
        evidence: 'git',
      },
      {
        id: 'bulk-api',
        name: '일괄 재요청·삭제 API',
        summary: '조건 기반 대상 조회',
        lane: 'server',
        kind: 'component',
        x: 875,
        y: 530,
        ownership: ['extended'],
        role: '캠페인 대상자에게 서약서를 다시 요청하거나 대상자를 삭제하는 기존 API입니다.',
        mine: [
          { ownership: 'extended', text: '전체 선택이면 전달받은 검색 조건으로 처리 대상을 다시 조회하는 분기를 추가하고, 중복된 대상 조회를 하나로 정리했습니다.' },
        ],
        ref: 'bulk',
        evidence: 'git',
      },
    ],
    edges: [
      { from: 'approval-list', to: 'approval-api', label: '대상 조회' },
      { from: 'approval-list', to: 'idb', label: '저장', labelDx: 22, labelDy: -24 },
      { from: 'approval-list', to: 'bulk-page', label: '이동', labelDx: 26 },
      { from: 'bulk-page', to: 'sdk', label: '임베딩', labelDx: -40, labelDy: 14 },
      { from: 'idb', to: 'sdk', label: '목록 읽기', labelDx: 26, labelDy: -12 },
      { from: 'sdk', to: 'esign-view', label: '화면 연동', labelDx: 40 },
      { from: 'campaign-detail', to: 'bulk-api', label: '전체 선택 + 검색 조건', labelDy: -14 },
      { from: 'campaign-send', to: 'sdk', label: '문서 작성', labelDx: -20, labelDy: 22 },
    ],
    flows: [
      {
        id: 'approval',
        title: '일괄 결재',
        oneLine: '선택한 결재 대상을 브라우저에 보관했다가 임베딩된 전자서명 화면에 전달',
        summary:
          '결재 목록에서 고른 결재 대상을 브라우저에 보관했다가, 임베딩된 전자서명 화면에 전달해 기존 일괄 결재 기능으로 결재합니다.',
        path: [
          ['approval-list', 'idb'],
          ['approval-list', 'bulk-page'],
          ['bulk-page', 'sdk'],
          ['idb', 'sdk'],
          ['sdk', 'esign-view'],
        ],
        steps: [
          { node: 'approval-list', text: '페이지를 이동해도 선택 상태를 유지하며 결재할 서약서 확정' },
          { node: 'idb', text: '기존 브라우저 저장 방식을 활용해 확정한 결재 대상 목록 보관' },
          { node: 'sdk', text: '저장된 결재 대상 목록을 임베딩된 전자서명 화면에 전달' },
          { node: 'esign-view', text: '전달받은 목록을 바탕으로 기존 일괄 결재 기능 실행' },
        ],
      },
      {
        id: 'bulk',
        title: '전체 선택 일괄 처리',
        oneLine: '전체 선택 여부와 검색 조건을 보내 서버에서 처리 대상을 구성',
        summary:
          '캠페인 대상자를 모두 선택하면 문서 ID 대신 전체 선택 여부와 현재 검색 조건을 보내고, 서버가 그 조건으로 처리 대상을 다시 조회해 재요청·삭제합니다.',
        path: [['campaign-detail', 'bulk-api']],
        steps: [
          {
            node: 'campaign-detail',
            text: '전체 선택 여부와 검색 조건 전송',
            detail: ['대상자를 선택하는 동안 일부 검색 필터를 비활성화합니다.'],
          },
          { node: 'bulk-api', text: '검색 조건으로 처리 대상을 다시 조회해 재요청·삭제' },
        ],
      },
      {
        id: 'campaign',
        title: '캠페인 전송',
        showAllSteps: true,
        oneLine: '기존 SDK 연동 구조로 문서를 작성하고 예약·즉시 전송',
        summary: '기존 SDK 연동 구조로 전자서명 문서 작성 화면을 임베딩하고, 작성이 끝나면 예약 또는 즉시 전송합니다.',
        path: [
          ['campaign-send', 'sdk'],
          ['sdk', 'esign-view'],
        ],
        steps: [
          { node: 'campaign-send', text: '캠페인 정보와 대상자 입력 (엑셀 업로드)' },
          { node: 'sdk', text: '기존 SDK 연동 구조로 문서 작성 화면 임베딩' },
          { node: 'esign-view', text: '서약서 문서 작성' },
          { node: 'campaign-send', text: '예약·즉시 전송과 완료 안내' },
        ],
      },
    ],
  },

  // 04 주요 개발 내용. ownership 은 내부 검증용 (화면 미표시).
  contributions: [
    {
      id: 'approval',
      title: '일괄 결재',
      system: 'Front-end · SDK 연동',
      summary: '여러 건의 서약서를 한 번에 결재할 수 있도록 결재 대상 선택부터 임베딩 결재 화면 연결까지 구현했습니다.',
      units: [
        {
          title: '선택 상태 유지',
          body: '결재 대상을 화면에서 20건씩 나누어 보여 주고, 전체 선택을 기본으로 해제한 서약서만 Set에 기록해 페이지를 이동해도 선택 상태와 선택 건수가 유지되도록 했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '결재 대상 전달',
          body: '기존 전자서명 서비스의 IndexedDB 저장 방식을 활용해 확정한 결재 대상 목록을 화면 간에 전달하고, 임베딩된 결재 화면에서도 이 목록을 사용할 수 있도록 SDK 연동 처리를 추가했습니다.',
          ownership: ['existing', 'extended'],
          evidence: 'git',
        },
        {
          title: '일괄 결재 화면',
          body: '전자서명 SDK 일괄 결재 모드를 띄우는 전용 화면을 만들고, 결재가 끝나면 서약서 조회 화면으로 이동하도록 했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
      note: '일괄 결재 API는 다른 담당자가 구현했습니다.',
    },
    {
      id: 'bulk',
      title: '캠페인 대상자 일괄 재요청·삭제',
      system: 'Front-end · Back-end',
      summary: '캠페인 대상자를 페이지별로 또는 검색 결과 전체로 골라 서약서를 다시 요청하거나 삭제할 수 있게 했습니다.',
      units: [
        {
          title: '선택과 일괄 처리 화면',
          body: '대상자 목록의 페이지별 체크박스와 모두 선택, 일괄 재요청·삭제 팝업과 처리 결과 건수 안내를 구현했습니다. 페이지 단위로 선택하는 화면이라 일괄 결재의 선택 방식과는 별개 기능입니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '서버 대상 조회 분기',
          body: '기존 일괄 처리 API에 전체 선택 분기와 검색 조건 기반 대상 조회 쿼리를 추가하고, 재요청·삭제에 중복된 대상 조회를 하나로 정리했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'query',
      title: '검색·목록 쿼리',
      system: 'Back-end',
      summary: '서약 현황과 템플릿 목록의 검색·건수 쿼리를 정리했습니다.',
      units: [
        {
          title: '다중 검색 조건',
          body: '서약 현황 화면에 이름·사번·부서·직책, 재직 여부, 상태, 서약·결재 기간 등 여러 검색 조건을 추가했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '목록·건수 조건 일치',
          body: '서약 현황 화면에서 목록 쿼리와 건수 쿼리의 검색 조건이 달라 검색 결과와 페이지 수가 다르게 나오던 문제를, 두 쿼리가 같은 조건을 쓰도록 정리해 수정했습니다. 템플릿 목록의 건수 계산 오류도 고쳤습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'ui',
      title: 'SDK 임베딩 화면과 공통 UI 개선',
      system: 'Front-end',
      summary: '기존 SDK 연동 구조 위에서 캠페인 작성·전송 화면을 만들고, 여러 화면에서 반복되던 UI 처리를 공통으로 정리했습니다.',
      units: [
        {
          title: '캠페인 문서 작성·전송 화면',
          body: '기존 SDK 연동 구조를 활용해 협력사 캠페인용 임베딩 화면을 새로 만들고, 예약·즉시 전송과 완료 팝업, 엑셀 대상자 업로드(성공·실패 건수 안내)를 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '공통 UI',
          body: '여러 화면에 반복되던 로딩 처리를 공통 유틸로 모아 약 13개 화면에 적용하고, 직위 선택 팝업을 여러 화면에서 재사용할 수 있게 바꿨습니다. 캠페인 등록 화면에서는 이벤트 처리와 요청 생성 로직을 View·Service로 나눠 정리했습니다.',
          ownership: ['new', 'extended'],
          evidence: 'git',
        },
      ],
    },
  ],

  // 05 기술적 문제 해결. 서버 페이징 시도·철회와 SDK 쪽 메시지 순서는 쓰지 않는다.
  cases: [
    {
      title: '페이지 이동 시 일괄 결재 선택 상태 유지',
      labels: { requirement: '문제', implementation: '해결' },
      requirement:
        '일괄 결재 화면은 모든 서약서가 선택된 상태로 시작하고, 담당자가 결재에서 제외할 문서만 선택 해제하는 방식이었습니다. 초기 구현에서는 화면에 표시된 체크박스를 기준으로 결재 대상을 계산했기 때문에, 페이지를 이동하면 다른 페이지에서 해제한 문서의 선택 상태를 유지하기 어려웠습니다.',
      implementation: [
        { label: '상태 분리', text: '결재 대상 목록을 받아 클라이언트에서 페이지 단위로 표시하고, 선택 상태는 화면의 체크박스와 분리해 관리했습니다.' },
        {
          label: '선택 해제 기록',
          text: '기본 선택 상태를 전체 선택으로 두고, 선택 해제한 문서 ID만 Set에 기록했습니다. 체크박스 표시, 선택 건수, 결재 버튼 활성화 여부, 최종 결재 대상을 모두 이 상태를 기준으로 계산했습니다.',
        },
        {
          label: '결재 대상 보관',
          text: '확정한 결재 대상은 기존 전자서명 서비스의 IndexedDB 저장 방식을 활용해 보관하고, 다음 화면에서는 식별값으로 해당 목록을 참조하도록 연결했습니다.',
        },
        {
          label: '임베딩 화면 연동',
          text: '임베딩된 전자서명 화면에서도 결재 대상을 사용할 수 있도록, 결재 화면의 요청을 받아 저장된 목록을 전달하는 SDK 측 처리를 추가했습니다.',
        },
      ],
      conclusion:
        '페이지를 이동해도 문서별 선택 상태와 선택 건수가 유지되도록 구현했습니다. 선택된 문서가 없으면 결재 버튼이 비활성화되며, 해당 기능은 2025년 9월 운영 반영 빌드에 포함되었습니다.',
      evidence: 'git',
    },
    {
      title: '검색 조건을 반영한 전체 선택 일괄 처리',
      labels: { requirement: '문제', existing: '기존 방식', implementation: '해결' },
      requirement:
        '캠페인 대상자 목록에서 일괄 재요청·삭제를 실행할 때, 현재 페이지에 표시된 대상뿐 아니라 검색 조건에 해당하는 전체 대상을 처리해야 했습니다.',
      existing:
        '기존 일괄 처리 기능은 선택한 문서 ID 목록을 받아 처리하는 방식이라, 화면에 표시되지 않은 검색 결과까지 처리하기 어려웠습니다.',
      implementation: [
        { label: '요청 데이터', text: '전체 선택 여부와 현재 검색 조건을 함께 서버에 전달하도록 화면과 요청 데이터를 수정했습니다.' },
        {
          label: '서버 대상 조회',
          text: '서버에서는 전달받은 검색 조건으로 목록 화면과 같은 조회 과정을 거쳐 처리 대상을 다시 구성하도록 기존 일괄 처리 기능을 확장했습니다.',
        },
        { label: '검색 필터', text: '대상자 선택 중 일부 검색 필터를 비활성화해 선택 조건이 변경되는 상황을 줄였습니다.' },
      ],
      conclusion:
        '현재 페이지에 보이지 않는 검색 결과도 일괄 처리 대상으로 지정할 수 있도록 구현했습니다. 연결 과정에서 화면과 서버의 요청 항목 이름·검색 조건 형식이 맞지 않던 부분을 찾아 수정했습니다.',
      evidence: 'git',
    },
  ],

  validation: {
    groups: [
      {
        title: '테스트 및 수정',
        paragraphs: [
          { text: '자체 통합 테스트 기간에 담당 기능의 팝업, 검색 필터, 페이지 수, 전체 선택 처리 오류를 수정했습니다.', evidence: 'git' },
        ],
      },
      {
        title: '운영 반영',
        paragraphs: [{ text: '2025년 9월 운영 반영 빌드에 담당 기능이 포함되었습니다.', evidence: 'doc' }],
      },
    ],
  },

  retrospective: [
    {
      text: '평소 프론트엔드에 관심이 많아서 TypeScript를 실무에서 써보고 싶다는 이야기를 종종 했었는데, 실제로 TypeScript 기반 프로젝트에 참여할 기회가 생겼습니다. 제가 관심을 가지고 있던 기술을 업무에서 직접 써볼 수 있었다는 점이 좋았고, 그래서 더 기억에 남는 프로젝트입니다.',
      evidence: 'self',
    },
    {
      text: '막상 TypeScript를 사용해 보니 타입이나 데이터 구조를 잘 정의해 두면 이후 개발할 때 어떤 값이 필요한지 알려주고, 잘못된 부분도 미리 확인할 수 있다는 점이 좋았습니다. JavaScript로 개발할 때와는 다른 편리함을 느꼈습니다.',
      evidence: 'self',
    },
  ],
};
