function validateInput(text) {
    // setting up the regex for checking url
    let regex = new RegExp(
        "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
    );
    // returns true if url is correct and message if url is wrong
    if (regex.test(text)) {
        return true;
    } else {
        return false;
    }

}

export { validateInput }