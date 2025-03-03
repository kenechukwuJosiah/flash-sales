import { User, Product } from '../models';
import { users, products } from './data';
import mongoose from 'mongoose';

export async function seedDatabase() {
  try {
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({})
    ]);

    await User.create(users);

    await Product.create(products);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
  }
}


if (require.main === module) {

  require('dotenv').config();
  
  mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
      console.log('Connected to MongoDB');
      return seedDatabase();
    })
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}