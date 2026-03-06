@echo off
setlocal EnableExtensions EnableDelayedExpansion

:: ============================================================
:: Student Push Assistant
:: A guided helper to configure git identity, verify repo, login,
:: stage, commit, and push with minimal command-line knowledge.
:: ============================================================

:: Git executable location variable. Default to just "git"; if it's
:: not on the PATH we will try common install locations later.
set "GIT_CMD=git"

set "SCRIPT_DIR=%~dp0"
set "REPO_DIR=%SCRIPT_DIR%.."

pushd "%REPO_DIR%" >nul 2>nul
if errorlevel 1 (
    echo.
    echo [ERROR] Could not open repository directory.
    echo Please keep this script inside the Utility folder in your project root.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   Student Push Assistant - GitHub Classroom Helper
echo ============================================================
echo Repository Path: %CD%
echo.

call :check_git_ready
if errorlevel 1 goto :finish

call :setup_git_identity
if errorlevel 1 goto :finish

call :confirm_remote
if errorlevel 1 goto :finish

call :confirm_github_user
if errorlevel 1 goto :finish

call :stage_files
if errorlevel 1 goto :finish

call :commit_and_push
if errorlevel 1 goto :finish

echo.
echo [SUCCESS] Your changes were pushed successfully.
echo.
goto :finish

:check_git_ready
:: Attempt to run git; if it fails then search common install folders
%GIT_CMD% --version >nul 2>nul
if errorlevel 1 (
    rem try pointing to typical Git for Windows locations
    set "GIT_CMD="
    for %%F in (
        "%ProgramFiles%\Git\cmd\git.exe"
        "%ProgramFiles(x86)%\Git\cmd\git.exe"
        "%USERPROFILE%\AppData\Local\Programs\Git\cmd\git.exe"
    ) do if exist %%~F set "GIT_CMD=%%~F"

    if not defined GIT_CMD (
        echo [ERROR] Git is not installed or could not be found.
        echo Install Git from: https://git-scm.com/downloads
        pause
        exit /b 1
    )
)

"%GIT_CMD%" rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
    echo [ERROR] This folder is not a git repository.
    echo Please run this script from a project that has .git initialized.
    pause
    exit /b 1
)
exit /b 0

:setup_git_identity
echo ------------------------------------------------------------
echo Step 1/5: Checking your Git username and email...
echo ------------------------------------------------------------
set "GIT_NAME="
set "GIT_EMAIL="

for /f "delims=" %%A in ('"%GIT_CMD%" config user.name 2^>nul') do set "GIT_NAME=%%A"
for /f "delims=" %%A in ('"%GIT_CMD%" config user.email 2^>nul') do set "GIT_EMAIL=%%A"

if defined GIT_NAME if defined GIT_EMAIL (
    echo Saved Git name : !GIT_NAME!
    echo Saved Git email: !GIT_EMAIL!
    set /p "ID_OK=Is this correct? [Y/n]: "
    if /I "!ID_OK!"=="" set "ID_OK=Y"
    if /I "!ID_OK!"=="Y" exit /b 0
)

echo.
echo Please enter your Git identity details:
set /p "NEW_NAME=Enter Git user.name: "
if "!NEW_NAME!"=="" (
    echo [ERROR] Name cannot be empty.
    exit /b 1
)
set /p "NEW_EMAIL=Enter Git user.email: "
if "!NEW_EMAIL!"=="" (
    echo [ERROR] Email cannot be empty.
    exit /b 1
)

"%GIT_CMD%" config user.name "!NEW_NAME!"
if errorlevel 1 (
    echo [ERROR] Failed to save git user.name
    exit /b 1
)

"%GIT_CMD%" config user.email "!NEW_EMAIL!"
if errorlevel 1 (
    echo [ERROR] Failed to save git user.email
    exit /b 1
)

echo Git identity saved successfully for this repository.
exit /b 0

:confirm_remote
echo.
echo ------------------------------------------------------------
echo Step 2/5: Verifying the repository remote (origin)...
echo ------------------------------------------------------------
"%GIT_CMD%" remote -v
if errorlevel 1 (
    echo [ERROR] Could not read remotes for this repository.
    exit /b 1
)
set /p "REMOTE_OK=Is this the correct repository to push to? [Y/n]: "
if /I "%REMOTE_OK%"=="" set "REMOTE_OK=Y"
if /I not "%REMOTE_OK%"=="Y" (
    echo [STOPPED] Push canceled. Please open the correct repository and run again.
    exit /b 1
)
exit /b 0

:confirm_github_user
echo.
echo ------------------------------------------------------------
echo Step 3/5: Checking GitHub login user...
echo ------------------------------------------------------------
where gh >nul 2>nul
if errorlevel 1 (
    echo [INFO] GitHub CLI ^(gh^) is not installed.
    echo The script will continue, and Git may ask credentials during push.
    echo Install gh for easier login: https://cli.github.com/
    exit /b 0
)

set "GH_USER="
for /f "delims=" %%A in ('gh api user -q .login 2^>nul') do set "GH_USER=%%A"

if defined GH_USER (
    echo Current GitHub user: !GH_USER!
    set /p "USE_GH=Do you want to push using this GitHub user? [Y/n]: "
    if /I "!USE_GH!"=="" set "USE_GH=Y"
    if /I "!USE_GH!"=="Y" exit /b 0

    echo Logging out current GitHub user...
    gh auth logout -h github.com -u "!GH_USER!"
)

