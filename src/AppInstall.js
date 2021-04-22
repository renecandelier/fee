import React, { Component } from 'react';
import createApp from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';

const redirectUri = `${window.location.origin}/cart`;
const requestUrl = new URL(window.location.href);
const shopOrigin = requestUrl.searchParams.get('shop');
const permissionUrl = `https://${shopOrigin}/admin/oauth/authorize?client_id=${process.env.REACT_APP_API_KEY}&scope=read_orders,write_products,write_orders&redirect_uri=${redirectUri}`;

const app = createApp({
    apiKey: process.env.REACT_APP_API_KEY,
    shopOrigin: shopOrigin
});

export default class AppInstall extends Component {
    componentDidMount() {
        if (window.top === window.self) {
            window.location.assign(permissionUrl);
        } else {
            Redirect.create(app).dispatch(Redirect.Action.REMOTE, permissionUrl);
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}