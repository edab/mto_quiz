const { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage } = require('../../scripts/quiz.js');

// Mock localStorage
const localStorageMock = {
  store: {},
  getItem: jest.fn((key) => localStorageMock.store[key] || null),
  setItem: jest.fn((key, value) => {
    localStorageMock.store[key] = value;
  }),
  removeItem: jest.fn((key) => {
    delete localStorageMock.store[key];
  }),
  clear: jest.fn(() => {
    localStorageMock.store = {};
  })
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

// Mock console.error to avoid noise in test output
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('Local Storage Functions', () => {
  beforeEach(() => {
    localStorageMock.store = {};
    jest.clearAllMocks();
    // Reset localStorage methods to default behavior
    localStorageMock.getItem.mockImplementation((key) => localStorageMock.store[key] || null);
    localStorageMock.setItem.mockImplementation((key, value) => {
      localStorageMock.store[key] = value;
    });
    localStorageMock.removeItem.mockImplementation((key) => {
      delete localStorageMock.store[key];
    });
  });

  describe('saveToLocalStorage', () => {
    test('saves simple data successfully', () => {
      const result = saveToLocalStorage('test-key', 'test-value');
      
      expect(result).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith('test-key', '"test-value"');
    });

    test('saves complex objects', () => {
      const testData = {
        score: 8,
        totalQuestions: 10,
        timestamp: Date.now(),
        chapters: [1, 2, 3]
      };
      
      const result = saveToLocalStorage('quiz-results', testData);
      
      expect(result).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith('quiz-results', JSON.stringify(testData));
    });

    test('handles localStorage errors gracefully', () => {
      localStorage.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      
      const result = saveToLocalStorage('test-key', 'test-value');
      
      expect(result).toBe(false);
    });
  });

  describe('loadFromLocalStorage', () => {
    test('loads existing data successfully', () => {
      const testData = { score: 9, total: 10 };
      localStorageMock.store['quiz-data'] = JSON.stringify(testData);
      
      const result = loadFromLocalStorage('quiz-data');
      
      expect(result).toEqual(testData);
      expect(localStorage.getItem).toHaveBeenCalledWith('quiz-data');
    });

    test('returns null for non-existent keys', () => {
      const result = loadFromLocalStorage('non-existent-key');
      
      expect(result).toBeNull();
    });

    test('handles corrupted JSON gracefully', () => {
      localStorageMock.store['corrupted-key'] = 'invalid-json{';
      
      const result = loadFromLocalStorage('corrupted-key');
      
      expect(result).toBeNull();
    });

    test('handles localStorage errors gracefully', () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage access denied');
      });
      
      const result = loadFromLocalStorage('test-key');
      
      expect(result).toBeNull();
    });
  });

  describe('clearLocalStorage', () => {
    test('removes data successfully', () => {
      localStorageMock.store['test-key'] = 'test-value';
      
      const result = clearLocalStorage('test-key');
      
      expect(result).toBe(true);
      expect(localStorage.removeItem).toHaveBeenCalledWith('test-key');
    });

    test('handles removal errors gracefully', () => {
      localStorage.removeItem.mockImplementation(() => {
        throw new Error('Storage access denied');
      });
      
      const result = clearLocalStorage('test-key');
      
      expect(result).toBe(false);
    });
  });

  describe('Integration tests', () => {
    test('save and load cycle works correctly', () => {
      const testData = {
        userProgress: {
          chapter1: { correct: 15, total: 20 },
          chapter2: { correct: 18, total: 25 },
          overallScore: 85
        }
      };
      
      // Save data
      const saveResult = saveToLocalStorage('user-progress', testData);
      expect(saveResult).toBe(true);
      
      // Load data
      const loadResult = loadFromLocalStorage('user-progress');
      expect(loadResult).toEqual(testData);
      
      // Clear data
      const clearResult = clearLocalStorage('user-progress');
      expect(clearResult).toBe(true);
      
      // Verify cleared
      const loadAfterClear = loadFromLocalStorage('user-progress');
      expect(loadAfterClear).toBeNull();
    });
  });
});
