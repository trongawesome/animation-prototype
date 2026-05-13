import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Figma assets (valid for 7 days from fetch)
const IMG_BG        = 'https://www.figma.com/api/mcp/asset/b13979b6-92ff-45b6-a3e9-2c197dddd48c'
const IMG_WALLPAPER = 'https://www.figma.com/api/mcp/asset/af616e44-aa09-4216-ac6c-2804a80421b4'
const IMG_BAG       = 'https://www.figma.com/api/mcp/asset/c233af55-4e3e-4a80-8a0e-4b464916c217'
const IMG_PENCIL    = 'https://www.figma.com/api/mcp/asset/b76075d0-8fe7-49d1-9ede-0c454952c3ee'

const SHADOW    = '0px 0px 1px rgba(27,27,24,0.10), 0px 4px 3px rgba(27,27,24,0.04), 0px 8px 8px rgba(27,27,24,0.04), 0px 10px 10px rgba(27,27,24,0.02)'
const SHADOW_LG = '0px 0px 1.2px rgba(27,27,24,0.10), 0px 4.8px 3.6px rgba(27,27,24,0.04), 0px 9.6px 9.6px rgba(27,27,24,0.04), 0px 12px 12px rgba(27,27,24,0.02)'

const spring = { type: 'spring', stiffness: 360, damping: 28 }
const fade   = { duration: 0.18 }

// Colorful blurred glow orbs matching the Figma background
function GlowBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 334.727,
        height: 209,
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Pink / rose center */}
      <div style={{
        position: 'absolute', left: 53.88, top: 3.27,
        width: 226.961, height: 205.734, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(255,120,150,0.8) 0%, rgba(255,180,140,0.7) 30%, rgba(255,140,180,0.8) 50%, rgba(200,100,200,0.6) 70%, rgba(150,75,150,0.45) 77.5%, transparent 100%)',
        filter: 'blur(45px)',
      }} />
      {/* Blue bottom-left */}
      <div style={{
        position: 'absolute', left: 19.59, top: 93.07,
        width: 117.413, height: 115.764, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(100,180,255,0.7) 0%, rgba(80,160,255,0.6) 50%, rgba(60,120,191,0.45) 62.5%, transparent 100%)',
        filter: 'blur(38px)',
        opacity: 0.62,
      }} />
      {/* Purple center-top */}
      <div style={{
        position: 'absolute', left: 55.27, top: 20.22,
        width: 82.342, height: 102.515, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(200,100,220,0.7) 0%, rgba(180,60,200,0.6) 50%, rgba(135,45,150,0.45) 62.5%, transparent 100%)',
        filter: 'blur(34px)',
        opacity: 0.71,
      }} />
      {/* Amber top-right */}
      <div style={{
        position: 'absolute', left: 168.11, top: 3.45,
        width: 69.38, height: 83.244, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(255,180,120,0.8) 0%, rgba(255,130,80,0.7) 50%, rgba(191,98,60,0.525) 62.5%, transparent 100%)',
        filter: 'blur(30px)',
        opacity: 0.98,
      }} />
    </div>
  )
}

function Card({ images, rotation, isHovered, onMouseEnter, onMouseLeave }) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{ width: isHovered ? 124.8 : 104 }}
      transition={spring}
      style={{
        rotate: rotation,
        backgroundColor: 'white',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: isHovered ? SHADOW_LG : SHADOW,
        cursor: 'pointer',
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Square image with overlay */}
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
            <img
              key={i}
              src={src}
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 18,
              }}
            />
          ))}

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fade}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={IMG_PENCIL} alt="Edit" style={{ width: 28, height: 28 }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* "Change format" label — slides in below the image */}
      <AnimatePresence>
        {isHovered && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={fade}
            style={{
              margin: 0,
              paddingBottom: 8.7,
              paddingLeft: 4,
              paddingRight: 4,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              lineHeight: '19.2px',
              color: 'rgba(27,27,24,0.6)',
              textAlign: 'center',
              letterSpacing: '-0.096px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              width: '100%',
            }}
          >
            Change format
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FormatProductCard() {
  const [hovered, setHovered] = useState(null) // 'format' | 'product' | null

  return (
    // Extra top padding so the card expanding upward on hover isn't clipped
    <div style={{ position: 'relative', width: 280, height: 210, paddingTop: 20 }}>
      <GlowBackground />

      {/* Left card — format (-6°) */}
      <motion.div
        animate={{
          left: hovered === 'format' ? 22.47 : 34.2,
          top:  hovered === 'format' ? -14.24 : 0,
        }}
        transition={spring}
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: hovered === 'format' ? 2 : 1,
        }}
      >
        <Card
          images={[IMG_BG, IMG_WALLPAPER]}
          rotation={-6}
          isHovered={hovered === 'format'}
          onMouseEnter={() => setHovered('format')}
          onMouseLeave={() => setHovered(null)}
        />
      </motion.div>

      {/* Right card — product (+6°) */}
      <motion.div
        animate={{
          left: hovered === 'product' ? 119.77 : 132.5,
          top:  hovered === 'product' ? -14.24 : 0,
        }}
        transition={spring}
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: hovered === 'product' ? 2 : 1,
        }}
      >
        <Card
          images={[IMG_BG, IMG_BAG]}
          rotation={6}
          isHovered={hovered === 'product'}
          onMouseEnter={() => setHovered('product')}
          onMouseLeave={() => setHovered(null)}
        />
      </motion.div>
    </div>
  )
}
