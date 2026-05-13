/**
 * Site-wide animated background — Apple Intelligence palette.
 * Fixed full-screen, sits behind all content (z-[-1]).
 * Server component: pure CSS animations, no client-side JS.
 */
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="gradient-bg fixed inset-0 -z-10"
      style={{
        "--gradient-background-start": "rgb(0, 0, 0)",
        "--gradient-background-end":   "rgb(0, 0, 0)",
        "--first-color":   "10, 132, 255",   // Apple blue
        "--second-color":  "84, 199, 250",   // sky / light blue
        "--third-color":   "88, 86, 214",    // indigo
        "--fourth-color":  "50, 173, 230",   // cyan
        "--fifth-color":   "30, 92, 220",    // deep indigo-blue
        "--size":          "80%",
        "--blending-value":"hard-light",
      }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="blurry">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g1" />
        <div className="g2" />
        <div className="g3" />
        <div className="g4" />
        <div className="g5" />
      </div>
    </div>
  );
}
