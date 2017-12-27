const color = {
  bgcolors: [{
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
  }]
}
var namenumber = Math.floor(Math.random() * color.namecolors.length)
color.namecolor = color.namecolors[namenumber].rgb

var bgnumber = Math.floor(Math.random() * color.bgcolors.length)
color.bgcolor = color.bgcolors[bgnumber].rgb

export default color
