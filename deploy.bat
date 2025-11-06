@echo off
echo Building website for production...
npm run build

echo Committing changes to Git...
git add .
git status

echo.
echo Enter commit message (describe your changes):
set /p message="Commit message: "

git commit -m "%message%"

echo Pushing to GitHub (this will trigger Netlify deployment)...
git push origin main

echo.
echo ✅ Deployment started! Check Netlify for progress.
echo ✅ Your website will be live at debutiques.com in ~2 minutes.
pause