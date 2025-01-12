import { useFilter } from "../../context/filterContext";

function Pagination({ amountPerPage }) {
    const { page, changePage } = useFilter();
    const pages = () => {
        return Array.from({ length: amountPerPage }).map((_, index) => (
            <li
                key={index}
                className={`bg-gray-200 text-black w-[24px] h-[24px] rounded-md cursor-pointer text-sm font-bold text-center leading-6 hover:opacity-80 ${index === page - 1 ? 'bg-gray-400' : ''}`}
                onClick={() => changePage(index + 1)}
            >
                {index + 1}
            </li>
        ));
    }

    return (
        <div
            className="w-full h-[60px] fixed bottom-[0px] left-[0px] bg-gray-200 flex justify-center"
            role="navigation"
            aria-label="Pagination"
        >
            <ul
                className="w-[400px] h-[40px] bg-white rounded-full flex place-self-center justify-center items-center gap-2"
            >{pages()}</ul>
        </div>
    );
}

export default Pagination;