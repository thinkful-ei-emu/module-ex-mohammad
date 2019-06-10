/* eslint-disable no-undef */
'use strict';
/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable strict */


// `STORE` is responsible for storing the underlying data
// that our app needs to keep track of in order to work.
//
// for a shopping list, our data model is pretty simple.
// we just have an array of shopping list items. each one
// is an object with a `name` and a `checked` property that
// indicates if it's checked off or not.
// we're pre-adding items to the shopping list so there's
// something to see when the page first loads.
const STORE = [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
];

function generateItemElement(item, itemIndex, template) {
    return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
    console.log('Generating shopping list element');
    //we create a new array of item strings (items) by mapping over shoppingList and calling a new function, 
    //generateItemElement on each item. 
    const items = shoppingList.map((item, index) => generateItemElement(item, index));
    //will return a single string that joins together the individual item strings
    return items.join('');
}
  
function renderShoppingList() {
    // this function will be responsible for rendering the shopping list in the DOM
    console.log('`renderShoppingList` ran');
    const shoppingListItemsString = generateShoppingItemsString(STORE);

    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) { //responsible for updating the store with the new item.
    console.log(`Adding "${itemName}" to shopping list`);
    STORE.push({name: itemName, checked: false});
  }

function handleNewItemSubmit() {
    // this function will be responsible for when users add a new shopping list item
    //listens for new item submissions. When that happens, the callback function stops the default form submission 
    //behavior and then logs to the console.    
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        const newItemName = $('.js-shopping-list-entry').val(); //getting the item name
        console.log(newItemName);
        $('.js-shopping-list-entry').val(''); //input gets cleared out after submission,
        //add the new item to the STORE and re-render the shopping list. 
        addItemToShoppingList(newItemName);
        renderShoppingList();
      });
}


function handleItemCheckClicked() {
    // this function will be responsible for when users click the "check" button on
    // a shopping list item.
    console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {
    // this function will be responsible for when users want to delete a shopping list
    // item
    console.log('`handleDeleteItemClicked` ran')
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
}

$(handleShoppingList);