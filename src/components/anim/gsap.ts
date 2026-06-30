'use client'

import { useLayoutEffect, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once on the client.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/** SSR-safe layout effect. */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** Returns true when the user has not requested reduced motion. */
export function prefersMotion() {
  if (typeof window === 'undefined') return true
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { gsap, ScrollTrigger }
