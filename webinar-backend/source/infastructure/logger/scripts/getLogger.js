module.exports = function (strategy, name, helpers) {
    const {currentTime} = helpers

    return require("../index").create(strategy, name, {time: currentTime})
}
