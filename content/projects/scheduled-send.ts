import type { Project } from '../types';

// 공개 원칙: 요건 번호, 테이블·클래스·API 경로, 저장소 제품명, 설정 수치(실행 주기·재시도 횟수·최소 예약 간격·멈춤 판단 시간),
// 운영 코드의 약점은 쓰지 않는다. 운영 반영 예정(아직 반영 전)이라 운영 성과는 쓰지 않는다.
// 1차 구현(2026.02–05, 별도 브랜치)은 다루지 않는다. 현재 구현(2026.09–)만 쓴다.
// "보장·완전 방지·완벽 판정" 같은 표현은 쓰지 않는다 (다중 서버 중복 실행·부분 저장 실패는 대응 로직까지만).
// 근거 상세는 저장소 밖 portfolio-private/evidence-matrix-scheduled-send.md 에 있다.

export const project: Project = {
  slug: 'scheduled-send',
  title: '전자문서 예약 전송 기능 개발',
  listing: {
    description:
      '기존 일괄 작성과 달리, 개별 문서의 최초 전송뿐 아니라 중간 처리 단계에서도 전송 시간을 예약할 수 있도록 기능을 개발했습니다.',
    stack: ['풀스택', 'Spring', 'Quartz', 'JPA', 'JavaScript'],
    year: '2026',
    status: '개발·안정화 중',
  },
  meta: 'B2B 전자문서 SaaS · 2026.09 – 현재 · 운영 반영 예정',
  summary:
    '여러 담당자를 거쳐 전달되는 전자문서에서, 최초 작성자뿐 아니라 중간 단계 담당자도 다음 수신자에게 보낼 시간을 예약할 수 있도록 개발했습니다. 예약 실행 기능과 함께 기존 문서 편집·승인 흐름에 맞춘 상태 관리 로직을 구현했습니다.',
  role: '요구사항·기존 시스템 분석 · 기술 설계 · 풀스택 개발 · 검증',
  tags: ['풀스택 개발', '상태 관리', '데이터 정합성'],
  highlights: [
    {
      label: '문서와 예약 작업의 정합성 처리',
      text: '문서 저장소와 예약 작업 DB에 나뉜 예약 정보에 대해 저장 순서, 변경·취소 중 부분 저장 실패 시 복원, 실행 전 유효성 검증 로직 구현',
      evidence: 'git',
    },
    {
      label: '기존 문서 흐름과 예약 실행의 충돌 방지',
      text: '문서 편집·승인 대기 중에는 예약을 일시 중지하고, 처리 결과에 따라 재개하거나 취소하는 상태 관리 구현',
      evidence: 'git',
    },
    {
      label: '병렬 문서의 수신자별 예약 처리',
      text: '대표 처리 지점만 참조하던 로직을 예약 작업 ID 기준으로 바꿔, 다른 수신자의 예약을 잘못 참조해 취소하거나 전송하지 못하던 문제 수정',
      evidence: 'git',
    },
  ],

  overview: {
    rows: [
      ['기간', '2026.09 – 현재'],
      ['진행 결과', '개발·안정화 중 · 운영 반영 예정'],
      ['담당 역할', '요구사항·기존 시스템 분석, 기술 설계, Back-end·스케줄러·API 개발, PC·모바일 화면 로직 개발, 검증'],
    ],
    stacks: [
      { system: '서버', items: ['Java', 'Spring MVC', 'JPA', 'Quartz'] },
      { system: '화면', items: ['JavaScript', 'jQuery'] },
    ],
    collaboration: [],
  },

  // 기존 일괄 작성 예약(코드 확인): 일괄 작업 단위로 예약 시각 변경·전송 중단이 이미 있었다. 예약 시각에 문서를 생성해 전송한다.
  background: {
    labels: { before: '기존 일괄 작성 예약', after: '신규 단건 예약' },
    comparisons: [
      {
        topic: '예약 대상',
        before: '여러 문서를 생성·전송하는 일괄 작업',
        after: '개별 문서의 다음 처리 단계',
        evidence: 'git',
      },
      {
        topic: '예약 설정 시점',
        before: '문서 생성 전, 최초 전송 예약',
        after: '최초 작성 및 중간 수신 단계',
        evidence: 'git',
      },
      {
        topic: '예약 관리',
        before: '일괄 작업 단위로 예약 시간 변경·전송 중단',
        after: '개별 예약의 시간 변경·수신자 수정·취소',
        evidence: 'git',
      },
      {
        topic: '문서 처리 연동',
        before: '예약 시각에 문서를 생성하고 최초 전송',
        after: '이미 존재하는 문서의 편집·승인·취소 및 병렬 수신자 처리와 연동',
        evidence: 'git',
      },
    ],
    approach: [
      {
        text: '전자문서 서비스에서는 작성자가 문서를 전송하면 정해진 처리 순서에 따라 다음 담당자에게 전달됩니다. 문서를 받은 담당자도 서명이나 검토를 마친 뒤 다음 담당자에게 문서를 전달할 수 있습니다.',
        evidence: 'git',
      },
      {
        text: '기존에는 여러 문서를 한 번에 생성하는 일괄 작성 기능에서 예약 전송을 지원했지만, 개별 문서의 처리 과정에서는 전송 시각을 지정할 수 없었습니다. 특히 중간 단계의 담당자는 자신의 작업을 마친 뒤 원하는 시각에 문서를 전달하려면 그 시간에 직접 전송해야 했습니다.',
        evidence: 'git',
      },
      {
        text: '이번 프로젝트에서는 개별 문서의 최초 전송뿐 아니라 중간 처리 단계에서도 예약을 설정할 수 있도록 기능을 확장했습니다. 이를 위해 예약 작업을 별도로 관리하고, 문서 편집·승인·취소 등 기존 처리 과정에 따라 예약을 일시 중지·재개하거나 취소하는 로직을 구현했습니다.',
        evidence: 'git',
      },
    ],
  },

  architecture: {
    lanes: [
      { id: 'web', label: '화면 (PC·모바일)', x: 2, width: 240 },
      { id: 'server', label: '서비스 서버', x: 252, width: 240 },
      { id: 'store', label: '저장소', x: 502, width: 240 },
      { id: 'scheduler', label: '스케줄러 (Quartz)', x: 752, width: 246 },
    ],
    roles: [
      { label: '화면', text: '전송 시간 지정, 예약 수신자 설정, 예약 변경·취소를 처리합니다.' },
      { label: '서비스 서버', text: '예약을 등록·변경·취소하고, 문서 편집·승인 흐름에 맞춰 예약 상태를 바꿉니다.' },
      { label: '저장소', text: '문서 저장소에는 문서 단계별 예약 정보를, 예약 작업 DB에는 실행 상태와 전송 내용을 저장합니다.' },
      {
        label: '스케줄러',
        text: '예약마다 작업을 따로 등록하지 않고, 주기적으로 예약 작업 DB를 조회해 전송 시간이 된 예약을 실행합니다.',
      },
    ],
    nodes: [
      {
        id: 'reserve-ui',
        name: '예약 설정 화면',
        summary: '시간·수신자 지정',
        lane: 'web',
        kind: 'component',
        x: 122,
        y: 110,
        ownership: ['new'],
        role: '전송 시간과 예약 수신자를 지정하고, 예약을 변경·취소하는 화면입니다.',
        mine: [{ ownership: 'new', text: '시간 선택·입력값 확인, 수신자 설정, 변경·취소 로직을 PC·모바일에 구현했습니다.' }],
        ref: 'screen',
        evidence: 'git',
      },
      {
        id: 'doc-ui',
        name: '문서 화면·문서함',
        summary: '편집·승인 요청',
        lane: 'web',
        kind: 'component',
        x: 122,
        y: 300,
        ownership: ['extended'],
        role: '문서를 편집·서명하고 목록을 보는 기존 화면입니다.',
        mine: [{ ownership: 'extended', text: '예약된 문서 표시와, 편집 시작·종료 시 예약 일시 중지·재개 요청을 추가했습니다.' }],
        ref: 'screen',
        evidence: 'git',
      },
      {
        id: 'api',
        name: '예약 관리 API',
        summary: '등록·변경·취소',
        lane: 'server',
        kind: 'component',
        x: 372,
        y: 110,
        ownership: ['new'],
        role: '예약 등록·변경·취소와 예약 수신자 조회·수정을 처리합니다.',
        mine: [{ ownership: 'new', text: '예약 관리 API 7개를 구현했습니다.' }],
        ref: 'api',
        evidence: 'git',
      },
      {
        id: 'doc-logic',
        name: '문서 처리 로직',
        summary: '예약 연결',
        lane: 'server',
        kind: 'component',
        x: 372,
        y: 300,
        ownership: ['extended'],
        role: '문서 저장·편집·승인·종료를 처리하는 기존 로직입니다.',
        mine: [
          { ownership: 'extended', text: '편집·승인 대기·종료 시점에 예약을 멈추거나 재개·취소하도록 연결했습니다.' },
          { ownership: 'new', text: '예약 실행 작업이 호출하는 예약 전송 처리를 추가해, 기존 문서 전송 처리를 그대로 거치도록 했습니다.' },
        ],
        ref: 'flow',
        evidence: 'git',
      },
      {
        id: 'job-db',
        name: '예약 작업 DB',
        summary: '실행 상태·전송 내용',
        lane: 'store',
        kind: 'component',
        x: 622,
        y: 160,
        ownership: ['new'],
        role: '예약의 실행 상태, 재시도 횟수, 예약한 사람, 전송할 내용을 저장합니다.',
        mine: [{ ownership: 'new', text: '예약 작업 모델과 상태 값을 설계했습니다.' }],
        ref: 'api',
        evidence: 'git',
      },
      {
        id: 'doc-store',
        name: '문서 저장소',
        summary: '단계별 예약 정보',
        lane: 'store',
        kind: 'component',
        x: 622,
        y: 395,
        ownership: ['extended'],
        role: '문서와 단계 정보를 저장하는 기존 저장소입니다.',
        mine: [{ ownership: 'extended', text: '문서의 각 단계에 예약 정보를 담도록 확장했습니다.' }],
        ref: 'api',
        evidence: 'git',
      },
      {
        id: 'quartz',
        name: 'Quartz 주기 실행',
        summary: '기존 스케줄러',
        lane: 'scheduler',
        kind: 'component',
        x: 875,
        y: 70,
        ownership: ['existing'],
        role: '여러 배치 작업을 주기적으로 실행하는 기존 Quartz 스케줄러입니다.',
        mine: [],
        evidence: 'git',
      },
      {
        id: 'job',
        name: '예약 실행 작업',
        summary: '선점·검증·전송 요청',
        lane: 'scheduler',
        kind: 'component',
        x: 875,
        y: 205,
        ownership: ['new'],
        role: '전송 시간이 된 예약을 찾아 전송하는 작업입니다.',
        mine: [
          { ownership: 'new', text: '기존 Quartz에 예약 실행 작업을 등록하고, 선점·실행 전 유효성 검증·재시도·실패 처리를 구현했습니다. 전송은 기존 문서 처리 로직을 예약한 사람의 계정으로 호출합니다.' },
        ],
        ref: 'scheduler',
        evidence: 'git',
      },
      {
        id: 'mail',
        name: '실패 알림 메일',
        summary: '예약한 사람에게 안내',
        lane: 'scheduler',
        kind: 'component',
        x: 875,
        y: 395,
        ownership: ['extended'],
        role: '메일 발송은 기존 기능을 재사용합니다.',
        mine: [{ ownership: 'new', text: '재시도까지 실패한 예약 전송을 예약한 사람에게 알리는 실패 알림 처리와 메일 내용을 새로 구현했습니다.' }],
        ref: 'scheduler',
        evidence: 'git',
      },
    ],
    edges: [
      { from: 'reserve-ui', to: 'api', label: '예약 요청', labelDy: -14 },
      { from: 'api', to: 'doc-logic', label: '등록·변경·취소', labelDx: 54 },
      { from: 'doc-ui', to: 'doc-logic', label: '편집·승인', labelDy: -14 },
      { from: 'doc-logic', to: 'job-db', label: '상태 저장', labelDx: 20, labelDy: 14 },
      { from: 'doc-logic', to: 'doc-store', label: '예약 정보', labelDx: -22, labelDy: 16 },
      { from: 'quartz', to: 'job', label: '주기 호출', labelDx: 40 },
      { from: 'job', to: 'job-db', label: '작업 선점', labelDy: -34 },
      { from: 'job', to: 'doc-store', label: '문서·예약 유효성 확인', labelDx: 30, labelDy: 8 },
      { from: 'job', to: 'doc-logic', label: '검증 후 문서 전송 요청' },
      { from: 'job', to: 'mail', label: '최종 실패 알림', labelDx: 52 },
    ],
    flows: [
      {
        id: 'register',
        title: '예약 등록',
        oneLine: '전송 시간을 지정하면 예약 작업과 문서의 예약 정보를 함께 저장',
        summary: '사용자가 전송 시간과 수신자를 지정하면 예약 작업 DB와 문서 저장소에 예약 정보를 저장합니다.',
        path: [
          ['reserve-ui', 'api'],
          ['api', 'doc-logic'],
          ['doc-logic', 'job-db'],
          ['doc-logic', 'doc-store'],
        ],
        steps: [
          { node: 'reserve-ui', text: '전송 시간·수신자 지정과 입력값 확인' },
          { node: 'api', text: '예약 요청 검증' },
          { node: 'job-db', text: "예약 작업을 '예약됨' 상태로 먼저 저장" },
          { node: 'doc-store', text: '문서의 해당 단계에 예약 정보 기록', detail: ['저장 순서와 저장 실패 시 처리는 05.1에서 설명합니다.'] },
        ],
      },
      {
        id: 'pause',
        title: '일시 중지와 재개',
        oneLine: '문서 편집, 승인 대기, 문서 수정 중에는 예약을 멈추고, 처리 결과에 따라 재개 또는 취소',
        summary: '예약된 문서의 편집이 시작되거나, 승인이 필요한 요청이 생기거나, 문서 수정으로 이전 단계로 되돌아가면 예약을 일시 중지하고, 처리 결과에 따라 예약을 재개하거나 취소합니다.',
        path: [
          ['doc-ui', 'doc-logic'],
          ['doc-logic', 'job-db'],
        ],
        steps: [
          { node: 'doc-ui', text: '편집 시작, 승인이 필요한 요청 또는 문서 수정' },
          {
            node: 'doc-logic',
            text: '일시 중지 대상 예약 확인 및 상태 변경',
            detail: [
              '편집 시작: 편집하는 사람의 처리 단계에 걸린 예약',
              '삭제·반려·취소 승인 대기, 문서 수정: 현재 처리 단계의 예약 전체 (병렬이면 수신자별 예약 모두)',
            ],
          },
          { node: 'job-db', text: "'일시 중지' 상태로 바꿔 실행 대상에서 제외" },
          { node: 'doc-logic', text: '처리 결과에 따라 예약 재개 또는 취소', detail: ['예약을 재개하거나 취소하는 판단 기준은 05.2에서 설명합니다.'] },
        ],
      },
      {
        id: 'run',
        title: '예약 실행과 전송',
        oneLine: '주기적으로 전송 시간이 된 예약을 찾아, 실행 직전에 다시 확인한 뒤 전송',
        summary:
          '스케줄러가 주기적으로 예약 작업 DB를 조회해 전송 시간이 된 예약을 선점하고, 문서가 여전히 전송할 수 있는 상태인지 확인한 뒤 기존 문서 처리 로직에 전송을 요청합니다.',
        path: [
          ['quartz', 'job'],
          ['job', 'job-db'],
          ['job', 'doc-store'],
          ['job', 'doc-logic'],
          ['job', 'mail'],
        ],
        steps: [
          { node: 'quartz', text: '정해진 주기로 예약 실행 작업 호출' },
          { node: 'job-db', text: "전송 시간이 된 예약을 '전송 중'으로 바꿔 선점" },
          { node: 'doc-store', text: '문서와 해당 예약이 아직 유효한지 확인' },
          { node: 'doc-logic', text: '예약한 사람의 계정으로 기존 문서 전송 처리를 호출해 다음 수신자에게 전송' },
          {
            node: 'job',
            text: '결과 기록, 실패 시 재시도',
            detail: ['병렬 문서는 수신자마다 예약 작업이 따로 있어 각각 선점·실행합니다.'],
          },
          { node: 'mail', text: '재시도까지 실패하면 예약한 사람에게 안내' },
        ],
      },
    ],
  },

  // 04 주요 개발 내용 — 구현 범위만 간결하게. 설계 이유와 해결 과정은 05.
  contributions: [
    {
      id: 'api',
      title: '예약 작업 모델과 관리 API',
      system: 'Back-end',
      summary: '예약 실행에 필요한 정보를 문서와 분리해 관리하고, 예약을 다루는 API를 구현했습니다.',
      units: [
        {
          title: '예약 작업 모델',
          body: '예약 상태, 재시도 횟수, 예약한 사람, 전송할 내용을 별도의 예약 작업으로 저장하고, 문서에는 단계별 예약 정보만 남겼습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '예약 관리 API',
          body: '예약 등록, 전송 시간 변경, 예약 수신자 조회·수정, 예약 취소, 편집 종료 후 재개 등 7개 API를 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'scheduler',
      title: '예약 실행 작업',
      system: 'Back-end · 스케줄러',
      summary: '기존 Quartz 스케줄러에 예약 실행 작업을 등록하고, 실행 대상 선점부터 실패 처리까지 구현했습니다.',
      units: [
        {
          title: '실행 대상 선점',
          body: "전송 시간이 된 예약 중 상태를 '전송 중'으로 바꾸는 데 성공한 예약만 처리하도록 조건부로 상태를 변경했습니다.",
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '재시도와 실패 알림',
          body: '전송에 실패하면 정해진 횟수만큼 다시 시도하고, 끝내 실패하면 예약을 해제한 뒤 예약한 사람에게 메일로 알렸습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '실행 중 상태로 남은 작업 재처리',
          body: '실행 중 상태로 일정 시간 이상 남은 예약은 문서와 문서 수정 중 보관된 예약 정보를 다시 확인하도록 구현했습니다. 해당 예약 정보가 모두 사라졌으면 전송된 것으로 간주해 완료 처리하고, 남아 있으면 재시도 한도에 따라 재예약하거나 실패 처리합니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'flow',
      title: '기존 문서 처리 기능 연동',
      system: 'Back-end',
      summary: '문서 편집·승인·종료를 처리하는 기존 로직에 예약 상태 변경을 연결했습니다.',
      units: [
        {
          title: '기존 기능 연동',
          body: '문서 편집, 승인 대기, 문서 수정(진행 중인 문서를 이전 단계로 되돌려 다시 진행) 및 종료 과정에 예약 상태 변경 로직을 연결했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
        {
          title: '종료 시 정리',
          body: '문서가 종료·삭제·회수되면 남은 예약을 취소하도록 했습니다.',
          ownership: ['extended'],
          evidence: 'git',
        },
      ],
    },
    {
      id: 'screen',
      title: 'PC·모바일 예약 화면',
      system: 'Front-end',
      summary: '예약 설정과 변경·취소에 필요한 화면 로직을 PC와 모바일에 구현했습니다.',
      units: [
        {
          title: '예약 설정',
          body: '전송 시간 선택과 입력값 확인, 예약 수신자·참조자 설정, 예약 변경·취소 로직을 구현했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
        {
          title: '공통 규칙',
          body: '예약 시간 확인 규칙을 공통 모듈로 모아 여러 화면에서 같은 기준을 쓰도록 했습니다.',
          ownership: ['new'],
          evidence: 'git',
        },
      ],
      noteLabel: '협업',
      note: '예약 팝업의 HTML·SCSS 퍼블리싱은 다른 담당자가 진행했고, PC·모바일 화면의 JavaScript 기능 로직은 직접 구현했습니다.',
    },
  ],

  // 05 기술적 문제 해결 — 왜 이런 설계가 필요했는지와 실제로 해결한 문제
  cases: [
    {
      title: '문서 저장소와 예약 작업 DB 사이의 정합성',
      labels: { requirement: '문제', implementation: '해결' },
      requirement:
        '예약 정보는 문서 저장소(문서의 단계)와 예약 작업 DB 두 곳에 나뉘어 있고, 두 저장은 하나의 트랜잭션으로 묶이지 않습니다. 한쪽만 저장되면 예약했는데 전송되지 않거나, 취소했는데 전송되는 상황이 생길 수 있었습니다.',
      implementation: [
        {
          label: '저장 순서',
          text: '예약 작업을 먼저 저장하고 문서에 예약 정보를 기록했습니다. 문서에는 예약이 있는데 실행할 작업이 없는 상황을 피하기 위해서입니다.',
        },
        {
          label: '부분 저장 실패 시 복원',
          text: '전송 시간 변경과 예약 취소는 예약 작업을 먼저 바꾼 뒤 문서를 저장합니다. 문서 저장이 실패하면 예약 작업을 이전 상태로 되돌리도록 했습니다.',
        },
        {
          label: '실행 전 유효성 검증',
          text: '스케줄러는 전송 직전에 문서가 남아 있는지, 문서에 해당 예약이 있는지, 다음 수신자와 예약한 사람이 유효한지 확인합니다. 하나라도 맞지 않으면 전송하지 않고 예약을 취소합니다.',
        },
      ],
      conclusion: '두 저장을 하나로 묶을 수 없는 구조에서, 변경·취소 중 부분 저장 실패를 되돌리는 복원 로직과 전송 직전 유효성 검증을 구현했습니다.',
      evidence: 'git',
    },
    {
      title: '기존 문서 처리 흐름과 예약 실행의 충돌',
      labels: { requirement: '문제', implementation: '해결' },
      requirement:
        '예약된 문서도 편집하거나, 삭제·반려 승인을 요청하거나, 문서 수정으로 이전 단계로 되돌릴 수 있습니다. 그 사이에 전송 시간이 되면, 편집 중이거나 수정 중이거나 승인을 기다리는 문서가 다음 수신자에게 전송될 수 있었습니다.',
      implementation: [
        { label: '일시 중지 상태', text: "편집, 승인 대기, 문서 수정이 시작되면 예약을 '일시 중지'로 바꿔 스케줄러의 실행 대상에서 제외했습니다." },
        {
          label: '처리 결과에 따른 재개·취소',
          text: '편집이 끝나거나 승인 요청이 거절되거나 문서 수정이 취소되면 예약을 재개했습니다. 삭제·반려·취소가 승인되어 문서가 종료되거나, 수정한 문서가 저장·전송되거나, 편집 중 예약이 해제되었으면 재개하지 않고 취소했습니다.',
        },
        {
          label: '취소 처리 중 상태',
          text: "예약을 취소할 때는 먼저 '취소 처리 중'으로 바꿔 스케줄러와 다른 요청이 그 예약을 건드리지 않도록 한 뒤 문서를 갱신했습니다. 문서 갱신이 실패하면 이전 상태로 되돌립니다.",
        },
      ],
      states: {
        caption: '예약 상태 전환',
        states: [
          { id: 'paused', label: '일시 중지', x: 60, y: 70 },
          { id: 'reserved', label: '예약됨', x: 260, y: 70 },
          { id: 'running', label: '전송 중', x: 460, y: 70 },
          { id: 'success', label: '완료', x: 660, y: 70, kind: 'end' },
          { id: 'canceled', label: '취소됨', x: 60, y: 230, kind: 'end' },
          { id: 'canceling', label: '취소 처리 중', x: 260, y: 230, kind: 'transient' },
          { id: 'failed', label: '실패', x: 460, y: 230 },
        ],
        transitions: [
          { from: 'reserved', to: 'paused', label: '편집·승인 대기', curve: -16, labelDy: 6 },
          { from: 'paused', to: 'reserved', label: '편집 종료·요청 거절', curve: -16, labelDy: -22 },
          { from: 'reserved', to: 'running', label: '전송 시간 도래', labelDy: -12 },
          { from: 'running', to: 'reserved', label: '재시도', curve: -30, labelDy: 8 },
          { from: 'running', to: 'success', label: '전송 성공', labelDy: -12 },
          { from: 'running', to: 'failed', label: '재시도 모두 실패', labelDx: 58 },
          { from: 'reserved', to: 'canceling', label: '예약 취소', labelDx: -36 },
          { from: 'failed', to: 'canceling', label: '예약 취소', labelDy: -12 },
          { from: 'canceling', to: 'canceled', label: '취소 완료', labelDy: -12 },
          { from: 'failed', to: 'reserved', label: '전송 시간 변경', labelDx: 14 },
          { from: 'paused', to: 'canceled', label: '문서 종료', labelDx: 34 },
        ],
        notes: [
          '예약됨·실패 상태의 예약도 문서가 종료·삭제·회수되면 취소됨으로 바뀝니다.',
          '취소 처리 중 문서 갱신이 실패하면 이전 상태로 되돌립니다.',
          '문서 수정 중에는 예약 전송을 일시 중지합니다. 수정을 취소하면 예약을 재개하고, 수정한 문서를 저장하거나 전송하면 기존 예약을 취소합니다.',
        ],
      },
      evidence: 'git',
    },
    {
      title: '병렬 문서의 수신자별 예약 누락·취소',
      labels: { requirement: '문제', existing: '원인', implementation: '해결' },
      requirement:
        '여러 수신자가 동시에 받는 병렬 문서는 수신자마다 예약이 따로 있습니다. 그런데 한 수신자의 예약이 처리되면서 다른 수신자의 예약이 취소되거나, 해당 수신자에게 문서가 전송되지 않는 문제가 있었습니다.',
      existing:
        '예약을 확인하는 로직이 문서의 대표 처리 지점 하나만 참조했습니다. 다른 수신자의 예약이 이 지점을 차지하면, 앞선 수신자의 유효한 예약을 이미 지난 예약으로 판단해 취소했고, 그 수신자에게는 문서가 전송되지 않았습니다. 승인 대기·문서 수정 시의 일시 중지·재개·취소도 첫 번째 예약에만 적용되었습니다.',
      implementation: [
        { label: '예약 작업 ID 기준 조회', text: '대표 처리 지점 대신 예약 작업 ID로 해당 수신자의 처리 정보를 찾도록 변경했습니다.' },
        {
          label: '수신자별 상태 처리',
          text: '승인 대기·문서 수정 시 현재 처리 단계에 연결된 수신자별 예약을 각각 확인해 일시 중지하고, 처리 결과에 따라 재개하거나 취소하도록 수정했습니다. 편집 시작 시에는 편집하는 담당자의 예약만 멈춥니다.',
        },
        { label: '남은 호출부 정리', text: '대표 처리 지점만 보던 나머지 처리도 찾아 같은 기준으로 수정했습니다.' },
      ],
      evidence: 'git',
    },
  ],

  validation: {
    groups: [
      // 정식 시나리오 검증이 끝나면 아래 문구로 바꾼다:
      // '예약 등록·변경·취소, 문서 편집·수정, 병렬·공동 작성 문서, 실패 재시도 등 주요 기능에 대한 테스트 시나리오를 작성하고 검증했습니다.'
      {
        title: '기능 검증',
        paragraphs: [
          {
            text: '예약 등록·변경·취소, 편집과 문서 수정, 병렬·공동 작성 문서, 실패 재시도 등 주요 기능을 직접 확인했으며, 정식 테스트 시나리오를 작성해 검증할 예정입니다.',
            evidence: 'self',
          },
        ],
      },
      {
        title: '단위 테스트',
        paragraphs: [{ text: '예약 실행 판단 로직에 대한 단위 테스트 14개를 작성했습니다.', evidence: 'git' }],
      },
      {
        title: '진행 결과',
        paragraphs: [{ text: '현재 개발 및 안정화 작업 중이며, 운영 반영 예정입니다.', evidence: 'self' }],
      },
    ],
  },

  // 07 회고 — 본인 문구를 받아 채운다. 비어 있으면 섹션과 목차 항목을 숨긴다.
  retrospective: [],
};
