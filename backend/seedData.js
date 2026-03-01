import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.model.js';

dotenv.config();

const sampleProducts = [
    {
        name: 'MacBook Pro 16"',
        description: 'Powerful laptop with M3 Pro chip, 16GB RAM, 512GB SSD. Perfect for developers and designers.',
        price: 249900,
        category: 'Electronics',
        stock: 15,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
    },
    {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with A17 Pro chip, 256GB storage, Titanium design.',
        price: 134900,
        category: 'Electronics',
        stock: 25,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1592286927505-2fd0d113b5b4?w=500'
    },
    {
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality.',
        price: 29990,
        category: 'Electronics',
        stock: 40,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500'
    },
    {
        name: 'Nike Air Max 270',
        description: 'Comfortable running shoes with Air cushioning technology. Available in multiple colors.',
        price: 12999,
        category: 'Clothing',
        stock: 50,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    },
    {
        name: 'Samsung 55" 4K Smart TV',
        description: '4K UHD Smart TV with HDR, built-in streaming apps, and voice control.',
        price: 54990,
        category: 'Electronics',
        stock: 12,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'
    },
    {
        name: 'Adidas Ultraboost 22',
        description: 'Premium running shoes with Boost cushioning for maximum energy return.',
        price: 16999,
        category: 'Clothing',
        stock: 35,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500'
    },
    {
        name: 'Canon EOS R6',
        description: 'Full-frame mirrorless camera with 20MP sensor, 4K video, and in-body stabilization.',
        price: 219900,
        category: 'Electronics',
        stock: 8,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500'
    },
    {
        name: 'Levi\'s 501 Original Jeans',
        description: 'Classic straight fit jeans made from durable denim. Timeless style.',
        price: 4999,
        category: 'Clothing',
        stock: 60,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'
    },
    {
        name: 'Dell UltraSharp 27" Monitor',
        description: '4K USB-C monitor with excellent color accuracy for professionals.',
        price: 42990,
        category: 'Electronics',
        stock: 20,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
    },
    {
        name: 'The North Face Jacket',
        description: 'Waterproof and windproof jacket perfect for outdoor adventures.',
        price: 14999,
        category: 'Clothing',
        stock: 30,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'
    },
    {
        name: 'iPad Pro 11"',
        description: 'Powerful tablet with M2 chip, 128GB storage, and Apple Pencil support.',
        price: 89900,
        category: 'Electronics',
        stock: 18,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'
    },
    {
        name: 'Fossil Gen 6 Smartwatch',
        description: 'Stylish smartwatch with heart rate monitoring, GPS, and notification alerts.',
        price: 24999,
        category: 'Electronics',
        stock: 22,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    },
    {
        name: 'Ray-Ban Aviator Sunglasses',
        description: 'Iconic sunglasses with UV protection and durable metal frame.',
        price: 9999,
        category: 'Clothing',
        stock: 45,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500'
    },
    {
        name: 'PlayStation 5',
        description: 'Next-gen gaming console with ultra-high speed SSD and 4K gaming.',
        price: 49990,
        category: 'Electronics',
        stock: 10,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'
    },
    {
        name: 'Puma Backpack',
        description: 'Spacious backpack with laptop compartment and multiple pockets.',
        price: 2999,
        category: 'Clothing',
        stock: 55,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert sample products
        const products = await Product.insertMany(sampleProducts);
        console.log(`✅ Added ${products.length} sample products`);

        console.log('\n📦 Sample Products:');
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - ₹${product.price / 100}`);
        });

        console.log('\n🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
