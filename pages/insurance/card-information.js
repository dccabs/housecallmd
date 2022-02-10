import {
  Typography,
  Box,
  Button,
  TextField,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useStore from '../../zustand/store'
import { useEffect, useState, useContext } from 'react'
import { Block } from '@material-ui/icons'
import { supabase } from '../../utils/initSupabase'
import CircularProgress from '@material-ui/core/CircularProgress';

import { SnackBarContext } from '../../components/SnackBar'

const useStyles = makeStyles((theme) => ({
  widthFull: {
    width: '100%',
  },
  h2: {
    marginTop: '.5em',
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttonLinks: {
    '@media screen and (max-width: 700px)': {
      '&:nth-child(2)': {
        order: -1,
      },
    },

    '& button': {
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    '& a': {
      textDecoration: 'none',
    },
  },
}))

const CardInformation = () => {
  const { setPlanNumber, setGroupNumber, setSelectedFile } = useStore()
  const [localPlanNumber, setLocalPlanNumber] = useState('')
  const [localGroupNumber, setLocalGroupNumber] = useState('')
  const [localSelectedFile, setLocalSelectedFile] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const openSnackBar = useContext(SnackBarContext)

  const classes = useStyles()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlanNumber(localPlanNumber)
    setGroupNumber(localGroupNumber)
    setSelectedFile(localSelectedFile)
    router.push('/enter-profile-information')
  }

  const handleUpdate = (e, fn) => {
    fn(e.target.value)
  }

  const handleUpload = async (e) => {
    setIsUploading(true);
    try {
      
      if (e.target.files[0]) {
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop()
        const fileName = `card-information-images/${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        console.log('filePath', filePath);
  
        let {data:uploadData, error: uploadError } = await supabase.storage
          .from('card-information')
          .upload(filePath, file)
  
        if (uploadError) {
          throw uploadError
        }

        if (uploadData && uploadData.Key) {
          console.log('uploadData', uploadData) 
          setIsUploading(false);
          setLocalSelectedFile(uploadData.Key);
        }
        return uploadData;
      }
      
    } catch (error) {
      setIsUploading(false);
      openSnackBar({ message: error, snackSeverity: 'error' })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>
          Insurance
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            mt="2em"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h4">
              Please fill out your insurance card information
            </Typography>
            <Box
              mt="1em"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <TextField
                value={localPlanNumber}
                className={classes.textFields}
                label="Plan number"
                variant="outlined"
                color="secondary"
                onChange={(e) => handleUpdate(e, setLocalPlanNumber)}
                required
              />
              <TextField
                value={localGroupNumber}
                className={classes.textFields}
                label="Group number"
                variant="outlined"
                color="secondary"
                onChange={(e) => handleUpdate(e, setLocalGroupNumber)}
              />
              <Box 
                 className={classes.textFields}
              >
                <InputLabel
                  label="Image"
                  htmlFor="outline-image-uploader"
                  color="secondary"
                  variant="outlined"
                  shrink
                  className={classes.widthFull}
                >
                {isUploading && <CircularProgress color="secondary"/>}
                  {isUploading ? 'Uploading Image' : 'Uploaded Image'}
                </InputLabel>
                <OutlinedInput
                  id="outline-image-uploader"
                  type="file"
                  accept="image/*"
                  component="span"
                  variant="outlined"
                  color="secondary"
                  className={classes.widthFull}
                  onChange={(e) => handleUpload(e)}
                >
                  {/* Upload Image */}
                </OutlinedInput>
              </Box>
            </Box>

            <Box
              mt="2em"
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Box m="1em" className={classes.buttonLinks}>
                <Button
                  onClick={() => router.back()}
                  color="secondary"
                  variant="contained"
                >
                  Back
                </Button>
              </Box>
              <Box m="1em" className={classes.buttonLinks}>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                  disabled={!localPlanNumber}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default CardInformation
