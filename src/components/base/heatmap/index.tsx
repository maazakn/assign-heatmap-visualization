'use client';
import './styles.css';
import React from 'react';
import { format } from 'date-fns';
import { Box } from '@chakra-ui/react';
import { Tooltip } from 'react-tooltip';
import CalendarHeatmap from 'react-calendar-heatmap';

export type ChartDataT = {
  date: Date | string;
  count: number;
};

interface HeatmapProps {
  startDate: Date | string;
  endDate: Date | string;
  data: ChartDataT[];
}

const Heatmap: React.FC<HeatmapProps> = ({ startDate, endDate, data }) => {
  const hasData = data && data?.length > 0;

  return (
    <Box
      pl={'0.2rem'}
      pr={'0.5rem'}
      pt={'0.4rem'}
      overflowX={'auto'}
      whiteSpace={'nowrap'}
      border={'1px solid'}
      borderRadius={5}
      borderColor={'gray.300'}
      w={{ base: '100%', lg: '70%' }}
      h={{ base: '10rem', lg: 'max-content' }}
      sx={{
        '& > svg': {
          h: '100%',
          '& > g:nth-of-type(1)': { transform: 'translate(30px, -2px)' },
          '& > g:nth-of-type(3)': { transform: 'translate(5px, 14px)' },
        },
      }}>
      <CalendarHeatmap
        gutterSize={4}
        showMonthLabels
        showWeekdayLabels
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={item => {
          const dataItem = item as ChartDataT;

          if (!dataItem) return 'color-empty';

          return dataItem?.count > 4
            ? 'color-filled'
            : `color-github-${dataItem?.count}`;
        }}
        tooltipDataAttrs={(dataItem: ChartDataT) => {
          const count = dataItem?.count || 0;
          const date = dataItem?.date || new Date();

          const text = `${count > 0 ? count : 'No'} contributions on ${format(
            date,
            'do MMM'
          )}`;

          return {
            'data-tooltip-id': hasData?'tool-tip-id':"",
            'data-tooltip-place': 'top',
            'data-tooltip-content': text,
          };
        }}
      />

      <Tooltip
        id='tool-tip-id'
        style={{ borderRadius: '8px', fontSize: 11, padding: '4px 8px' }}
      />
    </Box>
  );
};

export default Heatmap;
