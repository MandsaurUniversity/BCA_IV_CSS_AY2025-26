# Utility - Git Assistant Guide

This guide explains how to use `git-assistant.bat` to push your code to GitHub safely and correctly.

---

## What this utility does

The script `git-assistant.bat` helps you complete the full Git push process without remembering commands.

It guides you through:
1. Checking/saving your Git `user.name` and `user.email`
2. Confirming current repository remote (`git remote -v`)
3. Confirming GitHub logged-in user (via GitHub CLI `gh`, if installed)
4. Reviewing changed files and staging files
5. Entering commit message and pushing to GitHub

---

## Who should use this

- Students who are not comfortable with Git commands
- Students who want a safer, prompt-based push workflow
- Students who want to avoid pushing to the wrong repository/account

---

## Prerequisites

Minimum required:
- Git installed
- This folder is a valid Git repository (`.git` folder exists)

Optional but recommended:
- GitHub CLI (`gh`) installed from https://cli.github.com/
  - If `gh` is not installed, script still works, but Git may ask credentials at push time.

---

## How to run

From repository root:

```bat
Utility\git-assistant.bat
```

Alternative:
- Double-click `Utility/git-assistant.bat`

---

## Step-by-step flow (what you will see)

### Step 1 - Git identity check
- Script shows saved `user.name` and `user.email` (if already set).
- If correct, choose `Y`.
- If incorrect, choose `N`, then enter new values.
- Values are saved for this repository.

### Step 2 - Remote confirmation
- Script runs `git remote -v` and shows current remote URLs.
- You must confirm this is the correct repo before continuing.

### Step 3 - GitHub account confirmation
- If GitHub CLI (`gh`) is installed:
  - Script checks current logged-in GitHub user.
  - If wrong account, it logs out and opens browser login.
  - You confirm again after login.
- If `gh` is not installed:
  - Script informs you and continues.

### Step 4 - File review and staging
- Script displays:
  - Already staged files
  - Unstaged tracked files
  - New untracked files
- It asks whether to stage all (`git add -A`).

### Step 5 - Commit and push
- You enter a commit message.
- Script commits your staged files.
- Script pushes to remote.
- If normal push fails on first push, it tries `git push -u origin <current-branch>`.

---

## Example scenario 1 (happy path)

You already have correct Git details and correct GitHub login.

Typical interaction:
- `Is this correct? [Y/n]: Y`
- `Is this the correct repository to push to? [Y/n]: Y`
- `Do you want to push using this GitHub user? [Y/n]: Y`
- `Stage all changes ...? [Y/n]: Y`
- `Enter commit message: add experiment 11 solution`

Result:
- Commit is created
- Push succeeds
- Script shows `[SUCCESS]`

---

## Example scenario 2 (wrong GitHub account)

You are logged in with another GitHub account.

Typical interaction:
- `Do you want to push using this GitHub user? [Y/n]: N`
- Script logs out old user
- Browser login opens
- You log in with correct student account
- `Proceed with this user? [Y/n]: Y`
- Continue with staging, commit, push

Result:
- Push happens with correct GitHub account credentials

---

## Example scenario 3 (nothing staged)

You choose not to stage files and no files are staged already.

Typical interaction:
- `Stage all changes ...? [Y/n]: N`
- Script stops with message:
  - `No staged files found. Nothing to commit.`

What to do:
- Run again and choose `Y` at staging step
- OR manually stage files then rerun script

---

## Troubleshooting

### 1) "Git is not installed or not available in PATH"
**Cause:** Git is missing or terminal cannot find it.

**Fix:**
1. Install Git from https://git-scm.com/downloads
2. Close and reopen terminal
3. Run:
   ```bat
   git --version
   ```
4. Run script again

---

### 2) "This folder is not a git repository"
**Cause:** You are not in the project root (or repository is not initialized).

**Fix:**
1. Open correct repository folder
2. Ensure `.git` exists
3. Run script from root path

---

### 3) Push rejected (non-fast-forward)
**Cause:** Remote has commits you do not have locally.

**Fix (safe sequence):**
```bat
git pull --rebase
git push
```
If conflicts appear, resolve conflicts, then run script again.

---

### 4) Authentication failed during push
**Cause:** Wrong credentials/token/session.

**Fix options:**
- If `gh` installed:
  ```bat
  gh auth logout -h github.com
  gh auth login -h github.com -w -p https
  ```
- Then run the script again.

---

### 5) "nothing to commit, working tree clean"
**Cause:** No new changes after staging.

**Fix:**
- Check file edits are saved
- Verify status:
  ```bat
  git status
  ```
- Make changes, then rerun script

---

### 6) Wrong remote URL
**Cause:** Repository points to incorrect origin.

**Fix:**
```bat
git remote -v
git remote set-url origin <correct-repo-url>
git remote -v
```
Then rerun script.

---

## Best practices for students

- Always read prompts before pressing Enter
- Confirm remote URL carefully before pushing
- Use meaningful commit messages (what changed + where)
  - Good: `add e11 solution for array methods`
  - Weak: `update files`
- Push in small, frequent commits
- Keep your own branch/repo workflow as instructed by faculty

---

## Safety notes

- Script does **not** delete files
- Script only commits staged files
- Script asks for confirmations at important checkpoints
- You can cancel safely by choosing `N` at confirmation prompts

---

## Quick command reference (if needed)

```bat
Utility\git-assistant.bat
git status
git remote -v
git log --oneline -n 5
```

---

## Need help?

If script stops with an error:
1. Read the exact message shown
2. Follow troubleshooting section above
3. If still stuck, share screenshot/error text with instructor or lab assistant
