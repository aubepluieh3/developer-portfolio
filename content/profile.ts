// 소개(명함) 데이터. /about 페이지에서 쓴다.
// 문장은 확인된 경험만으로 쓴 초안이다. draft: true 인 항목은 본인 문구로 바꿀 자리다.

export interface ProfileLine {
  text: string;
  /** 본인 확인·수정이 필요한 초안 문장 */
  draft?: boolean;
}

export interface Profile {
  name: string;
  /** 명함 앞면 직무 표기 */
  title: string;
  /** 앞면 짧은 소개 (1~2문장) */
  intro: ProfileLine;
  /** 앞면 기술 묶음 */
  skills: { area: string; items: string[] }[];
  /** 뒷면: 좋아하는 업무 방식 (확인된 내용) */
  workStyle: ProfileLine[];
  /** 뒷면: 개발하면서 중요하게 생각하는 점 */
  values: ProfileLine[];
  career: { period: string; company: string }[];
  contacts: { label: string; value: string; href: string }[];
}

export const profile: Profile = {
  name: '박수현',
  title: 'Full-stack Developer',
  intro: {
    text: 'Java·Spring 기반 백엔드와 JavaScript·TypeScript·React 화면을 함께 개발해 왔습니다. 요구사항 분석부터 설계·구현·검증까지 이어서 맡아 왔습니다.',
    draft: true,
  },
  skills: [
    { area: 'Frontend', items: ['TypeScript', 'React', 'JavaScript'] },
    { area: 'Backend', items: ['Java', 'Spring', 'SQL'] },
  ],
  workStyle: [
    { text: '현업 담당자와 직접 이야기하며 불편한 점을 듣고, 필요한 기능을 함께 구체화하는 일을 좋아합니다.' },
    { text: '관심 있던 기술을 실제 업무에 적용해 보는 데 관심이 많습니다.' },
  ],
  values: [
    { text: '기능 하나보다 시스템 사이의 데이터 흐름과 기존 기능에 미치는 영향을 함께 확인합니다.', draft: true },
    { text: '반복되는 실수는 테스트와 검사 규칙으로 옮겨 다시 생기지 않게 합니다.', draft: true },
  ],
  career: [
    // 회사명은 공개 여부 결정 전까지 비워 둔다 (현재 공개 금지어 목록에 포함)
    { period: '2023.01 – 현재', company: '' },
  ],
  contacts: [
    { label: 'Email', value: 'aubepluieh3@naver.com', href: 'mailto:aubepluieh3@naver.com' },
  ],
};
