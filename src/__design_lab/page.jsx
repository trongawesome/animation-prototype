import VariantA from './VariantA'
import VariantB from './VariantB'
import VariantC from './VariantC'
import VariantD from './VariantD'
import VariantE from './VariantE'
import { FeedbackOverlay } from './FeedbackOverlay'

const variants = [
  {
    id: 'A',
    title: 'Scale Transform',
    rationale: 'Replaces width animation with CSS scale — no layout reflow, overlay stays perfectly still.',
    component: <VariantA />,
  },
  {
    id: 'B',
    title: 'Staggered Reveal',
    rationale: 'Keeps original width growth, but delays overlay until card is done expanding.',
    component: <VariantB />,
  },
  {
    id: 'C',
    title: 'Lift + Persistent Overlay',
    rationale: 'Card lifts up (translateY) instead of growing. Overlay always in DOM — just fades.',
    component: <VariantC />,
  },
  {
    id: 'D',
    title: 'Declarative whileHover',
    rationale: 'Framer Motion variant propagation: parent hover drives all child states in one pass.',
    component: <VariantD />,
  },
  {
    id: 'E',
    title: 'Floating Badge',
    rationale: 'Removes full-overlay entirely. A spring-in badge replaces the centered pencil — nothing to flicker.',
    component: <VariantE />,
  },
]

export default function DesignLabPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f7', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e5e7eb', background: 'white', padding: '20px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <span style={{
              background: '#6366f1', color: 'white', fontSize: 11, fontWeight: 700,
              padding: '2px 8px', borderRadius: 4, letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>Design Lab</span>
            <span style={{ fontSize: 13, color: '#9ca3af' }}>FormatProductCard.jsx</span>
          </div>
          <h1 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#111827' }}>
            Fix: Hover animation flicker
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: '#6b7280', maxWidth: 560 }}>
            5 approaches to eliminating the pencil-icon shimmy. Core problem: simultaneous layout + opacity animations
            conflict when framer-motion animates <code style={{ background: '#f3f4f6', padding: '1px 4px', borderRadius: 3 }}>width</code> and a child overlay appears at the same time.
            Hover each card to compare.
          </p>
        </div>
      </div>

      {/* Variant grid */}
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '32px 32px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24,
      }}>
        {variants.map(v => (
          <div
            key={v.id}
            data-variant={v.id}
            style={{
              background: 'white',
              borderRadius: 16,
              overflow: 'visible',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            {/* Card header */}
            <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: '#6366f1', color: 'white',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, flexShrink: 0,
                }}>{v.id}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{v.title}</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{v.rationale}</p>
            </div>

            {/* Rendered variant — centered in a preview area */}
            <div style={{
              height: 260,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f0eff2',
              borderRadius: '0 0 16px 16px',
              overflow: 'visible',
            }}>
              {v.component}
            </div>
          </div>
        ))}
      </div>

      {/* Feedback overlay — click any element to annotate */}
      <FeedbackOverlay targetName="FormatProductCard" />
    </div>
  )
}
