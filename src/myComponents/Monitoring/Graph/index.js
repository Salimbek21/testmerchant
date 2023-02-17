import { useState } from "react";

import { Chart } from "../../../components/chart";
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "../../../icons/information-circle-outlined";
import { alpha, useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";

const data = {
  series: [
    {
      color: "#4CAF50",
      data: [
        3350, 1840, 2254, 5780, 9349, 5241, 2770, 2051, 3764, 2385, 5912,
      ],
      name: "Количество проданных товаров за текущий год",
    },

  ],
  xaxis: {
    dataPoints: [
      "Янв ",
      "Фев ",
      "Мар ",
      "Апр ",
      "Май ",
      "Июн ",
      "Июл ",
      "Авг ",
      "Сен ",
      "Окт ",
      "Ноя ",
      "Дек ",
    ],
  },
};

const Graph = (props) => {
  const theme = useTheme();
  const [selectedSeries, setSelectedSeries] = useState([
    "Organic",
    "Referral",
    "Social Media",
  ]);

  const handleChange = (event, name) => {
    if (!event.target.checked) {
      setSelectedSeries(selectedSeries.filter((item) => item !== name));
    } else {
      setSelectedSeries([...selectedSeries, name]);
    }
  };

  const chartSeries = data.series.filter((item) =>
    selectedSeries.includes(item.name)
  );

  const chartOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: chartSeries.map((item) => item.color),
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    markers: {
      hover: {
        size: undefined,
        sizeOffset: 2,
      },
      radius: 2,
      shape: "circle",
      size: 4,
      strokeWidth: 0,
    },
    stroke: {
      curve: "smooth",
      lineCap: "butt",
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: data.xaxis.dataPoints,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: [
      {
        axisBorder: {
          color: theme.palette.divider,
          show: true,
        },
        axisTicks: {
          color: theme.palette.divider,
          show: true,
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
      {
        axisTicks: {
          color: theme.palette.divider,
          show: true,
        },
        axisBorder: {
          color: theme.palette.divider,
          show: true,
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
        opposite: true,
      },
    ],
  };

  return (
    <>
      <Card sx={{
        mt:3
      }} {...props}>
        <CardHeader
          title="График продаж"
          action={
            <Tooltip title="Widget25 Source by channel">
              <InformationCircleOutlinedIcon sx={{ color: "action.active" }} />
            </Tooltip>
          }
        />
        <Divider />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            mt: 4,
            px: 2,
          }}
        >
          {data.series.map((item) => (
            <Box
              key={item.name}
              sx={{
                alignItems: "center",
                display: "flex",
                mr: 2,
              }}
            >
              <Checkbox
                checked={selectedSeries.some(
                  (visibleItem) => visibleItem === item.name
                )}
                onChange={(event) => handleChange(event, item.name)}
              />
              <Box
                sx={{
                  border: 3,
                  borderColor: selectedSeries.some(
                    (visibleItem) => visibleItem === item.name
                  )
                    ? item.color
                    : alpha(item.color, 0.4),
                  borderRadius: "50%",
                  height: 16,
                  mr: 1,
                  width: 16,
                }}
              />
              <Typography
                sx={{
                  color: selectedSeries.some(
                    (visibleItem) => visibleItem === item.name
                  )
                    ? "textPrimary"
                    : alpha(theme.palette.text.primary, 0.4),
                }}
                variant="subtitle2"
              >
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>
        <Chart
          height={400}
          options={chartOptions}
          series={chartSeries}
          type="line"
        />
      </Card>
    </>
  );
};

export default Graph;
