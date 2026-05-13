/**
 * Variant D — Framer Motion variant propagation (declarative whileHover).
 *
 * Uses framer-motion's built-in variant system: the parent card declares
 * `whileHover="hovered"` and all children automatically receive the same
 * variant. No AnimatePresence, no conditional rendering — every element
 * stays in the DOM and transitions between `idle` and `hovered` states.
 *
 * Framer-motion can batch these transitions more efficiently than explicit
 * animate props driven by external state changes.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IMAGES, SHADOW, SHADOW_LG, spring } from './fixtures'
import GlowBackground from './GlowBackground'

const cardVariants = {
  idle:    { scale: 1,   boxShadow: SHADOW },
  hovered: { scale: 1.2, boxShadow: SHADOW_LG },
}

const overlayVariants = {
  idle:    { opacity: 0 },
  hovered: { opacity: 1 },
}

const labelVariants = {
  idle:    { opacity: 0, height: 0, paddingBottom: 0 },
  hovered: { opacity: 1, height: 29, paddingBottom: 8.7 },
}

const overlayTransition = { duration: 0.15 }
const labelTransition   = { duration: 0.18 }

function Card({ images, rotation, onMouseEnter, onMouseLeave }) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial="idle"
      whileHover="hovered"
      variants={cardVariants}
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
          {/* Variant propagated from parent whileHover */}
          <motion.div
            variants={overlayVariants}
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
            <img src={IMAGES.PENCIL} alt="Edit" style={{ width: 28, height: 28 }} />
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={labelVariants}
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

export default function VariantD() {
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
          onMouseEnter={() => setHovered('product')}
          onMouseLeave={() => setHovered(null)}
        />
      </motion.div>
    </div>
  )
}
