# Weighted Task Chooser

So you have a list of tasks to do in a markdown file:

```
- [ ] Task 1
- [ ] Task 2
- [4] Task 3
  - [ ] Subtask of 3
- [ ] Task 4
    Some notes on task 4
- [x] Task 5 - done, don't every pick this
- [ ] Task 6
```

This will randomly choose one of the parent tasks from that file. It also does weighting, where each task has a default weight based on the value in the brackets.


## Setup

* npm install
* cp paths.txt.example paths.txt
* add a labeled path. Paths can be relative, absolute, or inside of this project

## Usage 
* node index.js PATH_NAME # to run this

### task list file structure

* All things to randomize must begin with "- [ ]" or "- [42]" where 42 is the randomized weight of the task
  * tasks without weight are ignored
  * tasks with "- [x]" are skipped
* Only parent tasks are the ones that are randomized, and they are returned with their children and any other content before the next parent tasks
  * a child is something that is indented
* This was built with markdown in mind, but this could be any plain text file where lines start with "- [ ]  
* No space can exist at the beginning of a line
* Haven't tested with windows files that have different new line characters. Probably needs to modify the regex line splitter for that. 

Note: you can also use "* [ ]" instead of "- [ ]" if that is your preference.