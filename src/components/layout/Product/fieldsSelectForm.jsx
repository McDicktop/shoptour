import PropTypes from "prop-types";
import { useFilter } from "../../../context/filterContext";
import "./styles.css";

function CheckField({ name, status }) {
    const { setFieldsVisibility, filter } = useFilter();
    return (
        <div className="field">
            <label htmlFor={`${name}`}>{`${name}`}</label>
            <input
                id={`${name}`}
                type="checkbox"
                name="group"
                checked={status}
                onChange={() => {
                    const newArr = filter.fields.map((el) => el.name !== name ? el : { name, isVisible: !status })
                    setFieldsVisibility(newArr);
                }}
            />
        </div>
    );
}

function FieldsSelectForm({ closeForm }) {
    const { setFieldsVisibility, filter } = useFilter();
    const fields = ['code', 'title', 'type', 'description', 'price', 'rating', 'quantity', 'sale'];

    return (
        <form>
            <button
                type="button"
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
                onClick={() => {
                    setFieldsVisibility(fields.map((name) => ({ name, isVisible: true })));
                    closeForm();
                }}
            >Default</button>

            <div className="select_fields">
                {filter.fields && filter.fields.map((el, ind) => {
                    return (
                        <CheckField key={`${ind}`} name={el.name} status={el.isVisible} />
                    )
                })}
            </div>

        </form>
    );
}

FieldsSelectForm.propTypes = {};

export default FieldsSelectForm;
