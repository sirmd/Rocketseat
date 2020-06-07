

const toTitleCase = (text: string) => {
    return text.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
};


export default toTitleCase;