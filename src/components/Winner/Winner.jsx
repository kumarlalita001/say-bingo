// WinnerBoom.js
import React from "react";

const Winner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50 pointer-events-none">
      <div className="relative w-full h-full overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className={`absolute w-2 h-2 bg-white rounded-full animate-firework`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Winner;
