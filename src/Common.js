//RETURN COMMON ELEMENTS FROM AN ARRAY OF SORTED ARRAYS
const getCommon = (arr, gallerySetter) => {
    try {
      if (arr.length === 0) {
        gallerySetter([]);
        return;
      }
      if (arr.length === 1) {
        gallerySetter(arr[0]);
        return;
      }
      else if (arr.length) {
        //create a deep copy of each list
        let lists = [];
        for (let i = 0; i < arr.length; ++i) {
          lists.push(JSON.parse(JSON.stringify(arr[i])));
        }
        //get common titles
        let result = [];
        //for each title in list 1...
        for (let j = 0; j < lists[0].length; ++j) {
          const found = lists[0][j].title;

          //find the title if it exists in other lists and add to gallery
          for (let k = 1; k < lists.length; ++k) {
            //no titles left 
            if (!lists[k].length) {
              gallerySetter(result);
              return;
            }
            //if first title of list larger than target, title not shared, move to next title
            if (lists[k][0].title > found) {
              break;
            }

            else {
              //remove "<" titles currently at the start of each list
              while (lists[k].length && lists[k][0].title < found) {
                lists[k].shift();
              }
              if (lists[k].length && lists[k][0].title !== found) {
                break;
              }
              else if (!lists[k].length) {
                gallerySetter(result);
                return;
              }
            }

            //IF THE END OF LOOP REACHED, PUSH THE TITLE ONTO GALLERY
            if (k === lists.length - 1) {
              result.push(lists[0][j]);
            }
          } //END INNER FOR LOOP

        } //END OUTER FOR LOOP
      }

    } catch (err) {
      console.log(err);
    }
}

export default getCommon;