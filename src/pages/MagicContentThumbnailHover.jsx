import { Link } from 'react-router-dom'
import FormatProductCard from '../components/FormatProductCard'

export default function MagicContentThumbnailHover() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Back button */}
      <Link
        to="/"
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          textDecoration: 'none',
          color: 'rgba(27,27,24,0.5)',
          fontSize: 13,
          fontWeight: 500,
          padding: '6px 12px',
          borderRadius: 999,
          background: 'white',
          boxShadow: '0 1px 4px rgba(27,27,24,0.1)',
          transition: 'color 0.12s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#1b1b18'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(27,27,24,0.5)'}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Home
      </Link>

      <FormatProductCard />
    </div>
  )
}
