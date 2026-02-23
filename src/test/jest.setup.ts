import '@testing-library/jest-dom';

// Clear localStorage before each test so atomWithStorage atoms always
// initialise from their declared defaults, not from a previous test's writes.
beforeEach(() => {
  localStorage.clear();
});
