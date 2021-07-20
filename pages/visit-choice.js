import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  CircularProgress,
  Switch,
  Modal,
  Paper,
} from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Auth } from '@supabase/ui'

import useStore from '../zustand/store'
import setStoreWithAuthInfo from '../utils/setStoreWithAuthInfo'
import visitPricing from '../public/constants/visitPricing'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
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
      textaDecoration: 'none',
    },
  },
  toggleText: {
    color: theme.palette.secondary.main,
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: theme.palette.secondary.main,
    },
  },
  modal: {
    margin: '8em auto',
    padding: '4em',
    maxWidth: '50rem',
    outline: 'none',
  },
}))

const VisitChoice = () => {
  const [value, setValue] = useState('video')
  const [loading, setLoading] = useState(false)
  const [firstName, setLocalFirstName] = useState(null)
  const [agreeToggle, setAgreeToggle] = useState(false)
  const [open, setOpen] = useState(false)
  const store = useStore()
  const { setVisitChoice, hasInsurance, isAuthenticated } = store
  const classes = useStyles()
  const router = useRouter()
  const { user, session } = Auth.useUser()

  useEffect(() => {
    if (user) {
      try {
        setLoading(true)
        fetch('/api/getSingleUser', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ email: user.email }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log('res', res)
            setLocalFirstName(res.firstName)
            setStoreWithAuthInfo({
              store,
              user: res,
            })
          })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  }, [user])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setVisitChoice(value)
    router.push('/payment')
  }

  const body = (
    <Paper className={classes.modal}>
      <p>
        The undersigned patient and/or patient&#39;s representative here by
        acknowledge receipt of HouseCall MD LLC&#39;s (HCMD LLC) document
        entitled &quot;notice of privacy practices, conditions for treatment,
        financial disclosure&#39;s, patient&#39;s right materials, financial
        assistance, and &quot;referenced here as the handout. CONSENT FOR CARE:
        I agreed to care and treatment by HCMD LLC and physicians, surgeons and
        other licensed independent and dependent practitioners involved in my
        care, together with other health care professionals employed by her
        otherwise affiliated with HCMD LLC who are designated to provide care
        for me. This consent may include examinations, tests, imaging studies,
        labs, anesthesia, and medical or surgical treatment(s). Additional
        documents and consent forms may be required for specific procedures. I
        understand I have the right to ask questions about my care at any time,
        and to be involved in my care decisions.
        <br />
        <br />
        RISK OF TREATMENT: NO GUARANTEE OF RESULTS OR CURE: No promise or
        guarantee of results or cure has been made to me. I know there are risks
        related to surgical, medical, or diagnostic procedure(s). These risks
        include the potential for infection, blood clots in veins and lungs,
        bleeding, allergic reactions, and death.
        <br />
        <br />
        PHOTOGRAPHS FOR TREATMENT, DIAGNOSIS AND/OR IDENTIFICATION: For
        diagnosis and treatment purposes, I allow images such as photographs to
        be taken and used. This includes video and electronic monitoring or
        recording methods. These images may be used to add to written
        information about my illness or injury. Some images are used once and
        immediately discarded when no longer needed. Others may be kept as part
        of my medical record, at the option of my treatment providers.
        Photographs of me may also be taken for identification purposes.
        <br />
        <br />
        IMAGES OR RECORDINGS OF HEALTHCARE PROVIDERS: I understand I must obtain
        permission of all healthcare providers and any other individuals present
        before I can take photographs or video of any members of my care team. I
        also understand I cannot record conversations by any means without first
        obtaining the permission of all persons being recorded.
        <br />
        <br />
        NON-EMPLOYED PHYSICIANS AND PROVIDERS: I understand there are physicians
        and other licensed providers who practice at HCMD LLC who are not
        employed by HCMD LLC. These individuals are independent providers and
        are not employed or agents of HCMD LLC. These include specialists such
        as psychiatrists, dermatologists, and neurologists; among others. It
        also includes nutritionist, dietitians, psychologists, and exercise
        physiologists. I understand these providers use their own independent
        judgment and there care and treatment plans. HCMD LLC does not control
        the medical care and treatment given by these providers. I understand
        that he may receive separate bills for services provided by those
        parties.
        <br />
        <br />
        FINANCIAL AGREEMENT: I agree to pay HCMD LLC for care at its regular
        rates in terms applicable to my care in any applicable health insurance
        coverage I have. I permit HCMD LLC to appeal any denial received from my
        insurance company. If the third-party payer will not pay, I agreed to
        pay for the services given, subject to any applicable contractual or
        governmental regulations. If I am incapacitated by my medical condition
        because my of my injuries and a third party cannot be reached, I
        understand that HCMD LLC may file a medical services lien as permitted
        under RCW 60.44.010. (this lien attaches only to a portion of the
        proceeds of any settlement between me and the party that caused any
        harm.) If my bill is sent to a lawyer or collection agency, I will pay
        all reasonable attorney fees and costs, together with interest in any
        amounts otherwise found to be owing. Information about estimated charges
        for health services is available upon request. I understand I have the
        right to request this information. AGENTS AND CONTRACTS: Whenever HCMD
        LLC Is referenced above, it is my intent to include its employees,
        officers, agents, attorneys, first and third party liability and claims
        agents, third-party claims administrators and collection agencies, as
        well as their agents or employees, to receive any information the HCMD
        llc would otherwise be entitled to receive.
        <br />
        <br />
        MEDICARE: If I am a Medicare participant, I understand that I need to
        pay for services that are not covered by the Medicare program. This may
        include, but is not limited to, cosmetic surgery, dental care, take home
        and &quot;over-the-counter &quot;medications, private duty nurses,
        services not medically needed, personal items, services covered by car
        or liability insurance, or where a third-party is otherwise responsible
        for any accident or injury leading to my need for care, as well as any
        services not otherwise covered by Medicare. <br />
        <br />
        COINSURANCE: There may be a coinsurance for care giving related to my
        Medicare or other insurance benefits. I know I will need to pay any
        higher coinsurance for services provided by hospital-based clinic or
        department. If the services were given in a non-hospital based setting,
        my coinsurance would be lower. PHONE, EMAIL, TEXT MESSAGING
        AUTHORIZATIONS: I grant permission and consent to HCMD LLC:
        <br />
        <br />
        (1) to contact me by phone at any phone number associated with me,
        including wireless (cell) numbers;
        <br />
        <br />
        (2) to leave answering machine and voicemail messages for me, and
        included any such messages information required by law (including debt
        collection laws) and/or regarding amounts owed by me;
        <br />
        <br />
        (3) to send me text messages or emails using any email or cellular
        device addresses I provide and;
        <br />
        <br />
        (4) to use pre-recorded/artificial voice messages and/or and automatic
        dilating service (an &quot;autodialer&quot;) in connection with any
        communications made to me or related to my scheduled services and my
        care, unless I have exercised an &quot;opt out &quot;option associated
        with such emails or text messages or have otherwise notified HCMD LLC in
        writing to discontinue such communications using those pathways. (I
        understand that opt out processes may take up to ten (10) business days
        to go into effect.) I understand that I am not required to accept
        messages in these formats as a condition of receiving services at HCMD
        LLC.
        <br />
        <br />
        EMAIL CONTAINING PROTECTED HEALTH INFORMATION: <br />
        <br />I understand that exchanging email, text or other written
        communications with my health care provider(s) or other members of my
        care team can result in protected health information being disclosed to
        unauthorized persons, and that HCMD LLC cannot control who views such
        information when sent in on encrypted form. I understand the HCMD LLC
        offers access to Kareo chart information to all patients, which provides
        a fully encrypted and protected pathway for communicating with most of
        its providers, although not all HCMD LLC providers utilize this service.
        If I initiate or respond to communications using on encrypted pathways,
        I assume the risk that my information may be compromised, and I
        authorize HCMD LLC and its providers to communicate with me using that
        process, unless or until I choose to opt out of such communications
        pathways by notifying HCMD LLC in writing, allowing up to 10 business
        days to implement any change in my communications pathways.
        <br />
        <br />
        ADVANCED DIRECTIVE/LIVING WILL/POLST FORMS: I understand that I have the
        right to carry out an advanced directive for healthcare (often
        referenced as a &quot;Living Will&quot;). I understand I can get
        information on the advanced directive policy online. I understand that
        the POLST form (physicians orders for life- sustaining treatment) may
        not always serve as a substitute for an advanced directive. If I have
        completed a POLST or advanced directive form, I agreed to provide a copy
        of such forms to HCMD LLC. I also understand that I can complete a
        separate advance directive for mental health.
        <br />
        <br />
        HEALTHCARE POWER OF ATTORNEY/MENTAL HEALTH POWER OF ATTORNEY: I
        understand I can nominate another person or persons to make healthcare
        decisions for me at any time that I am unable to do so. These can
        include routine healthcare decisions (including life and death
        decisions) as well as mental health decisions. If I complete these
        forms, I will provide HCMD LLC with copies, or otherwise tell HCMD LLC
        where they are located.
        <br />
        <br />
        This consent will remain valid for 3 years from the date of
        acknowledgement.
      </p>
    </Paper>
  )

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
        style={{ overflowY: 'scroll' }}
      >
        {body}
      </Modal>

      <Container>
        <Box>
          <Typography className={classes.h2} variant="h2">
            Visit Choice
          </Typography>
          {!loading && firstName ? (
            <>
              <form onSubmit={handleSubmit}>
                <Box
                  mt="2em"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="h4">
                    <span>Hi {firstName}, </span>
                    What type of visit would you like?
                  </Typography>
                  <Box
                    mt="1em"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FormControl component="fieldset">
                      <RadioGroup
                        name="visit"
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="video"
                          control={<Radio />}
                          label={`Video/Telemedicine Visit (${
                            hasInsurance
                              ? 'No additonal fee with insurance'
                              : `$${visitPricing.noInsurance.pricing.video}`
                          })`}
                        />
                        <FormControlLabel
                          value="phone"
                          control={<Radio />}
                          label={`Phone Visit ($${
                            hasInsurance
                              ? visitPricing.insurance.pricing.phone
                              : visitPricing.noInsurance.pricing.phone
                          })`}
                        />
                        <FormControlLabel
                          value="in_person"
                          control={<Radio />}
                          label={`Housecall, In person visit at home ($${
                            hasInsurance
                              ? visitPricing.insurance.pricing.in_person
                              : visitPricing.noInsurance.pricing.in_person
                          })`}
                        />
                      </RadioGroup>

                      <Box mt="2em" display="flex" alignItems="center">
                        <Box mr="1em">
                          <Switch
                            checked={agreeToggle}
                            onChange={() => setAgreeToggle(!agreeToggle)}
                            color="secondary"
                          />
                        </Box>

                        <Typography
                          className={classes.toggleText}
                          onClick={() => setOpen(true)}
                        >
                          I have read HouseCallMD's patient bill of rights
                        </Typography>
                      </Box>
                    </FormControl>
                  </Box>
                  <Box
                    mt="1em"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexWrap="wrap"
                    width="100%"
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
                        disabled={!agreeToggle}
                      >
                        Continue
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </form>
            </>
          ) : (
            <Box
              my="1em"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}

export default VisitChoice
