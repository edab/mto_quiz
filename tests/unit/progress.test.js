const { calculateProgress } = require('../../scripts/quiz.js');

describe('calculateProgress', () => {
  test('calculates progress percentage correctly', () => {
    expect(calculateProgress(0, 10)).toBe(0);
    expect(calculateProgress(5, 10)).toBe(50);
    expect(calculateProgress(10, 10)).toBe(100);
  });

  test('handles different quiz lengths', () => {
    // 10-question practice
    expect(calculateProgress(3, 10)).toBe(30);
    expect(calculateProgress(7, 10)).toBe(70);
    
    // 40-question exam
    expect(calculateProgress(10, 40)).toBe(25);
    expect(calculateProgress(20, 40)).toBe(50);
    expect(calculateProgress(30, 40)).toBe(75);
  });

  test('handles decimal results', () => {
    expect(calculateProgress(1, 3)).toBeCloseTo(33.33, 2);
    expect(calculateProgress(2, 3)).toBeCloseTo(66.67, 2);
    expect(calculateProgress(1, 6)).toBeCloseTo(16.67, 2);
  });

  test('handles edge cases', () => {
    expect(calculateProgress(0, 1)).toBe(0);
    expect(calculateProgress(1, 1)).toBe(100);
  });

  test('validates progress bounds', () => {
    const progress1 = calculateProgress(5, 10);
    const progress2 = calculateProgress(20, 40);
    
    expect(progress1).toBeGreaterThanOrEqual(0);
    expect(progress1).toBeLessThanOrEqual(100);
    expect(progress2).toBeGreaterThanOrEqual(0);
    expect(progress2).toBeLessThanOrEqual(100);
  });

  test('progress increases monotonically', () => {
    const totalQuestions = 10;
    let previousProgress = -1;
    
    for (let i = 0; i <= totalQuestions; i++) {
      const currentProgress = calculateProgress(i, totalQuestions);
      expect(currentProgress).toBeGreaterThanOrEqual(previousProgress);
      previousProgress = currentProgress;
    }
  });
});
