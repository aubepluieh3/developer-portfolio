// 콘텐츠 스키마. 검증 스크립트가 Node 타입 제거 실행(--experimental-strip-types)으로
// 이 파일들을 직접 불러오므로, enum·namespace 같은 런타임 TS 문법은 쓰지 않는다.

/**
 * 문장의 근거.
 * - git: 회사 저장소 커밋으로 확인
 * - doc: 사내 프로젝트 문서(기획서·테스트 시나리오)로 확인
 * - resume: 경력기술서 확정본
 * - self: 본인 확인
 * - unverified: 미확인. 개발 모드에서만 표시하고, 빌드에서는 제외하고, 공개 배포에서는 차단한다
 */
export type Evidence = 'git' | 'doc' | 'resume' | 'self' | 'unverified';

/** 신규 구현 / 기존 확장 / 기존 구조 활용 */
export type Ownership = 'new' | 'extended' | 'existing';

export interface Sourced {
  evidence: Evidence;
}

export interface TextItem extends Sourced {
  text: string;
}

/** 펼쳐 보기 안의 부가 설명 */
export interface More {
  summary: string;
  paragraphs?: string[];
  rows?: [string, string][];
  code?: string;
  codeCaption?: string;
}

/** 04 주요 개발 내용의 개발 단위. ownership 은 공개 화면에 표시하지 않는 내부 검증용 */
export interface DevUnit extends Sourced {
  title: string;
  body: string;
  ownership: Ownership[];
  /** 다른 섹션에서 링크할 앵커 (dev-<anchor>) */
  anchor?: string;
  /** body 안에서 밑줄로 강조할 구절 (페이지 전체 3~4개 이내) */
  emphasis?: string;
  more?: More;
}

export interface ApiItem extends Sourced {
  name: string;
  role: string;
}

export interface ContributionGroup {
  id: string;
  title: string;
  system: string;
  summary: string;
  /** summary 안에서 밑줄로 강조할 구절 */
  emphasis?: string;
  units: DevUnit[];
  apis?: ApiItem[];
  /** 기존 구조를 활용한 부분 (보조 설명) */
  note?: string;
}

export type Lane = 'admin' | 'service';

export interface NodeContribution {
  ownership: Ownership;
  text: string;
}

export interface ArchNode extends Sourced {
  id: string;
  name: string;
  /** 노드 안에 보이는 핵심 역할 (9자 안팎) */
  summary: string;
  lane: Lane;
  kind: 'actor' | 'component';
  /** viewBox 1000×600 기준 중심 좌표 */
  x: number;
  y: number;
  ownership: Ownership[];
  role: string;
  /** 공개 화면에는 text 만 보인다. ownership 은 내부 검증용으로 유지한다 */
  mine: NodeContribution[];
  note?: string;
  /** 04 주요 개발 내용의 그룹 id */
  ref?: string;
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
  sublabel?: string;
  /** 본인이 구현한 핵심 연결 (굵은 네이비 선) */
  primary?: boolean;
  /** 라벨 위치 보정 (viewBox 단위) */
  labelDx?: number;
  labelDy?: number;
}

export interface FlowStep {
  node: string;
  text: string;
  /** 기본으로 접혀 있는 부가 설명 (문단 단위) */
  detail?: string[];
}

export interface Flow {
  id: string;
  title: string;
  /** "전체 흐름"에서 보이는 한 줄 요약 */
  oneLine: string;
  /** 흐름을 선택했을 때 보이는 1~2문장 요약 */
  summary: string;
  /** 다이어그램에서 강조할 연결선 [from, to] */
  path: [string, string][];
  steps: FlowStep[];
}

export interface Architecture {
  lanes: { id: Lane; label: string }[];
  roles: { label: string; text: string }[];
  nodes: ArchNode[];
  edges: ArchEdge[];
  flows: Flow[];
}

export interface CaseStudy extends Sourced {
  title: string;
  requirement: string;
  existing: string;
  /** 문자열, 또는 굵은 소제목이 붙는 항목 */
  implementation: (string | { label: string; text: string })[];
  /** 구현 안에서 비교를 보여주는 작은 표 */
  table?: { caption?: string; columns: string[]; rows: string[][] };
  more?: More;
}

export interface Project {
  slug: string;
  title: string;
  meta: string;
  summary: string;
  role: string;
  /** 제목 아래 역량 배지 (2~3개) */
  tags: string[];
  highlights: TextItem[];
  overview: {
    rows: [string, string][];
    stacks: { system: string; items: string[] }[];
    /** 다른 담당자의 역할과 기존 구조 활용. 한두 문장 */
    collaboration: TextItem[];
  };
  background: {
    comparisons: (Sourced & { topic: string; before: string; after: string })[];
    approach: TextItem[];
  };
  architecture: Architecture;
  contributions: ContributionGroup[];
  cases: CaseStudy[];
  validation: {
    /** 테스트 및 QA / 운영 반영 및 유지보수 / 결과 */
    groups: { title: string; emphasis?: string; paragraphs: TextItem[] }[];
  };
  retrospective: TextItem[];
}
