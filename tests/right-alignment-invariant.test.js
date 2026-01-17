import { test, expect } from 'vitest'

// Helper to get right edge of an element
function getRightEdge(selector) {
  const el = document.querySelector(selector)
  if (!el) throw new Error(`Element not found: ${selector}`)
  return el.getBoundingClientRect().right
}

test('right edge of hero image matches right edge of container', async () => {
  await new Promise(r => setTimeout(r, 100)) // Wait for DOM
  const imageRight = getRightEdge('.hero-image-absolute .hero-image')
  const containerRight = getRightEdge('.hero .container')
  expect(Math.abs(imageRight - containerRight)).toBeLessThanOrEqual(2)
})

test('right edge of rightmost professional card matches container', async () => {
  await new Promise(r => setTimeout(r, 100))
  const cards = document.querySelectorAll('.systems-grid .system-card')
  if (!cards.length) throw new Error('No professional cards found')
  const rightmostCard = Array.from(cards).reduce((a, b) => {
    return getRightEdge(a) > getRightEdge(b) ? a : b
  })
  const containerRight = getRightEdge('.professional-systems .container')
  expect(Math.abs(getRightEdge(rightmostCard) - containerRight)).toBeLessThanOrEqual(2)
})

// You can add similar tests for other sections if needed
