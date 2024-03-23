#!/bin/sh

echo "Running DB initialization script..."
npx ts-node /usr/src/app/src/connections/dbInit.ts

echo "Starting development server..."
exec npm run dev
