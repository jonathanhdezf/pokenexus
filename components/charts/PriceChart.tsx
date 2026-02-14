"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PriceChart({ data }: { data: any[] }) {
    // Add fallback data if data is empty or undefined
    const chartData = data && data.length > 0 ? data.map(point => ({ ...point, price: Number(point.price) })) : [
        { date: 'Old', price: 90 },
        { date: 'Now', price: 100 }
    ];

    return (
        <div className="h-[300px] w-full bg-surface/50 border border-white/5 rounded-xl p-4">
            <h3 className="text-gray-400 text-sm mb-4">Price History (USD)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#666"
                        fontSize={12}
                        tickFormatter={(val) => `$${val}`}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value) => [`$${value}`, 'Price']}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#00c6ff"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#0a0a0a', stroke: '#00c6ff', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#00c6ff' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
