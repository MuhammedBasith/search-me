import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;

/**
 * Upload file to S3
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {String} fileName - The name to give the file in S3
 * @returns {Promise<String>} - URL of the uploaded file
 */
const uploadToS3 = async (fileBuffer, fileName) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: 'image/jpeg', // Adjust based on file type if needed
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;
};

export { uploadToS3 }; 