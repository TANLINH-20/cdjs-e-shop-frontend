  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPaginationButtons = () => {
      const buttons = [];

      // Nút "Trước"
      buttons.push(
        <li
          key="prev"
          className={`page-item mx-2 ${currentPage === 1 ? 'disabled' : ''}`}
        >
          <button
            className="page-link text-dark position-static rounded-circle text-center "
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>
      );

      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <li
            key={i}
            className={`page-item mx-2 ${currentPage === i ? 'active' : ''}`}
          >
            <button className="page-link position-static rounded-circle text-center " onClick={() => onPageChange(i)}>
              {i}
            </button>
          </li>
        );
      }

      // Nút "Sau"
      buttons.push(
        <li
          key="next"
          className={`page-item mx-2 ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button
            className="page-link text-dark position-static rounded-circle text-center "
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      );

      return buttons;
    };

    // const renderPaginationButtons = () => {
    //   const buttons = [];
    
    //   // Nút "Trước"
    //   buttons.push(
    //     <li
    //       key="prev"
    //       className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
    //     >
    //       <button
    //         className="page-link"
    //         onClick={() => onPageChange(currentPage - 1)}
    //         disabled={currentPage === 1}
    //       >
    //         &laquo;
    //       </button>
    //     </li>
    //   );
    
    //   // Trang đầu tiên
    //   buttons.push(
    //     <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
    //       <button className="page-link" onClick={() => onPageChange(1)}>
    //         1
    //       </button>
    //     </li>
    //   );
    
    //   // Hiển thị dấu "..." nếu có nhiều trang
    //   if (currentPage > 3 && totalPages > 5) {
    //     buttons.push(
    //       <li key="ellipsis-start" className="page-item disabled">
    //         <span className="page-link">...</span>
    //       </li>
    //     );
    //   }
    
    //   // Hiển thị các nút phân trang xung quanh trang hiện tại
    //   const visiblePageRange = currentPage < totalPages - 2 ? [currentPage - 1, currentPage, currentPage + 1] : [totalPages - 2, totalPages - 1, totalPages];
    //   visiblePageRange.forEach((page) => {
    //     if (page > 1 && page < totalPages) {
    //       buttons.push(
    //         <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
    //           <button className="page-link" onClick={() => onPageChange(page)}>
    //             {page}
    //           </button>
    //         </li>
    //       );
    //     }
    //   });
    
    //   // Hiển thị dấu "..." nếu có nhiều trang
    //   if (currentPage < totalPages - 2 && totalPages > 5) {
    //     buttons.push(
    //       <li key="ellipsis-end" className="page-item disabled">
    //         <span className="page-link">...</span>
    //       </li>
    //     );
    //   }
    
    //   // Trang cuối cùng
    //   if (totalPages > 1) {
    //     buttons.push(
    //       <li key={totalPages} className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
    //         <button className="page-link" onClick={() => onPageChange(totalPages)}>
    //           {totalPages}
    //         </button>
    //       </li>
    //     );
    //   }
    
    //   // Nút "Sau"
    //   buttons.push(
    //     <li
    //       key="next"
    //       className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
    //     >
    //       <button
    //         className="page-link"
    //         onClick={() => onPageChange(currentPage + 1)}
    //         disabled={currentPage === totalPages}
    //       >
    //         &raquo;
    //       </button>
    //     </li>
    //   );
    
    //   return buttons;
    // };
    
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {renderPaginationButtons()}
        </ul>
      </nav>
    );
  };

  export default Pagination;