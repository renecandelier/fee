import React, { Component } from 'react';
import createApp from '@shopify/app-bridge';
import { Cart, Pos } from "@shopify/app-bridge/actions";

const requestUrl = new URL(window.location.href);
const shopOrigin = requestUrl.searchParams.get('shop');
// Creating a instance for the shop sdk.
const app = createApp({
    apiKey: process.env.REACT_APP_API_KEY,
    shopOrigin: shopOrigin
});

const FEE_LINE_ITEM_TITLE = 'A&E 2% Fee';
const FEE_PERCENT = 0.02;

// Creating a instance for the cart.
const cart = Cart.create(app);

const cartUpdatedHandler = cart.subscribe(Cart.Action.UPDATE, function (payload) {
    cartUpdatedHandler();
    // Getting all the line items from the cart response payload.
    const lineItems = payload.data.lineItems;

    // Looping through the line items to finding corresponding line item for fee.
    let feeLineItemIndex = -1;
    let feeLineItem = null;
    let subtotal = payload.data.subtotal;
    lineItems.map((item, index) => {
        if (item.title === FEE_LINE_ITEM_TITLE) {
            feeLineItemIndex = index;
            feeLineItem = item;
            return true;
        }
    });

    // If Present deleting the existing one.
    if (feeLineItemIndex > -1) {
        subtotal = subtotal - feeLineItem.price;
        cart.dispatch(Cart.Action.REMOVE_LINE_ITEM, {
            index: feeLineItemIndex
        });
    }
    // Adding a line item for 2% percent fee.
    cart.dispatch(Cart.Action.ADD_LINE_ITEM, {
        data: {
            price: parseFloat(subtotal) * FEE_PERCENT,
            quantity: 1,
            title: FEE_LINE_ITEM_TITLE,
            taxable: true
        }
    });

    // Closing the webview after adding the fee line item.
    const pos = Pos.create(app);
    pos.dispatch(Pos.ActionType.CLOSE);
});
cart.dispatch(Cart.Action.FETCH);

export default class AppMain extends Component {
    render() {
        return (
            <div></div>
        )
    }
}