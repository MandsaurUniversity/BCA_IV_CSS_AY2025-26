# Guide: Forking, Working, and Contributing to the University GitHub Repository

## Overview

This guide helps you get started with GitHub using your personal email, fork the official Mandsaur University repository, work on your assignments, and contribute your work back to the university repository. This process will help you build your GitHub profile and prepare for future collaboration and interviews.

---

## Recommended Folder Layout (Important)

**Do NOT change the current folder structure for daily content.**

Daily content must remain inside:

```
ClassWork/Week-1/Day1-xxx.md
```

For new assignments (classwork tasks), use the following pattern:

```
ClassWork/Tasks/{student-roll-number}/Week-1/Day1.md
```

Example:

```
ClassWork/Tasks/24CSA3BCA####/Week-1/Day1.md
ClassWork/Tasks/24CSA3BCA####/Week-1/Day2.md
```

This ensures all student assignments are organized and easy to review.

---

## 1. Fork the Official Repository

1. Go to the official university repository on GitHub: https://github.com/MandsaurUniversity/BCA_IV_CSS_AY2025-26
2. Click the **Fork** button (top right) to create a copy in your own GitHub account.

---

## 2. Clone Your Fork Locally

Open PowerShell and run:

```bash
git clone https://github.com/yourusername/BCA_IV_CSS_AY2025-26.git
cd BCA_IV_CSS_AY2025-26
```
- Replace `yourusername` with your GitHub username.

---

## 3. Set Up Remotes

By default, your fork is called `origin`. Add the university repo as `upstream`:

```bash
git remote add upstream https://github.com/MandsaurUniversity/BCA_IV_CSS_AY2025-26.git
git remote -v
```
- `origin` = your fork (you can push here)
- `upstream` = official repo (you can pull from here)

---

## Syncing Your Fork with the Official Repository

### Why Sync?
If your forked repository is behind the official Mandsaur University repository, you need to update (sync) it to get the latest changes.

### Step-by-Step: Check and Sync

#### 1. Check if Your Fork is Behind

Open PowerShell and run:

```bash
git fetch upstream
git status
```

If you see messages like "Your branch is behind 'upstream/main' by X commits", your fork needs updating.

#### 2. Merge Latest Changes from Upstream

```bash
git checkout main
git merge upstream/main
```

This brings the latest changes from the university repo into your fork.

#### 3. Push Updates to Your Fork on GitHub

```bash
git push origin main
```

Now your fork is up to date with the official repository.

#### Example

Suppose the university repo added new files in `ClassWork/Week-1/Day2-xxx.md`. After syncing, you will have these files in your fork as well.

#### Troubleshooting

If you see conflicts, resolve them in your editor, then:

```bash
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

---

---

## 4. Daily Workflow

### a. Fetch Latest Changes from University Repo

```bash
git fetch upstream
git checkout main
git merge upstream/main
```
- This keeps your local repo up to date with the university repo.

### b. Create/Update Your Work

```bash
# Create or edit files as needed
code ClassWork/cw1.js
```

### c. Check Status

```bash
git status
```
- Shows changed files.

### d. Stage and Commit Changes

```bash
git add .
git commit -m "Add solution for assignment 1"
```
- `git add .` stages all changes.
- `git commit -m` saves your work with a message.

### e. Push to Your Fork

```bash
git push origin main
```
- Uploads your changes to your fork on GitHub.

---

## 5. Submitting Work to University Repo (Pull Request)

1. Go to your fork on GitHub.
2. Click **"Contribute"** > **"Open pull request"**.
3. Add a clear title and description (e.g., "Add Week 2 assignments").
4. Submit the pull request.
5. Instructor will review and merge if appropriate.

---

## 6. Resolving Conflicts

If your PR cannot be merged automatically, you may need to update your fork:

```bash
git fetch upstream
git checkout main
git merge upstream/main
# Fix any conflicts in your files
# After fixing:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

---

## 7. Useful Git Commands (with Explanations)

- `git status` — See what’s changed.
- `git add <file>` — Stage a file for commit.
- `git add .` — Stage all changes.
- `git commit -m "message"` — Save your changes with a message.
- `git push origin main` — Upload your work to your fork.
- `git fetch upstream` — Get latest changes from university repo.
- `git merge upstream/main` — Merge university changes into your local repo.
- `git pull` — Fetch and merge from your current remote (usually origin).
- `git log` — View commit history.
- `git branch` — List branches.
- `git checkout -b new-branch` — Create and switch to a new branch.
- `git switch main` — Switch to main branch.

---

## 8. Building Your GitHub Profile

- Commit regularly with clear messages.
- Push your work after every session.
- Submit PRs for assignments and classwork.
- Keep your fork updated with the university repo.

---

## 9. Transition to University Email

Once you receive your university email:
- Update your GitHub email in settings.
- Instructor may add you as a collaborator or move to GitHub Classroom assignments.

---

## 10. Need Help?
- Ask your instructor during class or office hours.
- Refer to the official [GitHub Docs](https://docs.github.com).

---

**This workflow ensures you can start building your GitHub presence and contribute to the university repository, even before official emails are provided.**
