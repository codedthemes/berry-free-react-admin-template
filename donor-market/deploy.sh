#!/bin/bash

# Step 1: Build the React app
echo "Building the React app..."
npm run build

# Step 2: Define your S3 bucket
S3_BUCKET_NAME=blood-donor

# Step 3: Enable static website hosting for your S3 bucket
# Note: This step is usually done manually via the AWS Management Console
# Refer to the AWS documentation for more details

# Step 4: Sync the build directory with your S3 bucket
echo "Deploying to S3..."
aws s3 sync build/ s3://$S3_BUCKET_NAME/ --acl public-read

echo "Deployment complete!"