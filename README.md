# Ableton Project Analyzer

Currently, the main way to share audio project files between collaborators is by zipping the appropriate project files and sending them over WeTransfer.
This method is cumbersome and does not answer questions about compatibility.

When it comes to many music creation softwares, such as Ableton, I've found, those question are mostly dependent on two main factors.
 - Do both parties have the same plugins?
 - Are all the required files present in the packet?

These questions are what I've set out to answer by creating this interface.

###Caveats:
 - This project is a proof of concept.
 - This project is under rapid development.
 - Some additional documentation is provided within the code - especially within the useAbletonAnalyzer.functions.ts file.

### Technical Keypoints
 - React
 - Redux
 - Web Workers
 - Unit Testing
 - TypeScript
 - Custom Styling
 - Custom Hooks
 - Recursive Algorithm Design

### Instructions
- `git clone https://github.com/polisen/ableton-project-analyzer.git`
- install, start
  - tests are available
- Drag and drop folder from ./test_project on to area in UI.
  - More test projects are available here: TBD
  - Red cross on project means that not all the audio samples referenced in the project were found within the files provided.

### Short Term Todo
- [ ] Stronger Types
- [ ] More unit testing
- [ ] Integration Testing
- [ ] Basic E2E Testing
- [ ] UI Overhaul
  - [ ] Lottie animation on hover
  - [ ] Better presentation
- [ ] Adding more test projects
- [ ] One-Click demo 
- [ ] Functionality
  - [ ] Project Version
  - [ ] Tempo

