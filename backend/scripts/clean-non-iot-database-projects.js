const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanNonIoTDatabaseProjects() {
  try {
    console.log('🧹 Cleaning projects that are not IoT or Database tracks...');
    
    // First, let's see what tracks exist
    const allProjects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        field: true,
        isDeleted: true
      }
    });
    
    console.log('\n📊 Current projects by field:');
    const fieldCounts = {};
    allProjects.forEach(project => {
      if (!project.isDeleted) {
        fieldCounts[project.field] = (fieldCounts[project.field] || 0) + 1;
      }
    });
    
    Object.entries(fieldCounts).forEach(([field, count]) => {
      console.log(`   • ${field}: ${count} projects`);
    });
    
    // Find projects that are NOT IoT or Database
    const projectsToDelete = allProjects.filter(project => 
      !project.isDeleted && 
      project.field !== 'IoT' && 
      project.field !== 'Database'
    );
    
    console.log(`\n🗑️  Found ${projectsToDelete.length} projects to remove:`);
    projectsToDelete.forEach(project => {
      console.log(`   • "${project.title}" (${project.field})`);
    });
    
    if (projectsToDelete.length > 0) {
      // Soft delete these projects
      const result = await prisma.project.updateMany({
        where: {
          id: {
            in: projectsToDelete.map(p => p.id)
          }
        },
        data: {
          isDeleted: true
        }
      });
      
      console.log(`\n✅ Successfully soft-deleted ${result.count} projects`);
      
      // Also remove any saved projects that reference these deleted projects
      const savedProjectsResult = await prisma.savedProject.deleteMany({
        where: {
          projectId: {
            in: projectsToDelete.map(p => p.id)
          }
        }
      });
      
      if (savedProjectsResult.count > 0) {
        console.log(`🗑️  Removed ${savedProjectsResult.count} saved project references`);
      }
    } else {
      console.log('\n✅ No projects to clean - all existing projects are already IoT or Database');
    }
    
    // Show final state
    const remainingProjects = await prisma.project.findMany({
      where: { isDeleted: false },
      select: {
        field: true
      }
    });
    
    const finalCounts = {};
    remainingProjects.forEach(project => {
      finalCounts[project.field] = (finalCounts[project.field] || 0) + 1;
    });
    
    console.log('\n📊 Final projects by field:');
    Object.entries(finalCounts).forEach(([field, count]) => {
      console.log(`   • ${field}: ${count} projects`);
    });
    
    console.log('\n🎯 System now only contains IoT and Database projects!');
    
  } catch (error) {
    console.error('❌ Error cleaning projects:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanNonIoTDatabaseProjects();