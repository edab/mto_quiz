const { calculateScore } = require('../../scripts/quiz.js');

describe('calculateScore', () => {
  test('calculates percentage correctly', () => {
    expect(calculateScore(8, 10)).toBe(80);
    expect(calculateScore(7, 10)).toBe(70);
    expect(calculateScore(10, 10)).toBe(100);
    expect(calculateScore(0, 10)).toBe(0);
  });

  test('rounds to nearest integer', () => {
    expect(calculateScore(1, 3)).toBe(33); // 33.33... rounded to 33
    expect(calculateScore(2, 3)).toBe(67); // 66.66... rounded to 67
    expect(calculateScore(5, 6)).toBe(83); // 83.33... rounded to 83
  });

  test('handles edge cases', () => {
    expect(calculateScore(0, 1)).toBe(0);
    expect(calculateScore(1, 1)).toBe(100);
  });

  test('handles different quiz lengths', () => {
    // 40-question exam format
    expect(calculateScore(32, 40)).toBe(80);
    expect(calculateScore(36, 40)).toBe(90);
    
    // 20-question format
    expect(calculateScore(16, 20)).toBe(80);
    expect(calculateScore(18, 20)).toBe(90);
  });

  test('validates passing scores', () => {
    const passingThreshold = 80;
    
    expect(calculateScore(8, 10)).toBeGreaterThanOrEqual(passingThreshold);
    expect(calculateScore(32, 40)).toBeGreaterThanOrEqual(passingThreshold);
    expect(calculateScore(7, 10)).toBeLessThan(passingThreshold);
    expect(calculateScore(31, 40)).toBeLessThan(passingThreshold);
  });
});
