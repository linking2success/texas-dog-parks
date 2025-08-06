<?php
// Test file to check if ads.txt redirect is working
// Visit: https://dog-park.info/test-ads-redirect.php

echo "<h2>Ads.txt Redirect Test</h2>";
echo "<p>Testing if ads.txt redirect is working...</p>";

// Test the redirect
$url = "https://dog-park.info/ads.txt";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_NOBODY, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$redirectUrl = curl_getinfo($ch, CURLINFO_REDIRECT_URL);

curl_close($ch);

echo "<p><strong>HTTP Status Code:</strong> $httpCode</p>";
echo "<p><strong>Redirect URL:</strong> $redirectUrl</p>";

if ($httpCode == 301 && $redirectUrl == "https://srv.adstxtmanager.com/19390/dog-park.info") {
    echo "<p style='color: green;'><strong>✅ SUCCESS!</strong> Redirect is working correctly!</p>";
} else {
    echo "<p style='color: red;'><strong>❌ ERROR:</strong> Redirect is not working as expected.</p>";
}

echo "<p><a href='$url' target='_blank'>Click here to test manually</a></p>";
?>
