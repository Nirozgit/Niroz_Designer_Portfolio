import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over element with data-cursor
      const target = e.target as HTMLElement | null;
      const cursorElem = target?.closest('[data-cursor]');
      if (cursorElem) {
        const text = cursorElem.getAttribute('data-cursor');
        setCursorText(text || 'VIEW ↗');
      } else {
        setCursorText(null);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      id="custom-cursor"
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: cursorText ? 1 : 0,
        opacity: cursorText ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 400,
        mass: 0.2,
      }}
    >
      <div className="bg-[#111111] text-[#F7F7F5] px-4 py-2 rounded-full text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-xl border border-white/20 select-none">
        <span>{cursorText || 'VIEW'}</span>
        <span className="text-[10px]">↗</span>
      </div>
    </motion.div>
  );
};
