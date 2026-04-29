const { z } = require('zod');

// Validation schemas
const addSchoolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
});

const listSchoolsSchema = z.object({
  latitude: z.preprocess((val) => parseFloat(val), z.number().min(-90).max(90)),
  longitude: z.preprocess((val) => parseFloat(val), z.number().min(-180).max(180)),
});

module.exports = {
  addSchoolSchema,
  listSchoolsSchema
};
