import { useFilter } from "../../../context/filterContext";
import { useProduct } from "../../../context/dataContext";

function CategorySelect() {
    const { categories } = useProduct();
    const { setCategory } = useFilter();
    return (
        <>
            {categories &&
                <select
                    onChange={(e) => setCategory(e.target.value === "all" ? null : e.target.value)}
                    name="cat"
                    id="cat_id"
                    className="w-24 border rounded-2xl h-8 p-1 cursor-pointer"
                >
                    {categories &&
                        categories.map((category, ind) => {
                            return (
                                <option key={`cat_${ind}`} value={category}>
                                    {category}
                                </option>
                            );
                        })}
                </select>
            }
        </>
    )
}

export default CategorySelect