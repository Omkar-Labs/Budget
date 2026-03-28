import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto'
import { User } from '@/App';
import { Doughnut } from 'react-chartjs-2';



const DashChart = () => {
  const { data, setData } = React.useContext(User);
  const [symbol, setsynbol] = useState("₹");
  const [hoverData, setHoverData] = useState({ x: null, y: null });
  const category = data.stats.categoryStats.map((item) => item._id);
  const options = {
    responsive: true,
    maintainAspectRatio: false,


    onHover: (event, chartElement) => {
      if (chartElement.length > 0) {
        const index = chartElement[0].index;
        const xValue = category[index];
        const yValue = data.stats.categoryStats[index].totalAmount;
        setHoverData({ x: xValue, y: yValue });
      }
      else {
        setHoverData({ x: null, y: null });
      }
    },
    Touch: {
      enabled: true,
      mode: 'nearest',
      external: (context) => {
        const { chart, tooltip } = context;
        if (!tooltip._active || tooltip._active.length === 0) {
          setHoverData({ x: null, y: null });
          return;
        }
        const activePoint = tooltip._active[0].element;
        const index = activePoint.$context.dataIndex;
        const xValue = category[index];
        const yValue = data.stats.categoryStats[index].totalAmount;
        setHoverData({ x: xValue, y: yValue });
      }
    },
    plugins: {
      tooltip: { enabled: false,
        events: ['click','touchstart','touchmove','touchend','touchcancel','pointerenter','pointerleave']
       }
    },

  }


  const config = {
    type: "Doughnut",
    data: {
      Labels: category,
      datasets: [
        {
          Label: "Category Stats",
          data: data.stats.categoryStats.map((item) => item.totalAmount),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 205, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)"
          ],
          borderWidth: 1

        }
      ]
    }
  }
  useEffect(() => {
    if (data.user.currency === "INR") {
      setsynbol("₹");
    } else if (data.user.currency === "USD") {
      setsynbol("$");
    } else if (data.user.currency === "EUR") {
      setsynbol("€");
    }
  }, [])
  return (
    <div className="dashboard w-full h-auto min-h-[340px] lg:h-80 row-span-1 lg:row-span-3 relative p-4 lg:p-6 flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl rounded-lg border-white/20 shadow-[0_0_30px_rgba(255,0,255,0.1)]">
      <div className={`transition-opacity duration-300 ${hoverData.x ? 'opacity-100' : 'opacity-0'} z-10  sm:block absolute top-5 right-5 pointer-events-none `}>
        <div className="p-4 rounded xl bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl">
          <p className="text-pink-400 text-xs uppercase font-bold tracking-widest">{hoverData.x}</p>
          <h3 className="text-2xl font-bold text-white">{symbol}{hoverData.y?.toLocaleString()}</h3>
        </div>
      </div>
      <h2 className="text-xl lg:text-2xl font-bold text-white z-10 w-full text-center lg:text-left mb-4">Category Distribution</h2>
      <div className="relative w-full h-full flex-1 flex justify-center items-center aspect-square max-h-[250px] lg:max-h-[300px] lg:mb-0">
          <Doughnut data={config.data} redraw={true} options={options} />
      </div>
    </div>
  )
}

export default DashChart