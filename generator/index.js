#!/usr/bin/env node

var inquirer = require('inquirer');
global.Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify').js_beautify;

var inquirerPrompt = Promise.promisify(inquirer.prompt);
var prompt = function (questions) {
  return inquirerPrompt(questions).catch(Promise.resolve);
};

var file;
prompt([{
    type: 'input',
    name: 'filename',
    message: '城市'
  }])
  .then(function (answers) {
    try {
      var file_content = fs.readFileSync(path.join(__dirname, '..', answers.filename + '.geojson')).toString('utf8');
      file = path.join(__dirname, '..', answers.filename + '.geojson');
      return file_content;
    } catch (err) {
      if (err instanceof Error) {
        if (err.code === 'ENOENT') {
          return prompt({
            type: 'confirm',
            name: 'create-file',
            message: '文件不存在，是否创建？',
            default: false
          });
        } else {
          throw err;
        }
      } else {
        throw err;
      }
    }
  })
  .then(function (result) {
    if (typeof result === 'string') {
      return JSON.parse(result);
    } else {
      if (result['create-file'] === true) {
        file = path.join(__dirname, '..', answers.filename + '.geojson');
        return {
          type: 'FeatureCollection',
          features: []
        };
      } else {
        throw new Error('操作已中止');
      }
    }
  })
  .then(function (geo) {
    return prompt([{
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
        message: '所在区域类型',
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
          key: 'y',
          name: '✓ 有',
          value: '✓'
        }, {
          key: 'n',
          name: '✗ 无',
          value: '✗'
        }, {
          key: 'q',
          name: '○ 未考察',
          value: '○'
        }]
      }, {
        type: 'expand',
        name: 'desk',
        message: '是否有梳妆台/窗台/台子',
        choices: [{
          key: 'y',
          name: '✓ 有',
          value: '✓'
        }, {
          key: 'n',
          name: '✗ 无',
          value: '✗'
        }, {
          key: 'q',
          name: '○ 未考察',
          value: '○'
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
      }])
      .then(function (answers) {
        if (!answers['longitude']) return Promise.reject('不合法的输入！缺少经度！');
        if (!answers['latitude']) return Promise.reject('不合法的输入！缺少纬度！');
        return answers;
      })
      .then(function (answers) {
        return Promise.resolve([geo, answers]);
      });
  })
  .spread(function (geo, answers) {
    return [geo, {
      'type': 'Feature',
      'properties': {
        'marker-symbol': answers['toilet-type'],
        'marker-color': answers['env-price-type'] === '公共' ? (answers['toilet-price-type'] === '免费' ? '#4CAF50' : '#CDDC39') : (answers['env-price-type'] === '收费' ? (answers['toilet-price-type'] === '免费' ? '#FFEB3B' : '#FF9800') : '#F44336'),
        'marker-size': answers['experience'],
        '位置': answers['location'],
        '外部环境图': answers['outer-image'],
        '内部环境图': answers['inner-image'],
        '所在区域类型': answers['env-price-type'] === '收费' ? ('收费: ' + answers['env-price-price']) : answers['env-price-type'],
        '厕所价格': answers['toilet-price-type'] === '收费' ? ('收费: ' + answers['toilet-price']) : answers['toilet-price-type'],
        '镜子': answers['mirror'],
        '台子': answers['desk'],
        '备注': answers['note']
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          parseFloat(answers['longitude']),
          parseFloat(answers['latitude'])
        ]
      }
    }];
  })
  .spread(function (geo, feature) {
    geo.features.push(feature);
    return geo;
  })
  .then(function (obj) {
    return JSON.stringify(obj);
  })
  .then(function (str) {
    return beautify(str, {
      "indent_size": 2
    });
  })
  .then(function (content) {
    fs.writeFileSync(file, content);
  })
  .catch(function (err) {
    console.log('An error occured:')
    console.error(err);
    process.exit(1);
  });
