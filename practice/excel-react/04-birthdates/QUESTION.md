# Edit birth dates

Source: React JS!F10, code block 1.


### Question

We have a list of users, and we separate this list into two lists:
1. Born before 2000.
2. Born after 2000.

We have an initial code that fetches the user list and displays the modified lists.

We want to add a button to edit users in the list. You can use any react in-build functionality to manage the state.

The button actions:

* The Edit button should display an input field for birth date together with Apply and Cancel buttons.
* The Apply button should apply changes to the user and leave the edit mode. After the modification, the user should be in the correct list.
* The Cancel button should leave the edit mode without applying any changes.

Run the code to see the image of functionality needed.

If the user is already in edit mode and clicks on another user’s Edit button, the open Edit mode should be closed, discarding the changes, and the new Edit mode should be opened for the other user.

Note that the UI styles are not required to match the expected styles.

### Original code block 1



## Practice

Edit App.jsx. The supplied bugs and incomplete behavior are kept for you to repair. ORIGINAL.txt preserves the exact extracted code. Solution.jsx is separate.

Only CDN imports, old ReactDOM mounting, Excel doubled quotes and invisible paste characters were adapted for Vite. These setup edits are not interview fixes. Live API examples need internet.

Some original snippets already work: explain their logic rather than inventing bugs. Context may fail to compile until you fix createContex; use the Vite error message.

Run from the project root:

```powershell
npm.cmd run practice:excel -- 04-birthdates
```

Open /?solution=1 only when you want to check the answer.
