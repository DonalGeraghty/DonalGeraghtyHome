# Donal Geraghty - Portfolio & URL Shortener

A modern, responsive portfolio website featuring a URL shortening web application built with React and Vite. The portfolio showcases various projects including Python web applications, R Shiny dashboards, and a full-stack URL shortener service.

## ✨ Features

### Portfolio Features
- **Professional Portfolio**: Showcase of technical projects and skills
- **Project Showcase**: Detailed information about Python, R Shiny, and web development projects
- **Responsive Design**: Beautiful, modern design that works on all devices
- **Theme Support**: Light/dark theme compatibility with smooth transitions
- **Interactive Elements**: 3D background effects and smooth animations

### URL Shortener Features
- **URL Shortening**: Convert long URLs into short, manageable links
- **Automatic Redirects**: Seamless redirection from short URLs to original destinations
- **Dynamic Domain Detection**: Automatically adapts to localhost and production environments
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Visual feedback during API operations

## 🚀 Live Demo

- **Main App**: [Your Deployed URL]
- **API**: [https://url-shortener-api-965419436472.europe-west1.run.app/](https://url-shortener-api-965419436472.europe-west1.run.app/)

## 🛠️ Tech Stack

### Frontend Technologies
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **React Router v6**: Client-side routing
- **CSS3**: Modern styling with backdrop-filter, CSS Grid, Flexbox
- **Three.js**: 3D background effects and animations

### Backend Integration
- **Flask API**: Python-based REST API for URL shortening
- **Google Cloud Run**: Serverless container hosting
- **Firestore**: NoSQL database for URL storage
- **Fetch API**: HTTP client with centralized configuration

### Development Tools
- **Testing**: Jest and React Testing Library
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
│   ├── UrlShortener.jsx # URL shortening form
│   └── UrlRedirect.jsx # Redirect handling page
├── context/            # React context providers
│   └── ThemeContext.jsx # Theme management
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
   cd DonalGeraghtyHome
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

## 🔧 Configuration

### API Configuration

The application uses a centralized API configuration in `src/config/api.js`:

```javascript
export const API_BASE_URL = 'https://url-shortener-api-965419436472.us-central1.run.app'

export const API_ENDPOINTS = {
  CREATE_SHORT_URL: '/api/data',
  GET_LONG_URL: '/api/url'
}
```

### Portfolio Configuration

The portfolio includes various sections that can be customized:
- **Personal Information**: Update `AboutSection.jsx` with your details
- **Skills**: Modify `SkillsSection.jsx` to showcase your expertise
- **Projects**: Add new projects to `PythonProjectsSection.jsx` and `RShinyProjectsSection.jsx`
- **Contact**: Update contact information in `ContactSection.jsx`

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_API_BASE_URL=https://your-api-url.com
VITE_APP_TITLE=URL Shortener
```

## 📱 Usage

### Creating Short URLs

1. Navigate to the URL Shortener page
2. Enter a long URL in the input field
3. Click "Shorten URL"
4. Copy the generated short URL

### Using Short URLs

1. Share the short URL with others
2. When someone visits the short URL, they're automatically redirected
3. The redirect happens seamlessly with a loading indicator

## 🌐 API Endpoints

The URL shortener service provides the following REST API endpoints:

- **`POST /api/data`**: Create a shortened URL
  - Request body: `{"text": "https://example.com"}`
  - Response: Short code (e.g., "d75277")

- **`GET /api/url/{shortCode}`**: Get long URL from short code
  - Response: `{"long_url": "https://example.com", "short_code": "d75277", "status": "success"}`

### API Architecture

- **Backend**: Flask-based Python API
- **Database**: Google Firestore for URL storage
- **Hosting**: Google Cloud Run for serverless deployment
- **Scaling**: Automatic scaling based on demand

## 🎨 Customization

### Portfolio Customization

- **Personal Information**: Update personal details, bio, and contact information
- **Project Showcase**: Add new projects, update descriptions, and modify technologies
- **Skills Section**: Customize skills, expertise levels, and categories
- **Theme**: Modify color schemes and styling in `src/App.css`

### URL Shortener Customization

- **Styling**: The application uses CSS custom properties for theming
- **API Configuration**: Update endpoints and base URLs in `src/config/api.js`
- **Form Validation**: Customize input validation and error messages

### Component Architecture

All components are modular and can be easily customized or extended. Each component includes:

- Responsive design
- Accessibility features
- Error boundaries
- Loading states
- Theme compatibility

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

### Backend Deployment

The URL shortener API is deployed on **Google Cloud Run**:
- **Containerization**: Docker-based deployment
- **Auto-scaling**: Automatic scaling based on traffic
- **Global CDN**: Fast response times worldwide
- **Monitoring**: Built-in logging and monitoring

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
