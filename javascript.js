
$( "#submit-btn" ).click(function() {
  var text = $("#textarea").val();
  try {
    const jsonObject = jsyaml.load(text); // Convert YAML to JSON
    const flattenedArray = flattenObject(jsonObject);
    console.log(flattenedArray);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(flattenedArray);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'example1.xlsx');

  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

function flattenObject(obj, parentKey = '') {
  let result = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object') {
        result = result.concat(flattenObject(obj[key], currentKey));
      } else {
        result.push([currentKey, obj[key]]);
      }
    }
  }

  return result;
}