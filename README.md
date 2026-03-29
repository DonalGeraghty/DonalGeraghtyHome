# Minerva (`minerva`)

**Codename: Minerva** — Roman goddess of wisdom, strategic craft, and the arts. This repository is Donal Geraghty’s React/Vite **frontend**; what it hosts can evolve over time. Auth is handled by **Janus** (see the `janus-gate` backend on Cloud Run).

## ✨ Features

### App features
- **Project showcase**: Technical projects and skills (today: portfolio-style sections)
- **Content sections**: Python, R Shiny, and web-related project write-ups
- **Responsive Design**: Beautiful, modern design that works on all devices
- **Theme Support**: Light/dark theme compatibility with smooth transitions
- **Interactive Elements**: 3D background effects and smooth animations

### Authentication
- **Sign in / register**: Main app routes are gated behind login
- **JWT sessions**: Tokens issued by the Janus API (`src/config/api.js`)

## 🚀 Live Demo

- **Main App**: [Your Deployed URL]
- **Auth API (Janus)**: [https://janus-gate-965419436472.europe-west1.run.app/](https://janus-gate-965419436472.europe-west1.run.app/)

## 🛠️ Tech Stack

### Frontend Technologies
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **React Router v6**: Client-side routing
- **CSS3**: Modern styling with backdrop-filter, CSS Grid, Flexbox
- **Three.js**: 3D background effects and animations

### Backend Integration
- **Janus API**: Flask REST service for registration, login, and JWT (`/api/auth/*`)
- **Google Cloud Run**: Serverless container hosting
- **Firestore**: User records (hashed passwords)
- **Fetch API**: Centralized base URL in `src/config/api.js`

### Development Tools
- **Testing**: Jest and React Testing Library
- **Storybook**: Component development and documentation
- **Linting**: ESLint configuration
- **Version Control**: Git with GitHub

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ThemeToggle.jsx # Theme switching component
│   ├── ThreeJSBackground.jsx # 3D background effects
│   ├── SplashSection.jsx # Hero section component
│   ├── AboutSection.jsx # About me section
│   ├── SkillsSection.jsx # Skills showcase
│   ├── PythonProjectsSection.jsx # Python projects
│   ├── RShinyProjectsSection.jsx # R Shiny projects
│   ├── ContactSection.jsx # Contact form
│   ├── FooterSection.jsx # Footer component
│   └── UserInfoSection.jsx # System information
├── pages/              # Page components
│   ├── Home.jsx        # Main landing page
│   └── LoginSplash.jsx # Sign in / register
├── context/            # React context providers
│   ├── ThemeContext.jsx # Theme management
│   └── AuthContext.jsx # Session and Janus API calls
├── config/             # Configuration files
│   └── api.js         # API endpoints and base URLs
├── __tests__/          # Test files
└── App.jsx            # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd minerva
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run test suite
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## 🔧 Configuration

### API Configuration

The application uses a centralized API configuration in `src/config/api.js`:

```javascript
export const API_BASE_URL = 'https://janus-gate-965419436472.europe-west1.run.app'

export const API_ENDPOINTS = {
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_ME: '/api/auth/me',
}
```

### Content / sections

The app includes various sections that can be customized:
- **Personal Information**: Update `AboutSection.jsx` with your details
- **Skills**: Modify `SkillsSection.jsx` to showcase your expertise
- **Projects**: Add new projects to `PythonProjectsSection.jsx` and `RShinyProjectsSection.jsx`
- **Contact**: Update contact information in `ContactSection.jsx`

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_API_BASE_URL=https://your-api-url.com
VITE_APP_TITLE=DonalGeraghty
```

## 📱 Usage

1. Open the site and sign in or create an account on the splash screen.
2. After authentication, browse the site (Home).

## 🌐 Janus API Endpoints

Backend repo (codename **Janus**, GitHub **`janus-gate`**) exposes:

- **`POST /api/auth/register`** — JSON `{ "email", "password" }` (min 8 chars)
- **`POST /api/auth/login`** — same shape; returns JWT
- **`GET /api/auth/me`** — header `Authorization: Bearer <token>`
- **`GET /health`** — health check

### API Architecture

- **Backend**: Flask on Cloud Run
- **Database**: Firestore for users (in-memory fallback locally)
- **Scaling**: Automatic scaling on demand

## 🎨 Customization

### Site & styling

- **Personal information**: Update personal details, bio, and contact information
- **Projects**: Add or change project cards, descriptions, and technologies
- **Skills Section**: Customize skills, expertise levels, and categories
- **Theme**: Modify color schemes and styling in `src/App.css`

### Auth / API

- **Base URL**: Set `API_BASE_URL` in `src/config/api.js` after Cloud Run deploys (hostname follows the service name).

### Component Architecture

All components are modular and can be easily customized or extended. Each component includes:

- Responsive design
- Accessibility features
- Error boundaries
- Loading states
- Theme compatibility

## 📚 Storybook

This project includes Storybook for component development and documentation. Storybook provides an isolated environment to develop and test UI components.

### Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

### Available Stories

- **ThemeToggle**: Interactive theme switching component with light/dark mode examples
- **AboutSection**: About section component
- **SplashSection**: Hero section with animated elements and scroll functionality
- **Navbar**: Navigation component with theme toggle and live time display

### Storybook Features

- **Interactive Controls**: Test different component states and props
- **Theme Support**: Switch between light and dark themes
- **Documentation**: Auto-generated documentation for each component
- **Responsive Testing**: Test components at different screen sizes
- **Accessibility**: Built-in accessibility testing tools

### Adding New Stories

To add a new story for a component:

1. Create a `.stories.jsx` file next to your component
2. Follow the existing story patterns for consistency
3. Include interactive controls and documentation
4. Test both light and dark theme variants

## 🧪 Testing

Run the test suite with:

```bash
npm run test
```

The project includes:
- Unit tests for components
- Integration tests for API calls
- Test utilities and setup files

## 📦 Deployment

### Build for Production

```bash
npm run build
```

### Frontend Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3 + CloudFront**: For enterprise deployments

### Frontend (this repo) on Google Cloud Run

The GitHub Action `.github/workflows/deploy-gcp.yml` deploys **Minerva** as Cloud Run service **`minerva`** and pushes images to Artifact Registry repository **`minerva`**. The GCP **project** id stays `donal-geraghty-home`. After renaming from an older service name, confirm the new service URL in the Google Cloud console.

### Backend Deployment

The **Janus** API is deployed on **Google Cloud Run** (service name `janus-gate` in the backend workflow):
- **Containerization**: Docker-based deployment
- **Auto-scaling**: Automatic scaling based on traffic
- **Global CDN**: Fast response times worldwide
- **Monitoring**: Built-in logging and monitoring

## GitHub repository name

Rename the repository on GitHub to **`minerva`** (Settings → General → Repository name), then point your local remote at it:

```bash
git remote set-url origin https://github.com/<you>/minerva.git
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React team** for the amazing framework
- **Vite team** for the fast build tool
- **Google Cloud Run** for hosting the API
- **Firestore** for the NoSQL database solution
- **Flask** for the Python web framework
- **The open-source community** for inspiration and tools

## 📞 Support

If you have any questions or need help:

- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation and examples

---

**Built with ❤️ using React, Flask, and modern web technologies**
