const AboutSection = require('../models/AboutSection'); 

// Get About Section
exports.getAboutSection = async (req, res) => {
  try {
    const aboutSection = await AboutSection.findOne();
    if (!aboutSection) {
      return res.status(404).json({ message: 'About section not found' });
    }
    res.status(200).json(aboutSection);
  } catch (error) {
    console.error('Error fetching About section:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update About Section
exports.updateAboutSection = async (req, res) => {
  try {
    const { body, files } = req;

    // Handling image uploads
    const mainBanner = files?.mainBanner ? `/uploads/${files.mainBanner[0].filename}` : undefined;
    const firstSectionImage = files?.firstSectionImage ? `/uploads/${files.firstSectionImage[0].filename}` : undefined;
    const secondSectionImage = files?.secondSectionImage ? `/uploads/${files.secondSectionImage[0].filename}` : undefined;
    const thirdSectionImage = files?.thirdSectionImage ? `/uploads/${files.thirdSectionImage[0].filename}` : undefined;

    const aboutData = {
      mainBanner: mainBanner || body.mainBanner,
      firstSection: {
        image: firstSectionImage || body.firstSectionImage,
        subheading: body.firstSectionSubheading,
        description: body.firstSectionDescription,
      },
      secondSection: {
        image: secondSectionImage || body.secondSectionImage,
        description: body.secondSectionDescription,
      },
      thirdSection: {
        image: thirdSectionImage || body.thirdSectionImage,
        description: body.thirdSectionDescription,
      },
    };

    let aboutSection = await AboutSection.findOne();

    if (aboutSection) {
      // Update existing document
      aboutSection.mainBanner = aboutData.mainBanner;
      aboutSection.firstSection = aboutData.firstSection;
      aboutSection.secondSection = aboutData.secondSection;
      aboutSection.thirdSection = aboutData.thirdSection;

      await aboutSection.save();
      res.status(200).json({ message: 'About section updated successfully', aboutSection });
    } else {
      // Create a new document
      aboutSection = await AboutSection.create(aboutData);
      res.status(201).json({ message: 'About section created successfully', aboutSection });
    }
  } catch (error) {
    console.error('Error updating About section:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
