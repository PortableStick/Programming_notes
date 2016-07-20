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

    git clean