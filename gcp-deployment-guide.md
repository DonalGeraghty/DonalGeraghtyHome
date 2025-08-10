# Google Cloud Platform Deployment Guide

## 🚀 **What We're Setting Up**
- **Cloud Run** - Serverless container hosting
- **Artifact Registry** - Modern Docker image storage (replaces Container Registry)
- **Automatic deployment** on every code push

## 📋 **Prerequisites**

### 1. **Google Cloud Account**
- Sign up at [cloud.google.com](https://cloud.google.com)
- Enable billing (required for Cloud Run)

### 2. **Create a New Project**
```bash
# Install Google Cloud CLI
# https://cloud.google.com/sdk/docs/install

# Create new project
gcloud projects create donal-geraghty-home --name="Donal Geraghty Home"

# Set as default project
gcloud config set project donal-geraghty-home

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 3. **Create Service Account**
```bash
# Create service account
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions Service Account"

# Grant necessary roles
gcloud projects add-iam-policy-binding donal-geraghty-home \
  --member="serviceAccount:github-actions@donal-geraghty-home.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding donal-geraghty-home \
  --member="serviceAccount:github-actions@donal-geraghty-home.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"

gcloud projects add-iam-policy-binding donal-geraghty-home \
  --member="serviceAccount:github-actions@donal-geraghty-home.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Create and download key
gcloud iam service-accounts keys create gcp-key.json \
  --iam-account=github-actions@donal-geraghty-home.iam.gserviceaccount.com
```

## 🔑 **GitHub Secrets Setup**

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name**: `GCP_SA_KEY`
   - **Value**: Copy the entire content of `gcp-key.json`

## ⚙️ **Update Workflow Configuration**

In `.github/workflows/deploy-gcp.yml`, update these values:

```yaml
env:
  PROJECT_ID: donal-geraghty-home  # Your actual project ID
  REGION: europe-west1              # Your preferred region
  SERVICE_NAME: donal-geraghty-home # Your service name
  REPOSITORY: donal-geraghty-home   # Artifact Registry repository name
```

## 🚀 **Deploy**

1. **Commit and push** your changes:
```bash
git add .
git commit -m "Add Google Cloud deployment workflow with Artifact Registry"
git push origin main
```

2. **Check the Actions tab** to see deployment progress

## 🌐 **Your Website Will Be Available At:**
```
https://donal-geraghty-home-[hash]-europe-west1.a.run.app
```

## 💰 **Costs**
- **Cloud Run**: Pay only when requests are served
- **Artifact Registry**: ~$0.026 per GB per month
- **Estimated monthly cost**: $1-5 for low traffic

## 🔧 **Custom Domain (Optional)**

1. **Map custom domain** in Cloud Run console
2. **Update DNS** with your domain provider
3. **SSL certificate** is automatically provisioned

## 📊 **Monitoring**

- **Cloud Run console** - View logs, metrics, and performance
- **Cloud Monitoring** - Set up alerts and dashboards
- **Cloud Logging** - Search and analyze logs

## 🚨 **Troubleshooting**

### Build Fails
- Check if all APIs are enabled (especially `artifactregistry.googleapis.com`)
- Verify service account has correct permissions
- Check the Actions tab for detailed error logs

### Deployment Fails
- Ensure billing is enabled
- Check if project ID is correct
- Verify service account key is properly set in GitHub secrets

### Service Not Accessible
- Check if service is deployed successfully
- Verify the service URL in Cloud Run console
- Check if service allows unauthenticated access

## 🔄 **Migration from Container Registry**

If you were using the old Container Registry:
```bash
# Auto-migrate to Artifact Registry
gcloud artifacts docker upgrade migrate --projects='donal-geraghty-home'
```
