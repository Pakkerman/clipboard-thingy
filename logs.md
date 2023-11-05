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
