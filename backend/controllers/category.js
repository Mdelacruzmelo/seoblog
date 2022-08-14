const Category = require('../models/category');
const slugify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {

    const { name } = req.body
    const slug = slugify(name).toLowerCase()

    let category = new Category({ name, slug })

    category.save((err, data) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })
        else if (!data) return res.status(400).json({ error: 'Creation failed. Please contact support.' })

        return res.json({
            ...data,
            message: 'Category created sccessfully.'
        })

    })
}

exports.list = (_req, res) => {

    Category.find({}).exec((err, data) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })
        else if (!data) return res.status(400).json({ error: 'Creation failed. Please contact support.' })

        return res.json(data)

    })
}

exports.read = (req, res) => {

    const slug = req?.params?.slug?.toLowerCase()

    Category.findOne({ slug }).exec((err, category) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })
        else if (!category) return res.status(400).json({ error: 'Creation failed. Please contact support.' })

        return res.json(category) // Tambien retornar los blogs asociados

    })
}

exports.remove = (req, res) => {

    const slug = req?.params?.slug?.toLowerCase()

    Category.findOneAndRemove({ slug }).exec((err, _category) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })

        return res.json({ message: 'Category removed successfully' })

    })
}
