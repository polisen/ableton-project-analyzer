# ![Title](./readme_assets/project_small.png/)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)


### [Live Project Demo](https://ableton-project-analyzer.web.app/)

### Problem Definition:
Currently, the main way to share audio project files between collaborators is by zipping the appropriate project files and sending them over WeTransfer.
This method is cumbersome and does not answer questions about compatibility.


When it comes to many music creation softwares, such as Ableton, I've found, those question are mostly dependent on two main factors.
 - Do both parties have the same plugins?
 - Are all the required files present in the packet?

These questions are what I've set out to answer by creating this interface.

### Caveats:
 - This project is a proof of concept.
 - This project is under rapid development.

### Technical Keypoints

- Web Workers

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
- [x] Stronger Types
- [ ] More unit testing
- [ ] Integration Testing
- [ ] Basic E2E Testing
- [ ] UI Overhaul
  - [ ] Lottie animation on hover
  - [ ] Better presentation
- [ ] Functionality
  - [ ] Project Version
  - [ ] Tempo

