# Google Maps API Setup Instructions

## Step 1: Get Your API Key
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Maps JavaScript API" 
4. Go to "Credentials" and create an API key
5. Restrict the API key to your domain for security

## Step 2: Add Your API Key
In the file `indoor-dog-parks/houston.html`, find this line:
```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initMap&libraries=geometry"></script>
```

Replace `YOUR_API_KEY_HERE` with your actual Google Maps API key.

## Step 3: Security (Important!)
- In Google Cloud Console, restrict your API key to your domain
- Set HTTP referrer restrictions to: `https://your-domain.com/*`
- Never commit your API key to public repositories

## Features Included
- Interactive map centered on Houston
- Custom markers for each indoor dog park
- Info windows with park details (name, address, phone, website)
- Map updates automatically when you filter parks
- Responsive design for mobile devices
- Custom dog paw markers with your brand colors

## API Usage
This integration uses the Maps JavaScript API which includes:
- Map display
- Custom markers
- Info windows  
- Bounds fitting
- Custom styling

The map will automatically show all Houston indoor dog parks as markers and update when users apply filters.
