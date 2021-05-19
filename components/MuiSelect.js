import { Select, FormControl, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: '2em',
        marginBottom: 0,
    },
    selectLabel: {
        background: '#fff',
    },
}))

const MuiSelect = ({label, ...restProps }) => {
    const classes = useStyles()

    return (
        <FormControl
            fullWidth
            className={classes.formControl}
            variant="outlined"
        >
            <InputLabel
                id={`${label.replace(' ', '_')}-label`}
                className={classes.selectLabel}
            >
                {label}
            </InputLabel>
            <Select
                labelId={`${label.replace(' ', '_')}-select-label`}
                id={`${label.replace(' ', '_')}-select`}
                defaultValue=""
                {...restProps}
                // value={age}
                // onChange={handleChange}
            />
        </FormControl>
    )
}

export default MuiSelect
