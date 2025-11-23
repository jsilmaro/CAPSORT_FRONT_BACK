const { validationResult } = require('express-validator');
const prisma = require('../config/database');

const getAllProjects = async (req, res) => {
  try {
    const { field, year, search, page = 1, limit = 10 } = req.query;
    
    // Build where clause for filtering
    const where = {};
    
    if (field) {
      where.field = {
        contains: field,
        mode: 'insensitive'
      };
    }
    
    if (year) {
      where.year = parseInt(year);
    }
    
    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          author: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Fetch projects with uploader information
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          uploader: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take
      }),
      prisma.project.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.status(200).json({
      projects,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      },
      status: 200
    });

  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching projects',
      status: 500
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return res.status(400).json({
        error: 'Invalid project ID',
        status: 400
      });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        uploader: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        status: 404
      });
    }

    res.status(200).json({
      project,
      status: 200
    });

  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching project',
      status: 500
    });
  }
};

const createProject = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
        status: 400
      });
    }

    const { title, author, year, field, fileUrl } = req.body;
    const uploadedBy = req.user.id;

    const project = await prisma.project.create({
      data: {
        title,
        author,
        year: parseInt(year),
        field,
        fileUrl,
        uploadedBy
      },
      include: {
        uploader: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Project created successfully',
      project,
      status: 201
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      error: 'Internal server error while creating project',
      status: 500
    });
  }
};

const updateProject = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
        status: 400
      });
    }

    const { id } = req.params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return res.status(400).json({
        error: 'Invalid project ID',
        status: 400
      });
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      return res.status(404).json({
        error: 'Project not found',
        status: 404
      });
    }

    const { title, author, year, field, fileUrl } = req.body;

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        author,
        year: parseInt(year),
        field,
        fileUrl
      },
      include: {
        uploader: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true
          }
        }
      }
    });

    res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject,
      status: 200
    });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      error: 'Internal server error while updating project',
      status: 500
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return res.status(400).json({
        error: 'Invalid project ID',
        status: 400
      });
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      return res.status(404).json({
        error: 'Project not found',
        status: 404
      });
    }

    // Delete project (this will cascade delete saved projects due to foreign key constraints)
    await prisma.project.delete({
      where: { id: projectId }
    });

    res.status(200).json({
      message: 'Project deleted successfully',
      status: 200
    });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      error: 'Internal server error while deleting project',
      status: 500
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};