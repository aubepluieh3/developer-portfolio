import type { Project } from '../types';

// 공개 원칙: 내부 프로젝트명, 고객사·조직 식별 정보, 지원·이슈 번호, 커밋 ID, API 주소, DB 테이블·필드명,
// 저장소 이름·메시지 형식·식별값 이름, 인증·토큰 처리, 동료 계정명은 쓰지 않는다.
// SDK 쪽 목록 전달 처리는 다른 개발자의 유사 선행 작업과 관계가 확인되지 않아 "확장·추가"까지만 쓰고 "설계"는 쓰지 않는다.
// 전체 선택 일괄 처리는 실행 시점에 검색 조건으로 다시 조회한다. 선택 순간의 대상 집합을 고정했다고 쓰지 않는다.
// 근거 상세는 저장소 밖 portfolio-private 의 근거 매트릭스에 있다.

export const project: Project = {
  slug: 'security-pledge',
  title: '보안서약서 관리 시스템 Front-end 개발',
  listing: {
    description:
      '보안서약서 관리 시스템에서 일괄 결재의 선택 상태를 관리하고, 검색 결과 전체를 대상으로 재요청·삭제할 수 있도록 화면과 서버 기능을 개발했습니다.',
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
      text: '결재 목록에서 페이지를 이동해도 선택 상태를 유지하고, 확정한 결재 대상을 임베딩된 전자서명 화면에 전달',
      evidence: 'git',
    },
    {
      label: '검색 조건 기반 일괄 처리',
      text: '검색 결과 전체를 재요청·삭제할 수 있도록 화면의 선택 조건과 서버 조회 기능을 연동',
      evidence: 'git',
    },
    {
      label: 'SDK 연동 및 공통 UI 개선',
      text: '전자서명 SDK를 활용한 캠페인 작성·전송 화면과 공통 로딩 UI 구현',
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
        after: '결재 대상 선택 상태를 유지하고, 확정한 대상을 임베딩된 전자서명 화면에 전달하도록 구현했습니다.',
        evidence: 'git',
      },
      {
        topic: '대상자 일괄 처리',
        before: '검색된 캠페인 대상자 전체에 재요청·삭제',
        after: '검색 조건을 서버에 전달해 현재 페이지에 표시되지 않은 대상까지 처리할 수 있도록 했습니다.',
        evidence: 'git',
      },
      {
        topic: '캠페인 전송',
        before: '협력사 캠페인 문서 작성·전송',
        after: 'SDK를 활용한 문서 작성 화면과 전송 관련 팝업을 구현했습니다.',
        evidence: 'git',
      },
    ],
    approach: [
      {
        text: '기업용 보안서약서 관리 시스템은 캠페인 문서 발송부터 서약·결재 현황 관리까지 지원하는 신규 업무 시스템입니다.',
        evidence: 'git',
      },
      {
        text: '저는 개발 후반부에 참여해 일괄 결재와 캠페인 관리 화면을 개발했습니다. 검색 결과 전체를 처리하기 위한 서버 기능도 일부 확장했습니다.',
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
      { label: '화면', text: '결재 대상 선택, 캠페인 관리, 문서 작성·전송 화면을 제공합니다.' },
      { label: '브라우저 저장소', text: '확정한 결재 대상을 보관해 다음 화면에서 사용할 수 있도록 합니다.' },
      { label: '전자서명 SDK', text: '기존 전자서명 기능을 화면에 연결하고 결재 대상 정보를 전달합니다.' },
      { label: '서버', text: '결재 대상 조회와 검색 조건에 따른 일괄 재요청·삭제를 처리합니다.' },
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
          {
            ownership: 'extended',
            text: '모든 서약서를 선택한 상태에서 시작하고, 선택 해제한 문서 ID만 Set으로 관리했습니다. 페이지를 이동해도 선택 상태와 선택 건수가 유지되도록 했습니다.',
          },
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
        mine: [{ ownership: 'new', text: '전용 화면을 구현하고, 결재가 끝나면 서약서 조회 화면으로 이동하도록 했습니다.' }],
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
          {
            ownership: 'extended',
            text: '캠페인 대상자 목록에 개별 선택과 전체 선택 기능을 추가했습니다. 선택한 대상을 재요청·삭제하는 팝업을 구현하고, 전체 선택 시 검색 조건을 서버에 전달하도록 했습니다.',
          },
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
        mine: [{ ownership: 'new', text: 'SDK를 활용한 문서 작성 화면과 예약·즉시 전송 팝업을 구현했습니다.' }],
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
        mine: [{ ownership: 'existing', text: '기존 IndexedDB 저장 기능을 활용해 확정한 결재 대상 목록을 보관했습니다.' }],
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
        mine: [
          {
            ownership: 'extended',
            text: '임베딩된 결재 화면의 요청에 따라 저장된 결재 대상 목록을 전달하도록 기존 SDK 연동 기능을 확장했습니다.',
          },
        ],
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
        role: '전달받은 결재 대상 목록을 이용해 기존 일괄 결재 기능을 실행하는 전자서명 화면입니다.',
        mine: [{ ownership: 'extended', text: '전달받은 목록을 화면 쪽에 보관해 기존 일괄 결재 흐름이 사용하도록 하는 처리를 추가했습니다.' }],
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
          {
            ownership: 'extended',
            text: '기존 API에 전체 선택 분기와 검색 조건에 따른 대상 조회를 추가했습니다. 일괄 재요청·삭제에서 중복된 대상 조회 처리도 정리했습니다.',
          },
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
        oneLine: '결재 목록에서 확정한 대상을 저장하고, 임베딩된 전자서명 화면에 전달',
        summary:
          '결재 대상은 화면을 이동하는 동안 브라우저 저장소에 보관합니다. 이후 임베딩된 전자서명 화면에서 해당 목록을 불러와 기존 일괄 결재 기능을 실행합니다.',
        path: [
          ['approval-list', 'idb'],
          ['approval-list', 'bulk-page'],
          ['bulk-page', 'sdk'],
          ['idb', 'sdk'],
          ['sdk', 'esign-view'],
        ],
        steps: [
          { node: 'approval-list', text: '페이지를 이동해도 선택 상태를 유지하며 결재할 문서 확정' },
          { node: 'idb', text: '확정한 결재 대상 목록 보관' },
          { node: 'sdk', text: '저장된 결재 대상 목록을 임베딩된 전자서명 화면에 전달' },
          { node: 'esign-view', text: '기존 일괄 결재 기능 실행' },
        ],
      },
      {
        id: 'bulk',
        title: '전체 선택 일괄 처리',
        oneLine: '전체 선택 여부와 검색 조건을 전달해 서버에서 처리 대상을 조회',
        summary:
          '캠페인 대상자를 전체 선택하면 현재 검색 조건을 서버에 전달합니다. 서버는 해당 조건으로 대상자를 조회한 뒤 일괄 재요청·삭제를 처리합니다.',
        path: [['campaign-detail', 'bulk-api']],
        steps: [
          { node: 'campaign-detail', text: '전체 선택 여부와 검색 조건 전송' },
          { node: 'bulk-api', text: '검색 조건에 맞는 처리 대상 조회 및 재요청·삭제' },
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
          { node: 'campaign-send', text: '캠페인 정보와 대상자 입력' },
          { node: 'sdk', text: '문서 작성 화면 임베딩' },
          { node: 'esign-view', text: '서약서 문서 작성' },
          { node: 'campaign-send', text: '예약·즉시 전송 및 완료 안내' },
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
      summary: '여러 서약서를 한 번에 결재할 수 있도록 대상 선택과 전자서명 화면 연결 기능을 구현했습니다.',
      units: [
        {
          title: '선택 상태 유지',
          body: '결재 대상을 20건씩 나누어 표시했습니다. 전체 선택을 기본으로 두고, 선택 해제한 문서 ID만 Set에 기록해 페이지를 이동해도 선택 상태가 유지되도록 했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '결재 대상 저장',
          body: '기존 IndexedDB 기능을 활용해 확정한 결재 대상 목록을 보관했습니다.',
          ownership: ['existing'],
          evidence: 'git',
        },
        {
          title: '전자서명 화면 연동',
          body: '임베딩된 결재 화면에서 저장된 목록을 사용할 수 있도록 SDK 연동 기능을 확장했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '일괄 결재 화면',
          body: '전자서명 SDK의 일괄 결재 기능을 표시하는 전용 화면을 구현하고, 결재 완료 후 서약서 조회 화면으로 이동하도록 했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'bulk',
      title: '캠페인 대상자 일괄 재요청·삭제',
      system: 'Front-end · Back-end',
      summary: '캠페인 대상자를 개별 선택하거나 검색 결과 전체를 선택해 재요청·삭제할 수 있도록 구현했습니다.',
      units: [
        {
          title: '일괄 처리 화면',
          body: '대상자 선택과 전체 선택 기능, 일괄 재요청·삭제 팝업 및 처리 결과 안내를 구현했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '서버 대상 조회',
          body: '전체 선택 시 검색 조건으로 처리 대상을 다시 조회하도록 기존 API를 확장했습니다. 재요청·삭제에서 중복된 대상 조회 처리도 정리했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'query',
      title: '검색·목록 쿼리',
      system: 'Back-end',
      summary: '서약 현황과 템플릿 목록의 검색 조건과 건수 조회를 개선했습니다.',
      units: [
        {
          title: '검색 조건 확장',
          body: '서약 현황 조회에 이름·부서·상태·기간 등의 검색 조건을 추가했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '조회 결과 불일치 수정',
          body: '목록과 전체 건수 조회의 검색 조건을 일치시켜, 검색 결과와 페이지 수가 다르게 표시되는 문제를 수정했습니다. 템플릿 목록의 건수 계산 오류도 수정했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'ui',
      title: 'SDK 임베딩 화면과 공통 UI 개선',
      system: 'Front-end',
      summary: '전자서명 SDK를 활용해 캠페인 작성·전송 화면을 구현하고, 여러 화면에서 중복되던 UI 처리를 공통화했습니다.',
      units: [
        {
          title: '캠페인 작성·전송 화면',
          body: 'SDK를 활용한 문서 작성 화면과 예약·즉시 전송 팝업을 구현했습니다. 엑셀 대상자 업로드와 처리 결과 안내 기능도 추가했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '공통 UI',
          body: '여러 화면에서 반복되던 로딩 처리를 공통 유틸로 정리해 약 13개 화면에 적용했습니다. 직위 선택 팝업도 여러 화면에서 재사용하도록 수정했습니다.',
          ownership: ['new', 'extended'],
          evidence: 'git',
        },
        {
          title: '코드 구조 정리',
          body: '캠페인 등록 화면의 이벤트 처리와 서버 요청 생성 로직을 View·Service로 분리했습니다.',
          ownership: ['extended'],
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
        '일괄 결재에서는 모든 서약서가 기본으로 선택되고, 담당자가 결재에서 제외할 문서만 선택 해제합니다. 하지만 목록을 페이지별로 표시하다 보니, 화면에 보이는 체크박스만으로는 다른 페이지에서 해제한 문서의 선택 상태를 관리하기 어려웠습니다.',
      implementation: [
        {
          label: '선택 상태 관리',
          text: '페이지별 체크박스와 별도로 선택 상태를 관리했습니다. 전체 선택을 기본 상태로 두고 해제한 문서 ID만 Set에 기록해, 페이지별 체크박스 상태를 하나의 기준으로 관리했습니다.',
        },
        {
          label: '상태를 기준으로 화면 계산',
          text: '체크박스 표시와 선택 건수, 결재 버튼 활성화 여부를 Set의 상태를 기준으로 계산했습니다.',
        },
        {
          label: '결재 화면 연결',
          text: '확정한 결재 대상은 기존 IndexedDB 기능으로 보관하고, 임베딩된 전자서명 화면에 전달하도록 연결했습니다.',
        },
      ],
      conclusion:
        '페이지를 이동해도 문서별 선택 상태와 선택 건수가 유지되도록 구현했습니다. 결재 대상으로 선택된 문서가 없으면 결재 버튼이 비활성화되도록 했습니다.',
      evidence: 'git',
    },
    {
      title: '검색 조건을 반영한 전체 선택 일괄 처리',
      labels: { requirement: '문제', existing: '기존 방식', implementation: '해결' },
      requirement:
        '캠페인 대상자를 재요청하거나 삭제할 때, 현재 페이지에 보이는 대상뿐 아니라 검색 조건에 해당하는 전체 대상을 처리해야 했습니다.',
      existing:
        '기존 API는 화면에서 선택한 문서 ID 목록을 받아 처리했습니다. 따라서 현재 페이지에 표시되지 않은 검색 결과 전체를 한 번에 처리하기 어려웠습니다.',
      implementation: [
        {
          label: '요청 방식 확장',
          text: '전체 선택 여부와 검색 조건을 서버에 전달하도록 화면의 요청 데이터를 수정했습니다. 개별 선택은 기존처럼 선택한 문서 ID를 보냅니다.',
        },
        { label: '대상 조회 확장', text: '서버에서 검색 조건에 맞는 전체 대상을 다시 조회하도록 기존 일괄 처리 API를 확장했습니다.' },
        { label: '선택 조건 유지', text: '대상을 선택하는 동안 일부 검색 필터를 비활성화해 검색 조건이 바뀌는 상황을 줄였습니다.' },
      ],
      conclusion: '현재 페이지에 표시되지 않은 검색 결과도 일괄 재요청·삭제 대상으로 처리할 수 있도록 구현했습니다.',
      evidence: 'git',
    },
  ],

  validation: {
    groups: [
      {
        title: '테스트 및 수정',
        paragraphs: [
          {
            text: '자체 통합 테스트 기간에 일괄 결재와 캠페인 관리 기능에서 확인된 팝업 동작, 검색 조건, 페이지 수 표시, 전체 선택 처리 오류를 수정했습니다.',
            evidence: 'git',
          },
        ],
      },
      {
        title: '운영 반영',
        paragraphs: [{ text: '2025년 9월 담당 기능이 운영에 반영되었습니다.', evidence: 'doc' }],
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
