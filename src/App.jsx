import './index.css'
import FormatProductCard from './components/FormatProductCard'

export default function App() {
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
