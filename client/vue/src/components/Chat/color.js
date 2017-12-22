const color = {
  bgcolor: {
    rgb: ''
  },
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
  }]
}

var bgnumber = Math.floor(Math.random() * color.bgcolors.length)
color.bgcolor.rgb = color.bgcolors[bgnumber].rgb

export default color
