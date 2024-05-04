'use client';

    import React , {useEffect , useState} from "react";
    import Chart from "chart.js";
    import axios from 'axios'
    
    export default function SecondTremor() {


      const [priceData , setPriceData] = useState([])



      const fetchSecondTremor = async () => {
        try{
          const res = await axios.get('http://localhost:3000/api/second_tremor');
         
          setPriceData(res.data.data)
        }catch(error){
          console.log(error)
        }
      }

      console.log(priceData[0] , 'priceData')

      useEffect(() => {
        fetchSecondTremor();
      },[])



      React.useEffect(() => {
        var config = {
          type: "line",
          data: {
            labels: [
              "Started",
              "Planning",
              "Research",
              "Development",
              "Testing",
              "Review",
              "Finished",
            ],
            datasets: [
              {
                label: 'Price',
                backgroundColor: "#3182ce",
                borderColor: "#3182ce",
                data: [0, 1,2, 2, 5, 6, 7],
                fill: false,
              },
              {
                label: 'Quantity',
                fill: false,
                backgroundColor: "#edf2f7",
                borderColor: "#edf2f7",
                data: [0, 1,2, 2, 5, 6, 7],
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Sales Charts",
              fontColor: "white",
            },
            legend: {
              labels: {
                fontColor: "white",
              },
              align: "end",
              position: "bottom",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Month",
                    fontColor: "white",
                  },
                  gridLines: {
                    display: false,
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(0, 0, 0, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                    fontColor: "white",
                  },
                  gridLines: {
                    borderDash: [3],
                    borderDashOffset: [3],
                    drawBorder: false,
                    color: "rgba(255, 255, 255, 0.15)",
                    zeroLineColor: "rgba(33, 37, 41, 0)",
                    zeroLineBorderDash: [20],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
      }, []);
      return (
        <>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                    Overview
                  </h6>
                  <h2 className="text-white text-xl font-semibold">Sales value</h2>
                </div>
              </div>
            </div>
            <div className="p-4 flex-auto">
              {/* Chart */}
              <div className="relative h-[500px]">
                <canvas id="line-chart"></canvas>
              </div>
            </div>
          </div>
        </>
      );
    }