export default function GlowBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 334.727, height: 209,
        opacity: 0.6, pointerEvents: 'none', zIndex: 0,
      }}
    >
      <div style={{
        position: 'absolute', left: 53.88, top: 3.27,
        width: 226.961, height: 205.734, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(255,120,150,0.8) 0%, rgba(255,180,140,0.7) 30%, rgba(255,140,180,0.8) 50%, rgba(200,100,200,0.6) 70%, rgba(150,75,150,0.45) 77.5%, transparent 100%)',
        filter: 'blur(45px)',
      }} />
      <div style={{
        position: 'absolute', left: 19.59, top: 93.07,
        width: 117.413, height: 115.764, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(100,180,255,0.7) 0%, rgba(80,160,255,0.6) 50%, rgba(60,120,191,0.45) 62.5%, transparent 100%)',
        filter: 'blur(38px)', opacity: 0.62,
      }} />
      <div style={{
        position: 'absolute', left: 55.27, top: 20.22,
        width: 82.342, height: 102.515, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(200,100,220,0.7) 0%, rgba(180,60,200,0.6) 50%, rgba(135,45,150,0.45) 62.5%, transparent 100%)',
        filter: 'blur(34px)', opacity: 0.71,
      }} />
      <div style={{
        position: 'absolute', left: 168.11, top: 3.45,
        width: 69.38, height: 83.244, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(255,180,120,0.8) 0%, rgba(255,130,80,0.7) 50%, rgba(191,98,60,0.525) 62.5%, transparent 100%)',
        filter: 'blur(30px)', opacity: 0.98,
      }} />
    </div>
  )
}
