class HelloController {

    greet(req, res) {
        res.status(200).send('Hello User');
    }

}

module.exports = new HelloController();