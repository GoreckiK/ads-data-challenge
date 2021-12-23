const Legend = () => {
    return (
        <div className="legend">
            <p>- Select zero to N DataSources</p>
            <p>- Select zero to N Campaigns</p>
            <p>(where zero means "All")</p>
            <p>Hitting "Apply", filters the chart to show a timeseries for both Clicks and Impressions for given Datasource and Campaigns - logical AND</p>
        </div>
    )
}

export default Legend;