import styles from './Tooltip.module.scss';

const Tooltip = ({ toolTipContent }) => (
  <div className={styles.container}>
    <div className={styles.tooltip}>{toolTipContent}</div>
    <svg
      alt="Иконка дополнительной информации"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.icon}
    >
      <path
        d="M8.00016 15.0144C11.858 15.0144 15.0145 11.858 15.0145 8.00008C15.0145 4.1422 11.858 0.985756 8.00016 0.985756C4.14229 0.985756 0.98584 4.1422 0.98584 8.00008C0.98584 11.858 4.14229 15.0144 8.00016 15.0144Z"
        stroke="#818181"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.81323 11.7011C8.81323 12.2058 8.40416 12.6148 7.89954 12.6148C7.39492 12.6148 6.98584 12.2058 6.98584 11.7011C6.98584 11.1965 7.39492 10.7874 7.89954 10.7874C8.40416 10.7874 8.81323 11.1965 8.81323 11.7011Z"
        fill="#818181"
      />
      <path
        d="M6.46549 4.9833C6.86055 4.58825 7.37805 4.39026 7.89584 4.38935C8.41601 4.38844 8.93646 4.58643 9.33334 4.9833C9.72931 5.37927 9.92729 5.89825 9.92729 6.41723C9.92729 6.93621 9.72931 7.45519 9.33334 7.85115C8.93646 8.24803 8.41601 8.44601 7.89584 8.4451L7.89941 9.45905"
        stroke="#818181"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default Tooltip;
