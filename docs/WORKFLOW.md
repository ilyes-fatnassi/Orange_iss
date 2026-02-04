# Development Workflow & Git Commands

## Initial Setup for Team Members

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_ORG/iss_orange.git
cd iss_orange
```

### 2. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your local configuration
```

## Daily Development Workflow

### Starting a New Feature

1. **Switch to dev and update:**
```bash
git checkout dev
git pull origin dev
```

2. **Create your feature branch:**
```bash
git checkout -b feature/your-feature-name
```

3. **Work on your feature:**
```bash
# Make changes...
# Test locally...
```

4. **Commit your changes:**
```bash
git add .
git commit -m "feat: add your feature description"
```

5. **Push to GitHub:**
```bash
git push origin feature/your-feature-name
```

6. **Create Pull Request:**
- Go to GitHub repository
- Click "Pull requests" → "New pull request"
- Select `dev` as base and your feature branch
- Fill out the PR template
- Request review from team member

### Keeping Your Branch Updated

```bash
# While on your feature branch
git checkout dev
git pull origin dev
git checkout feature/your-feature-name
git merge dev
# Resolve conflicts if any
git push origin feature/your-feature-name
```

## Common Git Commands

### Branch Management
```bash
# List all branches
git branch -a

# Switch branches
git checkout branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

### Checking Status
```bash
# See current changes
git status

# See commit history
git log --oneline

# See changes in files
git diff
```

### Undoing Changes
```bash
# Discard changes in working directory
git checkout -- filename

# Unstage file
git reset HEAD filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Stashing Changes
```bash
# Save changes temporarily
git stash

# List stashes
git stash list

# Apply last stash
git stash pop

# Apply specific stash
git stash apply stash@{0}
```

## Branch Protection Rules (for Repository Owner)

Configure these on GitHub for `main` and `dev` branches:

1. **Settings → Branches → Add rule**
2. Apply to: `main` and `dev`
3. Enable:
   - ✅ Require pull request before merging
   - ✅ Require approvals (at least 1)
   - ✅ Dismiss stale reviews when new commits are pushed
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Include administrators

## Commit Message Convention

Follow these patterns:

```
feat: add CV parsing endpoint
fix: resolve authentication bug
docs: update API documentation
style: format code according to style guide
refactor: restructure user service
test: add unit tests for CV parser
chore: update dependencies
```

## Sprint Workflow

### Start of Sprint
1. Sprint planning meeting
2. Create issues for user stories
3. Assign issues to team members
4. Create feature branches

### During Sprint
1. Daily standup (share progress)
2. Work on assigned issues
3. Create PRs regularly
4. Review team PRs

### End of Sprint
1. Merge all completed features to `dev`
2. Test integration on `dev` branch
3. Sprint review/demo
4. Sprint retrospective
5. Merge `dev` to `main` if stable

## Useful Git Aliases (Optional)

Add to `~/.gitconfig`:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    lg = log --oneline --graph --decorate
    last = log -1 HEAD
    unstage = reset HEAD --
```

## Tips for Team Collaboration

1. **Pull before you push** - Always update your branch before pushing
2. **Commit often** - Small, focused commits are easier to review
3. **Write clear commit messages** - Help others understand your changes
4. **Test before PR** - Ensure your code works locally
5. **Review promptly** - Don't leave teammates waiting
6. **Communicate** - Use PR comments and Slack/Teams for questions
7. **Resolve conflicts carefully** - Don't lose others' work
8. **Keep branches short-lived** - Merge frequently to avoid conflicts

## Getting Help

If you're stuck with Git:
1. Check this guide first
2. Ask in team chat
3. Use `git help <command>` for command help
4. Search Stack Overflow
5. Ask a senior team member

## Emergency: Recovering Lost Work

```bash
# See all recent actions (even deleted commits)
git reflog

# Recover specific commit
git checkout <commit-hash>
git checkout -b recovery-branch
```
