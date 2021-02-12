module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next()
        }
        req.flash('success_login', 'Please login to see your dashboard')
        res.redirect('/login')
    },

    ensureLoggedIn: (req, res, next)=>{
        // if user is already logged in, they cannot go to the login page
        if(!req.isAuthenticated()) {
            return next()
        }
        res.redirect('/dashboard')
    }
}