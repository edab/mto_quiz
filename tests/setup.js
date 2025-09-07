// Mock DOM elements that tests might need
global.document = {
  getElementById: jest.fn(() => ({ style: {}, textContent: '', innerHTML: '' })),
  querySelectorAll: jest.fn(() => [])
};

global.fetch = jest.fn();
