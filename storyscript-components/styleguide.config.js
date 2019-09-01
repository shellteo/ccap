const path = require('path')
const version = require('./package.json').version

module.exports = {
  // set your styleguidist configuration here
  title: 'Storyscript',
  pagePerSection: true,
  version: version,
  usageMode: 'expand',
  exampleMode: 'expand',
  components: 'src/components/**/[A-Z]*.vue',
  template: {
    // favicon: 'https://cdn.storyscript.io/favicon.ico'
  },
  require: [
    path.join(__dirname, 'src/scss/storyscript.scss'),
    path.join(__dirname, 'src/styleguide.js')
  ],
  sections: [{
    name: 'Introduction',
    content: 'src/docs/introduction.md'
  }, {
    name: 'Documentation',
    sections: [{
      name: 'Installation',
      content: 'src/docs/installation.md'
    }, {
      name: 'Configuration',
      content: 'src/docs/configuration.md'
    }]
  }, {
    name: 'Styleguide',
    sections: [{
      name: 'Typography',
      content: 'src/docs/typography.md'
    }, {
      name: 'Color palette',
      content: 'src/docs/colors.md'
    }]
  }, {
    name: 'Elements Components',
    content: 'src/docs/elements.md',
    components: 'src/components/elements/[A-Z]*.vue'
  }, {
    name: 'Form Components',
    content: 'src/docs/form.md',
    components: 'src/components/form/[A-Z]*.vue'
  }, {
    name: 'Layout Components',
    content: 'src/docs/layout.md',
    components: 'src/components/layout/[A-Z]*.vue'
  }]
}
