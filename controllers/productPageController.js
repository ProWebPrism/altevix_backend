
const PageUpdate = require('../models/ProductPage');

// Create or update the page update document
const createOrUpdatePageUpdate = async (req, res) => {
   
    try {
      // Helper function to process card data
      const processCards = (cardsData, fieldName) => {
        if (!Array.isArray(cardsData)) {
          return [];
        }
      
        return cardsData.map((card, index) => {
          // Check for text data (title) and file data (image)
          const title = card;  // card is either title or image
          const file = req.files?.[fieldName]?.[index]; // Access the file based on the index
          
          const imageValue = file ? file.path : null;  // Get file path if file exists, otherwise null
      
          return {
            title: title && typeof title === 'string' ? title : 'Untitled',  // Ensure valid title, default to 'Untitled'
            image: imageValue,  // Assign image value (file path or null)
          };
        }).filter(card => card.title || card.image);  // Filter out empty cards
      };
      
  
      // Process slider, card, and complimentary sections
      const processedSliderCards = processCards(req.body.sliderCards, 'sliderCards');
      const processedCardSection = processCards(req.body.cardSection, 'cardSection');
      const processedComplimentaryCards = processCards(req.body.complimentaryCards, 'complimentaryCards');
            const bannerImage = req.files?.['bannerImage']?.[0]?.path || 
                           (typeof req.body.banner?.image === 'string' ? req.body.banner.image : null);
  
      // Prepare the data to save
      const data = {
        banner: {
          image: bannerImage,
          subheading: req.body.subheading || '',
          description: req.body.description || '',
        },
        sliderSection: {
          mainTitle: req.body.sliderMainTitle || '',
          cards: processedSliderCards,
        },
        cardSection: {
          cards: processedCardSection,
        },
        complimentary: {
          cards: processedComplimentaryCards,
        },
        updatedAt: new Date(),
      };
  
      console.log('Processed Data:', data); // Debug output to check data structure
  
      // Validate data before updating (making sure images are strings or null)
      Object.entries(data).forEach(([key, value]) => {
        if (value?.cards) {
          value.cards = value.cards.map(card => ({
            ...card,
            image: card.image || null, // Ensure image is either string or null
          }));
        }
      });
  
      // Save or update the page data in the database
      const updatedPageUpdate = await PageUpdate.findOneAndUpdate(
        {},  // Match any document (or specific ID if needed)
        data,
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        }
      );
  
      return res.status(200).json({
        message: updatedPageUpdate.isNew 
          ? 'Page update document created successfully.' 
          : 'Page update document updated successfully.',
        data: updatedPageUpdate,
      });
  
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ 
        message: 'Server error occurred while processing the request.',
        error: error.message,
      });
    }
  };
  
  
  
  


// Get the single page update document
const getPageUpdate = async (req, res) => {
  try {
    const pageUpdate = await PageUpdate.findOne();
    if (!pageUpdate) {
      return res.status(404).json({ message: 'Page update document not found.' });
    }
    res.status(200).json(pageUpdate);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = {
  createOrUpdatePageUpdate,
  getPageUpdate,
};
