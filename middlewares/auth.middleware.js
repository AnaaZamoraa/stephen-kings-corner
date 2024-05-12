const isLogged = (req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect('/login');
    }
};

const checkRoles = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) {
        next();
    } else {
        res.redirect('/login');
    }
};

const ownAccount = (req, res, next) => {
    const { id } = req.params;

    if (id == req.session.currentUser._id) {
        next();
    } else {
        res.redirect('/login');
    }
};

const checkOwnAccountOrRoles = (req, res, next) => {
    const { id } = req.params;
    const { role } = req.session.currentUser;

    if (id == req.session.currentUser._id || role === "ADMIN" || role === "DEV") {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = { isLogged, checkRoles, ownAccount, checkOwnAccountOrRoles };
