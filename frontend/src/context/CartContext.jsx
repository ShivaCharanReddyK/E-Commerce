import { createContext, useState, useEffect, useContext, useCallback } from 'react';

/**
 * CartContext - Manages shopping cart state globally
 */
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Validate stock availability
    const validateStock = useCallback((product, requestedQuantity) => {
        const existingItem = cartItems.find((item) => item.product._id === product._id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        const totalQuantity = currentQuantity + requestedQuantity;

        if (totalQuantity > product.stock) {
            return {
                valid: false,
                message: `Only ${product.stock} items available. You already have ${currentQuantity} in cart.`
            };
        }

        return { valid: true };
    }, [cartItems]);

    // Add item to cart
    const addToCart = useCallback((product, quantity = 1) => {
        // Check stock availability
        const stockCheck = validateStock(product, quantity);
        if (!stockCheck.valid) {
            return { success: false, message: stockCheck.message };
        }

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product._id === product._id);

            if (existingItem) {
                // Update quantity if item already in cart
                return prevItems.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new item
                return [...prevItems, { product, quantity }];
            }
        });

        return { success: true };
    }, [validateStock]);

    // Check if cart is valid (all items have sufficient stock)
    const validateCart = useCallback(() => {
        const invalidItems = [];

        for (const item of cartItems) {
            if (item.quantity > item.product.stock) {
                invalidItems.push({
                    name: item.product.name,
                    requested: item.quantity,
                    available: item.product.stock
                });
            }
        }

        return {
            valid: invalidItems.length === 0,
            invalidItems
        };
    }, [cartItems]);

    // Remove item from cart
    const removeFromCart = useCallback((productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
    }, []);

    // Update quantity
    const updateQuantity = useCallback((productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const item = cartItems.find((i) => i.product._id === productId);
        if (item && quantity > item.product.stock) {
            return { success: false, message: `Only ${item.product.stock} items available` };
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product._id === productId ? { ...item, quantity } : item
            )
        );

        return { success: true };
    }, [cartItems, removeFromCart]);

    // Clear cart
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Get total price
    const getTotal = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    // Get total items count
    const getTotalItems = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getTotalItems,
        validateCart,
        validateStock
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
