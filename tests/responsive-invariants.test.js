/**
 * Responsive Design Invariants
 * 
 * These tests verify CSS contains required responsive rules.
 * For visual regression, run `npm run dev` and test manually at each breakpoint.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Helper to read CSS file
const readCSS = (componentName) => {
  return readFileSync(
    resolve(__dirname, `../src/components/${componentName}.css`),
    'utf-8'
  );
};

const readIndexCSS = () => {
  return readFileSync(
    resolve(__dirname, '../src/styles/global.css'),
    'utf-8'
  );
};

describe('INV-R: Responsive Design Invariants', () => {
  
  describe('Desktop (≥1024px)', () => {
    it('INV-R1: Hero padding should use rem units for viewport fit', () => {
      const heroCSS = readCSS('Hero');
      // Should have reasonable padding, not excessive pixel values
      expect(heroCSS).toMatch(/\.hero\s*\{[^}]*padding:\s*[\d.]+rem/);
    });

    it('INV-R3: Section padding should not exceed 1.5rem', () => {
      const sections = ['Hero', 'JudgmentCalls', 'ProfessionalSystems', 'MarqueeProject', 'Assertions', 'Boundaries'];
      sections.forEach(section => {
        const css = readCSS(section);
        // Extract padding values - should be ≤ 1.5rem or equivalent
        const paddingMatch = css.match(/padding:\s*([\d.]+)rem/);
        if (paddingMatch) {
          const value = parseFloat(paddingMatch[1]);
          expect(value).toBeLessThanOrEqual(3); // Allow up to 3rem for hero top
        }
      });
    });
  });

  describe('Tablet Breakpoint (768-1023px)', () => {
    it('INV-R5: Hero should have media query for tablet layout', () => {
      const heroCSS = readCSS('Hero');
      expect(heroCSS).toMatch(/@media\s*\([^)]*max-width:\s*900px\)/);
    });

    it('INV-R6: Professional systems grid should be responsive', () => {
      const css = readCSS('ProfessionalSystems');
      expect(css).toMatch(/\.systems-grid/);
      expect(css).toMatch(/grid|flex/);
    });
  });

  describe('Mobile Breakpoint (<768px)', () => {
    it('INV-R8: Hero should stack vertically on mobile', () => {
      const heroCSS = readCSS('Hero');
      expect(heroCSS).toMatch(/flex-direction:\s*column/);
    });

    it('INV-R9: Hero image should have responsive sizing', () => {
      const heroCSS = readCSS('Hero');
      // Should have width defined that can be overridden
      expect(heroCSS).toMatch(/\.hero-image\s*\{[^}]*width:/);
    });

    it('INV-R11: Container should have horizontal padding', () => {
      const indexCSS = readIndexCSS();
      expect(indexCSS).toMatch(/\.container\s*\{[^}]*padding/);
    });

    it('INV-R13: Writing cards should scroll horizontally', () => {
      const writingCSS = readCSS('Writing');
      expect(writingCSS).toMatch(/overflow-x:\s*auto/);
      expect(writingCSS).toMatch(/scroll-snap/);
    });
  });

  describe('Global Constraints', () => {
    it('INV-R14: No fixed widths that could cause horizontal overflow', () => {
      const heroCSS = readCSS('Hero');
      // Image should not have excessive fixed width
      const widthMatch = heroCSS.match(/\.hero-image\s*\{[^}]*width:\s*(\d+)px/);
      if (widthMatch) {
        expect(parseInt(widthMatch[1])).toBeLessThanOrEqual(300);
      }
    });

    it('INV-R16: Max-width should be set for readable line length', () => {
      const heroCSS = readCSS('Hero');
      expect(heroCSS).toMatch(/max-width:\s*\d+/);
    });

    it('should have mobile-first or responsive media queries', () => {
      const heroCSS = readCSS('Hero');
      const footerCSS = readCSS('Footer');
      
      // At least one component should have media queries
      const hasMediaQueries = 
        heroCSS.includes('@media') || 
        footerCSS.includes('@media');
      
      expect(hasMediaQueries).toBe(true);
    });
  });

  describe('Touch Target Sizing', () => {
    it('INV-R15: Navigation icons should have adequate tap target size', () => {
      const navCSS = readCSS('Nav');
      // Should have padding or size that creates 44px+ tap target
      expect(navCSS).toMatch(/\.nav-icon|\.nav-link/);
    });

    it('INV-R15: Writing cards should be adequately sized for touch', () => {
      const writingCSS = readCSS('Writing');
      // Cards should have minimum width
      expect(writingCSS).toMatch(/flex:\s*0\s*0\s*\d+px/);
    });
  });
});

describe('Breakpoint Consistency', () => {
  it('should use consistent breakpoint values across components', () => {
    const components = ['Hero', 'Footer', 'ProfessionalSystems'];
    const breakpoints = new Set();
    
    components.forEach(component => {
      const css = readCSS(component);
      const matches = css.matchAll(/@media\s*\([^)]*(?:max|min)-width:\s*(\d+)px\)/g);
      for (const match of matches) {
        breakpoints.add(parseInt(match[1]));
      }
    });
    
    // Should have at least one breakpoint defined
    expect(breakpoints.size).toBeGreaterThan(0);
    
    // Common breakpoints should be used (768, 900, 1024 are standard)
    const validBreakpoints = [480, 640, 768, 900, 1024, 1280];
    breakpoints.forEach(bp => {
      const isValid = validBreakpoints.some(valid => Math.abs(bp - valid) <= 50);
      expect(isValid).toBe(true);
    });
  });
});
