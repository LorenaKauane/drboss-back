const fs = require("fs");
module.exports  = (fold, image) => {
  if (image) {
    console.log(fold,image);
  
    return fs.unlink(`./uploads/${fold}/${image}`, err => {
      if (err) return console.log(err);
    });
  }
};