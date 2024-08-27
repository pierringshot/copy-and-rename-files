// Function to generate filenames and copy images
function generateFilenames(entry, fieldName) {
    var currentDate = moment().format('YYYY') + '-';

    var images = entry.field(fieldName);
    var imgCount = images.length;
    var filenames = [];
    var filenameSet = new Set();

    for (var i = 0; i < imgCount; i++) {
        var baseFilename = entry.field('məhsulAdı')
            .trim()
            .replace(/[çÇ]/g, 'c')
            .replace(/[şŞ]/g, 's')
            .replace(/[ıI]/g, 'i')
            .replace(/[Əə]/g, 'e')
            .replace(/[Öö]/g, 'o')
            .replace(/[Üü]/g, 'u')
            .replace(/[Ğğ]/g, 'g')
            .replace(/ /g, '-')
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '');

        var imagePath = '"' + (images[i].replace(/\[|\]|file:\/\//g, "").trim()) + '"';
        
        var newFilename = currentDate + baseFilename + '-' + (i + 1) + '-pierringshot.jpg';
        var uniqueFilename = newFilename;

        var counter = 1;
        while (filenameSet.has(uniqueFilename)) {
            uniqueFilename = currentDate + baseFilename + '-' + (i + 1) + '-' + (counter++) + '-pierringshot.jpg';
        }
        filenameSet.add(uniqueFilename);

        filenames.push(uniqueFilename);
    }

    return filenames;
}

// Function to set the new filenames in the 'newFilenames' field
function setNewFilenamesField(entry, newFilenamesArray) {
    var formattedFilenames = newFilenamesArray.map(function(filename) {
        return "file:///" + filename;
    });

    entry.set('newFilenames', formattedFilenames);
  
}

// Main function to generate and set filenames, and log them
function main() {
    var entries = lib().entries();
    var allItemLinks = '';

    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];

        var newFileNamesArray = generateFilenames(entry, 'məhsulFotosu');

        // Set the 'newFilenames' field with the generated filenames
        setNewFilenamesField(entry, newFileNamesArray);

        var itemLinks = newFileNamesArray.join('\n');
        allItemLinks += itemLinks + '\n';
    }

  //  var filename = (moment().format('YYYYMMDD_HHmmss')) + "_newFileName.csv";
var filename = ".input.csv"
    var file = file(filename);
    file.write(allItemLinks.replace(/\n\n/g, "\n"));
    file.close();

    message('ℹ️ ' + filename + ' — ✅ \n\n' + (moment().format(' 🗓️ · DD MMMM YYYY \n⏰ · HH:MM:SS ')));
}

// Run the main function
main();
