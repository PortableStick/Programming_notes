Writing good commit messages
=====
* Single line summary (50 characters max)
* Longer description can follow a blank line (72 characters per line or less)


Git architecture
=====
Repository
===
A collection of all project files and revision history.

Staging index
===
A collection of all files to be committed - allows for selectively grouping smaller chunks of related changes out of a much larger set of changes

Working area
===
These are the files as you're operating on them directly.  Without tracking or staging, these files or changes don't make it to the repository.

Staging vs Tracking
===
Git essentially has 4 main statuses for the files in your local repo:

* untracked: The file is new, Git knows nothing about it. If you git add <file>, it becomes:

* staged: Now Git knows the file (tracked), but also made it part of the next commit batch (called the index). If you git commit, it becomes:

* unchanged: The file has not changed since its last commit. If you modify it, it becomes:

* unstaged: Modified but not part of the next commit yet. You can stage it again with git add

[source](http://stackoverflow.com/questions/7564841/concept-of-git-tracking-and-git-staging)

SHA-1
=====
Git indexes commits with a SHA-1 hash.  Anywhere the hash is expected, the first six characters will be sufficient.

HEAD pointer
=====
Head is a special pointer to the current tip of the current branch in our repository.  The "tip" is the last state of the repository; what was last checked out or committed.  The next commit will always take place after the HEAD (think: playhead).  `.git/HEAD` will always point to `refs/heads/master`.

    cat .refs/heads/master # 9a98b8f987gdd9...

git status
=====
Shows the difference between the working files, staging index, and the respository.

git-diff
=====
See what changes have been made to the working directory. This shows the difference between the working directory and the **staged index**.  In other words, it will show what changes _could_ be made, if you chose to commit.

git-diff --staged
=====
This shows the difference between what's in the staged index and the **repository**.

Delete files from the respository
=====
First method
===
1) Delete the file in the folder
2) `git rm file_to_delete.txt`
3) `git commit -m "Message about deletion"`

Second method
===
1) Simply git rm file_to_delete.txt
2) `git commit -m "Message about deletion"`

Moving and renaming files
=====
Like deleting files, we can either do it from the filesystem and then stage the changes, or let Git deal with it (both techniques require commits).

    git mv file_to_rename.txt new_file_name.txt

Undo working directory changes before committing
=====

    git checkout <name of file, folder, or branch>

Because `git checkout` can take a branch (and branch will take precedence), it is best to type the command

    git checkout [SHA-1] -- <name of file or folder>

`checkout` tells git, "Put this stuff in my working directory".

Unstaging
=====
Useful for organizing commits

    git reset HEAD <file>

This will take the file out of the staging index, but keep the working version of it.

Amending commits
=====
We can always edit the last commit on the change because nothing depends on it yet.

Add the changes as normal

    git add <file>

Pass the --amend arg

    git commit --amend -m "New message"

Reverting commits
=====
Will check what each of the commits until SHA-1 did, and reverses them.

    git revert <SHA-1>

This creates a new commit in the log and will sometimes require a merge, if the algorithm cannot determine how to undo the changes.

Undo multiple commits
=====
**Very dangerous**

    git reset <SHA-1>

This command moves the head pointer to a particular commit, where it will start writing.  Although we can no longer see the commits after the one we moved to, the commits are still there and can be access if we have the SHA-1.

There are several options that change the behavior

    --soft
      - does not change the staging index or working directory, only moves the head
    --mixed
      - (default) moves head pointer and changes the staging index, but not working directory
    --hard
      - changes the head pointer, staging index, and working directory

Remove untracked files
=====

    git clean -n # Test run
    git clean -f # Required to actually clean directory

Referencing commits
=====

**tree-ish**: _noun_, a category of object that git can use to reference commits and traverse the history

* Full SHA-1
* Short SHA-1 (at least 4 characters, 8-10 for large projects)
* HEAD pointer
* Branch or tag reference
* Ancestory modifiers (HEAD^, master~2, etc...)

Tree Listing
=====

    git ls-tree <tree-ish> [directory]

Branching
=====

Show available and current branch
===

    git branch

