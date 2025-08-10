# Testing Documentation

This document provides information about the testing setup and how to run tests for this React website.

## Testing Stack

- **Vitest**: Fast unit test runner
- **React Testing Library**: Testing utilities for React components
- **jsdom**: DOM environment for testing
- **@testing-library/jest-dom**: Custom matchers for DOM testing

## Test Structure

```
src/
├── test/
│   ├── setup.js          # Test environment setup
│   └── test-utils.jsx    # Common test utilities
├── __tests__/
│   └── App.test.jsx      # App component tests
├── components/
│   └── __tests__/        # Component tests
│       ├── AboutSection.test.jsx
│       ├── ContactSection.test.jsx
│       ├── FooterSection.test.jsx
│       ├── ProjectsSection.test.jsx
│       ├── SkillsSection.test.jsx
│       ├── SplashSection.test.jsx
│       └── UserInfoSection.test.jsx
└── pages/
    └── __tests__/
        └── Home.test.jsx  # Home page tests
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Test Coverage

The test suite covers:

### Components
- **UserInfoSection**: 100% coverage including API calls, geolocation, and error handling
- **App**: Navigation, routing, and timer functionality
- **AboutSection**: Basic rendering and structure
- **ContactSection**: Contact information display
- **ProjectsSection**: Project cards and grid layout
- **SkillsSection**: Skills grid and individual skill items
- **SplashSection**: Interactive elements and scroll functionality
- **FooterSection**: Copyright and footer structure

### Pages
- **Home**: Component composition and scroll functionality

## Test Categories

### Unit Tests
- Component rendering
- Props handling
- State management
- Event handling
- Conditional rendering

### Integration Tests
- Component composition
- Navigation flow
- API integration
- Error handling

### Mocking Strategy

#### Browser APIs
- `fetch`: Mocked for IP address retrieval
- `navigator.geolocation`: Mocked for location services
- `navigator` properties: Mocked for browser information
- `window` properties: Mocked for screen and viewport data

#### External Dependencies
- React Router components
- Child components (in page tests)

## Writing Tests

### Basic Component Test Structure
```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ComponentName from '../ComponentName'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Testing Async Operations
```javascript
it('handles async operations', async () => {
  render(<ComponentName />)
  
  await waitFor(() => {
    expect(screen.getByText('Async Content')).toBeInTheDocument()
  })
})
```

### Testing User Interactions
```javascript
it('responds to user clicks', () => {
  const mockHandler = vi.fn()
  render(<ComponentName onClick={mockHandler} />)
  
  fireEvent.click(screen.getByRole('button'))
  expect(mockHandler).toHaveBeenCalledTimes(1)
})
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test Error States**: Always test error handling and edge cases
4. **Mock External Dependencies**: Mock APIs, browser APIs, and external libraries
5. **Keep Tests Simple**: Each test should test one thing
6. **Use Descriptive Test Names**: Test names should clearly describe what is being tested

## Common Patterns

### Testing API Calls
```javascript
beforeEach(() => {
  global.fetch.mockResolvedValue({
    json: () => Promise.resolve({ data: 'test' })
  })
})
```

### Testing Geolocation
```javascript
beforeEach(() => {
  navigator.geolocation.getCurrentPosition.mockImplementation((success) => {
    success({ coords: { latitude: 40, longitude: -74 } })
  })
})
```

### Testing Router Components
```javascript
import { renderWithRouter } from '../test/test-utils'

it('renders with router', () => {
  renderWithRouter(<App />)
  // Test navigation and routing
})
```

## Troubleshooting

### Common Issues

1. **Tests failing due to missing mocks**: Ensure all browser APIs are mocked in `setup.js`
2. **Async test failures**: Use `waitFor` for async operations
3. **Router context errors**: Use `renderWithRouter` utility for components that need router context
4. **Timer-related issues**: Use `vi.useFakeTimers()` and `vi.useRealTimers()` appropriately

### Debugging Tests

- Use `screen.debug()` to see the rendered output
- Use `console.log()` in tests for debugging
- Run tests in watch mode to see immediate feedback
- Use the test UI for better debugging experience

## Continuous Integration

The test suite is designed to run in CI environments:
- All tests are deterministic
- No external dependencies required
- Fast execution time
- Comprehensive coverage reporting
