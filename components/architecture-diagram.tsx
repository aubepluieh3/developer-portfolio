'use client';

import { useMemo, useState } from 'react';
import type { ArchEdge, ArchNode, Architecture, Flow, Ownership } from '@/content/types';

// viewBox 1000×600 기준 노드 크기. 노드는 같은 좌표계에 % 단위로 배치한 HTML 버튼이다 (docs §7.4)
const VW = 1000;
const VH = 600;
const NW = 180;
const NH = 62;
const GAP = 7;

type Point = { x: number; y: number };

/** from 중심에서 to 방향으로 나가는 선이 from 사각형 테두리와 만나는 점 */
function exitPoint(from: Point, to: Point): Point {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const sx = dx === 0 ? Infinity : (NW / 2 + GAP) / Math.abs(dx);
  const sy = dy === 0 ? Infinity : (NH / 2 + GAP) / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: from.x + dx * s, y: from.y + dy * s };
}

// 기여 구분은 공개 화면에서 노드 테두리로만 표현한다 (범례 참고)
const BORDER: Record<Ownership, string> = {
  new: 'border-2 border-ink',
  extended: 'border-2 border-accent',
  existing: 'border border-dashed border-edge',
};

function nodeBorder(node: ArchNode) {
  if (node.kind === 'actor') return 'border border-line-strong rounded-full';
  return `${BORDER[node.ownership[0] ?? 'existing']} rounded-md`;
}

const edgeKey = (from: string, to: string) => `${from}>${to}`;

