import dbConnect from './db';
import User from '../models/User';

async function checkAdminUser() {
  await dbConnect();
  const adminUsers = await User.find({ role: 'admin' });
  console.log('Admin Users:', adminUsers);
}

checkAdminUser();
