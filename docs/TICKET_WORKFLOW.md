# Ticket-Based Development Workflow

## 🎯 Overview

We use **GitHub Issues** (tickets) to manage all development work. This keeps the team organized, work trackable, and ensures nothing gets forgotten.

## 📋 What is a Ticket?

A **ticket** (GitHub Issue) represents:
- ✅ One specific task
- ✅ Assigned to one person
- ✅ Has clear acceptance criteria
- ✅ Can be completed in 1-3 days

**Good Ticket:** "Add CV upload button to student profile"  
**Bad Ticket:** "Build the entire student module" (too big!)

---

## 👥 Roles & Responsibilities

### Team Lead / Product Owner
- Creates tickets from user stories
- Breaks down large tasks into small tickets
- Assigns labels and priorities
- Reviews and accepts completed work

### Developers
- Pick available tickets
- Work on one ticket at a time
- Follow the workflow below
- Update ticket status

---

## 🔄 Developer Workflow (Step by Step)

### Step 1: Find Your Ticket

**On GitHub:**
1. Go to repository → **Issues** tab
2. Look at available tickets:
   - Filter by: `is:open is:issue assignee:@me` (your tickets)
   - Or: `is:open is:issue no:assignee` (unassigned tickets)
3. Pick a ticket that's ready to work on
4. Click **"Assign yourself"**
5. Add label: `in-progress`
6. (Optional) Move to "In Progress" column on Project board

**Example:** Issue #25 - "Add CV upload functionality"

---

### Step 2: Create Feature Branch

**Always create a new branch for each ticket!**

```powershell
# 1. Switch to dev and update
git checkout dev
git pull origin dev

# 2. Create branch named after ticket
git checkout -b feature/25-cv-upload-functionality
```

**Branch Naming Convention:**
```
feature/<ticket-number>-short-description
fix/<ticket-number>-short-description
docs/<ticket-number>-short-description

Examples:
feature/25-cv-upload-functionality
fix/32-login-validation-bug
docs/18-api-documentation
```

**Why?** This links your code to the ticket automatically!

---

### Step 3: Work on Your Code

```powershell
# Make your changes
# Test locally
# Ensure it works completely
```

**Best Practices:**
- ✅ Follow coding standards (see CONTRIBUTING.md)
- ✅ Write clean, commented code
- ✅ Test your changes
- ✅ Only work on what the ticket describes (no extra features!)
- ✅ Commit regularly

---

### Step 4: Commit Your Changes

