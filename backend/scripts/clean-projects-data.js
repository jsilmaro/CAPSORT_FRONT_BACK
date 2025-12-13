#!/usr/bin/env node

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

// Create a new Prisma client with retry configuration
const prisma = new PrismaClient({
  log: ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function retryOperation(operation, maxRetries = 3, delay = 2000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.log(`⚠️  Attempt ${i + 1} failed: ${error.message}`);
      
      if (i === maxRetries - 1) {
        throw error;
      }
      
      console.log(`🔄 Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 1.5; // Exponential backoff
    }
  }
}

async function cleanProjectsData() {
  console.log('🧹 Cleaning Projects Data from Database...\n');

  try {
    // Test connection first
    console.log('📡 Testing database connection...');
    await retryOperation(async () => {
      await prisma.$connect();
      console.log('✅ Database connection established');
    });

    // Clean data step by step (not in transaction to avoid timeout issues)
    
    // 1. Delete all saved projects first (they reference projects)
    console.log('\n🗑️  Deleting saved projects...');
    const deletedSavedProjects = await retryOperation(async () => {
      return await prisma.savedProject.deleteMany({});
    });
    console.log(`✅ Deleted ${deletedSavedProjects.count} saved project records`);

    // 2. Delete all projects
    console.log('🗑️  Deleting all projects...');
    const deletedProjects = await retryOperation(async () => {
      return await prisma.project.deleteMany({});
    });
    console.log(`✅ Deleted ${deletedProjects.count} project records`);

    // 3. Reset sequences
    console.log('🔄 Resetting ID sequences...');
    await retryOperation(async () => {
      await prisma.$executeRaw`ALTER SEQUENCE "Project_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "SavedProject_id_seq" RESTART WITH 1`;
    });
    console.log('✅ ID sequences reset to 1');

    // 4. Verify the cleanup
    console.log('\n📊 Verifying cleanup...');
    const verification = await retryOperation(async () => {
      const projectCount = await prisma.project.count();
      const savedProjectCount = await prisma.savedProject.count();
      const userCount = await prisma.user.count();
      return { projectCount, savedProjectCount, userCount };
    });

    console.log(`📈 Current database state:`);
    console.log(`   Projects: ${verification.projectCount}`);
    console.log(`   Saved Projects: ${verification.savedProjectCount}`);
    console.log(`   Users: ${verification.userCount} (preserved)`);

    if (verification.projectCount === 0 && verification.savedProjectCount === 0) {
      console.log('\n🎉 Projects data cleanup completed successfully!');
      console.log('📝 The database is now ready for real project data.');
      console.log('👥 User accounts and authentication data have been preserved.');
      console.log('\n💡 You can now add real capstone projects to the clean database.');
    } else {
      console.log('\n⚠️  Warning: Some data may not have been cleaned properly.');
    }

  } catch (error) {
    console.error('\n❌ Error during cleanup:', error.message);
    
    if (error.message.includes("Can't reach database server")) {
      console.log('\n🔧 Database connection issue detected:');
      console.log('1. Your Neon database might be sleeping');
      console.log('2. Go to https://console.neon.tech/ and wake up your database');
      console.log('3. Try running the script again after the database is active');
    } else if (error.code === 'P2003') {
      console.log('\n💡 This might be a foreign key constraint issue.');
      console.log('   The cleanup order should handle this, but there might be additional references.');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
cleanProjectsData();