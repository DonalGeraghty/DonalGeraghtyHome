# Donal Geraghty Portfolio Website

A modern, responsive portfolio website built with React.js, featuring interactive 3D backgrounds, theme switching capabilities, and smooth animations. This portfolio showcases my skills in web development, data analytics, and R programming.

## 🌐 Live Demo

**Live Website:** [https://donal-geraghty-home-schep5xsoq-ew.a.run.app/](https://donal-geraghty-home-schep5xsoq-ew.a.run.app/)

## 🚀 Features

- **Interactive 3D Backgrounds** - Built with Three.js for engaging visual experiences
- **Dark/Light Theme Toggle** - Seamless theme switching with smooth transitions
- **Responsive Design** - Optimized for all device sizes and screen resolutions
- **Modern UI/UX** - Clean, professional design with smooth animations
- **R Shiny Projects Showcase** - Dedicated section highlighting data analytics projects
- **Portfolio Website Section** - Self-referential showcase of the website itself
- **Parallax Effects** - Dynamic background images with smooth scrolling animations

## 🛠️ Tech Stack

- **Frontend Framework:** React.js 18
- **3D Graphics:** Three.js
- **Build Tool:** Vite
- **Styling:** CSS3 with CSS Variables and Grid/Flexbox
- **Testing:** Vitest + React Testing Library
- **Deployment:** Google Cloud Run via GitHub Actions

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SplashSection   # Landing page with animated elements
│   ├── AboutSection    # Personal introduction
│   ├── PortfolioSection # Portfolio website showcase
│   ├── ProjectsSection # R Shiny projects display
│   ├── ContactSection  # Contact information
│   ├── UserInfoSection # Additional user details
│   ├── FooterSection   # Footer content
│   └── ThemeToggle     # Theme switching component
├── context/            # React context for theme management
├── pages/              # Page-level components
└── __tests__/          # Test files for components
```

## 🎯 Featured Projects

### 🐍 CEX Blu-Ray 4K Crawler
**Automated Web Scraping & Notification System**
- **Technologies:** Python, Playwright, Web Scraping, Automation, Email Notifications, CSV Processing
- **Key Features:** Automated daily crawling, Intelligent diff detection, Email notifications, CSV data persistence, Browser automation, Error handling & recovery
- **GitHub:** [PlaywrightCrawlerWeBuy](https://github.com/DonalGeraghty/PlaywrightCrawlerWeBuy)

### ☕ Java API Testing Framework
**Comprehensive API Testing & Validation System**
- **Technologies:** Java, JUnit, REST Assured, Maven, API Testing, JSON Validation, HTTP Client
- **Key Features:** Response code validation, Header content-type verification, JSON response body assertions, Multi-endpoint testing, Automated test execution, Professional testing practices, Extensible test framework
- **Context:** Built for job application demonstrating professional testing practices
- **Note:** Original Zomato API endpoint no longer available, but includes working demo GIF and comprehensive setup instructions for interviewers with no Java experience
- **GitHub:** [JavaApiTesting](https://github.com/DonalGeraghty/JavaApiTesting)

### 📊 R Shiny Clustering Application
**Interactive K-means Clustering on Iris Dataset**
- **Technologies:** R, R Shiny, ggplot2, Statistical Analysis, Machine Learning
- **Key Features:** Interactive clustering, PCA visualization, Confusion matrix analysis, Real-time parameter adjustment, Responsive web interface
- **GitHub:** [R-Shiny-Clustering](https://github.com/DonalGeraghty/R-Shiny-Clustering)
- **Live Demo:** [Clustering Iris Data](https://donalgeraghty.shinyapps.io/Clustering_Iris_Data/)

### 📈 R Shiny Data Explorer
**Interactive Data Analysis & Visualization Tool**
- **Technologies:** R, R Shiny, Data Manipulation, Statistical Analysis, Interactive Visualizations
- **Key Features:** CSV data upload, Interactive charts, Statistical summaries, Data filtering, Export capabilities, Responsive design
- **GitHub:** [R-Shiny-ExploreData](https://github.com/DonalGeraghty/R-Shiny-ExploreData)
- **Live Demo:** [CSV Reader](https://donalgeraghty.shinyapps.io/CSVReader/)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/DonalGeraghty/DonalGeraghtyHome.git
   cd DonalGeraghtyHome
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run test suite
- `npm run test:ui` - Run tests with UI

## 🧪 Testing

The project includes comprehensive testing with Vitest and React Testing Library:
- **85 tests passing** across all components
- Component rendering tests
- User interaction tests
- Accessibility tests
- Responsive design tests

## 🚀 Deployment

This project is automatically deployed to **Google Cloud Run** via **GitHub Actions**:

- **Hosting:** [https://donal-geraghty-home-schep5xsoq-ew.a.run.app/](https://donal-geraghty-home-schep5xsoq-ew.a.run.app/)
- **CI/CD:** GitHub Actions automatically builds and deploys on every push to master
- **Platform:** Google Cloud Run for scalable, serverless hosting
- **Domain:** Custom subdomain on Google Cloud

### Deployment Flow
1. Code is pushed to `master` branch
2. GitHub Actions automatically triggers
3. Builds the production bundle with Vite
4. Deploys to Google Cloud Run
5. Website is updated with latest changes

## 🎨 Customization

### Theme System
The portfolio uses CSS variables for easy theming:
- Light and dark theme support
- Smooth transitions between themes
- Consistent color scheme across components

### Adding New Sections
1. Create a new component in `src/components/`
2. Add it to `src/pages/Home.jsx`
3. Style it using the existing CSS framework
4. Add corresponding tests

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-first approach
- CSS Grid and Flexbox layouts
- Media queries for different screen sizes
- Touch-friendly interactions
- Optimized for all devices

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email:** [Your Email]
- **GitHub:** [@DonalGeraghty](https://github.com/DonalGeraghty)
- **Portfolio:** [https://donal-geraghty-home-schep5xsoq-ew.a.run.app/](https://donal-geraghty-home-schep5xsoq-ew.a.run.app/)

---

Built with ❤️ using React.js, Three.js, and modern web technologies.

