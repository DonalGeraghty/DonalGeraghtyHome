# GitHub Pages Deployment Guide

## Prerequisites
1. Your repository must be public (or you need GitHub Pro for private repos)
2. You need to have push access to the repository

## Setup Steps

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "gh-pages" branch
6. Click "Save"

### 2. Update Repository Name
In `package.json`, replace `yourusername` with your actual GitHub username:
```json
"homepage": "https://yourusername.github.io/DonalGeraghtyHome"
```

### 3. Push Your Changes
```bash
git add .
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

## How It Works

1. **Automatic Trigger**: The workflow runs every time you push to `main` or `master` branch
2. **Build Process**: 
   - Installs dependencies
   - Runs tests
   - Builds the production version
3. **Deployment**: Deploys to the `gh-pages` branch
4. **GitHub Pages**: Serves your app from the `gh-pages` branch

## Custom Domain (Optional)
If you have a custom domain:
1. Add it to the `cname` field in `.github/workflows/deploy.yml`
2. Configure your DNS settings
3. Add the domain in GitHub Pages settings

## Troubleshooting

### Build Fails
- Check the Actions tab for error logs
- Ensure all tests pass locally with `npm test`
- Verify all dependencies are in `package.json`

### Page Not Loading
- Wait a few minutes for deployment to complete
- Check if the `gh-pages` branch was created
- Verify GitHub Pages is enabled and pointing to `gh-pages` branch

### 404 Errors
- Ensure the `base` path in `vite.config.js` matches your repository name
- Check that the `homepage` in `package.json` is correct
