import { useFilter } from '../../../context/filterContext';

function Sort() {
    const { setSort } = useFilter();
    return (
        <select
            onChange={(e) => setSort(e.target.value)}
            name="filter"
            id="filter_id"
            className="w-24 border rounded-2xl h-8 p-1 cursor-pointer"
        >
            <option value="none">unsort</option>
            <option value="price_up">price ⬆️</option>
            <option value="price_down">price ⬇️</option>
        </select>
    )
}

export default Sort