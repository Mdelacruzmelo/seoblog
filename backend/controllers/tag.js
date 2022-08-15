import slugify from 'slugify'
import Tag from '../models/tag.js'
import { errorHandler } from '../helpers/dbErrorHandler.js'

export const create = (req, res) => {

    const { name } = req.body
    const slug = slugify(name).toLowerCase()

    let tag = new Tag({ name, slug })

    tag.save((err, data) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })
        else if (!data) return res.status(400).json({ error: 'Creation failed. Please contact support.' })

        return res.json({
            ...data,
            message: 'Tag created sccessfully.'
        })

    })
}

export const list = (_req, res) => {

    Tag.find({}).exec((err, data) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })
        else if (!data) return res.status(400).json({ error: 'Could not get tags. Please contact support.' })

        return res.json(data)

    })
}

export const read = (req, res) => {

    const name = req?.params?.name?.toLowerCase()

    Tag.findOne({ name }).exec((err, tag) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })
        else if (!tag) return res.status(400).json({ message: 'Tag not found.' })

        return res.json(tag)

    })
}

export const remove = (req, res) => {

    const name = req?.params?.name?.toLowerCase()

    Tag.findOneAndRemove({ name }).exec((err, _category) => {

        if (err) return res.status(400).json({ error: errorHandler(err) })

        return res.json({ message: 'Tag removed successfully' })

    })
}
