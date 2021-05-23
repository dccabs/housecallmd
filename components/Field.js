import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  FormRow: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '15px',
    borderTop: '1px solid #eaeaea',

    '& :first-child': {
      borderTop: 'none',
    },
  },
  FormRowLabel: {
    width: '15%',
    minWidth: '70px',
    padding: '11px 0',
    color: '#000',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  FormRowInput: {
    paddingLeft: '10px',
    fontSize: '16px',
    width: '100%',
    padding: '11px 15px 11px 0',
    color: '#000',
    backgroundColor: 'transparent',
    border: 'none',

    '&::placeholder': {
      color: '#b9b9b9',
      marginLeft: '10px',
    },

    '&:focus': {
      outline: `1px solid ${theme.palette.secondary.main}`,
    },
  },
}))

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.FormRow}>
      <label htmlFor={id} className={classes.FormRowLabel}>
        {label}
      </label>
      <input
        className={classes.FormRowInput}
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Field
