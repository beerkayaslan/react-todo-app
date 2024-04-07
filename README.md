# React Todo App for Playable Factory

This is a simple Todo application built using React, Vite, TypeScript, and various other packages for styling, data management, and HTTP requests. Users can register, log in, and manage their todo list.

## Deployment Status
This project has been successfully deployed on Render.com.

For more information about Render, visit 

[Project Frontend](https://react-todo-app-nd02.onrender.com/)

[Project Backend Swager ](https://todos-api-m88q.onrender.com/api)

## Login Credentials

- **Email:** berkay@mail.com
- **Password:** 123123Ab*


## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast development server and build tool for modern web development.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **shadcnui**: Beautifully designed components that you can copy and paste into your apps. Accessible. 
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Lucide React**: SVG icon library for React.
- **Axios**: Promise-based HTTP client for making asynchronous requests.
- **React Query**: Data fetching and caching library for managing server state.
- **TanStack Table**: Lightweight table component for displaying data in a tabular format.

## Features

- User authentication: Register and log in with a username and password.
- Add new todos with a title and description.
- Mark todos as complete or incomplete.
- Delete todos.
- Edit todo titles and descriptions.

## Getting Started

1. Clone the repository:
1. Install dependencies:
```bash
pnpm install
```

## Running the app

```bash
# development
$ pnpm run dev
```
Open your browser and navigate to http://localhost:3000 to view the app.

## Usage

1. **Register/Login**: Click on the "Register" or "Login" button to create a new account or log in to an existing one.
2. **Adding Todos**: Click on the "Add Todo" button, fill in the title and description, and press "Save".
3. **Marking Todos as Complete/Incomplete**: Toggle the checkbox next to each todo to mark it as complete or incomplete.
4. **Editing Todos**: Click on the edit icon to modify the title or description of a todo.
5. **Deleting Todos**: Click on the delete icon to remove a todo from the list.

## Todo List Operations

This Todo application includes various functionalities to manage the todo list effectively:

### Listing Todos

Todos are listed in a paginated manner to improve the user experience. The application fetches a certain number of todos per page, allowing users to navigate through the list easily.

### Pagination

The pagination feature divides the todo list into multiple pages, reducing clutter and improving performance. Users can navigate between pages to view different sets of todos.

### Filtering

The application provides filtering options to narrow down the todo list based on specific criteria. Users can filter todos by their status (completed/incomplete) or other attributes such as priority or due date.

### Searching

A search functionality is implemented to help users find specific todos quickly. Users can enter keywords or phrases to search for todos containing matching titles or descriptions.

These features enhance the usability of the Todo application, making it easier for users to manage and organize their tasks efficiently.

