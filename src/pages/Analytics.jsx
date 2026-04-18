
import { useEffect, useState } from 'react';
import API from '../services/api';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

function Analytics() {
    const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await API.get(`/url/analytics/${id}`);
      setAnalytics(res.data);
    };

    fetchAnalytics();
  }, [id]);

  if (!analytics) return <p>Loading...</p>;

  const data = {
    labels: ['Clicks'],
    datasets: [
      {
        label: 'Total Clicks',
        data: [analytics.totalClicks],
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Analytics</h2>
      <Bar data={data} />
    </div>
  );
}

export default Analytics;