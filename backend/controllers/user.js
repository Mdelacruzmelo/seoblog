// Esto da la información del profile
export const removeUserPasswordFromProfile = (req, res) => {
    req.profile.hashed_password = undefined
    return res.json(req.profile)
}
