exports.asynchronously = async promise => {
    // if (!(promise instanceof Promise))
    //     return [{ messag: `Argument passed ${JSON.stringify(promise)} is not an instance of promise.` }, null]
    try {
        return [null, await promise]
    } catch (error) {
        console.log(error)
        return [error, null]
    }
}