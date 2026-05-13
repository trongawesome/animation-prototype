import { useState, useEffect, useRef } from 'react'

export function FeedbackOverlay({ targetName }) {
  const [mode, setMode] = useState('idle') // idle | selecting | panel
  const [comments, setComments] = useState([])
  const [pending, setPending] = useState(null)  // { variant, label, x, y }
  const [pendingText, setPendingText] = useState('')
  const [overallDirection, setOverallDirection] = useState('')
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (mode !== 'selecting') return
    const handle = (e) => {
      if (e.target.closest('[data-feedback-ui]')) return
      e.preventDefault()
      e.stopPropagation()

      const variantEl = e.target.closest('[data-variant]')
      const variant = variantEl?.getAttribute('data-variant') ?? null
      const tag = e.target.tagName.toLowerCase()
      const text = (e.target.textContent ?? '').trim().slice(0, 40)
      const label = text ? `${tag} "${text}"` : tag

      setPending({ variant, label, x: e.clientX, y: e.clientY })
      setPendingText('')
    }
    document.addEventListener('click', handle, true)
    return () => document.removeEventListener('click', handle, true)
  }, [mode])

  useEffect(() => {
    if (pending && textareaRef.current) textareaRef.current.focus()
  }, [pending])

  const saveComment = () => {
    if (!pendingText.trim()) return
    setComments(prev => [...prev, { id: Date.now(), ...pending, comment: pendingText.trim() }])
    setPending(null)
    setPendingText('')
  }

  const generateMd = () => {
    const groups = {}
    for (const c of comments) {
      const k = c.variant ? `Variant ${c.variant}` : 'General'
      ;(groups[k] ??= []).push(c)
    }
    let md = `## Design Lab Feedback\n\n**Target:** ${targetName}\n**Comments:** ${comments.length}\n\n`
    for (const [k, items] of Object.entries(groups)) {
      md += `### ${k}\n`
      items.forEach((item, i) => {
        md += `${i + 1}. **${item.label}**\n   "${item.comment}"\n`
      })
      md += '\n'
    }
    md += `### Overall Direction\n${overallDirection.trim() || '(not provided)'}\n`
    return md
  }

  const copyFeedback = async () => {
    await navigator.clipboard.writeText(generateMd())
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const btnBase = {
    border: 'none', cursor: 'pointer', fontFamily: 'system-ui, sans-serif',
    fontSize: 13, fontWeight: 600, borderRadius: 999, padding: '8px 16px',
    display: 'flex', alignItems: 'center', gap: 6,
  }

  return (
    <>
      {/* Selecting-mode cursor overlay */}
      {mode === 'selecting' && !pending && (
        <div
          data-feedback-ui
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            cursor: 'crosshair',
            background: 'rgba(99,102,241,0.04)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Floating action button */}
      <div
        data-feedback-ui
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8,
        }}
      >
        {comments.length > 0 && mode === 'idle' && (
          <button
            style={{
              ...btnBase,
              background: 'white',
              color: '#374151',
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            }}
            onClick={() => setMode('panel')}
          >
            📋 View {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </button>
        )}
        <button
          style={{
            ...btnBase,
            background: mode === 'selecting' ? '#ef4444' : '#6366f1',
            color: 'white',
            boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
          }}
          onClick={() => {
            if (mode === 'selecting') { setMode('idle'); setPending(null) }
            else setMode('selecting')
          }}
        >
          {mode === 'selecting' ? '✕ Cancel' : '💬 Add Feedback'}
        </button>
      </div>

      {/* Comment popover */}
      {pending && (
        <div
          data-feedback-ui
          style={{
            position: 'fixed',
            left: Math.min(pending.x + 12, window.innerWidth - 300),
            top: Math.min(pending.y + 12, window.innerHeight - 200),
            width: 280,
            background: 'white',
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            padding: 16,
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'system-ui' }}>
            {pending.variant ? `Variant ${pending.variant} · ` : ''}{pending.label}
          </div>
          <textarea
            ref={textareaRef}
            value={pendingText}
            onChange={e => setPendingText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) saveComment() }}
            placeholder="What do you think about this?"
            style={{
              width: '100%', minHeight: 72, padding: '8px 10px',
              border: '1.5px solid #e5e7eb', borderRadius: 8,
              fontFamily: 'system-ui', fontSize: 13, resize: 'none',
              outline: 'none', boxSizing: 'border-box',
              lineHeight: 1.5,
            }}
          />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              style={{ ...btnBase, background: '#f3f4f6', color: '#374151', padding: '6px 12px', fontSize: 12 }}
              onClick={() => { setPending(null); setPendingText('') }}
            >
              Cancel
            </button>
            <button
              style={{ ...btnBase, background: '#6366f1', color: 'white', padding: '6px 12px', fontSize: 12, opacity: pendingText.trim() ? 1 : 0.5 }}
              onClick={saveComment}
            >
              Save ⌘↵
            </button>
          </div>
        </div>
      )}

      {/* Review panel */}
      {mode === 'panel' && (
        <div
          data-feedback-ui
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
          }}
          onClick={e => { if (e.target === e.currentTarget) setMode('idle') }}
        >
          <div style={{
            width: 380, height: '100%', background: 'white',
            padding: '24px 20px', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: 16,
            fontFamily: 'system-ui, sans-serif',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Feedback</h2>
              <button
                style={{ ...btnBase, background: 'none', color: '#6b7280', padding: '4px 8px' }}
                onClick={() => setMode('idle')}
              >✕</button>
            </div>

            {comments.length === 0 ? (
              <p style={{ color: '#9ca3af', fontSize: 13 }}>No comments yet. Close this panel and click "Add Feedback" to start.</p>
            ) : (
              comments.map((c, i) => (
                <div key={c.id} style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>
                    {c.variant ? `Variant ${c.variant} · ` : ''}{c.label}
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: '#111827', lineHeight: 1.5 }}>{c.comment}</p>
                  <button
                    style={{ ...btnBase, background: 'none', color: '#ef4444', padding: '2px 0', fontSize: 11, marginTop: 6 }}
                    onClick={() => setComments(prev => prev.filter(x => x.id !== c.id))}
                  >Remove</button>
                </div>
              ))
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Overall direction</label>
              <textarea
                value={overallDirection}
                onChange={e => setOverallDirection(e.target.value)}
                placeholder="Which variant(s) do you prefer and why?"
                style={{
                  width: '100%', minHeight: 80, padding: '8px 10px',
                  border: '1.5px solid #e5e7eb', borderRadius: 8,
                  fontFamily: 'system-ui', fontSize: 13, resize: 'none',
                  outline: 'none', boxSizing: 'border-box', lineHeight: 1.5,
                }}
              />
            </div>

            <button
              style={{ ...btnBase, background: copied ? '#10b981' : '#6366f1', color: 'white', justifyContent: 'center' }}
              onClick={copyFeedback}
            >
              {copied ? '✓ Copied to clipboard!' : '📋 Copy feedback & submit'}
            </button>
            <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>
              Paste the copied text back in the terminal
            </p>
          </div>
        </div>
      )}
    </>
  )
}
