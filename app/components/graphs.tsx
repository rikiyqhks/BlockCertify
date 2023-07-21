'use client'

import 'chart.js/auto'
import { Radar } from 'react-chartjs-2'

const PhilosophyGraph = () => {
  const data = {
    labels: [
      '効率',
      '情報充足度',
      '信頼性',
      '将来性',
      '作成費用',
    ],
    datasets: [{  
      label: '従来の紙媒体の学歴証明',
      data: [50, 75, 70, 65, 80],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
      label: '今後のデジタル学歴証明',
      data: [100, 90, 95, 95, 0],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  };

  return (
    <>
      <div className='relative box-border h-1/3 w-1/3'>
        <Radar
          data={data}
          options={{ responsive: true, maintainAspectRatio: true }}
        />
      </div>
    </>
  )
}

export default PhilosophyGraph