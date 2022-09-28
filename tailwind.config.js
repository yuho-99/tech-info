module.exports = {
  // 用于配置不使用的样式 purge
  //  './views/**/*.html',  *代表模糊查找， 文件名使用一个*，文件夹名使用两个*
  purge: {
    enabled: true,
    content: [
      './views/**/*.html',
      './views/*.html'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
