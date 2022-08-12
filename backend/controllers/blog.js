exports.time = (_req, res) => {
    res.json({ time: Date().toString() })
}