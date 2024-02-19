# DEVGUIDE

## Running the application
1. Install dependencies using: ``npm i``
2. Run the application using ``npm run dev``
3. Close the application by clicking **CTRL + C** then typing ``Y`` _(for yes)_

## How to start working on an issue
1. Make sure the issue is created, note down the ID of the issue
2. Go to the main branch of the project and pull all the most recent changes 
```bash
git checkout main
git pull
```
3. Create a new branch with the ID of the issue as well as a **short** description of the issue 
```bash
git checkout -b [ID-description]

# Example
git checkout -b 22-devguide
```
4. Then you can begin to work on the issue, you should make it a habit to regularly push your changes to your branch:
```bash
# Stage changes
git add --all 

# Add a commit message
git commit -m "Some description of what was done"

# Push the changes
git push

# If this is the first time #you push changes to this #branch, you may get an error like 
# "The current branch ____ has to upstream branch..."
# If you get this error, do this:
git push --set-upstream origin [Branchname]
```
5. When you are done, push your last changes. Then merge with main and resolve conflicts
```bash
# Going to main branch
git checkout main

# Get the last changes done on main
git pull

# Go back to your branch
git checkout [Branchname]

# Merge with main
git merge main
```
6. If you got conflicts, resolve them. Then you have to push the changes when merging with main.
```bash
git add --all 
git commit -m "Merged with main"
git push
```
7. After this is done, you can create your merge request on gitlab.

## Review merge requests
How to review merge requests:
- Read through code changes
- Check that everything works when you run the application. This can be done by: 
  1. Go to the relevant branch using ``git checkout [BRANCH-NAME]`` _(in the terminal in VS code)_
  2. Downloading dependencies using ``npm i``
  3. Running the application ``npm run dev``
  4. Then going through the stated steps on the part of the merge request under **How to test**
  5. If everything works as expected you can then leave the branch by doing ``git checkout main``
- Approve the merge request if everything seems OK



