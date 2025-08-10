# Google Cloud Authentication Troubleshooting

## 🚨 **Common Authentication Issues**

### 1. **"You do not currently have an active account selected"**

This error means the service account credentials aren't properly configured.

#### **Check Your GitHub Secrets:**
1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Verify `GCP_SA_KEY` exists and contains the full JSON content
3. The JSON should look like:
   ```json
   {
     "type": "service_account",
     "project_id": "donal-geraghty-home",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "github-actions@donal-geraghty-home.iam.gserviceaccount.com",
     "client_id": "...",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/github-actions%40donal-geraghty-home.iam.gserviceaccount.com"
   }
   ```

#### **Recreate the Service Account Key:**
```bash
# Delete old key
gcloud iam service-accounts keys delete KEY_ID --iam-account=github-actions@donal-geraghty-home.iam.gserviceaccount.com

# Create new key
gcloud iam service-accounts keys create gcp-key.json --iam-account=github-actions@donal-geraghty-home.iam.gserviceaccount.com

# Copy the content and update GitHub secret
```

### 2. **Service Account Permissions**

Ensure your service account has these roles:
```bash
# Check current roles
gcloud projects get-iam-policy donal-geraghty-home --flatten="bindings[].members" --format="table(bindings.role)" --filter="bindings.members:github-actions@donal-geraghty-home.iam.gserviceaccount.com"

# Add missing roles if needed
gcloud projects add-iam-policy-binding donal-geraghty-home \
  --member="serviceAccount:github-actions@donal-geraghty-home.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding donal-geraghty-home \
  --member="serviceAccount:github-actions@donal-geraghty-home.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"

gcloud projects add-iam-policy-binding donal-geraghty-home \
  --member="serviceAccount:github-actions@donal-geraghty-home.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

### 3. **Project Configuration**

Verify your project is set correctly:
```bash
# Check current project
gcloud config get-value project

# Set project if needed
gcloud config set project donal-geraghty-home

# List all projects
gcloud projects list
```

### 4. **API Enablement**

Ensure required APIs are enabled:
```bash
# Enable APIs
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Check enabled APIs
gcloud services list --enabled
```

## 🔧 **Quick Fix Steps**

1. **Verify GitHub Secret**: Check `GCP_SA_KEY` contains valid JSON
2. **Recreate Service Account Key**: Generate a fresh key
3. **Check Permissions**: Ensure service account has required roles
4. **Enable APIs**: Make sure all necessary APIs are enabled
5. **Test Locally**: Try running gcloud commands locally first

## 📋 **Test Commands**

Test these commands locally to verify setup:
```bash
# Test authentication
gcloud auth list

# Test project access
gcloud config list

# Test API access
gcloud services list --enabled

# Test service account
gcloud iam service-accounts list
```

## 🚀 **After Fixing**

1. **Update GitHub secret** with new service account key
2. **Push changes** to trigger new workflow run
3. **Monitor Actions tab** for successful deployment
