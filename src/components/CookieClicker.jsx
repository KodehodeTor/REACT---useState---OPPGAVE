import * as confetti from "canvas-confetti";
import { useState } from "react";

// Cookie clicker
export const CookieClicker = ({ size = "150px" }) => {
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  // Handler for 50 clicks:
  const handleCookie = () => {
    // Previous state + 1, if 50 trigger Celebration.
    setCount((prev) => {
      const nextCount = prev + 1;

      if (nextCount === 50) {
        triggerCelebration();
      }

      return nextCount;
    });
  };

  // Confetti logic
  const triggerCelebration = () => {
    try {
      // Left side
      confetti.default({
        particleCount: 150,
        spread: 80,
        origin: { x: 0.2, y: 0.6 },
      });
      confetti.default(
        // Right side
        {
          particleCount: 150,
          spread: 80,
          origin: { x: 0.8, y: 0.6 },
        },
      );
      //   Catches error
    } catch (err) {
      console.log("Confetti animation failed: ", err);
    }
  };

  return (
    <div>
      <h1 style={{ color: count >= 50 ? "#ffcc00" : "inherit" }}>
        {/* When hitting 50= GZ */}
        Cookies: {count} {count >= 50 && "🎉 GZ!"}
      </h1>
      {/* Logic for cookie clicker image. */}
      <img
        src={isClicked ? "/COOKIE_DOWN.png" : "/COOKIE_UP.png"}
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
        onClick={handleCookie}
        alt="Cookie button"
        style={{
          cursor: "pointer",
          width: size,
          height: "auto",
          transition: "transform 0.1s ease",
          transform: isClicked ? "scale (0.95)" : "scale(1)",
        }}
      />
      {/* hint for clicker celebration */}
      <p style={{ fontSize: "9px" }}>psst! click me 50 times</p>
      <br />
      <br />
      <br />
    </div>
  );
};
