const HeroSection = require('../models/HeroSectionModel');
const CardSection = require('../models/ElevatorSection')
const Advantages = require('../models/AdvantagesModel')
const Custom = require('../models/CustomMade')
const StoreSection = require('../models/StoreSection')
const ProductSection = require('../models/ProductSection')
const path = require('path'); // Use this to handle file paths
const router = require('../routes/HomeSectionRoutes');

const getHeroSection = async (req, res) => {
  try {
    const heroSection = await HeroSection.findOne();
    if (!heroSection) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.status(200).json(heroSection);
  } catch (error) {
    console.error('Error fetching hero section:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateHeroSection = async (req, res) => {
  try {
    // Destructure the image files from the request
    const { carousel1img, carousel2img, carousel3img, carousel4img } = req.files;

    // Validate the presence of image files
    const carousels = [];

    if (carousel1img) {
      carousels.push({
        image: `/uploads/${carousel1img[0].filename}`,
        title: req.body.carousel1title,
        description: req.body.carousel1description
      });
    }

    if (carousel2img) {
      carousels.push({
        image: `/uploads/${carousel2img[0].filename}`,
        title: req.body.carousel2title,
        description: req.body.carousel2description
      });
    }

    if (carousel3img) {
      carousels.push({
        image: `/uploads/${carousel3img[0].filename}`,
        title: req.body.carousel3title,
        description: req.body.carousel3description
      });
    }

    if (carousel4img) {
      carousels.push({
        image: `/uploads/${carousel4img[0].filename}`,
        title: req.body.carousel4title,
        description: req.body.carousel4description
      });
    }

    if (carousels.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Find the existing HeroSection or create a new one
    let heroSection = await HeroSection.findOne();
    if (!heroSection) {
      heroSection = new HeroSection();
    }
    

    // Update the carousels
    heroSection.carousels = carousels;
    await heroSection.save();

    res.status(200).json({ message: 'Hero section updated successfully', data: heroSection });
  } catch (error) {
    console.error('Error updating hero section:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCardsSection = async (req, res) => {
  try {
    // Destructure the image files from the request
    const { card1img, card2img, card3img, card4img } = req.files;


    // Validate the presence of image files
    const cards = [];

    if (card1img) {
      cards.push({
        image: `/uploads/${card1img[0].filename}`,
        title: req.body.card1title,
        description: req.body.card1description
      });
    }

    if (card2img) {
      cards.push({
        image: `/uploads/${card2img[0].filename}`,
        title: req.body.card2title,
        description: req.body.card2description
      });
    }

    if (card3img) {
      cards.push({
        image: `/uploads/${card3img[0].filename}`,
        title: req.body.card3title,
        description: req.body.card3description
      });
    }

    if (card4img) {
      cards.push({
        image: `/uploads/${card4img[0].filename}`,
        title: req.body.card4title,
        description: req.body.card4description
      });
    }

    if (cards.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Find the existing HeroSection or create a new one
    let elevatorSection = await CardSection.findOne();
    if (!elevatorSection) {
      elevatorSection = new CardSection();
    }
    

    // Update the carousels
    elevatorSection.description = req.body.description
    elevatorSection.cards = cards;
    await elevatorSection.save();

    res.status(200).json({ message: 'Elevator section updated successfully', data: elevatorSection });
  } catch (error) {
    console.error('Error updating elevator section:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCardSection = async (req, res) => {
  try {
    const cardsection = await CardSection.findOne();
    if (!cardsection) {
      return res.status(404).json({ message: 'Card section not found' });
    }
    res.status(200).json(cardsection);
  } catch (error) {
    console.error('Error fetching card section:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getAdvantageSection = async (req, res) => {
  try {
    const section = await Advantages.findOne();
    if (!section) {
      return res.status(404).json({ message: 'Section not found.' });
    }
    res.status(200).json(section);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Update Section
const updateAdvantageSection = async (req, res) => {
  try {
    const titles = req.body.cardtitle; // array of titles

    if (!Array.isArray(titles) || titles.length !== 8) {
      return res.status(400).json({ message: 'There must be exactly 8 titles.' });
    }
    
    // Collect files using their unique keys.
    const files = [];
    for (let i = 0; i < 8; i++) {
      const fileArr = req.files[`image${i}`];
      if (!fileArr || fileArr.length === 0) {
        return res.status(400).json({ message: `Image ${i} is missing.` });
      }
      files.push(fileArr[0]);
    }

    const cards = titles.map((title, index) => ({
      image: files[index].path,
      title,
    }));

    // Save section to DB...
    let section = await Advantages.findOne();
    if (!section) {
      section = new Advantages();
    }
    section.cards = cards;
    await section.save();

    res.status(200).json({ message: 'Section updated successfully.', section });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


const updateCustomMade = async (req, res) => {
  const image = req.file
  const { description } = req.body
  try {
    let custom = await Custom.findOne()
    if(!custom) {
      custom = new Custom()
    }
    custom.image = image.path
    custom.description = description
    await custom.save()
    res.status(200).json({ message: 'Section updated successfully', custom })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getCustom = async (req, res) => {
  try {
    const custom = await Custom.findOne()
    if(!custom) {
      return res.status(404).json({ message: 'Section not found.' });
    }
    return res.status(200).json(custom)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:'Internal server error'})
  }
}
const updateStoreSection = async (req, res) => {
  const image = req.file
  const { description, subheading } = req.body
  try {
    let store = await StoreSection.findOne()
    if(!store) {
      store = new StoreSection()
    }
    store.image = image.path
    store.description = description
    store.subheading = subheading
    await store.save()
    res.status(200).json({ message: 'Section updated successfully', store })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getStore= async (req, res) => {
  try {
    const store = await StoreSection.findOne()
    if(!store) {
      return res.status(404).json({ message: 'Section not found.' });
    }
    return res.status(200).json(store)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:'Internal server error'})
  }
}
const updateProductSection = async (req, res) => {
  try {
    // Validate the number of titles and images
    const titles = req.body.cardtitle;  // Array of titles
    const files = req.files;            // Array of files
    if (!Array.isArray(titles) || titles.length !== 12) {
      return res.status(400).json({ message: 'There must be exactly 12 titles.' });
    }

    if (!files || files.length !== 12) {
      return res.status(400).json({ message: 'There must be exactly 12 images uploaded.' });
    }

    // Build the cards array with title and image
    const cards = titles.map((title, index) => ({
      image: files[index].path,  // The file path of the uploaded image
      title,  // The title for the card
    }));

    // Save the section (if it doesn't exist, create it)
    let section = await ProductSection.findOne();
    if (!section) {
      section = new ProductSection();
    }

    section.cards = cards;
    await section.save();

    res.status(200).json({ message: 'Section updated successfully.', section });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
const getProductSection= async (req, res) => {
  try {
    const store = await ProductSection.findOne()
    if(!store) {
      return res.status(404).json({ message: 'Section not found.' });
    }
    return res.status(200).json(store)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:'Internal server error'})
  }
}
module.exports = {
  getHeroSection,
  updateHeroSection,
  updateCardsSection,
  getCardSection,
  updateAdvantageSection,
  getAdvantageSection,
  updateCustomMade,
  getCustom,
  updateStoreSection,
  getStore,
  updateProductSection,
  getProductSection

};