**Link commits to the ticket using (#ticket-number):**

```powershell
git add .
git commit -m "feat: add CV upload component (#25)"
```

**Commit Message Format:**
```
type: description (#ticket-number)

Types:
- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting
- refactor: code restructure
- test: add tests
```

**Examples:**
```bash
git commit -m "feat: add CV upload button (#25)"
git commit -m "feat: connect upload to backend API (#25)"
git commit -m "test: add CV upload tests (#25)"
git commit -m "fix: handle upload errors properly (#25)"
```

**Multiple commits per ticket are OK!** Keep them small and focused.

---

### Step 5: Push Your Branch

```powershell
git push origin feature/25-cv-upload-functionality
```

If this is your first push for this branch:
```powershell
git push -u origin feature/25-cv-upload-functionality
```

---

### Step 6: Create Pull Request (PR)

**On GitHub:**

1. Go to your repository → **Pull requests** tab
2. Click **"New pull request"**
3. Select branches:
   - **base:** `dev` (where code will merge to)
   - **compare:** `feature/25-cv-upload-functionality` (your branch)
4. Click **"Create pull request"**

**Fill out PR Template:**

**Title:**
```
feat: add CV upload functionality (#25)
```

**Description - CRITICAL:**
```markdown
## Description
Implemented CV upload functionality with drag-and-drop support

## Related Issue
Closes #25

## Testing
- [x] Tested with PDF files
- [x] Tested with Word files
- [x] Tested file size validation
- [x] Tested error handling
```

**⚠️ IMPORTANT:** Write `Closes #25` in the description!  
This **automatically closes** the ticket when PR is merged.

5. **Assign reviewers** (at least one teammate)
6. **Add labels** (same as ticket)
7. Click **"Create pull request"**

---

### Step 7: Code Review Process

**As PR Author:**
1. Wait for teammate to review
2. Respond to comments
3. Make requested changes:
   ```powershell
   # Make changes
   git add .
   git commit -m "fix: address PR review comments (#25)"
   git push origin feature/25-cv-upload-functionality
   ```
4. PR automatically updates with new commits
5. Once approved → **Merge** button appears

**As Reviewer:**
1. Review code thoroughly
2. Test locally if possible:
   ```powershell
   git fetch origin
   git checkout feature/25-cv-upload-functionality
   # Test the feature
   ```
3. Leave constructive comments
4. Approve or request changes
5. Once satisfied → Click **"Approve"**

---

### Step 8: Merge & Cleanup

**After PR is approved:**

1. Click **"Merge pull request"** button
2. Choose **"Squash and merge"** or **"Create merge commit"**
3. Confirm merge
4. Ticket #25 automatically closes (because you wrote "Closes #25")
5. Delete the feature branch (GitHub offers this button)
6. Update your local repository:
   ```powershell
   git checkout dev
   git pull origin dev
   git branch -d feature/25-cv-upload-functionality
   ```

---

### Step 9: Pick Next Ticket

**Repeat the process!** 🔄

Go back to Step 1 and pick another ticket.

---

## 🎫 Ticket Lifecycle

```
[Backlog] → [To Do] → [In Progress] → [In Review] → [Done]
```

### Ticket States

| State | Description | GitHub Label |
|-------|-------------|--------------|
| **Backlog** | Future work, not ready | No label |
| **To Do** | Ready to work on | `ready` |
| **In Progress** | Developer working on it | `in-progress` |
| **In Review** | PR created, waiting for review | PR open |
| **Done** | Merged, ticket closed | Issue closed |

---

## 📊 Using GitHub Project Board (Recommended)

### Setup (Team Lead)

1. Go to repository → **Projects** → **New project**
2. Choose **"Board"** template
3. Add columns: **Backlog | To Do | In Progress | In Review | Done**
4. Link issues to project

### Using the Board (Developers)

1. **Pick ticket** from "To Do" column
2. **Move to "In Progress"** when you start
3. **Move to "In Review"** when you create PR
4. **Automatically moves to "Done"** when PR merges

---

## 💡 Best Practices

### ✅ DO:
- Work on **one ticket at a time**
- **Update ticket status** regularly
- **Reference ticket number** in all commits
- **Write "Closes #XX"** in PR description
- **Test your code** before creating PR
- **Respond to review comments** quickly
- **Keep branches short-lived** (merge within 1-3 days)

### ❌ DON'T:
- Don't work on multiple tickets simultaneously
- Don't create PRs without linking tickets
- Don't merge your own PRs (get review first)
- Don't leave PRs open for days
- Don't add extra features not in the ticket
- Don't commit directly to `dev` or `main`

---

## 🔍 Finding Work

### "What should I work on?"

**Option 1: Assigned Tickets**
```
Look for issues assigned to you
Filter: is:open is:issue assignee:@me
```

**Option 2: Pick from To Do**
```
Look for unassigned issues labeled "ready"
Filter: is:open is:issue label:ready no:assignee
Pick one and assign yourself
```

**Option 3: Ask in Daily Standup**
```
"I finished ticket #25. What should I pick next?"
Team lead will guide you
```

---

## 🆘 Common Scenarios

### Scenario 1: Ticket is Too Big
**Problem:** Ticket will take more than 3 days

**Solution:**
1. Comment on ticket: "This seems too large"
2. Work with team lead to **break it down**
3. Create **sub-tickets** (Issue #25 → #25a, #25b, #25c)
4. Work on one sub-ticket at a time

### Scenario 2: Found a Bug While Working
**Problem:** Discovered a bug not related to your ticket

**Solution:**
1. **Create new ticket** for the bug
2. **Finish your current ticket** first
3. Then work on the bug ticket separately
4. OR: If critical, ask team lead if you should switch

### Scenario 3: Ticket Requirements Unclear
**Problem:** Don't understand what to do

**Solution:**
1. **Comment on ticket** with questions
2. **Tag team lead** or product owner
3. **Move ticket back to "To Do"** (not ready)
4. **Pick different ticket** while waiting for clarification

### Scenario 4: Stuck on Ticket
**Problem:** Can't figure out how to implement

**Solution:**
1. **Try for reasonable time** (1-2 hours)
2. **Ask teammate** for help
3. **Comment on ticket** about the blocker
4. **Update daily standup**: "I'm blocked on #25 because..."
5. **Pair program** with teammate if needed

### Scenario 5: PR Changes Requested
**Problem:** Reviewer wants changes

**Solution:**
1. **Read all comments carefully**
2. **Ask questions** if unclear
3. **Make the changes** in your branch
4. **Commit and push**: `git commit -m "fix: address review comments (#25)"`
5. **Reply to comments**: "Fixed!" or "Changed as requested"
6. **Request re-review**

---

## 🎯 Example: Complete Workflow

### Ticket #32: Fix Login Validation Bug

**1. Pick ticket**
```
- Go to Issues
- Click Issue #32
- Click "Assign myself"
- Add label: "in-progress"
```

**2. Create branch**
```powershell
git checkout dev
git pull origin dev
git checkout -b fix/32-login-validation-bug
```

**3. Fix the bug**
```powershell
# Edit code
# Test fix
```

**4. Commit**
```powershell
git add .
git commit -m "fix: validate email format on login (#32)"
git commit -m "test: add login validation tests (#32)"
```

**5. Push**
```powershell
git push origin fix/32-login-validation-bug
```

**6. Create PR**
```
Title: fix: validate email format on login (#32)

Description:
Fixed the email validation issue where invalid emails were accepted.

Closes #32

Testing:
- [x] Tested with valid emails
- [x] Tested with invalid emails
- [x] Added unit tests
```

**7. Get review & merge**
```
- Teammate reviews
- Makes suggestions
- You fix
- Gets approved
- You merge
- Ticket #32 auto-closes
```

**8. Cleanup**
```powershell
git checkout dev
git pull origin dev
git branch -d fix/32-login-validation-bug
```

**9. Pick next ticket!** 🎉

---

## 📱 Quick Reference Card

**Every Time You Start a Ticket:**

```powershell
# 1. Update dev
git checkout dev
git pull origin dev

# 2. Create branch
git checkout -b feature/<ticket#>-description

# 3. Code & commit (with ticket #)
git commit -m "type: description (#ticket-number)"

# 4. Push
git push origin feature/<ticket#>-description

# 5. Create PR with "Closes #<ticket-number>"

# 6. Get review → Merge → Done!
```

---

## ❓ Questions?

- **During standup**: Ask team lead
- **On specific ticket**: Comment on the issue
- **General questions**: Team chat or create Discussion on GitHub

**Remember:** This workflow keeps everyone organized and makes it easy to track progress. Stick to it, and development will be smooth! 🚀
