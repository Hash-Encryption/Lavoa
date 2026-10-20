'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, GSAPSplitText);
}

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'start' | 'end';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  onLetterAnimationComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'start',
  tag = 'p',
  onLetterAnimationComplete,
}) => {
  const ref = useRef<any>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Detect Arabic text: splitType='chars' breaks cursive Arabic ligatures; default to 'words' for Arabic
  const isArabic = /[\u0600-\u06FF]/.test(text);
  const effectiveSplitType = isArabic && splitType === 'chars' ? 'words' : splitType;

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.fonts?.status === 'loaded') {
        setFontsLoaded(true);
      } else if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          setFontsLoaded(true);
        });
      } else {
        setFontsLoaded(true);
      }
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      // Prevent re-animation if already completed
      if (animationCompletedRef.current) return;
      const el = ref.current;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: any;
      const assignTargets = (self: any) => {
        if (effectiveSplitType.includes('chars') && self.chars?.length) targets = self.chars;
        if (!targets && effectiveSplitType.includes('words') && self.words?.length) targets = self.words;
        if (!targets && effectiveSplitType.includes('lines') && self.lines?.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      try {
        const splitInstance = new GSAPSplitText(el, {
          type: effectiveSplitType,
          smartWrap: true,
          autoSplit: effectiveSplitType === 'lines',
          linesClass: 'split-line',
          wordsClass: 'split-word',
          charsClass: 'split-char',
          reduceWhiteSpace: false,
          onSplit: (self: any) => {
            assignTargets(self);
            const tween = gsap.fromTo(
              targets,
              { ...from },
              {
                ...to,
                duration,
                ease,
                stagger: delay / 1000,
                scrollTrigger: {
                  trigger: el,
                  start,
                  once: true,
                  fastScrollEnd: true,
                  anticipatePin: 0.4,
                },
                onComplete: () => {
                  animationCompletedRef.current = true;
                  onCompleteRef.current?.();
                },
                willChange: 'transform, opacity',
                force3D: true,
              }
            );
            return tween;
          },
        });

        el._rbsplitInstance = splitInstance;
      } catch (err) {
        // Fallback gracefully if GSAP SplitText is unavailable or throws
        console.warn('SplitText initialization fallback:', err);
      }

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        if (el._rbsplitInstance) {
          try {
            el._rbsplitInstance.revert();
          } catch (_) {
            /* noop */
          }
          el._rbsplitInstance = null;
        }
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        effectiveSplitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
      ],
      scope: ref,
    }
  );

  const style: React.CSSProperties = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity',
  };
  const classes = `split-parent ${className}`;
  const Tag = tag || 'p';

  return (
    <Tag ref={ref} style={style} className={classes}>
      {text}
    </Tag>
  );
};

export default SplitText;
