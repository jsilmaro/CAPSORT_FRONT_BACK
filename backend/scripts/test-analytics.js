#!/usr/bin/env node

require('dotenv').config();
const prisma = require('../src/config/database');

async function testAnalytics() {
  console.log('🧪 Testing Analytics Data...\n');

  try {
    // Test dashboard data
    console.log('📊 Dashboard Summary:');
    const totalProjects = await prisma.project.count();
    const totalUsers = await prisma.user.count({ where: { role: 'student' } });
    const totalSaves = await prisma.savedProject.count();
    
    console.log(`   Total Projects: ${totalProjects}`);
    console.log(`   Total Students: ${totalUsers}`);
    console.log(`   Total Saves: ${totalSaves}`);

    // Test projects by year
    console.log('\n📈 Projects by Year:');
    const projects = await prisma.project.findMany({
      select: { year: true, field: true }
    });
    
    const yearFieldMap = {};
    projects.forEach(project => {
      const year = project.year.toString();
      if (!yearFieldMap[year]) yearFieldMap[year] = {};
      const field = project.field;
      if (!yearFieldMap[year][field]) yearFieldMap[year][field] = 0;
      yearFieldMap[year][field]++;
    });

    Object.keys(yearFieldMap).sort().forEach(year => {
      console.log(`   ${year}:`, yearFieldMap[year]);
    });

    // Test field distribution
    console.log('\n🎯 Field Distribution:');
    const fieldCounts = await prisma.project.groupBy({
      by: ['field'],
      _count: { field: true }
    });

    fieldCounts.forEach(item => {
      console.log(`   ${item.field}: ${item._count.field} projects`);
    });

    // Test top saved projects
    console.log('\n⭐ Top Saved Projects:');
    const topProjects = await prisma.savedProject.groupBy({
      by: ['projectId'],
      _count: { projectId: true },
      orderBy: { _count: { projectId: 'desc' } },
      take: 5
    });

    for (const item of topProjects) {
      const project = await prisma.project.findUnique({
        where: { id: item.projectId },
        select: { title: true, author: true, field: true }
      });
      console.log(`   "${project.title}" by ${project.author} (${project.field}) - ${item._count.projectId} saves`);
    }

    console.log('\n✅ Analytics data is ready for charts!');

  } catch (error) {
    console.error('❌ Error testing analytics:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAnalytics();