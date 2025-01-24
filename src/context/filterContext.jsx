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
        setTotalPages(amount);
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
