import * as echarts from 'echarts';
import 'echarts-gl';
import $ from "jquery";


var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

$.getScript(
  'https://cdn.jsdelivr.net/npm/simplex-noise@2.4.0/simplex-noise.js'
).done(function () {
  var noise = new SimplexNoise(Math.random);
  function generateData(theta, min, max) {
    var data = [];
    var SIZE = 100;
    for (var i = 0; i <= SIZE; i++) {
      for (var j = 0; j <= SIZE; j++) {
        var value = noise.noise2D((i / SIZE) * 2, (j / SIZE) * 2);
        valMax = Math.max(valMax, value);
        valMin = Math.min(valMin, value);
        data.push([i, j, value * 2 + 4]);
      }
    }
    return data;
  }
  var valMin = Infinity;
  var valMax = -Infinity;
  var data = generateData(2, -5, 5);
  myChart.setOption(
    (option = {
      tooltip: {},
      xAxis3D: {
        type: 'value'
      },
      yAxis3D: {
        type: 'value'
      },
      zAxis3D: {
        type: 'value',
        max: 10,
        min: 0
      },
      grid3D: {
        environment: '#fff',
        axisPointer: {
          show: false
        },
        light: {
          main: {
            intensity: 5
          },
          ambientCubemap: {
            texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
            exposure: 1,
            diffuseIntensity: 0.5,
            specularIntensity: 2
          }
        }
      },
      series: [
        {
          type: 'bar3D',
          data: data,
          barSize: 1,
          shading: 'realistic',
          wireframe: {
            show: true
          },
          realisticMaterial: {
            roughness: 1,
            metalness: 1
          },
          itemStyle: {
            color: '#afaf00'
          }
        }
      ]
    })
  );
});

option && myChart.setOption(option);
