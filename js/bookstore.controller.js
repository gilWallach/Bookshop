'use strict'

var gUpdatedBookId

function onInit() {
    renderPageByQueryStringParams()
    renderBooks()
}

function renderBooks() {
    gFavLayout === 'table' ? renderBooksTable() : renderBooksCards()
}

function renderBooksCards() {
    setFavLayout('cards') // on choose layout
    document.querySelector('.books-display table').classList.add('hide')
    document.querySelector('.books-display .cards').classList.remove('hide')

    var books = getBooksForDisplay()
    var strHTMLs = books.map(book => `
    <article class="book-card">
    <h2 data-trans="${book.title}-title">${book.title}</h2>
    <div class="img-wraper">
        <img src="${book.imgUrl}" alt="">        
    </div>
    <div>
    <div class="info-span">
        <div class="price"
            <h3><span data-trans="price">Price: </span>${book.price}$</h3>
        </div>
        <div>
        <span data-trans="rate-title">Rate: </span><span>${book.rate}</span>
        </div>
        <span >id: ${book.id}</span>
    </div>
    <div class="card-btns">
        <button data-trans="read-btn" class="btn read-btn" onclick="onRead('${book.id}')">Read</button>
        <button data-trans="update-btn" class="btn update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
        <button data-trans="delete-btn" class="btn delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button></td>
    </div>
    </div>
        </article>
        `)
    document.querySelector('.books-display .cards').innerHTML = strHTMLs.join('')
    document.querySelector('.paging span').innerText = getCurrPage()
    
    doTrans()
}

function renderBooksTable() {
    setFavLayout('table')
    var books = getBooksForDisplay()

    
    var strHTMLs = books.map(book => `
    <tr class="book">
    <td>${book.id}</td>
    <td data-trans="${book.title}-title">${book.title}</td>
    <td>${book.price}$</td>
    <td>${book.rate}</td>
    <td class="tbl-btns"><button data-trans="read-btn" class="btn read-btn" onclick="onRead('${book.id}')">Read</button>
    <button data-trans="update-btn" class="btn update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
    <button data-trans="delete-btn" class="btn delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button></td>
    </tr>
    `)

    document.querySelector('.books-display table tbody').innerHTML = strHTMLs.join('')
    document.querySelector('.paging span').innerText = getCurrPage()
    
    document.querySelector('.cards').classList.add('hide')
    document.querySelector('.books-display table').classList.remove('hide')
    
    doTrans()
}

// ----- filter books -----

function onSetFilterBy(filterBy) {
    filterBy = setBookFilterBy(filterBy)
    renderBooks()
    setQueryParams(false, gCurrDisplayedBook)
}
// ----- sort books -----

function onSetSort(sortBy) {
    setSortBy(sortBy)
    renderBooks()
}

// ----- remove book -----
function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()

}

// ----- add book -----
function onAddBook() {
    document.querySelector('.add-book-user-input').classList.add('show-left-modal-user-input')
}

function onSubmitNewBook() {
    var newTitle = document.querySelector('.enter-title').value
    var newPrice = document.querySelector('.enter-price').value
    var newImgUrl = document.querySelector('.enter-img').value
    addBook(newTitle, +newPrice, newImgUrl)

    document.querySelector('.add-book-user-input').classList.remove('show-left-modal-user-input')
    renderBooks()
}

function onCloseNewBook() {
    document.querySelector('.add-book-user-input').classList.remove('show-left-modal-user-input')
}

// ----- update book -----
function onUpdateBook(bookId) {
    document.querySelector('.update-user-input').classList.add('show-left-modal-user-input')
    return gUpdatedBookId = bookId

    //! How to get rid of this global variable??
}

function onSubmitUpdate() {
    var updatedPrice = document.querySelector('.updated-price').value
    // ! make sure input is a number
    if (updatedPrice < 0 && updatedPrice > 25) return
    updateBook(gUpdatedBookId, updatedPrice)
    renderBooks()
}

// ----- paging -----
// try to make one function using diff
function onChangePage(diff) {
    switch (diff) {
        case 1: document.querySelector('.prev').disabled = false
            document.querySelector('.prev').classList.remove('disabled')
            changePage(diff)

            renderBooks()

            if (gPageIdx >= (gBooks.length / PAGE_SIZE) - 1) {
                document.querySelector('.next').disabled = true
                document.querySelector('.next').classList.add('disabled')
            }
            break
        case -1: document.querySelector('.next').disabled = false
            document.querySelector('.next').classList.remove('disabled')
            changePage(diff)

            renderBooks()

            if (gPageIdx <= 0) {
                document.querySelector('.prev').disabled = true
                document.querySelector('.prev').classList.add('disabled')
            }
    }
}

// ----- internationalization -----
function onSetLang(lang) {
    setLang(lang)
    setDirection(lang)
    doTrans()
    setQueryParams()
    renderBooks()
    renderHebFilters(lang)
}

function setDirection(lang) {
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
}

// no need for isModal, use book id
// ----- query params -----
function setQueryParams(isModal = false, bookId = '') {
    var filterBy = getFilters()
    var lang = getCurrlang()
    const queryStringParams = `?lang=${lang}&maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&title=${filterBy.text}&bookmark=${bookId}`
    const newUrl = window.location.protocol + '//' +
        window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderPageByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const pageParams = {
        maxPrice: queryStringParams.get('maxPrice') || 25,
        minRate: queryStringParams.get('minRate') || 0,
        title: queryStringParams.get('title') || '',
        lang: queryStringParams.get('lang') || 'en',
        bookmark: queryStringParams.get('bookmark') || ''
    }
    setCurrlang(pageParams.lang)
    onSetFilterBy(pageParams)

    if (pageParams.bookmark) renderModal(getBookById(pageParams.bookmark))
    
    renderHebFilters(pageParams.lang)
    
    document.querySelector('.lang-select').value = pageParams.lang
    document.querySelector('.filters .filter-max-price').value = pageParams.maxPrice
    document.querySelector('.filters .filter-min-rate').value = pageParams.minRate
}

function renderHebFilters(lang){
    if (lang !== 'en') {
        document.querySelector('.set-txt-filter').classList.add('hide')
        document.querySelector('.set-sort-title').classList.add('hide')

    }
    else {
        document.querySelector('.set-txt-filter').classList.remove('hide')
        document.querySelector('.set-sort-title').classList.remove('hide')
    }
}