
import React from 'react';
import { BiTask, BiTrendingUp, BiTachometer, BiWallet } from "react-icons/bi";

import DashboardTemplate from '../../components/DashboardTemplate';
import DashboardHeader from '../../components/DashboardHeader';
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
import Card from '../../components/Card';
import DoughnutChart from '../../components/Charts/DoughnutChart';
import MultitypeChart from '../../components/Charts/MultitypeChart';

import styles from './DashboardHome.module.scss';

const data = [
  [2013, 510.62, 381.56, 195.59, 340.39, -351.04, 23.11],
  [2014, 517.65, 377.92, 205.49, 355.85, -312.17, -9.70],
  [2015, 528.87, 277.08, 222.40, 354.93, -306.47, -93.61],
  [2016, 549.69, 328.98, 256.56, 339.67, -293.13, -63.38],
  [2017, 571.70, 361.82, 245.52, 368.48, -326.18, -50.98],
  [2018, 588.55, 419.61, 251.07, 388.09, -337.48, -33.10]
];

const summary = [
  {
    title: "Due Tasks",
    total: 23,
    icon: <BiTask />
  },
  {
    title: "Open",
    total: 46,
    icon: <BiTrendingUp />
  },
  {
    title: "Proposals",
    total: 87,
    icon: <BiTachometer />
  },
  {
    title: "Tasks",
    total: 0o7,
    icon: <BiWallet />
  },
]

const DashboardHome: React.FC = () => {
  return (
      <DashboardTemplate>
            <DashboardHeader title="Dashboard">
            </DashboardHeader>
            <div className="dashboard_content">
              <section className={ styles.cards }>
                {
                  summary.map((overview, index) : any => 
                    <Card key={ index }>
                      <div className={styles.summary_card}>
                        <div>
                          { overview.icon }
                          <p>{ overview.title }</p>
                        </div>
                        <h2>{ overview.total }</h2>
                      </div>
                    </Card>
                  )
                }
              </section>
              <Card title="Line Chart">
                <LineChart />
              </Card>
              <Card title="Analysis Table">
                <table>
                  <thead>
                    <tr>
                        <td>Year</td>
                        <td>Transportation Gasoline Consumption</td>
                        <td>Transportation Diesel Consumption</td>
                        <td>Total Domestic Refined Gasoline</td>
                        <td>Total Domestic Refined Diesel</td>
                        <td>Gasoline Supply Gap</td>
                        <td>Diesel Supply Gap</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map((array, index) => {
                        return <tr key={ index }>{array.map((item, index) => <td key={ index }>{ item }</td>)}</tr>
                      })
                    }
                  </tbody>
                </table>
              </Card>
              <section className={`flex ${styles.bar_chart}`}>
                <Card title="Bar Chart">
                  <BarChart />
                </Card>
                <Card title="Description">
                  <p>Mollit voluptate dolore aliquip mollit in nulla sint mollit ullamco fugiat aute occaecat proident sint. Dolore consequat qui amet do in ullamco tempor proident sint dolore nostrud id. Amet officia et ullamco in ullamco eiusmod aliquip reprehenderit.</p>
                </Card>
              </section>
              <section className={`flex ${styles.bar_chart}`}>
                <Card title="Doughnut Chart">
                  <DoughnutChart />
                </Card>
                <Card title="Multitype Chart">
                  <MultitypeChart />
                </Card>
              </section>
            </div>
      </DashboardTemplate>
  )
}

export default DashboardHome;
