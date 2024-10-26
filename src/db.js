import Dexie from 'dexie';
import {reactLocalStorage} from 'reactjs-localstorage';

const db = new Dexie('WorkseiDB');
db.version(1).stores({ todos: '++id,*taskWords' });

db.todos.hook("creating", function (primKey, obj, trans) {
    if (typeof obj.title == 'string') obj.taskWords = getAllWords(obj.title);
});

db.todos.hook("updating", function (mods, primKey, obj, trans) {
    if (mods.hasOwnProperty("done")) {
      if (mods.done === true){ updateScore(); }
    }

    if (mods.hasOwnProperty("title")) {
        // "message" property is being updated
        if (typeof mods.title == 'string')
            // "message" property was updated to another valid value. Re-index messageWords:
            return { taskWords: getAllWords(mods.message) };
        else
            // "message" property was deleted (typeof mods.message === 'undefined') or changed to an unknown type. Remove indexes:
            return { taskWords: [] };
    }

});
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function updateScore(){
  var current_score = reactLocalStorage.get('score', 0);
  var new_score = parseInt(current_score) + getRandomInt(5,10);
  reactLocalStorage.set('score', new_score);
  console.log("New Score " + new_score)
}
function getAllWords(text) {
    /// <param name="text" type="String"></param>
    var allWordsIncludingDups = text.split(' ');
    var wordSet = allWordsIncludingDups.reduce(function (prev, current) {
        prev[current] = true;
        return prev;
    }, {});
    return Object.keys(wordSet);
}

export default db;
