const date = new Date();

const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const createdDate = `${monthArray[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
let createdTime = `${date.getHours()}:${date.getMinutes()}`;

if(date.getHours() < 12){
    createdTime += ' AM';
}else{
    createdTime += ' PM';
}

const creationInfo = (Schema) => {
    Schema.add({
        createdOn: {
            type: String,
            default: createdDate
        },
        creationTime: {
            type: String,
            default: createdTime
        },
        modifiedOn: {
            type: Date,
            default: Date.now()
        }
    })
};



module.exports = creationInfo;
