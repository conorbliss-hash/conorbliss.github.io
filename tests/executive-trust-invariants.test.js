/**
 * Executive Trust Asset Invariants
 * 
 * Tests ensure website positions for executive audience, not builder portfolio.
 * Based on Content Operating Manual positioning.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const siteData = JSON.parse(
  readFileSync(resolve(__dirname, '../src/content/site.json'), 'utf-8')
);
const projectsData = JSON.parse(
  readFileSync(resolve(__dirname, '../src/content/projects.json'), 'utf-8')
);

// Helper: Check if text contains forbidden tech stack terms as standalone credibility
const FORBIDDEN_TECH_TAGS = ['Python', 'JavaScript', 'SQL', 'React', 'Node', 'TypeScript', 'CSS', 'HTML', 'API'];
const ALLOWED_DOMAIN_TAGS = ['AI Governance', 'Decision Architecture', 'Operating Model', 'Enablement', 'Data Authority', 'Validation', 'Audit', 'Governance', 'Risk Prevention'];

// Helper: Check for hedging language
const HEDGING_WORDS = ['might', 'could', 'sometimes', 'perhaps', 'maybe', 'possibly', 'potentially'];

describe('INV-1: Narrative Spine Visibility', () => {
  it('should have declarative claim in hero', () => {
    expect(siteData.hero.narrativeSpine).toBeDefined();
  });

  it('should align claim with organizational failure framing', () => {
    const spine = siteData.hero.narrativeSpine;
    // Must reference decisions, risk, boundaries, or automation
    const alignedTerms = ['decision', 'risk', 'boundar', 'automation', 'data', 'forcing'];
    const hasAlignment = alignedTerms.some(term => 
      spine.toLowerCase().includes(term)
    );
    expect(hasAlignment).toBe(true);
  });

  it('should not contain hedging language in narrative spine', () => {
    const spine = siteData.hero.narrativeSpine?.toLowerCase() || '';
    HEDGING_WORDS.forEach(word => {
      expect(spine).not.toContain(word);
    });
  });
});

describe('INV-2: Domain Tags Over Tech Tags', () => {
  it('should have domain tags on marquee project', () => {
    expect(projectsData.marquee.domainTags).toBeDefined();
    expect(projectsData.marquee.domainTags.length).toBeGreaterThanOrEqual(2);
    expect(projectsData.marquee.domainTags.length).toBeLessThanOrEqual(4);
  });

  it('should not have forbidden tech stack tags on marquee', () => {
    const tags = projectsData.marquee.domainTags || [];
    tags.forEach(tag => {
      FORBIDDEN_TECH_TAGS.forEach(forbidden => {
        expect(tag).not.toBe(forbidden);
      });
    });
  });

  it('should have domain tags on all professional system cards', () => {
    projectsData.professional.forEach(project => {
      expect(project.domainTags).toBeDefined();
      expect(project.domainTags.length).toBeGreaterThanOrEqual(2);
      expect(project.domainTags.length).toBeLessThanOrEqual(4);
    });
  });

  it('should not have forbidden tech stack tags on professional cards', () => {
    projectsData.professional.forEach(project => {
      const tags = project.domainTags || [];
      tags.forEach(tag => {
        FORBIDDEN_TECH_TAGS.forEach(forbidden => {
          expect(tag).not.toBe(forbidden);
        });
      });
    });
  });
});

describe('INV-3: Organizational Bridge for Personal Projects', () => {
  it('should have bridge text for Health Coach', () => {
    expect(projectsData.marquee.organizationalBridge).toBeDefined();
  });

  it('should bridge text reference organizational relevance', () => {
    const bridge = projectsData.marquee.organizationalBridge?.toLowerCase() || '';
    const orgTerms = ['organization', 'scale', 'governance', 'principles', 'professional', 'enterprise'];
    const hasBridge = orgTerms.some(term => bridge.includes(term));
    expect(hasBridge).toBe(true);
  });
});

describe('INV-4: Risk-First Framing on Professional Cards', () => {
  it('should have riskPrevented field on all professional cards', () => {
    projectsData.professional.forEach(project => {
      expect(project.riskPrevented).toBeDefined();
      expect(project.riskPrevented.length).toBeGreaterThan(10);
    });
  });

  it('should frame risk as organizational concern', () => {
    projectsData.professional.forEach(project => {
      const risk = project.riskPrevented?.toLowerCase() || '';
      // Should mention risk, failure, break, or downstream impact
      const riskTerms = ['risk', 'fail', 'break', 'downstream', 'trust', 'audit', 'compliance'];
      const hasRiskFraming = riskTerms.some(term => risk.includes(term));
      expect(hasRiskFraming).toBe(true);
    });
  });
});

describe('INV-5: No Meta/Scaffolding Text', () => {
  // This is validated by checking components don't render these
  // The actual removal was done in previous commits
  
  it('should not have section numbers in site data', () => {
    const siteString = JSON.stringify(siteData);
    expect(siteString).not.toMatch(/"0[1-4]"/);
  });

  it('should not have "Trust Signals" as a visible label', () => {
    const siteString = JSON.stringify(siteData);
    expect(siteString).not.toContain('"Trust Signals"');
  });
});

describe('INV-6: Executive Forwardability', () => {
  it('should have assertions with claims under 15 words each', () => {
    siteData.assertions.forEach(assertion => {
      const wordCount = assertion.claim.split(/\s+/).length;
      expect(wordCount).toBeLessThanOrEqual(15);
    });
  });

  it('should not contain internal process jargon', () => {
    const jargonTerms = ['sprint', 'standup', 'backlog', 'kanban', 'agile', 'scrum', 'PR', 'merge'];
    const allText = JSON.stringify(siteData).toLowerCase();
    jargonTerms.forEach(term => {
      expect(allText).not.toContain(term);
    });
  });
});

describe('INV-7: Visual Text Dominance (Data Structure)', () => {
  it('should have headline as primary text element', () => {
    expect(siteData.hero.headline).toBeDefined();
    expect(siteData.hero.headline.length).toBeGreaterThan(10);
  });

  it('should have narrative spine as secondary emphasis', () => {
    expect(siteData.hero.narrativeSpine).toBeDefined();
  });
});

describe('INV-8: Substance Above Fold (Data Readiness)', () => {
  it('should have marquee project ready for immediate render', () => {
    expect(projectsData.marquee).toBeDefined();
    expect(projectsData.marquee.title).toBeDefined();
    expect(projectsData.marquee.domainTags).toBeDefined();
  });
});

describe('INV-9: Domain Tag Consistency', () => {
  it('should have consistent tag format across all projects', () => {
    const allTags = [
      ...(projectsData.marquee.domainTags || []),
      ...projectsData.professional.flatMap(p => p.domainTags || [])
    ];
    
    allTags.forEach(tag => {
      // Tags should be Title Case or specific allowed format
      expect(tag.length).toBeGreaterThan(2);
      expect(tag.length).toBeLessThan(30);
    });
  });
});

describe('INV-10: Assertions Constraints', () => {
  it('should have 5-9 assertions (consolidated)', () => {
    expect(siteData.assertions.length).toBeGreaterThanOrEqual(5);
    expect(siteData.assertions.length).toBeLessThanOrEqual(9);
  });

  it('should have assertions with proper structure', () => {
    siteData.assertions.forEach(assertion => {
      expect(typeof assertion.claim).toBe('string');
      expect(typeof assertion.explainer).toBe('string');
    });
  });
});

describe('INV-11: Project Card Content Density', () => {
  it('should have 2-4 domain tags per project', () => {
    const allProjects = [projectsData.marquee, ...projectsData.professional];
    allProjects.forEach(project => {
      if (project.domainTags) {
        expect(project.domainTags.length).toBeGreaterThanOrEqual(2);
        expect(project.domainTags.length).toBeLessThanOrEqual(4);
      }
    });
  });

  it('should have concise problem/risk statements (under 20 words)', () => {
    projectsData.professional.forEach(project => {
      if (project.riskPrevented) {
        const wordCount = project.riskPrevented.split(/\s+/).length;
        expect(wordCount).toBeLessThanOrEqual(20);
      }
    });
  });
});

describe('Content Operating Manual Alignment', () => {
  it('should reinforce enablement positioning', () => {
    const allText = JSON.stringify(siteData).toLowerCase();
    const enablementTerms = ['enablement', 'operating', 'governance', 'decision'];
    const hasEnablementSignal = enablementTerms.some(term => allText.includes(term));
    expect(hasEnablementSignal).toBe(true);
  });

  it('should not emphasize tool evangelism', () => {
    const allText = JSON.stringify(siteData).toLowerCase();
    const toolTerms = ['best tool', 'favorite framework', 'must-use', 'game-changer'];
    toolTerms.forEach(term => {
      expect(allText).not.toContain(term);
    });
  });

  it('should signal senior judgment through assertions', () => {
    expect(siteData.assertions).toBeDefined();
    expect(siteData.assertions.length).toBeGreaterThanOrEqual(5);
    
    // Claims should be declarative (no hedging)
    siteData.assertions.forEach(assertion => {
      HEDGING_WORDS.forEach(word => {
        expect(assertion.claim.toLowerCase()).not.toContain(word);
      });
    });
  });
});
