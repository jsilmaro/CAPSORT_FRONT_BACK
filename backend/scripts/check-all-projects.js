const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAllProjects() {
  try {
    console.log('🔍 Checking ALL projects in database...');
    
    const allProjects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        field: true,
        isDeleted: true
      }
    });
    
    console.log(`\nTotal projects in database: ${allProjects.length}`);
    
    const fieldCounts = {};
    const deletedFieldCounts = {};
    
    allProjects.forEach(project => {
      if (project.isDeleted) {
        deletedFieldCounts[project.field] = (deletedFieldCounts[project.field] || 0) + 1;
      } else {
        fieldCounts[project.field] = (fieldCounts[project.field] || 0) + 1;
      }
    });
    
    console.log('\n📊 Active projects by field:');
    Object.entries(fieldCounts).forEach(([field, count]) => {
      console.log(`   • ${field}: ${count} projects`);
    });
    
    console.log('\n🗑️  Deleted projects by field:');
    Object.entries(deletedFieldCounts).forEach(([field, count]) => {
      console.log(`   • ${field}: ${count} projects`);
    });
    
    // Show any non-IoT/Database active projects
    const nonTargetProjects = allProjects.filter(p => 
      !p.isDeleted && p.field !== 'IoT' && p.field !== 'Database'
    );
    
    if (nonTargetProjects.length > 0) {
      console.log('\n⚠️  Found active projects that are NOT IoT or Database:');
      nonTargetProjects.forEach(p => {
        console.log(`   • ${p.title} (${p.field})`);
      });
    } else {
      console.log('\n✅ All active projects are IoT or Database only!');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAllProjects();