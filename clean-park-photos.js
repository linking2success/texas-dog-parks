// Node.js script to clean up external/broken image URLs in parks-data.js
// Usage: node clean-park-photos.js

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'parks-data.js');
const BACKUP_FILE = path.join(__dirname, 'parks-data-backup.js');

// Regex to match the photo field with an external URL (http, https, googleusercontent, streetviewpixels, etc.)
const photoRegex = /("photo"\s*:\s*")(https?:[^"']+|https?:\/\/streetviewpixels[^"']+|https?:\/\/lh3\.googleusercontent[^"']+|https?:\/\/gps-cs-s[^"']+|https?:\/\/gps-proxy[^"']+|https?:\/\/panoids[^"']+)(")/gi;

// Read the file
let data = fs.readFileSync(DATA_FILE, 'utf8');

// Backup the original file
fs.writeFileSync(BACKUP_FILE, data, 'utf8');

// Replace all external photo URLs with an empty string
const cleaned = data.replace(photoRegex, '$1$3');

// Write the cleaned data back
fs.writeFileSync(DATA_FILE, cleaned, 'utf8');

console.log('parks-data.js cleaned! Backup saved as parks-data-backup.js');
