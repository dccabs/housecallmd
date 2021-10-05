import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Box,
  Link,
  // Container,
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core'
import { ArrowForwardIosTwoTone, ExpandMoreRounded } from '@material-ui/icons'
import Container from '../components/Container'

const useStyles = makeStyles((theme) => ({
  maxWidth: {
    maxWidth: '1200px',
  },
  titleFontWeight: {
    fontWeight: 600,
  },
  marginTop: {
    marginTop: '.5em',
  },
  boxShadow: {
    boxShadow: 'rgb(140, 152, 164 , 18%) 5px 5px 10px 5px',
    borderRadius: '8px',
  },
  iconSize: {
    fontSize: '16px',
  },
}))

const FAQPage = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Container
      component="main"
      className={`${classes.marginTop} ${classes.maxWidth}`}
    >
      <Box my="3em">
        {/* <Container> */}
        <Box paddingBottom="3em">
          <Typography variant="h3">Frequently Asked Questions</Typography>
        </Box>
        <Box>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                Am I eligible for physician home care?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                If you have difficulty getting to a doctors office, then house
                call visits are likely covered in the same manner as a regular
                visit to an office based physician.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                What insurances do you accept?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                We accept Medicare, Medicaid, and most Private Insurances. We
                directly bill Medicare, Medicaid and the most common Medicare
                supplemental insurance plans. We only bill the patient if
                there’s an unpaid balance which is not covered by Medicare,
                Medicaid or the supplemental insurer. We also participate with
                all Medicare Advantage Plans.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                Will my insurance cover a visiting doctor? How much does a visit
                cost?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Medicare and Medicaid insurance will cover Physician home visits
                for those patients who qualify. Medicare will cover 80% of the
                allowed amount with the other 20% billed to the patient’s
                secondary insurer, the same as the physician’s office.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                What if I don’t have insurance?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                If you do not have insurance or we are not contracted with your
                insurance company, HouseCall MD accepts payment of a flat rate
                for each of our three levels of care:
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ArrowForwardIosTwoTone className={classes.iconSize} />
                  </ListItemIcon>
                  <ListItemText>
                    For a telemedicine visit, we charge $49 for those without
                    insurance.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowForwardIosTwoTone className={classes.iconSize} />
                  </ListItemIcon>
                  <ListItemText>
                    For an augmented telemedicine visit (a visit to your home by
                    a medical technician concurrent with a telemedicine visit by
                    one of our medical providers) there is a cost of $99.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowForwardIosTwoTone className={classes.iconSize} />
                  </ListItemIcon>
                  <ListItemText>
                    For the highest level of care, with a medical provider
                    (MD/PA/NP) visiting your home, there is a fee of of $99 at
                    the time you schedule your appointment ($249 without
                    insurance).
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowForwardIosTwoTone className={classes.iconSize} />
                  </ListItemIcon>
                  <ListItemText>
                    These flat rate fees are all inclusive, so there are no
                    additional fees for any additional care provided on-site
                    like lab tests or medical treatment.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowForwardIosTwoTone className={classes.iconSize} />
                  </ListItemIcon>
                  <ListItemText>
                    Payment methods include credit, debit, health savings
                    account (HSA), health reimbursement account (HRA) and
                    flexible spending account (FSA) payments.
                  </ListItemText>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel5'}
            onChange={handleChange('panel5')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                Is there any additional cost for someone to come visit me in my
                home?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                HouseCall MD does typically bill a convenience fee when our
                medical staff visits you at your home. This is to account for
                the additional time for staff to travel to your home as well as
                to cover additional costs such as gas and parking fees. There is
                a $49 convenience fee if you choose an augmented telemedicine
                visit where a medical technician comes to your home to
                facilitate care directed by the medical provider. If a medical
                provider (MD/PA/NP) visits you in your home, there is an
                additional charge of $99. These fees may be waived if you live
                in a facility with which we have a contract or working
                relationship.
                <br />
                <br />A flat rate of $49 is charged for telemedicine visits with
                no copay for those with no insurance.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel6'}
            onChange={handleChange('panel6')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel6bh-content"
              id="panel6bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                Do you take Private Pay patients?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Yes we do. We accept payment by debit or credit card. Be aware,
                we will bill you any convenience fee and copay once your
                appointment has been confirmed. Because this removes an
                available appointment slot for another patient, this fee is
                non-refundable if you do not cancel 24 hours prior to your
                appointment time.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel7'}
            onChange={handleChange('panel7')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel7bh-content"
              id="panel7bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                Do I need to get prior approval by my insurance carrier to use
                HouseCall MD services?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                There are a few insurers that require all visits with any
                medical provider other than your assigned primary care provider
                be approved prior to your visit. This is typical with managed
                care organizations and some Medicare Advantage plans. Those with
                VA insurance as their primary always require approval from their
                PCP prior to a visit with HouseCall MD.
                <br />
                If you ever have any questions whether or not our services are
                covered by your insurer, call the number on the back of your
                card and ask if HouseCall MD (HCMD LLC) is covered. It is rare
                for HouseCall MD services to not be covered due to the unique
                nature of the care we provide (considering so few medical
                providers do house calls anymore).
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel8'}
            onChange={handleChange('panel8')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel8bh-content"
              id="panel8bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                How quickly can I get a visit?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                HouseCall MD is committed to providing convenient and timely
                care. However, our mobile model of care over a very large
                territory means that in-person visits may not be available the
                same day, though visits can typically be scheduled to visit you
                within 24 hours of receiving your call. Telemedicine visits can
                be accommodated same-day, typically within 2 hours.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel9'}
            onChange={handleChange('panel9')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel9bh-content"
              id="panel9bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                Does the medical provider see patients on the weekend?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Typically yes. Based on staffing, someone will be able to see
                you the same or following day, even on weekends. However,
                weekends are more popular times for HouseCall MD (because most
                doctors clinics are closed on weekends) so call early to get
                scheduled.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel10'}
            onChange={handleChange('panel10')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel10bh-content"
              id="panel10bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                How often does HouseCall MD come out to visit?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                HouseCall MD is an acute care practice, so we typically see
                patients initially for their illness. We encourage patients to
                try to schedule with their primary doctor for follow-up.
                However, we understand it is often difficult to schedule an
                appointment with your doctor, especially since COVID; so we can
                do follow-up visits if needed. Each patient is seen as medically
                necessary based on your physician’s assessment and plan of care.
                Depending on your medical needs, visit frequency will vary.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel11'}
            onChange={handleChange('panel11')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel11bh-content"
              id="panel11bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                What if I need an urgent appointment?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                We have multiple levels of care. If the schedule is full and no
                staff member is available to see you the same day, HouseCall MD
                does provide telemedicine visits and will be able to consult
                with you the same day. If testing or on-site treatment is
                determined to be needed by the medical provider, this can be
                scheduled for the next day with our technicians and nursing
                staff.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel12'}
            onChange={handleChange('panel12')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel12bh-content"
              id="panel12bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                What if I have to go to the hospital?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                HouseCall MD does provide acute care, and although we attempt to
                provide as comprehensive care as possible, mobile medical
                technology and treatment options are still limited. If we feel
                that your symptoms are more emergent, HouseCall MD works with
                the local area hospital and EMS services. If we discover during
                our visit to your home that you will require a higher level of
                care, we will attempt to expedite your care by calling the local
                hospital and relaying your information to them.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel13'}
            onChange={handleChange('panel13')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel13bh-content"
              id="panel13bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                Will I have the same person come for every visit?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                HouseCall MD has regional staffing, so typically you will see
                the same few staff members that will come to your home, though
                we cannot guarantee any specific staff at any given time.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel14'}
            onChange={handleChange('panel14')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel14bh-content"
              id="panel14bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                Can I still see my regular doctor?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                HouseCall MD will not assume the role of your primary care
                provider. HouseCall MD will advise your regular doctor during
                your course of treatment and consult with any specialty
                providers you have as deemed necessary.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel15'}
            onChange={handleChange('panel15')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel15bh-content"
              id="panel15bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                Do you come out for emergency visits?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                NO, WE DO NOT PROVIDE EMERGENCY MEDICAL SERVICES! if it is a
                life threatening emergency please call 911 or go to the
                emergency room.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel16'}
            onChange={handleChange('panel16')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel16bh-content"
              id="panel16bh-header"
            >
              <Typography variant="h6" className={classes.titleFontWeight}>
                How do I arrange to be treated in my home?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Simply register with us on this website. Once you are
                registered, you can request the appointment type you would like.
                Our staff will receive a notification and contact you once they
                have confirmed an appointment time based on your location and
                available staff. If you are having trouble, you can always call
                us at <a href="tel:833-432-5633">833-432-5633</a> to arrange for
                a medical visit to be scheduled at your convenience.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        {/* </Container> */}
      </Box>
    </Container>
  )
}

FAQPage.propTypes = {}
FAQPage.defaultProps = {}

export default FAQPage
