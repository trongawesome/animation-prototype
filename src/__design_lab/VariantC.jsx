/**
 * Variant C — Static card size, lift + persistent overlay.
 *
 * No size change whatsoever. Instead of growing, the card lifts (translateY) and
 * casts a larger shadow. The overlay and label are always rendered at low opacity
 * so there's zero mounting cost — just a fast opacity fade.
 *
 * This is the most minimal and elegant fix: remove the problematic dimension
 * animation entirely and replace it with a pure-transform lift effect.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IMAGES, SHADOW, SHADOW_LG, spring } from './fixtures'
import GlowBackground from './GlowBackground'

const SHADOW_HOVER = '0px 0px 2px rgba(27,27,24,0.12), 0px 8px 16px rgba(27,27,24,0.10), 0px 16px 24px rgba(27,27,24,0.08), 0px 24px 32px rgba(27,27,24,0.04)'

function Card({ images, rotation, isHovered, onMouseEnter, onMouseLeave }) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        y: isHovered ? -10 : 0,
        boxShadow: isHovered ? SHADOW_HOVER : SHADOW,
      }}
      transition={spring}
      style={{
        rotate: rotation,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 104,
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
        border: '2px solid white',
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
          {/* Persistent overlay — no mount/unmount, pure opacity transition */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.14 }}
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
            <img src={IMAGES.PENCIL} alt="Edit" style={{ width: 28, height: 28 }} />
          </motion.div>
        </div>
      </div>

      {/* Label always visible at low opacity — no height animation needed */}
      <motion.p
        animate={{ opacity: isHovered ? 1 : 0.28 }}
        transition={{ duration: 0.14 }}
        style={{
          margin: 0,
          paddingBottom: 8.7,
          paddingLeft: 4, paddingRight: 4,
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500, fontSize: 12,
          lineHeight: '19.2px',
          color: 'rgba(27,27,24,0.6)',
          textAlign: 'center',
          letterSpacing: '-0.096px',
          whiteSpace: 'nowrap',
        }}
      >
        Change format
      </motion.p>
    </motion.div>
  )
}

export default function VariantC() {
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
