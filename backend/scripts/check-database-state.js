#!/usr/bin/env node

require('dotenv').config();
const prisma = require('../src/config/database');

async function checkDatabaseState() {
  console.log('📊 Checking Database State...\n');

  try {
    // Check all table counts
    console.log('📈 Current database contents:');
    
    const userCount = await prisma.user.count();
    const projectCount = await prisma.project.count();
    const savedProjectCount = await prisma.savedProject.count();
    const aboutContentCount = await prisma.aboutContent.count();

    console.log(`   👥 Users: ${userCount}`);
    console.log(`   📁 Projects: ${projectCount}`);
    console.log(`   ⭐ Saved Projects: ${savedProjectCount}`);
    console.log(`   ℹ️  About Content: ${aboutContentCount}`);

    // Show sample data if exists
    if (userCount > 0) {
      console.log('\n👥 Sample Users:');
      const users = await prisma.user.findMany({
        take: 3,
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true
        }
      });
      users.forEach(user => {
        console.log(`   • ${user.fullName} (${user.email}) - ${user.role}`);
      });
    }

    if (projectCount > 0) {
      console.log('\n📁 Sample Projects:');
      const projects = await prisma.project.findMany({
        take: 5,
        select: {
          id: true,
          title: true,
          author: true,
          year: true,
          field: true,
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      projects.forEach(project => {
        console.log(`   • ${project.title} by ${project.author} (${project.year}) - ${project.field}`);
      });
      
      if (projectCount > 5) {
        console.log(`   ... and ${projectCount - 5} more projects`);
      }
    }

    // Check for any soft-deleted projects
    const softDeletedCount = await prisma.project.count({
      where: {
        isDeleted: true
      }
    });
    
    if (softDeletedCount > 0) {
      console.log(`\n🗑️  Soft-deleted projects: ${softDeletedCount}`);
    }

    console.log('\n✅ Database state check completed.');

  } catch (error) {
    console.error('❌ Error checking database state:', error);
    console.error('Details:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseState();