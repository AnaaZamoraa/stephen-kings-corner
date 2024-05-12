const isThisRole = (user, roles) => roles.includes(user.role)
const isProfileOwner = (user, profileId) => user._id === profileId
module.exports = {isThisRole, isProfileOwner};
