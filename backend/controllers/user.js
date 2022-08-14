// Esto da la información del profile
exports.removeUserPasswordFromProfile = (req, res) => {
    req.profile.hashed_password = undefined
    return res.json(req.profile)
}
