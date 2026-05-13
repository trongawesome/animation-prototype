/**
 * Variant E — Floating badge instead of full overlay.
 *
 * Redesigns the edit affordance: instead of a dark overlay + centered pencil that
 * must animate in sync with the card dimensions, a small circular badge springs in
 * from the top-right corner. The card uses scale (no layout reflow). Eliminates
 * the overlay entirely so there's nothing to flicker.
 *
 * The badge has its own spring entrance (scale 0.6→1, opacity 0→1) which looks
 * intentional and delightful rather than incidental.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IMAGES, SHADOW, SHADOW_LG, spring } from './fixtures'
import GlowBackground from './GlowBackground'

const badgeSpring = { type: 'spring', stiffness: 400, damping: 24 }

function Card({ images, rotation, isHovered, onMouseEnter, onMouseLeave }) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        scale: isHovered ? 1.2 : 1,
        boxShadow: isHovered ? SHADOW_LG : SHADOW,
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
        transformOrigin: 'center center',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '100%',
        borderRadius: 18,
        border: '2px solid white',
        overflow: 'visible',
        flexShrink: 0,
        backgroundColor: 'white',
      }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 18, overflow: 'clip' }}>
          {images.map((src, i) => (
            <img key={i} src={src} alt="" style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', borderRadius: 18,
            }} />
          ))}
        </div>

        {/* Floating badge — springs in from top-right, no overlay conflict */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.65,
          }}
          transition={badgeSpring}
          style={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(27,27,24,0.18)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <img src={IMAGES.PENCIL} alt="Edit" style={{ width: 16, height: 16 }} />
        </motion.div>
      </div>

      {/* Label fades in without height animation — card has fixed bottom padding space */}
      <motion.p
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        style={{
          margin: 0,
          paddingTop: 6,
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

export default function VariantE() {
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{ position: 'relative', width: 280, height: 230, paddingTop: 20 }}>
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
