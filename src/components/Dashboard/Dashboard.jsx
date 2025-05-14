import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Ship, Clock, PenTool, CheckCircle } from "lucide-react";
import moment from "moment";
import '../../styles/Dashboard.css';

function Dashboard() {
    const reduxShips = useSelector((state) => state.ships.data);
    const reduxComponents = useSelector((state) => state.components.data);
    const reduxJobs = useSelector((state) => state.jobs.data);

    const [ships, setShips] = useState([]);
    const [components, setComponents] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const loadData = (key, reduxData) => {
            const local = localStorage.getItem(key);
            return local ? JSON.parse(local) : reduxData || [];
        };

        setShips(loadData("ships", reduxShips));
        setComponents(loadData("components", reduxComponents));
        setJobs(loadData("jobs", reduxJobs));
    }, [reduxShips, reduxComponents, reduxJobs]);

    const { totalShips, overdueComponents, jobStatusCount } = useMemo(() => {
        const totalShips = ships.length;

        const overdueComponents = components.filter(c =>
            moment(c.lastMaintenanceDate).isBefore(moment())
        ).length;

        const jobStatusCount = jobs.reduce((acc, job) => {
            const status = job.status?.toLowerCase() || "unknown";
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        return { totalShips, overdueComponents, jobStatusCount };
    }, [ships, components, jobs]);

    const chartData = [
        { name: "Open", value: jobStatusCount["open"] || 0, color: "#42a5f5" },
        { name: "In Progress", value: jobStatusCount["in progress"] || 0, color: "#ffca28" },
        { name: "Closed", value: jobStatusCount["closed"] || 0, color: "#ab47bc" },
        { name: "Completed", value: jobStatusCount["completed"] || 0, color: "#66bb6a" },
    ];

    return (
        <div className="dashboard-main">
            <div className="dashboard-header">
                <h1>Maintenance KPI Dashboard</h1>
                <p>Overview of ship maintenance metrics and performance indicators</p>
            </div>

            <div className="kpi-cards">
                <KpiCard title="Total Ships" value={totalShips} Icon={Ship} className="ship-card" />
                <KpiCard title="Overdue Components" value={overdueComponents} Icon={Clock} className="overdue-card" />
                <KpiCard title="Jobs Open" value={jobStatusCount["open"] || 0} Icon={PenTool} className="open-card" />
                <KpiCard title="Jobs Completed" value={jobStatusCount["completed"] || 0} Icon={CheckCircle} className="completed-card" />
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
                                        labelLine={false}
                                        minAngle={10}
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
                            {jobs
                                .slice(-4)
                                .reverse()
                                .map((job, index) => (
                                    <div key={index} className="activity-item">
                                        <div className="activity-icon-container">
                                            {getIcon(job.status)}
                                        </div>
                                        <div className="activity-details">
                                            <p className="activity-item-title">
                                                Job #{job.id} on Ship #{job.shipId || "N/A"} - {job.status}
                                            </p>
                                            <p className="activity-time">
                                                {moment(job.updatedAt || job.createdAt).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getIcon(status) {
    const lower = status?.toLowerCase();
    if (lower === "completed") return <CheckCircle className="activity-icon completed" />;
    if (lower === "in progress") return <PenTool className="activity-icon progress" />;
    if (lower === "open") return <Clock className="activity-icon open" />;
    if (lower === "closed") return <CheckCircle className="activity-icon closed" />;
    return <PenTool className="activity-icon" />;
}

function KpiCard({ title, value, Icon, className }) {
    return (
        <div className={`kpi-card ${className}`}>
            <div className="kpi-card-content">
                <div className="kpi-info">
                    <p className="kpi-title">{title}</p>
                    <h3 className="kpi-value">{value}</h3>
                </div>
                <div className={`kpi-icon ${className.replace("-card", "-icon")}`}>
                    <Icon />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
