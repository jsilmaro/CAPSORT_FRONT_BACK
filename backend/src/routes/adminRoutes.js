const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const prisma = require('../config/database');

const router = express.Router();

// Clean projects data endpoint (admin only)
router.delete('/clean-projects', authenticateToken, requireAdmin, async (req, res) => {
  try {
    console.log('🧹 Admin requested projects data cleanup...');

    // Delete saved projects first (they reference projects)
    const deletedSavedProjects = await prisma.savedProject.deleteMany({});
    console.log(`Deleted ${deletedSavedProjects.count} saved project records`);

    // Delete all projects
    const deletedProjects = await prisma.project.deleteMany({});
    console.log(`Deleted ${deletedProjects.count} project records`);

    // Reset sequences
    await prisma.$executeRaw`ALTER SEQUENCE "Project_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "SavedProject_id_seq" RESTART WITH 1`;

    // Verify cleanup
    const projectCount = await prisma.project.count();
    const savedProjectCount = await prisma.savedProject.count();
    const userCount = await prisma.user.count();

    res.status(200).json({
      message: 'Projects data cleaned successfully',
      result: {
        deletedProjects: deletedProjects.count,
        deletedSavedProjects: deletedSavedProjects.count,
        currentState: {
          projects: projectCount,
          savedProjects: savedProjectCount,
          users: userCount
        }
      },
      status: 200
    });

  } catch (error) {
    console.error('Error cleaning projects data:', error);
    res.status(500).json({
      error: 'Failed to clean projects data',
      details: error.message,
      status: 500
    });
  }
});

// Get database statistics
router.get('/database-stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const projectCount = await prisma.project.count();
    const savedProjectCount = await prisma.savedProject.count();
    const aboutContentCount = await prisma.aboutContent.count();

    // Get soft-deleted projects count
    const softDeletedCount = await prisma.project.count({
      where: { isDeleted: true }
    });

    res.status(200).json({
      statistics: {
        users: userCount,
        projects: projectCount,
        savedProjects: savedProjectCount,
        aboutContent: aboutContentCount,
        softDeletedProjects: softDeletedCount
      },
      status: 200
    });

  } catch (error) {
    console.error('Error getting database stats:', error);
    res.status(500).json({
      error: 'Failed to get database statistics',
      details: error.message,
      status: 500
    });
  }
});

module.exports = router;