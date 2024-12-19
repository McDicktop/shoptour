import { useFilter } from "../../context/filterContext";
import './pagination.css';

function Pagination({ amountPerPage }) {
    const { page, changePage } = useFilter();
    const pages = () => {
        return Array.from({ length: amountPerPage }).map((_, index) => (
            <li
                key={index}
                className={`pagination_item ${index === page - 1 ? "active" : ""
                    }`}
                onClick={() => changePage(index + 1)}
            >
                {index + 1}
            </li>
        ));
    }

    return (
        <div
            className="pagination_container"
            role="navigation"
            aria-label="Pagination"
        >
            <ul className="pagination_ul">{pages()}</ul>
        </div>
    );
}

export default Pagination;
