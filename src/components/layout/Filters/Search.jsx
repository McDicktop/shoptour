import React from 'react';
import { useFilter } from '../../../context/filterContext';

function Search() {
    const { filter, setSearch } = useFilter();
    return (
        <>
            {filter &&
                <input
                    type="text"
                    value={filter.search}
                    placeholder="type to search..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-48 h-8 pl-4 pr-4 border rounded-2xl font-normal"
                />}
        </>

    )
}

export default Search