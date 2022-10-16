'use strict'

const gTrans = {
    'page-title': {
        en: 'Welcome to your bookstore!',
        he: 'ברוכים הבאים לחנות הספרים!'
    },
    add: {
        en: 'Add book',
        he: 'הוסף ספר'
    },
    'max-price':{
        en: 'Max price: ',
        he: 'מחיר מקסימלי'
    },
    'min-rate': {
        en: 'Min rate: ',
        he: 'דירוג מינימלי'
    },
    'txt-placeholder': {
        en: 'Book title...',
        he: 'שם הספר...'
    },
    'read-btn': {
        en: 'Read',
        he: 'פירוט'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'delete-btn': {
        en: 'Delete',
        he: 'מחק'
    },
    'prev-btn': {
        en:'prev', 
        he: 'הקודם'
    },
    'next-btn': {
        en:'next', 
        he: 'הבא'
    },
    'price': {
        en: 'Price ',
        he: 'מחיר '
    },
    'Winnie-the-Pooh-title': {
        en: 'Winnie the Pooh',
        he: 'פו הדוב'
    },
    'Alice\'s Adventures in Wonderland-title': {
        en: 'Alice\'s Adventures in Wonderland',
        he: 'עליזה בארץ הפלאות'
    },
    'Peter Pan-title': {
        en: 'Peter Pan',
        he: 'פיטר פן'
    },
    'A Bear Called Paddington-title':  {
        en: 'A Bear Called Paddington',
        he: 'דוב בשם פדינגטון'
    },
    'The Secret Garden-title':  {
        en: 'The Secret Garden',
        he: 'סוד הגן הנעלם'
    },
    'Where\'s Wally?-title':  {
        en: 'Where\'s Wally?',
        he: 'איפה אפי?'
    },
    'bookmark-btn': {
        en: 'Bookmark',
        he: 'סמן'
    },
    'remove-bookmark-btn': {
        en: 'Remove bookmark',
        he: 'הסר סימון'
    },
    'th-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'th-title': {
        en: 'Title',
        he: 'שם הספר'
    },
    'th-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'add-title': {
        en: 'Enter book title:',
        he: ':שם הספר',
    },
    'add-price': {
        en: 'Price:',
        he: ':מחיר',
    },
    'add-img-url': {
        en: 'Enter image URL:',
        he: ':קישור לתמונה',
    },
    'add-book-btn': {
        en: 'Add book',
        he: 'הוסף ספר',
    },
    'update': {
        en: 'Updated price',
        he: ':מחיר מעודכן',
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן',
    },
    'description':{
        en: 'Description: ',
        he: 'תיאור'
    },
    'rate-title': {
        en: 'Rate ',
        he: 'דירוג '
    },
    'sort-title': {
        en: 'Sort by ',
        he: 'מיין לפי '
    }, 
    'title': {
        en: 'Title ',
        he: 'שם הספר '
    }, 

}

function setLang(lang){
    gCurrLang = lang
}

function getTrans(transKey){
    const transMap = gTrans[transKey]
    if(!transMap) return 'Unknown'

    let trans = transMap[gCurrLang]
    if(!trans) trans = transMap.en
    return trans
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
    doTransBooks()
}
function doTransBooks() {
    const elbooks = document.querySelector('.books-display')
    const els = elbooks.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)

        el.innerText = trans
    })
}