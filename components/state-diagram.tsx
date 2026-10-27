import type { StateDiagram as Diagram } from '@/content/types';

// viewBox 720×300 기준 상태 상자 크기. 좁은 화면(640px 미만)에서는 글자가 너무 작아져 그림 대신 전환 목록을 보여준다.
const VW = 720;
const VH = 300;
const BW = 112;
const BH = 40;

type Pt = { x: number; y: number };

/** 상자 중심 a에서 b 방향으로 나가는 선이 상자 테두리와 만나는 점 */
function edgePoint(a: Pt, b: Pt): Pt {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const t = Math.min(dx ? BW / 2 / Math.abs(dx) : Infinity, dy ? BH / 2 / Math.abs(dy) : Infinity);
  return { x: a.x + dx * t, y: a.y + dy * t };
}

export function StateDiagram({ diagram }: { diagram: Diagram }) {
  const at = Object.fromEntries(diagram.states.map((s) => [s.id, s]));
  const label = (id: string) => at[id]?.label ?? id;

  return (
    <figure data-state-diagram className="mt-6 break-inside-avoid">
      <figcaption className="mb-2 text-[14px] font-semibold text-ink">{diagram.caption}</figcaption>

      <svg viewBox={`0 0 ${VW} ${VH}`} className="hidden w-full sm:block" role="img" aria-label={diagram.caption}>
        <defs>
          <marker id="state-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" fill="var(--color-edge)" />
          </marker>
        </defs>

        {diagram.transitions.map((t) => {
          const a = at[t.from];
          const b = at[t.to];
          if (!a || !b) return null;
          const curve = t.curve ?? 0;
          // 휘는 선은 두 중심의 중점에서 수직 방향으로 control 점을 민다
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
          const nx = -(b.y - a.y) / len;
          const ny = (b.x - a.x) / len;
          const c = { x: mx + nx * curve, y: my + ny * curve };
          const p1 = edgePoint(a, curve ? c : b);
          const p2 = edgePoint(b, curve ? c : a);
          const d = curve ? `M${p1.x} ${p1.y} Q${c.x} ${c.y} ${p2.x} ${p2.y}` : `M${p1.x} ${p1.y} L${p2.x} ${p2.y}`;
          const lx = mx + nx * (curve / 2) + (t.labelDx ?? 0);
          const ly = my + ny * (curve / 2) + (t.labelDy ?? 0);
          return (
            <g key={`${t.from}-${t.to}`} data-transition>
              <path d={d} fill="none" stroke="var(--color-edge)" strokeWidth="1.2" markerEnd="url(#state-arrow)" />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="11.5" fill="var(--color-sub)" paintOrder="stroke" stroke="#fff" strokeWidth="4" strokeLinejoin="round">
                {t.label}
              </text>
            </g>
          );
        })}

        {diagram.states.map((s) => (
          <g key={s.id} data-state>
            <rect
              x={s.x - BW / 2}
              y={s.y - BH / 2}
              width={BW}
              height={BH}
              rx="8"
              fill={s.kind === 'end' ? 'var(--color-soft)' : '#fff'}
              stroke={s.kind === 'transient' ? 'var(--color-edge)' : 'var(--color-rule)'}
              strokeDasharray={s.kind === 'transient' ? '4 3' : undefined}
              strokeWidth="1.2"
            />
            <text x={s.x} y={s.y} textAnchor="middle" dominantBaseline="middle" fontSize="13.5" fontWeight="600" fill="var(--color-ink)">
              {s.label}
            </text>
          </g>
        ))}
      </svg>

      {/* 좁은 화면: 같은 전환을 목록으로 */}
      <ol data-state-list className="space-y-1.5 text-[14px]/[22px] sm:hidden">
        {diagram.transitions.map((t) => (
          <li key={`${t.from}-${t.to}`} className="text-sub">
            <span className="font-medium text-ink">{label(t.from)}</span> → <span className="font-medium text-ink">{label(t.to)}</span>
            <span className="text-meta"> · {t.label}</span>
          </li>
        ))}
      </ol>

      {diagram.notes && (
        <ul className="mt-3 space-y-1 text-[13px]/[20px] text-meta">
          {diagram.notes.map((n) => (
            <li key={n}>· {n}</li>
          ))}
        </ul>
      )}
    </figure>
  );
}
