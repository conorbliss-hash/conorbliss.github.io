/**
 * Validation Tests for Homepage Copy Refinement & Project Deep-Dive Pages
 * 
 * Tests ensure:
 * - Patch A: Homepage copy updates maintain structural invariants
 * - Patch B: Project pages have complete, consistent content
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const siteData = JSON.parse(
  readFileSync(resolve(__dirname, '../src/content/site.json'), 'utf-8')
);
const projectsData = JSON.parse(
  readFileSync(resolve(__dirname, '../src/content/projects.json'), 'utf-8')
);

describe('Patch A - Homepage Copy Updates', () => {
  describe('A1 - Hero Section', () => {
    it('should have judgment-focused headline', () => {
      expect(siteData.hero.headline).toContain('trust decisions');
    });

    it('should have sub-headline about judgment failures', () => {
      expect(siteData.hero.subheadline).toContain('judgment failures');
    });

    it('should preserve CTA buttons', () => {
      expect(siteData.hero.cta.primary).toBeDefined();
      expect(siteData.hero.cta.secondary).toBeDefined();
    });
  });

  describe('A2 - Assertions (Consolidated Trust Signals + Principles)', () => {
    it('should have 5-9 assertions (consolidated from 9 items)', () => {
      expect(siteData.assertions).toBeDefined();
      expect(siteData.assertions.length).toBeGreaterThanOrEqual(5);
      expect(siteData.assertions.length).toBeLessThanOrEqual(9);
    });

    it('should have assertions with claim and explainer fields', () => {
      siteData.assertions.forEach(assertion => {
        expect(assertion.id).toBeDefined();
        expect(assertion.claim).toBeDefined();
        expect(assertion.explainer).toBeDefined();
      });
    });

    it('should cover deterministic-first principle', () => {
      const hasDeterministic = siteData.assertions.some(a => 
        a.claim.toLowerCase().includes('deterministic')
      );
      expect(hasDeterministic).toBe(true);
    });

    it('should cover governance principle', () => {
      const hasGovernance = siteData.assertions.some(a => 
        a.claim.toLowerCase().includes('governance') || 
        a.explainer.toLowerCase().includes('governance')
      );
      expect(hasGovernance).toBe(true);
    });

    it('should cover failure modes principle', () => {
      const hasFailure = siteData.assertions.some(a => 
        a.claim.toLowerCase().includes('failure') ||
        a.explainer.toLowerCase().includes('failure')
      );
      expect(hasFailure).toBe(true);
    });

    it('should have explainers that provide reasoning', () => {
      siteData.assertions.forEach(assertion => {
        expect(typeof assertion.explainer).toBe('string');
        expect(assertion.explainer.length).toBeGreaterThan(50);
      });
    });
  });

  describe('A3 - Featured Work (Health Coach)', () => {
    it('should preserve title unchanged', () => {
      expect(projectsData.marquee.title).toBe('Health Coach');
    });

    it('should preserve tagline unchanged', () => {
      expect(projectsData.marquee.tagline).toBe('Google Fit → Google Sheets');
    });

    it('should have anchor project framing line', () => {
      expect(projectsData.marquee.anchorText).toBe('Featured');
    });

    it('should update problem description with "fully open-source"', () => {
      expect(projectsData.marquee.problem).toContain('fully open-source');
      expect(projectsData.marquee.problem).toContain(
        'personal system that transforms raw activity data'
      );
    });

    it('should preserve tags array', () => {
      expect(projectsData.marquee.tags).toEqual([
        'Open Source',
        'Data Pipeline',
        'Health Tech'
      ]);
    });

    it('should preserve GitHub link', () => {
      expect(projectsData.marquee.github).toBe(
        'https://github.com/conorbliss/health-coach'
      );
    });
  });

  describe('A4 - Professional Systems Framing', () => {
    it('should have exactly 3 professional system cards', () => {
      expect(projectsData.professional).toHaveLength(3);
    });

    it('should have framing text for professional systems', () => {
      expect(projectsData.professionalFraming).toBe('Professional Systems');
    });

    it('should preserve card titles unchanged', () => {
      expect(projectsData.professional[0].title).toBe('AI Workflow Automation');
      expect(projectsData.professional[1].title).toBe('AI Decision Support Systems');
      expect(projectsData.professional[2].title).toBe('Governed Data Systems');
    });

    it('should preserve Problem/Approach/Outcome structure', () => {
      projectsData.professional.forEach(project => {
        expect(project.problem).toBeDefined();
        expect(project.approach).toBeDefined();
        expect(project.outcome).toBeDefined();
      });
    });
  });

  describe('A5 - Operating Principles (Now Part of Assertions)', () => {
    it('should have assertions covering operating principles', () => {
      expect(siteData.assertions).toBeDefined();
      expect(siteData.assertions.length).toBeGreaterThanOrEqual(5);
    });

    it('should have human checkpoints principle', () => {
      const hasHumanCheckpoints = siteData.assertions.some(a => 
        a.claim.toLowerCase().includes('human') || 
        a.explainer.toLowerCase().includes('human')
      );
      expect(hasHumanCheckpoints).toBe(true);
    });

    it('should have validation and auditability principle', () => {
      const hasValidation = siteData.assertions.some(a => 
        a.claim.toLowerCase().includes('validation') ||
        a.claim.toLowerCase().includes('audit') ||
        a.explainer.toLowerCase().includes('audit')
      );
      expect(hasValidation).toBe(true);
    });
  });
});

describe('Patch B - Project Deep-Dive Pages', () => {
  describe('B1 - Template Structure', () => {
    it('should have projectDetails for all 4 projects', () => {
      expect(projectsData.projectDetails['health-coach']).toBeDefined();
      expect(projectsData.projectDetails['workflow-automation']).toBeDefined();
      expect(projectsData.projectDetails['decision-support']).toBeDefined();
      expect(projectsData.projectDetails['governed-data']).toBeDefined();
    });

    it('should have consistent section structure for all projects', () => {
      const requiredSections = ['context', 'systemDesign', 'keyDecisions', 'governanceRisk', 'outcome'];
      
      Object.values(projectsData.projectDetails).forEach(project => {
        requiredSections.forEach(section => {
          expect(project[section]).toBeDefined();
        });
      });
    });

    it('should not contain placeholder text', () => {
      Object.values(projectsData.projectDetails).forEach(project => {
        expect(JSON.stringify(project)).not.toContain('[Placeholder');
      });
    });
  });

  describe('B2 - Content Density Constraints', () => {
    it('should have context as 2-4 sentences', () => {
      Object.values(projectsData.projectDetails).forEach(project => {
        const sentences = project.context.split(/[.!?]+/).filter(s => s.trim().length > 0);
        expect(sentences.length).toBeGreaterThanOrEqual(2);
        expect(sentences.length).toBeLessThanOrEqual(4);
      });
    });

    it('should have 3-5 key decisions bullets', () => {
      Object.values(projectsData.projectDetails).forEach(project => {
        expect(project.keyDecisions.length).toBeGreaterThanOrEqual(3);
        expect(project.keyDecisions.length).toBeLessThanOrEqual(5);
      });
    });

    it('should have 3-5 governance & risk bullets', () => {
      Object.values(projectsData.projectDetails).forEach(project => {
        const bullets = Array.isArray(project.governanceRisk) 
          ? project.governanceRisk 
          : project.governanceRisk.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'));
        
        expect(bullets.length).toBeGreaterThanOrEqual(3);
        expect(bullets.length).toBeLessThanOrEqual(5);
      });
    });

    it('should have 2-4 outcome bullets', () => {
      Object.values(projectsData.projectDetails).forEach(project => {
        const bullets = Array.isArray(project.outcome) 
          ? project.outcome 
          : project.outcome.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'));
        
        expect(bullets.length).toBeGreaterThanOrEqual(2);
        expect(bullets.length).toBeLessThanOrEqual(4);
      });
    });
  });

  describe('B3 - Health Coach (Open Source)', () => {
    const healthCoach = () => projectsData.projectDetails['health-coach'];

    it('should have context about personal health coaching', () => {
      expect(healthCoach().context).toContain('health');
      expect(healthCoach().context).toContain('Google Fit');
    });

    it('should describe system design with clear data flow', () => {
      expect(healthCoach().systemDesign).toContain('Google Fit');
      expect(healthCoach().systemDesign).toContain('Sheets');
    });

    it('should have GitHub link', () => {
      expect(healthCoach().links?.github || projectsData.marquee.github).toBe(
        'https://github.com/conorbliss/health-coach'
      );
    });

    it('should NOT have anonymization disclaimer', () => {
      expect(healthCoach().governanceRisk).not.toContain('No client data shown');
    });
  });

  describe('B3 - Workflow Automation (Anonymised)', () => {
    const workflowAuto = () => projectsData.projectDetails['workflow-automation'];

    it('should have context about reporting burden', () => {
      expect(workflowAuto().context).toContain('report');
    });

    it('should describe deterministic pipeline with AI boundary', () => {
      expect(workflowAuto().systemDesign).toContain('deterministic');
      expect(workflowAuto().systemDesign).toContain('AI');
    });

    it('should have anonymization disclaimer', () => {
      const govRisk = Array.isArray(workflowAuto().governanceRisk)
        ? workflowAuto().governanceRisk.join(' ')
        : workflowAuto().governanceRisk;
      expect(govRisk).toContain('No client data shown');
    });

    it('should NOT have GitHub link', () => {
      expect(workflowAuto().links?.github).toBeUndefined();
    });
  });

  describe('B3 - Decision Support (Anonymised)', () => {
    const decisionSupport = () => projectsData.projectDetails['decision-support'];

    it('should have context about ambiguous questions', () => {
      expect(decisionSupport().context).toContain('business questions');
    });

    it('should describe structured intake and review process', () => {
      expect(decisionSupport().systemDesign).toContain('intake');
      expect(decisionSupport().systemDesign).toContain('review');
    });

    it('should have anonymization disclaimer', () => {
      const govRisk = Array.isArray(decisionSupport().governanceRisk)
        ? decisionSupport().governanceRisk.join(' ')
        : decisionSupport().governanceRisk;
      expect(govRisk).toContain('No client data shown');
    });
  });

  describe('B3 - Governed Data Systems (Anonymised)', () => {
    const governedData = () => projectsData.projectDetails['governed-data'];

    it('should have context about data validation risk', () => {
      expect(governedData().context).toContain('data');
      expect(governedData().context).toContain('risk');
    });

    it('should describe validation and audit layers', () => {
      expect(governedData().systemDesign).toContain('validation');
      expect(governedData().systemDesign).toContain('audit');
    });

    it('should have anonymization disclaimer', () => {
      const govRisk = Array.isArray(governedData().governanceRisk)
        ? governedData().governanceRisk.join(' ')
        : governedData().governanceRisk;
      expect(govRisk).toContain('No client data shown');
    });
  });

  describe('B4 - Navigation and Routing', () => {
    it('should have matching slugs between professional array and projectDetails', () => {
      projectsData.professional.forEach(project => {
        expect(projectsData.projectDetails[project.id]).toBeDefined();
      });
    });

    it('should have health-coach in projectDetails matching marquee id', () => {
      expect(projectsData.projectDetails[projectsData.marquee.id]).toBeDefined();
    });
  });
});
