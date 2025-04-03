import React, {memo, useMemo} from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useCubeQuery } from "@cubejs-client/react";

const COLORS = ["#5A2CD6", "#E35A4D", "#E5C84C", "#D0D0D0"]; // Colors for different cities

const formatToLacs = (value) => (value / 100000).toFixed(2); // Converts to lacs (L)

const SemiPieChart = ({ card }) => {
    const queryArray = JSON.parse(card.query);
    const citySalesQuery = queryArray[0]; // Single query for city-wise sales

    // Fetch city-wise sales data with the modified time dimension
    const { resultSet, isLoading, error } = useCubeQuery({
        ...citySalesQuery,
        timeDimensions: [
            {
                dimension: "blinkit_insights_city.created_at",
                dateRange: "last month",
            },
        ],
    });

    // Transform data into the format required for the Pie Chart
    const transformedData = useMemo(() => {
        const data = resultSet?.loadResponses?.[0]?.data || [];
        return data.map((item, index) => ({
            name: item["blinkit_insights_city.name"],
            value: Number(item["blinkit_insights_city.sales_mrp_sum"] || 0),
            color: COLORS[index % COLORS.length], // Assign colors dynamically
        }));
    }, [resultSet]);

    // Calculate total sales in original units (before converting to lacs)
    const totalSalesAmount = transformedData.reduce((sum, item) => sum + item.value, 0);

    // Convert total sales to lacs for display
    const totalSalesAmountLacs = formatToLacs(totalSalesAmount);

    // Calculate percentage of each city
    const cityDataWithPercentage = transformedData.map(item => ({
        ...item,
        value: Number(formatToLacs(item.value)), // Ensure value remains a number
        percentage: ((item.value / totalSalesAmount) * 100).toFixed(1), // Correct percentage calculation
    }));

    if (isLoading) return <p className={"p-2"}>Loading chart...</p>;
    if (error) return <p className={"p-2"}>Error loading data.</p>;
    if (!transformedData.length) return <p className={"p-2"}>No data available for this month.</p>;

    return (
        <div className="chart-container">
            <div className="total-item-container total-pie-label">
                <p className={"total-label"}>Total</p>
                <h5 className="total-item-text">₹{totalSalesAmountLacs}L</h5>
            </div>

            {cityDataWithPercentage.length && <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                    <Pie
                        data={cityDataWithPercentage}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={90}
                        startAngle={180}
                        endAngle={0}
                        fill="#8884d8"
                        label={false}
                    >
                        {cityDataWithPercentage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`₹${value}L`, name]} />
                </PieChart>
            </ResponsiveContainer>
            }

            <div className="semiPie-chart-labels-container">
                {cityDataWithPercentage.map((item, index) => (
                    <div key={index} className="city-label">
                        <span style={{ color: item.color, fontSize: "14px", marginRight: "6px" }}>●</span>
                        {item.name}
                        <span className={"price-label"} style={{ marginLeft: "auto"}}>₹{item.value}L</span>
                        <span className={"per-label"}>
                            {item.percentage}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(SemiPieChart);
