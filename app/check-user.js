import { dbConnect } from './lib/db.js';
import User from './models/User.js';

async function checkUser() {
  try {
    await dbConnect();
    const user = await User.findOne({ email: 'adminuser@gmail.com' });
    if (user) {
      console.log('User found:', user);
      console.log('Role:', user.role);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error checking user:', error);
  }
}

checkUser();
