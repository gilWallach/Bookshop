'use strict'
// todo set up query string: if empty - eng, else heb
// todo fix design!!
// todo add filter in hebrew??
// todo add to user add book an option to enter info in hebrew
var gCurrDisplayedBook

function onRead(bookId) {
    getCurrBookDisplayed(bookId)
    var book = getBookById(bookId)
    renderModal(book)
}

function renderModal(book) {
    document.querySelector('.read-modal').classList.remove('hide')
    var elModal = document.querySelector('.read-modal')
    var strHTML = `
    <button onclick="onCloseModal()" class="close-read-modal-btn">X</button>
    <button data-trans="bookmark-btn" onclick="onBookmark()" class="bookmark-btn">Bookmark</button>
    <button data-trans="remove-bookmark-btn" onclick="onRemoveBookmark()" class="bookmark-btn">Remove bookmark</button>
    <h2 data-trans="${book.title}-title" class="title">${book.title}</h2 >
            <div class="img"><img src="${book.imgUrl}" alt="${book.title} cover"></div>
            
            <div>
            <span data-trans="price">Price:</span> 
            <span class="price">${book.price}$</span>
            </div>
            <div class="rate-container">
                
            </div>
            <span data-trans="description"></span>   
            <p class="description">${book.desc}</p>   
    `
    elModal.innerHTML = strHTML
    renderRateBtn(book)
    elModal.classList.add('read-modal-open')

    doTrans()
}

function renderRate(book) {
    var elModal = document.querySelector('.read-modal')
    elModal.querySelector('.rate span').innerText = `${book.rate}`
}

function onCloseModal() {
    var elModal = document.querySelector('.read-modal')
    elModal.classList.remove('read-modal-open')
    document.querySelector('.read-modal').classList.add('hide')
}

function onCloseAddBookModal(){
    elUpdateModal = document.querySelector('.add-book-user-input')
    elUpdateModal.classList.remove('.show-left-modal-user-input')
    document.querySelector('.read-modal').classList.add('hide')

}
function onCloseUpdateModal(){
    elUpdateModal = document.querySelector('.update-user-input')
    elUpdateModal.classList.remove('.show-left-modal-user-input')
    document.querySelector('.read-modal').classList.add('hide')
}
function getCurrBookDisplayed(bookId) {
    var book = getBookById(bookId)
    gCurrDisplayedBook = book
}

function renderRateBtn(book) {
    var strHTML = `
    <span data-trans="rate-title">Rate</span>
    <button class="minus green-bg" onclick="
    onChangeRate('${book.id}',-1)">-</button>
    <span class="rate-screen">${book.rate}</span>
    <button class="plus green-bg" onclick="onChangeRate('${book.id}',1)">+</button>`
    document.querySelector('.rate-container').innerHTML = strHTML
}

function onChangeRate(bookId, diff) {
    var book = getBookById(bookId)
    var newRate = +book.rate + diff
    if (!newRate || newRate > 10) return
    book.rate = newRate
    document.querySelector('.rate-screen').innerText = book.rate
    _saveToStorage()
}

function onBookmark() {
    setQueryParams(true, gCurrDisplayedBook.id)
}

function onRemoveBookmark() {
    gCurrDisplayedBook = undefined
    setQueryParams(false, gCurrDisplayedBook)
}
