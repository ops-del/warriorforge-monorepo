# Git Setup Instructions - WarriorForge Project

## Current Issue

You're authenticated as `ops-del` but trying to push to `dadrangel91/vitalrisk-api`.

## Solution: Create New Repository

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `warriorforge-automations` (or `ai-automation-agency`)
3. Description: `WarriorForge Automations - AI Lead Capture & Appointment Setting Systems`
4. Set to **Private** (for now)
5. Do NOT initialize with README (you already have files)
6. Click "Create repository"

### Step 2: Connect Local to New Repository

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/<your-actual-username>/warriorforge-automations.git
git push -u origin main
```

**Replace `<your-actual-username>` with:**

- `ops-del` (if you're using that account)
- `dadrangel91` (if you switch to that account)
- Your actual GitHub username

### Step 3: Verify Push

```bash
git remote -v
git setup.md
```

---

## Alternative: Use GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create warriorforge-automations --private --source=. --remote=origin --push
```

---

## Authentication Issues?

If you get 403 errors, you need to authenticate:

### Option A: Use Personal Access Token

1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Check: `repo`, `workflow`, `write:packages`
4. Copy token
5. When prompted for password, paste the token

### Option B: Use GitHub Desktop

1. Install GitHub Desktop
2. Sign in with your account
3. Use File > Add Local Repository
4. Publish to GitHub

### Option C: Use SSH Instead

```bash
git remote add origin git@github.com:<username>/warriorforge-automations.git
git push -u origin main
```

---

## Quick Fix Command (Copy/Paste)

**After creating the repo on GitHub**, run:

```bash
# Replace USERNAME with your actual GitHub username
git remote add origin https://github.com/https://github.com/ops-del/warriorforge-ai-agency/warriorforge-automations.git
git push -u origin main

```

---

## Current Repository State

✅ Local git initialized
✅ Files committed to main branch
❌ Remote not configured (needs your new repo URL)

Once you create the GitHub repository, you're one command away from pushing everything.
