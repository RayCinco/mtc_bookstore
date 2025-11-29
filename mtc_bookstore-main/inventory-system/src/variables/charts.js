/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
export const dashboard24HoursPerformanceChart = {
  data: (monthlyRevenue = []) => {
    const labels = monthlyRevenue.map((m) => m.month_name || "N/A");
    const totals = monthlyRevenue.map((m) => parseFloat(m.total || 0));

    return {
      labels,
      datasets: [
        {
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          data: totals,
        },
      ],
    };
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        ticks: {
          color: "#9f9f9f",
          beginAtZero: true,
          maxTicksLimit: 5,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      x: {
        barPercentage: 1.6,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          padding: 20,
          color: "#9f9f9f",
        },
      },
    },
  },
};

export const dashboardEmailStatisticsChart = {
  data: (orderStatus = []) => {
    const labels = orderStatus.map((s) => s.status || "Unknown");
    const counts = orderStatus.map((s) => parseInt(s.total || 0));
    const colors = ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157", "#6bd098"];

    return {
      labels,
      datasets: [
        {
          label: "Orders",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 0,
          data: counts,
        },
      ],
    };
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
    pieceLabel: {
      render: "percentage",
      fontColor: ["white"],
      precision: 2,
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      x: {
        barPercentage: 1.6,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  },
};

export const dashboardNASDAQChart = {
  data: (topProducts = []) => {
    const labels = topProducts.map((p) => p.name || "Unknown");
    const totals = topProducts.map((p) => parseInt(p.total_sold || 0));

    return {
      labels,
      datasets: [
        {
          data: totals,
          fill: false,
          borderColor: "#fbc658",
          backgroundColor: "transparent",
          pointBorderColor: "#fbc658",
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8,
          tension: 0.4,
        },
      ],
    };
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        ticks: {
          color: "#9f9f9f",
          beginAtZero: true,
        },
        grid: {
          drawBorder: false,
          display: true,
        },
      },
      x: {
        ticks: {
          color: "#9f9f9f",
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  },
};
