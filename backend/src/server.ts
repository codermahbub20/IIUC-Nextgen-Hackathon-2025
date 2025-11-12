import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

// console.log('Database URL:', config.database_url);

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('✅ Database connected');

    // 
    if (process.env.NODE_ENV !== 'production') {
      app.listen(config.port, () => {
        console.log(`🚀 Server running locally on port ${config.port}`);
      });
    }
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
}

main();


export default app;
