import PropTypes from 'prop-types';

function InputField({
    className = '',
    label = '',
    id,
    type = 'text',
    value,
    onChange,
    onBlur = null,
    placeholder,

}) {
    return (
        // <div className="input_wrapper">
        <div className='flex flex-col'>
            <label
                className='text-slate-200'  
                htmlFor={id}
            >{label}</label>
            <input
                className={className}
                type={type}
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={(e) => onBlur && onBlur(e.target.value.trim())}
            />
        </div>
    )
}

InputField.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string
}

export default InputField;