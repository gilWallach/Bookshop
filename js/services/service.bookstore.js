'use strict'

const STORAGE_KEY = 'booksDB'
const STORAGE_KEY_FAVLAYOUT = 'favLayout'

const PAGE_SIZE = 3

var gPageIdx = 0
var gCurrPage = 1
var gFilters = {
    maxPrice: 75,
    minRate: 0,
    text: ''
}

var gFavLayout = !loadFromStorage(STORAGE_KEY_FAVLAYOUT) ? 'cards' : loadFromStorage(STORAGE_KEY_FAVLAYOUT)

var gCurrLang = 'en'
var gSortBy = {
    price: 1,
    title: 1,
    rate: 0
}

var gBooks
var gTitles = ['Winnie-the-Pooh', 'Peter Pan', 'Where\'s Wally?', 'A Bear Called Paddington', 'The Secret Garden', 'Alice\'s Adventures in Wonderland']
var gImgUrls = [
    'https://cdn.waterstones.com/bookjackets/large/9781/4052/9781405284578.jpg',
    'https://cdn.waterstones.com/bookjackets/large/9780/1413/9780141329819.jpg',
    'https://cdn.waterstones.com/bookjackets/large/9781/4063/9781406305890.jpg',
    'https://cdn.waterstones.com/bookjackets/large/9780/0071/9780007174164.jpg',
    'https://cdn.waterstones.com/bookjackets/large/9780/1413/9780141385501.jpg',
    'https://cdn.waterstones.com/bookjackets/large/9780/1413/9780141321073.jpg',

]


_createBooks()


function getBooksForDisplay() {
    var books = gBooks
    // filtering
    books = gBooks.filter(book => book.price <= gFilters.maxPrice &&
        book.rate >= gFilters.minRate && 
        book.title.includes(gFilters.text))
        setBookFilterBy(gFilters)
    // paging
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}


function removeBook(bookId) {
    var book = getBookById(bookId)
    gBooks.splice(book, 1)
    _saveToStorage()
}

function addBook(title, price, imgUrl) {
    const book = _createNewBook(title, price, imgUrl)
    gBooks.unshift(book)
    _saveToStorage()
}

function updateBook(bookId, newPrice) {
    var book = getBookById(bookId)
    book.price = newPrice
    _saveToStorage()
}

function setBookFilterBy(filterBy = {}) {
    if (filterBy.maxPrice !== undefined) gFilters.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilters.minRate = filterBy.minRate
    filterBy.text ? (gFilters.text = filterBy.text) : (gFilters.text = '')

    return gFilters
}

function setFilter(filter = {}) {
    if (filter.minPrice !== undefined) gFilters.minPrice = filter.minPrice
    if (filter.minRate !== undefined) gFilters.minRate = filter.minRate
    filter.txt ? (gFilters.txt = filter.txt) : (gFilters.txt = '')

    return gFilters
  }

  function setSortBy(key){
    gSortBy[key] = gSortBy[key] === 1 ? -1 : 1
    var changeDir = gSortBy[key] === 1 ? -1 : 1
    if(key === 'title') sortByName(changeDir)
    else gBooks.sort ((a, b) => (a[key] - b[key]) * changeDir)
  }

  function sortByName(changeDir) {
    var books = gBooks.sort((a, b) => {
      var bookNameA = a.title
      var bookNameB = b.title
      return bookNameA.localeCompare(bookNameB) * changeDir
    })
  }

function changePage(diff){
gPageIdx += diff
}

function getCurrPage() {
    return gPageIdx + 1
}

function getFilters(){
    return gFilters
}

function getCurrlang(){
    return gCurrLang
}
function setCurrlang(lang){
    gCurrLang = lang
}
function setFavLayout(layout) {
    gFavLayout = layout
    saveToStorage(STORAGE_KEY_FAVLAYOUT, gFavLayout)
}

function increaseRate(book) {
    book.rate++
    _saveToStorage()
}

function decreaseRate(book) {
    book.rate--
    _saveToStorage
}



function _saveToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function _getFromStorage() {
    loadFromStorage(STORAGE_KEY)
}

function _createBook(title, imgUrl) {
    return {
        id: makeId(3),
        title,
        price: getRandomIntInclusive(2, 25),
        imgUrl,
        rate: 0,
        desc: makeLorem(20)
    }
}

function _createNewBook(title, price = getRandomIntInclusive(2, 25), imgUrl) {
    return {
        id: makeId(3),
        title,
        price,
        imgUrl,
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length || books === undefined) {
        books = []
        for (let i = 0; i < gTitles.length; i++) {
            books.push(_createBook(gTitles[i], gImgUrls[i]))
        }
    }
    gBooks = books
    _saveToStorage()
}