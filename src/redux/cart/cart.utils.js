// Utility function allow us to keep our files clean
// and organize functions that we may need in multiple files in one location

// cartItems - is all the existing cart items that in our cart items array
// what we're gonna do is going to look inside of our existing cart items to see if that cart item already exists
export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};