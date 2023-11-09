Logs 

### 1024
Get delete all working.
- [x] TODO: Get delete and query in client componet to revalidate data, right now it will not update after change
    Use util from api.useUtils and invalide the route 'api.post.getAll.invalidate()'

### 1025
- [x] TODO: Action to paste what is in user's clipboard and post 
    When the site is first load, it would ask the user to allow clipboard reading, and load clipboard to input box
- [x] TODO: Individual item deletion
- [ ] Auto Animate
- [ ] Flip item layout flow, bottom to top
- [ ] Sync changes across devices

### 1026
- [x] Implement Toast to give feedback on actions.
- [x] Infer post router output types to component to use 
- [ ] Sync changes across devices, or just refetch on given intervals, for now
- ADDED: uploadthing

### 1030
- Create another route for files table. After uploading a file successfully, will add record of the file into the database.
    - getAll
    - createRecord
    - deleteRecord
- [ ] TODO: Join posts and files query together

### 1103
- [x] TODO: Nav between two tabs, files and text items
  - [x] create useNavContext
- CORE FEATURE: able to delete file from clipboard
- [x] TODO: Allow other types of files, text, pdf... to be upload
- [x] TODO: One click download button, no pop-up (if user disabled option to ask where to save file in browser)
- Exact image thumbnail
- [ ] TODO: Add image hover preview

### 1104
- [x] TODO: Optimistic update on delete file
- ADDED: AutoAnimate 

### 1105
- [x] TODO: url text with open button
- Style link and delete button, added react icons
- Style clipboard item list

### 1106
- [ ] TODO: Share page via qrcode
- EXTRACT: FileDeleteButton
- EXTRACT: TextList.tsx
- EXTRACT: FileList.tsx
- Change text create input to textarea, and make it auto resize based on the scroll height
- Add auto scrolling to improve UX
- Change CreateItem layout and behaivors
- [x] TODO: Footer

### 1107
- Update ClearAllBotton
- [X] TODO: BoardManager, allow user to change different instance of clipboard
- Change: When user first visit the app, the first page is now a page with "start a new board" button that will sent user to different instance of the board, and user can use this instance to share stuff across devices. This method is not secured intentionally, if you have to log in with some auth or use password and username, on every device... too much trouble. Just have a id which is a string of number as the identifier of the instance is good enough. 
- [X] TODO: Use localstrage to store recently visited boards
- UPDATE: text routes to work with boardId
- UPDATE: file routes to work with boardId

### 1109
- LAYOUT: Fix buttons hover behaivor, change focus-within selection outline style
- UPDATE: Instructions section, added buttons for copy url with board id 
- Simplify frontpage buttons to only have a start button and id input
- FIX: Issue with loading board id from localstrage before the BoardManager is renders, move getting from localstorage into useEffect and loading to board id input
