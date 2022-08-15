import slugify from 'slugify'
import Category from '../models/category.js'
import { errorHandler } from '../helpers/dbErrorHandler.js'

export const create = (req, res) => {

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

export const list = (_req, res) => {

    Category.find({}).exec((err, data) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })
        else if (!data) return res.status(400).json({ error: 'Could not get categories. Please contact support.' })

        return res.json(data)

    })
}

export const read = (req, res) => {

    const slug = req?.params?.slug?.toLowerCase()

    Category.findOne({ slug }).exec((err, category) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })
        else if (!category) return res.status(400).json({ message: 'Categories not found.' })

        return res.json(category) // Tambien retornar los blogs asociados

    })
}

export const remove = (req, res) => {

    const slug = req?.params?.slug?.toLowerCase()

    Category.findOneAndRemove({ slug }).exec((err, _category) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })

        return res.json({ message: 'Category removed successfully' })

    })
}
