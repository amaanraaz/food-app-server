const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/api/swiggy', async (req, res) => {
    const {lat,lng,offset} = req.query;
  try {
    const response = await axios.get('https://www.swiggy.com/dapi/restaurants/list/v5', {
      params: {
        lat: lat,
        lng: lng,
        offset: offset,
        'is-seo-homepage-enabled': true,
        page_type: 'DESKTOP_WEB_LISTING'
      },
      headers: {
        // Add any additional headers here
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    // Ensure the response contains data and is not empty
    if (!response.data) {
      throw new Error('Empty response from Swiggy API');
    }

    // Send the data back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Swiggy API:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Menu Fetch
app.get('/api/menu', async (req, res) => {
    const {  lat, lng, restaurantId } = req.query;
  try {
    const response = await axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&submitAction=ENTER&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`, {
      headers: {
        // Add any additional headers here
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    // Ensure the response contains data and is not empty
    if (!response.data) {
      throw new Error('Empty response from Swiggy API');
    }

    // Send the data back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Swiggy API:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
