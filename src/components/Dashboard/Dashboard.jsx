import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Ship, Clock, PenTool, CheckCircle, Anchor, Calendar, LayoutDashboard, Settings, LogOut } from "lucide-react"
import Cookies from "js-cookie"
import moment from "moment"
import '../../styles/Dashboard.css'

function Dashboard() {

    const [totalShips, setTotalShips] = useState(0)
    const [overdueComponents, setOverdueComponents] = useState(0)
    const [jobsInProgress, setJobsInProgress] = useState(0)
    const [jobsCompleted, setJobsCompleted] = useState(0)

    useEffect(() => {
        try {
            const ships = JSON.parse(Cookies.get("ships") || "[]")
            const components = JSON.parse(Cookies.get("components") || "[]")
            const jobs = JSON.parse(Cookies.get("jobs") || "[]")

            setTotalShips(ships.length || 10)

            const today = moment()
            const overdue = components.filter((c) => moment(c.lastMaintenanceDate).isBefore(today))
            setOverdueComponents(overdue.length || 20)

            const inProgress = jobs.filter((j) => j.status.toLowerCase() === "in progress").length
            const completed = jobs.filter((j) => j.status.toLowerCase() === "completed").length

            setJobsInProgress(inProgress || 3)
            setJobsCompleted(completed || 3)
        } catch (error) {
            // If cookies aren't available, use mock data
            setTotalShips(10)
            setOverdueComponents(20)
            setJobsInProgress(3)
            setJobsCompleted(3)
        }
    }, [])

    const chartData = [
        { name: "In Progress", value: jobsInProgress, color: "#ffca28" },
        { name: "Completed", value: jobsCompleted, color: "#66bb6a" },
    ]

    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const RADIAN = Math.PI / 180
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        const name = chartData[index]?.name || ""
        const displayText = `${name} (${(percent * 100).toFixed(0)}%)`

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: "12px", fontWeight: "bold" }}
            >
                {displayText}
            </text>
        )
    }

    return (
        <div className="dashboard-main">
            <div className="dashboard-header">
                <h1>Maintenance KPI Dashboard</h1>
                <p>Overview of ship maintenance metrics and performance indicators</p>
            </div>

            <div className="kpi-cards">
                <div className="kpi-card ship-card">
                    <div className="kpi-card-content">
                        <div className="kpi-info">
                            <p className="kpi-title">Total Ships</p>
                            <h3 className="kpi-value">{totalShips}</h3>
                        </div>
                        <div className="kpi-icon ship-icon">
                            <Ship />
                        </div>
                    </div>
                </div>

                <div className="kpi-card overdue-card">
                    <div className="kpi-card-content">
                        <div className="kpi-info">
                            <p className="kpi-title">Overdue Components</p>
                            <h3 className="kpi-value">{overdueComponents}</h3>
                        </div>
                        <div className="kpi-icon overdue-icon">
                            <Clock />
                        </div>
                    </div>
                </div>

                <div className="kpi-card progress-card">
                    <div className="kpi-card-content">
                        <div className="kpi-info">
                            <p className="kpi-title">Jobs In Progress</p>
                            <h3 className="kpi-value">{jobsInProgress}</h3>
                        </div>
                        <div className="kpi-icon progress-icon">
                            <PenTool />
                        </div>
                    </div>
                </div>

                <div className="kpi-card completed-card">
                    <div className="kpi-card-content">
                        <div className="kpi-info">
                            <p className="kpi-title">Jobs Completed</p>
                            <h3 className="kpi-value">{jobsCompleted}</h3>
                        </div>
                        <div className="kpi-icon completed-icon">
                            <CheckCircle />
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-charts">
                <div className="chart-card">
                    <div className="chart-card-content">
                        <h3 className="chart-title">Job Status Distribution</h3>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        nameKey="name"
                                        label={false}
                                        labelLine={false}
                                        minAngle={10} // Ensures slices too small won't display confusing labels
                                    >

                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="activity-card">
                    <div className="activity-card-content">
                        <h3 className="activity-title">Recent Activity</h3>
                        <div className="activity-list">
                            {[
                                {
                                    title: "Maintenance completed on Ship #5",
                                    time: "2 hours ago",
                                    icon: <CheckCircle className="activity-icon completed" />,
                                },
                                {
                                    title: "New component flagged as overdue",
                                    time: "5 hours ago",
                                    icon: <Clock className="activity-icon overdue" />,
                                },
                                {
                                    title: "Job #28 started on Ship #3",
                                    time: "Yesterday",
                                    icon: <PenTool className="activity-icon progress" />,
                                },
                                {
                                    title: "New ship added to fleet",
                                    time: "2 days ago",
                                    icon: <Ship className="activity-icon ship" />,
                                },
                            ].map((item, index) => (
                                <div key={index} className="activity-item">
                                    <div className="activity-icon-container">{item.icon}</div>
                                    <div className="activity-details">
                                        <p className="activity-item-title">{item.title}</p>
                                        <p className="activity-time">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard