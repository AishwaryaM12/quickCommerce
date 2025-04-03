import React, {memo} from "react";
import { useCubeQuery } from "@cubejs-client/react";

const TableVisualization = ({card}) => {
    const queryArray = JSON.parse(card.query);
    const query = queryArray[0];
    const { resultSet, isLoading, error } = useCubeQuery({...query, timeDimensions: [
        {
            dimension: card.id === "blinkit-insights-city" ? "blinkit_insights_city.created_at" :"blinkit_insights_sku.created_at",
            dateRange:"last month"
        }
        ]
    });

    if (isLoading) return <p className={"p-2"}>Loading...</p>;
    if (error) return <p className={"p-2"}>Error loading data</p>;

    const data = resultSet.loadResponses?.[0]?.data || [];

    const datatableProperties = {
        columnOrder: card.datatableProperties.columnOrder,
        columnsPinned: card.datatableProperties.columnsPinned,
        columnsVisible: card.datatableProperties.columnsVisible,
    };

    const visibleColumns = datatableProperties.columnOrder.filter(col => datatableProperties.columnsVisible[col] !== false);
    const pinnedColumns = new Set(datatableProperties.columnsPinned);

    const totals = {};
    visibleColumns.forEach(col => {
        totals[col] = data.reduce((sum, item) => sum + (parseFloat(item[col]) || 0), 0);
    });

    return (
        <div className="table-container shadow-md rounded-lg overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-white">
                    {visibleColumns.map(col => (
                        <th key={col} className={`${pinnedColumns.has(col) ? 'sticky left-0 z-10' : ''}`}>
                            {col.split('.')[1].replace(/_/g, ' ')}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border-b">
                        {visibleColumns.map(col => (
                            <td key={col} className={`${pinnedColumns.has(col) ? 'sticky left-0' : ''}`}>
                                {col === (card.id === "blinkit-insights-city" ? "blinkit_insights_city.name" : "blinkit_insights_sku.name") ? (
                                    <div className="d-flex items-center gap-2" style={{minWidth: 174}}>
                                        <i className="material-icons check">
                                            check_box
                                        </i>
                                        <div className={"table-name-sku"}>
                                            {item[col]}
                                        </div>
                                    </div>
                                ) : col.includes("sales") || col.includes("selling_price_avg") || col.includes("sales_mrp_max") ? (
                                    `₹${Number(item[col]).toFixed(2)}`
                                ) : col.includes("drr") || col.includes("discount_avg") || col.includes("on_shelf_availability") ? (
                                    `${Number(item[col]).toFixed(2)}%`
                                ) : (
                                    Number(item[col]).toFixed(2)
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                <tr style={{background: 'white',
                    position: 'sticky',
                    bottom: 0,
                    'z-index': 99}}>
                    {visibleColumns.map(col => (
                        <td key={col} className={`${pinnedColumns.has(col) ? 'sticky left-0 bg-white total-row' : 'total-row'}`}>
                            {col === (card.id === "blinkit-insights-city" ? "blinkit_insights_city.name" : "blinkit_insights_sku.name") ? "Total" : totals[col]}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default memo(TableVisualization);