/** 시나리오 칩 + 다이어그램 + 하단 설명 패널. 기본 상태에서도 전체 구조와 흐름 요약이 보인다. */
export function ArchitectureExplorer({ architecture }: { architecture: Architecture }) {
  const { nodes, edges, lanes, flows } = architecture;
  const [flowId, setFlowId] = useState<string>('all');
  const [selected, setSelected] = useState<string | null>(null);

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const flow = flows.find((f) => f.id === flowId);

  // 경로 강조는 시나리오 버튼으로만 바뀐다. 노드 hover·클릭은 다이어그램 전체 강조를 바꾸지 않는다.
  const emphasis = useMemo(() => {
    if (!flow) return null;
    const nodeSet = new Set(flow.path.flat());
    flow.steps.forEach((st) => nodeSet.add(st.node));
    return { nodeSet, edgeSet: new Set(flow.path.map(([x, y]) => edgeKey(x, y))) };
  }, [flow]);

  const stepNumber = useMemo(() => {
    const map = new Map<string, number>();
    flow?.steps.forEach((s, i) => {
      if (!map.has(s.node)) map.set(s.node, i + 1);
    });
    return map;
  }, [flow]);

  const isEdgeActive = (e: ArchEdge) => emphasis?.edgeSet.has(edgeKey(e.from, e.to)) ?? false;
  const selectedNode = selected ? byId.get(selected) : undefined;

  const chooseFlow = (id: string) => {
    setFlowId(id);
    setSelected(null);
  };

  return (
    <div>
      <div role="group" aria-label="데이터 흐름 선택" className="flex flex-wrap gap-2">
        {[{ id: 'all', title: '전체 흐름' }, ...flows].map((f) => {
          const active = f.id === flowId;
          return (
            <button
              key={f.id}
              type="button"
              data-flow={f.id}
              aria-pressed={active}
              onClick={() => chooseFlow(f.id)}
              className={`h-8 rounded-full border px-3.5 text-[14px] ${
                active ? 'border-sky bg-tint font-medium text-link' : 'border-line text-sub hover:border-line-strong hover:text-ink'
              }`}
            >
              {f.title}
            </button>
          );
        })}
      </div>

      <div className="mt-6 hidden md:block">
        <div
          className="relative w-full max-w-[960px] select-none"
          style={{ aspectRatio: `${VW} / ${VH}`, containerType: 'inline-size' }}
        >
          <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              {[
                ['arrow', 'var(--color-edge)'],
                ['arrow-strong', 'var(--color-ink)'],
              ].map(([id, color]) => (
                <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0,1 L9,5 L0,9 z" fill={color} />
                </marker>
              ))}
            </defs>
            {lanes.map((lane) => (
              <rect key={lane.id} x={lane.x} y="2" width={lane.width} height="596" rx="10" fill="none" stroke="var(--color-line)" />
            ))}
            {/* 연결선: 기여 구분은 노드 테두리로만 한다. 시나리오를 고르면 경로 선만 네이비로 진하게, 나머지는 옅게 */}
            {edges.map((e) => {
              const a = byId.get(e.from);
              const b = byId.get(e.to);
              if (!a || !b) return null;
              const s1 = exitPoint(a, b);
              const t1 = exitPoint(b, a);
              const active = isEdgeActive(e);
              const off = emphasis !== null && !active;
              const strong = active || e.primary;
              const marker = `url(#${strong ? 'arrow-strong' : 'arrow'})`;
              return (
                <line
                  key={edgeKey(e.from, e.to)}
                  x1={s1.x}
                  y1={s1.y}
                  x2={t1.x}
                  y2={t1.y}
                  stroke={strong ? 'var(--color-ink)' : 'var(--color-edge)'}
                  strokeWidth={active ? 2.6 : e.primary ? 3 : 1.5}
                  markerEnd={marker}
                  markerStart={e.bidirectional ? marker : undefined}
                  opacity={off ? 0.22 : 1}
                />
              );
            })}
          </svg>

          {lanes.map((lane) => (
            <span
              key={lane.id}
              className="absolute top-[1.2%] font-medium text-sub"
              style={{ left: `${(lane.x + 12) / 10}%`, fontSize: 'clamp(11px, 1.3cqw, 13px)' }}
            >
              {lane.label}
            </span>
          ))}

          {edges.map((e) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!e.label || !a || !b) return null;
            const x = (a.x + b.x) / 2 + (e.labelDx ?? 0);
            const y = (a.y + b.y) / 2 + (e.labelDy ?? 0);
            const dim = emphasis !== null && !isEdgeActive(e);
            return (
              <span
                key={`label-${edgeKey(e.from, e.to)}`}
                className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 bg-white px-1 whitespace-nowrap ${
                  dim ? 'opacity-50' : ''
                } ${e.primary ? 'font-semibold text-ink' : 'text-sub'}`}
                style={{ left: `${x / 10}%`, top: `${y / 6}%`, fontSize: 'clamp(10px, 1.25cqw, 13px)' }}
              >
                {e.label}
              </span>
            );
          })}

          {nodes.map((node) => {
            const isSelected = node.id === selected;
            const inPath = emphasis?.nodeSet.has(node.id) ?? false;
            const num = stepNumber.get(node.id);
            return (
              <button
                key={node.id}
                type="button"
                data-node
                data-node-name={node.name}
                aria-pressed={isSelected}
                aria-label={node.summary ? `${node.name}: ${node.summary}` : node.name}
                onClick={() => setSelected(isSelected ? null : node.id)}
                className={`absolute flex cursor-pointer flex-col items-center justify-center px-1 text-center leading-tight ${nodeBorder(
                  node,
                )} ${isSelected ? 'bg-[#e0f2fe]' : inPath ? 'bg-tint' : 'bg-white hover:bg-soft'}`}
                style={{
                  left: `${(node.x - NW / 2) / 10}%`,
                  top: `${(node.y - NH / 2) / 6}%`,
                  width: `${NW / 10}%`,
                  height: `${NH / 6}%`,
                  fontSize: 'clamp(11px, 1.45cqw, 14px)',
                }}
              >
                {num !== undefined && (
                  <span
                    aria-hidden
                    className="absolute -top-2.5 -left-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-link text-[11px] font-semibold text-white"
                  >
                    {num}
                  </span>
                )}
                <span className={node.kind === 'actor' ? 'text-sub' : 'font-semibold text-ink'}>{node.name}</span>
                {node.summary && (
                  <span className="mt-0.5 text-meta" style={{ fontSize: 'clamp(10px, 1.15cqw, 12px)' }}>
                    {node.summary}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <Legend />
      </div>

      <div data-node-panel aria-live="polite" className="mt-6 max-w-[760px] border-t border-line pt-6">
        {selectedNode ? (
          <NodeDetail node={selectedNode} onClose={() => setSelected(null)} />
        ) : flow ? (
          <FlowSteps flow={flow} byId={byId} />
        ) : (
          <FlowOverview flows={flows} onChoose={chooseFlow} />
        )}
      </div>
    </div>
  );
}

function FlowOverview({ flows, onChoose }: { flows: Flow[]; onChoose: (id: string) => void }) {
  return (
    <div>
      <ol className="divide-y divide-line">
        {flows.map((f, i) => (
          <li key={f.id} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2 py-3 first:pt-0 sm:grid-cols-[1.5rem_7rem_minmax(0,1fr)] sm:gap-4">
            <span className="font-mono text-[13px]/[24px] text-meta">{i + 1}</span>
            <button
              type="button"
              onClick={() => onChoose(f.id)}
              className="w-fit text-left text-[15px]/[24px] font-semibold text-ink hover:text-link hover:underline"
            >
              {f.title}
            </button>
            <p className="col-start-2 text-[15px]/[24px] text-sub sm:col-start-auto">{f.oneLine}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[13px] text-meta">흐름을 선택하면 단계별 처리 과정을 볼 수 있습니다.</p>
    </div>
  );
}

function FlowSteps({ flow, byId }: { flow: Flow; byId: Map<string, ArchNode> }) {
  return (
    <div>
      <p className="text-[16px] font-semibold text-ink">{flow.title}</p>
      <p className="mt-1 text-[15px]/[25px] text-sub">{flow.summary}</p>
      <ol className="mt-5">
        {flow.steps.map((step, i) => (
          <li key={`${step.node}-${i}`}>
            {i > 0 && (
              <span aria-hidden className="ml-[7px] block py-1 text-[13px] leading-none text-edge">
                ↓
              </span>
            )}
            <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3">
              <span className="mt-[2px] flex h-5 w-5 items-center justify-center rounded-full bg-link text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <p className="text-[15px]/[24px]">
                  <span className="font-semibold text-ink">{byId.get(step.node)?.name ?? step.node}</span>
                  <span className="text-meta"> — </span>
                  <span className="text-ink">{step.text}</span>
                </p>
                {step.detail && (
                  <details className="mt-1">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[13px] text-link hover:underline">
                      <span aria-hidden className="chevron inline-block transition-transform duration-150">
                        ›
                      </span>
                      자세히
                    </summary>
                    <div className="mt-1 space-y-1.5 text-[14px]/[23px] text-sub">
                      {step.detail.map((d) => (
                        <p key={d}>{d}</p>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function NodeDetail({ node, onClose }: { node: ArchNode; onClose: () => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[17px] font-semibold text-ink">{node.name}</p>
        <button type="button" onClick={onClose} className="shrink-0 text-[13px] text-link hover:underline">
          흐름 보기로 돌아가기
        </button>
      </div>
      <p className="mt-2 text-[15px]/[26px] text-sub">{node.role}</p>
      {node.mine.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {node.mine.map((m) => (
            <li
              key={m.text}
              className="relative pl-4 text-[15px]/[25px] text-ink before:absolute before:top-[0.7em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-edge"
            >
              {m.text}
            </li>
          ))}
        </ul>
      )}
      {node.note && <p className="mt-3 text-[14px] text-meta">{node.note}</p>}
      {node.ref && (
        <a href={`#dev-${node.ref}`} className="mt-4 inline-block text-[14px] text-link hover:underline">
          주요 개발 내용에서 자세히 보기 →
        </a>
      )}
    </div>
  );
}

function Legend() {
  const item = 'inline-flex items-center gap-2';
  return (
    <ul aria-label="범례" className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-meta">
      <li className={item}>
        <span aria-hidden className="inline-block h-3 w-5 rounded-[3px] border-2 border-ink" />
        신규 구현
      </li>
      <li className={item}>
        <span aria-hidden className="inline-block h-3 w-5 rounded-[3px] border-2 border-accent" />
        기존 기능 확장
      </li>
      <li className={item}>
        <span aria-hidden className="inline-block h-3 w-5 rounded-[3px] border border-dashed border-edge" />
        기존 구조 활용
      </li>
    </ul>
  );
}
