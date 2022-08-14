const Category = require('../models/category');
const slugify = require('slugify')

exports.create = (req, res) => {

    const { name } = req.body
    const slug = slugify(name).toLowerCase()

    let category = new Category({ name, slug })

    category.save((err, data) => {

        if (err) return res.status(400).json({ error: err })
        else if (!data) return res.status(400).json({ error: 'Creation failed. Please contact support.' })

        return res.json({
            ...data,
            message: 'Category created sccessfully.'
        })

    })
}
