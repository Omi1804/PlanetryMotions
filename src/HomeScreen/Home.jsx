import { useState, useEffect, useRef } from "react";

const NUM_STARS = 180;
const NUM_PARTICLES = 28;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const stars = Array.from({ length: NUM_STARS }, (_, i) => ({
  id: i,
  x: randomBetween(0, 100),
  y: randomBetween(0, 100),
  size: randomBetween(0.8, 2.6),
  opacity: randomBetween(0.3, 1),
  duration: randomBetween(2, 6),
  delay: randomBetween(0, 5),
}));

const particles = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
  id: i,
  x: randomBetween(5, 95),
  y: randomBetween(5, 95),
  size: randomBetween(2, 5),
  duration: randomBetween(8, 20),
  delay: randomBetween(0, 10),
  drift: randomBetween(-30, 30),
}));

const FULL_TEXT =
  "Embark on an extraordinary journey through a realm of self-generated and fictional planets. Let us delve into the wonders that await…";

export default function Home() {
  const [displayed, setDisplayed] = useState("");
  const [showCaret, setShowCaret] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const indexRef = useRef(0);

  // Typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < FULL_TEXT.length) {
        setDisplayed(FULL_TEXT.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowButton(true);
          setTimeout(() => setButtonVisible(true), 50);
        }, 500);
      }
    }, 52);
    return () => clearInterval(interval);
  }, []);

  // Blinking caret
  useEffect(() => {
    const t = setInterval(() => setShowCaret((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  const navigate = () => {
    window.location.href = "/planets";
  };

  return (
    <div style={styles.root}>
      {/* ── Starfield ── */}
      <div style={styles.starfield} aria-hidden>
        {stars.map((s) => (
          <span
            key={s.id}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "#fff",
              opacity: s.opacity,
              animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <div style={styles.starfield} aria-hidden>
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "rgba(120,180,255,0.55)",
              filter: "blur(1px)",
              animation: `floatDust ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
              "--drift": `${p.drift}px`,
            }}
          />
        ))}
      </div>

      {/* ── Nebula blobs ── */}
      <div style={styles.nebulaA} aria-hidden />
      <div style={styles.nebulaB} aria-hidden />
      <div style={styles.nebulaC} aria-hidden />

      {/* ── Planet orb ── */}
      <div style={styles.planetWrap} aria-hidden>
        <div style={styles.planet}>
          <div style={styles.planetShine} />
          <div style={styles.ring} />
        </div>
        <div style={styles.planetGlow} />
      </div>

      {/* ── Content ── */}
      <div style={styles.content}>
        <p style={styles.label}>DEEP SPACE EXPLORER</p>

        <div style={styles.card}>
          <div style={styles.cardCornerTL} />
          <div style={styles.cardCornerBR} />
          <p style={styles.text}>
            {displayed}
            <span
              style={{
                ...styles.caret,
                opacity: showCaret ? 1 : 0,
              }}
            />
          </p>
        </div>

        {showButton && (
          <button
            style={{
              ...styles.button,
              opacity: buttonVisible ? 1 : 0,
              transform: buttonVisible ? "translateY(0)" : "translateY(12px)",
            }}
            onClick={navigate}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg,#d4af37,#f0e68c)";
              e.currentTarget.style.boxShadow =
                "0 0 32px rgba(240,230,140,0.7), 0 0 8px rgba(240,230,140,0.4)";
              e.currentTarget.style.letterSpacing = "0.25em";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg,#b8962e,#e8d77a)";
              e.currentTarget.style.boxShadow =
                "0 0 18px rgba(240,230,140,0.35), 0 0 4px rgba(240,230,140,0.2)";
              e.currentTarget.style.letterSpacing = "0.2em";
            }}
          >
            LET'S EXPLORE ›
          </button>
        )}

        <p style={styles.coords}>
          RA 14h 29m 43s &nbsp;·&nbsp; DEC −62° 40′ 46″ &nbsp;·&nbsp; Z 0.0081
        </p>
      </div>

      <style>{keyframes}</style>
    </div>
  );
}

const styles = {
  root: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    background: "radial-gradient(ellipse at 60% 40%, #090d1f 0%, #020408 100%)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Courier New', monospace",
  },
  starfield: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  nebulaA: {
    position: "absolute",
    width: 700,
    height: 700,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(79,114,212,0.18) 0%, transparent 70%)",
    top: "5%",
    left: "-15%",
    filter: "blur(60px)",
    animation: "nebulaPulse 12s ease-in-out infinite alternate",
  },
  nebulaB: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(160,80,220,0.14) 0%, transparent 70%)",
    bottom: "0%",
    right: "-10%",
    filter: "blur(50px)",
    animation: "nebulaPulse 9s 3s ease-in-out infinite alternate",
  },
  nebulaC: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(30,180,160,0.12) 0%, transparent 70%)",
    top: "40%",
    right: "20%",
    filter: "blur(40px)",
    animation: "nebulaPulse 15s 1s ease-in-out infinite alternate",
  },
  planetWrap: {
    position: "absolute",
    top: "8%",
    right: "8%",
    width: 160,
    height: 160,
  },
  planet: {
    width: 130,
    height: 130,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 38% 35%, #3a5fc8 0%, #1a2a6c 45%, #0a0e30 100%)",
    boxShadow:
      "inset -18px -12px 30px rgba(0,0,0,0.7), inset 10px 8px 25px rgba(79,114,212,0.35)",
    position: "relative",
    animation: "planetFloat 7s ease-in-out infinite alternate",
    overflow: "hidden",
  },
  planetShine: {
    position: "absolute",
    top: "10%",
    left: "15%",
    width: "40%",
    height: "30%",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 80%)",
    transform: "rotate(-30deg)",
  },
  ring: {
    position: "absolute",
    width: 190,
    height: 40,
    border: "3px solid rgba(120,160,240,0.35)",
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%) rotateX(72deg)",
    boxShadow: "0 0 14px rgba(120,160,240,0.2)",
    pointerEvents: "none",
  },
  planetGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 200,
    height: 200,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(79,114,212,0.22) 0%, transparent 70%)",
    filter: "blur(20px)",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    zIndex: 10,
    width: "min(680px, 90vw)",
  },
  label: {
    margin: 0,
    fontSize: "0.68rem",
    letterSpacing: "0.4em",
    color: "rgba(120,160,255,0.7)",
    textTransform: "uppercase",
    animation: "fadeIn 1.5s ease forwards",
  },
  card: {
    position: "relative",
    width: "100%",
    border: "1px solid rgba(79,114,212,0.5)",
    borderRadius: 12,
    padding: "2rem 2.2rem",
    background: "rgba(8,12,32,0.75)",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 0 40px rgba(79,114,212,0.12), inset 0 0 30px rgba(79,114,212,0.05)",
    animation: "fadeIn 1s 0.4s ease both",
  },
  cardCornerTL: {
    position: "absolute",
    top: -1,
    left: -1,
    width: 24,
    height: 24,
    borderTop: "2px solid #4f72d4",
    borderLeft: "2px solid #4f72d4",
    borderRadius: "12px 0 0 0",
  },
  cardCornerBR: {
    position: "absolute",
    bottom: -1,
    right: -1,
    width: 24,
    height: 24,
    borderBottom: "2px solid #4f72d4",
    borderRight: "2px solid #4f72d4",
    borderRadius: "0 0 12px 0",
  },
  text: {
    margin: 0,
    fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)",
    lineHeight: 1.85,
    color: "rgba(200,220,255,0.92)",
    letterSpacing: "0.04em",
  },
  caret: {
    display: "inline-block",
    width: 2,
    height: "1em",
    background: "#f0a840",
    marginLeft: 3,
    verticalAlign: "text-bottom",
    transition: "opacity 0.05s",
    borderRadius: 1,
  },
  button: {
    marginTop: 8,
    padding: "0.75rem 2.6rem",
    fontSize: "0.78rem",
    letterSpacing: "0.2em",
    fontFamily: "'Courier New', monospace",
    fontWeight: 700,
    color: "#0a0e17",
    background: "linear-gradient(135deg,#b8962e,#e8d77a)",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    boxShadow: "0 0 18px rgba(240,230,140,0.35), 0 0 4px rgba(240,230,140,0.2)",
    transition:
      "opacity 0.6s ease, transform 0.6s ease, letter-spacing 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
  },
  coords: {
    margin: 0,
    fontSize: "0.62rem",
    letterSpacing: "0.18em",
    color: "rgba(100,130,200,0.45)",
    animation: "fadeIn 2s 1s ease both",
  },
};

// ── Keyframes ───────────────────────────────────────────────────────────────

const keyframes = `
@keyframes twinkle {
  from { opacity: var(--from, 0.2); transform: scale(1); }
  to   { opacity: 1; transform: scale(1.4); }
}
@keyframes floatDust {
  from { transform: translate(0, 0); opacity: 0.3; }
  to   { transform: translate(var(--drift, 20px), -25px); opacity: 0.7; }
}
@keyframes nebulaPulse {
  from { opacity: 0.7; transform: scale(1); }
  to   { opacity: 1; transform: scale(1.08); }
}
@keyframes planetFloat {
  from { transform: translateY(0) rotate(-1deg); }
  to   { transform: translateY(-14px) rotate(1deg); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;