echo Starting GitHub login in browser...
echo Please complete login in browser and come back.
gh auth login -h github.com -w -p https
if errorlevel 1 (
    echo [ERROR] GitHub login failed or was canceled.
    exit /b 1
)

set "GH_USER="
for /f "delims=" %%A in ('gh api user -q .login 2^>nul') do set "GH_USER=%%A"
if not defined GH_USER (
    echo [ERROR] Could not confirm logged-in GitHub user.
    exit /b 1
)

echo Logged in as: !GH_USER!
set /p "CONFIRM_GH=Proceed with this user? [Y/n]: "
if /I "!CONFIRM_GH!"=="" set "CONFIRM_GH=Y"
if /I not "!CONFIRM_GH!"=="Y" (
    echo [STOPPED] Push canceled by user.
    exit /b 1
)
exit /b 0

:stage_files
echo.
echo ------------------------------------------------------------
echo Step 4/5: Reviewing changed files...
echo ------------------------------------------------------------

echo.
echo Currently staged files:
"%GIT_CMD%" diff --cached --name-only

echo.
echo Unstaged tracked files:
"%GIT_CMD%" diff --name-only

echo.
echo New untracked files:
"%GIT_CMD%" ls-files --others --exclude-standard

echo.
set /p "STAGE_ALL=Stage all changes (tracked + untracked) for commit? [Y/n]: "
if /I "%STAGE_ALL%"=="" set "STAGE_ALL=Y"

if /I "%STAGE_ALL%"=="Y" (
    "%GIT_CMD%" add -A
    if errorlevel 1 (
        echo [ERROR] Failed to stage files.
        exit /b 1
    )
) else (
    echo [INFO] Files were not auto-staged.

    rem --- new interactive staging sequence ---
    set "USE_STAGED=N"
    set "ADD_TRACKED=N"
    set "ADD_UNTRACKED=N"

    rem check if any files already staged
    set "HAS_STAGED="
    for /f "delims=" %%A in ('"%GIT_CMD%" diff --cached --name-only') do set "HAS_STAGED=1"

    if defined HAS_STAGED (
        set /p "USE_STAGED=Do you want only the staged files to commit? [Y/n]: "
        if /I "%USE_STAGED%"=="" set "USE_STAGED=Y"
    )

    if /I "%USE_STAGED%"=="Y" (
        goto AFTER_STAGE_CHOICE
    )

    rem not using only staged – consider unstaged / untracked
    set "HAS_TRACKED="
    for /f "delims=" %%A in ('"%GIT_CMD%" diff --name-only') do set "HAS_TRACKED=1"
    if defined HAS_TRACKED (
        set /p "ADD_TRACKED=Add all changed tracked files? [Y/n]: "
        if /I "%ADD_TRACKED%"=="" set "ADD_TRACKED=Y"
        if /I "%ADD_TRACKED%"=="Y" (
            "%GIT_CMD%" add -u
            if errorlevel 1 (
                echo [ERROR] Failed to stage tracked changes.
                exit /b 1
            )
        )
    )

    set "HAS_UNTRACKED="
    for /f "delims=" %%A in ('"%GIT_CMD%" ls-files --others --exclude-standard') do set "HAS_UNTRACKED=1"
    if defined HAS_UNTRACKED (
        set /p "ADD_UNTRACKED=Add untracked files? [Y/n]: "
        if /I "%ADD_UNTRACKED%"=="" set "ADD_UNTRACKED=Y"
        if /I "%ADD_UNTRACKED%"=="Y" (
            for /f "delims=" %%F in ('"%GIT_CMD%" ls-files --others --exclude-standard') do (
                "%GIT_CMD%" add "%%F"
                if errorlevel 1 (
                    echo [ERROR] Failed to stage file %%F.
                    exit /b 1
                )
            )
        )
    )
)

:AFTER_STAGE_CHOICE

set "HAS_STAGED="
for /f "delims=" %%A in ('"%GIT_CMD%" diff --cached --name-only') do set "HAS_STAGED=1"

if not defined HAS_STAGED (
    echo [STOPPED] No staged files found. Nothing to commit.
    echo Please stage files and run this script again.
    exit /b 1
)

echo.
echo Final staged files for commit:
"%GIT_CMD%" diff --cached --name-only
exit /b 0

:commit_and_push
echo.
echo ------------------------------------------------------------
echo Step 5/5: Commit and push
echo ------------------------------------------------------------

set /p "COMMIT_MSG=Enter commit message: "
if "%COMMIT_MSG%"=="" (
    echo [ERROR] Commit message cannot be empty.
    exit /b 1
)

"%GIT_CMD%" commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo [ERROR] Commit failed. Please check git status and try again.
    exit /b 1
)

set "CURRENT_BRANCH="
for /f "delims=" %%A in ('"%GIT_CMD%" rev-parse --abbrev-ref HEAD') do set "CURRENT_BRANCH=%%A"
if not defined CURRENT_BRANCH set "CURRENT_BRANCH=main"

echo.
echo Pushing to remote...
"%GIT_CMD%" push
if errorlevel 1 (
    echo.
    echo [INFO] Regular push failed. Trying first-time upstream push...
    "%GIT_CMD%" push -u origin "%CURRENT_BRANCH%"
    if errorlevel 1 (
        echo [ERROR] Push failed. Please check remote permissions/branch and retry.
        exit /b 1
    )
)
exit /b 0

:finish
popd >nul 2>nul
echo.
echo Press any key to close this window.
pause >nul
endlocal
exit /b
