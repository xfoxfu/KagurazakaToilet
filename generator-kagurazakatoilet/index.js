var generators = require('yeoman-generator');
global.Promise = require('bluebird');

module.exports = generators.Base.extend({
  prompting: function () {
    this.prompt([{
      type: 'input',
      name: 'longitude',
      message: '厕所的经度'
    }, {
      type: 'input',
      name: 'latitude',
      message: '厕所的纬度'
    }, {
      type: 'input',
      name: 'location',
      message: '厕所的位置描述'
    }, {
      type: 'input',
      name: 'outer-image',
      message: '厕所的外景图相对目录'
    }, {
      type: 'input',
      name: 'inner-image',
      message: '厕所的内景图相对目录'
    }, {
      type: 'list',
      name: 'env-price-type',
      message: '所在区域价格类型',
      choices: ['公共', '收费', '限制']
    }, {
      type: 'input',
      name: 'env-price-price',
      message: '所在区域收费价格，可描述（如不收费请留空）'
    }, {
      type: 'list',
      name: 'toilet-price-type',
      message: '厕所价格类型',
      choices: ['免费', '收费']
    }, {
      type: 'input',
      name: 'toilet-price',
      message: '厕所价格，可描述（如不收费请留空）'
    }, {
      type: 'list',
      name: 'toilet-type',
      message: '厕所类型',
      choices: [{
        name: '残疾人',
        value: 'disabled'
      }, {
        name: '无性别',
        value: 'toilets'
      }]
    }, {
      type: 'expand',
      name: 'mirror',
      message: '是否有镜子',
      choices: [{
        key: "y",
        name: "✓ 有",
        value: "✓"
      }, {
        key: "n",
        name: "✗ 无",
        value: "✗"
      }, {
        key: "q",
        name: "○ 未考察",
        value: "○"
      }]
    }, {
      type: 'expand',
      name: 'desk',
      message: '是否有梳妆台/窗台/台子',
      choices: [{
        key: "y",
        name: "✓ 有",
        value: "✓"
      }, {
        key: "n",
        name: "✗ 无",
        value: "✗"
      }, {
        key: "q",
        name: "○ 未考察",
        value: "○"
      }]
    }, {
      type: 'input',
      name: 'note',
      message: '备注'
    }, {
      type: 'list',
      name: 'experience',
      message: '换装体验如何',
      choices: [{
        name: '非常好',
        value: 'large'
      }, {
        name: '一般',
        value: 'medium'
      }, {
        name: '垃圾',
        value: 'small'
      }]
    }], function (answers) {
      console.log(answers);
    })
  }
});
