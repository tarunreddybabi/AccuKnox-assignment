# accuKnox-assignment

This is a dynamic dashboard application built using React. The dashboard allows users to add, remove, and manage widgets within different categories like CSPM, CWPP, and Registry Scan. The UI is fully customizable, and the widgets are dynamically rendered based on the provided JSON structure.


## Features
- Add and remove widgets within different categories.
- Customize widget content and appearance.
- Responsive design for both desktop and mobile views.

## Prerequisites
- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)


## Installation

1. **Clone the repository**:
   ```bash
git clone https://github.com/tarunreddybabi/accuKnox-assignment.git
cd accuKnox-assignment
npm install
# OR
yarn install

## Running the Application

1. **Start the development server**:
   ```bash
   npm start
   # OR
   yarn start

Open your browser:
Visit http://localhost:3000 to see the application in action.
Copy code

### 7. Project Structure

```markdown
## Project Structure

├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── Dashboard.js
│   │   ├── AddWidgetDrawer.js
│   │   └── ...
│   ├── store
│   │   ├── dashboardSlice.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── README.md
└── ...

### 8. Usage Instructions

```markdown
## Usage

- **Adding Widgets**: Click on the "Add Widget" button within any category to add a new widget.
- **Removing Widgets**: Uncheck a widget from the list in the drawer to remove it from the dashboard.