Create branch
===
    git branch <new branch> [where to branch] # The optional argument can be important if you want to branch off of a remote, or perhaps from master while one another branch

Switch branch
===
    git checkout <branch>

Both at the same time
===
    git checkout -b <new branch>

Renaming branches
=====

    git branch -m <old name> <new name>

Deleting branches
=====

    git branch -d <branch to delete>

Merging branches
=====
1) Checkout the branch you want to merge _into_
2) Then run merge

    git merge <banch to merge into current branch>

Fast forward vs recursive merge
===
A fast forward merge occurs when HEAD points to a commit that is a direct anscestor of the commit you want to merge.  Since there's nothing in between your current branch and the changes you want to merge in, git can simply move the last commit into the target branch and the HEAD pointer to match.

The problem with a fast forward merge is that because the last commit gets moved, all of the commit history contained in that branch gets lost.  You may also want to have a record in the history of a merge occurring, and a fast-forward merge simply looks like another commit.  In this case, you want a full recursive commit, which can be accomplished with the `--no-ff` option

    git merge --no-ff <branch to merge into current branch>

If you want to _ensure_ that the merge will be a fast-forward merge, the option `--only-ff` can be used.

    git merge --only-ff <branch to merge into current branch>

This will cause git to abort if the merge cannot be fast-forwarded.

Merging strategies
===

1) Keep lines short
2) Keep commits small and focused
3) Be careful of stray (unintentional) or creeping edits
    - watch whitespace!
4) Merge often, but don't throw away the branch you're working on!
5) Track changes to master (don't get out of sync with changes in master)

The Stash
=====

Temporary storage, similar to commits, but without a SHA-1.  To stash working directory and index state,

    git stash save "some message about the stash"

Viewing the stash
===

    git stash list

This will list things in the stash, referenced like so:

    stash@{0}: On <branch>: <Stash message>

View a particular stash

    git stash show <stashID>

    git stash show -p <stashID> # shows diff

Retrieve from stash
===
This will bring everything in the stash into the working directory

    git stash pop [stashID] # Removes from the stash

    git stash apply [stashID] # Leaves in the stash

Without the stashID, it will pull from the top of the stash (LIFO)

Delete from stash
===

    git stash drop [stashID]

    git stash clear # nuclear options

Remotes
=====
Remote repositories are tracked locally simply as another branch.  This branch tries to keep up with the remote repository it's associated with.  By convention, the main remote that is treated as the canonical version of the project is called `origin`.

List remotes
===

    git remote
    git branch -r # Remotes only
    git branch -a # Show all

Add remotes
===

    git remote add [-v] <alias> <address> # The option -v lists URLs

Remove remotes
===

    git remote rm <alias>

Pushing to remotes
===

    git push -u <alias> <local branch to push> # Option -u sets tracking

Cloning remotes
===

    git clone <path to remote repository> [name of directory]

Tracking remotes
===
Start tracking

    git branch --set-upstream <local branch> <alias/branch of remote repo

Delete remotes
===
Delete a branch from your remote repo.
Older way:

    git push origin :<branch to delete> # notice the colon

Newer way:

    git push origin --delete <branch to delete>

Fetching vs Pulling
=====
Both commands retrieve the most recent version of the remote repo and puts it in origin/master.  While `pull` merges those changes to the master branch automatically, `fetch` leaves it to the user to review the changes and then merge at their lesiure.  Fetch often.

Rebase
=====
Merging leaves merge commits, and this can be especially annoying when merging often from another branch.  Sometimes, a better choice is to rebase, or go back to some specified commit and replay the history.  This effectively changes the _base_ of the branch ("re-basing").

    git rebase <commit to start playing back from>

An interactive rebase does the same thing, but will open an editor window with a list of the commits, their SHA-1, and commands for each one to execute.

    pick ea395f4 Added rspec config
    pick 62cd50d Update rubocop configs
    pick 8d851ef Update zshrc aliases
    pick 1efe6cd Updated global gitignore
    pick 1d7d7ca Install RSpec helpers in Sublime Text
    pick 12fc8a4 Update ApplySyntax settings

Commands are listed at the bottom.  History can be reworked from here.