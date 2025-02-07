const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        await cart.save();
        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
};

const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is mandatory"
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: "image title price salePrice"
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(item => item.productId);
        await cart.save();

        const populatedCartItems = cart.items.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            data: { ...cart._doc, items: populatedCartItems }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
};

const updateCartQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart item not present"
            });
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();
        await cart.populate({
            path: 'items.productId',
            select: "image title price salePrice"
        });

        const populatedCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : 'Product not found',
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            data: { ...cart._doc, items: populatedCartItems }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: "image title price salePrice"
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice"
        });

        const populatedCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : 'Product not found',
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            data: { ...cart._doc, items: populatedCartItems }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
};

module.exports = {
    addToCart,
    fetchCartItems,
    updateCartQuantity,
    deleteCartItem
};
