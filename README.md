# Contributions Heatmap

A Next.js web application that visualizes a GitHub user's contributions over the past year in a heatmap, similar to GitHub's activity chart. Users can input a GitHub profile URL, and the app will display the user's name and contribution data in a heatmap format.

### Tech Stack
- **Next.js 14**
- **TypeScript**
- **Chakra UI**
- **React Calendar Heatmap**
- **GraphQL**

### Features

- Input a GitHub profile URL to display the user's actual name and contributions.
- Displays a heatmap of contributions for the last 380 days.
- Responsive and user-friendly interface powered by Chakra UI.
- Secure API requests using a personal GitHub token.

### Requirements

To run this project locally, you will need the following:

- **Node.js** (version 17 or later)
- **GitHub Personal Access Token** (with `public_repo` and `read:user` permissions)

### Installation Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/maazakn/assign-heatmap-visualization
cd assign-heatmap-visualization
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Set up your environment variables
You need a GitHub Personal Access Token to fetch data from GitHub's GraphQL API. Create a `.env.local` file in the root directory and add your GitHub token like this:

```bash
GITHUB_TOKEN=<YOUR_GITHUB_TOKEN_HERE>
```

#### 4. Run the development server

```bash
npm run dev
```
Once the server is up, you can open the app in your browser at: http://localhost:3000

#### 5. Use the app
- Navigate to http://localhost:3000 in your browser.
- Enter a valid GitHub username.
- The app will fetch and display the user's name and their contributions for the last 365 days in a heatmap format.

### Need Help?
For any inquiries, visit https://maaz-ahmed.vercel.app/
