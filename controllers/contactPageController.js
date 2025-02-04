
const ContactDetails = require('../models/ContactPage')

const getContactDetails = async (req, res) => {
    try {
        const contact = await ContactDetails.findOne()
        if(!contact) {
            return res.status(404).json({ message: 'Contact details not found'})
        }
        res.status(200).json(contact)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message:'Internal server error'}) 
    }
}
const updateContactDetails = async (req, res) => {
    const { location, email, phone } = req.body
    try {
        const contact = await ContactDetails.findOne()
        if(contact) {
            contact.location  = location
            contact.phone = phone
            contact.email = email
            await contact.save()
        } else {
            await ContactDetails.create({ location, phone, email })
        }
        res.status(200).json({ message: 'Section updated successfully'})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating section'})
        
    }
}
module.exports = { getContactDetails, updateContactDetails }