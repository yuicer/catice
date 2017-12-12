const color = {
  namecolors: [{
    name: '唐茶',
    rgb: '#B47157'
  }, {
    name: '樱',
    rgb: '#FEDFE1'
  }, {
    name: '梅幸茶',
    rgb: '#89916B'
  }, {
    name: '千草',
    rgb: '#3A8FB7'
  }, {
    name: '桔梗',
    rgb: '#6A4C9C'
  }],
  getcolor() {
    var namenumber = Math.floor(Math.random() * color.namecolors.length)
    return color.namecolors[namenumber].rgb
  }
}


module.exports = color