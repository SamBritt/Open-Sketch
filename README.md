# Open Sketch

Open Sketch is an in-house drawing and painting suite that allows users to create an account, draw and paint, title and categorize their images, and instantly share those paintings at the click of a button. User's can go to the home page to view a list of paintings created by other users, and follow those artist if they want to see more of them!

## Installation

1. In a terminal window, clone down the repo.
2. in the root directory of Open Sketch, make sure and run 
```bash
npm i
```
to install the necessary packages/components. If you have issues with missing dependencies, assuming `npm i` did not work, you can install them independently
```
npm i bulma-extensions
npm i react-canvas-draw
npm i react-color-picker
``` 
## Running Open Sketch
1. Once you have downloaded all the necessary packages/dependencies you'll need two bash windows open
2. In one window in the root directory, run
```
npm start
```
3. In the second window `cd` into `src/api`
4. Execute json-server with the following:
```
json-server -p 8088 -w sketch.json
```
5. Login: JackDraws
   Password: admin

6. Start poking around at Open Sketch! Navigate to your profile and hit `Create Sketch`
