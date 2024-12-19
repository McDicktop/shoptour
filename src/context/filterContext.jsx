import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState({
        category: null,                            // УСТАНОВИЛ НАЧАЛЬНОЕ ЗНАЧЕНИЕ 'all' для отображения товаров во всех категориях
        sort: '',
        search: '',
        fields: null
    });

    const setCategory = (category) => {
        setFilter({ ...filter, ['category']: category })
    };

    const setSort = (sort) => {
        setFilter({ ...filter, ['sort']: sort })
    };

    const setSearch = (search) => {
        setFilter({ ...filter, ['search']: search })
    }

    const [page, setPage] = useState(1);

    const changePage = (newPage) => {
        setPage(newPage)
    }

    const [totalPages, setTotalPages] = useState(0);

    const changeTotalPages = (amount) => {
        setTotalPages(amount)
    }

    const setFieldsVisibility = (fields) => {
        setFilter({ ...filter, ['fields']: fields })
    }


    const filterValue = {
        filter,
        setCategory,
        setSort,
        setSearch,
        page,
        changePage,
        totalPages,
        changeTotalPages,
        setFieldsVisibility
    }

    return (
        <FilterContext.Provider value={filterValue}>
            {children}
        </FilterContext.Provider>
    );
};


export const useFilter = () => {
    return useContext(FilterContext);
};

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
