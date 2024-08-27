// Function to generate filenames and copy images
function generateFilenames(entry, fieldName) {
    // Get the current date in the format 'YYYY-'
    var currentDate = moment().format('YYYY') + '-';

    // Retrieve the array of images from the specified field
    var images = entry.field(fieldName);
    var imgCount = images.length;
    var filenames = [];
    var filenameSet = new Set(); // To track unique filenames
1
    for (var i = 0; i < imgCount; i++) {
        // Generate the base filename by sanitizing the 'məhsulAdı' field
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
        var imageName = images[i].substring(images[i].lastIndexOf('/'));
        
        // Generate a unique filename
        var newFilename = currentDate + baseFilename + '-' + (i + 1) + '-pierringshot.jpg';
        var uniqueFilename = newFilename;

        // Ensure unique filename by appending a counter if necessary
        var counter = 1;
        while (filenameSet.has(uniqueFilename)) {
            uniqueFilename = currentDate + baseFilename + '-' + (i + 1) + '-' + (counter++) + '-pierringshot.jpg';
        }
        filenameSet.add(uniqueFilename);

        var singleRow = imagePath + "," + '"' + uniqueFilename + '"' + "\n";
        filenames.push(singleRow);
    }

    // Return the array of new filenames
    return filenames;
}

// Get all entries
var entries = lib().entries();
var allItemLinks = '';

// Loop through each entry
for (var i = 0; i < entries.length; i++) {
  var entry = entries[i];

  // Generate filenames for the current entry
  var newFileNamesArray = generateFilenames(entry, 'məhsulFotosu');

  // Convert the array to a string with line breaks
  var itemLinks = newFileNamesArray.join('\n');

  // Add to allItemLinks only if it's not already present
  allItemLinks += itemLinks + '\n';
}

// Save all itemLink values to a CSV file
//var filename = (moment().format('YYYYMMDD_HHmmss'))+ "_newFileName.csv"; // Replace with your desired file path
var filename = '.input.csv'

var file = file(filename);
file.write(allItemLinks.replace(/\n\n/g,"\n"));
file.close();

message('ℹ️'+filename+' — ✅ \n\n'+(moment().format(' 🗓️ · DD MMMM YYYY \n⏰ · HH:MM:SS ')))

message("Clone repo pierringshot/copy-and-rename-files/ and run ./start.sh")
