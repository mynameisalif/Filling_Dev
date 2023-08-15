import React, { useRef, useEffect } from "react";
import { init, getInstanceByDom } from "echarts";

export function ReactECharts({

  option = {
    xAxis: {
      type: 'category',
      data: ['JUN', 'JUL', 'AUG'],
      axisTick: {
        show:false
      },
      fontSize: '10px',
      axisLine: {
        show:false
      }
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    
    grid: {
      left: '-20%',
      right: '0%',
      bottom: '0%',
      top: '0%',
      containLabel: true
    },
    series: [
      {
        data: [
          {
            value: 100,
            itemStyle: {
              color: '#E9A100'
            }
          },{
            value: 170,
            itemStyle: {
              color: '#29823B'
            }
          },{
            value: 155,
            itemStyle: {
              color: '#FF0025'
            }
          },
        ],
        type: 'bar',
        barCategoryGap: "1%",
        barWidth: 24,
        label: {
          show: true,
          position: 'insideTop',
          color: '#fff',
          offset : [0, 10]
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.3)',
          borderRadius: [8, 8, 8, 8]
        },
         itemStyle: {
            normal: {
                barBorderRadius: [8, 8, 8 ,8 ]
            }
        }
      }
    ],
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
