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

### 1110
- [ ] TODO: Add dark mode
    - [X] ThemeContext

### 1113
- After user claim a unused board, present option to set pin, then next time when user want to use this board, a pin must be input and only correct pin will allow user to use the board. Just to make it more secure. 
  - [X] Setup a table for keep track of board, probable need several fields, pin 
  - The board manager will need to query the board tables first to give a random id that is not being used.
  - This will probably take some time if most of the 100000 of boards are being used, so we might need some way to handle the loading state.
  - Probably need a way to free the board too. Seems like something that will involve some automated cron job on the server side or database side, that will clean boards table that has pin but not content, or some expiration date. Like after 30 days of not being used, delete board row. Or just do this on collision.
    - Get random boardId > check if board is used > check if board is outdated > purge board and pin and start new
                                                  > randomized a new board
    - Same goes for user inputed boardId > check if used > check if outdated > purge board

  - [ ] Hash pin onto url so that direct url share will not require pin input

### 1114 
- ADDED: URL helper with regex to show open link button on TextList.tsx
- ADDED: QRCode
- ADDED: Shortcut for paste text

### 1115 
- Create board on new id login
- Styled QRCode component
- [x] TODO: attach pin on url to allow pinless unlock, so that only the user have the exact pin will allow to distribute this board, other people that doesn't have the url will have to input the pin, which is unlikely if they are just guessing. This will provide security to the user that has claim the board via setting pin. and other people that trying to access will be denied. While still provide quick and easy way to share the unlocked board url, it will suck if that every time you refresh page that you will be required to enter pin again, or that when you shared the link to other device for the same. Clunky. 

### 1117
- Emoji support for text ?
- [x] TODO: Increase text limit, 256 is too small, increase to 3000
- BUG: Somthing wrong when fetching text.getAll, if the data includes a long string of number, the app will freeze, and not able to be reload, revisit, only way is to delete the row in the backend to fix it.
    - with text.getAll, both useQuery, and utils.invalidate are affected.
    - Only the boardId with long string of numbers will be affect, other boardId will not freeze. 


### 1120
- Change text content from varchar to text type in schema
-  Add shortcut to "ENTER" key to BoardManager.tsx to start the app, and starting state to show loading spinner
-  Fix LoadingSpinner Tailwind parsing issue, dynamic size is not possible because the classname is produced only at compile time. At runtime, different size is missing in style sheet. Result to just let it resize on itself.
- remove QRCode url text display
- Auto focus on input field when pinInput page is presented.
- Added react-device-detect. Change auto focus on input in PinInput.tsx to only do this on desktop
- Extract change pin logics in [id]/page.tsx to PinManager.tsx'

### 1121
- Auto focus on boardId input in when in desktop when visit the front page
- Update PinInput page, Added instructions, move down keyboard for mobile usage
