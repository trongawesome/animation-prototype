/**
 * Variant B — Staggered reveal with width animation preserved.
 *
 * Keeps the original width 104→124.8 animation but staggers the overlay and label
 * so they appear only after the width transition is nearly complete. Eliminates the
 * overlap between layout reflow and opacity animation that caused flickering.
 *
 * Changes vs original:
 * - Overlay: no AnimatePresence, always in DOM, opacity delayed by 0.1s on enter
 * - Label: no AnimatePresence, height+opacity delayed by 0.13s on enter
 * - Exit animations have no delay so the card shrinks cleanly
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IMAGES, SHADOW, SHADOW_LG } from './fixtures'
import GlowBackground from './GlowBackground'

// Tighter spring: higher damping eliminates overshoot, higher stiffness snaps faster
const spring = { type: 'spring', stiffness: 600, damping: 45 }

function Card({ images, rotation, isHovered, onMouseEnter, onMouseLeave }) {
  const overlayTransition = isHovered
    ? { duration: 0.14, delay: 0.10 }
    : { duration: 0.10, delay: 0 }

  const labelTransition = isHovered
    ? { duration: 0.14, delay: 0.13 }
    : { duration: 0.10, delay: 0 }

  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        width: isHovered ? 124.8 : 104,
        boxShadow: isHovered ? SHADOW_LG : SHADOW,
      }}
      transition={spring}
      style={{
        rotate: rotation,
        backgroundColor: 'white',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '100%',
        borderRadius: 18,
        border: `${isHovered ? 2.4 : 2}px solid white`,
        overflow: 'clip',
        flexShrink: 0,
        backgroundColor: 'white',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {images.map((src, i) => (
            <img key={i} src={src} alt="" style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', borderRadius: 18,
            }} />
          ))}
          {/* Delayed reveal — waits for width to settle */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={overlayTransition}
            style={{
              position: 'absolute', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <img src={IMAGES.PENCIL} alt="Edit" style={{ width: 20, height: 20 }} />
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          height: isHovered ? 29 : 0,
          paddingBottom: isHovered ? 8.7 : 0,
        }}
        transition={labelTransition}
        style={{ overflow: 'hidden', width: '100%' }}
      >
        <p style={{
          margin: 0,
          paddingLeft: 4, paddingRight: 4,
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500, fontSize: 12,
          lineHeight: '19.2px',
          color: 'rgba(27,27,24,0.6)',
          textAlign: 'center',
          letterSpacing: '-0.096px',
          whiteSpace: 'nowrap',
        }}>
          Change format
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function VariantB() {
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ position: 'relative', width: 280, height: 210, paddingTop: 20 }}>
      <GlowBackground />

      <motion.div
        animate={{
          left: hovered === 'format' ? 22.47 : 34.2,
          top:  hovered === 'format' ? -14.24 : 0,
        }}
        transition={spring}
        style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: hovered === 'format' ? 2 : 1 }}
      >
        <Card
          images={[IMAGES.BG, IMAGES.WALLPAPER]}
          rotation={-6}
          isHovered={hovered === 'format'}
          onMouseEnter={() => setHovered('format')}
          onMouseLeave={() => setHovered(null)}
        />
      </motion.div>

      <motion.div
        animate={{
          left: hovered === 'product' ? 119.77 : 132.5,
          top:  hovered === 'product' ? -14.24 : 0,
        }}
        transition={spring}
        style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: hovered === 'product' ? 2 : 1 }}
      >
        <Card
          images={[IMAGES.BG, IMAGES.BAG]}
          rotation={6}
          isHovered={hovered === 'product'}
          onMouseEnter={() => setHovered('product')}
          onMouseLeave={() => setHovered(null)}
        />
      </motion.div>
    </div>
  )
}
