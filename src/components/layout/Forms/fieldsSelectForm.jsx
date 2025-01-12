import PropTypes from "prop-types";
import { useFilter } from "../../../context/filterContext";

function CheckField({ name, status }) {
    const { setFieldsVisibility, filter } = useFilter();
    return (
        <div
            className="relative flex flex-col"
        >
            <label
                htmlFor={`${name}`}
                className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700"
            >{`${name}`}</label>
            <input
                id={`${name}`}
                type="checkbox"
                name="group"
                checked={status}
                onChange={() => {
                    const newArr = filter.fields.map((el) => el.name !== name ? el : { name, isVisible: !status })
                    setFieldsVisibility(newArr);
                }}
                className="absolute right-[10px] top-[10px] w-4 h-4"
            />
        </div>
    );
}

function FieldsSelectForm({ closeForm }) {
    const { setFieldsVisibility, filter } = useFilter();
    const fields = ['code', 'title', 'type', 'description', 'price', 'rating', 'quantity', 'sale'];

    return (
        <form className="px-10 py-8 flex flex-col justify-self-center place-items-center border-[1px] rounded-3xl bg-white">
            <button
                type="button"
                className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-sky-700 hover:bg-sky-800 text-slate-200"
                onClick={() => {
                    const activeField = Array.from(
                        document.querySelectorAll('[name="group"]')
                    ).reduce((acc, current) => {
                        acc.push({
                            name: current.id,
                            isVisible: current.checked,
                        });

                        return acc;
                    }, []);

                    setFieldsVisibility(activeField);
                    closeForm();
                }}
            >
                Save
            </button>

            <button
                type="button"
                className="w-64 mb-10 px-4 py-1 border-[1px] rounded-full bg-sky-700 hover:bg-sky-800 text-slate-200"
                onClick={() => {
                    setFieldsVisibility(fields.map((name) => ({ name, isVisible: true })));
                    closeForm();
                }}
            >Default</button>

            <div className="select_fields">
                {filter.fields && filter.fields.map((el, ind) => {
                    return (
                        <CheckField
                            key={`${ind}`}
                            name={el.name}
                            status={el.isVisible}
                        />
                    )
                })}
            </div>

        </form>
    );
}

FieldsSelectForm.propTypes = {};

export default FieldsSelectForm;
