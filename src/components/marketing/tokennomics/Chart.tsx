import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts'; // Install recharts

interface ChartProps {
  data: { name: string; value: number; color: string }[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default Chart;