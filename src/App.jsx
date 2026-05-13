import { lazy, Suspense } from 'react'
import './index.css'
import FormatProductCard from './components/FormatProductCard'

const isDesignLab = new URLSearchParams(window.location.search).has('design_lab')
const DesignLabPage = lazy(() => import('./__design_lab/page.jsx'))

export default function App() {
  if (isDesignLab) {
    return (
      <Suspense fallback={null}>
        <DesignLabPage />
      </Suspense>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <FormatProductCard />
    </div>
  )
}
