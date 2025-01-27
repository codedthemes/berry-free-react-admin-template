import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import '../../assets/css/main.css';
const BajajAreaChartCard = () => {
  const [news, setNews] = useState(null);
  const newsData = [
    ['Volume got high in January.', 'Investors are excited for this year.'],
    ['Paycheck is closed for February.', 'New product launch in March.'],
    ['Revenue increased significantly in March.', 'Quarterly results were announced in April.'],
    ['New product launch in May.', 'Market share grew in June.'],
    ['Partnership deal closed in July.', 'New feature is coming out in August.']
  ];
  const options = {
    chart: {
      id: 'area-chart',
      type: 'area',
      events: {
        click: (event, chartContext, config) => {
          const dataPointIndex = config.dataPointIndex; // Index of the clicked data point
          setNews(newsData[dataPointIndex]);
        }
      }
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    }
  };

  const series = [
    {
      name: 'Sales',
      data: [30, 40, 35, 50, 49]
    }
  ];

  return (
    <div>
      <ApexCharts options={options} series={series} type="area" height={350} />
      {news && (
        <div className="news-container">
          <div className="news-header">
            <div className="header-text">Related News</div>
          </div>
          <div className="news-content">
            <div className="news-items">
              {news.map((item, index) => (
                <div className="news-item" key={index}>
                  {index === 0 ? (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png"
                      width={30}
                      height={30}
                      alt="twitter"
                    />
                  ) : (
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/031/737/215/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png"
                      width={30}
                      height={30}
                      alt="facebook"
                    />
                  )}
                  <span className="news-title">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BajajAreaChartCard;
