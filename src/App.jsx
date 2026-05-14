import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import MagicContentThumbnailHover from './pages/MagicContentThumbnailHover'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/magic-content-thumbnail-hover" element={<MagicContentThumbnailHover />} />
      </Routes>
    </HashRouter>
  )
}
