import { Link } from 'react-router-dom'
import FormatProductCard from '../components/FormatProductCard'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 48,
      padding: '48px 24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'rgba(27,27,24,0.5)', letterSpacing: '-0.02em' }}>
        Prototypes
      </h1>

      <Link
        to="/magic-content-thumbnail-hover"
        style={{ textDecoration: 'none' }}
      >
        <div style={{
          width: 280,
          background: 'white',
          borderRadius: 24,
          padding: '28px 24px 24px',
          boxShadow: '0px 0px 1px rgba(27,27,24,0.08), 0px 4px 12px rgba(27,27,24,0.06), 0px 12px 32px rgba(27,27,24,0.06)',
          cursor: 'pointer',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0px 0px 1px rgba(27,27,24,0.08), 0px 8px 20px rgba(27,27,24,0.08), 0px 20px 40px rgba(27,27,24,0.08)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0px 0px 1px rgba(27,27,24,0.08), 0px 4px 12px rgba(27,27,24,0.06), 0px 12px 32px rgba(27,27,24,0.06)'
          }}
        >
          {/* Live preview */}
          <div style={{
            height: 200,
            borderRadius: 16,
            background: '#f0eff2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            overflow: 'visible',
          }}>
            <FormatProductCard />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 600, color: '#1b1b18' }}>
                Magic content thumbnail hover
              </p>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(27,27,24,0.45)' }}>
                Hover interaction
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: 'rgba(27,27,24,0.3)' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}
