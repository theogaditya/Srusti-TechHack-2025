import CountUp from "react-countup";
import "./Statistics.css";
import { useInView } from "react-intersection-observer";
import { useTranslation } from 'react-i18next';

export function Statistics() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const { t } = useTranslation();

  return (
    <section ref={ref} className="statistics-container">
      <div className="statistics-header">
        <h2>{t('statistics.header')}</h2>
        <p>{t('statistics.description')}</p>
      </div>

      <div className="statistics-content">
        <div className="stat-item">
          <div className="stat-number">
            {inView && <CountUp end={1000} duration={3} />}+
          </div>
          <div className="stat-description">{t('statistics.complaintsResolved')}</div>
        </div>

        <div className="stat-item">
          <div className="stat-number">
            {inView && <CountUp end={500} duration={3} />}+
          </div>
          <div className="stat-description">{t('statistics.registeredUsers')}</div>
        </div>

        <div className="stat-item">
          <div className="stat-number">
            {inView && <CountUp end={50} duration={3} />}%
          </div>
          <div className="stat-description">{t('statistics.responseTimeImprovement')}</div>
        </div>

        <div className="stat-item">
          <div className="stat-number">
            {inView && <CountUp end={90} duration={3} />}%
          </div>
          <div className="stat-description">{t('statistics.customerSatisfaction')}</div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: "90%" }}></div>
        </div>
        <div className="progress-bar-label">{t('statistics.progressBarLabel')}</div>
      </div>
    </section>
  );
}