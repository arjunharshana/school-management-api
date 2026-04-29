const db = require('../config/db');
const { z } = require('zod');
const { haversineDistance } = require('../utils/distance');
const { sendSuccess, sendError } = require('../utils/response');
const { addSchoolSchema, listSchoolsSchema } = require('../utils/validators');

const addSchool = async (req, res) => {
  try {
    // Validate request body
    const validatedData = addSchoolSchema.parse(req.body);

    const { name, address, latitude, longitude } = validatedData;

    const [result] = await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    return sendSuccess(res, 201, 'School added successfully', {
      schoolId: result.insertId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 400, 'Validation failed', error.errors);
    }
    console.error('Error adding school:', error);
    return sendError(res, 500, 'Internal server error');
  }
};

const listSchools = async (req, res) => {
  try {
    // Validate query parameters
    const validatedQuery = listSchoolsSchema.safeParse(req.query);

    if (!validatedQuery.success) {
      return sendError(res, 400, 'Validation failed', validatedQuery.error.errors);
    }

    const userLat = validatedQuery.data.latitude;
    const userLon = validatedQuery.data.longitude;
    const [schools] = await db.query('SELECT * FROM schools');

    // Calculate distance and sort
    const schoolsWithDistance = schools.map(school => {
      const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    return sendSuccess(res, 200, 'Schools listed successfully', schoolsWithDistance);
  } catch (error) {
    console.error('Error listing schools:', error);
    return sendError(res, 500, 'Internal server error');
  }
};

module.exports = { addSchool, listSchools };