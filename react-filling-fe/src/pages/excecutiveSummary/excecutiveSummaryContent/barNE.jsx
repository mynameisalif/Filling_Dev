import React, { useRef, useEffect } from "react";
import { init, getInstanceByDom } from "echarts";

export function ReactECharts({

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {
      
      bottom: '5px',
      data: [ '<50%', '50 - 80%', '> 80%']
    },
    grid: {
      left: '2%',
      right: '8%',
      bottom: '6%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      
      axisTick: {
        show:false
      },
      axisLine: {
        show:false
      },
      splitLine: {
        show: false
      },
      show: false,
      max: function (value) {
          return value.max;
      }
    },
    yAxis: {
      
      type: 'category',
      axisTick: {
        show:false
      },
      axisLine: {
        show:false},
        
      data: ['DRA','GGSN', 'SGSN/NME', 'HLR', 'EIR', 'CDN', 'IMS']
    },
    series: [
      {
        name: '<50%',
        type: 'bar',
        barWidth: 7,
        stack: 'total',
        label: {
          show: true,
          formatter: 'NE Total : 89',
          position: 'insideBottomLeft',
          offset: [220, -5]
        },
        emphasis: {
          focus: 'series'
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.3)',
          borderRadius: [50, 50, 50, 50]
        },
        itemStyle: {
            normal: {
                barBorderRadius: [50, 50, 50 ,50 ]
            }
        },
        data: [32, 30, 30, 33, 39, 33, 32]
      },
      {
        name: '50 - 80%',
        type: 'bar',
        stack: 'total',
        label: {
          show: false
        },
        emphasis: {
          focus: 'series'
        },
        
        itemStyle: {
          normal: {
              barBorderRadius: [50, 50, 50 ,50 ]
          }
      },
        data: [12, 13, 10, 13, 9, 23, 21]
      },
      {
        name: '> 80%',
        type: 'bar',
        stack: 'total',
        label: {
          show: false
        },
        emphasis: {
          focus: 'series'
        },
        
        itemStyle: {
          normal: {
              barBorderRadius: [50, 50, 50 ,50 ]
          }
      },
        data: [22, 18, 19, 23, 29, 33, 31]
      }
    ],
    color : ['#E9A100', '#29823B', '#D83232'],
  },
  style,
  settings,
  loading,
  theme,
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart;

    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    function resizeChart() {
      chart?.resize();
    }

    window.addEventListener("resize", resizeChart);

    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart.setOption(option, settings);
    }
  }, [option, settings, theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      if (loading === true) {
        chart.showLoading();
      } else {
        chart.hideLoading();
      }
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%", ...style }} />;
}
