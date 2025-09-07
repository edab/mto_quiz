const { shuffleArray } = require('../../scripts/quiz.js');

describe('shuffleArray', () => {
  test('returns array with same length', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result).toHaveLength(5);
  });

  test('returns array with same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  test('does not modify original array', () => {
    const input = [1, 2, 3, 4, 5];
    const original = [...input];
    shuffleArray(input);
    expect(input).toEqual(original);
  });

  test('handles empty array', () => {
    const result = shuffleArray([]);
    expect(result).toEqual([]);
  });

  test('handles single element array', () => {
    const result = shuffleArray([42]);
    expect(result).toEqual([42]);
  });

  test('produces different order (statistical test)', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let sameOrder = 0;
    
    // Run shuffle 100 times
    for (let i = 0; i < 100; i++) {
      const result = shuffleArray(input);
      if (JSON.stringify(result) === JSON.stringify(input)) {
        sameOrder++;
      }
    }
    
    // Should not be same order more than 5% of the time
    expect(sameOrder).toBeLessThan(5);
  });

  test('works with question objects', () => {
    const questions = [
      { id: 1, question: 'Test 1' },
      { id: 2, question: 'Test 2' },
      { id: 3, question: 'Test 3' }
    ];
    
    const result = shuffleArray(questions);
    expect(result).toHaveLength(3);
    expect(result.every(q => q.id && q.question)).toBe(true);
  });
});
