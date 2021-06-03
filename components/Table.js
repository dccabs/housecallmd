import React, { Component } from 'react'

// Material Imports
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import FilterListIcon from '@material-ui/icons/FilterList'
import EditIcon from '@material-ui/icons/Edit'
import LockIcon from '@material-ui/icons/Lock'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import LoadingSpinner from '../../../components/LoadingSpinner'
import customHeader from './customHeader'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

// Component Imports
import ViewPdf from '../VIewPdf'

// Util Imports
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import classNames from 'classnames'

// CSS Import
import './index.css'
import '../../Patients/PatientModal/index.css'
import cuid from 'cuid'
import SinglePatientModal from '../../SinglePatient'

class Table extends Component {
  constructor(props) {
    super(props)
    const { filterAlert, role } = this.props
    const tooltipTheme = createMuiTheme({
      overrides: {
        MuiTooltip: {
          tooltip: {
            fontSize: '1em',
            color: 'white',
            backgroundColor: '#94ba33',
          },
        },
      },
    })
    this.closePatientModal = this.closePatientModal.bind(this)
    this.openPatientModal = this.openPatientModal.bind(this)

    this.tableRef = React.createRef()
    this.state = {
      patientModalSerialNumber: null,
      patientModalOpen: false,
      filterAlerts: filterAlert,
      pageSize: 25,
      columnData: [
        { title: 'Date', field: 'date', type: 'date' },
        {
          title: 'Patient Name',
          field: 'name',
          type: 'string',
          render: (rowData) => {
            return (
              <div
                className="trans-table__patient-link"
                style={{ textDecoration: 'underline' }}
                onClick={(e) => {
                  this.openPatientModal(e, rowData.serialNumber)
                }}
              >
                {rowData.name}
              </div>
            )
          },
        },
        {
          title: 'Patient Note',
          field: 'patient_notes',
          type: 'string',
          render: (rowData) => {
            return (
              <div
                style={{
                  position: 'relative',
                  overflowX: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  maxWidth: '150px',
                }}
              >
                {rowData.patient_notes}
              </div>
            )
          },
        },
        {
          title: 'Manufacturer',
          field: 'manufacturer',
          type: 'string',
        },
        {
          title: 'Alert',
          field: 'alert',
          type: 'string',
          render: (rowData) => {
            let alertHtml = null
            if (Array.isArray(rowData.alert)) {
              alertHtml = (
                <ul className="trans-table__alertList">
                  {rowData.alert.map((item) => {
                    return <li key={cuid()}>{item}</li>
                  })}
                </ul>
              )
            }

            const html = (
              <div style={{ whiteSpace: 'pre-line', margin: '10px' }}>
                {rowData.report_notes}
              </div>
            )

            const clinicHtml = (
              <div style={{ margin: '10px' }}>
                {rowData.clinic_notes.length !== 0 && (
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {rowData.account} Notes - {rowData.clinic_notes}
                  </div>
                )}
                {rowData.report_notes.length !== 0 && (
                  <div style={{ whiteSpace: 'pre-line', marginTop: '15px' }}>
                    Evoke Notes - {rowData.report_notes}
                  </div>
                )}
              </div>
            )

            const generalColumn = (
              <MuiThemeProvider theme={tooltipTheme}>
                <Tooltip
                  style={{ fontSize: '18px', width: '300px' }}
                  title={rowData.report_notes.length ? html : alertHtml}
                  placement="bottom"
                >
                  <div
                    style={{
                      width: '80px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {rowData.report_notes.length
                      ? rowData.report_notes
                      : rowData.alert[0]}
                  </div>
                </Tooltip>
              </MuiThemeProvider>
            )

            const clinicColumn = (
              <MuiThemeProvider theme={tooltipTheme}>
                <Tooltip
                  style={{ fontSize: '18px', width: '300px' }}
                  title={
                    rowData.clinic_notes.length || rowData.report_notes.length
                      ? clinicHtml
                      : alertHtml
                  }
                  placement="bottom"
                >
                  <div
                    style={{
                      width: '80px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {rowData.clinic_notes.length !== 0 && (
                      <span>{rowData.clinic_notes}</span>
                    )}
                    {rowData.clinic_notes.length === 0 &&
                      rowData.report_notes.length !== 0 && (
                        <span>{rowData.report_notes}</span>
                      )}
                    {rowData.clinic_notes.length === 0 &&
                      rowData.report_notes.length === 0 && (
                        <span>{rowData.alert[0]}</span>
                      )}
                  </div>
                </Tooltip>
              </MuiThemeProvider>
            )

            const renderedColumn =
              role === 'clinic' ? clinicColumn : generalColumn
            return renderedColumn
          },
        },
        {
          title: 'Alert Flag',
          field: 'alert_flag',
          type: 'boolean',
          hidden: true,
          defaultFilter: filterAlert ? 'checked' : '',
        },
        {
          title: 'Billable',
          field: 'billable',
          type: 'boolean',
        },
        {
          title: 'Last Billing',
          field: 'lastBillDate',
          type: 'date',
          render: (rowData) => {
            return (
              <div className="trans-table__editDate">
                <span>{rowData.lastBillDate}</span>{' '}
                <span
                  className="trans-table__editDate-icon"
                  onClick={(event) => {
                    props.editModalProps.openProcessModal(event, rowData)
                  }}
                >
                  <EditIcon fontSize="small" />
                </span>
              </div>
            )
          },
        },
        {
          title: 'Next Send',
          field: 'nextSendDate',
          type: 'date',
          render: (rowData) => {
            return (
              <div className="trans-table__editDate">
                <span>{rowData.nextSendDate}</span>{' '}
                <span
                  className="trans-table__editDate-icon"
                  onClick={(event) => {
                    props.editNextSendModalProps.openProcessModal(
                      event,
                      rowData
                    )
                  }}
                >
                  <EditIcon fontSize="small" />
                </span>
              </div>
            )
          },
        },
        {
          title: role === 'clinic' ? 'Physician' : 'Account',
          field: role === 'clinic' ? 'physiciansStr' : 'account',
          type: 'string',
          render: (rowData) => {
            if (role === 'clinic') {
              const data = rowData.physicians
              const html = data.map((item, index) => {
                return <div key={index}>{item.name}</div>
              })
              if (data.length < 1) {
                const name = data.length ? data[0].name : ''
                return (
                  <div
                    className="physician-edit-container"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <span
                      className="physician-edit"
                      onClick={(event) => {
                        props.physicianModalProps.openPhysicianModal(
                          event,
                          rowData
                        )
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </span>
                    <span>{name}</span>
                  </div>
                )
              } else {
                return (
                  <MuiThemeProvider theme={tooltipTheme}>
                    <Tooltip title={html} placement="bottom">
                      <div
                        className="physician-edit-container"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        <span
                          className="physician-edit"
                          onClick={(event) => {
                            props.physicianModalProps.openPhysicianModal(
                              event,
                              rowData
                            )
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </span>
                        <span>{data[0].name}</span>
                      </div>
                    </Tooltip>
                  </MuiThemeProvider>
                )
              }
            } else {
              return (
                <div style={{ position: 'relative' }}>
                  {rowData.locked && (
                    <div style={{ position: 'absolute', right: '0', top: '0' }}>
                      <Tooltip title="Report locked" placement="bottom">
                        <LockIcon style={{ color: '#e30000', opacity: '.6' }} />
                      </Tooltip>
                    </div>
                  )}
                  {rowData.account}
                </div>
              )
            }
          },
        },
        {
          title: 'Clinic Billed',
          field: 'clinic_billed',
          type: 'boolean',
          // hidden: true,
        },
      ],

      tableComponents: {
        Header: customHeader,
        FilterRow: (props) => {
          this.filterProps = props
          return (
            <tr className="trans-table__filterRow">
              <td colSpan="2" style={{ textAlign: 'center' }}></td>
              <td>
                <div style={{ margin: '10px 0px 8px', padding: '0 10px 0px' }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="none"
                      autoOk
                      id="filter_date"
                      label=""
                      className="trans-table__filterDatePicker"
                      format="MM/dd/yyyy"
                      KeyboardButtonProps={{
                        'aria-label': 'pick date',
                      }}
                      value={this.filterDate || null}
                      onChange={(date) => {
                        const mdate = moment(new Date(date))
                        const isValid = mdate.isValid()
                        if (isValid || date === null) {
                          props.onFilterChanged(0, date)
                          this.filterDate = date
                        }
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </td>
              <td>
                <div style={{ margin: '10px 0', padding: '0 10px 0px' }}>
                  <TextField
                    onChange={(event) => {
                      props.onFilterChanged(1, event.target.value)
                    }}
                  />
                </div>
              </td>
              <td>
                <div style={{ margin: '10px 0', padding: '0 10px 0px' }}>
                  <TextField
                    onChange={(event) => {
                      props.onFilterChanged(2, event.target.value)
                    }}
                  />
                </div>
              </td>
              <td>
                <div style={{ margin: '10px 0', padding: '0 10px 0px' }}>
                  <TextField
                    onChange={(event) => {
                      props.onFilterChanged(3, event.target.value)
                    }}
                  />
                </div>
              </td>
              <td>
                <div style={{ margin: '10px 0', padding: '0 10px 0px' }}>
                  <TextField
                    onChange={(event) => {
                      props.onFilterChanged(4, event.target.value)
                    }}
                  />
                </div>
              </td>
              <td style={{ display: 'none' }}>
                <div style={{ margin: '10px 0', padding: '0 10px 0px' }}>
                  <button
                    id="alert_flag_filter"
                    className="alert_flag_filter"
                    onClick={(event) => {
                      const { filterAlert } = this.props
                      if (this.filtered === undefined) {
                        if (filterAlert === false) {
                          this.filtered = false
                        } else {
                          this.filtered = true
                        }
                      } else {
                        this.filtered = !this.filtered
                      }
                      const filtered = this.filtered ? 'checked' : null
                      props.onFilterChanged(5, filtered)
                    }}
                  ></button>
                </div>
              </td>
              <td>
                <div style={{ margin: '10px 0', padding: '0 10px 0px' }}>
                  <Select
                    style={{ width: '85%' }}
                    value={this.billableFilter || ''}
                    onChange={(event) => {
                      const val = event.target.value
                      this.billableFilter = val.toString()
                      let checked
                      if (val === 'true') {
                        checked = 'checked'
                      } else if (val === 'false') {
                        checked = 'unchecked'
                      } else {
                        checked = ''
                      }
                      props.onFilterChanged(6, checked)
                    }}
                    inputProps={{
                      name: 'filter-billable',
                      id: 'filter-billable',
                    }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="true">Billable</MenuItem>
                    <MenuItem value="false">Non-billable</MenuItem>
                  </Select>
                </div>
              </td>
              <td>
                <div style={{ margin: '10px 0px 8px', padding: '0 10px 0px' }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="none"
                      autoOk
                      id="filter_last_billing_date"
                      label=""
                      className="trans-table__filterDatePicker"
                      format="MM/dd/yyyy"
                      KeyboardButtonProps={{
                        'aria-label': 'pick date',
                      }}
                      value={this.filterLastBillingDate || null}
                      onChange={(date) => {
                        const mdate = moment(new Date(date))
                        const isValid = mdate.isValid()
                        if (isValid || date === null) {
                          props.onFilterChanged(7, date)
                          this.filterLastBillingDate = date
                        }
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </td>
              <td>
                <div style={{ margin: '10px 0px 8px', padding: '0 10px 0px' }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="none"
                      autoOk
                      id="filter_next_send date"
                      label=""
                      className="trans-table__filterDatePicker"
                      format="MM/dd/yyyy"
                      KeyboardButtonProps={{
                        'aria-label': 'pick date',
                      }}
                      value={this.filterNextSendDate || null}
                      onChange={(date) => {
                        const mdate = moment(new Date(date))
                        const isValid = mdate.isValid()
                        if (isValid || date === null) {
                          props.onFilterChanged(8, date)
                          this.filterNextSendDate = date
                        }
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </td>
              <td>
                <div style={{ margin: '10px 0', padding: '0 10px 0px' }}>
                  <TextField
                    id="doctor_flag_filter"
                    onChange={(event) => {
                      props.onFilterChanged(9, event.target.value)
                    }}
                  />
                </div>
              </td>
            </tr>
          )
        },
      },
    }
  }

  componentDidMount() {
    const savedPageSize = localStorage.getItem('pageSize')
    if (savedPageSize) {
      this.setState({
        pageSize: parseInt(savedPageSize),
      })
    }

    const { reportId } = this.state
    const {
      launchSnackbarMessage,
      patientProps,
      tableProps,
      history,
      role,
      physician,
    } = this.props
    if (tableProps.view === 'single') {
      this.tableRef.current.onToggleDetailPanel([0], (rowData) => {
        return (
          <ViewPdf
            role={role}
            reportId={reportId}
            {...rowData}
            rowData={rowData}
            updateReportsSelected={tableProps.updateReportsSelected}
            updateReportLabel={tableProps.updateReportLabel}
            updateClinicNotes={tableProps.updateClinicNotes}
            updateAlertStatus={tableProps.updateAlertStatus}
            updateAlertBadges={tableProps.updateAlertBadges}
            processPatientRecords={patientProps.processPatientRecords}
            reportsSelected={this.state.reportsSelected}
            processModalProps={tableProps.processModalProps}
            updateTableReportNotes={tableProps.updateTableReportNotes}
            updatePatientNote={patientProps.updatePatientNotes}
            patientNote={rowData.patient_notes}
            launchSnackbarMessage={launchSnackbarMessage}
            tableProps={tableProps}
            history={history}
            patientMRN={patientProps.patientMRN}
          />
        )
      })
    }

    if (role === 'clinic' && physician) {
      this.filterDoctors()
    }

    if (role === 'clinic') {
      this.filterBilled()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || nextState !== this.state
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { filterAlert, role, physician } = this.props
    if (filterAlert !== prevProps.filterAlert) {
      const el = document.getElementById('alert_flag_filter')
      el.click()
    }
    const { filterDoctors } = this.props
    if (
      filterDoctors !== prevProps.filterDoctors &&
      role === 'clinic' &&
      physician
    ) {
      this.filterDoctors()
    }

    const { filterBilled } = this.props
    if (filterBilled !== prevProps.filterBilled) {
      this.filterBilled()
    }
  }

  openPatientModal(e, serialNumber) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      patientModalSerialNumber: serialNumber,
      patientModalOpen: true,
    })
  }

  closePatientModal() {
    this.setState({
      patientModalSerialNumber: null,
      patientModalOpen: false,
    })
  }

  filterBilled() {
    const { filterBilled, tableProps } = this.props
    const checked = filterBilled ? 'unchecked' : ''
    if (tableProps.view !== 'single') {
      this.filterProps.onFilterChanged(10, checked)
    }
  }

  filterDoctors() {
    const { filterDoctors } = this.props
    const el = document.getElementById('doctor_flag_filter')
    if (!el) return
    if (filterDoctors) {
      const userName = localStorage.getItem('userName')
      el.value = userName
      this.filterProps.onFilterChanged(9, userName)
    } else {
      el.value = ''
      this.filterProps.onFilterChanged(9, '')
    }
  }

  handleRowsPerPageChange(pageSize) {
    localStorage.setItem('pageSize', parseInt(pageSize))
  }

  render() {
    const {
      reportId,
      columnData,
      tableComponents,
      pageSize,
      patientModalSerialNumber,
      patientModalOpen,
    } = this.state

    const {
      launchSnackbarMessage,
      patientProps,
      tableProps,
      billingModalProps,
      history,
      clinicName,
      role,
      showFilter,
      physician,
      clinicReviewer,
    } = this.props
    const toggleState = tableProps.showFilters ? 'secondary' : 'default'
    const toggleMessage = tableProps.showFilters
      ? 'Hide filters'
      : 'Show filters'
    let title = null

    if (role === 'clinic') {
      if (tableProps.view === 'clinic-review') {
        title = <div>{clinicName} - Processed Transmissions</div>
      } else if (tableProps.view === 'clinic-processed') {
        title = <div>{clinicName} - Signed/Archived Transmissions</div>
      } else {
        title = <div>{clinicName} - Active Transmissions</div>
      }
    } else {
      if (tableProps.view === 'single') {
        title = patientProps.patientData[0].name
      } else {
        title = `${tableProps.view} Transmissions`
      }
    }
    const titleHtml = (
      <div style={{ position: 'relative', textTransform: 'capitalize' }}>
        {title}
      </div>
    )

    var tableContainerClasses = classNames({
      'trans-table__container': true,
      'trans-table__container--hideFilters': !tableProps.showFilters,
    })

    return (
      <div style={{ position: 'relative' }}>
        {patientProps.patientDataLoading && (
          <div
            style={{
              padding: '50px 0',
              textAlign: 'center',
              width: window.innerWidth - 75,
            }}
          >
            <LoadingSpinner />
          </div>
        )}
        <div
          style={
            patientProps.patientDataLoading
              ? { height: '0', overflow: 'hidden' }
              : null
          }
        >
          {patientModalOpen && (
            <SinglePatientModal
              history={history}
              launchSnackbarMessage={launchSnackbarMessage}
              serialNumber={patientModalSerialNumber}
              patientModalOpen={patientModalOpen}
              closePatientModal={this.closePatientModal}
            />
          )}
          <div id="transmissions-table" className={tableContainerClasses}>
            <Tooltip title={toggleMessage} placement="bottom">
              <Button
                onClick={tableProps.toggleFilters}
                className="trans-table__toggle"
                color={toggleState}
                variant="contained"
              >
                <FilterListIcon />
              </Button>
            </Tooltip>
            <MaterialTable
              tableRef={this.tableRef}
              title={titleHtml}
              onChangeRowsPerPage={(pageSize) => {
                this.handleRowsPerPageChange(pageSize)
              }}
              columns={columnData}
              data={patientProps.patientData}
              options={{
                showTextRowsSelected: false,
                filtering: showFilter,
                sorting: true,
                pageSize,
                pageSizeOptions: [25, 50, 100],
                selection: true,
                // detailPanelType: 'single',
                rowStyle: (rowData) => {
                  if (rowData.alert_flag && !rowData.clinic_billed) {
                    return {
                      backgroundColor: 'rgba(245, 66, 106, .1)',
                    }
                  } else if (rowData.alert_flag && rowData.clinic_billed) {
                    return {
                      backgroundColor: 'rgba(245, 66, 106, .1)',
                      border: '3px solid rgba(83,130, 255, .25)',
                    }
                  } else if (!rowData.alert_flag && rowData.clinic_billed) {
                    return {
                      backgroundColor: 'rgba(83,130, 255, .25)',
                    }
                  } else {
                    return {
                      backgroundColor:
                        typeof rowData.tableData.showDetailPanel === 'function'
                          ? 'rgba(142, 157, 176, .1)'
                          : '#FFF',
                    }
                  }
                },
              }}
              components={tableComponents}
              onChangePage={() => {
                document.body.scrollTop = document.documentElement.scrollTop = 0
              }}
              onSelectionChange={(rows) => {
                tableProps.updateReportsSelected(rows)
                tableProps.updateSelectedRows(rows)
              }}
              detailPanel={(rowData) => {
                return (
                  <ViewPdf
                    role={role}
                    view={tableProps.view}
                    reportId={reportId}
                    {...rowData}
                    rowData={rowData}
                    updateReportsSelected={tableProps.updateReportsSelected}
                    updateReportLabel={tableProps.updateReportLabel}
                    updateClinicNotes={tableProps.updateClinicNotes}
                    updateAlertStatus={tableProps.updateAlertStatus}
                    updateAlertBadges={tableProps.updateAlertBadges}
                    processPatientRecords={patientProps.processPatientRecords}
                    processBilling={patientProps.processPatientRecords}
                    reportsSelected={this.state.reportsSelected}
                    processModalProps={tableProps.processModalProps}
                    updateTableReportNotes={tableProps.updateTableReportNotes}
                    updatePatientNote={patientProps.updatePatientNotes}
                    patientNote={rowData.patient_notes}
                    launchSnackbarMessage={launchSnackbarMessage}
                    tableProps={tableProps}
                    history={history}
                    billingModalProps={billingModalProps}
                    clinicReviewer={clinicReviewer}
                    physician={physician}
                    updatePatientMRN={this.props.updatePatientMRN}
                  />
                )
              }}
              onRowClick={(event, rowData, togglePanel) => {
                togglePanel()
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Table
