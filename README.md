# MTO Quiz - Ontario Driver's Handbook Practice Test

## Introduction

This is an initial iteration of a simple web-based practice test designed to help improve preparation for the official MTO (Ministry of Transportation Ontario) G1 knowledge test. The application provides an interactive quiz experience that simulates the format and style of the actual driving test, helping users familiarize themselves with the types of questions they'll encounter.

## How to Access

The quiz is available through GitHub Pages at: `https://edab.github.io/mto_quiz`

Simply open the link in your web browser to start practicing immediately - no installation required.

## How It Works

### Quiz Format
- **10 randomly selected questions** per test session
- **Multiple choice format** with 4 options (A, B, C, D)
- **80% passing score** (8 out of 10 questions correct)
- **Immediate feedback** after each answer with correct/incorrect indication
- **Study references** showing which chapter of the handbook covers each topic

### Features
- **Progress tracking** with visual progress bar
- **Instant results** with detailed scoring and performance feedback
- **Study tips** and preparation advice for the actual test
- **Responsive design** that works on desktop and mobile devices
- **Restart capability** to take multiple practice tests

### Question Coverage
The quiz covers all major topics from the MTO Driver's Handbook including:
- Traffic laws and regulations
- Safe driving practices
- Road signs and signals
- Vehicle operation and maintenance
- Driver responsibilities and licensing requirements

## Complete Coverage Summary (500 Questions Total)

### Enhanced Coverage by Chapter:

**Chapter 1 - Signs, Signals & Road Markings: ~85 questions**
- All sign types, shapes, colors, and meanings
- Road markings, lines, and painted symbols
- Traffic signals and lane control signals
- Parking signs and restrictions
- Specialized signs (HOV, disabled, electric vehicle, etc.)

**Chapter 2 - Your Driver's Licence: ~60 questions**
- Complete G1, G2, G licensing process
- All restrictions and requirements
- Medical conditions and reporting
- Renewal procedures and timelines
- International licensing requirements

**Chapter 3 - Getting Ready to Drive: ~65 questions**
- Comprehensive vehicle maintenance
- All fluid checks and tire care
- Pre-trip inspections
- Warning lights and troubleshooting
- Emergency equipment

**Chapter 4 - Safe and Responsible Driving: ~115 questions**
- All weather conditions (rain, snow, fog, ice)
- Night driving techniques
- Following distances and speed management
- Skid recovery and emergency maneuvers
- Stopping distances and brake systems
- Carbon monoxide and health hazards

**Chapter 5 - Traffic Laws: ~125 questions**
- All right-of-way scenarios
- Complex intersection situations
- Highway merging and lane changes
- Speed limits in all zones
- Passing rules and restrictions

**Chapter 6 - Parking: ~50 questions**
- All parking scenarios and measurements
- Hill parking procedures
- Parking restrictions and violations
- Special parking situations

**Chapter 7 - Emergency Situations: ~40 questions**
- All vehicle breakdown scenarios
- Collision procedures and requirements
- Roadside safety procedures
- Emergency equipment usage

**Chapter 8 - Sharing the Road: ~65 questions**
- All vulnerable road users
- Emergency vehicles and procedures
- Commercial vehicle interactions
- Aggressive driving and road rage
- Distracted and impaired driving
- Environmental considerations

**Chapter 9 - Penalties: ~35 questions**
- Complete fine and demerit structure
- All violation consequences
- Licence suspension procedures

This comprehensive question bank covers virtually all testable content from the MTO Driver's Handbook, including edge cases, detailed scenarios, and nuanced situations that could appear on the actual G1 knowledge test.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Testing

The project includes comprehensive testing to ensure reliability and catch regressions during development.

### Test Types

**Unit Tests**
- Test individual functions and logic components
- Focus on quiz functionality like question shuffling, scoring, and data handling
- Run with Jest framework

**End-to-End Tests** *(Planned)*
- Test complete user workflows and interactions
- Verify cross-device compatibility and responsive design
- Run with Playwright framework

### Running Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Run end-to-end tests (when implemented)
npm run test:e2e

# Run all tests
npm run test:all
```

### Test Coverage

Current test coverage includes:
- Question shuffling algorithm validation
- Array manipulation and data integrity
- Edge case handling (empty arrays, single elements)
- Statistical randomness verification

### Development Workflow

Tests are automatically run to ensure code quality and prevent regressions when adding new features or modifying existing functionality.

## Reference

This practice test is based on:
- [Official MTO Driver's Handbook](https://www.ontario.ca/document/official-mto-drivers-handbook#)
- [Sample Knowledge Test Questions](https://www.ontario.ca/document/official-mto-drivers-handbook/test-yourself-sample-knowledge-test-questions)

**Note:** This is an unofficial practice tool. For the most current information and official test preparation materials, always refer to the official MTO resources above.
