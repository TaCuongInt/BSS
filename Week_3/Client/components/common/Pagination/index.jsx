import styles from "./Pagination.module.scss";

export const Pagination = ({ devicesPerPage, totalDevices, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDevices / devicesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.wrapper}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.page_item}>
            <a
              onClick={() => paginate(number)}
              href="#"
              className={styles.page_link}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
