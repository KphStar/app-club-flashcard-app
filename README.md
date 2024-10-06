# README

To run the app use the command

`pnpm run dev`

Still need to do instructions to compile the app, but when it runs it is not on browser and uses memory for routing!

## Installs

These are in order, but for the instruction we should do them when relevant so that the tech can stick better in peoples minds

### The Usual 

- pnpm 
- VSCode(my libraries are super unorganized, I wlll make this list later)
- Node.js

### Packages (assume "pnpm install "), in order as of now

- **react-router-dom** for memeory routing
- **primereact primeicons primeflex** for third party components
- **bootstrap-grid-ony** I have an idea to remake the mistake I did, we could install bootstrap, then be like, oh why doesn't the theming work. Then explain like imported css, and all that cuz a lot of people are new
- **redux react-redux** Statemanegement

### Create project

#### pnpm create vite@latest electron-study-app

Options once entered

- Other >> electron >> react (something like this)

#### Do the app.tsx and main stuff

This includes

- Setting up Routing
- Setttig up Prime React Provider
- Impoting themes and what not from our libraries

## TODO

Side note: Sounds like a lot, but I've planned it out mentally and on paper, so more familiarity issues then design. I can prob get this done by end of Sunday or Monday. I can write instructions by Tues/Wednesday

- Style Components
- Implement Flashcard Fully
- Implement React Redux
- Implement File Read/Write
  - Once I get this, I can make a create flashcard page, maybe some export/import, and a delete
- Instructions

## High Level

The flashcards will be stored on a file in the sytem. They follow a json like structure with members key, setID, QnA[], etc.. On app instation they are pulled into the store, all data will exist within the store, until explcitly saved, the app is closed, or a checkpoint is reached.

There are 4 Pages to be implemented

*Home Page*: General Home page allowing user to see the current sets and their progress
*Study Page*: This is the page that will allow users to go one by one though cards and study

- Each card will have a correct or wrong, if the question is wrong then the card gets back in queue

*Preview Page*: Allows user to see all of the QnA's inside a set
*Finsih Page*: Displayed once the user has done their studying for the day

The Study Page and Preview page will be routed dynamically based on the setID

There is also a time element which needs to be implemented with system updates, whenever it has been x amount of time since the last completion. This will be based on the one retention study thing.

## Default Instructions from Vite Setup

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
