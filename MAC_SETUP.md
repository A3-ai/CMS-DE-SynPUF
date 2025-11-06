# 🚀 Mac Setup Guide - Get the Code onto Your Mac

## Quick Setup (3 Steps)

### Step 1: Get the Repository URL

The code is in a Git repository. You need to clone it to your Mac.

**Find your repository URL:**
- Go to your GitHub repository: `https://github.com/A3-ai/CMS-DE-SynPUF`
- Click the green **"Code"** button
- Copy the HTTPS URL

It should look like:
```
https://github.com/A3-ai/CMS-DE-SynPUF.git
```

### Step 2: Clone to Your Mac

**Open Terminal on your Mac and run:**

```bash
# Navigate to where you want the project (e.g., Desktop)
cd ~/Desktop

# Clone the repository
git clone https://github.com/A3-ai/CMS-DE-SynPUF.git

# Enter the project directory
cd CMS-DE-SynPUF
```

### Step 3: Verify You Have the Files

```bash
# Check you're in the right place
ls -la

# You should see:
# - docker-compose.yml
# - start-mac.sh
# - frontend/
# - backend/
# - README.md
```

---

## Now Run the App!

Once you have the code on your Mac:

```bash
# Make sure you're in the project directory
cd ~/Desktop/CMS-DE-SynPUF  # or wherever you cloned it

# Run the start script
./start-mac.sh
```

---

## Alternative: If You Don't Have Git

If you don't have git installed on your Mac:

### Option A: Install Git First
```bash
# Check if you have git
git --version

# If not, install with Homebrew
brew install git

# Or download from: https://git-scm.com/download/mac
```

### Option B: Download from GitHub
1. Go to: `https://github.com/A3-ai/CMS-DE-SynPUF`
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Unzip the downloaded file
5. Open Terminal and navigate to the unzipped folder:
   ```bash
   cd ~/Downloads/CMS-DE-SynPUF-main
   ./start-mac.sh
   ```

---

## Complete Installation Steps

Here's the **full sequence** from scratch:

```bash
# 1. Navigate to your preferred location
cd ~/Desktop

# 2. Clone the repository
git clone https://github.com/A3-ai/CMS-DE-SynPUF.git

# 3. Enter the directory
cd CMS-DE-SynPUF

# 4. Verify Docker is running
docker --version

# 5. Start the application
./start-mac.sh

# 6. Open in browser (after 30 seconds)
open http://localhost:3000
```

---

## Troubleshooting

### ❌ "git: command not found"

Install Git:
```bash
# Using Homebrew (if you have it)
brew install git

# Or download from:
# https://git-scm.com/download/mac
```

### ❌ "Permission denied: ./start-mac.sh"

Make it executable:
```bash
chmod +x start-mac.sh
./start-mac.sh
```

### ❌ "docker: command not found"

Install Docker Desktop:
1. Download from: https://www.docker.com/products/docker-desktop/
2. Install and start Docker Desktop
3. Wait for Docker to fully start
4. Try again

### ❌ Repository is private / Authentication required

You need access to the repository:
```bash
# Configure Git with your credentials
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# When cloning, you'll be prompted for GitHub credentials
# Use a Personal Access Token as the password
```

---

## What You'll Have

After cloning, your folder structure will be:

```
CMS-DE-SynPUF/
├── start-mac.sh              ← Start script
├── docker-compose.yml         ← Docker configuration
├── RUNNING.md                 ← This guide
├── APP_README.md              ← Full documentation
├── PRD.md                     ← Product requirements
├── ARCHITECTURE.md            ← Technical architecture
├── frontend/                  ← React app
├── backend/                   ← Backend services
│   ├── services/
│   │   ├── auth/             ← Auth service
│   │   └── rfp/              ← RFP service
│   └── shared/               ← Shared code
└── scripts/                   ← Utility scripts
```

---

## Need Help?

**Check the documentation:**
```bash
cat APP_README.md
cat RUNNING.md
```

**Or contact your repository administrator for access.**

---

**Once you have the code, just run `./start-mac.sh` and you're good to go!** 🚀
