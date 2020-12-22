import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'

import CheckoutItem from './checkout-item.component'


const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) {
        addItemToCart(item: $item) @client
    }
`

const REMOVE_ITEM_FROM_CART = gql`
    mutation RemoveItemToCart($item: Item!) {
        removeItemToCart(item: $item) @client
    }
`

const CLEAR_ITEM_FROM_CART = gql`
    mutation ClearItemToCart($item: Item!) {
        clearItemToCart(item: $item) @client
    }
`


const CollectionItemContainer = ({
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    ...otherProps
}) => (
    <CheckoutItem
        {...otherProps}
        addItem={item => addItemToCart({ variables: { item } })}
        removeItem={item => removeItemFromCart({ variables: { item } })}
        clearItem={item => clearItemFromCart({ variables: { item } })}
    />
);

export default compose(
    graphql(ADD_ITEM_TO_CART, { name: 'addItemToCart' }),
    graphql(REMOVE_ITEM_FROM_CART, { name: 'removeItemFromCart' }),
    graphql(CLEAR_ITEM_FROM_CART, { name: 'clearItemFromCart' })
)(CollectionItemContainer);