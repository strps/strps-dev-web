import React from 'react'

const SVGCircles = ({ className }) => {
  const style: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    // position: "absolute",
    zIndex: -1,
  }

  const i = 150
  const j = 150

  const arrayLength = 9

  return (
    <svg style={style} className={className} viewBox={`${-i / 2} ${-j / 2} ${i} ${j}`}>
      {Array.from({ length: arrayLength }).map((_, i) => {
        return (
          <circle
            key={i}
            id={`c-${i}`}
            cx="0"
            cy="0"
            r={i * -10 + 80}
            fill="none"
            strokeWidth="5px"
            stroke="#303030"
            pathLength="100"
            strokeDasharray="75"
            transform={`rotate(${Math.random() * 360})`}
          />
        )
      })}
      <script>
        {`console.log("hello")

        const circles_arr = Array.from({ length: ${arrayLength} }).map((_, i) => ({circle: document.getElementById('c-' + i), rot: 0, rotSpeed: Math.random() * 2 - 1}))
        
        function animate() {
          circles_arr.forEach((circle, i) => {
            circle.rot += circle.rotSpeed
            circle.circle.setAttribute("transform", \`rotate(\${circle.rot})\`)
          })
          requestAnimationFrame(animate)
        }
        animate()`}
      </script>
    </svg>
  )
}

export default SVGCircles
