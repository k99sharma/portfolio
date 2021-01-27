const findFrameWorks = (madeByString) => {
    const tech_array = madeByString.split(',');
    return tech_array;
}

module.exports = findFrameWorks;