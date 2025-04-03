import React, {memo, useMemo} from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area} from "recharts";
import { useCubeQuery } from "@cubejs-client/react";

const LineChartUI = ({card}) => {
    const queryArray = JSON.parse(card.query);
    const query1 = queryArray[0];
    const query2 = queryArray[1];
    const { resultSet: totalsQuerySet, isLoading: isLoadingTotalsQuery, error: errorTotalsQuery } = useCubeQuery({...query1, timeDimensions: [
            {
                dimension: "blinkit_insights_sku.created_at",
                dateRange: "last month",
            },
        ]});

    const { resultSet: timeSeriesQuerySet, isLoading: isLoadingTimeSeriesQuery, error: errorTimeSeriesQuery } = useCubeQuery({...query2, timeDimensions: [
            {
                dimension: "blinkit_insights_sku.created_at",
                dateRange: "last month",
                granularity: "day"
            },
        ]});

    const { resultSet: totalsQueryThisMonthSet, isLoading: isLoadingTotalsQueryThisMonth, error: errorTotalsQueryThisMonth } = useCubeQuery({...query1, timeDimensions: [
            {
                dimension: "blinkit_insights_sku.created_at",
                dateRange: "this month",
            },
        ]});

    const { resultSet: timeSeriesQueryThisMonthSet, isLoading: isLoadingTimeSeriesQueryThisMonth, error: errorTimeSeriesQueryThisMonth } = useCubeQuery({...query2, timeDimensions: [
            {
                dimension: "blinkit_insights_sku.created_at",
                dateRange: "this month",
                granularity: "day"
            },
        ]});

    const transformData =  useMemo(() => {
        const lastMonthData = (timeSeriesQuerySet?.loadResponses?.[0]?.data || []).map(item => ({
            date: moment(new Date(item["blinkit_insights_sku.created_at"])).format("DD"), // Format: DD/MM/YYYY
            quantityLastMonth: Number(item["blinkit_insights_sku.qty_sold"] || item["blinkit_insights_sku.sales_mrp_sum"])
        }));

        const thisMonthData = (timeSeriesQueryThisMonthSet?.loadResponses?.[0]?.data || []).map(item => ({
            date: moment(new Date(item["blinkit_insights_sku.created_at"])).format("DD"), // Format: DD/MM/YYYY
            quantityThisMonth: Number(item["blinkit_insights_sku.qty_sold"] || item["blinkit_insights_sku.sales_mrp_sum"])
        }));

        const mergedData = {};

        // Populate with last month's data
        lastMonthData.forEach(({ date, quantityLastMonth }) => {
            mergedData[date] = { date, quantityLastMonth, quantityThisMonth: 0 };
        });

        // Merge with this month's data
        thisMonthData.forEach(({ date, quantityThisMonth }) => {
            if (mergedData[date]) {
                mergedData[date].quantityThisMonth = quantityThisMonth;
            } else {
                mergedData[date] = { date, quantityLastMonth: 0, quantityThisMonth };
            }
        });

        // Convert object to array sorted by date
        return Object.values(mergedData).sort((a, b) => Number(a.date) - Number(b.date));
    }, [timeSeriesQuerySet, timeSeriesQueryThisMonthSet])

    const totalSoldThisMonth = useMemo(() => (totalsQueryThisMonthSet?.loadResponses?.[0]?.data?.[0]?.["blinkit_insights_sku.qty_sold"] || totalsQueryThisMonthSet?.loadResponses?.[0]?.data?.[0]?.["blinkit_insights_sku.sales_mrp_sum"] || 0), [totalsQueryThisMonthSet]);
    const totalSoldLastMonth = useMemo(() => (totalsQuerySet?.loadResponses?.[0]?.data?.[0]?.["blinkit_insights_sku.qty_sold"] || totalsQuerySet?.loadResponses?.[0]?.data?.[0]?.["blinkit_insights_sku.sales_mrp_sum"] || 0), [totalsQuerySet]);

    const percentageProfitLoss = (((totalSoldThisMonth - totalSoldLastMonth) / totalSoldLastMonth) * 100).toFixed(1);

    if ((isLoadingTotalsQuery || isLoadingTimeSeriesQuery || isLoadingTotalsQueryThisMonth || isLoadingTimeSeriesQueryThisMonth)) return <p className={"p-2"}>Loading chart...</p>;
    if (errorTotalsQuery || errorTimeSeriesQuery || errorTimeSeriesQueryThisMonth || errorTotalsQueryThisMonth) return <p className={"p-2"}>Error loading data: {errorTotalsQuery.message} {errorTimeSeriesQuery.message}</p>;

    return (
        <div>
        <div className={"chart-container"}>
            <div className="total-item-container">
                <h5 className={"total-item-text"}>{totalSoldThisMonth}</h5>
                <div className={"total-item-diff-container"}>
                    <div className={`${percentageProfitLoss <= 0 ? 'red-color' : ''} total-item-diff`}>
                        { percentageProfitLoss > 0 && <i className={"material-icons"}>arrow_upward</i>}
                        { percentageProfitLoss <= 0 && <i className={"material-icons red-color"}>arrow_downward</i>}
                        <p>{percentageProfitLoss}%</p>
                    </div>
                    <p className={"vs-last-month"}>vs {totalSoldLastMonth} last month</p>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={136}>
                <LineChart data={transformData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 14 }} />
                    <YAxis yAxisId="left" tick={{ fill: "#6b7280", fontSize: 14 }} />
                    <Tooltip />

                    {/* Solid Green Line (This Month) */}
                    <Line
                        type="monotone"
                        dataKey="quantityThisMonth"
                        stroke="#2C6F3A"
                        strokeWidth={2}
                        dot={false}
                        yAxisId="left"
                    />

                    {/* Dashed Red Line (Last Month) */}
                    <Line
                        type="monotone"
                        dataKey="quantityLastMonth"
                        stroke="#C15337"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        yAxisId="left"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className={"chart-labels-container"}>
            <div className={"d-flex align-items-center justify-content-center"} style={{gap: '6px'}}>
                <div className={"this-month-color"}></div>
                <p>This Month</p>
            </div>
            <div className={"d-flex align-items-center justify-content-center"} style={{gap: '6px'}}>
                <div className={"this-month-color last-month-color"}></div>
                <p>Last Month</p>
            </div>
        </div>
    </div>
)
    ;
};

import moment from "moment";

export default memo(LineChartUI);
