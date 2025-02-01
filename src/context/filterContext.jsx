import { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {

    const filterInit = {
        category: null,
        sort: '',
        search: '',
        fields: null
    };

    const [filter, setFilter] = useState({...filterInit});

    const resetFilter = () => {
        setFilter((prev) => {
            Object.keys(prev).forEach((key) => {
                if(key in filterInit) {
                    prev[key] = filterInit[key];
                }
            });
            return {...prev};
        })
    }

    const setCategory = (category) => {
        setFilter((prev) => ({ ...prev, ['category']: category }))
    };

    const setSort = (sort) => {
        setFilter((prev) => ({ ...prev, ['sort']: sort }))
    };

    const setSearch = (search) => {
        setFilter((prev) => ({ ...prev, ['search']: search }))
    }

    const [page, setPage] = useState(1);

    const changePage = (newPage) => {
        setPage(newPage)
    }

    const [totalPages, setTotalPages] = useState(0);

    const changeTotalPages = (amount) => {
        setTotalPages(amount);
    }

    const setFieldsVisibility = (fields) => {
        setFilter((prev) => ({ ...prev, ['fields']: fields }))
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
        setFieldsVisibility,
        resetFilter
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
