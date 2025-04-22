
# AI MCQ Generator - Frontend

This is the frontend of the AI-powered MCQ generator app built using React. The app allows users to upload PDF or image files, which are then processed to generate multiple-choice questions (MCQs).

## Features
- Upload PDF or image files.
- Display generated MCQs with options.
- Interactive MCQs where users can select options.
- Real-time feedback on correct or wrong answers.
- Display errors for invalid file uploads.

## Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (optional)

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/mitesh21jun/mcq-frontend.git
cd mcq-frontend
```

### 2. Install Dependencies

Run the following command to install all the required dependencies:

```bash
npm install
```

or if you prefer using `yarn`:

```bash
yarn install
```

### 3. Running the Development Server

After the dependencies are installed, start the development server:

```bash
npm start
```

or if using `yarn`:

```bash
yarn start
```

This will start the app on [http://localhost:3000](http://localhost:3000) by default.

### 4. Upload Files

- You can upload PDF or image files.
- The backend API should be running on [http://localhost:5000/api/upload](http://localhost:5000/api/upload) for file processing and MCQ generation.
- Once a file is uploaded, the app will display generated MCQs based on the file content.

### 5. Error Handling

If there are issues with file uploading or any error from the backend, it will be displayed in the form of an error message.

## Built With

- React (v17+)
- Axios for HTTP requests
- CSS for styling

## Deployment

To deploy the app, you can build the production-ready static files using:

```bash
npm run build
```

This will create a `build/` directory that contains the static files for deployment. You can then deploy it to services like Vercel, Netlify, or any static hosting service.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.